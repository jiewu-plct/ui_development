import { toNumber } from "@vue/shared";
import { createRouter, createWebHashHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue"
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/pages/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/pages/Register.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => DefaultLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "/controldevice",
        name: "Control Device",
        component: () => import("@/views/ControlDevice.vue")
      },
      {
        path: '/management',
        name: 'Management',
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
];

const router = createRouter({
  // history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token && tokenNotExpired()) {
    next();
  } else {
    if (to.path === "/register") {
      next();
    } else if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

function tokenNotExpired() {
  const timestamp = JSON.parse(
    localStorage.getItem("token") as string
  ).timestamp;
  const expiredtime = 7 * 24 * 3600 * 1000;
  const now = new Date().getTime();
  if (now - timestamp > expiredtime) {
    localStorage.removeItem("token");
    return false;
  } else {
    return true;
  }
}

export default router;
