var webpack = require('webpack');

module.exports = function (grunt) {
    return {
        app: {
            // webpack options
            entry: "./src/index.js",
            output: {
                path: "dist/",
                filename: "jsfile.js",
                library: ["JsFile"],
                libraryTarget: "umd"
            },

            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        query: {
                            stage: 0,
                            auxiliaryCommentBefore: 'istanbul ignore next'
                        }
                    }
                ]
            },

            plugins: [
                new webpack.DefinePlugin({
                    webpackAppVersion: JSON.stringify(require('./../package.json').version)
                })
            ],

            stats: {
                // Configure the console output
                colors: false,
                modules: true,
                reasons: true
            },

            progress: false
        }
    };
};