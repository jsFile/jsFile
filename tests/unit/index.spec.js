import JsFile from './../../src/index';
const {Engine, Document} = JsFile;

describe('JsFile', () => {
    it('should exist', () => {
        assert.isFunction(JsFile);
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

    describe('#defineEngine()', () => {
        it('should be defined and return the engine if we set the name, formats array and engine as instace of JsFile.Engine', () => {
            class CustomEngine extends Engine {
                static mimeTypes = [];
                static test () {}
            }

            assert.isNotNull(JsFile.defineEngine(CustomEngine));
        });

        it('should return null if all parameters are not valid', () => {
            class CustomEngine {
                static mimeTypes = [];
            }

            //jscs:disable
            assert.isNull(JsFile.defineEngine(() => {}));
            assert.isNull(JsFile.defineEngine(() => {}));
            assert.isNull(JsFile.defineEngine({}));
            assert.isNull(JsFile.defineEngine([], {}));
            assert.isNull(JsFile.defineEngine([], () => {}));

            //jscs:enable
            assert.isNull(JsFile.defineEngine(CustomEngine));
        });
    });

    describe('#read()', function () {
        this.timeout(15000);

        it('should return a Promise', () => {
            assert.instanceOf(new JsFile().read(), Promise);
        });

        it('should reject the request when we try to read invalid file', ((done) => {
            new JsFile().read().catch(() => {
                done();
            });
        }));
    });
});