module.exports = [{
  url: '/sys/dict/user/rank',
  type: 'get',
  response: {
    code: 200,
    data: [
      {
        value: 1,
        'label': '员工'
      },
      {
        value: 2,
        'label': 'Team Leader'
      },
      {
        value: 3,
        'label': '公司领导'
      }
    ]
  }
}
]
