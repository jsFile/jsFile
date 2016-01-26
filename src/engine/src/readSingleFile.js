import {invalidFileType, notFoundMethodCreateDocument, invalidReadFile} from './../../utils/errors';

export default function readSingleFile () {
    if (!this.isValid()) {
        return Promise.reject(new Error(invalidFileType));
    }

    return new Promise((resolve, reject) => {
        this.readFileEntry({
            file: this.file
        }).then((result) => {
            if (typeof this.createDocument !== 'function') {
                throw new Error(notFoundMethodCreateDocument);
            }

            return this.createDocument(result);
        }).then(resolve).catch((rejection) => reject(rejection || new Error(invalidReadFile)));
    });
}