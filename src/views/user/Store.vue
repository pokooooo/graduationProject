<template>
  <div class="main">
    <el-container style="height: 100%">
      <el-aside style="height: 100%;background-color: #ECE5D8" width="260px">
        <div class="type"  style="position: relative">
          <img src="../../assets/image/prop/shangcheng.png" alt="">
          <img style="margin-top: 20px;" src="../../assets/image/prop/tuijian.png" alt="" @click="type = 'tuijian'">
          <img style="margin-top: 20px;" src="../../assets/image/prop/chenhui.png" alt="" @click="type = 'chenhui'">
<!--          <img style="margin-top: 20px;" src="../../assets/image/prop/jiejing.png" alt="" @click="type = 'jiejing'">-->
          <i v-if="type === 'tuijian'" class="el-icon-arrow-right i p1"></i>
          <i v-if="type === 'chenhui'" class="el-icon-arrow-right i p2"></i>
<!--          <i v-if="type === 'jiejing'" class="el-icon-arrow-right i p3"></i>-->
        </div>
      </el-aside>
      <el-main style=";">
        <div v-if="type === 'tuijian'" >
          <div style="padding: 10px 20px;border-radius: 10px">
            <div style="display: flex;flex-direction: row-reverse">
              <div style="border-radius: 20px;background-color: #343B51;border: #fff solid 1px;height: 35px;display: flex;
            align-items: center;justify-content: center;margin-left: 20px">
                <div style="display: flex;align-items: center">
                  <img style="margin-left: 10px;width: 25px" src="../../assets/image/prop/mola.png">
                  <div style="margin-left: 10px;font-weight: 700;color: #fff;margin-right: 10px">{{$store.getters.getUserData.gold}}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="display: flex;height: 610px;width: 1000px;overflow-y:auto">
            <div  style="width: 605px;display: flex;flex-wrap:wrap;overflow-x:auto;height: fit-content;max-height: 610px">
              <div v-for="item in goodsList" :key="item.id" @click="goods = item" :class="goods.id === item.id ? 'active hover' : 'hover'"
                   style="width: 120px;height: 160px;padding: 10px;display: flex;flex-direction: column;align-items: center">
                <img style="width: 100px;height: 100px;border-radius: 8px 8px 0 0" :src="item.good.cover" alt="">
                <div style="height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600">
                  +{{item.good.level}}
                </div>
                <div style="background-color: #E9E5DC;height: 20px;display: flex;width:100%;align-items: center;justify-content: center;border-radius: 0 0 8px 8px">
                  <div style="display: flex;align-items: center;">
                    <img style="margin-left: 10px;width: 20px;border-radius: 50px" src="../../assets/image/prop/mola.png">
                    <div style="margin-left: 0;font-weight: 700;color: #000;margin-right: 10px;">{{item.price}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="flex: 1;">
              <div style="display: flex;flex-direction: column;height: 600px;width: 94%;border-radius: 5px;margin: 10px auto 0">
                <div  style="padding: 0 20px;height: 50px;width: 100%;line-height: 50px;background-color: #BC6932;color: #fff;font-weight: 700;font-size: 20px;border-radius: 2px 2px 0 0">
                  {{goods.good.name}}
                </div>
                <div class="star5" style="padding: 0 20px;height: 150px;display: flex;justify-content: space-between">
                  <div style="color: #fff">
                    <div style="font-size: 18px;font-weight: 600;margin-top: 10px">{{goods.good.part | partsType}}</div>
                    <div style="font-size: 18px;font-weight: 600;color: #B9ABA9;margin-top: 20px">{{goods.good.effect.type | effectType}}</div>
                    <div style="font-size: 30px;font-weight: 600;">{{goods.good.effect.num}}%</div>
                  </div>
                  <img :src="goods.good.cover" style="height: 130px;margin-top: 10px" alt="">
                </div>
                <div style="height: 350px;background-color: #E3DDD2;font-size: 18px;font-weight: 600;display: flex;flex-direction: column;padding: 20px">
                  <div style="width: 50px;background-color: #000;color: #fff;text-align: center">+{{goods.good.level}}</div>
                  <div style="margin-top: 10px;">
                    <div style="margin-left: 10px;margin-top: 5px" v-for="item in goods.good.effects" :key="item.type">
                      · {{item.type | effectType}} + {{item.num}}%
                    </div>
                  </div>
                  <div style="margin-top: 10px;color: green">{{goods.good.name1}}</div>
                  <div style="margin-top: 10px;color: #707580;margin-left: 20px">2件套: {{goods.good.pieceSet.type | effectType}}提高{{goods.good.pieceSet.num}}</div>
                  <div style="margin-top: 10px;color: #707580;margin-left: 20px">4件套: {{goods.good.pieceSet.type | effectType}}提高{{goods.good.pieceSet.num * 2}}</div>
                  <div style="margin-top: 10px;color: #707580">{{goods.good.introduction}}</div>
                </div>
                <div  style="height: 40px;background-color: #FFE7BB;width: 100%;color: #707580;font-size: 18px;font-weight: 600;line-height: 40px;padding-left: 20px">
                  上架时间：{{goods.time | dataFormat}}
                </div>
              </div>
            </div>
          </div>
          <div style="width: 100%;text-align: end">
            <el-button  v-if="$store.getters.getUserData.account === goods.seller" @click="down"
                          style="width:120px;font-size: 18px;font-weight: 600;color: #000;margin-right: 10px" type="warning" round>下 架</el-button>
            <div v-else>
              <el-button v-if="$store.getters.getUserData.gold >= goods.price" @click="buy2"
                         style="width:120px;font-size: 18px;font-weight: 600;color: #000;margin-right: 10px" type="success" round>购 买</el-button>
              <el-button v-else @click="buy2"
                         style="width:120px;font-size: 18px;font-weight: 600;color: #000;margin-right: 10px" type="danger" disabled round>摩拉不足！</el-button>
            </div>
          </div>
        </div>
        <div v-if="type === 'chenhui'" >
          <div style="background-color: #343B51;padding: 10px 20px;border-radius: 10px">
            <div style="display: flex;flex-direction: row-reverse">
              <div style="border-radius: 20px;background-color: #343B51;border: #fff solid 1px;height: 35px;display: flex;
            align-items: center;justify-content: center;margin-left: 20px">
                <div style="display: flex;align-items: center">
                  <img style="margin-left: 10px;width: 25px" src="../../assets/image/prop/yuanshi.png">
                  <div style="margin-left: 10px;font-weight: 700;color: #fff;margin-right: 10px">{{$store.getters.getUserData.diamond}}</div>
                </div>
              </div>
              <div style="border-radius: 20px;background-color: #343B51;border: #fff solid 1px;height: 35px;display: flex;
            align-items: center;justify-content: center;margin-left: 20px">
                <div style="display: flex;align-items: center">
                  <img style="margin-left: 10px;width: 25px;border-radius: 50px" src="../../assets/image/prop/xingchen.png">
                  <div style="font-weight: 700;color: #fff;margin-left: 10px;margin-right: 10px">{{$store.getters.getUserData.inventory.materials.filter(item => item.name === '无主的星尘')[0].num}}</div>
                </div>
              </div>
              <div style="border-radius: 20px;background-color: #343B51;border: #fff solid 1px;height: 35px;display: flex;
            align-items: center;justify-content: center">
                <div style="display: flex;align-items: center">
                  <img style="margin-left: 10px;width: 25px;border-radius: 50px" src="../../assets/image/prop/xinghui.png">
                  <div style="font-weight: 700;color: #fff;margin-left: 10px;margin-right: 10px">{{$store.getters.getUserData.inventory.materials.filter(item => item.name === '无主的星辉')[0].num}}</div>
                </div>
              </div>
            </div>
            <div style="margin-top: 10px">
              <img class="hover" style="width: 300px" src="../../assets/image/prop/hui.png" alt=""  @click="type1 = 'xinghui'">
              <img class="hover" style="width: 300px;margin-left: 30px" src="../../assets/image/prop/chen.png" alt="" @click="type1 = 'xingchen'">
<!--              <img class="hover" style="width: 300px;margin-left: 30px" src="../../assets/image/prop/yuan.png" alt="" @click="type = 'jiejing'">-->
            </div>
          </div>
          <div  style="width: 1000px;display: flex;flex-wrap:wrap;overflow-x:auto;height: fit-content;max-height: 595px">
            <div v-if="type1 === 'xinghui'" v-for="item in weaponList" :key="item.id" @click="buyWeapon(item)" class="hover"
                 style="width: 160px;height: 190px;padding: 15px;display: flex;flex-direction: column;align-items: center">
              <img style="width: 130px;height: 130px" :src="item.cover" alt="">
              <div style="height: 30px;width:100%;background-color: #E9E5DC;display: flex;align-items: center;justify-content: center;font-weight: 600;border-radius: 0 0 8px 8px">
                  <div style="display: flex;align-items: center;justify-content: center">
                    <img style="width: 25px;border-radius: 50px" src="../../assets/image/prop/xinghui.png">
                    <div style=";height: 30px;line-height: 30px;margin-left: 5px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
                      {{item.price}}
                    </div>
                  </div>
              </div>
            </div>
            <div v-if="type1 === 'xingchen'" v-for="item in materialList" :key="item.id"  @click="buyMaterial(item)" class="hover"
                 style="width: 160px;height: 190px;padding: 15px;display: flex;flex-direction: column;align-items: center">
              <img style="width: 130px;height: 130px" :src="item.cover" alt="">
              <div style="height: 30px;width:100%;background-color: #E9E5DC;display: flex;align-items: center;justify-content: center;font-weight: 600;border-radius: 0 0 8px 8px">
                <div style="display: flex;align-items: center;justify-content: center">
                  <img style="width: 25px;border-radius: 50px" src="../../assets/image/prop/xingchen.png">
                  <div style=";height: 30px;line-height: 30px;margin-left: 5px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
                    {{item.price}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="type === 'jiejing'">
          <div style="border-radius: 20px;background-color: #292D3C;height: 35px;display: flex;align-items: center;justify-content: center;">
            <div style="display: flex;align-items: center">
              <img style="margin-left: 10px;width: 25px" src="../../assets/image/prop/yuanshi.png">
              <div style="margin-left: 10px;font-weight: 700;color: #fff;margin-right: 10px">{{$store.getters.getUserData.diamond}}</div>
            </div>
          </div>
          <div style="display: flex;width: 1000px;height: 710px;border-radius: 5px">
            <div style="width: 250px;padding: 10px"><img style="width: 100%;border-radius: 20px" src="../../assets/image/prop/98.png"></div>
            <div style="width: 250px;padding: 10px"><img style="width: 100%;border-radius: 20px" src="../../assets/image/prop/198.png"></div>
            <div style="width: 250px;padding: 10px"><img style="width: 100%;border-radius: 20px" src="../../assets/image/prop/328.png"></div>
            <div style="width: 250px;padding: 10px"><img style="width: 100%;border-radius: 20px" src="../../assets/image/prop/648.png"></div>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-dialog
        title="兑换物品"
        :visible.sync="dialogVisible"
        width="40%"
    >
      <div :class="weapon.star === 5 ? 'star5' : 'star4'" style="display: flex;margin: 0 20px;;border-radius: 5px">
        <div style="display: flex;width: 100%;margin-bottom: 10px;">
          <img  style="width: 125px;height: 130px;margin: 10px 0 0 10px" :src="this.weapon.cover" alt="">
          <div style="display: flex;flex-direction: column;margin-left: 20px;width: 100%;">
            <div style="display: flex;justify-content: space-between;width: 100%;align-items: center;height: 50px">
              <div style="font-size: 16px;font-weight: 600;color: #B4A08C">
                {{this.weapon.name}}
              </div>
              <div>
                <div style="border-radius: 20px;background-color: #343B51;border: #fff solid 1px;height: 35px;display: flex;
            align-items: center;justify-content: center;margin-right: 20px">
                  <div style="display: flex;align-items: center">
                    <img style="margin-left: 10px;width: 25px;border-radius: 50px" src="../../assets/image/prop/xinghui.png">
                    <div style="font-weight: 700;color: #fff;margin-left: 10px;margin-right: 10px">{{weapon.price}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div  style="font-size: 16px;font-weight: 500;color: #B4A08C;">
              {{weapon.introduction}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="$store.getters.getUserData.inventory.materials.filter(item => item.name === '无主的星辉')[0].num < weapon.price"
           style="color: red;font-weight: 700;font-size: 16px;text-align: center;margin-top: 10px;width: 100%">
        货币不足！
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-if="$store.getters.getUserData.inventory.materials.filter(item => item.name === '无主的星辉')[0].num >= weapon.price"
                   @click="buy">兑 换</el-button>
                <el-button type="primary" v-else disabled @click="buy">兑 换</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="兑换物品"
        :visible.sync="dialogVisible1"
        width="40%"
    >
      <div :class="material.weight  > 15 ? 'star5' : 'star4'" style="display: flex;margin: 0 20px;border-radius: 5px">
        <div style="display: flex;width: 100%;margin-bottom: 10px;">
          <img style="width: 125px;height: 130px;margin: 10px 0 0 10px" :src="this.material.cover" alt="">
          <div style="display: flex;flex-direction: column;margin-left: 20px;width: 100%;">
            <div style="display: flex;justify-content: space-between;width: 100%;align-items: center;height: 50px">
              <div style="font-size: 16px;font-weight: 600;color: #B4A08C">
                {{this.material.name}}
              </div>
              <div>
                <div style="border-radius: 20px;background-color: #343B51;border: #fff solid 1px;height: 35px;display: flex;
            align-items: center;justify-content: center;margin-right: 20px">
                  <div style="display: flex;align-items: center">
                    <img style="margin-left: 10px;width: 25px;border-radius: 50px" src="../../assets/image/prop/xingchen.png">
                    <div style="font-weight: 700;color: #fff;margin-left: 10px;margin-right: 10px">{{material.price * num}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div  style="font-size: 16px;font-weight: 500;color: #B4A08C;">
              {{material.introduction}}
            </div>
          </div>
        </div>
      </div>
      <div style="width: 100%;display: flex;justify-content: center">
        <el-input-number style="margin-top: 10px;" v-model="num" ></el-input-number>
      </div>
      <div v-if="$store.getters.getUserData.inventory.materials.filter(item => item.name === '无主的星尘')[0].num < material.price * num"
           style="color: red;font-weight: 700;font-size: 16px;text-align: center;margin-top: 10px;width: 100%">
        货币不足！
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" v-if="$store.getters.getUserData.inventory.materials.filter(item => item.name === '无主的星尘')[0].num >= material.price * num"
                   @click="buy1">兑 换</el-button>
                <el-button type="primary" v-else disabled>兑 换</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {selectMaterial} from "@/network/materials";
import {selectWeapon} from "@/network/weapons";
import {buyWeapon,buyMaterial} from "@/network/store";
import {getUser} from "@/network/user";
import {downGoods, getGoods, buyGoods} from "@/network/goods";


export default {
  name: "Store",
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      weapon: {},
      material: {},
      num: 1,
      type: 'chenhui',
      type1: 'xinghui',
      weaponList: [],
      materialList: [],
      goodsList: [],
      goods: {}
    }
  },
  methods: {
    buyWeapon(item) {
      this.dialogVisible = true
      this.weapon = item
    },
    buyMaterial(item) {
      this.dialogVisible1 = true
      this.material = item
    },
    buy() {
      buyWeapon({
        account: this.$store.getters.getUserData.account,
        id: this.weapon.id,
        price: this.weapon.price
      }).then(res => {
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.dialogVisible = false
          this.num = 1
          this.$store.commit('updata',res.data.data.data)
        })
      })
    },
    buy1() {
      buyMaterial({
        account: this.$store.getters.getUserData.account,
        id: this.material.id,
        price: this.material.price,
        num: this.num
      }).then(res => {
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.num = 1
          this.dialogVisible1 = false
          this.$store.commit('updata',res.data.data.data)
        })
      })
    },
    down() {
      downGoods({
        seller: this.$store.getters.getUserData.account,
        id: this.goods.id
      }).then(() => {
        this.getGoods()
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.$store.commit('updata',res.data.data.data)
        })
      })
    },
    buy2() {
      buyGoods({
        purchaser: this.$store.getters.getUserData.account,
        id: this.goods.id
      }).then(() => {
        this.getGoods()
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.$store.commit('updata',res.data.data.data)
        })
      })
    },
    getGoods() {
      getGoods().then(res => {
        this.goodsList = res.data.data.data
        this.goods = this.goodsList.sort((a,b) => b.level - a.level)[0]
      })
    }
  },
  computed: {

  },
  created() {
    this.getGoods()


    selectWeapon({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      this.weaponList = res.data.data.items.filter(item => item.status === 1).sort((a,b) => b.weight - a.weight).map(item => {
        if(item.star === 5) {
          item.price = 50
        } else {
          item.price = 10
        }
        return item
      })
      console.log(this.weaponList)
    })
    selectMaterial({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      this.materialList =  res.data.data.items.filter(item => item.status === 1).sort((a,b) => b.weight - a.weight).map(item => {
        if(item.weight === 10) item.price = 4
        if(item.weight === 15) item.price = 60
        if(item.weight === 4) item.price = 15
        if(item.weight === 3) item.price = 10
        if(item.weight === 5) item.price = 30
        return item
      })
      // this.weaponList.unshift(Object.assign(this.materialList[0],{price: 2}))
    })
  }
}
</script>

<style scoped>
.type img{
  width: 260px;

}

.active {
  transform: scale(1.15);
  /*border: #fff solid 1px;*/

}

.active1 {
  border-bottom: #fff solid 4px;
}

.i {
  font-weight: 900;
  font-size: 30px;
  color: #399CCC;
  position: absolute;
  right: 0;
  top:0
}

.p1 {
  top: 106px;
}

.p2 {
  top: 180px;
}

.p3 {
  top: 254px;
}


</style>