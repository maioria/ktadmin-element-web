import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import Cookies from 'js-cookie'
import './styles/element-variables.scss'
import 'normalize.css/normalize.css'
import './icons'
import '@/styles/index.scss'
import './permission'
import * as filters from './filters' // global filters
import Minxins from './components/mixins/base'
Vue.mixin(Minxins)
// import api from './api'
// Vue.use(api)
Vue.config.productionTip = false
Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

// if (process.env.NODE_ENV === 'production') {
// const { mockXHR } = require('../mock')
// mockXHR()
// }
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
