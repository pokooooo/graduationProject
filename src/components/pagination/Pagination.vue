<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.pageIndex"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="data.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>



export default {
  name: 'Pagination',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    total: {
      type: Number,
      default() {
        return 0
      }
    },
  },
  methods: {
  handleSizeChange(newSize) {
    this.$emit("setNewSize", newSize);
  },
  handleCurrentChange(newPage) {
    this.$emit("setNewPage", newPage);
  }
  }

}
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
