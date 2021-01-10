<template>
  <el-dialog
    title="重置密码"
    :visible.sync="visibleVal"
    :append-to-body="true"
    width="40%"
  >
    <el-form
      ref="form"
      :model="data"
      status-icon
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        label="新密码"
        prop="password"
      >
        <el-input v-model="data.password" type="password" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { resetPassword } from '@/api/modules/sys/user'
export default {
  name: 'ResetPassword',
  props: {
    userId: { require: true, type: Number },
    show: { require: true, type: Boolean }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      callback()
    }
    return {
      data: {
        password: null
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    visibleVal: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const param = {
            userId: this.userId,
            password: this.data.password
          }
          resetPassword(param).then(response => {
            const flag = response.data
            if (flag && flag === true) {
              this.$message('重置密码成功')
              this.hideShowUpdPwd()
            } else {
              this.$message(flag)
            }
          }, error => {
            console.error(error)
            this.$message('重置密码出现问题')
          })
        } else {
          return false
        }
      })
    },
    close() {
      this.$refs['form'].resetFields()
      this.hideShowUpdPwd()
    },
    hideShowUpdPwd() {
      this.visibleVal = false
    }
  }
}
</script>

<style scoped>

</style>
