const path = require('path'); //give prefix '_dirname' to absolute path. then want  bundle o be in
const HTMLWebpackPlugin = require('html-webpack-plugin');

// a polyfill is code for non-exsitent features from es15 (like promises) to be written in a es15 way from recent vs

module.exports = {
    entry: ['babel-polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [ //for each loader need an obj
            {
                test: /\.js$/, //all js files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};