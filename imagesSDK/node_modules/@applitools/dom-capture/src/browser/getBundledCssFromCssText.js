'use strict';

function makeGetBundledCssFromCssText({
  parseCss,
  CSSImportRule,
  absolutizeUrl,
  getCssFromCache,
  unfetchedToken,
}) {
  return function getBundledCssFromCssText(cssText, styleBaseUrl) {
    let unfetchedResources;
    let bundledCss = '';

    try {
      const styleSheet = parseCss(cssText);
      for (const rule of Array.from(styleSheet.cssRules)) {
        if (rule instanceof CSSImportRule) {
          const nestedUrl = absolutizeUrl(rule.href, styleBaseUrl);
          const nestedResource = getCssFromCache(nestedUrl);
          if (nestedResource !== undefined) {
            const {
              bundledCss: nestedCssText,
              unfetchedResources: nestedUnfetchedResources,
            } = getBundledCssFromCssText(nestedResource, nestedUrl);

            nestedUnfetchedResources && (unfetchedResources = new Set(nestedUnfetchedResources));
            bundledCss = `${nestedCssText}${bundledCss}`;
          } else {
            unfetchedResources = new Set([nestedUrl]);
            bundledCss = `\n${unfetchedToken}${nestedUrl}${unfetchedToken}`;
          }
        }
      }
    } catch (ex) {
      console.log(`error during getBundledCssFromCssText, styleBaseUrl=${styleBaseUrl}`, ex);
    }

    bundledCss = `${bundledCss}${getCss(cssText, styleBaseUrl)}`;

    return {
      bundledCss,
      unfetchedResources,
    };
  };
}

function getCss(newText, url) {
  return `\n/** ${url} **/\n${newText}`;
}

module.exports = makeGetBundledCssFromCssText;
