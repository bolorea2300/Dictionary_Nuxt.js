const title = 'ひみつ辞書'
const base = 'http://localhost:3000/'

export default {
  head: {
    title: title,
    titleTemplate: '%s | ' + title,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '自分だけの辞書を作るサイトです',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: title,
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: '',
      },
      { hid: 'og:title', property: 'og:title', content: title },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '自分だけの辞書を作るサイトです',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  router: {
    middleware: 'Auth',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  modules: ['@nuxtjs/sitemap', 'nuxt-buefy', '@nuxtjs/axios'],

  axios: {
    //https: true,
    proxy: true,
    baseURL: 'http://127.0.0.1:8000',
  },

  proxy: {
    '/api/': {
      secure: false,
      target: 'http://127.0.0.1:8000',
    },
  },

  build: {},

  sitemap: {
    path: '/sitemap.xml',
    hostname: base,
    exclude: [
      '/login',
      '/login/**',
      '/logout',
      '/setting/*',
      '/dictionary',
      '/dictionary/*',
      '/search',
    ],
  },
}
