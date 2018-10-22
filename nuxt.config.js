module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'マチブレ素材ドロップ検索',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=360, initial-scale=1, maximum-scale=2' },
//      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'マチガイブレイカーの非公式攻略Webページです。おもに素材ドロップに関する情報を提供します。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/stylesheet.css' }
//      { rel: 'stylesheet', href: 'http://mbc.hisana.me/stylesheet.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

