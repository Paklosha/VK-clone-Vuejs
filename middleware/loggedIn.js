export default function ({ store, redirect }) {
    if (store.state.auth.loggedIn) {
      return redirect('/'+store.state.auth.user._id)
    }
  }