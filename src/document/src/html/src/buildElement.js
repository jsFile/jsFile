/**
 *
 * @param data
 * @private
 */
export default function (data = {}) {
    let properties = data.properties || {};
    const tagName = properties.tagName;
    let el = document.createElement(tagName);

    this.setStyles(el, data);
    this.setProperties(el, data);

    (data.children || []).forEach(function (child) {
        el.appendChild(this.buildElement(child));
    }.bind(this));

    return el;
}