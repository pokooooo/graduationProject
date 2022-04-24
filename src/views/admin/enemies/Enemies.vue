<template>
  <div>
    <el-card>
      <enemies-header @refresh="refresh" @select="select"></enemies-header>
      <enemies-main @refresh="refresh" :enemiesList="enemiesList"></enemies-main>
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

import EnemiesHeader from "@/views/admin/enemies/EnemiesHeader";
import EnemiesMain from "@/views/admin/enemies/EnemiesMain";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectEnemies } from "@/network/enemies";

export default {
  name: 'Enemies',
  components: {
    EnemiesHeader,
    EnemiesMain,
    Pagination,
  },
  data() {
    return {
      enemiesList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0,
    }
  },
  methods: {
    selectEnemies() {
      selectEnemies(this.data).then((res) => {
        this.enemiesList = res.data.data.items;
        this.total = res.data.data.total;
      })
    },
    refresh() {
      this.selectEnemies();
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
    this.selectEnemies();
  }



}
</script>

<style scoped></style>
