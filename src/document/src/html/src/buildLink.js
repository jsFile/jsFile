/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data = {}) {
    let el = document.createElement('a');

    this.setStyles(el, data);
    this.setProperties(el, data);

    (data.children || []).forEach((child) => {
        el.appendChild(this.buildElement(child));
    });

    return el;
}