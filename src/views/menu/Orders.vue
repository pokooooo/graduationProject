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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Pagination from "@/components/pagination/Pagination.vue";
import OrdersHeader from "@/components/header/OrdersHeader.vue";
import OrdersMain from "@/components/main/OrdersMain.vue";
import { selectOrders } from "@/network/orders";

@Component({
  components: {
    OrdersHeader,
    OrdersMain,
    Pagination,
  },
})
export default class Orders extends Vue {
  orderList: any[] = [];

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
    this.selectOrders();
  }

  public selectOrders(): void {
    selectOrders(this.data).then((res) => {
      let list: {
        nickname: any;
        price: number;
        worth: any;
        time: string;
        id: string;
      }[] = [];
      res.data.data.items.forEach(
        (item: {
          goods: any[];
          richer: { nickname: any; worth: any };
          ctime: any;
          id: string;
        }) => {
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
  }

  public dataFormat(originVal: any): string {
    const dt = new Date(originVal);
    const y = dt.getFullYear();
    const m = (dt.getMonth() + 1 + "").padStart(2, "0");
    const d = (dt.getDate() + "").padStart(2, "0");
    const hh = (dt.getHours() + "").padStart(2, "0");
    const mm = (dt.getMinutes() + "").padStart(2, "0");
    const ss = (dt.getSeconds() + "").padStart(2, "0");

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }

  refresh(): void {
    this.selectOrders();
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
