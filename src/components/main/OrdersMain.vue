<template>
  <div>
    <el-table :data="orderList" border stripe>
      <el-table-column label="下单人" prop="nickname"></el-table-column>
      <el-table-column label="订单价格" prop="price"></el-table-column>
      <el-table-column label="剩余" prop="worth"></el-table-column>
      <el-table-column label="购买时间" prop="time"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" @click="getDetail(scope.row)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="订单详情" width="560px">
      <div class="main">
        <div class="title">
          <div>下单人 : {{ this.currentOrder.nickname }}</div>
          <div>下单时间 : {{ this.currentOrder.time }}</div>
          <div>总价格 : {{ this.currentOrder.price }}元</div>
          <div>剩余 : {{ this.currentOrder.worth }}元</div>
        </div>
        <div class="checkedList">
          <div
            v-show="item.count !== 0"
            class="checkItem"
            v-for="item in this.detail.goods"
            :key="item.id"
          >
            <div style="font-size: 18px; width: 140px">
              {{ item.item.title }}
            </div>
            <div style="font-size: 18px">x{{ item.count }}</div>
            <div
              style="
                font-weight: bold;
                color: rgb(36, 196, 134);
                font-size: 18px;
                width: 80px;
                text-align: right;
              "
            >
              {{ item.count * item.item.price }}
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { getDetail } from "@/network/orders";


export default {
  name: 'OrdersMain',
  props: {
    orderList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      detail: {},
      currentOrder: {},
      dialogVisible: false
    }
  },
  methods: {
  getDetail(data) {
    this.currentOrder = data;
    getDetail(data.id).then((res) => {
      this.detail = res.data.data.info;
      this.dialogVisible = true;
    });
  },
  }

}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkItem {
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
}

.checkedList {
  margin-top: 20px;
}

.title {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>
