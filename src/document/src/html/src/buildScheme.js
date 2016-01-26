/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    const el = document.createElement('div');

    this.setStyles(el, data);
    this.setProperties(el, data);

    data.children.forEach((child) => {
        const part = document.createElement('div');

        this.setStyles(part, child);
        this.setProperties(part, child);

        child.children.forEach((child) => {
            part.appendChild(this.buildElement(child));
        });

        el.appendChild(part);
    });

    return el;
}