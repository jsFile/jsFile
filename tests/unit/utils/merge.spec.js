import merge from './../../../src/utils/merge';

describe('utils', () => {
    describe('#merge()', () => {
        it('should deep merge objects', () => {
            const obj1 = {
                name: '',
                data: {
                    f: '5'
                },
                pattern: /[0-9]+test/,
                list: []
            };
            const obj2 = {
                value: 93,
                date: new Date('2013'),
                data: {
                    f: 4
                },
                list: [1, 2, 3, {a: 1}, [5, 6], new Date('2015'), /test/]
            };
            const result = {
                name: '',
                value: 93,
                pattern: /[0-9]+test/,
                date: new Date('2013'),
                data: {
                    f: 4
                },
                list: [1, 2, 3, {a: 1}, [5, 6], new Date('2015'), /test/]
            };

            assert.deepEqual(merge(obj1, obj2), result);
        });
    });
});