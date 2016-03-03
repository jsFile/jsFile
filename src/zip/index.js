import zip from './src/zip';
import Entry from './src/Entry';
const {
    BlobReader,
    BlobWriter,
    createWorker,
    getDataHelper,
    seekEOCDR,
    readCommonHeader,
    getString,
    decodeUTF8,
    decodeASCII,
    ERR_READ,
    ERR_BAD_FORMAT
} = zip;

export default {
    readFile: function (file, options) {
        Object.merge(zip, options);

        return new Promise((resolve, reject) => {
            const reader = new BlobReader(file);

            /**
             * instead of .init()
             */
            reader.size = file.size;

            createWorker('inflater', (worker) => {
                // look for End of central directory record
                seekEOCDR(reader, (dataView) => {
                    const dataLength = dataView.getUint32(16, true);
                    const filesLength = dataView.getUint16(8, true);
                    if (dataLength < 0 || dataLength >= reader.size) {
                        return reject();
                    }

                    reader.readUint8Array(dataLength, reader.size - dataLength, (bytes) => {
                        let index = 0;
                        let filename;
                        let comment;
                        let data = getDataHelper(bytes.length, bytes);
                        let entries = [];
                        const queue = [];
                        const dataOptions = {
                            inflateSN: 0
                        };

                        for (let i = 0; i < filesLength; i++) {
                            const entry = new Entry({
                                reader,
                                worker,
                                writer: new BlobWriter()
                            });

                            if (data.view.getUint32(index) !== 0x504b0102) {
                                return reject(new Error(ERR_BAD_FORMAT));
                            }

                            readCommonHeader(entry, data, index + 6, true, onerror);
                            entry.commentLength = data.view.getUint16(index + 32, true);
                            entry.directory = ((data.view.getUint8(index + 38) & 0x10) == 0x10);
                            entry.offset = data.view.getUint32(index + 42, true);
                            filename = getString(data.array.subarray(index + 46, index + 46 + entry.filenameLength));

                            if ((entry.bitFlag & 0x0800) === 0x0800) {
                                entry.filename = decodeUTF8(filename);
                            } else {
                                entry.filename = decodeASCII(filename);
                            }

                            if (!entry.directory && entry.filename[entry.filename.length - 1] === '/') {
                                entry.directory = true;
                            }

                            const val = index + 46 + entry.filenameLength + entry.extraFieldLength;
                            index = val + entry.commentLength;
                            comment = getString(data.array.subarray(val, index));

                            if ((entry.bitFlag & 0x0800) === 0x0800) {
                                entry.comment = decodeUTF8(comment);
                            } else {
                                entry.comment = decodeASCII(comment);
                            }

                            entries.push(entry);
                            queue.push(entry.getData(dataOptions));
                        }

                        Promise.all(queue).then((files) => {
                            const data = files.map((file, i) => {
                                return {
                                    file,
                                    entry: entries[i]
                                };
                            });

                            entries = null;
                            resolve(data);
                        }, reject);
                    }, () => reject(new Error(ERR_READ)));
                });
            }, reject);
        });
    }
};
