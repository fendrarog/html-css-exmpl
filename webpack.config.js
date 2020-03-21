const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ProvidePlugin} = require('webpack');
const SvgSpritePlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
//  1) Входные файлы для страниц.В них можно закидывать стили(css,scss), пути к картинкам и шрифтам, другой js код, библиотеки установленные в проекте
//  Их сейчас 2, для каждой страницы html
    entry: {
        main: './src/js/index.js'
    },
//  2)Указываем относительно какой папки будет искаться стартовая страница index.html в браузере при dev режиме...также это папка создается в production режиме и в ней лежит все готовое, заебатое...
    // Когда мы запускаем команду npm run dev, открывается страница в браузере http://localhost:9005/index.html, в нашем случае
    // index.html будет искаться в папке build(которая в dev виртуальная и мы ее не видим, а в production создается)
    output: {
        path: path.resolve(__dirname, 'build'), // указываем папку(она автоматически создается в production, и виртуально в dev режиме)
        publicPath: '/',    // относительный путь от папки build
        filename: 'main.js' // сжатый в main.js входной файл index.js в который мы закидывали все что можно из пункта 1) будет содержать преобразованный, оптимизированный код 
    },
    

//  3) Указываем webpack как обрабатывать все что мы закидывали в index.js (стили css,scss, пути к картинкам и шрифтам, другой js код) в пункте 1)...чтобы он понимал что здесь происходит
    module: { 
        rules: [
            {   
                test: /\.(html)$/,  // расширения файлов
                use: ['html-loader'] // плагин для обработки...их нужно устанавливать,т.е: npm i html-loader --save-dev
            },
            {
                test: /\.twig$/,    // шаблонизатор html для деления html на кусочки(компоненты)...например отдельно header, footer
                use: [
                    'raw-loader', // плагин для обработки
                    {
                        loader: 'twig-html-loader', // плагин для обработки
                        options: {
                            namespaces: {
                                'layouts': 'src/layouts', // указываем в какой папке искать базовые файлы c html разметкой(т.е где они повторяются)
                                'components': 'src/components', //папка для отдельных кусочков html(компоненты)
                            }
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    }
                ],
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: "svg-sprite-loader",
                    options: {
                        spriteFilename: "assets/sprite.[hash:6].svg",
                        esModule: false,
                        extract: false
                    }
                }, {
                    loader: "svgo-loader"
                }]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js'],
        // Для сокращения написания путей к файлам, 
        // чтобы не писать import '../../../../../assets/image.cat',а
        // писать import 'assets/image.cat'
        alias: {
            'assets': path.resolve('./src/assets'),
            'components': path.resolve('./src/components'),
            'icons': path.resolve('./src/assets/icons')
        }
    },   
    plugins: [
        new HtmlWebpackPlugin({ ///указываем пути к входным файлам html(twig)
            chunks: ['main'],
            template: 'src/layouts/base.twig',
            filename: 'index.html',
        }),
        new ProvidePlugin({ //подключает jquery без импорта в главном файле index.js
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new SvgSpritePlugin({
            plainSprite: false
        }),
        // указывать везде пути до картинки через папку images
        // <img src="images/cat.png" alt="">, и НЕ ИСПОЛЬЗОВАТЬ относительные пути типа
        // <img src="../../assets/images/cat.png"
        new CopyPlugin([
          { from: 'src/assets/images', to: 'images' },
        ]),
    ]
};
