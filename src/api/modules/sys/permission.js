import request from '@/utils/request'

export const list = (param) => {
  return request({
    url: '/sys/permission/list',
    method: 'get',
    data: param
  })
}

export const all = (param) => {
  return request({
    url: '/sys/permission/all',
    method: 'get',
    data: param
  })
}

export const tree = (param) => {
  return request({
    url: '/sys/permission/tree',
    method: 'get',
    data: param
  })
}

export const update = ({ id, data }) => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'post',
    data
  })
}

export const save = ({ data }) => {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

export const get = (id) => {
  return request({
    url: '/sys/permission/' + id,
    method: 'get'
  })
}

export const findByName = (name) => {
  return request({
    url: '/sys/permission/findByName',
    method: 'get',
    params: { name }
  })
}

export const del = (id) => {
  return request({
    url: '/sys/permission/' + id,
    method: 'delete'
  })
}
