'use strict';

function flat(arr) {
  return arr.reduce((flatArr, item) => flatArr.concat(item), []);
}

module.exports = flat;
