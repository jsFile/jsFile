import merge from './../../../src/utils/merge';

describe('utils', () => {
    describe('#merge()', () => {
        it('should deep merge objects', () => {
            const obj1 = {
                name: '',
                list: []
            };
            const obj2 = {
                value: 93,
                list: [1, 2, 3]
            };
            const result = {
                name: '',
                value: 93,
                list: [1, 2, 3]
            };

            assert.deepEqual(merge(obj1, obj2), result);
        });
    });
});