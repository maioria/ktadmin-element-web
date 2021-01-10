<template>
  <el-dialog
          title="修改密码"
          :visible.sync="visibleVal"
          :append-to-body="true"
          width="40%">
    <el-form :model="data"
             ref="form"
             status-icon
             :rules="rules"
             label-width="80px">
      <el-form-item label="旧密码"
                    prop="oldPassword">
        <el-input type="password" v-model="data.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="data.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="data.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "ResetPwd",
    props: {
      userId: {require: true, type: Number},
      visible: {require: true, type: Boolean}
    },
    data() {
      let validateOldPass = (rule, value, callback) => {
        let param = {userId: this.userId, password: value}
        this.$api.main.validPassword(param).then(response => {
          let flag = response.data
          if (flag && flag === true) {
            callback();
          } else {
            callback(new Error('旧密码不正确'))
          }
        }, error => {
          console.error(error)
          callback(new Error('验证出现问题'))
        })
      };
      let validatePass = (rule, value, callback) => {
        if (this.data.oldPassword !== '') {
          if (value === this.data.oldPassword) {
            callback(new Error('新密码与旧密码相同'))
            return
          } else {
            this.$refs.form.validateField('confirmPassword');
          }
        }
        callback();
      };
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.data.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        data: {
          oldPassword: null,
          password: null,
          confirmPassword: null
        },
        rules: {
          oldPassword: [
            {required: true, message: '请输入旧密码', trigger: 'blur'},
            {validator: validateOldPass, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      visibleVal: {
        get() {
          return this.visible
        },
        set(val) {
          this.$emit('update:visible', val)
        }
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let param = {
              userId: this.userId,
              password: this.data.password,
              oldPassword: this.data.oldPassword
            }
            this.$api.main.updPassword(param).then(response => {
              let flag = response.data
              if (flag && flag === true) {
                this.$message('修改密码成功');
                this.hideShowUpdPwd()
              } else {
                this.$message(flag);
              }
            }, error => {
              console.error(error)
              this.$message('修改密码出现问题')
            })
          } else {
            return false;
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