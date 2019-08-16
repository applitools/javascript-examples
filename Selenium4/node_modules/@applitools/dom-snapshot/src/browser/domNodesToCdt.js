/* eslint-disable no-use-before-define */
'use strict';
const absolutizeUrl = require('./absolutizeUrl');
const uuid = require('./uuid');
const isInlineFrame = require('./isInlineFrame');

function domNodesToCdt(docNode, url) {
  const cdt = [{nodeType: Node.DOCUMENT_NODE}];
  const docRoots = [docNode];
  const canvasElements = [];
  const inlineFrames = [];

  cdt[0].childNodeIndexes = childrenFactory(cdt, docNode.childNodes);
  return {cdt, docRoots, canvasElements, inlineFrames};

  function childrenFactory(cdt, elementNodes) {
    if (!elementNodes || elementNodes.length === 0) return null;

    const childIndexes = [];
    Array.prototype.forEach.call(elementNodes, elementNode => {
      const index = elementNodeFactory(cdt, elementNode);
      if (index !== null) {
        childIndexes.push(index);
      }
    });
    return childIndexes;
  }

  function elementNodeFactory(cdt, elementNode) {
    let node, manualChildNodeIndexes;
    const {nodeType} = elementNode;
    let dummyUrl, frameBase;

    if ([Node.ELEMENT_NODE, Node.DOCUMENT_FRAGMENT_NODE].includes(nodeType)) {
      if (elementNode.nodeName !== 'SCRIPT') {
        if (
          elementNode.nodeName === 'STYLE' &&
          elementNode.sheet &&
          elementNode.sheet.cssRules.length
        ) {
          cdt.push(getCssRulesNode(elementNode));
          manualChildNodeIndexes = [cdt.length - 1];
        }

        node = getBasicNode(elementNode);
        node.childNodeIndexes =
          manualChildNodeIndexes ||
          (elementNode.childNodes.length ? childrenFactory(cdt, elementNode.childNodes) : []);

        if (elementNode.shadowRoot) {
          node.shadowRootIndex = elementNodeFactory(cdt, elementNode.shadowRoot);
          docRoots.push(elementNode.shadowRoot);
        }

        if (elementNode.nodeName === 'CANVAS') {
          dummyUrl = absolutizeUrl(`applitools-canvas-${uuid()}.png`, url);
          node.attributes.push({name: 'data-applitools-src', value: dummyUrl});
          canvasElements.push({element: elementNode, url: dummyUrl});
        }

        if (elementNode.nodeName === 'IFRAME' && isInlineFrame(elementNode)) {
          frameBase = getFrameBaseUrl(elementNode);
          dummyUrl = absolutizeUrl(`?applitools-iframe=${uuid()}`, frameBase || url);
          node.attributes.push({name: 'data-applitools-src', value: dummyUrl});
          inlineFrames.push({element: elementNode, url: dummyUrl});
        }
      } else {
        node = getScriptNode(elementNode);
      }
    } else if (nodeType === Node.TEXT_NODE) {
      node = getTextNode(elementNode);
    } else if (nodeType === Node.DOCUMENT_TYPE_NODE) {
      node = getDocNode(elementNode);
    }

    if (node) {
      cdt.push(node);
      return cdt.length - 1;
    } else {
      return null;
    }
  }

  function nodeAttributes({attributes = {}}) {
    return Object.keys(attributes).filter(k => attributes[k] && attributes[k].name);
  }

  function getCssRulesNode(elementNode) {
    return {
      nodeType: Node.TEXT_NODE,
      nodeValue: Array.from(elementNode.sheet.cssRules)
        .map(rule => rule.cssText)
        .join(''),
    };
  }

  function getBasicNode(elementNode) {
    const node = {
      nodeType: elementNode.nodeType,
      nodeName: elementNode.nodeName,
      attributes: nodeAttributes(elementNode).map(key => {
        let value = elementNode.attributes[key].value;
        const name = elementNode.attributes[key].name;
        if (/^blob:/.test(value)) {
          value = value.replace(/^blob:/, '');
        }
        return {
          name,
          value,
        };
      }),
    };

    if (elementNode.tagName === 'INPUT' && ['checkbox', 'radio'].includes(elementNode.type)) {
      if (elementNode.attributes.checked && !elementNode.checked) {
        const idx = node.attributes.findIndex(a => a.name === 'checked');
        node.attributes.splice(idx, 1);
      }
      if (!elementNode.attributes.checked && elementNode.checked) {
        node.attributes.push({name: 'checked'});
      }
    }

    if (
      elementNode.tagName === 'INPUT' &&
      elementNode.type === 'text' &&
      (elementNode.attributes.value && elementNode.attributes.value.value) !== elementNode.value
    ) {
      const nodeAttr = node.attributes.find(a => a.name === 'value');
      if (nodeAttr) {
        nodeAttr.value = elementNode.value;
      } else {
        node.attributes.push({name: 'value', value: elementNode.value});
      }
    }
    return node;
  }

  function getScriptNode(elementNode) {
    return {
      nodeType: Node.ELEMENT_NODE,
      nodeName: 'SCRIPT',
      attributes: nodeAttributes(elementNode)
        .map(key => ({
          name: elementNode.attributes[key].name,
          value: elementNode.attributes[key].value,
        }))
        .filter(attr => attr.name !== 'src'),
      childNodeIndexes: [],
    };
  }

  function getTextNode(elementNode) {
    return {
      nodeType: Node.TEXT_NODE,
      nodeValue: elementNode.nodeValue,
    };
  }

  function getDocNode(elementNode) {
    return {
      nodeType: Node.DOCUMENT_TYPE_NODE,
      nodeName: elementNode.nodeName,
    };
  }

  function getFrameBaseUrl(frameElement) {
    const href =
      frameElement.contentDocument.querySelectorAll('base') &&
      frameElement.contentDocument.querySelectorAll('base')[0] &&
      frameElement.contentDocument.querySelectorAll('base')[0].href;
    if (href && !href.includes('about:blank')) {
      return href;
    }
  }
}

module.exports = domNodesToCdt;
