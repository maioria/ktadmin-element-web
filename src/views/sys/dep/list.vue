<template>
  <div class="app-container">
    <div class="table-container">
      <div class="filter-container">
        <el-input v-model="search" placeholder="关键字搜索" style="width: 200px;" class="filter-item" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="initData">
          查询
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">
          新增
        </el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="data"
        border
        fit
        default-expand-all
        row-key="id"
        highlight-current-row
        :tree-props="{children: 'children'}"
        style="width: 100%;"
      >
        <el-table-column
          label="编号"
          width="120"
          prop="id"
        />
        <el-table-column
          label="名称"
          prop="name"
        />
        <el-table-column
          label="上级部门"
          prop="parentName"
        />
        <el-table-column
          label="创建时间"
          prop="createTime"
          width="160"
        />
        <el-table-column
          label="状态"
          width="90"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.status|statusName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          width="125"
          class-name="operate-group"
          label="操作"
        >
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edit(scope.row.id)"
              />
              <el-button
                v-if="scope.row.status==='DISABLED'"
                type="primary"
                icon="el-icon-circle-check"
                size="mini"
                @click="active(scope.row.id)"
              />
              <el-button
                v-if="scope.row.status==='NORMAL'"
                type="primary"
                icon="el-icon-circle-close"
                size="mini"
                @click="disabled(scope.row.id)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Edit :id="editId" :show.sync="editShow" @confirm="handleEditConfirm" />
    </div>
  </div>
</template>

<script>
import Edit from './dialog/Edit'
import { tree, del, disabled, active } from '@/api/modules/sys/department'
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
        search: this.search
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
    del(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(id).then(data => {
          if (data.data) {
            this.$message.success('删除成功')
            this.initData()
          } else {
            console.error(data)
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
      })
    },
    add() {
      this.editId = null
      this.editShow = true
    },
    edit(id) {
      this.editId = id
      this.editShow = true
    },
    handleEditConfirm() {
      this.initData()
    },
    disabled(id) {
      this.$confirm('确定要冻结此部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        disabled(id).then(data => {
          if (data.data) {
            this.$message.success('冻结成功')
            this.initData()
          } else {
            console.error(data)
            this.$message.error('冻结失败')
          }
        })
      }).catch(() => {
      })
    },
    active(id) {
      this.$confirm('确定要激活此部门?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        active(id).then(data => {
          if (data.data) {
            this.$message.success('激活成功')
            this.initData()
          } else {
            console.error(data)
            this.$message.error('激活失败')
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-container {
  display: flex;

  .filter-item {
    &:first-child {
      margin-left: 0;
    }

    margin-left: 8px;
  }
}

.table-search-box {
  display: flex;
  align-items: center;
}

.table-search-box .el-icon-plus {
  margin-left: 5px;
}

.operate-group i:not(:first-child) {
  margin-left: 5px;
}

.app-container {
  display: flex;
}

.table-container {
  flex: 1;
}
</style>
