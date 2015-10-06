import normalizeDataUri from './src/normalizeDataUri';
import validateFile from './src/validateFile';
import cropUnit from './src/cropUnit';
import readFileEntry from './src/readFileEntry';
import readSingleFile from './src/readSingleFile';
import normalizeColorValue from './src/normalizeColorValue';
import normalizeDate from './src/normalizeDate';
import attributeToBoolean from './src/attributeToBoolean';
import formatPropertyName from './src/formatPropertyName';
import readArchive from './src/readArchive';
import colorsList from './src/colorsList';
import validateUrl from './src/validateUrl';
import getMaxFontSize from './src/getMaxFontSize';
import * as errors from './../utils/errors';
import clone from './../utils/clone';
import merge from './../utils/merge';

const halfTabAsSpaces = '\u2000\u2000';

class Engine {
    parser = 'readSingleFile'

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

    readFileEntry = readFileEntry

    readSingleFile = readSingleFile

    readArchive = readArchive

    static getCharFromHex (hex) {
        const code = parseInt(hex, 16);
        return !isNaN(code) ? String.fromCharCode(code) : '';
    }

    static replaceSpaces (str) {
        return String(str || '').replace(/\s{2,}/g, halfTabAsSpaces);
    }

    static normalizeDataUri = normalizeDataUri

    static formatPropertyName = formatPropertyName

    static cropUnit = cropUnit

    static normalizeColorValue = normalizeColorValue

    static normalizeDate = normalizeDate

    static attributeToBoolean = attributeToBoolean

    static validateUrl = validateUrl

    static merge = merge

    static clone = clone

    static validateFile = validateFile

    static getMaxFontSize = getMaxFontSize

    /**
     *
     * @returns {Boolean}
     */
    static test () {
        return false;
    }

    static errors = clone(errors)

    static colorsList = clone(colorsList)

    static emDash = '—'

    static enDash = '–'

    static halfTabAsSpaces = halfTabAsSpaces

    static tabAsSpaces = '\u2000\u2000\u2000\u2000'

    static space = '\u2000'

    static nbsp = '\u00A0'

    static nbHyphen = '\u00D2'
}

export default Engine;
