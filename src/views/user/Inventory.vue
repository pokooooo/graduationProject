<template>
<div>
  <div style="width: 100%;background-color: #1F1D29;display: flex;justify-content: center" class="header">
    <img :class="type === 'weapon' ? 'active1' : ''" style="height: 60px" src="../../assets/image/prop/weapon.png" alt="" @click="type = 'weapon'">
    <img :class="type === 'artifact' ? 'active1' : ''"style="margin-left: 80px;height: 60px" src="../../assets/image/prop/artifact.png" alt="" @click="type = 'artifact'">
    <img :class="type === 'material' ? 'active1' : ''" style="margin-left: 80px;height: 60px" src="../../assets/image/prop/material.png" alt="" @click="type = 'material'">
  </div>
  <div v-if="type === 'weapon'" style="display: flex;height: 610px;width: 1300px;overflow-y:auto">
    <div  style="width: 905px;display: flex;flex-wrap:wrap;overflow-x:auto;height: fit-content;max-height: 610px">
      <div v-for="item in weaponList" :key="item.id" @click="weapon = item" :class="weapon.id === item.id ? 'active hover' : 'hover'"
           style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center">
        <img style="width: 90px;height: 90px;border-radius: 8px 8px 0 0" :src="item.cover" alt="">
        <div style="height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          Lv.{{item.level}}
        </div>
      </div>
    </div>
    <div style="flex: 1;">
      <div style="display: flex;flex-direction: column;height: 600px;width: 94%;border-radius: 5px;margin: 10px auto 0">
        <div v-if="weapon.star === 5" style="padding: 0 20px;height: 50px;width: 100%;line-height: 50px;background-color: #BC6932;color: #fff;font-weight: 700;font-size: 20px;border-radius: 2px 2px 0 0">
          {{weapon.name}}
        </div>
        <div v-else style="padding: 0 20px;height: 50px;width: 100%;line-height: 50px;background-color: #A256E0;color: #fff;font-weight: 700;font-size: 20px;border-radius: 2px 2px 0 0">
          {{weapon.name}}
        </div>
        <div :class="weapon.star === 5 ? 'star5' : 'star4'" style="padding: 0 20px;height: 150px;display: flex;justify-content: space-between">
          <div style="color: #fff">
            <div style="font-size: 18px;font-weight: 600;margin-top: 10px">{{weapon.type | weaponType}}</div>
            <div style="font-size: 18px;font-weight: 600;color: #B9ABA9">{{weapon.secondary.type | effectType}}</div>
            <div style="font-size: 18px;font-weight: 600">{{weapon.secondary.num}}%</div>
            <div style="font-size: 18px;font-weight: 600;color: #B9ABA9">基础攻击力</div>
            <div style="font-size: 30px;font-weight: 600;">{{weapon.ATK}}</div>
          </div>
          <img :src="weapon.cover" style="height: 130px;margin-top: 10px" alt="">
        </div>
        <div style="height: 400px;background-color: #E3DDD2;font-size: 18px;font-weight: 600;display: flex;flex-direction: column;padding: 20px">
          <div>
            Lv.{{weapon.level}} / {{(weapon.rank - 1) * 10 + 40}}
          </div>
          <div style="margin-top: 10px;">特殊效果</div>
          <div>获得
            <span style="color: #399CCC">{{weapon.effect.num}}</span>%
            <span style="">{{weapon.effect.type | effectType}}</span>
            </div>
          <div style="margin-top: 10px;color: #707580">{{weapon.introduction}}</div>
        </div>
        <div v-if="weapon.role.name !== ''"  style="height: 50px;background-color: #FFE7BB;width: 100%">
        </div>
      </div>

    </div>
  </div>
  <div v-if="type === 'artifact'" style="display: flex;height: 610px;width: 1300px;overflow-y:auto">
    <div  style="width: 905px;display: flex;flex-wrap:wrap;overflow-x:auto;height: fit-content;max-height: 610px">
      <div v-for="item in artifactList" :key="item.id" @click="artifact = item" :class="artifact.id === item.id ? 'active hover' : 'hover'"
           style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center">
        <img style="width: 90px;height: 90px;border-radius: 8px 8px 0 0" :src="item.cover" alt="">
        <div style="height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          +{{item.level}}
        </div>
      </div>
    </div>
    <div style="flex: 1;">
      <div style="display: flex;flex-direction: column;height: 600px;width: 94%;border-radius: 5px;margin: 10px auto 0">
        <div  style="padding: 0 20px;height: 50px;width: 100%;line-height: 50px;background-color: #BC6932;color: #fff;font-weight: 700;font-size: 20px;border-radius: 2px 2px 0 0">
          {{artifact.name}}
        </div>
        <div class="star5" style="padding: 0 20px;height: 150px;display: flex;justify-content: space-between">
          <div style="color: #fff">
            <div style="font-size: 18px;font-weight: 600;margin-top: 10px">{{artifact.part | partsType}}</div>
            <div style="font-size: 18px;font-weight: 600;color: #B9ABA9;margin-top: 20px">{{artifact.effect.type | effectType}}</div>
            <div style="font-size: 30px;font-weight: 600;">{{artifact.effect.num}}%</div>
          </div>
          <img :src="artifact.cover" style="height: 130px;margin-top: 10px" alt="">
        </div>
        <div style="height: 350px;background-color: #E3DDD2;font-size: 18px;font-weight: 600;display: flex;flex-direction: column;padding: 20px">
          <div style="width: 50px;background-color: #000;color: #fff;text-align: center">+{{artifact.level}}</div>
          <div style="margin-top: 10px;">
            <div style="margin-left: 10px;margin-top: 5px" v-for="item in artifact.effects" :key="item.type">
              · {{item.type | effectType}} + {{item.num}}%
            </div>
          </div>
          <div style="margin-top: 10px;color: green">{{artifact.name1}}</div>
          <div style="margin-top: 10px;color: #707580;margin-left: 20px">2件套: {{artifact.pieceSet.type | effectType}}提高{{artifact.pieceSet.num}}</div>
          <div style="margin-top: 10px;color: #707580;margin-left: 20px">4件套: {{artifact.pieceSet.type | effectType}}提高{{artifact.pieceSet.num * 2}}</div>
          <div style="margin-top: 10px;color: #707580">{{artifact.introduction}}</div>
        </div>
        <div v-if="artifact.role.name !== ''"  style="height: 40px;background-color: #FFE7BB;width: 100%"></div>
      </div>
    </div>
  </div>
  <div v-if="type === 'material'" style="display: flex;height: 610px;width: 1300px;overflow-y:auto">
    <div  style="width: 900px;display: flex;flex-wrap:wrap;overflow-x:auto;height: fit-content;max-height: 610px">
      <div v-for="item in materialList" :key="item.id" @click="material = item" :class="material.id === item.id ? 'active hover' : 'hover'"
           style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center">
        <img style="width: 90px;height: 90px;border-radius: 10px" :src="item.cover" alt="">
        <div style="height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          {{item.num}}
        </div>
      </div>
    </div>
    <div style="flex: 1;">
      <div style="display: flex;flex-direction: column;height: 600px;width: 94%;border-radius: 5px;margin: 10px auto 0">
        <div v-if="material.weight >= 20" style="padding: 0 20px;height: 50px;width: 100%;line-height: 50px;background-color: #BC6932;color: #fff;font-weight: 700;font-size: 20px;border-radius: 2px 2px 0 0">
          {{material.name}}
        </div>
        <div v-else style="padding: 0 20px;height: 50px;width: 100%;line-height: 50px;background-color: #A256E0;color: #fff;font-weight: 700;font-size: 20px;border-radius: 2px 2px 0 0">
          {{material.name}}
        </div>
        <div v-if="material.weight >= 20" style="padding: 0 20px;height: 150px;background-color: #B17029;display: flex;justify-content: space-between">
          <div style="font-size: 18px;font-weight: 600;margin-top: 10px;color: #B9ABA9">{{material.purpose}}</div>
          <img :src="material.cover" style="height: 130px;margin-top: 10px" alt="">
        </div>
        <div v-else style="padding: 0 20px;height: 150px;background-color: #685B8C;display: flex;justify-content: space-between">
          <div style="font-size: 18px;font-weight: 600;margin-top: 10px;color: #B9ABA9">{{material.purpose}}</div>
          <img :src="material.cover" style="height: 130px;margin-top: 10px" alt="">
        </div>
        <div style="height: 400px;background-color: #E3DDD2;font-size: 18px;font-weight: 600;display: flex;flex-direction: column;padding: 20px">
          <div>来源</div>
          <div>{{material.get}}</div>
          <div style="margin-top: 10px;color: #707580">{{material.introduction}}</div>
        </div>

      </div>

    </div>
  </div>
  <div style="height: 80px;width: 100%;display: flex;justify-content: space-between;align-items: center">
    <div>
      123
    </div>
    <div v-if="type === 'artifact'" style="margin-right: 10px">
      <el-button @click="dialogVisible = true" style="width:120px;font-size: 18px;font-weight: 600;color: #000" type="warning" round>上架</el-button>
    </div>
  </div>
  <el-dialog
      title="设置出售价格"
      :visible.sync="dialogVisible"
      width="20%"
  >
    <el-input v-model.number="price" type="number" ></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="up">上 架</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>


