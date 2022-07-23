export const navItems = [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      // text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Control Device',
    to: '/controldevice',
    icon: 'cil-power-standby',
    badge: {
      color: 'primary',
    },
  },
  {
    component: 'CNavGroup',
    name: 'Management',
    to: '/devicemanagement',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Device Management',
        to: '/management/device-management',
      },
      {
        component: 'CNavItem',
        name: 'User Management',
        to: '/management/user-management',
      },
    ],
  },
]

export const userNavItems = [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      // text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Control Device',
    to: '/controldevice',
    icon: 'cil-power-standby',
    badge: {
      color: 'primary',
    },
  },
]

export const adminNavItems = [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      // text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Control Device',
    to: '/controldevice',
    icon: 'cil-power-standby',
    badge: {
      color: 'primary',
    },
  },
  {
    component: 'CNavGroup',
    name: 'Management',
    to: '/devicemanagement',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Device Management',
        to: '/management/device-management',
      },
    ],
  },
]
