import errors from './../../utils/errors';

export default function () {
    return new Promise(function (resolve, reject) {
        if (!this.isValid()) {
            reject(new Error(errors.invalidFileType));
            return;
        }

        this.readFileEntry({
            file: this.file
        }).then(
            function (result) {
                if (typeof this.createDocument !== 'function') {
                    reject(new Error(errors.notFoundMethodCreateDocument));
                    return;
                }

                this.createDocument(result).then(resolve, (rejection) => {
                    reject(rejection || new Error(errors.invalidReadFile));
                });
            }.bind(this),
            (error) => reject(error || new Error(errors.invalidReadFile))
        );
    }.bind(this));
}