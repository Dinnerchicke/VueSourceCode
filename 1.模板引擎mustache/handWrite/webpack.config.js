const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    // 静态文件根目录
    contentBase: path.join(__dirname, "www"),
    // 不压缩
    compress: false,
    port: 9093,
    // 虚拟打包路径
    publicPath: "/xuni/"
  }
}