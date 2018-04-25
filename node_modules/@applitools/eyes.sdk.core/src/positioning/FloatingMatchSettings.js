'use strict';

const GeneralUtils = require('../GeneralUtils');
const Region = require('./Region');

/**
 * Encapsulates floating match settings for the a session.
 */
class FloatingMatchSettings {

    constructor(left, top, width, height, maxUpOffset, maxDownOffset, maxLeftOffset, maxRightOffset) {
        this._left = left;
        this._top = top;
        this._width = width;
        this._height = height;

        this._maxUpOffset = maxUpOffset;
        this._maxDownOffset = maxDownOffset;
        this._maxLeftOffset = maxLeftOffset;
        this._maxRightOffset = maxRightOffset;
    }

    getLeft() {
        return this._left;
    }

    // noinspection JSUnusedGlobalSymbols
    setLeft(value) {
        this._left = value;
    }

    getTop() {
        return this._top;
    }

    // noinspection JSUnusedGlobalSymbols
    setTop(value) {
        this._top = value;
    }

    getWidth() {
        return this._width;
    }

    // noinspection JSUnusedGlobalSymbols
    setWidth(value) {
        this._width = value;
    }

    getHeight() {
        return this._height;
    }

    // noinspection JSUnusedGlobalSymbols
    setHeight(value) {
        this._height = value;
    }

    getMaxUpOffset() {
        return this._maxUpOffset;
    }

    // noinspection JSUnusedGlobalSymbols
    setMaxUpOffset(value) {
        this._maxUpOffset = value;
    }

    getMaxDownOffset() {
        return this._maxDownOffset;
    }

    // noinspection JSUnusedGlobalSymbols
    setMaxDownOffset(value) {
        this._maxDownOffset = value;
    }

    getMaxLeftOffset() {
        return this._maxLeftOffset;
    }

    // noinspection JSUnusedGlobalSymbols
    setMaxLeftOffset(value) {
        this._maxLeftOffset = value;
    }

    getMaxRightOffset() {
        return this._maxRightOffset;
    }

    // noinspection JSUnusedGlobalSymbols
    setMaxRightOffset(value) {
        this._maxRightOffset = value;
    }

    getRegion() {
        return new Region(this._left, this._top, this._width, this._height);
    }

    toJSON() {
        return {
            top: this._top,
            left: this._left,
            width: this._width,
            height: this._height,
            maxUpOffset: this._maxUpOffset,
            maxDownOffset: this._maxDownOffset,
            maxLeftOffset: this._maxLeftOffset,
            maxRightOffset: this._maxRightOffset
        };
    }

    /** @override */
    toString() {
        return `FloatingMatchSettings { ${GeneralUtils.toJson(this)} }`;
    }
}

module.exports = FloatingMatchSettings;
