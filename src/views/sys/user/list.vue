<template>
  <div class="app-container">
    <div class="tree-container">
      <department-tree @node-click="nodeClick" />
    </div>
    <div class="table-container">
      <div class="filter-container">
        <el-input v-model="search" placeholder="关键字搜索" style="width: 200px;" class="filter-item" />
        <el-button
          v-waves
          style="margin-left: 10px;"
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
        <el-table-column
          label="编号"
          width="70"
          prop="id"
          align="center"
        />
        <el-table-column
          label="姓名"
          width="100"
          prop="name"
          show-tooltip-when-overflow
        />
        <el-table-column
          label="用户名"
          show-tooltip-when-overflow
          prop="username"
        />
        <el-table-column
          width="140"
          show-tooltip-when-overflow
          label="手机号"
          prop="mobile"
        />
        <el-table-column
          label="角色"
          show-overflow-tooltip
          width="140"
          prop="roleNames"
          show-tooltip-when-overflow
        >
          <template slot-scope="scope">
            <span>{{ scope.row.roleLabels.join(',') }}</span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="部门" prop="depName" />
        <el-table-column
          label="状态"
          header-align="center"
          align="center"
          width="75"
          prop="statusName"
        />
        <el-table-column
          header-align="center"
          align="center"
          width="225"
          class-name="operate-group"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(scope.row.id)"
            />
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="delUser(scope.row.id)"
            />
            <el-button
              type="primary"
              size="mini"
              @click="resetPasswordMethod(scope.row.id)"
            >重置密码
            </el-button>
            <!--            <el-popover placement="right" trigger="hover">-->
            <!--              <div class="user-operation-group">-->
            <!--                <el-button-->
            <!--                  type="primary"-->
            <!--                  icon="el-icon-edit"-->
            <!--                  size="mini"-->
            <!--                  @click="edit(scope.row.id)"-->
            <!--                />-->
            <!--                <el-button-->
            <!--                  type="primary"-->
            <!--                  icon="el-icon-delete"-->
            <!--                  size="mini"-->
            <!--                  @click="delUser(scope.row.id)"-->
            <!--                />-->
            <!--                <el-button-->
            <!--                  type="primary"-->
            <!--                  size="mini"-->
            <!--                  @click="resetPasswordMethod(scope.row.id)"-->
            <!--                >重置密码-->
            <!--                </el-button>-->
            <!--              </div>-->
            <!--              <el-button slot="reference" type="primary" icon="el-icon-arrow-right" size="mini" />-->
            <!--            </el-popover>-->
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
      <Edit :id="editId" :show.sync="editShow" @confirm="handleConfirm" />
      <reset-password :show.sync="resetPassword.show" :user-id="resetPassword.userId" />
    </div>
  </div>
</template>

<script>
import Edit from './dialog/Edit'
import DepartmentTree from '@/components/widget/modules/department/DepartmentTree'
import ResetPassword from '@/components/widget/modules/user/ResetPassword'
import waves from '@/directive/waves'
import Pagination from '@/components/Pagination'
import { list, del } from '@/api/modules/sys/user'

export default {
  name: 'List',
  components: { Edit, DepartmentTree, ResetPassword, Pagination },
  directives: { waves },
  data() {
    return {
      editShow: false,
      editId: null,
      resetPassword: {
        userId: null,
        show: false
      },
      loading: false,
      data: [],
      search: null,
      pageSize: 10,
      departmentId: null,
      pageNo: 1,
      total: 0
    }
  },
  computed: {
    searchParam() {
      return {
        search: this.search,
        depId: this.departmentId,
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
    delUser(id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          del(id).then(data => {
            if (data.data) {
              this.$message.success('删除成功')
              this.initData()
            } else {
              this.$message.error('删除失败，请联系管理员')
            }
          }).catch(e => {
            console.error(e)
            this.$message.error('删除失败，请联系管理员')
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
    },
    nodeClick(data) {
      this.departmentId = data.id
      this.initData()
    },
    editRole(id) {
    },
    editDataPrivilege(id) {
    },
    resetPasswordMethod(id) {
      this.resetPassword.userId = id
      this.resetPassword.show = true
    }
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
}

.tree-container {
  width: 180px;
  margin-right: 20px;
}

.table-container {
  flex: 1;
}

.user-operation-group {
  display: flex;
}
</style>
