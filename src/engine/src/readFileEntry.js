import {invalidReadFile} from './../../utils/errors';
import Task from './../../task/index';

export default function (options = {}) {
    return new Promise((resolve, reject) => {
        const {config = {}} = this;

        if (!options.file) {
            reject(new Error(invalidReadFile));
            return;
        }

        new Task(`${config.workerPath}readFile.js`, options, resolve, (error) => {
            reject(error || new Error(invalidReadFile));
        });
    });
}