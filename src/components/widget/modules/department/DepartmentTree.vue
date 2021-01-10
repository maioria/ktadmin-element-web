<template>
  <el-tree
    ref="departmentTree"
    :data="data"
    :default-expand-all="true"
    node-key="id"
    :show-checkbox="showCheckbox"
    :props="defaultProps"
    :expand-on-click-node="false"
    @node-click="handleNodeClick"
    @check-change="handleCheckChange"
    @check="handleCheck"
  />
</template>

<script>
import { tree } from '@/api/modules/sys/department'
export default {
  name: 'DepartmentTree',
  props: {
    showCheckbox: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    setCheckedKeys(keys, leafOnly) {
      this.$refs.departmentTree.setCheckedKeys(keys, leafOnly)
    },
    setCurrentKey(key) {
      this.$refs.departmentTree.setCurrentKey(key)
    },
    initData() {
      tree().then(data => {
        this.data = data.data
      })
    },
    handleNodeClick(data) {
      this.$emit('node-click', data)
    },
    handleCheckChange(data, checked, indeterminate) {
      this.$emit('check-change', data, checked, indeterminate)
    },
    handleCheck(data, checked) {
      this.$emit('check', data, checked)
    }
  }
}
</script>

<style scoped>
</style>
