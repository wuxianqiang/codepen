// webpack.config.js 配置默认使用node写的，需要导出一个对象

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // 指定打包模式
  entry: './src/index.js', // 从入口打包
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js' // 出口的路径
  },
  module: {

  },
  plugins: [
    new HtmlWebpackPlugin({ // 会将打包的文件插入
      template: './public/index.html', // 指定模块，
      minify: {
        removeAttributeQuotes: true, // 去双引号
        collapseInlineTagWhitespace: true // 去空行
      }
    })
  ],
  devServer: {

  }
}
// 在打包的过程中增加功能
// loader 是把源码转换的

// 多入口
