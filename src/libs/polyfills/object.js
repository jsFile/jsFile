export default () => {
    /**
     * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/merge
     */
    if (!Object.merge) {
        Object.defineProperty(Object, 'merge', {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target) {
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert first argument to object');
                }

                let to = Object(target);
                for (let i = 1; i < arguments.length; i++) {
                    let nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) {
                        continue;
                    }

                    nextSource = Object(nextSource);
                    let keysArray = Object.keys(Object(nextSource));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        let nextKey = keysArray[nextIndex];
                        let desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }

                return to;
            }
        });
    }
};