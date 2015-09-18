module.exports = function () {
    return {
        options: {
            preset: "airbnb",
            disallowQuotedKeysInObjects: "allButReserved",
            validateLineBreaks: 'LF',
            validateIndentation: 4,
            validateQuoteMarks: "'",
            safeContextKeyword: null,
            disallowSpacesInFunctionDeclaration: null,
            disallowSpacesInFunctionExpression: null,
            disallowSpacesInAnonymousFunctionExpression: null,
            requireTrailingComma: null,
            requireLineFeedAtFileEnd: null,
            disallowImplicitTypeConversion: ["numeric", "boolean", "string"],
            requirePaddingNewLinesAfterBlocks: {
                allExcept: ['inArrayExpressions']
            },
            esnext: true,
            verbose: true
        },
        src: [
            'src/**/*.js',
            'tests/unit/**/*.js',
            '!src/zip/src/**/*.js'
        ]
    };
};