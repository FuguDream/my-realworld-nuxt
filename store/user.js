export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  recordUser(state, payload) {
    state.user = payload
  },
  removeUser(state) {
    state.user = null
  }
}
