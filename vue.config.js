const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    server: {
      type: "http",
    },
    host: "localhost",
    port: 8080,
    hot: true,
  },
});
