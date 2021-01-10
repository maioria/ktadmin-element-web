import request from '@/utils/request'

export const columnList = (param) => {
  return request({
    url: '/sys/dict/' + param.table + '/' + param.column,
    method: 'get'
  })
}
