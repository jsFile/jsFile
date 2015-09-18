var reporter = require('jshint-stylish');

module.exports = function () {
    return {
        options: {
            reporter: reporter,
            "-W041": false,
            "-W079": false,
            "browser": true,
            "loopfunc": true,
            "eqnull": true,
            "eqeqeq": false,
            "esnext": true
        },
        src: [
            'src/**/*.js',
            '!src/zip/src/**/*.js'
        ]
    };
};