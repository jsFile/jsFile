export default function (el, data = {}) {
    let numberBlock = document.createElement('div');
    let {header, pageNumber} = data.properties;

    if (!header || pageNumber == null) {
        return el;
    }

    el.style.position = 'relative';
    numberBlock.style.position = 'absolute';
    numberBlock.style.top = 0;
    let rule = header.style.height;
    if (rule) {
        numberBlock.style.top = rule.value + rule.unit;
    }

    rule = el.style.paddingRight;
    if (rule) {
        numberBlock.style.right = rule.value + rule.unit;
    }

    numberBlock.appendChild(document.createTextNode(pageNumber.value));
    el.appendChild(numberBlock);

    return el;
}