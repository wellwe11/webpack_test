 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production',
       template: "./src/template.html",
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
  module: {
   rules: [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
   {
        test: /\.(png|jpe?g|gif|svg)$/i, 
        type: 'asset/resource', 
        },
   ],
  },
 };
