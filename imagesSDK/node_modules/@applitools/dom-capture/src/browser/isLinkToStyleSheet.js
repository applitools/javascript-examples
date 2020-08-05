module.exports = function isLinkToStyleSheet(node) {
  return (
    node.nodeName &&
    node.nodeName.toUpperCase() === 'LINK' &&
    node.attributes &&
    Array.from(node.attributes).find(
      attr => attr.name.toLowerCase() === 'rel' && attr.value.toLowerCase() === 'stylesheet',
    )
  );
};