import {upGoods} from "@/network/goods";
import {getUser} from "@/network/user";

export default {
  name: "Inventory",
  data() {
    return {
      type: 'weapon',
      dialogVisible: false,
      weapon: {},
      material: {},
      artifact: {},
      price: 0
    }
  },
  methods: {
    up() {
      upGoods({
        seller: this.$store.getters.getUserData.account,
        good: this.artifact,
        price: this.price
      }).then(() => {
        this.dialogVisible = false
        this.price = 0
        getUser({account: this.$store.getters.getUserData.account}).then(res => {
          this.$store.commit('updata',res.data.data.data)
          this.artifact = this.$store.getters.getUserData.inventory.artifacts.sort((a,b) => b.level - a.level)[0]
        })

      })
    }
  },
  created() {
    this.weapon = this.$store.getters.getUserData.inventory.weapons.sort((a,b) => b.weight - a.weight)[0]
    this.material = this.$store.getters.getUserData.inventory.materials.sort((a,b) => b.weight - a.weight)[0]
    this.artifact = this.$store.getters.getUserData.inventory.artifacts.sort((a,b) => b.level - a.level)[0]
  },
  computed: {
    weaponList() {
      return this.$store.getters.getUserData.inventory.weapons.sort((a,b) => b.weight - a.weight)
    },
    materialList() {
      return this.$store.getters.getUserData.inventory.materials.sort((a,b) => b.weight - a.weight)
    },
    artifactList() {
      return this.$store.getters.getUserData.inventory.artifacts.sort((a,b) => b.level - a.level)
    }
  }

}
</script>

<style scoped>
.active {
  transform: scale(1.15);
  /*border: #fff solid 1px;*/

}

.active1 {
  border-bottom: #fff solid 4px;
}

/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>