// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import echarts from 'echarts'
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts
const i18n = new VueI18n({
  locale: localStorage.lang || 'en',
  messages: {
    'en': require('./i18n/lang/en')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
