<template>
<div class="event">
  <div style="height: 100px;display: flex;justify-content: space-between;align-items: center">
    <div>
<!--      {{eventsList[index].type === 'weapon' ? '武器活动祈愿' : '角色活动祈愿'}}-->
    </div>
    <div style="display: flex;">
      <div style="border-radius: 20px;background-color: #292D3C;height: 35px;display: flex;align-items: center;justify-content: center">
        <div style="display: flex;align-items: center">
          <img style="margin-left: 10px;width: 25px" src="../../assets/image/prop/yuanshi.png">
          <div style="margin-left: 10px;font-weight: 700;color: #fff;margin-right: 10px">{{$store.getters.getUserData.diamond}}</div>
        </div>
      </div>
      <div style="border-radius: 20px;background-color: #5A6E7C;height: 35px;display: flex;align-items: center;justify-content: center;margin-left: 20px">
        <div style="display: flex;align-items: center">
          <img style="margin-left: 10px;width: 25px;border-radius: 50px" src="../../assets/image/prop/jiuchan.png">
          <div style="font-weight: 700;color: #fff;margin-left: 10px;margin-right: 10px">{{$store.getters.getUserData.inventory.materials.filter(item => item.name === '纠缠之缘')[0].num}}</div>
          <i @click="dialogVisible2 = true" style="font-weight: 700;color: #fff;font-size: 28px;margin-right: 3px" class="el-icon-circle-plus-outline hover"></i>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 1300px;margin-top: 50px">
      <el-carousel :initial-index="index" trigger="click" @change="change" :autoplay="false" type="card" height="320px"  >
        <el-carousel-item   v-for="item in eventsList" :key="item.id">
          <img  :src="item.cover" alt="">
        </el-carousel-item>
      </el-carousel>
  </div>
  <div v-if="eventsList[index].type === 'weapon'" style="margin-top: 30px">
    <div style="font-weight: 700;">下次必得五星还需祈愿:{{50 - $store.getters.getUserData.weaponEvent.big}}次</div>
    <div style="font-weight: 700;margin-top: 10px">下次必得四星还需祈愿:{{10 - $store.getters.getUserData.weaponEvent.small}}次</div>
  </div>
  <div v-else style="margin-top: 30px">
    <div style="font-weight: 700;">下次必得五星还需祈愿:{{50 - $store.getters.getUserData.roleEvent.big}}次</div>
    <div style="font-weight: 700;margin-top: 10px">下次必得四星还需祈愿:{{10 - $store.getters.getUserData.roleEvent.small}}次</div>
  </div>
  <div style="display: flex;align-items: center;justify-content: space-between;margin-top: 30px">
    <div style="display: flex;flex-direction: column">
      <div style="display: flex;align-items: center">
        <div style="display: flex;align-items: center">
          <img style="width: 25px;border-radius: 50px" src="../../assets/image/prop/xinghui.png">
          <div style="margin-left: 5px;font-size: 18px;font-weight: 900;color: #B4A08C">{{$store.getters.getUserData.inventory.materials.filter(item => item.name === '无主的星辉')[0].num}}</div>
        </div>
        <div style="display: flex;align-items: center;margin-left: 20px">
          <img style="width: 25px;border-radius: 50px" src="../../assets/image/prop/xingchen.png">
          <div style="margin-left: 5px;font-size: 18px;font-weight: 900;color: #B4A08C">{{$store.getters.getUserData.inventory.materials.filter(item => item.name === '无主的星尘')[0].num}}</div>
        </div>
      </div>

        <div style="display: flex;margin-top: 30px">
          <div class="hover" @click="$router.push('/user/store')" style="font-weight: 700;display: flex;justify-content: center;align-items: center;width: 140px;height: 40px;border-radius: 20px;background-color: #efeeeb">尘辉兑换</div>
          <div class="hover" style="margin-left: 20px;font-weight: 700;display: flex;justify-content: center;align-items: center;width: 140px;height: 40px;border-radius: 20px;background-color: #efeeeb">详情</div>
          <div class="hover"  style="margin-left: 20px;font-weight: 700;display: flex;justify-content: center;align-items: center;width: 140px;height: 40px;border-radius: 20px;background-color: #efeeeb" @click="dialogVisible1 = true">历史记录</div>

      </div>
    </div>
    <div class="hover" style="display: flex;margin-top: 80px">
      <div @click="$store.getters.getUserData.inventory.materials.filter(item => item.name === '纠缠之缘')[0].num < 1 ? warn() : draw(1)" style="background-color: #efeeeb;display: flex;flex-direction: column;justify-content: center;
      align-items: center;width: 200px;height: 60px;color: #B4A08C;border-radius: 20px;border: #B4A08C solid 1px">
        <div style="font-weight: 700;">祈愿1次</div>
        <div style="font-weight: 700;margin-top: 5px;display: flex;justify-content: center;"><img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/jiuchan.png"> X 1</div>
      </div>
      <div class="hover" @click="$store.getters.getUserData.inventory.materials.filter(item => item.name === '纠缠之缘')[0].num < 10 ? warn() : draw(10)" style="background-color: #efeeeb;margin-left: 30px;display: flex;flex-direction: column;justify-content: center;
      align-items: center;width: 200px;height: 60px;color: #B4A08C;border-radius: 20px;border: #B4A08C solid 1px">
        <div style="font-weight: 700;">祈愿10次</div>
        <div style="font-weight: 700;display: flex;justify-content: center;margin-top: 5px;"><img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/jiuchan.png"> X 10</div>
      </div>
    </div>
  </div>
  <div>
  </div>
  <el-dialog
      title="抽卡结果"
      :visible.sync="dialogVisible"
      width="26%"
  >
    <img  style="width: 80px;height: 80px;border-radius: 10px;padding: 5px" v-for="(item,index) in imgList" :key="index" :src="item.cover" alt="">
    <span slot="footer" class="dialog-footer">
    <el-button  @click="dialogVisible = false">关 闭</el-button>
      <el-button v-if="$store.getters.getUserData.inventory.materials.filter(item => item.name === '纠缠之缘')[0].num >= drawList.length"
                 type="primary"  @click="draw(drawList.length)">继续抽取</el-button>
  </span>
  </el-dialog>
  <el-dialog
      title="历史记录(仅保存最近十条出货记录)"
      :visible.sync="dialogVisible1"
      width="34%"
  >
    <div>
      <el-table :data="eventsList[index].type === 'weapon' ? $store.getters.getUserData.weaponEvent.history : $store.getters.getUserData.roleEvent.history" border stripe>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <div v-if="scope.row.star === 5" style="color: #BC6932">{{scope.row.name}}(五星)</div>
            <div v-else style="color: #A256E0">{{scope.row.name}}(四星)</div>
          </template>
        </el-table-column>
        <el-table-column label="距离上次保底抽数"  prop="num" width="160">

        </el-table-column>
        <el-table-column label="祈愿时间" width="200">
          <template slot-scope="scope">
            <div>{{scope.row.time | dataFormat}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="dialogVisible1 = false">关 闭</el-button>
    </span>
  </el-dialog>
  <el-dialog
      title="兑换纠缠之缘"
      :visible.sync="dialogVisible2"
      width="40%"
  >
    <div class="star5" style="display: flex;margin: 0 20px;border-radius: 5px">
      <div style="display: flex;width: 100%;margin-bottom: 10px;">
        <img style="width: 125px;height: 130px;margin: 10px 0 0 10px" :src="$store.getters.getUserData.inventory.materials.filter(item => item.name === '纠缠之缘')[0].cover" alt="">
        <div style="display: flex;flex-direction: column;margin-left: 20px;width: 100%;">
          <div style="display: flex;justify-content: space-between;width: 100%;align-items: center;height: 50px">
            <div style="font-size: 16px;font-weight: 600;color: #B4A08C">
              {{$store.getters.getUserData.inventory.materials.filter(item => item.name === '纠缠之缘')[0].name}}
            </div>
            <div>
              <div style="border-radius: 20px;background-color: #343B51;border: #fff solid 1px;height: 35px;display: flex;
            align-items: center;justify-content: center;margin-right: 20px">
                <div style="display: flex;align-items: center">
                  <img style="margin-left: 10px;width: 25px;border-radius: 50px" src="../../assets/image/prop/yuanshi.png">
                  <div style="font-weight: 700;color: #fff;margin-left: 10px;margin-right: 10px">{{160 * num}}</div>
                </div>
              </div>
            </div>
          </div>
          <div  style="font-size: 16px;font-weight: 500;color: #B4A08C;">
            {{$store.getters.getUserData.inventory.materials.filter(item => item.name === '纠缠之缘')[0].introduction}}
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%;display: flex;justify-content: center">
      <el-input-number style="margin-top: 10px;" v-model="num" ></el-input-number>
    </div>
    <div v-if="$store.getters.getUserData.diamond < 160 * num"
         style="color: red;font-weight: 700;font-size: 16px;text-align: center;margin-top: 10px;width: 100%">
      创世结晶不足！
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button  @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" v-if="$store.getters.getUserData.diamond >= 160 * num"
                   @click="buy">兑 换</el-button>
                <el-button type="primary" v-else disabled>兑 换</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
import {selectEvent,draw} from "@/network/events";
import {getUser} from "@/network/user";
import {buy} from "@/network/store";


export default {
  name: "Event",
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      eventsList: [{type: ''}],
      index: 0,
      // num1: 0,
      // num2: 0,
      // num3: 0,
      drawList:[],
      imgList: [],
      num: 1
    }
  },
  methods: {
    change(index) {
      this.index = index
    },
    warn() {
      this.$notify.error({
        title: '纠缠之缘不足！',
      });
    },
    buy() {
      buy({
        account: this.$store.getters.getUserData.account,
        id: this.$store.getters.getUserData.inventory.materials.filter(item => item.name === '纠缠之缘')[0].id,
        price: 160,
        num: this.num
      }).then(res => {
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.num = 1
          this.dialogVisible2 = false
          this.$store.commit('updata',res.data.data.data)
        })
      })
    },
    draw(num) {
      draw({account: this.$store.getters.getUserData.account,id: this.eventsList[this.index].id,num}).then(res => {
        this.drawList = res.data.data.items
        this.imgList = []
        this.dialogVisible = true
        let i = 0
         let interval = setInterval(() => {
           if(i === this.drawList.length) {
             clearInterval(interval)
           } else {
             this.imgList.push(this.drawList[i])
             i++
           }
        },200)
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.$store.commit('updata',res.data.data.data)
        })
      })
    }
  },
  created() {
    // this.$store.getters.getUserData.inventory.materials.map(item => {
    //   if(item.name === '纠缠之缘') {
    //     this.num1 = item.num
    //   }
    //   if(item.name === '无主的星辉') {
    //     this.num2 = item.num
    //   }
    //   if(item.name === '无主的星尘') {
    //     this.num3 = item.num
    //   }
    // })
    selectEvent({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      this.eventsList = res.data.data.items
    })
  }
}
</script>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
}


</style>