<template>
  <el-dialog
    v-loading="loading"
    title="角色"
    :visible.sync="showVal"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="handleOpen"
    @closed="closed"
  >
    <el-form ref="form" :model="data" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="label">
        <el-input v-model="data.label" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="编码" prop="name">
        <el-input v-model="data.name" placeholder="请输入编码" />
      </el-form-item>
      <el-form-item label="权限">
        <el-row>
          <el-col :span="12">
            <permission-tree ref="privilegeTree" v-model="data.permissions" />
          </el-col>
          <el-col :span="12">
            <el-select v-model="data.dataPermissionType">
              <el-option
                v-for="item in dataPermissionTypes"
                :key="item.name"
                :label="item.label"
                :value="item.name"
              />
              <!--              <el-option value="USER" label="本人权限" />-->
              <!--              <el-option value="DEPARTMENT" label="本部门权限" />-->
              <!--              <el-option value="DEPARTMENTS" label="本部门及以下部门权限" />-->
              <!--              <el-option value="ALL" label="全部权限" />-->
              <!--              <el-option value="SETTING" label="自定义权限" />-->
            </el-select>
            <department-tree
              v-show="data.dataPermissionType==='SETTING'"
              :show-checkbox="true"
              @check="handleCheck"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import editDialog from '@/components/mixins/editDialog'
import { get, save, upd, dataPermissionTypes } from '@/api/modules/sys/role'
import DepartmentTree from '@/components/widget/modules/department/DepartmentTree'

import PermissionTree from '@/components/widget/modules/permission/PermissionTree'

export default {
  name: 'Edit',
  components: { PermissionTree, DepartmentTree },
  mixins: [editDialog],
  props: {},
  data() {
    return {
      loading: false,
      data: {
        name: null,
        contact: null,
        mobile: null,
        permissions: null,
        dataPermissionType: 'USER',
        depDataPermissions: []
      },
      rules: {
        name: [
          { require: true, message: '请输入编号', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在4-20个字符', trigger: 'blur' }
        ],
        label: [
          { require: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在2-20个字符', trigger: 'blur' }
        ]
      },
      dataPermissionTypes: []
    }
  },
  computed: {
    submitData: {
      get() {
        const data = {}
        Object.assign(data, this.data)
        data.permissions = this.data.permissions.join(',')
        if (data.dataPermissionType === 'SETTING') {
          console.log(this.data)
          data.depDataPermissions = this.data.depDataPermissions.join(',')
        }
        return data
      }
    }
  },
  created() {
    this.initDataPermissionTypes()
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (!this.id) {
            save(this.submitData).then(data => {
              this.loading = false
              this.$message('提交成功')
              this.cancel()
              this.confirm()
            })
          } else {
            upd({ id: this.id, data: this.submitData }).then(() => {
              this.loading = false
              this.$message('更新成功')
              this.cancel()
              this.confirm()
            })
          }
        } else {
          return false
        }
      })
    },
    confirm() {
      this.$emit('confirm')
    },
    init() {
      this.loading = true
      get(this.id).then(data => {
        this.loading = false
        this.data = data.data
        this.setPermissions(this.data.permissions)
        console.log(this.data)
      })
    },
    initDataPermissionTypes() {
      dataPermissionTypes().then(data => {
        this.dataPermissionTypes = data.data
      })
    },
    setPermissions(permissions) {
      this.$refs.privilegeTree.setCheckedKeys(permissions)
    },
    cancel() {
      this.showVal = false
    },
    handleOpen() {
      if (this.id) {
        this.init()
      }
    },
    reset() {
      this.$refs.form.resetFields()
    },
    closed() {
      this.reset()
      this.setPermissions([])
    },
    handleCheck(data, { checkedKeys }) {
      this.data.depDataPermissions = checkedKeys
    }
  }
}
</script>

<style scoped>

</style>
