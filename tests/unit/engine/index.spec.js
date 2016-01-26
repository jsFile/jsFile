import JsFile from './../../../src/index';
import ZipEntry from './../../../src/zip/src/Entry';
import readFileEntry from './../../../src/engine/src/readFileEntry';
const {Engine} = JsFile;
const {invalidReadFile, invalidReadArchive, invalidFileType, notFoundMethodCreateDocument} = Engine.errors;

class CustomEngine extends Engine {
    constructor (file) {
        super(...arguments);
        this.file = file;
    }

    isValid () {
        return Boolean(this.file);
    }

    createDocument (data) {
        return Promise.resolve(data);
    }
}

describe('Engine', function () {
    this.timeout(5000);

    let files = [];
    const filesCache = window.files;

    before(() => {
        for (var k in filesCache) {
            if (filesCache.hasOwnProperty(k)) {
                files.push(filesCache[k]);
            }
        }
    });

    it('should has a test files', () => {
        assert.notEqual(files.length, 0);
    });

    it('should be a "constructor"', () => {
        assert.isFunction(Engine);
    });

    describe('#validateUrl()', () => {
        it('should exist', () => {
            assert.isFunction(Engine.validateUrl);
        });

        it('should accept valid HTTP(S), FTP URLs', () => {
            assert.isTrue(Engine.validateUrl('http://example.com'));
            assert.isTrue(Engine.validateUrl('https://example.com'));
            assert.isTrue(Engine.validateUrl('ftp://example.com'));
        });

        it('should decline all invalid URLs', () => {
            assert.isFalse(Engine.validateUrl('example.com'));
            assert.isFalse(Engine.validateUrl('example...com'));
            assert.isFalse(Engine.validateUrl('h://example.com'));
        });
    });

    describe('#validateFile()', () => {
        it('should return false if can\'t find the file', () => {
            const file = new Blob();
            file.name = 'test';

            assert.isFalse(Engine.validateFile());
            assert.isFalse(Engine.validateFile(file));
            assert.isFalse(Engine.validateFile({}, {}));
            assert.isFalse(Engine.validateFile(file, {extension: 'txt'}));
        });

        it('should find the file by name or mime type', () => {
            const file = new Blob([], {type: 'text/plain'});
            file.name = 'test.txt';

            assert.isTrue(Engine.validateFile(file, {mime: 'text/plain'}));
            assert.isTrue(Engine.validateFile(file, {mime: ['text/plain']}));
            assert.isTrue(Engine.validateFile(file, {extension: ['txt']}));
            assert.isTrue(Engine.validateFile(file, {extension: 'txt'}));
        });
    });

    describe('halfTabAsSpaces', () => {
        it('should 2 space symbols', () => {
            assert.equal(Engine.halfTabAsSpaces, '\u2000\u2000');
        });
    });

    describe('tabAsSpaces', () => {
        it('should 4 space symbols', () => {
            assert.equal(Engine.tabAsSpaces, '\u2000\u2000\u2000\u2000');
        });
    });

    describe('emDash', () => {
        it('should return em dash', () => {
            assert.equal(Engine.emDash.charCodeAt(0), 8212);
        });
    });

    describe('enDash', () => {
        it('should return en dash', () => {
            assert.equal(Engine.enDash.charCodeAt(0), 8211);
        });
    });

    describe('#formatPropertyName()', () => {
        it('should convert property name to lowerCamelCase notation', () => {
            expect(Engine.formatPropertyName('margin-top')).to.equal('marginTop');
            expect(Engine.formatPropertyName('margin-top---')).to.equal('marginTop');
            expect(Engine.formatPropertyName('margin---top---')).to.equal('marginTop');
            expect(Engine.formatPropertyName('-margin-top-')).to.equal('marginTop');
            expect(Engine.formatPropertyName('style:margin-top')).to.equal('marginTop');
            expect(Engine.formatPropertyName('x:border-right-width')).to.equal('borderRightWidth');
        });

        it('should convert property name to lowerCamelCase notation', () => {
            expect(Engine.formatPropertyName('margin-top', {capitalize: true})).to.equal('MarginTop');
        });
    });

    describe('#attributeToBoolean()', () => {
        it('should return true for "true" variants', () => {
            assert.isTrue(Engine.attributeToBoolean(1));
            assert.isTrue(Engine.attributeToBoolean('1'));
            assert.isTrue(Engine.attributeToBoolean('on'));
            assert.isTrue(Engine.attributeToBoolean('true'));
            assert.isTrue(Engine.attributeToBoolean(true));
            assert.isTrue(Engine.attributeToBoolean({value: 1}));
            assert.isTrue(Engine.attributeToBoolean({value: '1'}));
        });

        it('should return false for "false" variants', () => {
            assert.isFalse(Engine.attributeToBoolean(0));
            assert.isFalse(Engine.attributeToBoolean('0'));
            assert.isFalse(Engine.attributeToBoolean('off'));
            assert.isFalse(Engine.attributeToBoolean());
            assert.isFalse(Engine.attributeToBoolean({value: 0}));
            assert.isFalse(Engine.attributeToBoolean({value: '0'}));
        });
    });

    describe('#isValid()', () => {
        it('should read the file', () => {
            files.forEach((file) => {
                let engine = new Engine(file);
                assert.isFalse(engine.isValid(), `Engine is invalid without file type`);

                engine = new CustomEngine(file);
                assert.isTrue(engine.isValid(), `Engine with normal file should be valid`);
            });
        });
    });

    describe('#readSingleFile()', () => {
        it('should read the content of file', (done) => {
            let file;
            files.some((f) => {
                if (f.type.includes('plain')) {
                    file = f;
                    return true;
                }
            });

            assert.isNotNull(file);

            let engine = new CustomEngine(file, {
                workerPath: '/base/dist/workers/'
            });
            engine.readSingleFile().then((data) => {
                const length = data && data.length || 0;
                assert.notEqual(length, 0);
                done();
            }).catch(done);
        });

        it('should reject if `createDocument` method is not specified', (done) => {
            let file;
            files.some((f) => {
                if (f.type.includes('plain')) {
                    file = f;
                    return true;
                }
            });

            assert.isNotNull(file);

            let engine = new CustomEngine(file, {
                workerPath: '/base/dist/workers/'
            });
            engine.createDocument = null;
            engine.readSingleFile().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, notFoundMethodCreateDocument);
                done();
            });
        });

        it('should reject if file is invalid', (done) => {
            let engine = new CustomEngine(new Blob(), {
                workerPath: '/base/dist/workers/'
            });
            engine.isValid = () => false;
            engine.readSingleFile().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, invalidFileType);
                done();
            });
        });
    });

    describe('#readArchive()', function () {
        it('should reject if file is invalid', (done) => {
            let engine = new CustomEngine(new Blob(), {
                workerPath: '/base/dist/workers/'
            });
            engine.isValid = () => false;
            engine.readArchive().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, invalidFileType);
                done();
            });
        });

        it('should reject if createDocument fails. Base error', (done) => {
            let file;
            files.some((f) => {
                if (!f.type.includes('plain')) {
                    file = f;
                    return true;
                }
            });

            assert.isNotNull(file);

            let engine = new CustomEngine(file, {
                workerPath: '/base/dist/workers/'
            });
            engine.createDocument = () => Promise.reject();
            engine.readArchive().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, invalidReadArchive);
                done();
            });
        });

        it('should reject if createDocument fails. Error from createDocument', (done) => {
            let file;
            files.some((f) => {
                if (!f.type.includes('plain')) {
                    file = f;
                    return true;
                }
            });

            assert.isNotNull(file);

            let engine = new CustomEngine(file, {
                workerPath: '/base/dist/workers/'
            });
            engine.createDocument = () => Promise.reject(new Error('test-error'));
            engine.readArchive().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, 'test-error');
                done();
            });
        });

        it('should read the content of file', (done) => {
            let file;
            files.some((f) => {
                if (!f.type.includes('plain')) {
                    file = f;
                    return true;
                }
            });

            assert.isNotNull(file);

            let engine = new CustomEngine(file, {
                workerPath: '/base/dist/workers/'
            });
            engine.readArchive().then((data) => {
                const length = data && data.length || 0;
                assert.notEqual(length, 0);

                data.forEach(({file, entry}) => {
                    assert.isTrue(entry instanceof ZipEntry, 'Should be instance of zip Entry');
                    assert.isTrue(file instanceof File || file instanceof Blob, 'Should be File or Blob');
                });

                done();
            }).catch(done);
        });
    });

    describe('#readFileEntry()', () => {
        it('should reject if file is not specified', (done) => {
            readFileEntry().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, invalidReadFile);
                done();
            });
        });
    });

    describe('#getCharFromHex()', () => {
        it('should get character by its hex code', () => {
            assert.equal(Engine.getCharFromHex(77), 'w');
            assert.equal(Engine.getCharFromHex('7B'), '{');
        });
    });

    describe('#replaceSpaces()', () => {
        it('should replace two and more spaces to double Unicode symbols', () => {
            assert.equal(Engine.replaceSpaces('hello    world'), 'hello\u2000\u2000world');
        });
    });

    describe('#cropUnit()', () => {
        it('should replace non-digit values', () => {
            assert.strictEqual(Engine.cropUnit('1px'), 1);
            assert.strictEqual(Engine.cropUnit('1'), 1);
            assert.strictEqual(Engine.cropUnit('1 pt'), 1);
            assert.strictEqual(Engine.cropUnit('12.16 pt'), 12.16);
        });
    });

    describe('#normalizeColorValue()', () => {
        it('should return hex value of the color', () => {
            assert.strictEqual(Engine.normalizeColorValue(), '#000000');
            assert.strictEqual(Engine.normalizeColorValue('black'), '#000000');
            assert.strictEqual(Engine.normalizeColorValue('fafafa'), '#FAFAFA');
            assert.strictEqual(Engine.normalizeColorValue('#cccccc'), '#CCCCCC');
            assert.strictEqual(Engine.normalizeColorValue('springgreen'), '#00FF7F');
        });
    });

    describe('#normalizeDataUri()', () => {
        it('should normalize the dataUri value', () => {
            assert.strictEqual(Engine.normalizeDataUri('data:;test'), 'data:;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.png'), 'data:image/png;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.ico'), 'data:image/x-icon;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.jpg'), 'data:image/jpeg;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.jpeg'), 'data:image/jpeg;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.pjpeg'), 'data:image/pjpeg;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.gif'), 'data:image/gif;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.svg'), 'data:image/svg+xml;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.tiff'), 'data:image/tiff;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.tif'), 'data:image/tiff;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'i.wbmp'), 'data:image/vnd.wap.wbmp;test');
            assert.strictEqual(Engine.normalizeDataUri('data:;test', 'f.woff'), 'data:application/font-woff;test');
        });
    });
});