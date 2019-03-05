'use strict';

exports.SeleniumConfiguration = require('./lib/config/SeleniumConfiguration').SeleniumConfiguration;
exports.BrowserType = require('./lib/config/BrowserType').BrowserType;
exports.ScreenOrientation = require('./lib/config/ScreenOrientation').ScreenOrientation;
exports.StitchMode = require('./lib/config/StitchMode').StitchMode;

exports.EyesWebDriverScreenshot = require('./lib/capture/EyesWebDriverScreenshot').EyesWebDriverScreenshot;
exports.EyesWebDriverScreenshotFactory = require('./lib/capture/EyesWebDriverScreenshotFactory').EyesWebDriverScreenshotFactory;
exports.FirefoxScreenshotImageProvider = require('./lib/capture/FirefoxScreenshotImageProvider').FirefoxScreenshotImageProvider;
exports.ImageProviderFactory = require('./lib/capture/ImageProviderFactory').ImageProviderFactory;
exports.SafariScreenshotImageProvider = require('./lib/capture/SafariScreenshotImageProvider').SafariScreenshotImageProvider;
exports.TakesScreenshotImageProvider = require('./lib/capture/TakesScreenshotImageProvider').TakesScreenshotImageProvider;

exports.EyesDriverOperationError = require('./lib/errors/EyesDriverOperationError').EyesDriverOperationError;
exports.NoFramesError = require('./lib/errors/NoFramesError').NoFramesError;

exports.FloatingRegionByElement = require('./lib/fluent/FloatingRegionByElement').FloatingRegionByElement;
exports.FloatingRegionBySelector = require('./lib/fluent/FloatingRegionBySelector').FloatingRegionBySelector;
exports.SelectorByElement = require('./lib/fluent/SelectorByElement').SelectorByElement;
exports.SelectorByLocator = require('./lib/fluent/SelectorByLocator').SelectorByLocator;
exports.FrameLocator = require('./lib/fluent/FrameLocator').FrameLocator;
exports.IgnoreRegionByElement = require('./lib/fluent/IgnoreRegionByElement').IgnoreRegionByElement;
exports.IgnoreRegionBySelector = require('./lib/fluent/IgnoreRegionBySelector').IgnoreRegionBySelector;
exports.SeleniumCheckSettings = require('./lib/fluent/SeleniumCheckSettings').SeleniumCheckSettings;
exports.Target = require('./lib/fluent/Target').Target;

exports.Frame = require('./lib/frames/Frame').Frame;
exports.FrameChain = require('./lib/frames/FrameChain').FrameChain;

exports.CssTranslatePositionMemento = require('./lib/positioning/CssTranslatePositionMemento').CssTranslatePositionMemento;
exports.CssTranslatePositionProvider = require('./lib/positioning/CssTranslatePositionProvider').CssTranslatePositionProvider;
exports.ElementPositionMemento = require('./lib/positioning/ElementPositionMemento').ElementPositionMemento;
exports.ElementPositionProvider = require('./lib/positioning/ElementPositionProvider').ElementPositionProvider;
exports.FirefoxRegionPositionCompensation = require('./lib/positioning/FirefoxRegionPositionCompensation').FirefoxRegionPositionCompensation;
exports.ImageRotation = require('./lib/positioning/ImageRotation').ImageRotation;
exports.OverflowAwareCssTranslatePositionProvider = require('./lib/positioning/OverflowAwareCssTranslatePositionProvider').OverflowAwareCssTranslatePositionProvider;
exports.OverflowAwareScrollPositionProvider = require('./lib/positioning/OverflowAwareScrollPositionProvider').OverflowAwareScrollPositionProvider;
exports.RegionPositionCompensationFactory = require('./lib/positioning/RegionPositionCompensationFactory').RegionPositionCompensationFactory;
exports.SafariRegionPositionCompensation = require('./lib/positioning/SafariRegionPositionCompensation').SafariRegionPositionCompensation;
exports.ScrollPositionMemento = require('./lib/positioning/ScrollPositionMemento').ScrollPositionMemento;
exports.ScrollPositionProvider = require('./lib/positioning/ScrollPositionProvider').ScrollPositionProvider;

exports.MoveToRegionVisibilityStrategy = require('./lib/regionVisibility/MoveToRegionVisibilityStrategy').MoveToRegionVisibilityStrategy;
exports.NopRegionVisibilityStrategy = require('./lib/regionVisibility/NopRegionVisibilityStrategy').NopRegionVisibilityStrategy;
exports.RegionVisibilityStrategy = require('./lib/regionVisibility/RegionVisibilityStrategy').RegionVisibilityStrategy;

exports.EyesTargetLocator = require('./lib/wrappers/EyesTargetLocator').EyesTargetLocator;
exports.EyesWebDriver = require('./lib/wrappers/EyesWebDriver').EyesWebDriver;
exports.EyesWebElement = require('./lib/wrappers/EyesWebElement').EyesWebElement;
exports.EyesWebElementPromise = require('./lib/wrappers/EyesWebElementPromise').EyesWebElementPromise;

exports.BordersAwareElementContentLocationProvider = require('./lib/BordersAwareElementContentLocationProvider').BordersAwareElementContentLocationProvider;
exports.EyesSeleniumUtils = require('./lib/EyesSeleniumUtils').EyesSeleniumUtils;
exports.ImageOrientationHandler = require('./lib/ImageOrientationHandler').ImageOrientationHandler;
exports.JavascriptHandler = require('./lib/JavascriptHandler').JavascriptHandler;
exports.SeleniumJavaScriptExecutor = require('./lib/SeleniumJavaScriptExecutor').SeleniumJavaScriptExecutor;

exports.Eyes = require('./lib/Eyes').Eyes;
exports.EyesSelenium = require('./lib/EyesSelenium').EyesSelenium;
exports.EyesVisualGrid = require('./lib/EyesVisualGrid').EyesVisualGrid;
