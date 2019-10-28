# dom-snapshot

Script for extracting resources and DOM in CDT format, to serve as the input for rendering a screenshot with the visual grid.

## Installing

```sh
npm install @applitools/dom-snapshot
```

## Usage

### From Node.js

This package exports functions that can be used when working with puppeteer, CDP or Selenium in Node.js:

- `getProcessPageScript`
- `getProcessPageAndSerializeScript`
- `getProcessPageAndPollScript`
- `getProcessPageAndSerializeForIEScript`
- `makeExtractResourcesFromSvg`
- `toUriEncoding`
- `toUnAnchoredUri`

These async functions return a string with a function that can be sent to the browser for evaluation. It doesn't immediately invoke the function, so the sender should wrap it as an IIFE. For example:

```js
  const {getProcessPageAndSerializeScript} = require('@applitools/dom-snapshot');
  const processPageAndSerializeScript = await getProcessPageAndSerializeScript();
  const returnValue = await page.evaluate(`(${processPageAndSerializeScript})()`); // puppeteer
```

### From the browser

By using the **non bundled** version of the scripts:

- `src/browser/processPage`
- `src/browser/processPageAndSerialize`

These functions can then be bundled together with other client-side code so they are consumed regardless of a browser driver (this is how the Eyes.Cypress SDK uses it).

### From non-JavaScript code

This package's `dist` folder contains scripts that can be sent to the browser regradless of driver and language. An agent that wishes to extract information from a webpage can read the contents of `dist/processPageAndSerialize` and send that to the browser as an async script. **There's still the need to wrap it in a way that invokes it**.

For example in `Java` with Selenium WebDriver:

```java
  String domCaptureScript = "var callback = arguments[arguments.length - 1]; return (" + PROCESS_RESOURCES + ")().then(JSON.stringify).then(callback, function(err) {callback(err.stack || err.toString())})";
  
  Object response = driver.executeAsyncScript("const callback = arguments[arguments.length - 1];(" + processPageAndSerialize + ")().then(JSON.stringify).then(callback, function(err) {callback(err.stack || err.toString())})";
```

**Note for Selenium WebDriver users:** The return value must not include objects with the property `nodeType`. Browser drivers interpret those as HTML nodes, and thus corrupt the result. A possible remedy to this is to `JSON.stringify` the result before sending it back to the calling process. That's what we're doing in the example above.

## The `processPage` script

This script receives a document, and returns an object with the following:

- `url` - the URL of the document.
- `cdt` - a flat array representing the document's DOM in CDT format.
- `resourceUrls` - an array of strings with URL's of resources that appear in the page's DOM or are referenced from a CSS resource but are cross-origin and therefore could not be fetched from the browser.
- `blobs` - an array of objects with the following structure: `{url, type, value}`. These are resources that the browser was able to fetch. The `type` property is the `Content-Type` response header. The `value` property contains an ArrayBuffer with the content of the resource.
- frames: an array with objects which recursively have the same structure as the `processPage` return value: `{url, cdt, resourceUrls, blobs, frames}`.

The script scans the DOM for resource references, fetches them, and then also scans the body of css resources for more references, and so on recursively.