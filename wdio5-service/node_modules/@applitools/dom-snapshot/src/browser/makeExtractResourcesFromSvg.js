'use strict';
const getUrlFromCssText = require('./getUrlFromCssText');
const flat = require('./flat');

function makeExtractResourcesFromSvg({parser, decoder, extractResourceUrlsFromStyleTags}) {
  return function(svgArrayBuffer) {
    const decooder = decoder || new TextDecoder('utf-8');
    const svgStr = decooder.decode(svgArrayBuffer);
    const domparser = parser || new DOMParser();
    const doc = domparser.parseFromString(svgStr, 'image/svg+xml');

    const srcsetUrls = Array.from(doc.querySelectorAll('img[srcset]'))
      .map(srcsetEl =>
        srcsetEl
          .getAttribute('srcset')
          .split(', ')
          .map(str => str.trim().split(/\s+/)[0]),
      )
      .reduce((acc, urls) => acc.concat(urls), []);

    const srcUrls = Array.from(doc.querySelectorAll('img[src]')).map(srcEl =>
      srcEl.getAttribute('src'),
    );

    const fromHref = Array.from(doc.querySelectorAll('image,use,link[rel="stylesheet"]')).map(
      e => e.getAttribute('href') || e.getAttribute('xlink:href'),
    );
    const fromObjects = Array.from(doc.getElementsByTagName('object')).map(e =>
      e.getAttribute('data'),
    );
    const fromStyleTags = extractResourceUrlsFromStyleTags(doc, false);
    const fromStyleAttrs = urlsFromStyleAttrOfDoc(doc);

    return srcsetUrls
      .concat(srcUrls)
      .concat(fromHref)
      .concat(fromObjects)
      .concat(fromStyleTags)
      .concat(fromStyleAttrs)
      .filter(u => u[0] !== '#');
  };
}

function urlsFromStyleAttrOfDoc(doc) {
  return flat(
    Array.from(doc.querySelectorAll('*[style]'))
      .map(e => e.style.cssText)
      .map(getUrlFromCssText)
      .filter(Boolean),
  );
}

module.exports = makeExtractResourcesFromSvg;
