'use strict';

const GeneralUtils = require('../GeneralUtils');

class PropertyData {

    /**
     * @param {String} name
     * @param {String} value
     */
    constructor(name, value) {
        this._name = name;
        this._value = value;
    }

    // noinspection JSUnusedGlobalSymbols
    getName() {
        return this._name;
    }

    // noinspection JSUnusedGlobalSymbols
    setName(value) {
        this._name = value;
    }

    // noinspection JSUnusedGlobalSymbols
    getValue() {
        return this._value;
    }

    // noinspection JSUnusedGlobalSymbols
    setValue(value) {
        this._value = value;
    }

    toJSON() {
        return {
            name: this._name,
            value: this._value,
        };
    }

    /** @override */
    toString() {
        return `PropertyData { ${GeneralUtils.toJson(this)} }`;
    }
}

module.exports = PropertyData;
