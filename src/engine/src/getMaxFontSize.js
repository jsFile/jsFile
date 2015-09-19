export default function (element = {}) {
    const {children, style} = element;
    let i = children ? children.length : 0;
    let fontSize = style && style.fontSize && style.fontSize.value || 0;

    while (i--) {
        if (children[i].style.fontSize && children[i].style.fontSize.value > fontSize) {
            fontSize = children[i].style.fontSize.value;
        }
    }

    return fontSize;
}