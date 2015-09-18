export default () => {
    return Boolean(
        typeof File !== 'undefined' &&
        typeof Blob !== 'undefined' &&
        typeof FileReader !== 'undefined' &&
        typeof ArrayBuffer !== 'undefined' &&
        typeof Uint8Array !== 'undefined' &&
        typeof DataView !== 'undefined' &&
        Blob.prototype.slice
    );
};