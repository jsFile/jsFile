import setObjectPolyfill from './libs/polyfills/object';
import setStringPolyfill from './libs/polyfills/string';
import read from './read';
import Document from './document/index';
import Engine from './engine/index';
import isSupported from './isSupported';

const documentEngines = [];
const mimeTypes = [];
let version = typeof webpackAppVersion !== 'undefined' ? webpackAppVersion : '';
setObjectPolyfill();
setStringPolyfill();

class JsFile {
    constructor (file, config) {
        this.file = file;
        this.read = read;
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
    },

    version: {
        value: version
    },

    Engine: {
        value: Engine
    },

    Document: {
        value: Document
    },

    defineEngine: {
        /**
         *
         * @param name
         * @param mime
         * @returns {Engine}
         */
        value: defineEngine
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