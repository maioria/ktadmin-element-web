import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  id: '',
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: '',
  mobile: '',
  tel: '',
  authorities: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_AUTHORITIES: (state, authorities) => {
    state.authorities = authorities
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  },
  SET_TEL: (state, tel) => {
    state.tel = tel
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        if (data.token) {
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        } else {
          reject(data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed')
        }

        const { id, roles, name, avatar, introduction, permissions, email, mobile, tel } = data

        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ID', id)
        commit('SET_EMAIL', email)
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_MOBILE', mobile)
        commit('SET_TEL', tel)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_AVATAR', avatar)
        commit('SET_AUTHORITIES', permissions)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLES', [])
      removeToken()
      commit('SET_TOKEN', '')
      resolve()
    })
  },
  changeRoles({ commit, dispatch }, role) {
    return new Promise(resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)

      const { roles, authorities } = dispatch('getInfo')

      resetRouter()

      const accessRoutes = dispatch('permission/generateRoutes', { roles, authorities }, { root: true })

      router.addRoutes(accessRoutes)

      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
