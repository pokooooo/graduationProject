<template>
  <div class="buy">
    <img
      id="icon"
      @click="dialogVisible = true"
      src="../assets/image/_shopping.png"
      alt=""
    />
    <div class="num">{{ getTotal }}</div>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullUpLoad="pullUpLoad"
    >
      <div class="header">
        <img v-if="this.info.avatar" :src="this.info.avatar" alt="" />
        <img v-else src="../assets/image/default.jpg" alt="" />
        <div>花光 {{ this.info.nickname }} 的钱</div>
      </div>
      <div class="money">
        {{ getSurplus }}
      </div>
      <div class="goodsList">
        <div
          v-show="item.status !== 2"
          class="goodsItem"
          v-for="item in goodsList"
          :key="item.id"
        >
          <img class="cover" :src="item.cover" @load="refresh" alt="" />
          <div class="title">{{ item.title }}</div>
          <div class="price">{{ item.price }}</div>
          <div class="count">
            <el-button v-if="item.count !== 0" type="danger" @click="sub(item)"
              >取消</el-button
            >
            <el-button v-else disabled type="info">取消</el-button>
            <el-input
              type="number"
              v-model="item.count"
              @input="(value) => input(value, item)"
            ></el-input>
            <el-button
              v-if="
                item.price <= getSurplus &&
                (item.count < item.limit || item.limit === 0)
              "
              type="success"
              @click="add(item)"
              >添加</el-button
            >
            <el-button v-else disabled type="info">添加</el-button>
          </div>
        </div>
      </div>
    </scroll>
    <el-dialog :visible.sync="dialogVisible" width="400px">
      <div
        style="
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
        "
      >
        您 的 账 单
      </div>
      <div class="checkedList">
        <div
          v-show="item.count !== 0"
          class="checkItem"
          v-for="item in this.goodsList"
          :key="item.id"
        >
          <div style="font-size: 18px; width: 140px">{{ item.title }}</div>
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
            {{ item.price * item.count }}
          </div>
        </div>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 20px 10px 0 10px;
        "
      >
        <div style="font-size: 18px; font-weight: bold">总计</div>
        <div
          style="color: rgb(36, 196, 134); font-weight: bold; font-size: 18px"
        >
          {{ getMoney }}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="buy">下 单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Scroll from "../components/scroll/Scroll.vue";
import { getRich, searchGoods, buyGoods } from "@/network/buy";

@Component({
  components: {
    Scroll,
  },
})
export default class Roles extends Vue {
  private info: any = {};

  private dialogVisible = false;

  goodsList: any[] = [];

  private data: {
    pageIndex: number;
    pageSize: number;
    keyword: string;
  } = {
    pageIndex: 1,
    pageSize: 12,
    keyword: "",
  };

  private total = 0;

  public $refs!: {
    scroll: any;
  };

  public searchGoods(): void {
    searchGoods(this.data).then((res) => {
      //如果在实例创建之后添加新的属性到实例上，它不会触发视图更新！！！
      res.data.data.items.forEach((item: { count: number }) => {
        item.count = 0;
      });
      this.goodsList.push(...res.data.data.items);
      this.total = res.data.data.total;
      this.$refs.scroll.finishPullUp();
    });
  }

  refresh(): void {
    this.debounce(this.$refs.scroll.refresh(), 500);
  }

  debounce(func: any, delay: number) {
    let timer: any = null;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  public created(): void {
    if (this.$route.params.id === undefined) {
      this.$message.error("请先选择您的身份!");
      this.$router.replace("/roles");
      return;
    }
    getRich(this.$route.params.id).then((res) => {
      this.info = res.data.data.info;
    });
    this.searchGoods();
  }

  pullUpLoad(): void {
    if ((this.data.pageIndex + 1) * this.data.pageSize < this.total) {
      this.data.pageIndex++;
      this.searchGoods();
    } else {
      this.$message.warning("没有更多商品了！");
      this.$refs.scroll.finishPullUp();
    }
  }

  sub(item: any): void {
    item.count--;
  }

  add(item: any): void {
    item.count++;
  }

  input(value: any, item: any): void {
    if (value === "") {
      item.count = 0;
      return;
    }
    value = parseInt(value);
    if (value < 0) {
      item.count = 0;
      return;
    }
    if (item.limit !== 0 && value > item.limit) {
      item.count = item.limit;
    }
    if ((value - item.count) * item.price > this.getSurplus) {
      item.count =
        Math.floor((this.getSurplus + item.count * item.price) / item.price) >
          item.limit && item.limit !== 0
          ? item.limit
          : Math.floor(
              (this.getSurplus + item.count * item.price) / item.price
            );
    }
    item.count = parseInt(item.count);
  }

  buy(): void {
    let goodsIds: { id: string; count: number }[] = [];
    this.goodsList.forEach((item) => {
      if (item.count !== 0) {
        goodsIds.push({
          id: item.id,
          count: item.count,
        });
      }
    });

    buyGoods(this.$route.params.id, goodsIds).then((res) => {
      this.dialogVisible = false;
      this.$message.success(
        `下单成功！${this.info.nickname}先生/女士，共消费${this.getMoney}元`
      );
      this.$router.replace("/roles");
    });
  }

  public get getTotal(): number {
    let total = 0;
    this.goodsList.forEach((item) => {
      if (item.count !== 0) total++;
    });
    return total;
  }

  public get getMoney(): number {
    let total = 0;
    this.goodsList.forEach((item) => {
      total += item.price * item.count;
    });
    return total;
  }

  public get getSurplus(): number {
    return this.info.worth - this.getMoney;
  }
}
</script>

<style scoped>
.buy {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

#icon {
  position: fixed;
  right: 100px;
  margin-top: 40px;
  height: 40px;
  z-index: 999;
}

.num {
  position: fixed;
  right: 85px;
  margin-top: 20px;
  z-index: 9999;
  border: 1px solid #000;
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 24px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200px;
  width: 100%;
  padding-top: 20px;
}

.header img {
  height: 120px;
  width: 120px;
  border-radius: 50%;
}

.header div {
  font-size: 32px;
  margin: 20px 0;
  font-weight: bold;
}

.content {
  height: 100vh;
  overflow: hidden;
}

.money {
  color: white;
  background: linear-gradient(rgb(46, 204, 113), rgb(26, 188, 156));
  padding: 20px;
  margin: 10px 0px;
  font-family: Roboto, sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  top: 0px;
  position: sticky;
  z-index: 99;
}

.goodsList {
  display: grid;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  gap: 10px;
}

@media only screen and (min-width: 900px) {
  .goodsItem:hover {
    transform: scale(1.03);
    overflow: hidden;
  }
}

@media only screen and (max-width: 1300px) {
  #icon {
    right: 100px;
    padding: 15px;
    bottom: 40px;
    border-radius: 50%;
    border: 1px solid #000;
  }

  .num {
    right: 95px;
    bottom: 70px;
    border: 0 solid #fff;
  }
}

@media only screen and (max-width: 900px) {
  .goodsList {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
}

@media only screen and (max-width: 600px) {
  .goodsList {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }

  .money {
    font-size: 26px;
  }
}

.goodsItem {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 15px;
  opacity: 0.8;
}

.cover {
  width: 50%;
  margin: 15px 0;
}

.title {
  font-size: 22px;
  font-weight: bold;
}

.price {
  font-size: 20px;
  color: rgb(36, 196, 134);
}

.count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.count .el-input {
  flex: 1;
  padding: 0 10px;
}

.checkItem {
  display: flex;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
}

.checkedList {
  border-bottom: 1px solid #000;
}

/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>
