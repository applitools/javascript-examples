const {EyesJsBrowserUtils} = require('../EyesJsBrowserUtils')

async function locatorToPersistedRegions(locator, driver) {
  if (locator.using === 'xpath') {
    return [{type: 'xpath', selector: locator.value}]
  } else if (locator.using === 'css selector') {
    return [{type: 'css', selector: locator.value}]
  } else {
    const webElements = await driver.findElements(locator)
    const findXpaths = webElements.map(element =>
      EyesJsBrowserUtils.getElementXpath(driver, element),
    )
    const xpaths = await Promise.all(findXpaths)
    return xpaths.map(xpath => ({type: 'xpath', selector: xpath}))
  }
}

module.exports = locatorToPersistedRegions
