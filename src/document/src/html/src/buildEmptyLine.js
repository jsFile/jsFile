/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    let el = document.createElement('br');

    this.setStyles(el, data);
    this.setProperties(el, data);

    return el;
}