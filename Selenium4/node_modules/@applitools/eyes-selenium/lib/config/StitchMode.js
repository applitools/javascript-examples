'use strict';

/**
 * Represents the types of available stitch modes.
 *
 * @readonly
 * @enum {number}
 */
const StitchMode = {
  /**
   * Standard JS scrolling.
   */
  SCROLL: 'Scroll',

  /**
   * CSS translation based stitching.
   */
  CSS: 'CSS',
};

Object.freeze(StitchMode);
exports.StitchMode = StitchMode;
