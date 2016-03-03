import JsFile from './../../src/index';
const {Engine} = JsFile;
const {invalidFileType, invalidParser, requiredTechnologies} = Engine.errors;

describe('JsFile', () => {
    beforeEach(() => {
        JsFile.removeEngine();
    });

    it('should exist', () => {
        assert.isFunction(JsFile);
    });

    it('should set the config', () => {
        const config = {
            foo: 'bar',
            bar: 'foo'
        };
        const jf = new JsFile({}, config);
        assert.isDefined(jf.config.workerPath);
        assert.includeMembers(Object.keys(jf.config), Object.keys(config));
    });

    describe('isSupported', () => {
        it('should be TRUE if we have all required technologies', () => {
            assert.isTrue(JsFile.isSupported);
        });

        it('should be FALSE if we don\'t have all required technologies', () => {
            var File = window.File;

            window.File = undefined;

            assert.isFalse(JsFile.isSupported);

            window.File = File;
            File = null;
        });
    });

    describe('mimeTypes', () => {
        it('should be an array', () => {
            assert.isArray(JsFile.mimeTypes);
        });
    });

    describe('#removeEngine', () => {
        it('should remove all defined engines', () => {
            class CustomEngine extends Engine {
                static test () {
                    return true;
                }
            }

            CustomEngine.mimeTypes = [];

            JsFile.defineEngine(CustomEngine);
            JsFile.removeEngine();
            const jf = new JsFile({});
            assert.equal(jf.findEngine(), null);
        });

        it('should remove specified engine', () => {
            class Engine1 extends Engine {
                static test () {
                    return false;
                }
            }

            Engine1.mimeTypes = [];

            class Engine2 extends Engine {
                static test () {
                    return true;
                }
            }

            Engine2.mimeTypes = [];

            JsFile.defineEngine(Engine1);
            JsFile.defineEngine(Engine2);
            JsFile.removeEngine(Engine2);
            const jf = new JsFile({});
            assert.equal(jf.findEngine(), null);
        });
    });

    describe('#defineEngine()', () => {
        it('should return the engine if we set the name, formats array and engine as instance of JsFile.Engine', () => {
            class CustomEngine extends Engine {
                static test () {}
            }

            CustomEngine.mimeTypes = [];
            assert.isNotNull(JsFile.defineEngine(CustomEngine));
        });

        it('should return null if all parameters are not valid', () => {
            class CustomEngine {
            }

            CustomEngine.mimeTypes = [];

            assert.isNull(JsFile.defineEngine(() => {}));
            assert.isNull(JsFile.defineEngine(() => {}));
            assert.isNull(JsFile.defineEngine({}));
            assert.isNull(JsFile.defineEngine([], {}));
            assert.isNull(JsFile.defineEngine([], () => {}));
            assert.isNull(JsFile.defineEngine(CustomEngine));
        });
    });

    describe('#findEngine()', () => {
        class Engine1 extends Engine {
            static test () {
                return false;
            }
        }

        Engine1.mimeTypes = [];

        class Engine2 extends Engine {
            static test () {
                return true;
            }
        }

        Engine2.mimeTypes = [];

        JsFile.defineEngine(Engine1);
        JsFile.defineEngine(Engine2);
        const jf = new JsFile({});
        assert.equal(jf.findEngine(), Engine2);
    });

    describe('#read()', function () {
        this.timeout(15000);

        it('should return a Promise', () => {
            assert.instanceOf(new JsFile().read(), Promise);
        });

        it(`should reject the request when environment doesn't have supported dependencies`, (done) => {
            var File = window.File;

            window.File = undefined;

            new JsFile().read().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, requiredTechnologies);
                done();
            });

            window.File = File;
        });

        it('should reject the request when we try to read invalid file', ((done) => {
            new JsFile().read().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, invalidFileType);
                done();
            });
        }));

        it('should reject the request when no engines are found', ((done) => {
            const file = new Blob();
            new JsFile(file).read().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, invalidFileType);
                done();
            });
        }));

        it('should reject the request when the parser is undefined', ((done) => {
            const file = new Blob();
            class Eng extends Engine {
                constructor () {
                    super(...arguments);
                    this.parser = 'unknown';
                }

                static test () {
                    return true;
                }
            }

            Eng.mimeTypes = [];

            JsFile.defineEngine(Eng);
            new JsFile(file).read().catch((error) => {
                assert.instanceOf(error, Error);
                assert.equal(error.message, invalidParser);
                done();
            });
        }));

        it('should run the parser of specified engine', ((done) => {
            let called = false;
            const file = new Blob();

            class Eng extends Engine {
                createDocument () {
                    return Promise.resolve({});
                }

                parser () {
                    called = true;
                    return Promise.resolve();
                }

                static test () {
                    return true;
                }
            }

            Eng.mimeTypes = [];

            class FakeJsFile extends JsFile {
                findEngine () {
                    return Eng;
                }
            }

            const engine = new FakeJsFile(file, {
                workerPath: '/base/dist/workers/'
            });

            engine.read().then(() => {
                assert.equal(called, true, 'Specified parser was not called');
                done();
            });
        }));
    });
});