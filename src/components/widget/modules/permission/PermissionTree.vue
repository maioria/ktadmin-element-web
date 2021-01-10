<template>
  <el-tree
    ref="tree"
    :props="props"
    :data="data"
    default-expand-all
    :show-checkbox="showCheckbox"
    :check-strictly="true"
    node-key="name"
    @check="handleCheckChange"
    @node-click="handleNodeClick"
  />
</template>

<script>
import editDialog from '@/components/mixins/editDialog'
import { tree } from '@/api/modules/sys/permission'

export default {
  name: 'PrivilegeTree',
  mixins: [editDialog],
  props: {
    value: {
      require: true,
      type: [Array, Object],
      default: () => {
        return []
      }
    },
    showCheckbox: {
      require: false,
      type: Boolean,
      default: () => {
        return true
      }
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
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      tree().then(data => {
        this.data = data.data
        this.refreshChecked()
      })
    },
    refreshChecked() {
      if (this.idVal && this.idVal.length > 0) {
        this.$refs.tree.setCheckedKeys(this.idVal)
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      this.idVal = this.getCheckedKeys()
    },
    handleNodeClick(data, node, ele) {
      this.$emit('node-click', data, node, ele)
    },
    setCheckedKeys(val) {
      this.$refs.tree.setCheckedKeys(val)
    },
    getCheckedKeys() {
      const nodes = this.$refs.tree.getCheckedNodes(false, true)
      const result = []
      nodes.forEach(item => {
        result.push(item.name)
      })
      return result
    }
  }
}
</script>

<style scoped>

</style>
