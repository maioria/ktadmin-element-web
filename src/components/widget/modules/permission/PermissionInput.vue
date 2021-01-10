<template>
  <el-popover
    v-model="popoverShow"
    placement="bottom"
    trigger="focus"
    width="200"
    @show="handleShow"
  >
    <div>
      <permission-tree
        ref="tree"
        :show-checkbox="showCheckbox"
        @node-click="nodeClick"
      />
    </div>
    <el-input slot="reference" v-model="labelVal" :readonly="true" />
  </el-popover>
</template>

<script>
import PermissionTree from '@/components/widget/modules/permission/PermissionTree'
import { findByName } from '@/api/modules/sys/permission'
export default {
  name: 'PermissionInput',
  components: { PermissionTree },
  props: {
    value: {
      default: null,
      require: true,
      type: [Number, String, Array]
    },
    showCheckbox: {
      require: false,
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      object: {},
      popoverShow: false
    }
  },
  computed: {
    labelVal: {
      get() {
        return this.object.label
      }
    },
    nameVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    nodeClick(data) {
      this.object = data
      if (data) { this.nameVal = this.object.name }
      this.popoverShow = false
    },
    handleShow() {
      this.$refs.tree.initData()
    },
    setValue(val) {
      if (val) {
        findByName(val).then(data => {
          this.object = data.data
          if (data) { this.nameVal = this.object.name }
        })
      } else {
        this.object = {}
      }
    }
  }
}
</script>

<style scoped>

</style>
