export default ({ store, redirect }) => {
  if (!store.state.isLogin){
    redirect('/login')
  }
}