<template>
  <div>
    <el-card>
      <goods-header @refresh="refresh" @select="select"></goods-header>
      <goods-main @refresh="refresh" :goodsList="goodsList"></goods-main>
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

import GoodsHeader from "@/components/header/GoodsHeader.vue";
import GoodsMain from "@/components/main/GoodsMain.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectGoods } from "@/network/goods";

export default {
  name: 'Goods',
  components: {
    GoodsHeader,
    GoodsMain,
    Pagination,
  },
  data() {
    return {
      goodsList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0,
    }
  },
  methods: {
    selectGoods() {
    selectGoods(this.data).then((res) => {
      console.log(res);
      this.goodsList = res.data.data.items;
      this.total = res.data.data.total;
    })
  },
  refresh() {
    this.selectGoods();
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
    this.selectGoods();
  }

 

}
</script>

<style scoped></style>
