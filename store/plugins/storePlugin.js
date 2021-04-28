const Cookie = process.client ? require('js-cookie') : undefined

export default (store) => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    if (mutation.type === 'user/recordUser') {
      Cookie.set('isLogin', 'true')
      Cookie.set('user', JSON.stringify(mutation.payload))
    }
    if (mutation.type === 'user/removeUser') {
      Cookie.remove('isLogin')
      Cookie.remove('user')
    }
  })
}
