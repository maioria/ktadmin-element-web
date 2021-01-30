import request from '@/utils/request'

export const list = ({ pageNo, pageSize, keyword }) => {
  return request({
    url: '/monitor/log/list',
    method: 'get',
    params: { pageNo, pageSize, keyword }
  })
}
