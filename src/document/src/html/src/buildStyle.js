import toHyphenCase from './../../../../utils/toHyphenCase';
import prepareStyleProperties from './prepareStyleProperties';

export default function (styles, options = {}) {
    const el = document.createElement('style');
    const pageClassName = options.pageClassName ? `.${options.pageClassName}` : '';
    let src = '';

    styles.forEach(({properties, selector}) => {
        let declaration = '';
        properties = prepareStyleProperties(properties);
        for (let prop in properties) {
            if (properties.hasOwnProperty(prop)) {
                declaration += `${toHyphenCase(prop)}: ${properties[prop]};\n`;
            }
        }

        if (declaration) {
            src += `${pageClassName} ${selector.split(',').join(`, ${pageClassName} `)} {
                ${declaration}
            }\n`;
        }
    });

    if (src) {
        el.appendChild(document.createTextNode(src));
    }

    return el;
}