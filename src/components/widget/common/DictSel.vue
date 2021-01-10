<template>
  <el-select v-model="selectVal">
    <el-option
      v-for="item in list"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { columnList } from '@/api/modules/sys/dict'
export default {
  name: 'DictSel',
  props: {
    table: {
      require: true,
      type: String
    },
    column: {
      require: true,
      type: String
    },
    value: {
      require: true
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    selectVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    searchParam() {
      return { table: this.table, column: this.column }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      columnList(this.searchParam).then(data => {
        this.list = data.data
      })
    }
  }
}
</script>

<style scoped>

</style>
