import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    // currentUser: '',
  },
  // getters: {
  //   getUser: (state) => state.currentUser,
  // },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    // setUser(state, newUser) {
    //   state.currentUser = newUser
    // },
  },
  actions: {},
  modules: {},
})
