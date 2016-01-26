var webpack = require('webpack');

module.exports = {
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
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            webpackAppVersion: JSON.stringify(require('./package.json').version)
        })
    ],

    stats: {
        // Configure the console output
        colors: true,
        modules: true,
        reasons: true
    },

    progress: false
};