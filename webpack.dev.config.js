const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConfig = require('./webpack.config');

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 9005;

module.exports = merge.smart(baseWebpackConfig, {
    mode: 'development',
    watch: true,
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.scss|css$/,
                use: [
                    "style-loader","css-loader","sass-loader"
                ]
            }
        ]
    },

    devServer: {
        port: PORT,
        host: HOST,
        liveReload: true,
        open: true, // открывать браузер при разработке
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});
