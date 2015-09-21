/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    let el = document.createElement('div');

    this.setStyles(el, data);
    this.setProperties(el, data);

    data.children.forEach(function (child) {
        let part = document.createElement('div');

        this.setStyles(part, child);
        this.setProperties(part, child);

        child.children.forEach(function (child) {
            part.appendChild(this.buildElement(child));
        }.bind(this));

        el.appendChild(part);
    }.bind(this));

    return el;
}