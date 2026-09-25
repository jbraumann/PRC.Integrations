const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
    mode: "production",
    entry: "./export.js",
    devtool: "source-map",
    optimization: {
      minimize: false,
      minimizer: [
          new TerserPlugin({
              terserOptions: {
                  keep_classnames: true,
                  keep_fnames: true
              }
            })
          ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'prc.js',
     globalObject: 'this',
     library: {
       name: 'prc',
       type: 'umd',
     },
    }
  };