
export const state = () => ({
  contentVisible: false,
  online: null,
  lastActivity: null
})
export const mutations = {
  changeContentVisibility(state) {
    state.contentVisible = !state.contentVisible 
  },
  changeOnline(state,bool) {
    state.online = bool 
  },
  changeLastActivity(state,date) {
    state.lastActivity = date 
  }
}
export const actions = {
  async changeOnline({commit,getters}, {bool,axios,lastActivity}){
    await axios.put('/changeOnline', { id: getters.loggedInUser._id,bool,lastActivity});
    commit('changeOnline', bool)
  },
  changeLastActivity({ commit }, {date}){
    commit('changeLastActivity', date)
  },
}
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  },
  isContentVisible(state) {
    return state.contentVisible
  },
}


