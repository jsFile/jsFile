import {invalidFileType, notFoundMethodCreateDocument, invalidReadFile} from './../../utils/errors';

export default function () {
    return new Promise(function (resolve, reject) {
        if (!this.isValid()) {
            reject(new Error(invalidFileType));
            return;
        }

        this.readFileEntry({
            file: this.file
        }).then(
            function (result) {
                if (typeof this.createDocument !== 'function') {
                    reject(new Error(notFoundMethodCreateDocument));
                    return;
                }

                this.createDocument(result).then(resolve, (rejection) => {
                    reject(rejection || new Error(invalidReadFile));
                });
            }.bind(this),
            (error) => reject(error || new Error(invalidReadFile))
        );
    }.bind(this));
}