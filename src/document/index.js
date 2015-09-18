import Html from './../html/index';
import merge from './../utils/merge';

/**
 * @param attrs
 */
class Document {
    constructor (attrs = {}) {
        let zoom = Number(attrs.zoom);
        let wordsCount = Number(attrs.wordsCount);

        this._data = merge({
            name: '',
            language: '',
            pages: []
        }, attrs);

        if (isNaN(zoom) || zoom < 0 || zoom > 100) {
            zoom = 100;
        } else {
            zoom = Math.round(zoom * 100) / 100;
        }

        if (isNaN(wordsCount) || wordsCount < 0) {
            wordsCount = 0;
        }

        this._data.zoom = zoom;
        this._data.wordsCount = wordsCount;
    }

    html (options) {
        let html = new Html(options);

        return html.buildDocument(this._data.pages);
    }

    json () {
        return this._data.pages.slice(0);
    }

    page (index) {
        return this._data.pages[index];
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
            return this._data.language;
        }
    },

    /**
     *
     */
    name: {
        get: function () {
            return this._data.name;
        }
    },

    /**
     *
     */
    wordsCount: {
        get: function () {
            return this._data.wordsCount;
        }
    },

    /**
     *
     */
    length: {
        get: function () {
            return this._data.pages.length;
        }
    },

    /**
     *
     */
    zoom: {
        get: function () {
            return this._data.zoom;
        }
    },

    /**
     *
     */
    isEmpty: {
        get: function () {
            return !(this._data.pages && this._data.pages[0]);
        }
    }
});

export default Document;