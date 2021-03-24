const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: 'xuni',
    filename: 'bundle.js'
  },
  devServer: {
    // 静态文件根目录
    contentBase: 'www',
    port: 9095
  }
}