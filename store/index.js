const cookieparser = process.server ? require('cookieparser') : undefined

import storePlugin from './plugins/storePlugin'

export const plugins = [storePlugin]

export const state = () => {
  return {
    isLogin: false
  }
}

export const mutations = {
  login(state) {
    state.isLogin = true
  },
  logout(state) {
    state.isLogin = false
  }
}

export const actions = {
  // 服务端操作sotre
  nuxtServerInit ({ commit }, { req }) {
    if (req.headers.cookie) {
      try {
        const cookie = cookieparser.parse(req.headers.cookie)
        if (cookie.isLogin === 'true') {
          commit('login')
          commit('user/recordUser', JSON.parse(cookie.user))
        } else {
          commit('logout')
          commit('user/removeUser')
        }
      } catch (error) {
        
      }
    }
  }
}