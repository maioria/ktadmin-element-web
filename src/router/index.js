import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import ('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: {
          title: 'Profile', icon: 'user', noCache: true
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index')
  }
]

export const asyncRoutes = [
  {
    path: '/sys/setting',
    component: Layout,
    name: 'SysSetting',
    meta: {
      title: '系统设置',
      icon: 'el-icon-s-tools',
      authorities: ['sys']
    },
    children: [
      {
        path: '/sys/department',
        name: 'department',
        component: () => import('@/views/sys/dep/list'),
        meta: {
          title: '部门管理',
          icon: 'tree',
          authorities: ['sys:dep:view']
        }
      },
      {
        path: '/sys/user',
        name: 'user',
        component: () => import('@/views/sys/user/list'),
        meta: {
          title: '用户管理',
          icon: 'user',
          authorities: ['sys:user:view']
        }
      },
      {
        path: '/sys/role',
        name: 'role',
        component: () => import('@/views/sys/role/list'),
        meta: {
          title: '角色管理',
          icon: 'component',
          authorities: ['sys:role:view']
        }
      },
      {
        path: '/sys/permission',
        name: 'permission',
        component: () => import('@/views/sys/permission/list'),
        meta: {
          title: '权限管理',
          icon: 'component',
          authorities: ['sys:permission:view']
        }
      }
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    meta: {
      icon: 'el-icon-s-tools',
      authorities: ['monitor'],
      title: '系统监控'
    },
    children: [
      {
        path: 'online',
        component: () => import('@/views/monitor/online/index'),
        meta: {
          icon: 'el-icon-s-tools',
          title: '在线用户',
          authorities: ['monitor:online']
        }
      },
      {
        path: 'log',
        component: () => import('@/views/monitor/log/index'),
        meta: {
          icon: 'el-icon-s-tools',
          title: '操作日志',
          authorities: ['monitor:log']
        }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
