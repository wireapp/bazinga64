var pkg = require('./package.json');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: `./dist/node/${pkg.name}.js`
  },
  output: {
    filename: `${pkg.name}.js`,
    library: pkg.name,
    path: './dist/browser'
  },
  target: 'node',
  plugins: [
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`)
  ]
};
