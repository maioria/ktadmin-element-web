<template>
  <el-dialog
    v-loading="loading"
    title="权限"
    :visible.sync="showVal"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closed"
    @open="handleOpen"
  >
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="label">
        <el-input v-model="data.label" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="标识" prop="name">
        <el-input v-model="data.name" placeholder="请输入标识" />
      </el-form-item>
      <el-form-item label="父权限" prop="parentName">
        <permission-input ref="permissionInput" v-model="data.parentName" />
      </el-form-item>
      <el-form-item label="权限类型" prop="type">
        <el-select v-model="data.type">
          <el-option label="菜单" value="MENU" />
          <el-option label="权限" value="PERMISSION" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { get, save, update } from '@/api/modules/sys/permission'
import editDialog from '@/components/mixins/editDialog'
import PermissionInput from '@/components/widget/modules/permission/PermissionInput'

export default {
  name: 'Edit',
  components: { PermissionInput },
  mixins: [editDialog],
  data() {
    return {
      loading: false,
      data: {
        name: null,
        label: null,
        parentName: null,
        type: null
      },
      rules: {
        label: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入标识', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在2-50个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择权限类型', trigger: 'change' }]
      }
    }
  },
  computed: {
    submitData: {
      get() {
        const data = {}
        Object.assign(data, this.data)
        return data
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.id) {
            update({ id: this.id, data: this.submitData }).then(() => {
              this.loading = false
              this.$message.success('提交成功')
              this.showVal = false
              this.reset()
              this.confirm(this.id)
            })
          } else {
            save({ data: this.submitData }).then(data => {
              this.loading = false
              this.$message.success('提交成功')
              this.showVal = false
              this.reset()
              this.confirm(data.data)
            })
          }
        } else {
          return false
        }
      })
    },
    confirm(data) {
      this.$emit('confirm', data)
    },
    init(id) {
      this.loading = true
      get(id).then(data => {
        this.loading = false
        this.data = data.data
        if (this.data.parentName) {
          this.setParentVal(this.data.parentName)
        }
      })
    },
    setParentVal(val) {
      this.$refs.permissionInput.setValue(val)
    },
    cancel() {
      this.showVal = false
    },
    reset() {
      this.$refs.form.resetFields()
    },
    closed() {
      this.setParentVal(null)
    },
    handleOpen() {
      if (this.id) {
        this.init(this.id)
      }
    }
  }
}
</script>
