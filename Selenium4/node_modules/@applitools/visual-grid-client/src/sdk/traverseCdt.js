'use strict';

// DFS, pre-order processing
function traverseCdt(cdt, processNode) {
  function visit(node) {
    processNode(node);
    if (node.childNodeIndexes) {
      node.childNodeIndexes.forEach(index => visit(cdt[index]));
    }
  }

  if (cdt && cdt.length) {
    visit(cdt[0], processNode);
  }
}

module.exports = traverseCdt;
