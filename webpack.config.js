var webpack = require('webpack'),
    path = require('path');

module.exports = {
  devtool: '#source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/main.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    library: 'app',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-1'],
          plugins: [['transform-react-jsx', {pragma: 'element'}]]
        }
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass?sourceMap",
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
