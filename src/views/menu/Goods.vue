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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GoodsHeader from "@/components/header/GoodsHeader.vue";
import GoodsMain from "@/components/main/GoodsMain.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectGoods } from "@/network/goods";

@Component({
  components: {
    GoodsHeader,
    GoodsMain,
    Pagination,
  },
})
export default class Goods extends Vue {
  goodsList = [];

  private data: {
    pageIndex: number;
    pageSize: number;
    keyword: string;
  } = {
    pageIndex: 1,
    pageSize: 5,
    keyword: "",
  };

  private total = 0;

  public created(): void {
    this.selectGoods();
  }

  public selectGoods(): void {
    selectGoods(this.data).then((res) => {
      this.goodsList = res.data.data.items;
      this.total = res.data.data.total;
    });
  }

  refresh(): void {
    this.selectGoods();
  }

  select(text: string): void {
    this.data.keyword = text;
    this.refresh();
  }
  setNewSize(newSize: number): void {
    this.data.pageSize = newSize;
    this.refresh();
  }
  setNewPage(newPage: number): void {
    this.data.pageIndex = newPage;
    this.refresh();
  }
}
</script>

<style scoped></style>
