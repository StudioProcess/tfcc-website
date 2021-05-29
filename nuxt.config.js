export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TOKENS FOR CLIMATE CARE',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A project by Process – Studio for Art and Design.' },
      { hid: 'og:title', name: 'og:title', content: 'TOKENS FOR CLIMATE CARE' },
      { hid: 'og:description', name: 'og:description', content: 'A project by Process – Studio for Art and Design.' },
      { hid: 'og:image', name: 'og:image', content: (process.env.URL || 'http://localhost:3000') + '/tfcc_card_fb.jpg' },
      { hid: 'og:locale', name: 'og:locale', content: 'en_GB' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:url', name: 'og:url', content: process.env.URL || 'http://localhost:3000' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@studioprocess' },
      { hid: 'twitter:image', name: 'twitter:image', content: (process.env.URL || 'http://localhost:3000') + '/tfcc_card_twitter.png' },
      { hid: 'theme-color', name: 'theme-color', content: '#000000' },
      { hid: 'robots', name: 'robots', content: 'index,follow' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://github.com/pimlie/nuxt-matomo
    ['nuxt-matomo', { matomoUrl: '//matomo.process.studio/', siteId: 1, cookies: false }],
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    baseUrl: process.env.URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:8010/proxy'
  }
}
