import Vue from 'vue'
import Vuex from 'vuex'
import bar from './modules/bar'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    bar
  }
})
export default store
