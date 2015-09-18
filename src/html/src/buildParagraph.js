/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data = {}) {
    let el = document.createElement('p');

    this.setStyles(el, data);
    this.setProperties(el, data);

    (data.children || []).forEach(function (child) {
        el.appendChild(this.buildElement(child));
    }.bind(this));

    return el;
}