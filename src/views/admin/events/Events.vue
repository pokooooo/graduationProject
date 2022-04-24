<template>
  <div>
    <el-card>
      <events-header @refresh="refresh" @select="select"></events-header>
      <events-main @refresh="refresh" :eventsList="eventsList"></events-main>
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

import EventsHeader from "@/views/admin/events/EventsHeader";
import EventsMain from "@/views/admin/events/EventsMain";
import Pagination from "@/components/pagination/Pagination.vue";
import { selectEvent } from "@/network/events";

export default {
  name: 'Events',
  components: {
    EventsHeader,
    EventsMain,
    Pagination,
  },
  data() {
    return {
      eventsList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0,
    }
  },
  methods: {
    selectEvent() {
      selectEvent(this.data).then((res) => {
        this.eventsList = res.data.data.items;
        this.total = res.data.data.total;
      })
    },
    refresh() {
      this.selectEvent();
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
    this.selectEvent();
  }



}
</script>

<style scoped></style>
