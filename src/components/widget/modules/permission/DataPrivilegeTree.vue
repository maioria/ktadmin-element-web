<template>
  <el-tree
    ref="tree"
    :props="props"
    :data="data"
    default-expand-all
    show-checkbox
    :check-strictly="false"
    node-key="id"
    @check="handleCheckChange"
  />
</template>

<script>
import editDialog from '@/components/mixins/editDialog'
import { tree } from '@/api/modules/sys/permission'

export default {
  name: 'DataPrivilegeTree',
  mixins: [editDialog],
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      props: {
        label: 'label',
        children: 'children'
      },
      count: 1,
      data: []
    }
  },
  computed: {
    idVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value(val) {
      console.log('val:' + JSON.stringify(val))
      // this.$refs.tree.setCurrentKey(val)
      this.$refs.tree.setCheckedKeys(val)
      // eslint-disable-next-line no-unused-vars
      const result = this.getCheckedKeys()
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      tree().then(data => {
        this.data = data.data
      })
    },
    handleCheckChange(data, checked, indeterminate) {
      this.idVal = this.getCheckedKeys()
    },
    getCheckedKeys() {
      const nodes = this.$refs.tree.getCheckedNodes(false, false)
      const result = []
      nodes.forEach(item => {
        result.push(item.id)
      })
      return result
    }
  }
}
</script>

<style scoped>
</style>
