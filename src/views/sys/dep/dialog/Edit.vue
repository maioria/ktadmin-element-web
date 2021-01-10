<template>
  <el-dialog
    v-loading="loading"
    title="部门"
    :visible.sync="showVal"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closed"
    @open="handleOpen"
  >
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item label="父部门" prop="parentId">
        <department-input
          ref="departmentInputRef"
          v-model="data.parentId"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="data.name" placeholder="请输入名称" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="cancel">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import DepartmentInput from '@/components/widget/modules/department/DepartmentInput'
import editDialog from '@/components/mixins/editDialog'
import { get, save, update } from '@/api/modules/sys/department'

export default {
  name: 'Edit',
  components: { DepartmentInput },
  mixins: [editDialog],
  props: {},
  data() {
    return {
      loading: false,
      data: {
        parentId: null,
        name: null
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    submitData: {
      get() {
        const data = this.data
        data.id = this.id
        return data
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.submitData.id) {
            update(this.submitData).then(this.success)
          } else {
            save(this.submitData).then(this.success)
          }
        } else {
          return false
        }
      })
    },
    success(data) {
      this.loading = false
      this.$message('提交成功')
      this.showVal = false
      this.reset()
      this.confirm(data.data)
    },
    confirm(id) {
      this.$emit('confirm', id)
    },
    init() {
      this.loading = true
      get(this.id).then(data => {
        this.loading = false
        this.data.name = data.data.name

        this.data.parentId = data.data.parentId
        if (this.data.parentId) {
          this.setParentDepartmentVal(this.data.parentId)
        }
      })
    },
    cancel() {
      this.showVal = false
    },
    reset() {
      this.$refs.form.resetFields()
    },
    handleOpen() {
      if (this.id) {
        this.init()
      }
    },
    setParentDepartmentVal(val) {
      this.$refs.departmentInputRef.setValue(val)
    },
    closed() {
      this.reset()
      this.setParentDepartmentVal(null)
    }
  }
}
</script>

<style scoped>

</style>
