/**
 *
 * @param value - for example, "18px", "10em", "2pt", etc.
 * @return {Number} - for example, 18, 10, 12
 * @private
 */
export default function (value) {
    value = Number(String(value).replace(/,/g, '.').replace(/[^0-9.]+/g, ''));
    return !isNaN(value) ? value : 0;
}