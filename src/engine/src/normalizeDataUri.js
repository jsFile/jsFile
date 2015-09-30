const mimeTypesByExtension = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    woff: 'application/font-woff'
};

/**
 *
 * @param dataUri
 * @param filename
 * @return {String}
 * @private
 */
export default function (dataUri, filename) {
    const extensionData = (/[A-Za-z]+$/).exec(filename);
    const mime = extensionData && mimeTypesByExtension[extensionData[0].toLowerCase()];

    return !mime ? dataUri : dataUri.replace(/data:[^;]*;/, `data:${mime};`);
}
