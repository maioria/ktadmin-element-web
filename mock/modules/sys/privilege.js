module.exports = [
  {
    url: '/sys/privilege/list',
    type: 'get',
    response: {
      code: 200,
      data: {
        total: 30,
        list: [
          { id: 1, label: '系统设置', name: 'sys' },
          { id: 2, label: '员工', name: 'admin' },
          { id: 3, label: 'Team Leader', name: 'admin' },
          { id: 4, label: '公司领导', name: 'admin' }
        ]
      }
    }
  },
  {
    url: '/sys/privilege/tree',
    type: 'get',
    response: {
      code: 200,
      data: [
        {
          id: 1,
          label: '系统设置',
          name: 'sys',
          type: 'menu',
          children:
            [
              { id: 2, label: '公司设置', type: 'menu', name: 'sys:organization' },
              { id: 3, label: '部门设置', type: 'menu', name: 'sys:department' },
              { id: 4, label: '用户设置', type: 'menu', name: 'sys:user' },
              { id: 5, label: '角色设置', type: 'menu', name: 'sys:user' },
              { id: 6, label: '权限设置', type: 'menu', name: 'sys:user' }
            ]
        },
        {
          id: 7,
          label: '公司',
          type: 'menu',
          name: 'company'
        }
      ]
    }
  },
  {
    url: '/sys/privilege/all',
    type: 'get',
    response: {
      code: 200,
      data: {
        list: [
          { id: 1, label: '系统管理员', name: 'admin' },
          { id: 2, label: '员工', name: 'admin' },
          { id: 3, label: 'Team Leader', name: 'admin' },
          { id: 4, label: '公司领导', name: 'admin' }
        ]
      }
    }
  },
  {
    url: '/sys/privilege/all',
    type: 'get',
    response: {
      code: 200,
      data: {
        list: [
          { id: 1, label: '系统管理员', name: 'admin' },
          { id: 2, label: '员工', name: 'admin' },
          { id: 3, label: 'Team Leader', name: 'admin' },
          { id: 4, label: '公司领导', name: 'admin' }
        ]
      }
    }
  },
  {
    url: '/sys/privilege/[0-9]+',
    type: 'get',
    response: {
      code: 200,
      data: {
        'id': 1,
        'label': '系统设置',
        name: 'sys',
        parentId: null,
        type: 'menu'
      }
    }
  },
  {
    url: '/sys/privilege',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        id: 2
      }
    }
  },
  {
    url: '/sys/privilege/[0-9]+',
    type: 'delete',
    response: { code: 20000 }
  }
]
