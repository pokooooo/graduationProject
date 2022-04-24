<template>
  <div>
    <el-card>
      <domains-header @refresh="refresh" @select="select"></domains-header>
      <domains-main @refresh="refresh" :domainsList="domainsList"></domains-main>
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

import DomainsHeader from "@/views/admin/domains/DomainsHeader";
import DomainsMain from "@/views/admin/domains/DomainsMain";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectDomain } from "@/network/domains";

export default {
  name: 'Domains',
  components: {
    DomainsHeader,
    DomainsMain,
    Pagination,
  },
  data() {
    return {
      domainsList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0,
    }
  },
  methods: {
    selectDomain() {
      selectDomain(this.data).then((res) => {
        this.domainsList = res.data.data.items;
        this.total = res.data.data.total;
      })
    },
    refresh() {
      this.selectDomain();
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
    this.selectDomain();
  }



}
</script>

<style scoped></style>
