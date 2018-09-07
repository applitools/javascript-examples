'use strict';

const { RectangleSize } = require('./geometry/RectangleSize');
const { GeneralUtils } = require('./utils/GeneralUtils');
const { TestResultsStatus } = require('./TestResultsStatus');

class SessionUrls {
  constructor() {
    this._batch = null;
    this._session = null;
  }

  /**
   * @param {object} object
   * @return {SessionUrls}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new SessionUrls(), object);
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBatch() {
    return this._batch;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBatch(value) {
    this._batch = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getSession() {
    return this._session;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setSession(value) {
    this._session = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }
}

class ApiUrls {
  constructor() {
    this._baselineImage = null;
    this._currentImage = null;
    this._checkpointImage = null;
    this._checkpointImageThumbnail = null;
    this._diffImage = null;
  }

  /**
   * @param {object} object
   * @return {ApiUrls}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new ApiUrls(), object);
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBaselineImage() {
    return this._baselineImage;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBaselineImage(value) {
    this._baselineImage = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getCurrentImage() {
    return this._currentImage;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setCurrentImage(value) {
    this._currentImage = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getCheckpointImage() {
    return this._checkpointImage;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setCheckpointImage(value) {
    this._checkpointImage = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getCheckpointImageThumbnail() {
    return this._checkpointImageThumbnail;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setCheckpointImageThumbnail(value) {
    this._checkpointImageThumbnail = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getDiffImage() {
    return this._diffImage;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setDiffImage(value) {
    this._diffImage = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }
}

class AppUrls {
  constructor() {
    this._step = null;
    this._stepEditor = null;
  }

  /**
   * @param {object} object
   * @return {AppUrls}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new AppUrls(), object);
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getStep() {
    return this._step;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setStep(value) {
    this._step = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getStepEditor() {
    return this._stepEditor;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setStepEditor(value) {
    this._stepEditor = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }
}

class StepInfo {
  constructor() {
    this._name = null;
    this._isDifferent = null;
    this._hasBaselineImage = null;
    this._hasCurrentImage = null;
    this._appUrls = null;
    this._apiUrls = null;
  }

  /**
   * @param {object} object
   * @return {StepInfo}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new StepInfo(), object, {
      appUrls: AppUrls.fromObject,
      apiUrls: ApiUrls.fromObject,
    });
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getName() {
    return this._name;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setName(value) {
    this._name = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsDifferent() {
    return this._isDifferent;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsDifferent(value) {
    this._isDifferent = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getHasBaselineImage() {
    return this._hasBaselineImage;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setHasBaselineImage(value) {
    this._hasBaselineImage = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getHasCurrentImage() {
    return this._hasCurrentImage;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setHasCurrentImage(value) {
    this._hasCurrentImage = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {AppUrls} */
  getAppUrls() {
    return this._appUrls;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {AppUrls} value */
  setAppUrls(value) {
    this._appUrls = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {ApiUrls} */
  getApiUrls() {
    return this._apiUrls;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {ApiUrls} value */
  setApiUrls(value) {
    this._apiUrls = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }
}

/**
 * Eyes test results.
 */
class TestResults {
  constructor() {
    this._name = null;
    this._secretToken = null;
    // this._id = null;
    this._status = null;
    this._appName = null;
    this._batchName = null;
    this._batchId = null;
    this._branchName = null;
    this._hostOS = null;
    this._hostApp = null;
    this._hostDisplaySize = null;
    this._startedAt = null;
    this._duration = null;
    this._isNew = null;
    this._isSaved = null;
    this._isDifferent = null;
    this._isAborted = null;
    // this._defaultMatchSettings = null;
    this._appUrls = null;
    this._apiUrls = null;
    this._stepsInfo = null;
    this._steps = null;
    this._matches = null;
    this._mismatches = null;
    this._missing = null;
    this._exactMatches = null;
    this._strictMatches = null;
    this._contentMatches = null;
    this._layoutMatches = null;
    this._noneMatches = null;
    this._url = null;
  }

  /**
   * @param {object} object
   * @return {TestResults}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new TestResults(), object, {
      hostDisplaySize: RectangleSize.fromObject,
      startedAt: GeneralUtils.fromISO8601DateTime,
      appUrls: SessionUrls.fromObject,
      apiUrls: SessionUrls.fromObject,
      stepsInfo: steps => Array.from(steps)
        .map(step => StepInfo.fromObject(step)),
    });
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getName() {
    return this._name;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setName(value) {
    this._name = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getSecretToken() {
    return this._secretToken;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setSecretToken(value) {
    this._secretToken = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {TestResultsStatus} */
  getStatus() {
    return this._status;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {TestResultsStatus} value */
  setStatus(value) {
    this._status = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getAppName() {
    return this._appName;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setAppName(value) {
    this._appName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBatchName() {
    return this._batchName;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBatchName(value) {
    this._batchName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBatchId() {
    return this._batchId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBatchId(value) {
    this._batchId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBranchName() {
    return this._branchName;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBranchName(value) {
    this._branchName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getHostOS() {
    return this._hostOS;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setHostOS(value) {
    this._hostOS = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getHostApp() {
    return this._hostApp;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setHostApp(value) {
    this._hostApp = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {RectangleSize} */
  getHostDisplaySize() {
    return this._hostDisplaySize;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {RectangleSize} value */
  setHostDisplaySize(value) {
    this._hostDisplaySize = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {Date} */
  getStartedAt() {
    return this._startedAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {Date} value */
  setStartedAt(value) {
    this._startedAt = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {number} */
  getDuration() {
    return this._duration;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {number} value */
  setDuration(value) {
    this._duration = value;
  }

  /** @return {boolean} Whether or not this is a new test. */
  getIsNew() {
    return this._isNew;
  }

  /** @param {boolean} value Whether or not this test has an existing baseline. */
  setIsNew(value) {
    this._isNew = value;
  }

  /** @return {boolean} Whether or not test was automatically saved as a baseline. */
  getIsSaved() {
    return this._isSaved;
  }

  /** @param {boolean} value Whether or not test was automatically saved as a baseline. */
  setIsSaved(value) {
    this._isSaved = value;
  }

  /** @return {boolean} */
  getIsDifferent() {
    return this._isDifferent;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsDifferent(value) {
    this._isDifferent = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsAborted() {
    return this._isAborted;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsAborted(value) {
    this._isAborted = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {SessionUrls} */
  getAppUrls() {
    return this._appUrls;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {SessionUrls} value */
  setAppUrls(value) {
    this._appUrls = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {SessionUrls} */
  getApiUrls() {
    return this._apiUrls;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {SessionUrls} value */
  setApiUrls(value) {
    this._apiUrls = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {StepInfo[]} */
  getStepsInfo() {
    return this._stepsInfo;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {StepInfo[]} value */
  setStepsInfo(value) {
    this._stepsInfo = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {number} The total number of test steps. */
  getSteps() {
    return this._steps;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {number} value The number of visual checkpoints in the test. */
  setSteps(value) {
    this._steps = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {number} The total number of test steps that matched the baseline. */
  getMatches() {
    return this._matches;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param value {number} The number of visual matches in the test. */
  setMatches(value) {
    this._matches = value;
  }

  /** @return {number} The total number of test steps that did not match the baseline. */
  getMismatches() {
    return this._mismatches;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {number} value The number of mismatches in the test. */
  setMismatches(value) {
    this._mismatches = value;
  }

  /** @return {number} The total number of baseline test steps that were missing in the test. */
  getMissing() {
    return this._missing;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {number} value The number of visual checkpoints that were available in the baseline but were not found
   *   in the current test.
   */
  setMissing(value) {
    this._missing = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {number} The total number of test steps that exactly matched the baseline. */
  getExactMatches() {
    return this._exactMatches;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {number} value The number of matches performed with match level set to {@link MatchLevel#Exact} */
  setExactMatches(value) {
    this._exactMatches = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {number} The total number of test steps that strictly matched the baseline. */
  getStrictMatches() {
    return this._strictMatches;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {number} value The number of matches performed with match level set to {@link MatchLevel#Strict} */
  setStrictMatches(value) {
    this._strictMatches = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {number} The total number of test steps that matched the baseline by content. */
  getContentMatches() {
    return this._contentMatches;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {number} value The number of matches performed with match level set to {@link MatchLevel#Content} */
  setContentMatches(value) {
    this._contentMatches = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {number} The total number of test steps that matched the baseline by layout. */
  getLayoutMatches() {
    return this._layoutMatches;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {number} value The number of matches performed with match level set to {@link MatchLevel#Layout} */
  setLayoutMatches(value) {
    this._layoutMatches = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {number} The total number of test steps that matched the baseline without performing any comparison. */
  getNoneMatches() {
    return this._noneMatches;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {number} value The number of matches performed with match level set to {@link MatchLevel#None} */
  setNoneMatches(value) {
    this._noneMatches = value;
  }

  /** @return {string} The URL where test results can be viewed. */
  getUrl() {
    return this._url;
  }

  /** @param {string} value The URL of the test results. */
  setUrl(value) {
    this._url = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} Whether or not this test passed. */
  isPassed() {
    return this._status === TestResultsStatus.Passed;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    const isNewTestStr = this._isNew ? 'new test' : 'existing test';
    return `TestResults of ${isNewTestStr} ${GeneralUtils.toString(this, ['_secretToken'])}`;
  }
}

exports.TestResults = TestResults;
