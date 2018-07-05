const bar = {
  state: {
    barIsOpen: false
  },
  mutations: {
    changeBarIsOpen (state) {
      state.barIsOpen = !state.barIsOpen
    }
  },
  actions: {
    changeBarIsOpen ({commit}) {
      commit('changeBarIsOpen')
    }
  }
}

export default bar
