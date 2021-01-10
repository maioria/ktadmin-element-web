<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <account :user="user" />
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from '@/views/profile/components/UserCard'
import Account from '@/views/profile/components/Account'

export default {
  name: 'ProfileIndex',
  components: { UserCard, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'name',
      'avatar',
      'roles',
      'email',
      'mobile',
      'tel',
      'introduction'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        id: this.id,
        name: this.name,
        role: this.roles.join(' | '),
        email: this.email,
        mobile: this.mobile,
        tel: this.tel,
        introduction: this.introduction,
        avatar: this.avatar
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
