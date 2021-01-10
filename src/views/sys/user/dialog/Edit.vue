<template>
  <el-dialog
    v-loading="loading"
    title="用户"
    :visible.sync="showVal"
    :append-to-body="true"
    width="40%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="closed"
    @open="handleOpen"
  >
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="data.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="部门" prop="depId">
        <department-input
          ref="departmentInput"
          v-model="data.depId"
        />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.username" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="data.mobile" />
      </el-form-item>
      <el-form-item label="座机" prop="tel">
        <el-input v-model="data.tel" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="data.email" />
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-checkbox-group v-model="data.roles" v-loading="roleLoading">
          <el-checkbox v-for="item in roleList" :key="item.name" :label="item.name" name="type">
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import DepartmentInput from '@/components/widget/modules/department/DepartmentInput'
import { get, save, upd } from '@/api/modules/sys/user'
import { all } from '@/api/modules/sys/role'
import { checkMobileExist, checkEmailExist } from '@/utils/validators'

export default {
  name: 'Edit',
  components: { DepartmentInput },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      roleLoading: false,
      roleList: [],
      data: {
        username: '',
        name: '',
        mobile: '',
        tel: '',
        email: '',
        rank: '',
        roles: [],
        depId: null
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在2-10个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        rank: [
          { type: 'number', required: true, message: '请选择岗位', trigger: 'change' }
        ],
        depId: [
          { type: 'number', required: true, message: '请选择部门', trigger: 'change' }
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
  computed: {
    showVal: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    },
    submitData: {
      get() {
        const data = this.data
        data.id = this.id
        data.roles = this.data.roles.join(',')
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
            upd({ id: this.id, data: this.submitData }).then((data) => {
              this.loading = false
              this.$message('更新成功')
              this.showVal = false
              this.reset()
              this.confirm(data.data)
            })
          } else {
            save(this.submitData).then((data) => {
              this.loading = false
              this.$message('提交成功')
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
    confirm(id) {
      this.$emit('confirm', id)
    },
    init() {
      this.loading = true
      get(this.id).then(data => {
        this.loading = false
        this.data = data.data
        this.$refs.departmentInput.setValue(this.data.depId)
      })
    },
    initRoles() {
      this.roleLoading = true
      all().then(data => {
        this.roleList = data.data
        this.roleLoading = false
      })
    },
    cancel() {
      this.showVal = false
    },
    reset() {
      this.$refs.form.resetFields()
    },
    closed() {
      this.reset()
    },
    handleOpen() {
      if (this.id) {
        this.init(this.id)
      }
      this.initRoles()
    }
  }
}
</script>

<style scoped>

</style>
