const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
	test: /\.css$/,
	use: [
	  {
	    loader: "style-loader"
	  },
	  {
	    loader: "css-loader",
	    options: {
	      modules: true,
	      importLoaders: 1,
	      localIdentName: "[name]_[local]_[hash:base64]",
	      sourceMap: true,
	      minimize: true
	    }
	  }
	]
      }
    ]
  },
  devServer: {
    port: 8080,
    compress: true,
    contentBase: [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'asset')
    ],
    host: 'localhost',
    https: true,
    open: 'Google Chrome',
    onListening: function(server) {
      const port = server.listeningApp.address().port;
      console.log('Listening on port:', port)
    },
    progress: true,
    hot: true
  },
  plugins: [htmlPlugin]
};
