module.exports = function () {
    return {
        main: {
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: [
                        'src/zip/src/deflate.js',
                        'src/zip/src/inflate.js',
                        'src/zip/src/z-worker.js'
                    ],
                    dest: 'dist/workers/'
                },
                {
                    expand: true,
                    flatten: true,
                    src: [
                        'src/engine/src/readFile.js'
                    ],
                    dest: 'dist/workers/'
                }
            ]
        }
    };
};