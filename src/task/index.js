import {invalidWorker} from './../utils/errors';
const maxWorkersCount = typeof navigator !== 'undefined' && navigator.hardwareConcurrency || 4;
let queue = [];
let createdWorkersCount = 0;

function done (worker) {
    worker.terminate();
    createdWorkersCount--;
    processQueue();
}

function processQueue () {
    if (createdWorkersCount < maxWorkersCount) {
        let taskOptions = queue.shift();

        if (!taskOptions) {
            return;
        }

        createdWorkersCount++;
        let worker = new Worker(taskOptions.url);

        worker.onmessage = function (e) {
            let data = e.data || {};

            if (data.error) {
                this.onerror(data.error);
                taskOptions = null;
                return;
            }

            if (typeof taskOptions.resolve === 'function') {
                taskOptions.resolve(data.result);
            }

            taskOptions = null;
            done(this);
        };

        worker.onerror = function () {
            if (typeof taskOptions.reject === 'function') {
                taskOptions.reject(new Error(invalidWorker));
            }

            taskOptions = null;
            done(this);
        };

        worker.postMessage(taskOptions.data);
    }
}

class Task {
    constructor (url, data, resolve, reject) {
        queue.push({
            token: Date.now(),
            url,
            data,
            resolve,
            reject
        });
        processQueue();
    }
}

export default Task;