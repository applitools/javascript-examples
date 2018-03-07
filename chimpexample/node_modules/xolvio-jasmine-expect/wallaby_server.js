module.exports = function () {
  return {
    files: [
      'index.js',
    ],

    tests: [
      '__tests__/*.js'
    ],

    env: {
      type: 'node',
      runner: 'node',
      params: {
        runner: '--harmony'
      }
    },

    testFramework: 'mocha',
  };
};
