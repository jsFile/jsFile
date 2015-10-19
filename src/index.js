import setObject from './libs/polyfills/object';
import setString from './libs/polyfills/string';
import merge from './utils/merge';
import read from './read';
import Document from './document/index';
import Engine from './engine/index';
import isSupported from './isSupported';

const documentEngines = [];
const mimeTypes = [];
let version = typeof webpackAppVersion !== 'undefined' ? webpackAppVersion : '';
setObject();
setString();

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

    static version = version

    static Engine = Engine

    static Document = Document

    /**
     *
     * @param name
     * @param mime
     * @returns {Engine}
     */
    static defineEngine = defineEngine

    static removeEngine (Engine) {
        if (!Engine) {
            documentEngines.length = 0;
        } else {
            const index = documentEngines.indexOf(Engine);
            if (index >= 0) {
                documentEngines.splice(index, 1);
            }
        }

        return this;
    }
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