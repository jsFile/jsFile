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

    (data.children || []).forEach((child) => {
        el.appendChild(this.buildElement(child));
    });

    return el;
}