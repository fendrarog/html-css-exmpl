const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.config');


module.exports = merge.smart(baseWebpackConfig, {
    mode: 'production',
    output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[chunkhash:3].js',
            publicPath: './'
        },
    module: {
        
        rules: [
            {
                test: /\.scss|css$/,
                use: [
                    MiniCssExtractPlugin.loader, //извлекает css файлы и сохраняет отдельными файлами
                    'css-loader',
                    {
                        loader: 'postcss-loader',   // плагин добавляет кроссбраузерность, сжимает css файлы, объединяет css правила 
                        options: { config: { path: './postcss.config.js' } }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),// очищает файлы в папке build перед новым билдом
        new MiniCssExtractPlugin({  //извлекает css файлы и сохраняет отдельными файлами
            filename: "[name].[chunkhash:3].css"
        })
    ],
});

