export default ({ $axios, redirect, store }) => {
  $axios.onRequest(config => {
    const user = store.state.user && store.state.user.user
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
