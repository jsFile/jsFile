const mimeTypesByExtension = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    pjpeg: 'image/pjpeg',
    ico: 'image/x-icon',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    woff: 'application/font-woff',
    tif: 'image/tiff',
    tiff: 'image/tiff',
    wbmp: 'image/vnd.wap.wbmp'
};

/**
 *
 * @param dataUri
 * @param filename
 * @return {String}
 * @private
 */
export default function (dataUri, filename = '') {
    const extensionData = (/[A-Za-z]+$/).exec(filename);
    const mime = extensionData && mimeTypesByExtension[extensionData[0].toLowerCase()];

    return !mime ? dataUri : dataUri.replace(/data:[^;]*;/, `data:${mime};`);
}
