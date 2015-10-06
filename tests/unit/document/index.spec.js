import JsFile from './../../../dist/jsfile.js';
const {Document} = JsFile;

describe('Document', function () {
    it('should be a "constructor"', function () {
        assert.isFunction(Document);
    });

    it('should be not a native Document', function () {
        assert.notStrictEqual(Document !== window.Document);
    });

    describe('zoom', function () {
        it('should return number between 0 and 100. Default is 100', function () {
            expect(new Document({zoom: 1}).zoom).to.equal(1);
            expect(new Document({zoom: 1.333333333}).zoom).to.equal(1.33);
            expect(new Document({zoom: 'sfsd'}).zoom).to.equal(100);
            expect(new Document({zoom: 101}).zoom).to.equal(100);
            expect(new Document({zoom: -2}).zoom).to.equal(100);
            expect(new Document().zoom).to.equal(100);
        });
    });

    describe('isEmpty', function () {
        it('should return true if document has no pages', function () {
            assert.isTrue(new Document({content: []}).isEmpty);
            assert.isTrue(new Document().isEmpty);
        });

        it('should return false if document has 1 or more pages', function () {
            assert.isFalse(new Document({content: [{}]}).isEmpty);
            assert.isFalse(new Document({content: [{}, {}]}).isEmpty);
        });
    });

    describe('length', function () {
        it('should return count of document pages', function () {
            expect(new Document({content: []}).length).to.equal(0);
            expect(new Document({content: [{}]}).length).to.equal(1);
            expect(new Document().length).to.equal(0);
        });
    });

    describe('language', function () {
        it('should return language of the document', function () {
            expect(new Document({language: 'en'}).language).to.equal('en');
            expect(new Document({}).language).to.equal('');
        });
    });

    describe('name', function () {
        it('should return name of the document', function () {
            expect(new Document({name: 'test'}).name).to.equal('test');
            expect(new Document({}).name).to.equal('');
        });
    });

    describe('wordsCount', function () {
        it('should return words count. 0 by default', function () {
            expect(new Document({wordsCount: 100}).wordsCount).to.equal(100);
            expect(new Document().wordsCount).to.equal(0);
            expect(new Document({wordsCount: 'fds'}).wordsCount).to.equal(0);
            expect(new Document({wordsCount: '1'}).wordsCount).to.equal(1);
            expect(new Document({wordsCount: -10}).wordsCount).to.equal(0);
        });
    });

    describe('#html()', function () {
        it('should documentFragment with built pages', function () {
            expect(new Document().html()).to.instanceof(DocumentFragment);
            const html = new Document({
                content: [
                    {}
                ]
            }).html();
            assert.equal(html.children.length, 2, 'content & styles');
        });
    });

    describe('#json()', function () {
        it('should documentFragment with built pages', function () {
            const json = new Document({
                content: [
                    {}
                ]
            }).json();
            expect(json.content.length).to.equal(1);
        });
    });
});