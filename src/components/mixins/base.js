export default {
  computed: {
    loginUser: {
      get: function() {
        return this.$store.state.loginUser
      }
    }
  },
  methods: {
    hasPrivilege(val) {
      return this.loginUser && this.loginUser.privileges.indexOf(val) >= 0
    },
    go(url) {
      this.$router.push(url)
    }
  },
  filters: {
    statusName(value) {
      if (value === null || value === undefined) {
        return value
      }
      return value === 'NORMAL' ? '正常' : '停用'
    },
    tree(data) {
      const tree = []
      let o
      data.forEach(item => {
        if (item.parentId == null) {
          o = {}
          Object.assign(o, item)
          tree.push(o)
          item.children = null
        }
      })
      tree.forEach(item => {
        findChild(item, data)
      })
      return tree
    }
  }
}

function findChild(parent, data) {
  data.forEach(item => {
    if (item.parentId && item.parentId === parent.id) {
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
      findChild(item, data)
    }
  })
}
