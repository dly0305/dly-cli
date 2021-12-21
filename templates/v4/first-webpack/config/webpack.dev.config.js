const webpack = require('webpack')
const { merge } = require('webpack-merge')
const WebpackBar = require('webpackbar');
const commonConfig = require('./webpack.com.config')

const devConfig = {
    mode: "development",
    // development
    devtool: "eval-cheap-module-source-map",
    devServer: {
        open: true, // 自动打开浏览器
        historyApiFallback: true,
        port: 9000, // 端口号
        proxy: {  // 代理
            '/api': 'http://localhost:9000'
        },
        hot: true, // 热替换  // css应用
        // hotOnly: true  // 如果模块热替换功能不生效，则不刷新网页
    },
    optimization: {
        usedExports: true, //开启器treeShaking,被使用的打包 // 线上没必要
    },
    plugins: [
        new WebpackBar(),
        new webpack.HotModuleReplacementPlugin(),
    ],
}
module.exports = merge(commonConfig, devConfig)
