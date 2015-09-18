/**
 * @description get type of file
 * @param file {File|Blob}
 * @param files {Array}
 * @return {Boolean}
 * @private
 */
export default function (file, files) {
    let found = false;

    if (!file || !files || !(file instanceof File || file instanceof Blob)) {
        return found;
    }

    const fileType = file.type;
    const fileNameData = String(file.name).split('.');
    const len = fileNameData.length;
    const fileExtension = len > 1 ? fileNameData[len - 1] : '';
    let {mime, extension} = files;

    if (!Array.isArray(mime)) {
        mime = [mime];
    }

    found = mime.some((type) => fileType.includes(type));

    // if not found by mime type find by file extension
    if (!found) {
        if (!Array.isArray(extension)) {
            extension = [extension];
        }

        found = extension.some((ext) => fileExtension.includes(ext));
    }

    return found;
}