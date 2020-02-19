const path = require('path'); //give prefix '_dirname' to absolute path. then want  bundle o be in

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    mode: 'development'
};