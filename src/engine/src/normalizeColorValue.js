import colorsList from './colorsList';

const defaultColor = colorsList.black;

/**
 * @description Adjunct a color value to a single mind
 * @param value
 * @return {String}
 * @private
 */
export default function (value) {
    if (!value || typeof value !== 'string') {
        return defaultColor;
    }

    value = value.replace(/\s+/g, '');

    if (/^#/.test(value)) {
        return value.toUpperCase();
    }

    if (!isNaN(Number('0x' + value))) {
        return '#' + value.toUpperCase();
    }

    value = value.toLowerCase();

    return colorsList[value] || defaultColor;
}