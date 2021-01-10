module.exports = [
  {
    url: '/sys/dep/list',
    type: 'get',
    response: {
      code: 200,
      data: {
        total: 100,
        data: [
          {
            'id': 1,
            'name': '研发部',
            'sysOrgName': '全聘致远科技有限公司',
            parentId: null,
            parentName: null,
            status: 'NORMAL',
            statusName: '正常',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25'
          },
          {
            'id': 2,
            'name': '财务部',
            'sysOrgName': '全聘致远科技有限公司',
            status: 'NORMAL',
            statusName: '正常',
            'mobile': '13120214196',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25',
            'parentId': null,
            parentName: null
          },
          {
            'id': 3,
            'name': '业务部',
            'sysOrgName': '全聘致远科技有限公司',
            status: 'NORMAL',
            statusName: '正常',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25',
            'parentId': null,
            parentName: null
          },
          {
            'id': 4,
            'name': '业务1部',
            'sysOrgName': '全聘致远科技有限公司',
            'status': 0,
            statusName: '停用',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25',
            'parentId': 3,
            parentName: '业务部'
          },
          {
            'id': 5,
            'name': '业务2部',
            'sysOrgName': '全聘致远科技有限公司',
            'status': 0,
            statusName: '停用',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25',
            'parentId': 3,
            parentName: '业务部'
          }
        ]
      }
    }
  },
  {
    url: '/sys/dep/tree',
    method: 'get',
    response: {
      code: 200,
      data: [
        {
          id: 1,
          name: '全聘致远',
          status: 1,
          parentId: null,
          children:
              [
                {
                  'id': 1,
                  'name': '研发部',
                  parentId: null,
                  status: 'NORMAL'
                },
                {
                  'id': 2,
                  'name': '财务部',
                  status: 'NORMAL',
                  'createTime': '2019-09-25 14:05:25',
                  'modifyTime': '2019-09-25 14:05:25',
                  'parentId': null,
                  parentName: null
                },
                {
                  'id': 3,
                  'name': '业务部',
                  status: 'NORMAL',
                  'createTime': '2019-09-25 14:05:25',
                  'modifyTime': '2019-09-25 14:05:25',
                  'parentId': null,
                  children: [
                    {
                      'id': 4,
                      'name': '业务1部',
                      'status': 0,
                      'createTime': '2019-09-25 14:05:25',
                      'modifyTime': '2019-09-25 14:05:25',
                      'parentId': 3
                    },
                    {
                      'id': 5,
                      'name': '业务2部',
                      'status': 0,
                      'parentId': 3,
                      parentName: '业务部'
                    }
                  ]
                }
              ]
        },
        {
          id: 6,
          name: '全职人事部',
          status: 1,
          parentId: null,
          children:
              [
                {
                  'id': 7,
                  'name': '人事1部',
                  parentId: null,
                  status: 'NORMAL'
                },
                {
                  'id': 8,
                  'name': '人事2部',
                  status: 'NORMAL',
                  'createTime': '2019-09-25 14:05:25',
                  'modifyTime': '2019-09-25 14:05:25',
                  'parentId': null,
                  parentName: null
                }
              ]
        }
      ]
    }
  },
  {
    url: '/sys/dep/[0-9]+',
    type: 'get',
    response: {
      code: 200,
      data: {
        'id': 1,
        'name': '全职招聘',
        sysOrgName: '全聘致远科技有限公司',
        contacts: '张涛',
        mobile: '13120214196',
        status: 'NORMAL',
        'createTime': '2019-09-25 14:05:25',
        'parentId': null
      }
    }
  },
  {
    url: '/sys/dep',
    type: 'post',
    response: { code: 200, id: 2 }
  },
  {
    url: '/sys/dep/[0-9]+',
    type: 'delete',
    response: { code: 20000 }
  },
  {
    url: '/sys/dep/[0-9]+/status/0',
    type: 'post',
    response: { code: 200, id: 2 }
  },
  {
    url: '/sys/dep/[0-9]+/status/1',
    type: 'post',
    response: { code: 200, id: 2 }
  }
]
