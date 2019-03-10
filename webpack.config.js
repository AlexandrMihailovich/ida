const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    inline:true
  },
  module: {
  	rules: [
  	{
  		test: /\.(scss|css)$/,
	      use: ExtractTextPlugin.extract({
	        fallback: 'style-loader',
	        use: ['css-loader', 'sass-loader'],
	      })
	    },
        {
            test: /\.(jpe?g|gif|png|woff|woff2|eot|ttf|svg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: url => `fonts/${url}`
                }
            }]
            //loader: 'url-loader?limit=100000'
        },
        {
          test: /\.(jpe?g|gif|png)$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'img/',
                  publicPath: url => `img/${url}`
              }
          }]
      }
	  ]
	},
	plugins: [
	 new ExtractTextPlugin('style.css'),
     new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    })
	]
};
