// webpack.config.js
const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add a plugin to copy the service-worker.js file from public/ to the output folder.
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public/service-worker.js", // Source location in your project
          to: "", // Copy directly to the build output root
        },
      ],
    })
  );

  return config;
};
