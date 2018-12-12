import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login'
import Home from '@/pages/Home'
import Knowledge from '@/pages/Knowledge'
import Navigation from '@/pages/Navigation'
import Project from '@/pages/Project'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      name:'index',
      component:Home,
      meta:{
        keepAlive: true
      }
    },
    {
      path:'/knowledge',
      name:'knowledge',
      component:Knowledge,
    },
    {
      path:'/navigation',
      name:'navigation',
      component:Navigation,
    },
    {
      path:'/project',
      name:'project',
      component:Project,
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
