const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = function({ env }) {
  const appTarget = process.env.REACT_APP_MEMORY ? "inMemory" : "firestore";
  const isProductionBuild = process.env.NODE_ENV === "production";
  const analyzerMode = process.env.REACT_APP_INTERACTIVE_ANALYZE ? "server" : "json";

  const plugins = [new webpack.NormalModuleReplacementPlugin(
    /(.*)APP_TARGET-(\.*)/,
    function(resource) {
      resource.request = resource.request.replace(
        /APP_TARGET-/,
        `${appTarget}-`
      );
    }
  )]

  if(isProductionBuild) {
    plugins.push(new BundleAnalyzerPlugin({analyzerMode}))
  }

  return {
    webpack: {
      plugins
    }
  };
};
