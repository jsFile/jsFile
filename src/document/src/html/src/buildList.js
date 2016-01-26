/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    const el = document.createElement('ul');

    this.setStyles(el, data);
    this.setProperties(el, data);

    data.children.forEach((child) => {
        const item = document.createElement('li');

        this.setStyles(item, child);
        this.setProperties(item, child);

        child.children.forEach((child) => {
            item.appendChild(this.buildElement(child));
        });

        el.appendChild(item);
    });

    return el;
}