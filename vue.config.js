const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: require("fs").readFileSync("./server.key"),
      cert: require("fs").readFileSync("./server.crt"),
    },
  },
});
