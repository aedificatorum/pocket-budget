const webpack = require("webpack");

module.exports = function({ env }) {
  const appTarget = process.env.REACT_APP_MEMORY ? "inMemory" : "firestore";

  return {
    webpack: {
      plugins: [
        new webpack.NormalModuleReplacementPlugin(
          /(.*)APP_TARGET-(\.*)/,
          function(resource) {
            resource.request = resource.request.replace(
              /APP_TARGET-/,
              `${appTarget}-`
            );
          }
        )
      ]
    }
  };
};
