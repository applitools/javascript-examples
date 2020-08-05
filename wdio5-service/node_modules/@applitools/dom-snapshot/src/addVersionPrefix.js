'use strict';
const {name, version} = require('../package.json');

function addVersionPrefix(filename) {
  return {
    generateBundle: function(_outputOptions, bundle, _isWrite) {
      const bundleFile = bundle[`${filename}.js`];
      bundleFile.code = `/* ${name}@${version} */\n${bundleFile.code}`;
    },
  };
}

module.exports = addVersionPrefix;
