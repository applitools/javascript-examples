'use strict';

const GeneralUtils = require('../GeneralUtils');

class RenderingInfo {

    constructor(arg1, accessToken, resultsUrl) {
        if (arg1 instanceof Object) {
            return new RenderingInfo(arg1.serviceUrl, arg1.accessToken, arg1.resultsUrl);
        }

        this._serviceUrl = arg1;
        this._accessToken = accessToken;
        this._resultsUrl = resultsUrl;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @returns {String}
     */
    getServiceUrl() {
        return this._serviceUrl;
    }

    // noinspection JSUnusedGlobalSymbols
    setServiceUrl(value) {
        this._serviceUrl = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @returns {String}
     */
    getAccessToken() {
        return this._accessToken;
    }

    // noinspection JSUnusedGlobalSymbols
    setAccessToken(value) {
        this._accessToken = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @returns {String}
     */
    getResultsUrl() {
        return this._resultsUrl;
    }

    // noinspection JSUnusedGlobalSymbols
    setResultsUrl(value) {
        this._resultsUrl = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {{sub: string, exp: int, iss: string}}
     */
    getDecodedAccessToken() {
        if (this._payload) {
            this._payload = GeneralUtils.jwtDecode(this._accessToken);
        }
        return this._payload;
    }

    toJSON() {
        return {
            serviceUrl: this._serviceUrl,
            accessToken: this._accessToken,
            resultsUrl: this._resultsUrl
        };
    }

    /** @override */
    toString() {
        return `RenderingInfo { ${GeneralUtils.toJson(this)} }`;
    }
}

module.exports = RenderingInfo;
