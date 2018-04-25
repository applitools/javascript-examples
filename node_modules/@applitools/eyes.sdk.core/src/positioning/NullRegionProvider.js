'use strict';

const RegionProvider = require('./RegionProvider');
const Region = require('./Region');

class NullRegionProvider extends RegionProvider {

    /**
     * @param {PromiseFactory} promiseFactory
     */
    constructor(promiseFactory) {
        super(Region.EMPTY, promiseFactory);
    }
}

module.exports = NullRegionProvider;
