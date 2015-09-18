module.exports = function () {
    return {
        options: {
            compress: true,
            report: false
        },
        main: {
            files: [
                {
                    expand: true,
                    cwd: 'dist/workers',
                    src: '**/*.js',
                    dest: 'dist/workers'
                },
                {
                    expand: true,
                    cwd: 'dist',
                    src: '*.js',
                    ext: '.min.js',
                    dest: 'dist'
                }
            ]
        }
    };
};