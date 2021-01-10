import request from '@/utils/request'

export const list = (param) => {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params: param
  })
}
export const get = (id) => {
  return request({
    url: '/sys/user/' + id,
    method: 'get'
  })
}
export const save = (data) => {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
export const upd = ({ id, data }) => {
  return request({
    url: '/sys/user/' + id,
    method: 'post',
    data
  })
}
// 最重要的却往往是最容易忽略的，身处繁华，不忘记初心与本质，才能得到持久的幸福。
export const updAccount = ({ id, data }) => {
  return request({
    url: `/sys/user/${id}/updAccount`,
    method: 'post',
    data
  })
}

export const checkMobileExist = ({ mobile, id }) => {
  return request({
    url: `/sys/user/checkMobileExist`,
    method: 'get',
    params: { mobile, id }
  })
}
export const checkEmailExist = ({ email, id }) => {
  return request({
    url: `/sys/user/checkEmailExist`,
    method: 'get',
    params: { email, id }
  })
}

export const del = (id) => {
  return request({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}

export const resetPassword = params => {
  return request({
    url: '/sys/user/resetPassword',
    method: 'post',
    params
  })
}
