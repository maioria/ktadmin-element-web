import request from '@/utils/request'
import qs from 'qs'

export const login = params => {
  return request({
    url: '/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: qs.stringify(params)
  })
}

export const validPassword = params => {
  return request({
    url: '/validPassword',
    method: 'get',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: qs.stringify(params)
  })
}

export const updPassword = params => {
  return request({
    url: '/updPassword',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: qs.stringify(params)
  })
}

export const userInfo = () => {
  return request({
    url: '/userInfo',
    method: 'get'
  })
}
