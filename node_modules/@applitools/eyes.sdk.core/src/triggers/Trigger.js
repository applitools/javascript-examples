'use strict';

/**
 * Encapsulates image retrieval.
 *
 * @abstract
 */
class Trigger {

    constructor() {
        if (new.target === Trigger) {
            throw new TypeError("Can not construct `Trigger` instance directly, should be used implementation!");
        }
    }

    // noinspection JSMethodCanBeStatic, JSUnusedGlobalSymbols
    /**
     * @abstract
     * @return {Trigger.TriggerType}
     */
    getTriggerType() {
        throw new TypeError('The method `getTriggerType` from `Trigger` should be implemented!');
    }
}

/**
 * @readonly
 * @enum {String}
 */
Trigger.TriggerType = {
    Unknown: 'Unknown',
    Mouse: 'Mouse',
    Text: 'Text',
    Keyboard: 'Keyboard',
};

Object.freeze(Trigger.TriggerType);
module.exports = Trigger;
