import buildElement from './src/buildElement';
import buildPageNumber from './src/buildPageNumber';
import buildStyle from './src/buildStyle';
import setStyles from './src/setStyles';
import setProperties from './src/setProperties';
import merge from './../../../utils/merge';

class Html {
    constructor (options) {
        this.options = merge({
            pageClassName: 'jf-page'
        }, options);
    }

    setStyles = setStyles

    setProperties = setProperties

    buildElement = buildElement

    buildDocument (content, styles) {
        let doc = document.createDocumentFragment();

        if (!Array.isArray(content) || !Array.isArray(styles)) {
            return doc;
        }

        const pageClassName = this.options.pageClassName;
        content.forEach(function (page) {
            let el = this.buildElement(page);
            el.classList.add(pageClassName);

            if (page.properties && page.properties.pageNumber) {
                buildPageNumber(el, page);
            }

            doc.appendChild(el);
        }, this);

        doc.appendChild(buildStyle(styles, {
            pageClassName
        }));
        return doc;
    }
}

export default Html;
