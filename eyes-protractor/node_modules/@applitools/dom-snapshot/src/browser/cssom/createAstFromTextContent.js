'use strict';
const csstree = require('css-tree');

function createAstFromTextContent(textContent) {
  const textAst = csstree.parse(textContent, {
    context: 'stylesheet',
    parseAtrulePrelude: true,
    parseRulePrelude: true,
    parseValue: false,
    parseCustomProperty: false,
  });

  // replace keyframe's key aliases
  csstree.walk(textAst, {
    visit: 'TypeSelector',
    enter(node, item) {
      if (node.name === 'from') {
        item.data = {type: 'Percentage', value: '0'};
      } else if (node.name === 'to') {
        item.data = {type: 'Percentage', value: '100'};
      }
    },
  });
  // unify urls in atrules
  csstree.walk(textAst, {
    visit: 'AtrulePrelude',
    enter(node) {
      if (['import', 'namespace'].includes(this.atrule.name)) {
        const children = node.children.toArray();
        const urlIndex = node.name === 'import' ? 0 : children.length - 1;
        const url = children[urlIndex];
        let value;
        if (url.type === 'String') {
          value = url.value.slice(1, -1);
        } else if (url.type === 'Url') {
          if (url.value.type === 'String') {
            value = url.value.value.slice(1, -1);
          } else if (url.value.type === 'Raw') {
            value = url.value.value;
          }
        }
        if (value) {
          children[urlIndex] = {type: 'Url', value: {type: 'String', value: `"${value}"`}};
          node.children.fromArray(children);
        }
      }
    },
  });

  return csstree.toPlainObject(textAst);
}

module.exports = createAstFromTextContent;
