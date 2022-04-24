<template>
  <div>
    <el-card>
      <materials-header @refresh="refresh" @select="select"></materials-header>
      <materials-main @refresh="refresh" :materialsList="materialsList"></materials-main>
    </el-card>
    <pagination
        :data="data"
        :total="total"
        @setNewSize="setNewSize"
        @setNewPage="setNewPage"
    ></pagination>
  </div>
</template>

<script>

import MaterialsHeader from "@/views/admin/Materials/MaterialsHeader.vue";
import MaterialsMain from "@/views/admin/Materials/MaterialsMain.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectMaterial } from "@/network/materials";

export default {
  name: 'Materials',
  components: {
    MaterialsHeader,
    MaterialsMain,
    Pagination,
  },
  data() {
    return {
      materialsList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0,
    }
  },
  methods: {
    selectMaterial() {
      selectMaterial(this.data).then((res) => {
        console.log(res)
        this.materialsList = res.data.data.items;
        this.total = res.data.data.total;
      })
    },
    refresh() {
      this.selectMaterial();
    },
    select(text) {
      this.data.keyword = text;
      this.refresh();
    },
    setNewSize(newSize) {
      this.data.pageSize = newSize;
      this.refresh();
    },
    setNewPage(newPage) {
      this.data.pageIndex = newPage;
      this.refresh();
    }
  },
  created() {
    this.selectMaterial();
  }



}
</script>

<style scoped></style>
