module.exports = function isLinkToStyleSheet(node) {
  if (node.nodeName && node.nodeName.toUpperCase() === 'LINK' && node.attributes) {
    const attributes = new Map(
      Array.from(node.attributes, attr => [attr.name.toLowerCase(), attr.value.toLowerCase()]),
    );
    return (
      attributes.get('rel') === 'stylesheet' ||
      (attributes.get('as') === 'style' && ['preload', 'prefetch'].includes(attributes.get('rel')))
    );
  } else {
    return false;
  }
};
