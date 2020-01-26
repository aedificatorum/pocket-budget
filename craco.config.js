const webpack = require('webpack');

module.exports = function({env}) {
  const appTarget = process.env.REACT_APP_MEMORY ? "inMemory" : "firestore";
  console.log(appTarget);

  return {
    webpack: {
      plugins: [
        new webpack.NormalModuleReplacementPlugin(
          /fileOne/,
          "./fileTwo.js")
      ]
    }
  };
};