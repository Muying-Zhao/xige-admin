const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
module.exports = {
  // webpack devServer提供了代理的功能，该代理可以把所有请求到当前服务中的请求,转发（代理）到另外的一个服务器上
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      "/api": {
        // 要代理的服务器地址  这里不用写 api
        target: "https://imooc-admin.lgdsunday.club/",
        changeOrigin: true, // 是否跨域
        pathRewrite: { "/api": "/prod-api" },
      },
    },
  },
  // 保证了引入的svg图标可以显示出来
  chainWebpack(config) {
    // 设置 svg-sprite-loader 来处理除了 'src/icons' 目录外的 SVG 文件
    // 这意味着其他地方的 SVG 文件将不会被 svg-sprite-loader 处理
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      // 为 'src/icons' 目录下的 SVG 文件设置一个新的处理规则
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons")) // 限定这个规则只处理 'src/icons' 目录下的文件
      .end() // 结束 include 的链式调用
      // 使用 svg-sprite-loader 来处理这些 SVG 文件
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      // 为 svg-sprite-loader 设置选项
      .options({
        symbolId: "icon-[name]",
      }) // 设置生成的 symbol 的 ID 格式为 'icon-xxx'，其中 xxx 是 SVG 文件的名称
      .end(); // 结束 use 的链式调用
  },
  css: {
    loaderOptions: {
      css: {
        // 开启 CSS Modules
        modules: {
          // 指定只有文件名以 .module.scss 结尾的 SCSS 文件才使用 CSS Modules。
          auto: (resourcePath) => resourcePath.endsWith(".module.scss"),
          //  // 设置CSS Modules的类名格式
          localIdentName: "[name]__[local]___[hash:base64:5]",
        },
      },
      sass: {
        // 确保 Sass 支持
        // 自动导入Sass变量文件
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
  },
};
