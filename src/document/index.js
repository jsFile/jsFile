import Html from './src/html/index';
import merge from './../utils/merge';
import clone from './../utils/merge';

/**
 * @param attrs
 */
class Document {
    constructor (attrs = {}) {
        this._data = {
            meta: merge({
                name: '',
                language: ''
            }, attrs.meta),
            content: [],
            styles: []
        };

        if (Array.isArray(attrs.content)) {
            this._data.content = attrs.content;
        }

        if (Array.isArray(attrs.styles)) {
            this._data.styles = attrs.styles;
        }

        let zoom = Number(this._data.meta.zoom);
        let wordsCount = Number(this._data.meta.wordsCount);

        if (isNaN(zoom) || zoom < 0 || zoom > 100) {
            zoom = 100;
        } else {
            zoom = Math.round(zoom * 100) / 100;
        }

        if (isNaN(wordsCount) || wordsCount < 0) {
            wordsCount = 0;
        }

        this._data.meta.zoom = zoom;
        this._data.meta.wordsCount = wordsCount;
    }

    html (options) {
        const html = new Html(options);
        return html.buildDocument(this._data);
    }

    json () {
        return clone(this._data);
    }

    page (index) {
        return clone(this._data.content[index]);
    }
}

Object.defineProperties(Document, {
    elementPrototype: {
        get: () => {
            return {
                children: [],
                style: {
                    position: 'relative',
                    boxSizing: 'border-box'
                },
                properties: {
                    tagName: 'DIV',
                    textContent: ''
                }
            };
        }
    }
});

/**
 *
 */
Object.defineProperties(Document.prototype, {
    /**
     *
     */
    language: {
        get: function () {
            return this._data.meta.language;
        }
    },

    /**
     *
     */
    name: {
        get: function () {
            return this._data.meta.name;
        }
    },

    /**
     *
     */
    wordsCount: {
        get: function () {
            return this._data.meta.wordsCount;
        }
    },

    /**
     *
     */
    length: {
        get: function () {
            return this._data.content.length;
        }
    },

    /**
     *
     */
    zoom: {
        get: function () {
            return this._data.meta.zoom;
        }
    },

    /**
     *
     */
    isEmpty: {
        get: function () {
            return !(this._data.content && this._data.content[0]);
        }
    }
});

export default Document;