module.exports = {
  // publicPath 預設路徑為 /，所有 html 下的 js css 連結都會是 /js/xx
  // publicPath 預設路徑 / 在輸出到 web server (localhost) 會有問題，需用 ./
  publicPath: './'

  // filenameHashing: false // 設定打包出的檔案是否包含雜湊值

  // outputDir: 'www', // 輸出路徑
  // assetsDir: '', // 要輸出的asset目錄,設定hello,則會輸出成 hello/js/xxx,
  // devServer: {
  //   port: 1234,
  //   open: true
  // },
  // chainWebpack: config => {
  //   config.module
  //     .rule('yaml')
  //     .test(/\.ya?ml$/)
  //     .use('js-yaml-loader')
  //     .loader('js-yaml-loader')
  //     .end()
  //   config.resolve.alias
  //     .set('@@', path.resolve(__dirname)) // @@ 代替根目錄
  // }
}
