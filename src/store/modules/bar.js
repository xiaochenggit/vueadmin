const bar = {
  state: {
    barIsOpen: window.localStorage.getItem('barIsOpen') === 'true'
  },
  mutations: {
    changeBarIsOpen (state) {
      state.barIsOpen = !state.barIsOpen
      window.localStorage.setItem('barIsOpen', state.barIsOpen)
    }
  },
  actions: {
    changeBarIsOpen ({commit}) {
      commit('changeBarIsOpen')
    }
  }
}

export default bar
