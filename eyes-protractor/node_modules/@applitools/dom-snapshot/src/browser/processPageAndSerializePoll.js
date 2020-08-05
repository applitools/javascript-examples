'use strict';

const pullify = require('./pollify');
const processPageAndSerialize = require('./processPageAndSerialize');
module.exports = pullify(processPageAndSerialize);
