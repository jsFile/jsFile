export default (properties) => {
    const result = {};
    for (let prop in properties) {
        if (properties.hasOwnProperty(prop)) {
            const value = properties[prop];

            if (typeof value === 'object') {
                if (value.unit) {
                    result[prop] = value.value + value.unit;
                }
            } else {
                result[prop] = value;
            }
        }
    }

    return result;
};