'use strict';
const {isShorthandFor, hasShorthandWithin} = require('./styleProperties');

const PROPERTY_ALIASES = {
  'word-wrap': 'overflow-wrap',
  clip: 'clip-path',
};

function mergeRules(textRules, cssomRules) {
  let cursor = 0;
  const mergedRules = [];
  textRules.forEach(textRule => {
    const rule = {};
    rule.type = textRule.type;
    rule.name = textRule.name;
    rule.prelude = textRule.prelude;
    rule.block = textRule.block;
    const index = findRule(cssomRules, cursor, textRule);
    if (index > cursor) {
      forEach(cssomRules, cursor, index, cssomRule => mergedRules.push(cssomRule));
    }
    if (index >= 0) {
      cursor = index + 1;
      if (isNestedRule(textRule)) {
        rule.block = {
          type: 'Block',
          children: mergeRules(textRule.block.children, cssomRules[index].block.children),
        };
      } else if (isStyleRule(textRule)) {
        rule.block = {
          type: 'Block',
          children: mergeStyles(textRule.block.children, cssomRules[index].block.children),
        };
      }
    }
    mergedRules.push(rule);
  }, []);

  if (cursor < cssomRules.length) {
    forEach(cssomRules, cursor, cssomRules.length, cssomRule => mergedRules.push(cssomRule));
  }

  return mergedRules;
}

function mergeStyles(textDeclarations, cssomDeclarations) {
  const mergedProperties = new Map();

  textDeclarations.forEach(({type, property, important, value: {value} = {}}) => {
    if (type !== 'Declaration') return;
    let values = mergedProperties.get(property);
    if (!values) {
      values = new Map();
      mergedProperties.set(property, values);
    }
    values.set(value, important);
  });
  cssomDeclarations.forEach(({type, property, important, value: {value} = {}}) => {
    if (type !== 'Declaration') return;
    if (hasShorthandWithin(property, Array.from(mergedProperties.keys()))) return;
    let values = mergedProperties.get(property);
    if (!values) {
      values = new Map();
      mergedProperties.set(property, values);
    } else if (!values.has(value)) {
      values.clear();
    } else if (values.get(value) !== important) {
      values.forEach((_, value) => values.set(value, important));
    }
    values.set(value, important);
  });

  const mergedDeclarations = [];
  mergedProperties.forEach((values, property) => {
    values.forEach((important, value) =>
      mergedDeclarations.push({
        type: 'Declaration',
        property,
        value: {type: 'Raw', value},
        important,
      }),
    );
  });
  return mergedDeclarations;
}

function comparePreludes(leftPrelude, rightPrelude) {
  return (
    (!leftPrelude && !rightPrelude) ||
    (leftPrelude.type === rightPrelude.type &&
      compareChildren(leftPrelude.children, rightPrelude.children))
  );
}

function compareChildren(leftChildren, rightChildren) {
  if (!Array.isArray(leftChildren) && !Array.isArray(rightChildren)) {
    return true;
  } else {
    return (
      Array.isArray(leftChildren) &&
      Array.isArray(rightChildren) &&
      leftChildren.length === rightChildren.length &&
      leftChildren.every((leftChild, index) => {
        const rightChild = rightChildren[index];
        return (
          leftChild.type === rightChild.type &&
          leftChild.name === rightChild.name &&
          (leftChild.value === rightChild.value ||
            (leftChild.value.type === rightChild.value.type &&
              leftChild.value.value === rightChild.value.value)) &&
          compareChildren(leftChild.children, rightChild.children)
        );
      })
    );
  }
}

function compareStyles(leftStyles, rightStyles) {
  const relevantPropsCount = rightStyles.reduce((relevantPropsCount, rightDeclaration) => {
    const matched =
      rightDeclaration.type === 'Declaration' &&
      (isVendorProperty(rightDeclaration.property) ||
        leftStyles.some(leftDeclaration =>
          compareProperties(leftDeclaration.property, rightDeclaration.property),
        ));
    return relevantPropsCount + (matched ? 1 : 0);
  }, 0);

  return relevantPropsCount >= rightStyles.length;
}

function compareProperties(leftProperty, rightProperty) {
  const explicifiedLeftProperty = PROPERTY_ALIASES[leftProperty] || leftProperty;
  const explicifiedRightProperty = PROPERTY_ALIASES[rightProperty] || rightProperty;
  return (
    explicifiedLeftProperty === explicifiedRightProperty ||
    isShorthandFor(explicifiedRightProperty, explicifiedLeftProperty) ||
    isShorthandFor(explicifiedLeftProperty, explicifiedRightProperty)
  );
}

function findRule(ruleSet, cursor, baseRule) {
  return findIndex(ruleSet, cursor, rule => {
    return (
      rule.type === baseRule.type &&
      rule.name === baseRule.name &&
      comparePreludes(rule.prelude, baseRule.prelude) &&
      (!isStyleRule(baseRule) || compareStyles(rule.block.children, baseRule.block.children))
    );
  });
}

function isVendorProperty(property) {
  return /^(-\w+-)/.test(property);
}

function isStyleRule(rule) {
  return rule.type === 'Rule' || /^(-\w+-)?(page|font-face)$/.test(rule.name);
}

function isNestedRule(rule) {
  return rule.type === 'Atrule' && /^(-\w+-)?(media|supports|document|keyframes)$/.test(rule.name);
}

function findIndex(array, startIndex, comparator) {
  for (let index = startIndex; index < array.length; ++index) {
    if (comparator(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

function forEach(array, indexFrom, indexTo, callback) {
  for (let index = indexFrom; index < indexTo; ++index) {
    callback(array[index], index, array);
  }
}

module.exports = mergeRules;
