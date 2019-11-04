const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js'
  },
  watch: true,
    resolve: { extensions: [".js"] },
    devServer: {
        contentBase: path.join(__dirname, "./dist/"),
        port: 9001
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            attrs: ['img:src']
          }
        }]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
      {
        from:'./src/static/images',
        to:'static/images'
      },
      {
        from: './src/index.html',
        to: './'
      }
    ])
  ]
}
