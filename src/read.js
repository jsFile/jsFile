import {invalidFileType, requiredTechnologies, invalidParser} from './utils/errors';
import isSupported from './isSupported';

/**
 * @description Read the file
 * @returns {Promise}
 */
export default function () {
    return new Promise(function (resolve, reject) {
        if (!isSupported()) {
            return reject(new Error(requiredTechnologies));
        }

        const file = this.file;
        if (!file || !(file instanceof File || file instanceof Blob)) {
            return reject(new Error(invalidFileType));
        }

        let Engine = this.findEngine(file);
        if (!Engine) {
            return reject(new Error(invalidFileType));
        }

        const engine = new Engine(file, this.config);
        const parser = engine[engine.parser] || engine.parser;
        if (typeof parser === 'function') {
            parser.call(engine).then(resolve, reject);
        } else {
            reject(new Error(invalidParser));
        }
    }.bind(this));
}