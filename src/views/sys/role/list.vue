<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="search"
        placeholder="关键字搜索"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="initData"
      >查询
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="add"
      >新增
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="data"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="编号" width="70" prop="id" align="center" />
      <el-table-column label="名称" prop="label" />
      <el-table-column label="编码" prop="name" />
      <el-table-column
        header-align="center"
        align="center"
        width="225"
        class-name="operate-group"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" />
          <el-button
            type="primary"
            icon="el-icon-delete"
            class="del-btn"
            size="mini"
            @click="del(scope.row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="pageNo"
      :limit.sync="pageSize"
      @pagination="initData"
    />
    <Edit
      :id="editId"
      :show.sync="editShow"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script>
import Edit from './dialog/Edit'
import { list, del } from '@/api/modules/sys/role'
import Pagination from '@/components/Pagination'
import waves from '@/directive/waves'

export default {
  name: 'List',
  components: { Edit, Pagination },
  directives: { waves },
  data() {
    return {
      editShow: false,
      editId: null,
      loading: false,
      data: [],
      search: null,
      pageSize: 10,
      pageNo: 1,
      total: 0,
      editPrivilege: {
        id: null,
        show: false
      }
    }
  },
  computed: {
    searchParam() {
      return {
        search: this.search,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.loading = true
      list(this.searchParam).then(data => {
        this.loading = false
        this.data = data.data.data
        this.total = data.data.total
      })
    },
    currentChange() {
      this.initData()
    },
    sizeChange() {
      this.initData()
    },
    handleConfirm() {
      this.initData()
    },
    del(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.loading = true
          del(id).then(() => {
            this.$message({ type: 'success', message: '删除成功' })
            this.initData()
          }).catch(e => {
            console.error(e)
          }).finally(() => {
            this.loading = false
          })
        })
        .catch(() => {
        })
    },
    add() {
      this.editId = null
      this.editShow = true
    },
    edit(id) {
      this.editId = id
      this.editShow = true
    }
  }
}
</script>

<style scoped>
.del-btn {
  margin-right: 10px;
}
</style>
