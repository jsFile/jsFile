function buildDomTree (parentElement, children) {
    children.forEach((child) => {
        const el = document.createElement(child.properties.tagName);

        this.setStyles(el, child);
        this.setProperties(el, child);

        buildDomTree(el, child.children);
        parentElement.appendChild(el);
    });
}

/**
 *
 * @param data
 * @returns {HTMLElement}
 * @private
 */
export default function (data) {
    let table = document.createElement('table');

    this.setStyles(table, data);
    this.setProperties(table, data);

    buildDomTree(table, data.children);

    return table;
}