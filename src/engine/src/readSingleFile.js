import {invalidFileType, notFoundMethodCreateDocument, invalidReadFile} from './../../utils/errors';

export default function () {
    return new Promise(function (resolve, reject) {
        if (!this.isValid()) {
            return reject(new Error(invalidFileType));
        }

        this.readFileEntry({
            file: this.file
        }).then(
            function (result) {
                if (typeof this.createDocument !== 'function') {
                    return reject(new Error(notFoundMethodCreateDocument));
                }

                this.createDocument(result).then(resolve, (rejection) => {
                    reject(rejection || new Error(invalidReadFile));
                });
            }.bind(this),
            (error) => reject(error || new Error(invalidReadFile))
        );
    }.bind(this));
}