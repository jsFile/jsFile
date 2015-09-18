import errors from './utils/errors';
import isSupported from './isSupported';

/**
 * @description Read the file
 * @returns {Promise}
 */
export default function () {
    return new Promise(function (resolve, reject) {
        if (!isSupported()) {
            reject(new Error(errors.requiredTechnologies));
            return;
        }

        const file = this.file;
        if (!file || !(file instanceof File || file instanceof Blob)) {
            reject(new Error(errors.invalidFileType));
            return;
        }

        let Engine = this.findEngine(file);
        if (!Engine) {
            reject(new Error(errors.invalidFileType));
            return;
        }

        const engine = new Engine(file, this.config);
        const parser = engine[engine.parser] || engine.parser;
        if (typeof parser === 'function') {
            parser.call(engine).then(resolve, reject);
        } else {
            reject(new Error(errors.invalidParser));
        }
    }.bind(this));
}