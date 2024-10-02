const webpack = require("webpack");

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};

    Object.assign(fallback, {
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      http: require.resolve("stream-http"),
      url: require.resolve("url/"),
      buffer: require.resolve("buffer/"),
      assert: require.resolve("assert/"),
      util: require.resolve("util/"),
      process: require.resolve("process/browser.js"),
      vm: require.resolve("vm-browserify"), 
      fs: false,
      net: false,
    });
    config.resolve.fallback = fallback;
    config.resolve.extensions = [
      ".js",
      ".jsx",
      ".mjs",
      ...config.resolve.extensions,
    ];

    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: "process/browser.js", // Add the .js extension
        Buffer: ["buffer", "Buffer"],
      }),
    ]);
    return config;
}