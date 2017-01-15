var pkg = require('./package.json');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: `./dist/commonjs/${pkg.name}.js`
  },
  output: {
    filename: `${pkg.name}.js`,
    library: pkg.name,
    path: './dist/window'
  },
  target: 'node',
  plugins: [
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version}`)
  ]
};
