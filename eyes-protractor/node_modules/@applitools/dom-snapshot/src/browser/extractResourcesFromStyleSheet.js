'use strict';
const getUrlFromCssText = require('./getUrlFromCssText');
const uniq = require('./uniq');

function makeExtractResourcesFromStyleSheet({styleSheetCache, CSSRule = window.CSSRule}) {
  return function extractResourcesFromStyleSheet(styleSheet) {
    const urls = uniq(
      Array.from(styleSheet.cssRules || []).reduce((acc, rule) => {
        const getRuleUrls = {
          [CSSRule.IMPORT_RULE]: () => {
            if (rule.styleSheet) {
              styleSheetCache[rule.styleSheet.href] = rule.styleSheet;
              return rule.href;
            }
          },
          [CSSRule.FONT_FACE_RULE]: () => getUrlFromCssText(rule.cssText),
          [CSSRule.SUPPORTS_RULE]: () => extractResourcesFromStyleSheet(rule),
          [CSSRule.MEDIA_RULE]: () => extractResourcesFromStyleSheet(rule),
          [CSSRule.STYLE_RULE]: () => {
            let rv = [];
            for (let i = 0, ii = rule.style.length; i < ii; i++) {
              const urls = getUrlFromCssText(rule.style.getPropertyValue(rule.style[i]));
              rv = rv.concat(urls);
            }
            return rv;
          },
        }[rule.type];

        const urls = (getRuleUrls && getRuleUrls()) || [];
        return acc.concat(urls);
      }, []),
    );
    return urls.filter(u => u[0] !== '#');
  };
}

module.exports = makeExtractResourcesFromStyleSheet;
