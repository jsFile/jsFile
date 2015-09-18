import {invalidFileType, invalidReadArchive} from './../../utils/errors';
import zip from './../../zip/index';

/**
 * @description Read the file
 * @returns {Promise}
 */
export default function () {
    return new Promise((resolve, reject) => {
        if (!this.isValid()) {
            reject(new Error(invalidFileType));
            return;
        }

        zip
            .readFile(this.file, {
                useWebWorkers: true,
                workerScriptsPath: this.config.workerPath
            })
            .then(function (result) {
                this.createDocument(result)
                    .then(resolve)
                    .catch((rejection) => reject(rejection || new Error(invalidFileType)));
            }.bind(this))
            .catch(reject);
    });
}