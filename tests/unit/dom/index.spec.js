import JsFile from './../../../src/index';
const {dom: $} = JsFile;

describe('dom', function () {
    describe('#children()', function () {
        it('should return all children nodes as array', function () {
            let children;
            const len = 10;
            const el = document.createElement('div');

            for (let i = 0; i < len; i++) {
                el.appendChild(document.createElement('div'));
            }

            children = $.children(el);

            expect(children).to.be.an('array');
            expect(children.length).to.equal(len);

            children = $.children();

            expect(children).to.be.an('array');
            expect(children.length).to.equal(0);
        });
    });
});