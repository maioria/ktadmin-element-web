module.exports = [
  {
    url: '/sys/role/list',
    type: 'get',
    response: {
      code: 200,
      data: {
        total: 30,
        data: [
          { id: 1, label: '系统管理员', name: 'admin', modifyTime: '2019-11-11 11:22:33' },
          { id: 2, label: '员工', name: 'user', modifyTime: '2019-11-11 11:22:33' },
          { id: 3, label: 'Team Leader', name: 'teamLeader', modifyTime: '2019-11-11 11:22:33' },
          { id: 4, label: '公司领导', name: 'companyLeader', modifyTime: '2019-11-11 11:22:33' }
        ]
      }
    }
  },
  {
    url: '/sys/role/all',
    type: 'get',
    response: {
      code: 200,
      data: {
        list: [
          { id: 1, label: '系统管理员', name: 'admin', modifyTime: '2019-11-11 11:22:33' },
          { id: 2, label: '员工', name: 'user', modifyTime: '2019-11-11 11:22:33' },
          { id: 3, label: 'Team Leader', name: 'teamLeader', modifyTime: '2019-11-11 11:22:33' },
          { id: 4, label: '公司领导', name: 'companyLeader', modifyTime: '2019-11-11 11:22:33' }
        ]
      }
    }
  },
  {
    url: '/sys/role/[0-9]+/privileges',
    type: 'get',
    response: { code: 200, data: [2, 3, 4] }
  },
  {
    url: '/sys/role/[0-9]+/dataPrivileges',
    type: 'get',
    response: { code: 200, data: [1, 2, 3, 4] }
  },
  {
    url: '/sys/role/[0-9]+',
    type: 'get',
    response: {
      code: 200,
      data: {
        'id': 1,
        'label': '系统管理员',
        name: 'admin',
        'createTime': '2019-09-25 14:05:25'
      }
    }
  },
  {
    url: '/sys/role',
    type: 'post',
    response: { code: 200, id: 2 }
  },
  {
    url: '/sys/role/[0-9]+',
    type: 'delete',
    response: { code: 20000 }
  },
  {
    url: '/sys/role/distributePrivileges',
    type: 'post',
    response: { code: 20000 }
  },
  {
    url: '/sys/role/distributeDataPrivileges',
    type: 'post',
    response: { code: 20000 }
  }
]
