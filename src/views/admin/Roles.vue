<template>
  <div>
    <el-card>
      <rich-header @refresh="refresh" @select="select"></rich-header>
      <rich-main @refresh="refresh" :richList="richList"></rich-main>
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

import RichHeader from "../../components/header/RichHeader.vue";
import RichMain from "@/components/main/RichMain.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectRich } from "@/network/rich";


export default {
  name: 'Roles',
  components: {
    RichHeader,
    RichMain,
    Pagination,
  },
  data() {
    return {
      richList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0
      }
  },

  methods: {
  refresh() {
    this.selectRich();
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
  },
  selectRich() {
    selectRich(this.data).then((res) => {
      this.richList = res.data.data.items;
      this.total = res.data.data.total;
    });
  }
  },
  created() {
    this.selectRich();
  }
}
</script>

<style scoped></style>
