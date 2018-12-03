import Vue from 'vue'
import App from './App'
import router from './router'
import * as axios from "axios";
import mRegex from './utils/regex'
import Toast from './components/toast/index'
import  'swiper/dist/css/swiper.css'
import  VueAwesomeSwiper from 'vue-awesome-swiper'

import Qs from 'qs'

Vue.use(Toast)
Vue.use(VueAwesomeSwiper)

const SERVER_URL = '/api';// 服务器

let instance = axios.create({
  baseURL:SERVER_URL,
  timeout:20000,
  headers:{
  },
  transformRequest:[function (data) {
      return Qs.stringify({
        ...data
      })
  }]
});


Vue.config.productionTip = false
Vue.prototype.$http = instance;
Vue.prototype.Regex = mRegex;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
