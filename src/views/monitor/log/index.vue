<template>
  <div class="monitor-log-container app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="关键字搜索" />
      <el-button
        v-waves
        style="margin-left: 10px;"
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="initData"
      >
        查询
      </el-button>
    </div>
    <el-table :data="data">
      <el-table-column
        label="用户名"
        width="140"
        prop="username"
      />
      <el-table-column
        label="描述"
        width="120"
        prop="description"
      />
      <el-table-column
        label="地址"
        width="190"
        prop="address"
      />
      <el-table-column
        label="IP"
        prop="ip"
      />
      <el-table-column
        label="浏览器"
        prop="browser"
      />
      <el-table-column
        label="创建时间"
        width="170"
        prop="createTime"
      />
    </el-table>
    <pagination
      v-show="page.total>0"
      :total="page.total"
      :page.sync="page.no"
      :limit.sync="page.size"
      @pagination="initData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { list } from '@/api/modules/monitor/log'
import waves from '@/directive/waves'

export default {
  name: 'MonitorLog',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      loading: false,
      data: [],
      search: null,
      page: {
        no: 1,
        size: 10,
        total: 0
      }
    }
  },
  computed: {
    searchParam() {
      return {
        search: this.search,
        pageNo: this.page.no,
        pageSize: this.page.size
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.loading = true
      list(this.searchParam).then(data => {
        this.loading = false
        this.data = data.data.data
        this.page.total = data.data.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor-log-container {

}
</style>
