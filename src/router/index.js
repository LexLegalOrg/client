import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/stats/Index'),
    props:true,
    redirect: '/profit',
    children:[
      {
        path: 'profit',
        component: ()=>import('../views/stats/SingleGraph'),
        name: 'SingleGraph',
        props: true
      },
      {
        path: 'users',
        component: ()=>import('../views/stats/UsersGraph'),
        name: 'UsersGraph',
        props: true
      },
    ]
  },
  {
   path:'/login',
   name:'Login',
   component: ()=>import('../views/service/auth.service')
  },
  {
    path:'/me',
    name: 'Index',
    component: ()=>import('../views/user/Index'),
    redirect: '/me/profile',
    children:[
      {
        path: 'profile',
        name: 'Profile',
        component: ()=>import('../views/user/Profile')
      },
      {
        path: 'bonuses',
        name: 'Bonuses',
        component: ()=>import('../views/user/Bonuses')
      },
      {
        path: 'planning',
        name: 'Planning',
        component: ()=>import('../views/user/Planning')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: ()=>import('../views/user/Settings')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
