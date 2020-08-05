const executionModes = [{isVisualGrid: true}, {isCssStitching: true}, {isScrollStitching: true}]
const tests = [
  'TestCheckFrame',
  'TestCheckRegion',
  'TestCheckRegion2',
  'TestCheckWindow',
  'TestCheckWindowFully',
  'TestCheckFrame_Fluent',
  'TestCheckWindow_Fluent',
  'TestAcmeLogin',
  'TestCheckElementFully_Fluent',
  'TestCheckElementWithIgnoreRegionByElementOutsideTheViewport_Fluent',
  'TestCheckElementWithIgnoreRegionBySameElement_Fluent',
  'TestCheckFrameFully_Fluent',
  'TestCheckFrameInFrame_Fully_Fluent',
  'TestCheckFrameInFrame_Fully_Fluent2',
  'TestCheckFullWindowWithMultipleIgnoreRegionsBySelector_Fluent',
  'TestCheckOverflowingRegionByCoordinates_Fluent',
  'TestCheckPageWithHeader_Window',
  'TestCheckPageWithHeaderFully_Window',
  'TestCheckPageWithHeader_Region',
  'TestCheckPageWithHeaderFully_Region',
  'TestCheckRegionInAVeryBigFrame',
  'TestCheckRegionInAVeryBigFrameAfterManualSwitchToFrame',
  'TestCheckRegionByCoordinates_Fluent',
  'TestCheckRegionByCoordinatesInFrame_Fluent',
  'TestCheckRegionByCoordinatesInFrameFully_Fluent',
  'TestCheckRegionBySelectorAfterManualScroll_Fluent',
  'TestCheckRegionInFrame',
  'TestCheckRegionInFrame_Fluent',
  'TestCheckRegionInFrame3_Fluent',
  'TestCheckRegionWithIgnoreRegion_Fluent',
  'TestCheckScrollableModal',
  'TestCheckWindow_Body',
  'TestCheckWindow_Html',
  'TestCheckWindow_Simple_Html',
  'TestCheckWindowAfterScroll',
  'TestCheckWindowViewport',
  'TestCheckWindowWithFloatingByRegion_Fluent',
  'TestCheckWindowWithFloatingBySelector_Fluent',
  'TestCheckWindowWithIgnoreBySelector_Fluent',
  'TestCheckWindowWithIgnoreBySelector_Centered_Fluent',
  'TestCheckWindowWithIgnoreBySelector_Stretched_Fluent',
  'TestCheckWindowWithIgnoreRegion_Fluent',
  'TestDoubleCheckWindow',
  'TestSimpleRegion',
  'TestScrollbarsHiddenAndReturned_Fluent',
  'Test_VGTestsCount_1',
]
let supportedTests = []
function addTest(name, executionMode) {
  supportedTests.push({name, executionMode})
}
tests.forEach(name => {
  executionModes.forEach(executionMode => {
    addTest(name, executionMode)
  })
})
addTest('Test Abort', {isVisualGrid: true})
addTest('Test Abort', {isCssStitching: true})

module.exports = supportedTests
