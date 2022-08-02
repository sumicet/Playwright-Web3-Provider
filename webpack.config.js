const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'provider.js',
        path: path.resolve(__dirname, 'bundle'),
    },
    plugins: [new Dotenv()],
};
