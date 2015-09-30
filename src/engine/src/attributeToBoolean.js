/**
 *
 * @description Convert attribute value to boolean value
 * @param attribute
 * @return {Boolean}
 * @private
 */
export default function (attribute) {
    let value = (attribute && attribute.value) || attribute;

    return [true, 'true', 'on', 'yes', '1', 1].indexOf(value) >= 0;
}
