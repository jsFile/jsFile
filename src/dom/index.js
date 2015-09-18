/**
 * @namespace $
 * @type {*}
 */
export default Object.defineProperties({}, {
    children: {
        /**
         * @params element {Object}
         * @return {Array}
         */
        value: (element) => {
            if (!element) {
                return [];
            }

            if (element.children) {
                return Array.prototype.slice.call(element.children, 0);
            }

            let result = [];
            let child = element.firstChild;

            while (child) {
                //it is an element
                if (child.nodeType === 1) {
                    result.push(child);
                }

                child = child.nextSibling;
            }

            return result;
        }
    }
});