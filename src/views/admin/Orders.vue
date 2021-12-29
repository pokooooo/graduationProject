<template>
  <div>
    <el-card>
      <orders-header @refresh="refresh" @select="select"></orders-header>
      <orders-main @refresh="refresh" :orderList="orderList"></orders-main>
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

import Pagination from "@/components/pagination/Pagination.vue";
import OrdersHeader from "@/components/header/OrdersHeader.vue";
import OrdersMain from "@/components/main/OrdersMain.vue";
import { selectOrders } from "@/network/orders";

export default {
  name: 'Orders',
  components: {
    OrdersHeader,
    OrdersMain,
    Pagination,
  },
  data() {
    return {
      orderList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
      },
      total: 0,
  }
  },
  methods: {
    selectOrders() {
    selectOrders(this.data).then((res) => {
      let list = [];
      res.data.data.items.forEach(
        item => {
          let total = 0;
          item.goods.forEach((good) => {
            total += good.count * good.item.price;
          });
          list.push({
            nickname: item.richer.nickname,
            price: total,
            worth: item.richer.worth - total,
            time: this.dataFormat(item.ctime),
            id: item.id,
          });
        }
      );
      this.orderList = list;
      this.total = res.data.data.total;
    });
  },
  dataFormat(originVal) {
    const dt = new Date(originVal);
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + "").padStart(2, "0");
    const d = (dt.getDate() + "").padStart(2, "0");
    const hh = (dt.getHours() + "").padStart(2, "0");
    const mm = (dt.getMinutes() + "").padStart(2, "0");
    const ss = (dt.getSeconds() + "").padStart(2, "0");
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  },
  refresh() {
    this.selectOrders();
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
    this.selectOrders();
  }

}
</script>

<style scoped></style>
