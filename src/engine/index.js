import normalizeDataUri from './src/normalizeDataUri';
import validateFile from './src/validateFile';
import cropUnit from './src/cropUnit';
import readFileEntry from './src/readFileEntry';
import readSingleFile from './src/readSingleFile';
import normalizeColorValue from './src/normalizeColorValue';
import attributeToBoolean from './src/attributeToBoolean';
import formatPropertyName from './src/formatPropertyName';
import readArchive from './src/readArchive';
import colorsList from './src/colorsList';
import validateUrl from './src/validateUrl';
import * as errors from './../utils/errors';
import clone from './../utils/clone';
import merge from './../utils/merge';

const halfTabAsSpaces = '\u2000\u2000';

class Engine {
    constructor (file, config) {
        this.file = file;
        this.fileName = (this.file && this.file.name) || '';
        this.config = {};

        for (let k in config) {
            if (config.hasOwnProperty(k)) {
                this.config[k] = config[k];
            }
        }
    }

    isValid () {
        return this.constructor.test(this.file);
    }

    static getCharFromHex (hex) {
        const code = parseInt(hex, 16);
        return !isNaN(code) ? String.fromCharCode(code) : '';
    }

    static replaceSpaces (str) {
        return String(str || '').replace(/\s{2,}/g, halfTabAsSpaces);
    }

    /**
     *
     * @returns {Boolean}
     */
    static test () {
        return false;
    }
}

Object.defineProperties(Engine.prototype, {
    parser: {
        writable: true,
        value: 'readSingleFile'
    },
    readFileEntry: {
        writable: true,
        value: readFileEntry
    },
    readSingleFile: {
        writable: true,
        value: readSingleFile
    },
    readArchive: {
        writable: true,
        value: readArchive
    }
});

Object.defineProperties(Engine, {
    normalizeDataUri: {
        value: normalizeDataUri
    },
    formatPropertyName: {
        value: formatPropertyName
    },
    cropUnit: {
        value: cropUnit
    },
    normalizeColorValue: {
        value: normalizeColorValue
    },
    attributeToBoolean: {
        value: attributeToBoolean
    },
    validateUrl: {
        value: validateUrl
    },
    merge: {
        value: merge
    },
    clone: {
        value: clone
    },
    validateFile: {
        value: validateFile
    },
    errors: {
        value: clone(errors)
    },
    colorsList: {
        value: clone(colorsList)
    },
    emDash: {
        value: '—'
    },
    enDash: {
        value: '–'
    },
    halfTabAsSpaces: {
        value: halfTabAsSpaces
    },
    tabAsSpaces: {
        value: '\u2000\u2000\u2000\u2000'
    },
    space: {
        value: '\u2000'
    },
    nbsp:{
        value: '\u00A0'
    },
    nbHyphen: {
        value: '\u00D2'
    }
});

export default Engine;
