// Karma configuration
// Generated on Mon Aug 10 2015 20:23:57 GMT+0200 (CEST)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        browserNoActivityTimeout: 100000,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'dist/workers/*.js', watched: false, include: false, serve: true},
            'tests/filesCache.js',
            'tests/unit/**/*.spec.js'
        ],

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            type: 'lcov',
            dir: 'tests/coverage/'
        },

        // list of files to exclude
        exclude: [],

        preprocessors: {
            'src/**/*.js': ['coverage'],
            'tests/unit/**/*.spec.js': ['webpack']
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test: /(spec|src)/,
                        loader: 'babel',
                        query: {
                            auxiliaryCommentBefore: 'istanbul ignore next'
                        }
                    }
                ],
                postLoaders: [{
                    test: /\.js/,
                    exclude: /(node_modules|bower_components|dist|tests)/,
                    loader: 'istanbul-instrumenter'
                }]
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};