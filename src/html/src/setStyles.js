/**
 *
 * @param node
 * @param data
 * @private
 */
export default function (node, data = {}) {
    for (let prop in data.style) {
        if (data.style.hasOwnProperty(prop)) {
            const value = data.style[prop];

            if (typeof value === 'object') {
                if (value.unit) {
                    node.style[prop] = value.value + value.unit;
                }
            } else {
                node.style[prop] = value;
            }
        }
    }
}