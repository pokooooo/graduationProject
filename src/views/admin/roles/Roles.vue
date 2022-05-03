<template>
  <div>
    <el-card>
      <role-header @refresh="refresh" @select="select"></role-header>
      <role-main @refresh="refresh" :rolesList="rolesList"></role-main>
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

import RoleHeader from "./RolesHeader.vue";
import RoleMain from "@/views/admin/roles/RolesMain.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectRole } from "@/network/roles";


export default {
  name: 'Roles',
  components: {
    RoleHeader,
    RoleMain,
    Pagination,
  },
  data() {
    return {
      rolesList: [],
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
    this.selectRole();
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
  selectRole() {
    selectRole(this.data).then((res) => {
      this.rolesList = res.data.data.items;
      this.total = res.data.data.total;
    });
  }
  },
  created() {
    this.selectRole();
  }
}
</script>

<style scoped></style>
