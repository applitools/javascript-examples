module.exports = function getHrefAttr(node) {
  const attr = Array.from(node.attributes).find(attr => attr.name.toLowerCase() === 'href');
  return attr && attr.value;
};
