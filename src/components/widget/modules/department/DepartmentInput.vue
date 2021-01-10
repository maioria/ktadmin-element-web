<template>
  <el-popover
    v-model="popoverShow"
    placement="bottom"
    trigger="focus"
    width="200"
    @show="handleShow"
  >
    <div>
      <department-tree
        ref="departmentTree"
        @node-click="nodeClick"
      />
    </div>
    <el-input slot="reference" v-model="departmentName" :readonly="true" />
  </el-popover>
</template>

<script>
import DepartmentTree from './DepartmentTree'
import { get } from '@/api/modules/sys/department'

export default {
  name: 'DepartmentInput',
  components: { DepartmentTree },
  props: {
    value: {
      default: null,
      require: true,
      type: Number
    }
  },
  data() {
    return {
      department: null,
      popoverShow: false
    }
  },
  computed: {
    departmentVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    departmentName() {
      return this.department && this.department.name
    }
  },
  methods: {
    nodeClick(data) {
      this.department = data
      this.departmentVal = this.department && this.department.id
      this.popoverShow = false
    },
    handleShow() {
      this.$refs.departmentTree.initData()
    },
    setValue(val) {
      if (val) {
        get(val).then(data => {
          this.department = data.data
        })
      } else {
        this.department = null
        this.departmentVal = null
      }
    }
  }
}
</script>

<style scoped>

</style>
