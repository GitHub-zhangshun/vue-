// vue.config.js
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 公共路径。
  publicPath: "/",
  // 不同的环境打不同包名。
  outputDir: process.env.NODE_ENV === "development" ? "devdist" : "dist",
  // 使用运行时编译器的 Vue 构建版本
  runtimeCompiler: true,
  // 开启生产环境 SourceMap，设为 false 打包时不生成 .map 文件。
  productionSourceMap: false,
  // 关闭 ESLint 。
  lintOnSave: false,
  devServer: {
    // 是否自动打开浏览器页面。
    open: false,
    // 指定使用一个 host，默认是 localhost 。
    host: "0.0.0.0",
    // 端口地址。
    port: 8080,
    // 使用 https 提供服务。
    https: false,
    // 这里写调用接口的基础路径，来解决跨域，如果设置了代理，那本地开发环境的 axios 的 baseUrl 要写为 '' ，即空字符串。
    // proxy: "http://47.91.164.235:9505"
    proxy: null
  },
  chainWebpack: config => {
    // 设置一些常用 alias 文件别名。
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"));
    // 移除 prefetch 插件，减少首屏加载时间。
    config.plugins.delete("prefetch");
  },
  configureWebpack: config => {
    // 生产环境。
    if (process.env.NODE_ENV === "production") {
      // 生产环境去除 console。
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      // 生产环境打包分析体积。
      return {
        plugins: [new BundleAnalyzerPlugin()]
      };
    }
  },
  css: {
    loaderOptions: {
      // 全局使用的一些 scss 样式。
      sass: {
        data: `
                @import "@/style/mixin.scss";
                @import "@/style/_var.scss";
                `
      }
    }
  }
};
