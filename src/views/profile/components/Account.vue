<template>
  <el-form ref="form" v-loading="loading" :model="form" :rules="rules">
    <el-form-item label="姓名" prop="name">
      <el-input v-model.trim="form.name" />
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model.trim="form.mobile" />
    </el-form-item>
    <el-form-item label="座机号" prop="tel">
      <el-input v-model.trim="form.tel" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model.trim="form.email" />
    </el-form-item>
    <el-form-item label="自我介绍" prop="introduction">
      <el-input v-model.trim="form.introduction" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">
        更新
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { get, updAccount } from '@/api/modules/sys/user'
import { checkMobileExist, checkEmailExist } from '@/utils/validators'

export default {
  name: 'Account',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: null,
        mobile: null,
        tel: null,
        email: null,
        introduction: null
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在2-10个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            checkMobileExist(this.id, rule, value, callback)
          }, trigger: 'blur' }
        ],
        tel: [],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              checkEmailExist(this.id, rule, value, callback)
            }, trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      get(this.user.id).then(data => {
        const user = data.data
        this.loading = false
        this.form.name = user.name
        this.form.mobile = user.mobile
        this.form.tel = user.tel
        this.form.email = user.email
        this.form.introduction = user.introduction
      })
    },
    submit() {
      this.loading = true
      updAccount({ id: this.user.id, data: this.form }).then(data => {
        this.$message.success('更新成功')
        this.init()
      }).catch(e => {
        console.error(e)
        this.$message.error('更新失败')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
