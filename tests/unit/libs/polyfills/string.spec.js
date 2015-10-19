import setString from './../../../../src/libs/polyfills/string';

describe('libs', () => {
    describe('polyfills', () => {
        describe('string', () => {
            describe('#includes()', () => {
                beforeEach(() => {
                    //remove native method
                    String.prototype.includes = null;
                    setString();
                });

                it('should add `includes` method', () => {
                    assert.isTrue('test'.includes('t'));
                    assert.isTrue('123'.includes(2));
                    assert.isFalse('test'.includes('T'));
                });
            });
        });
    });
});