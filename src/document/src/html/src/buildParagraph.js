/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data = {}) {
    const el = document.createElement('p');

    this.setStyles(el, data);
    this.setProperties(el, data);

    (data.children || []).forEach((child) => {
        el.appendChild(this.buildElement(child));
    });

    return el;
}