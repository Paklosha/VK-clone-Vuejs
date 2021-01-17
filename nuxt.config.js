module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    
    //titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
 
      { href:"https://fonts.googleapis.com/css2?family=Roboto&display=swap",rel:"stylesheet"},
      { href:"https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap", rel:"stylesheet"}
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: false,
  //serverMiddleware: ['~/api/logger'],
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuetify.js' },
   { src: '~/plugins/axios.js' },
    { src: '~/plugins/socket.client.js' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
 modules: [
  '@nuxtjs/pwa',
  '@nuxtjs/axios',
  '@nuxtjs/auth'
],



auth: {
  strategies: {
    local: {
      endpoints: {
        login: { url: '/login', method: 'post', propertyName: 'token' },
        user: { url: '/user', method: 'get', propertyName: 'user' },
        logout: false
      },
      redirect: {
        login: '/',
        logout: '',
        callback: '/',
        home: '/'
        }
    }
  }
},

  pwa: {
    manifest: {
      name: 'VK clone',
      short_name: 'VK',
      start_url: '/',
      theme_color: '#4a76a8',
      display: 'standalone',
    },
    icon: {
      iconSrc: './static/icon.png',
    },
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
};
