<template>
  <div class="app-container">
    <div>
      <el-button @click="handleKickAll()">
        强退
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="data"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="用户名"
        width="120"
        prop="username"
        align="center"
      />
      <el-table-column
        label="昵称"
        prop="nickname"
        align="center"
      />
      <el-table-column
        label="IP"
        prop="ip"
        align="center"
      />
      <el-table-column
        label="浏览器"
        prop="browser"
        align="center"
      />
      <el-table-column
        label="地址"
        prop="address"
      />
      <el-table-column
        label="登录时间"
        prop="loginTime"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="{row}">
          <div>
            <el-button
              type="primary"
              size="mini"
              @click="handleKick(row.token)"
            >
              强退
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="page.total>0"
      :total="page.total"
      :page.sync="page.pageNo"
      :limit.sync="page.pageSize"
      @pagination="initData"
    />
  </div>
</template>

<script>
import { kick, list } from '@/api/modules/monitor/online'
import Pagination from '@/components/Pagination'

export default {
  name: 'MonitorOnline',
  components: { Pagination },
  data() {
    return {
      loading: false,
      keyword: null,
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      },
      multipleSelection: [],
      data: []
    }
  },
  computed: {
    param() {
      return { pageNo: this.page.pageNo, pageSize: this.page.pageSize, keyword: this.keyword }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    handleKickAll() {
      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择用户')
        return
      }
      kick(this.multipleSelection.map(item => item.token).join(',')).then(data => {
        this.$message.success('操作成功')
      })
    },
    handleKick(token) {
      kick(token).then(data => {
        this.$message.success('操作成功')
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    initData() {
      this.loading = true
      list(this.param).then(data => {
        this.loading = false
        this.page.total = data.data.total
        this.data = data.data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
