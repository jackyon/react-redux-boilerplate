var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-router',
            'history',
            'react-router-redux'
        ]
    },
    output:  {
        path: path.join(__dirname, 'build/'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    progress: true,
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'build', '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'},
            '__DEV__': false,
            '__PRODUCTION__': true
        })
    ]
}
