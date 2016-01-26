import {invalidFileType, notFoundMethodCreateDocument, invalidReadArchive} from './../../utils/errors';
import zip from './../../zip/index';

/**
 * @description Read the file
 * @returns {Promise}
 */
export default function readArchive () {
    if (!this.isValid()) {
        return Promise.reject(new Error(invalidFileType));
    }

    return new Promise((resolve, reject) => {
        return zip.readFile(this.file, {
            useWebWorkers: true,
            workerScriptsPath: this.config.workerPath
        }).then((result) => {
            if (typeof this.createDocument !== 'function') {
                throw new Error(notFoundMethodCreateDocument);
            }

            return this.createDocument(result);
        }).then(resolve).catch((rejection) => reject(rejection || new Error(invalidReadArchive)));
    });
}