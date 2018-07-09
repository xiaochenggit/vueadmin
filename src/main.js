// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import store from './store/index'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 时间格式化

Vue.filter('moment', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dataStr).format(pattern)
  // return dataStr
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
