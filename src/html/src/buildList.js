/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    let el = document.createElement('ul');

    this.setStyles(el, data);
    this.setProperties(el, data);

    data.children.forEach(function (child) {
        let item = document.createElement('li');

        this.setStyles(item, child);
        this.setProperties(item, child);

        child.children.forEach(function (child) {
            item.appendChild(this.buildElement(child));
        }.bind(this));

        el.appendChild(item);
    }.bind(this));

    return el;
}