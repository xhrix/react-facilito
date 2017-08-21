var webpack = require('webpack');

module.exports = {
    entry: {
        "app": "./src/web/entry-points/app.tsx",
    },
    output: {
        path: __dirname + '/public/dist/js/.tmp',
        filename: '[name].min.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader!awesome-typescript-loader"
            },
            {
                enforce: 'pre',
                test: /\.([tj])sx?$/,
                loader: "source-map-loader"
            }
        ]
    }
};