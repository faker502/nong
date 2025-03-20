const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const WebpackBar = require("webpackbar");

const port = process.env.port || process.env.npm_config_port || 80 // 端口
const api_port = process.env.api_port || 80 // 端口

const os = require("os");
let needHost = "0.0.0.0";
try {
  let network = os.networkInterfaces();
  needHost = network[Object.keys(network)[1]][1].address;
} catch {
  // eslint-disable-next-line no-unused-vars
  needHost = "192.168.0.14";
}
//needHost = "localhost";

const resolve = (dir) => {
  return path.join(__dirname, dir);
};

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require("os").cpus().length > 1,
  devServer: {
    host: needHost,
    port: port,
    open: true,
    hot: true,
    compress: true, // 是否启动压缩 gzip
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    proxy: {
      "/home": {
        target: "http://" + needHost + ":" + api_port + "/",
        changeOrigin: true,    //必须，允许跨域
        pathRewrite: {
        },
      },
    },
  },
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias.set("@", resolve("src"));
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      // 利用splitChunks将每个依赖包单独打包，在生产环境下配置
      let customPulgins = [];
      customPulgins.push(
        // 代码压缩
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: /\.js$|\.html$|\.css$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 删除源文件
          minRatio: 0.8, // 压缩比
        }),
        new WebpackBar({
          // color: "#85d", // 默认green，进度条颜色支持HEX
          basic: false, // 默认true，启用一个简单的日志报告器
          profile: false, // 默认false，启用探查器。
        })
      );
      config.plugins = [...config.plugins, ...customPulgins];
      // 取消webpack警告的性能提示
      config.performance = {
        hints: "warning", // 打开/关闭提示
        maxAssetSize: 1250000, // 根据单个资源体积(单位: bytes)，控制 webpack 何时生成性能提示
        maxEntrypointSize: 1250000, // 根据入口起点的最大体积(单位: bytes)，控制 webpack 何时生成性能提示
        // 只给出 .js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith(".js");
        },
      };
      config.optimization = {
        minimize: true, // minimizer配置开关
        minimizer: [
          // jS压缩
          new TerserPlugin({
            // 默认不需要去配置, 压缩js
            parallel: true, // 使用cpu多核来构建
            extractComments: false, // 打包后的 LICENSE.txt 注释文件去吃
            terserOptions: {
              compress: {
                arguments: true,
                dead_code: true,
              }, // 设置压缩相关的选项；
              mangle: true, // 设置丑化相关的选项，可以直接设置为true；
              toplevel: true, // 底层变量是否进行转换；
              keep_classnames: false, // 保留类的名称；
              keep_fnames: false, // 保留函数的名称；
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ["console.log"], // 移除console
              },
            },
          }),
          // CSS压缩
          new CssMinimizerWebpackPlugin({
            parallel: true,
          }),
        ],
        splitChunks: {
          cacheGroups: {
            styles: {
              name: "styles",
              test: /\.(s?css|less|sass)$/,
              chunks: "all",
              priority: 10,
            },
            common: {
              name: "chunk-common",
              chunks: "all",
              minChunks: 2, // 拆分前必须共享模块的最小 chunks 数。
              maxInitialRequests: 5, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
              minSize: 0, // 生成 chunk 的最小体积（≈ 20kb)
              priority: 1, // 优化将优先考虑具有更高 priority（优先级）的缓存组
              reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
            },
            vendors: {
              name: "chunk-vendors",
              test: /[\\/]node_modules[\\/]/,
              chunks: "all",
              priority: 2,
              reuseExistingChunk: true,
            },
            lrucache: {
              name: "chunk-lrucache",
              test: /[\\/]node_modules[\\/]_?lru-cache(.*)/,
              chunks: "all",
              priority: 3,
              reuseExistingChunk: true,
            },
          },
        },
      };
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
  },
  css: {
    // 启用 CSS modules
    // requireModuleExtension: false,
    // 是否使用css分离插件
    // extract: true,
    // 开启 CSS source maps，一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        additionalData: '@import "@/styles/global.scss";',
      },
    },
  },
  pwa: {}, // PWA 插件相关配置
  pluginOptions: {},
});
