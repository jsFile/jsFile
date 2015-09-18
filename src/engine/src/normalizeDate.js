/**
 *
 * @param str
 * @return {String} - dd.mm.yyy
 * @private
 */
export default function (str) {
    if (str) {
        // yyyy-mm-dd
        if ((/^[0-9]{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])$/).test(str)) {
            /**
             * @description Transform to dd.mm.yyyy
             * @type {string}
             */
            return str.split('-').reverse().join('.');
        }
    }

    return '';
}