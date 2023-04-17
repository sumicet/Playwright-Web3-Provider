const path = require('path');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'provider.js',
        path: path.resolve(__dirname, 'bundle'),
        publicPath: '',
    },
    plugins: [new Dotenv(), new NodePolyfillPlugin()],
};
