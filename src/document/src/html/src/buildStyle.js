import toHyphenCase from './../../../../utils/toHyphenCase.js';

export default function (styles) {
    const el = document.createElement('style');
    const src = el.textContent = styles.map(({rules, selector}) => {
        let declaration = '';
        for (let prop in rules) {
            if (rules.hasOwnProperty(prop)) {
                declaration += `${toHyphenCase(prop)}: ${rules[prop]};\n`;    
            }
        }
        
        return `${selector} {
            ${declaration}
        }`;
    }).join('\n');
    el.appendChild(document.createTextNode(src));
    return el;
}
