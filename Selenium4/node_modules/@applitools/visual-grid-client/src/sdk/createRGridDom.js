'use strict';

const {RGridDom} = require('@applitools/eyes-sdk-core');

function createRGridDom({cdt, resources}) {
  const resourceArr = Object.values(resources).sort((r1, r2) =>
    r1.getUrl() > r2.getUrl() ? 1 : -1,
  );
  const rGridDom = new RGridDom();
  rGridDom.setDomNodes(cdt);
  rGridDom.setResources(resourceArr);

  return rGridDom;
}

module.exports = createRGridDom;
