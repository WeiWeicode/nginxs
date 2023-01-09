module.exports = {
  lintOnSave: false,
  // 出現錯誤時,參考網站做法,增加此代碼lintOnSave: false,
  // https://cli.vuejs.org/core-plugins/eslint.html#configuration
  devServer: {
    host: "0.0.0.0",
    allowedHosts: "all",
    // host: 全部都可以訪問
    port: 8081    
  }
}