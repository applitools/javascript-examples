'use strict';

const csstree = require('css-tree');
const createAstFromCssom = require('./createAstFromCssom');
const createAstFromTextContent = require('./createAstFromTextContent');
const mergeRules = require('./mergeRules');
const noop = require('../noop');
const getElementAttrSelector = require('../getElementAttrSelector');

function processInlineCss(styleNode, log = noop) {
  log('[processInlineCss] processing inline css for', getElementAttrSelector(styleNode));

  try {
    const textContentAst = createAstFromTextContent(styleNode.textContent);
    log('[processInlineCss] created AST for textContent');

    const cssomAst = createAstFromCssom(styleNode.sheet.cssRules);
    log('[processInlineCss] created AST for CSSOM');

    const mergedRules = mergeRules(textContentAst.children, cssomAst);
    log('[processInlineCss] merged AST');

    const cssText = csstree.generate(
      csstree.fromPlainObject({type: 'StyleSheet', children: mergedRules}),
    );
    log('[processInlineCss] generated cssText of length', cssText.length);

    return cssText;
  } catch (err) {
    log('[processInlineCss] error while processing inline css:', err.message, err);
    return styleNode.textContent;
  }
}

module.exports = processInlineCss;
