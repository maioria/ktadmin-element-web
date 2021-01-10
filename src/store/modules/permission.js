import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission({ authorities }, route) {
  if (route.meta && route.meta.authorities) {
    return route.meta.authorities && authorities.some(authority => route.meta.authorities.includes(authority))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, { authorities }) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission({ authorities }, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, { authorities })
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, { authorities }) {
    return new Promise(resolve => {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, { authorities })
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
