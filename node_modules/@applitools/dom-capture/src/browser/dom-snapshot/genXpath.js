function genXpath(el) {
  if (!el.ownerDocument) return ''; // this is the document node

  let xpath = '',
    currEl = el,
    doc = el.ownerDocument,
    frameElement = doc.defaultView.frameElement;
  while (currEl !== doc) {
    xpath = `${currEl.tagName}[${getIndex(currEl)}]/${xpath}`;
    currEl = currEl.parentNode;
  }
  if (frameElement) {
    xpath = `${genXpath(frameElement)},${xpath}`;
  }
  return xpath.replace(/\/$/, '');
}

function getIndex(el) {
  return (
    Array.prototype.filter
      .call(el.parentNode.childNodes, node => node.tagName === el.tagName)
      .indexOf(el) + 1
  );
}

module.exports = genXpath;
