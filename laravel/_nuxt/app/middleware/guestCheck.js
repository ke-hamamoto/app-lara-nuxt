const guestCheck = ({ store, redirect, route }) => {
  if (!store.state.auth.user) {
    redirect({
      name: 'signin',
    })
  }
}

export default guestCheck