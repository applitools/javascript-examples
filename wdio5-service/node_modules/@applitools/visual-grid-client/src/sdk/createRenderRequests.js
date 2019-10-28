'use strict';

const {RenderRequest, RenderInfo} = require('@applitools/eyes-sdk-core');
const createEmulationInfo = require('./createEmulationInfo');
const calculateSelectorsToFindRegionsFor = require('./calculateSelectorsToFindRegionsFor');

function createRenderRequests({
  url,
  resources,
  dom,
  browsers,
  renderInfo,
  sizeMode,
  selector,
  region,
  scriptHooks,
  noOffsetSelectors = [],
  offsetSelectors = [],
  sendDom,
}) {
  const selectorsToFindRegionsFor = calculateSelectorsToFindRegionsFor({
    sizeMode,
    selector,
    noOffsetSelectors,
    offsetSelectors,
  });

  return browsers.map(
    ({width, height, name, deviceName, screenOrientation, deviceScaleFactor, mobile}) => {
      const emulationInfo = createEmulationInfo({
        deviceName,
        screenOrientation,
        deviceScaleFactor,
        mobile,
        width,
        height,
      });

      return new RenderRequest({
        webhook: renderInfo.getResultsUrl(),
        url,
        resources,
        dom,
        renderInfo: new RenderInfo({
          width,
          height,
          sizeMode,
          selector,
          region,
          emulationInfo,
        }),
        platform: 'Linux',
        browserName: name,
        scriptHooks,
        selectorsToFindRegionsFor,
        sendDom,
      });
    },
  );
}

module.exports = createRenderRequests;
