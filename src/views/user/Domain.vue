<template>
<div style="height: 700px;padding-top: 60px;margin: auto;width: 1100px">
  <el-container style="height: 100%;width: 1100px">
    <el-aside style="height: 100%;background-color: #ECE5D8;border-radius: 5px 0 0 5px  " width="260px">
      <div class="type" >
        <img v-if="type === 'mijing'" style="margin-top: 20px;width: 260px" src="../../assets/image/prop/mijing1.png" alt="" @click="type = 'mijing'">
        <img v-else style="margin-top: 20px;width: 260px" src="../../assets/image/prop/mijing.png" alt="" @click="type = 'mijing'">
        <img v-if="type === 'zhengtao'" style="margin-top: 20px;width: 260px" src="../../assets/image/prop/zhengtao1.png" alt="" @click="type = 'zhengtao'">
        <img v-else style="margin-top: 20px;width: 260px" src="../../assets/image/prop/zhengtao.png" alt="" @click="type = 'zhengtao'">
<!--        <img v-if="type === 'luoxuan'" style="margin-top: 20px;width: 260px" src="../../assets/image/prop/luoxuan1.png" alt="" @click="type = 'luoxuan'">-->
<!--        <img v-else style="margin-top: 20px;width: 260px" src="../../assets/image/prop/luoxuan.png" alt="" @click="type = 'luoxuan'">-->
      </div>
    </el-aside>
    <el-main style=";background-color: #ECE5D8;border-radius: 0 5px 5px 0">
      <div style="display: flex;flex-direction: column;height: 80px">
        <div style="display: flex;justify-content: space-between;align-items: center">
          <div style="font-weight: 700;font-size: 20px;margin-left: 20px;color: #d2bba0;">消耗树脂： {{type === 'zhengtao' ? 60 : 20}}</div>
          <div style="display: flex">
