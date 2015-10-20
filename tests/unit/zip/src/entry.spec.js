import Entry from './../../../../src/zip/src/Entry';

describe('zip', () => {
    describe('Entry', () => {
        let entry;

        beforeEach(() => {
            entry = new Entry();
        });

        describe('#testCrc32()', () => {
            it('should validate checksum', () => {
                entry.crc32 = 1;
                assert.isTrue(entry.testCrc32(1));
                assert.isFalse(entry.testCrc32(10));
            });
        });
    });
});