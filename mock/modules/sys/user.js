module.exports = [
  {
    url: '/sys/user/list',
    type: 'get',
    response: {
      code: 200,
      data: {
        total: 100,
        data: [
          {
            'id': 1,
            'name': '系统管理员',
            'mobile': '13120214196',
            'email': '469236687@qq.com',
            username: 'admin',
            'rank': 3,
            rankName: '公司领导',
            roleNames: '系统管理员,财务人员',
            'status': 1,
            lockStatus: 1,
            lockStatusName: '正常',
            statusName: '在职',
            sysOrgName: '全聘致远科技有限公司',
            departmentId: 1,
            departmentName: '全聘致远科技有限公司',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25'
          },
          {
            'id': 2,
            'name': '系统管理员',
            'mobile': '13120214196',
            'email': '469236687@qq.com',
            username: 'admin',
            'rank': 3,
            rankName: '公司领导',
            roleNames: '系统管理员,财务人员',
            'status': 1,
            lockStatus: 1,
            lockStatusName: '正常',
            statusName: '在职',
            sysOrgName: '全聘致远科技有限公司',
            departmentId: 1,
            departmentName: '全聘致远科技有限公司',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25'
          },
          {
            'id': 3,
            'name': '系统管理员',
            'mobile': '13120214196',
            'email': '469236687@qq.com',
            username: 'admin',
            'rank': 3,
            rankName: '公司领导',
            roleNames: '系统管理员,财务人员',
            'status': 1,
            lockStatus: 1,
            lockStatusName: '正常',
            statusName: '在职',
            sysOrgName: '全聘致远科技有限公司',
            departmentId: 1,
            departmentName: '全聘致远科技有限公司',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25'
          },
          {
            'id': 1,
            'name': '系统管理员',
            'mobile': '13120214196',
            'email': '469236687@qq.com',
            username: 'admin',
            'rank': 3,
            rankName: '公司领导',
            roleNames: '系统管理员,财务人员',
            'status': 1,
            lockStatus: 1,
            lockStatusName: '正常',
            statusName: '在职',

            sysOrgName: '全聘致远科技有限公司',
            departmentId: 1,
            departmentName: '全聘致远科技有限公司',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25'
          },
          {
            'id': 1,
            'name': '系统管理员',
            'mobile': '13120214196',
            'email': '469236687@qq.com',
            username: 'admin',
            roleNames: '系统管理员,财务人员',
            'rank': 3,
            rankName: '公司领导',
            'status': 1,
            lockStatus: 1,
            lockStatusName: '正常',
            statusName: '在职',

            sysOrgName: '全聘致远科技有限公司',
            departmentId: 1,
            departmentName: '全聘致远科技有限公司',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25'
          },
          {
            'id': 1,
            'name': '系统管理员',
            'mobile': '13120214196',
            'email': '469236687@qq.com',
            username: 'admin',
            roleNames: '系统管理员,财务人员',
            'rank': 3,
            'rankName': '用户',
            'status': 1,
            lockStatus: 1,
            lockStatusName: '正常',
            statusName: '在职',

            sysOrgName: '全聘致远科技有限公司',
            departmentId: 1,
            departmentName: '全聘致远科技有限公司',
            'createTime': '2019-09-25 14:05:25',
            'modifyTime': '2019-09-25 14:05:25'
          }
        ]
      }
    }
  },
  {
    url: '/sys/user/[0-9]+',
    type: 'get',
    response: {
      code: 200,
      data: {
        'id': 1,
        'name': '系统管理员',
        'mobile': '13120214196',
        'email': '469236687@qq.com',
        'rank': 3,
        'rankName': '用户',
        'status': 1,
        lockStatus: 1,
        lockStatusName: '正常',
        statusName: '在职',

        roles: [1, 2, 3],
        sysOrgName: '全聘致远科技有限公司',
        departmentId: 1,
        departmentName: '全聘致远科技有限公司',
        'createTime': '2019-09-25 14:05:25',
        'modifyTime': '2019-09-25 14:05:25'
      }
    }
  },
  {
    url: '/sys/user',
    type: 'post',
    response: { code: 200, id: 2 }
  },
  {
    url: '/sys/user/[0-9]+',
    type: 'delete',
    response: { code: 20000 }
  }
]
