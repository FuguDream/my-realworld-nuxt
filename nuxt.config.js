export default {
  router: {
    base: '/',
    linkExactActiveClass: 'active',
    extendRoutes (routes, resolve) {
      routes.splice(0)
      routes.push(...[{
        path: '/', // 默认子路由
        component: resolve(__dirname, 'pages/layout'),
        children: [
          {
            path: '', // 默认子路由
            name: 'home',
            component: resolve(__dirname, 'pages/')
          },
          {
            path: '/login',
            name: 'login',
            component: resolve(__dirname, 'pages/login.vue')
          },
          {
            path: '/register',
            name: 'register',
            component: resolve(__dirname, 'pages/register.vue')
          },
          {
            path: '/profile/:username',
            name: 'profile',
            component: resolve(__dirname, 'pages/profile.vue')
          },
          {
            path: '/settings',
            name: 'settings',
            component: resolve(__dirname, 'pages/settings.vue')
          },
          {
            path: '/createeditor',
            name: 'createeditor',
            component: resolve(__dirname, 'pages/editor.vue')
          },
          {
            path: '/updateeditor/:slug',
            name: 'updateeditor',
            component: resolve(__dirname, 'pages/editor.vue')
          },
          {
            path: '/article/:slug',
            name: 'article',
            component: resolve(__dirname, 'pages/article.vue')
          }
        ]
      }])
      /* routes.forEach((route) => {
        route.components = {
          default: route.component,
          header: resolve(__dirname, 'components/layouts/header.vue'),
          footer: resolve(__dirname, 'components/layouts/footer.vue')
        }
        route.chunkNames = {}
        route.chunkNames.header = 'components/header'
        route.chunkNames.footer = 'components/footer'
      }) */
    }
  },
  head: {
    title: 'realworldByFugu',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'}
    ],
    link: []
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: 'https://conduit.productionready.io'
    }
  },
  modules: [
    '@nuxtjs/axios'
  ],
  plugins: [
    {src:'~/plugins/axios'},
    {src:'~/plugins/request'},
    {src:'~/plugins/dayjs'}
  ],
  server: {
    host: '0.0.0.0',
    port: 3245
  }
}
