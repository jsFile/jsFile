import * as zip from './zip';
const {
    copy,
    readCommonHeader,
    getDataHelper,
    inflate,
    ERR_BAD_FORMAT,
    ERR_READ_DATA,
    ERR_WRITE_DATA
} = zip;

class Entry {
    constructor (options) {
        Object.merge(this, options);
    }
    
    testCrc32 (crc32) {
        const dataCrc32 = getDataHelper(4);
        dataCrc32.view.setUint32(0, crc32);
        return this.crc32 === dataCrc32.view.getUint32(0);
    }

    getData (options = {}) {
        return new Promise(function (resolve, reject) {
            let checkCrc32 = options.checkCrc32;

            function onReadError(err) {
                reject(new Error(err || ERR_READ_DATA));
            }

            onReadError = onReadError.bind(this);
    
            function onWriteError(err) {
                reject(new Error(err || ERR_WRITE_DATA));
            }
    
            this.reader.readUint8Array(this.offset, 30, function (bytes) {
                const data = getDataHelper(bytes.length, bytes);
                if (data.view.getUint32(0) !== 0x504b0304) {
                    reject(new Error(ERR_BAD_FORMAT));
                    return;
                }
                
                readCommonHeader(this, data, 4, false, onerror);
                const dataOffset = this.offset + 30 + this.filenameLength + this.extraFieldLength;
                let {writer, reader, worker, compressedSize} = this;
                options.inflateSN++;
                writer.init(function() {
                    let method = inflate;
                    
                    if (this.compressionMethod === 0) {
                        method = copy;
                    }
                    method(
                        worker, 
                        options.inflateSN,
                        reader, 
                        writer, 
                        dataOffset, 
                        compressedSize, 
                        checkCrc32,
                        function (uncompressedSize, crc32) {
                            if (checkCrc32 && !this.testCrc32(crc32)) {
                                reject(new Error(ERR_CRC));
                            } else {
                                writer.getData((data) => resolve(data));
                            }
                        }.bind(this), 
                        null, 
                        onReadError, 
                        onWriteError
                    );
                }.bind(this), onWriteError);
            }.bind(this), onReadError);
        }.bind(this));
    };
}

export default Entry;
