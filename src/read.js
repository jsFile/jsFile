import {invalidFileType, requiredTechnologies, invalidParser} from './utils/errors';
import isSupported from './isSupported';

/**
 * @description Read the file
 * @returns {Promise}
 */
export default function read () {
    if (!isSupported()) {
        return Promise.reject(new Error(requiredTechnologies));
    }

    const {file} = this;
    if (!file || !(file instanceof File || file instanceof Blob)) {
        return Promise.reject(new Error(invalidFileType));
    }

    let Engine = this.findEngine(file);
    if (!Engine) {
        return Promise.reject(new Error(invalidFileType));
    }

    const engine = new Engine(file, this.config);
    const parser = engine[engine.parser] || engine.parser;

    if (typeof parser === 'function') {
        return parser.call(engine);
    }

    return Promise.reject(new Error(invalidParser));
}