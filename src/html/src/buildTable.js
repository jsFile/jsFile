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

    data.children.forEach(function (child) {
        let el = document.createElement(child.properties.tagName);

        this.setStyles(el, child);
        this.setProperties(el, child);

        (child.children || []).forEach(function (child) {
            let chEl = document.createElement(child.properties.tagName);

            this.setStyles(chEl, child);
            this.setProperties(chEl, child);

            (child.children || []).forEach(function (child) {
                let elem = document.createElement(child.properties.tagName);

                this.setStyles(elem, child);
                this.setProperties(elem, child);

                (child.children || []).forEach(function (child) {
                    elem.appendChild(this.buildElement(child));
                });

                chEl.appendChild(elem);
            }.bind(this));

            el.appendChild(chEl);
        }.bind(this));

        table.appendChild(el);
    }.bind(this));

    return table;
}