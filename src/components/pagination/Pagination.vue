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

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Pagination extends Vue {
  @Prop() private data: any;
  @Prop() private total: any;
  public handleSizeChange(newSize: number): void {
    this.$emit("setNewSize", newSize);
  }
  public handleCurrentChange(newPage: number): void {
    this.$emit("setNewPage", newPage);
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
