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
axios.defaults.withCredentials = true

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
instance.interceptors.request.use(function(res){
  if(res.url.includes('login')){
    return res;
  }
  if(res.url.includes('logout')){
    return res;
  }
  console.log( "UserInfo  "+ JSON.parse(window.sessionStorage.getItem('UserInfo')));
  if(window.sessionStorage.getItem('UserInfo')&&JSON.parse(window.sessionStorage.getItem('UserInfo'))!==null){
    let token = JSON.parse(window.sessionStorage.getItem('UserInfo')).token;
    mRegex.setCookie('token_pass',token)
    let userName = JSON.parse(window.sessionStorage.getItem('UserInfo')).username;
    mRegex.setCookie('loginUserName',userName)
  }
  return res;
},function(error){
  console.log( " error  "+ error);
  return Promise.reject(error)
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
