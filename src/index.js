import obj from './libs/polyfills/object';
import str from './libs/polyfills/string';
import merge from './utils/merge';
import read from './read';
import Document from './document/index';
import Engine from './engine/index';
import dom from './dom/index';
import isSupported from './isSupported';

const documentEngines = [];
const mimeTypes = [];

class JsFile {
    constructor (file, config) {
        this.file = file;
        this.config = {
            workerPath: 'workers/'
        };

        for (let k in config) {
            if (config.hasOwnProperty(k)) {
                this.config[k] = config[k];
            }
        }
    }

    findEngine () {
        const file = this.file;
        let result = null;

        documentEngines.some((Engine) => {
            if (Engine.test(file)) {
                result = Engine;
                return true;
            }
        });

        return result;
    }

    read = read

    static version = '0.0.1'

    static Engine = Engine

    static Document = Document

    static dom = dom

    /**
     *
     * @param name
     * @param mime
     * @returns {Engine}
     */
    static defineEngine = defineEngine
}

Object.defineProperties(JsFile, {
    mimeTypes: {
        enumerable: false,
        get: () => mimeTypes.slice(0)
    },

    isSupported: {
        /**
         * @description Check required technologies
         * @returns {boolean}
         */
        get: isSupported
    }
});

function defineEngine (Engine = {}) {
    const engineMimeTypes = Engine.mimeTypes;

    if (typeof Engine.test === 'function' && Array.isArray(engineMimeTypes)) {
        mimeTypes.push.apply(mimeTypes, engineMimeTypes);
        return documentEngines.push(Engine);
    }

    return null;
}

export default JsFile;