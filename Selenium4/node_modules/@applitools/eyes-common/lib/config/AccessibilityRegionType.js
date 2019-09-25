'use strict';

/**
 * The type of accessibility for a resion.
 *
 * @readonly
 * @enum {string}
 */
const AccessibilityRegionType = {
  None: 'None',
  RegularText: 'RegularText',
  LargeText: 'LargeText',
  BoldText: 'BoldText',
  EssentialImage: 'EssentialImage',
  DisabledOrInactive: 'DisabledOrInactive',
  NonEssentialImage: 'NonEssentialImage',
  Logo: 'Logo',
  Background: 'Background',
  Ignore: 'Ignore',
};

Object.freeze(AccessibilityRegionType);
exports.AccessibilityRegionType = AccessibilityRegionType;
