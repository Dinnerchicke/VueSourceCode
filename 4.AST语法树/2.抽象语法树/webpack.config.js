const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'virtualBundle',
    filename: 'bundle.js'
  },
  devServer: {
    // 静态文件根目录
    contentBase: 'www',
    port: 9095
  }
}