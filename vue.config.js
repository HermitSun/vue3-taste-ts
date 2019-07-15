const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 生产环境部署的路径
const BASE_URL = process.env.NODE_ENV === 'production' ? '/vue3-taste-ts/' : '/';

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'vue3-taste-ts',
  assetsDir: '',
  indexPath: 'index.html',
  pages: undefined,
  productionSourceMap: false, // 开启生产环境的 source map
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('enums', resolve('src/enums'))
      .set('utils', resolve('src/utils'))
      .set('types', resolve('src/types'))
      .set('plugins', resolve('src/plugins'))
      .set('views', resolve('src/views'));
    config.resolve.extensions
      .add('*', '.js', '.json', '.vue', '.ts', '.tsx');
  },
  devServer: {
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    port: 8085 // 端口号
  },
};
