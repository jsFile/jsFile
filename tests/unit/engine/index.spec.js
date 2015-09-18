import JsFile from './../../../src/index';
import ZipEntry from './../../../src/zip/src/Entry';
const {Engine} = JsFile;

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

describe('Engine', () => {
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

    describe('#getMaxFontSize()', () => {
        assert.equal(Engine.getMaxFontSize(), 0);
        assert.equal(Engine.getMaxFontSize({}), 0);
        assert.equal(Engine.getMaxFontSize({
            style: {
                fontSize: {
                    value: 10,
                    unit: 'pt'
                }
            }
        }), 10);
        assert.equal(Engine.getMaxFontSize({
            style: {
                fontSize: {
                    value: 10,
                    unit: 'pt'
                }
            },
            children: [
                {
                    style: {
                        fontSize: {
                            value: 12,
                            unit: 'pt'
                        }
                    }
                }
            ]
        }), 12);
        assert.equal(Engine.getMaxFontSize({
            style: {
                fontSize: {
                    value: 10,
                    unit: 'pt'
                }
            },
            children: [
                {
                    style: {
                        fontSize: {
                            value: 15,
                            unit: 'pt'
                        }
                    }
                },
                {
                    style: {
                        fontSize: {
                            value: 11,
                            unit: 'pt'
                        }
                    }
                }
            ]
        }), 15);
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
    });

    describe('#readArchive()', function () {
        this.timeout(15000);
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
});