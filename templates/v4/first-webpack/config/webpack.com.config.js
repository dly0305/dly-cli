const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);

const commonConfig = {
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: "[name].js",  // 占位符 重命名(可以打包多个)
        chunkFilename: "[name].chunk.js",  // 分割的名称
        path: path.resolve(__dirname, '../dist'),
        // publicPath: "https://cdn.com"  // 打包后src 拼接域名
    },
    resolve: {
      // 设置别名
      alias: {
        '@': resolve('../src')// 这样配置后 @ 可以指向 src 目录
      }
    },
    // 不知道怎么办的时候,进入到这个模块里找
    module: {
        rules: [
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 //占位符(名称无乱码)
            //                 name:'[name].[ext]',
            //                 outputPath: 'images/'
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //占位符(名称无乱码)
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            limit: 8192
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader",
                    options: {
                        // 重新走下面的两个loader
                        importLoaders: 2,
                        // 开启css模块化
                        modules: true,
                    },
                }, {
                    loader: 'postcss-loader'
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ],
                exclude: /node_modules/   // 忽略包,这样编译更快
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all", // 代码分割了
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,  //当用了xx次进行分割
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new CopyPlugin([
            {
                from: './src/public',
                to: 'public',
            },
        ]),
        new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
        new CleanWebpackPlugin()
    ],
}

module.exports = commonConfig
