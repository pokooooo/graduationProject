<template>
  <div>
    <el-card>
      <artifacts-header @refresh="refresh" @select="select"></artifacts-header>
      <artifacts-main @refresh="refresh" :artifactsList="artifactsList"></artifacts-main>
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

import ArtifactsHeader from "@/views/admin/artifacts/ArtifactsHeader";
import ArtifactsMain from "@/views/admin/artifacts/ArtifactsMain";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectArtifact } from "@/network/artifacts";

export default {
  name: 'Artifacts',
  components: {
    ArtifactsHeader,
    ArtifactsMain,
    Pagination,
  },
  data() {
    return {
      artifactsList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0,
    }
  },
  methods: {
    selectArtifact() {
      selectArtifact(this.data).then((res) => {
        this.artifactsList = res.data.data.items;
        this.total = res.data.data.total;
      })
    },
    refresh() {
      this.selectArtifact();
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
    this.selectArtifact();
  }



}
</script>

<style scoped></style>
