/**
 * @description
 * @param value
 * @param options
 * @return {String}
 * @private
 */
export default function (value, options = {}) {
    /**
     * @description
     * Remove namespace of property. namespace:property => property
     * Transform property sub parts to Camel notation. my-property => myProperty
     * @type {string}
     */
    let src = String(value || '')
        .replace(/^[0-9a-zA-Z-_]+:/, '')
        .replace(/-+([^-]?)/g, (f, part) => (part && part.toUpperCase() || ''));

    return src.charAt(0)[options.capitalize ? 'toUpperCase' : 'toLowerCase']() + src.slice(1);
}