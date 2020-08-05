'use strict';

function makeCaptureNodeCss({extractCssFromNode, getBundledCssFromCssText, unfetchedToken}) {
  return function captureNodeCss(node, baseUrl) {
    const {styleBaseUrl, cssText, isUnfetched} = extractCssFromNode(node, baseUrl);

    let unfetchedResources;
    let bundledCss = '';
    if (cssText) {
      const {bundledCss: nestedCss, unfetchedResources: nestedUnfetched} = getBundledCssFromCssText(
        cssText,
        styleBaseUrl,
      );

      bundledCss += nestedCss;
      unfetchedResources = new Set(nestedUnfetched);
    } else if (isUnfetched) {
      bundledCss += `${unfetchedToken}${styleBaseUrl}${unfetchedToken}`;
      unfetchedResources = new Set([styleBaseUrl]);
    }
    return {bundledCss, unfetchedResources};
  };
}

module.exports = makeCaptureNodeCss;
