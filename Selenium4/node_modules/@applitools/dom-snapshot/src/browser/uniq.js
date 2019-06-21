'use strict';

function uniq(arr) {
  const result = [];
  new Set(arr).forEach(v => v && result.push(v));
  return result;
}

module.exports = uniq;
