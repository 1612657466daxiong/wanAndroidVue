import Vue from 'vue'
import App from './App'
import router from './router'
import Toast from  'components/toast/index'
import * as axios from "axios";

Vue.use(Toast)

const SERVER_URL = 'http://www.wanandroid.com';// 140测试服务器

let instance = axios.create({
  baseURL:SERVER_URL,
  timeout:20000,
  headers:{

  }
});

Vue.config.productionTip = false
Vue.prototype.$http = instance;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
