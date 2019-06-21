'use strict';

const {RGridResource} = require('@applitools/eyes-sdk-core');
const createRGridDom = require('./createRGridDom');
const mapKeys = require('lodash.mapkeys');
const mapValues = require('lodash.mapvalues');
const absolutizeUrl = require('./absolutizeUrl');

function makeCreateRGridDOMAndGetResourceMapping({getAllResources}) {
  return async function createRGridDOMAndGetResourceMapping({
    url,
    cdt,
    resourceUrls,
    resourceContents,
    frames = [],
    fetchOptions,
  }) {
    const absoluteUrls = resourceUrls.map(resourceUrl => absolutizeUrl(resourceUrl, url));
    const preResources = mapValues(
      mapKeys(resourceContents, (_value, key) => absolutizeUrl(key, url)),
      ({url: resourceUrl, type, value}) => ({url: absolutizeUrl(resourceUrl, url), type, value}),
    );

    const resources = await getAllResources({
      resourceUrls: absoluteUrls,
      preResources,
      fetchOptions,
    });
    const allResources = Object.assign({}, resources);

    const frameDoms = await Promise.all(frames.map(createRGridDOMAndGetResourceMapping));

    frameDoms.forEach(({rGridDom: frameDom, allResources: frameAllResources}, i) => {
      const frameUrl = frames[i].url;
      allResources[frameUrl] = resources[frameUrl] = createResourceFromFrame(frameUrl, frameDom);
      Object.assign(allResources, frameAllResources);
    });

    Object.assign(allResources, resources);

    const rGridDom = createRGridDom({cdt, resources});

    return {rGridDom, allResources};
  };

  function createResourceFromFrame(frameUrl, frameDom) {
    const frameAsResource = new RGridResource();
    frameAsResource.setUrl(frameUrl);
    frameAsResource.setContentType('x-applitools-html/cdt');
    frameAsResource.setContent(frameDom._getContentAsCdt());
    return frameAsResource;
  }
}

module.exports = makeCreateRGridDOMAndGetResourceMapping;
