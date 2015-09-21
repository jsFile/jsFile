let nonDomProperties = {
    after: true,
    tagName: true,
    pageNumber: true
};

/**
 *
 * @param node
 * @param data
 * @private
 */
export default function (node, data) {
    for (let prop in data.properties) {
        if (data.properties.hasOwnProperty(prop) && !nonDomProperties[prop]) {
            node[prop] = data.properties[prop];
        }
    }
}