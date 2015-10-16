import Html from './../../../../../src/document/src/html/index';
import prepareStyleProperties from './../../../../../src/document/src/html/src/prepareStyleProperties';
import buildStyle from './../../../../../src/document/src/html/src/buildStyle';

describe('Document', () => {
    describe('Html', () => {
        describe('#buildDocument()', () => {
            it('should return an empty document fragment if content or styles are empty', () => {
                const html = new Html();
                const doc1 = html.buildDocument();
                const doc2 = html.buildDocument({
                    content: []
                });
                const doc3 = html.buildDocument({
                    content: '',
                    styles: []
                });

                assert.equal(doc1.childNodes.length, 0);
                assert.equal(doc2.childNodes.length, 0);
                assert.equal(doc3.childNodes.length, 0);
            });

            it(`shouldn't build a page number when the data for it isn't specified`, () => {
                const html = new Html();
                const doc = html.buildDocument({
                    content: [
                        {
                            properties: {
                                pageNumber: 1
                            }
                        }
                    ],
                    styles: []
                });

                assert.equal(doc.childNodes[0].childNodes.length, 0);
            });

            it('should build a page number', () => {
                const html = new Html();
                const doc = html.buildDocument({
                    content: [
                        {
                            style: {
                                paddingRight:{
                                    value: 1,
                                    unit: 'pt'
                                }
                            },
                            properties: {
                                header: {
                                    style: {
                                        height: {
                                            value: 1,
                                            unit: 'pt'
                                        }
                                    }
                                },
                                pageNumber: 0
                            }
                        }
                    ],
                    styles: []
                });

                assert.equal(doc.childNodes[0].childNodes.length, 1);
            });
        });

        describe('#prepareStyleProperties()', () => {
            it('should convert style properties to single object', () => {
                const result = prepareStyleProperties({
                    top: {
                        value: 2,
                        unit: 'px'
                    },
                    display: 'inline'
                });
                const expected = {
                    top: '2px',
                    display: 'inline'
                };

                assert.deepEqual(result, expected);
            });
        });

        describe('#buildElement()', () => {
            const src = {
                children: [
                    {
                        properties: {
                            tagName: 'DIV'
                        }
                    }
                ],
                properties: {
                    tagName: 'SECTION'
                }
            };
            const html = new Html();
            const el = html.buildElement(src);

            assert.equal(el.tagName, src.properties.tagName);
            assert.equal(el.childNodes[0].tagName, src.children[0].properties.tagName);
        });

        describe('#buildStyle()', () => {
            const pageClassName = 'test';
            const styleEl = buildStyle([{
                selector: 'p, .link',
                properties: {
                    width: {
                        value: 2,
                        unit: 'pt'
                    },
                    color: '#333333'
                }
            }], {pageClassName});
            const expectedStyles = `.${pageClassName} p, .${pageClassName} .link {
                width: 2pt;
                color: #333333;
            }`;

            assert.equal(styleEl.textContent.replace(/\s/g, ''), expectedStyles.replace(/\s/g, ''));
        });
    });
});