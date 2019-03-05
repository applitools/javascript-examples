'use strict';

function calculateMatchRegions({
  noOffsetSelectors,
  offsetSelectors,
  selectorRegions,
  imageLocationRegion,
}) {
  let selectorRegionIndex = imageLocationRegion ? 1 : 0;
  const noOffsetRegions = noOffsetSelectors.map(selection => mapSelectionToRegions(selection));
  const offsetRegions = offsetSelectors.map(selection => mapSelectionToRegions(selection, true));

  return {
    noOffsetRegions,
    offsetRegions,
  };

  function mapSelectionToRegions(selection, addOffset) {
    const selectorObjToRegionWithOffset = selectorObjToRegion.bind(null, addOffset);
    return selection
      ? Array.isArray(selection)
        ? selection.map(selectorObjToRegionWithOffset)
        : selectorObjToRegionWithOffset(selection)
      : selection;
  }

  function selectorObjToRegion(addOffset, selectorObj) {
    if (selectorObj.selector) {
      const selectorRegion = selectorRegions[selectorRegionIndex++];
      let ret = imageLocationRegion
        ? {
            width: selectorRegion.getWidth(),
            height: selectorRegion.getHeight(),
            left: Math.max(0, selectorRegion.getLeft() - imageLocationRegion.getLeft()),
            top: Math.max(0, selectorRegion.getTop() - imageLocationRegion.getTop()),
          }
        : selectorRegion.toJSON();

      if (addOffset) {
        ret = Object.assign(ret, {
          maxUpOffset: selectorObj.maxUpOffset,
          maxDownOffset: selectorObj.maxDownOffset,
          maxLeftOffset: selectorObj.maxLeftOffset,
          maxRightOffset: selectorObj.maxRightOffset,
        });
      }

      return ret;
    } else {
      return selectorObj;
    }
  }
}

module.exports = calculateMatchRegions;
