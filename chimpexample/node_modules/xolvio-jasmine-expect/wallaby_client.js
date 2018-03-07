var wallabify = require('wallabify');
var wallabyPostprocessor = wallabify({});

module.exports = function () {
  return {
    files: [
      {pattern: 'index.js', load: false},
    ],

    tests: [
      {pattern: '__tests__/*.js', load: false},
    ],

    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      // required to trigger tests loading
      window.__moduleBundler.loadTests();
    },

    testFramework: 'mocha',

    env: {
      kind: 'electron'
    },
  };
};
