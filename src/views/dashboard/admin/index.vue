<template>
  <div class="admin-container">
    <el-row class="intro">
      <el-col :span="12">
        使用springboot vue-element-admin为基础的权限管理系统

        前端采用Vue、Element UI。
        后端使用kotlin语言开发，主要框架是Spring Boot
        数据访问使用jpa，代码中主要使用jpa的扩展接口与hql，所以可通过配置切换数据库，现在系统中默认使用mysql
        认证使用Spring Security、Jwt。
      </el-col>
      <el-col :span="12">
        ~~~
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DashboardAdmin'
}
</script>

<style lang="scss" scoped>
.admin-container {
  padding: 20px;
  .intro {
    font-size: 15px;
    color: #333;
  }
}
</style>
