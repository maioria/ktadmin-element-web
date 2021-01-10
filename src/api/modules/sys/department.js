import request from '@/utils/request'

export const list = (param) => {
  return request({
    url: '/sys/dep/list',
    method: 'get',
    params: param
  })
}

export const tree = (param) => {
  return request({
    url: '/sys/dep/tree',
    method: 'get',
    params: param
  })
}

export const get = (id) => {
  return request({
    url: '/sys/dep/' + id,
    method: 'get'
  })
}
export const save = (data) => {
  return request({
    url: '/sys/dep',
    method: 'post',
    data
  })
}
export const update = (data) => {
  return request({
    url: '/sys/dep/' + data.id,
    method: 'post',
    data
  })
}
export const del = (id) => {
  return request({
    url: '/sys/dep/' + id,
    method: 'delete'
  })
}
export const disabled = (id) => {
  return request({
    url: '/sys/dep/' + id + '/status/0',
    method: 'post'
  })
}
export const active = (id) => {
  return request({
    url: '/sys/dep/' + id + '/status/1',
    method: 'post'
  })
}
