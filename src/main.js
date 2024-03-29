import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' // 引用 axios 套件
import jquery from 'jquery'
import jqui from 'jquery-ui-dist/jquery-ui'
import jquiStyle from 'jquery-ui-dist/jquery-ui.min.css'

Vue.prototype.axios = axios
Vue.prototype.$ = jquery

Vue.config.productionTip = false

new Vue({
  router,
  jqui,
  jquiStyle,
  render: h => h(App)
}).$mount('#app')
