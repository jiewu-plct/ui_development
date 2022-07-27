import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/pages/Register.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/controldevice',
        name: 'Control Device',
        component: () => import('@/views/ControlDevice.vue'),
      },
      {
        path: '/management',
        name: 'Management',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/management/device-management',
        children: [
          {
            path: '/management/device-management',
            name: 'Device Management',
            component: () => import('@/views/management/DeviceManagement.vue'),
          },
          {
            path: '/management/user-management',
            name: 'User Management',
            component: () => import('@/views/management/UserManagement.vue'),
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // console.log('token1111', token)
  if (token && tokenNotExpired()) {
    // console.log('next1')
    next()
  } else {
    if (to.path === '/register') {
      // console.log('to register')
      next()
    } else if (to.path === '/login') {
      // console.log('to login')
      next()
    } else {
      // console.log('next2')
      next('/login')
    }
  }
})

function tokenNotExpired() {
  const userdata = localStorage.getItem('token')
  const expiredtime = 7 * 24 * 3600 * 1000
  const now = new Date().getTime()
  if (now - userdata.timestamp > expiredtime) {
    localStorage.removeItem('token')
    return false
  } else {
    return true
  }
}

export default router
