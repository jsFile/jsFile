const isSpecificValue = (val) => (val instanceof Date || val instanceof RegExp);

function cloneSpecificValue (val) {
    if (val instanceof Date) {
        return new Date(val.getTime());
    }

    if (val instanceof RegExp) {
        return new RegExp(val);
    }

    return val;
}

function deepCloneArray (arr = []) {
    let clone = [];

    arr.forEach(function (item, index) {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                clone[index] = deepCloneArray(item);
            } else if (isSpecificValue(item)) {
                clone[index] = cloneSpecificValue(item);
            } else {
                clone[index] = merge({}, item);
            }
        } else {
            clone[index] = item;
        }
    });

    return clone;
}

/**
 * @description deep merge
 * @param target
 * @param sources
 * @returns {*}
 */
function merge (target = {}, ...sources) {
    if (typeof target === 'object') {
        sources.forEach(function (src) {
            for (let key in src) {
                if (src.hasOwnProperty(key)) {
                    const srcValue = src[key];
                    const targetValue = target[key];

                    // recursion prevention
                    if (srcValue === target) {
                        continue;
                    }

                    if (typeof srcValue !== 'object' || srcValue === null) {
                        target[key] = srcValue;
                        continue;
                    }

                    if (Array.isArray(srcValue)) {
                        target[key] = deepCloneArray(srcValue);
                        continue;
                    }

                    if (isSpecificValue(srcValue)) {
                        target[key] = cloneSpecificValue(srcValue);
                        continue;
                    }

                    if (typeof targetValue !== 'object' || targetValue === null || Array.isArray(targetValue)) {
                        target[key] = merge({}, srcValue);
                        continue;
                    }

                    target[key] = merge(targetValue, srcValue);
                }
            }
        });
    }

    return target;
}

export default merge;