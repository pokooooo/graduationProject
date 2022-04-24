<template>
  <div>
    <el-card>
      <weapons-header @refresh="refresh" @select="select"></weapons-header>
      <weapons-main @refresh="refresh" :weaponsList="weaponsList"></weapons-main>
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

import WeaponsHeader from "@/views/admin/weapons/WeaponsHeader.vue";
import WeaponsMain from "@/views/admin/weapons/WeaponsMain.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectWeapon } from "@/network/weapons";

export default {
  name: 'Weapons',
  components: {
    WeaponsHeader,
    WeaponsMain,
    Pagination,
  },
  data() {
    return {
      weaponsList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0,
    }
  },
  methods: {
    selectWeapon() {
    selectWeapon(this.data).then((res) => {
      this.weaponsList = res.data.data.items;
      this.total = res.data.data.total;
    })
  },
  refresh() {
    this.selectWeapon();
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
    this.selectWeapon();
  }

 

}
</script>

<style scoped></style>