<!--            <div style="border-radius: 20px;background-color: #9778BB;border: #fff solid 1px;height: 35px;display: flex;-->
<!--            align-items: center;justify-content: center">-->
<!--              <div style="display: flex;align-items: center">-->
<!--                <img style="margin-left: 10px;width: 25px;border-radius: 50px" :src="$store.getters.getUserData.inventory.materials.filter(item => item.name === '脆弱树脂')[0].cover">-->
<!--                <div style="font-weight: 700;color: #fff;margin-left: 10px;margin-right: 10px">{{$store.getters.getUserData.inventory.materials.filter(item => item.name === '脆弱树脂')[0].num}}</div>-->
<!--              </div>-->
<!--            </div>-->
            <div style="border-radius: 20px;background-color: #D1C3B5;height: 35px;display: flex;align-items: center;justify-content: center;margin-right: 55px">
              <div style="display: flex;align-items: center">
                <img style="margin-left: 10px;width: 40px;border-radius: 50px" src="../../assets/image/prop/shuzhi1.png">
                <div style="font-weight: 700;color: #fff;font-size: 20px;margin-left: 3px;margin-right: 10px">{{$store.getters.getUserData.resin}}</div>
                <i @click="resin" v-if="$store.getters.getUserData.inventory.materials.filter(item => item.name === '脆弱树脂')[0].num > 0" style="font-weight: 700;
                font-size: 28px;margin-right: 3px;color: #e8d9ca" class="el-icon-circle-plus-outline hover"></i>
                <i v-else style="font-weight: 700;
                font-size: 28px;margin-right: 3px;color: #e8d9ca" class="el-icon-circle-close"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="display: flex;flex-direction: column;height: 520px;overflow-y:auto">
        <div class="item" style="width: 94%;display: flex;height: 120px;;color: #d2bba0;font-size: 16px;font-weight: 600;border: #d2bba0 solid 2px;
        border-radius: 3px;margin: 5px 0 5px 10px" v-for="item in type === 'zhengtao' ? domainList.filter(i => i.type === 'role') : domainList.filter(i => i.type !== 'role')" :key="item.id">
          <div style="width: 330px;padding-left: 15px">
            <div style="font-size: 22px;color: #000;margin-top: 15px">{{item.name}}</div>
            <div style="margin-top: 8px">{{item.type | domainsType}}</div>
          </div>
          <div style="flex: 1">
            <div style="margin: 10px 0">掉落奖励</div>
            <img style="width: 55px;height: 55px;border-radius: 10px;margin-right: 8px" src="../../assets/image/prop/mola.png" >
            <img style="width: 55px;height: 55px;border-radius: 10px;margin-right: 8px" src="../../assets/image/prop/jingyan.png" >
            <img  style="width: 55px;height: 55px;border-radius: 10px;margin-right: 8px" v-for="item1 in item.list" :key="item1.id" :src="item.type === 'artifact' ? item1.parts[0].cover : item1.cover" alt="">
          </div>
          <div v-if="$store.getters.getUserData.resin >= item.cost" class="hover" style="width: 80px;display: flex;justify-content: center;align-items: center;background-color: #e8d9ca" @click="getRewards(item)">
            <i style="font-size: 30px" class="el-icon-aim"></i>
          </div>
          <div v-else style="width: 80px;display: flex;justify-content: center;align-items: center;background-color: #e8d9ca">
            <i style="font-size: 30px" class="el-icon-circle-close"></i>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
  <el-dialog
      title="挑战奖励"
      :visible.sync="dialogVisible"
      width="26%"
  >
    <div style="">
      <div style=";color: #d2bba0;font-size: 16px;font-weight: 600;">
        获得{{EXP}}经验值 <span v-if="level !== 0">等级提升至{{level}}</span> 获得掉落：
      </div>
      <div style="display: flex;height: 60px;margin-top: 20px">
        <div style="position: relative">
          <img  class="prop" src="../../assets/image/prop/mola.png" alt="">
          <div style="font-size: 14px;position: absolute;left: 0;bottom: 0;color: #fff;background: #544f4f;width: 60px;text-align: center;
          border-radius: 0 0 2px 2px">
            {{gold}}</div>
        </div>
        <div v-for="item in rewards" :key="item.cover" style="margin-left: 10px;position: relative">
          <img class="prop" :src="item.cover" alt="">
          <div style="font-size: 14px;position: absolute;left: 0;bottom: 0;color: #fff;background: #544f4f;width: 60px;text-align: center;
          border-radius: 0 0 2px 2px">{{item.num}}</div>
        </div>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button  @click="dialogVisible = false">关 闭</el-button>
      <el-button v-if="$store.getters.getUserData.resin >= domain.cost" type="primary"  @click="getRewards(domain)">再次挑战</el-button>
    </span>
  </el-dialog>


</div>
</template>

<script>
import {getRewards, resin, selectDomain} from "@/network/domains";
import {getUser} from "@/network/user";

export default {
  name: "Domain",
  data() {
    return {
      type: 'mijing',
      domainList: [],
      domain: {} ,
      dialogVisible: false,
      options:[],
      value: '',
      rewards: [],
      gold: 0,
      EXP: 0,
      level: 0
    }
  },
  methods: {
    getRewards(item) {
      this.domain = item
      getRewards({
        account: this.$store.getters.getUserData.account,
        id: item.id,
      }).then(res => {
        this.dialogVisible = true
        this.gold = res.data.data.gold
        this.EXP = res.data.data.EXP
        this.rewards = res.data.data.data
        this.level = res.data.data.level
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.$store.commit('updata',res.data.data.data)
        })
      })
    },
    resin() {
      resin({
        account: this.$store.getters.getUserData.account,
        num: -1
      }).then(() => {
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.$store.commit('updata',res.data.data.data)
        })
      })
    }
  },
  created() {
    selectDomain({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      console.log(res)
      this.domainList = res.data.data.items
    })
  }
}
</script>

<style scoped>
.prop {
  vertical-align: middle;
  width: 60px;
  height: 60px;
}



.item:hover {
  transform: scale(1.02);
  background-color: rgba(255,255,255,0.2);
}
</style>