import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.scss'

import axios from 'axios'
axios.defaults.baseURL = 'http://47.119.112.252:8089'
Vue.prototype.$http = axios

import ViewAreaTitle from './components/ViewAreaTitle'
Vue.component('view-area-title', ViewAreaTitle)

Vue.config.productionTip = false

// Object.prototype.turnToFormData = function () {
//   console.log();
// }

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')