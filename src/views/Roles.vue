<template>
  <div>
    <div class="main">
      <div class="item" v-for="item in richList" :key="item.id">
        <img
                @click="login(item.id)"
                v-if="item.avatar"
                :src="item.avatar"
                alt=""
        />
        <img
                @click="login(item.id)"
                v-else
                src="../assets/image/default.jpg"
                alt=""
        />
        <div>{{ item.nickname }}</div>
      </div>
      <i
        class="el-icon-arrow-right"
        style="
          font-size: 50px;
          position: absolute;
          right: 15px;
          color: #1b87ed;
          top: 160px;
        "
        @click="next"
      ></i>
      <i
        class="el-icon-arrow-left"
        style="
          font-size: 50px;
          position: absolute;
          left: 15px;
          color: #1b87ed;
          top: 160px;
        "
        @click="pre"
      ></i>
    </div>
    <div class="tip" v-if="richList.length === 0">富豪正在创建中</div>
    <div class="tip" v-else>请选择你的身份</div>
  </div>
</template>

<script>
import { selectRich } from "@/network/roles";



export default {
  name: "Roles",
  data() {
    return {
      richList: [],
      data: {
        pageIndex: 1,
        pageSize: 3,
        keyword: "",
        },
      total: 0
    }
  },
  methods: {
  selectRich() {
    selectRich(this.data).then((res) => {
      if (res.data.data.total === 1) {
        this.$router.push({
          name: "buy",
          params: {
            id: res.data.data.items[0].id,
          },
        });
        return;
      }
      this.richList = res.data.data.items;
      this.total = res.data.data.total;
    });
  },
  login(id) {
    this.$router.push({
      name: "buy",
      params: {
        id: id,
      },
    });
  },
  pre() {
    if (this.data.pageIndex !== 1) {
      this.data.pageIndex--;
      this.selectRich();
    }
  },
  next() {
    if (this.data.pageIndex !== Math.ceil(this.total / 3)) {
      this.data.pageIndex++;
      this.selectRich();
    }
  }
  },
  created() {
    this.selectRich();
  },
}
</script>

<style scoped>
.main {
  padding-top: 100px;
  width: 100%;
  display: flex;
}

.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
}

.item img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.tip {
  margin-top: 140px;
  font-size: 30px;
  text-align: center;
}

@media only screen and (max-width: 700px) {
  .main {
    display: grid;
    grid-template-columns: repeat(1,1fr);
    padding-top: 20px;
  }

  .tip {
    margin-top: 20px;
  }
}
</style>
