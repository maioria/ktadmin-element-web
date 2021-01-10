<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="search" placeholder="关键字搜索" style="width: 200px;" class="filter-item" />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="initData"
      >查询</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="add"
      >新增</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="data"
      border
      fit
      row-key="id"
      default-expand-all
      highlight-current-row
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%;"
    >
      <el-table-column label="编号" align="center" width="130" prop="id" />
      <el-table-column label="名称" prop="label" />
      <el-table-column label="标识" prop="name" />
      <el-table-column label="类型" prop="typeName" />
      <el-table-column
        header-align="center"
        align="center"
        width="185"
        class-name="operate-group"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)" />
          <el-button type="primary" icon="el-icon-delete" size="mini" @click="del(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <Edit :id="editId" :show.sync="editShow" @confirm="handleConfirm" />
  </div>
</template>

<script>
import Edit from './dialog/Edit'
import { tree, del } from '@/api/modules/sys/permission'
import waves from '@/directive/waves'

export default {
  name: 'List',
  components: { Edit },
  directives: { waves },
  data() {
    return {
      editShow: false,
      editId: null,
      loading: false,
      data: [],
      search: null
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
      tree(this.searchParam).then(data => {
        this.loading = false
        this.data = data.data
      })
    },
    currentChange() {
      this.initData()
    },
    sizeChange() {
      this.initData()
    },
    del(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          del(id).then(data => {
            this.$message({ type: 'success', message: '删除成功' })
            this.initData()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleConfirm() {
      this.initData()
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
</style>
