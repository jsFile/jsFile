import prepareStyleProperties from './prepareStyleProperties';

/**
 *
 * @param node
 * @param data
 * @private
 */
export default function (node, data = {}) {
    const props = prepareStyleProperties(data.style);
    for (let prop in props) {
        if (props.hasOwnProperty(prop)) {
            node.style[prop] = props[prop];
        }
    }
}