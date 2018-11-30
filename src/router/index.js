import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '@/pages/Home'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/',
      name:'index',
      component:Home,

    },
    {
      path: '/Login',
      name: 'Login',//登录
      component:{
        app:resolve=>require(['../pages/Login.vue'],resolve)
      }
    },
  ]
})
