import buildElement from './src/buildElement';
import buildPageNumber from './src/buildPageNumber';
import setStyles from './src/setStyles';
import setProperties from './src/setProperties';
import merge from './../utils/merge';

class Html {
    constructor (options) {
        this.options = merge({
            pageClassName: 'jf-page'
        }, options);
    }

    setStyles = setStyles

    setProperties = setProperties

    buildElement = buildElement

    buildDocument (pages) {
        let doc = document.createDocumentFragment();

        if (!Array.isArray(pages)) {
            return doc;
        }

        const pageClassName = this.options.pageClassName;
        pages.forEach(function (page) {
            let pageEl = this.buildElement(page);
            pageEl.classList.add(pageClassName);

            if (page.properties && page.properties.pageNumber) {
                buildPageNumber(pageEl, page);
            }

            doc.appendChild(pageEl);
        }, this);

        return doc;
    }
}

export default Html;
