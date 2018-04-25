'use strict';

const GeneralUtils = require('../GeneralUtils');

/**
 * Encapsulates data for the render currently running in the client.
 */
class RunningRender {

    constructor() {
        this.renderId = false;
        this.jobId = false;

        this.renderStatus = null;
        this.needMoreResources = null;
        this.needMoreDom = null;
    }

    /**
     * @returns {String}
     */
    getRenderId() {
        return this.renderId;
    }

    // noinspection JSUnusedGlobalSymbols
    setRenderId(value) {
        this.renderId = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @returns {String}
     */
    getJobId() {
        return this.jobId;
    }

    // noinspection JSUnusedGlobalSymbols
    setJobId(value) {
        this.jobId = value;
    }

    /**
     * @returns {RenderStatus}
     */
    getRenderStatus() {
        return this.renderStatus;
    }

    // noinspection JSUnusedGlobalSymbols
    setRenderStatus(value) {
        this.renderStatus = value;
    }

    /**
     * @returns {String[]}
     */
    getNeedMoreResources() {
        return this.needMoreResources;
    }

    // noinspection JSUnusedGlobalSymbols
    setNeedMoreResources(value) {
        this.needMoreResources = value;
    }

    /**
     * @returns {Boolean}
     */
    getNeedMoreDom() {
        return this.needMoreDom;
    }

    // noinspection JSUnusedGlobalSymbols
    setNeedMoreDom(value) {
        this.needMoreDom = value;
    }

    toJSON() {
        return {
            renderId: this.renderId,
            jobId: this.jobId,
            renderStatus: this.renderStatus,
            needMoreResources: this.needMoreResources,
            needMoreDom: this.needMoreDom
        };
    }

    /** @override */
    toString() {
        return `RunningRender { ${GeneralUtils.toJson(this)} }`;
    }
}

module.exports = RunningRender;
