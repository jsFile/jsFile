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

        this.setStyles = setStyles;
        this.setProperties = setProperties;
        this.buildElement = buildElement;
    }

    buildDocument (params = {}) {
        const {content, styles} = params;
        let doc = document.createDocumentFragment();

        if (!Array.isArray(content) || !Array.isArray(styles)) {
            return doc;
        }

        const pageClassName = this.options.pageClassName;
        content.forEach(function (page) {
            let el = this.buildElement(page);
            el.classList.add(pageClassName);

            if (page.properties && page.properties.pageNumber != null) {
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
