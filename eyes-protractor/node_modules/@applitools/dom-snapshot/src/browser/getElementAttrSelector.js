'use strict';

function getElementAttrSelector(el) {
  const attrString = Array.from(el.attributes)
    .map(attr => {
      if (attr.name === 'id') {
        return `#${attr.value}`;
      } else if (attr.name === 'class') {
        return Array.from(el.classList)
          .map(c => `.${c}`)
          .join('');
      } else {
        return `[${attr.name}="${attr.value}"]`;
      }
    })
    .join('');
  return `${el.nodeName}${attrString}`;
}

module.exports = getElementAttrSelector;
