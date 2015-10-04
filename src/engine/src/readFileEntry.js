import {invalidReadFile} from './../../utils/errors';
import task from 'jstask';

export default function (params = {}) {
    return new Promise(function (resolve, reject) {
        const {config = {}} = this;

        if (!params.file) {
            return reject(new Error(invalidReadFile));
        }

        task.run(`${config.workerPath}readFile.js`, params, (response) => {
            if (!response || response.error) {
                return reject(response && response.error || new Error(invalidReadFile));
            }

            resolve(response.result);
        }, (error) => {
            reject(error || new Error(invalidReadFile));
        });
    }.bind(this));
}