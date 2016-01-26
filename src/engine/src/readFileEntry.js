import {invalidReadFile} from './../../utils/errors';
import task from 'jstask';

export default function (params = {}) {
    if (!params.file) {
        return Promise.reject(new Error(invalidReadFile));
    }

    const {config = {}} = this || {};
    return new Promise((resolve, reject) => {
        task.run(`${config.workerPath}readFile.js`, params, (response) => {
            if (!response || response.error) {
                return reject(response && response.error || new Error(invalidReadFile));
            }

            resolve(response.result);
        }, (error) => {
            reject(error || new Error(invalidReadFile));
        });
    });
}