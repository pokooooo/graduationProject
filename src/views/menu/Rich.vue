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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RichHeader from "../../components/header/RichHeader.vue";
import RichMain from "@/components/main/RichMain.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectRich } from "@/network/rich";

@Component({
  components: {
    RichHeader,
    RichMain,
    Pagination,
  },
})
export default class Rich extends Vue {
  richList: any[] = [];

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
    this.selectRich();
  }

  public selectRich(): void {
    selectRich(this.data).then((res) => {
      this.richList = res.data.data.items;
      this.total = res.data.data.total;
    });
  }

  refresh(): void {
    this.selectRich();
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
