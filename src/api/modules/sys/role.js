import request from '@/utils/request'
import qs from 'qs'

export const list = (param) => {
  return request({
    url: '/sys/role/list',
    method: 'get',
    data: param
  })
}

export const all = (param) => {
  return request({
    url: '/sys/role/all',
    method: 'get',
    data: param
  })
}

export const get = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'get'
  })
}
export const dataPermissionTypes = () => {
  return request({
    url: '/sys/role/dataPermissionTypes',
    method: 'get'
  })
}
export const save = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
export const upd = ({ id, data }) => {
  return request({
    url: '/sys/role/' + id,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
export const del = (id) => {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

export const getDataPrivileges = (id) => {
  return request(
    {
      url: '/sys/role/' + id + '/dataPrivileges',
      methods: 'get'
    }
  )
}
