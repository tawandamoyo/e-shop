const path = require('path');

module.exports = {
  mode: "production",
  entry: './frontend/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'backend/static'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
};
