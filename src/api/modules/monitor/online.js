import request from '@/utils/request'
export const list = ({ pageNo, pageSize, keyword }) => {
  return request({
    url: '/monitor/online/list',
    method: 'get',
    params: { pageNo, pageSize, keyword }
  })
}

export const kick = (keys) => {
  return request({
    url: '/monitor/online/kick',
    method: 'post',
    params: { keys }
  })
}
