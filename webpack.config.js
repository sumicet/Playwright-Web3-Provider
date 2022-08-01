const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'provider.js',
        path: path.resolve(__dirname, 'bundle'),
    },
    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
            assert: require.resolve('assert'),
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            url: require.resolve('url'),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
        new Dotenv(),
    ],
};
