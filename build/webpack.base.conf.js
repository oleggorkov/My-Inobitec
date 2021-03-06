const path = require('path');
const DashboardPlugin = require("webpack-dashboard/plugin");

// Main const
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: './'
};

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    legacy: `${PATHS.src}/js/legacy`,
    common: `${PATHS.src}/js/common`,
  },
  output: {
    //filename: `${PATHS.assets}js/[name].[hash].js`,
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '~': PATHS.src,
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new DashboardPlugin(),
  ]
};
