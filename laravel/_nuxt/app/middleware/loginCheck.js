const loginCheck = ({ store, redirect }) => {
  if (store.state.auth.user) {
    redirect('/mypage')
  }
}

export default loginCheck