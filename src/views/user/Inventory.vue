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
           style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center;position: relative">
        <img style="width: 90px;height: 90px;border-radius: 8px 8px 0 0" :src="item.cover" alt="">
        <div style="height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          Lv.{{item.level}}
        </div>
        <img style="position: absolute;top: 0;right: 0;width: 30px;border-radius: 50px" v-if="item.role.name !== ''" :src="item.role.cover" alt="">
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
        <div style="height: 50px;background-color: #FFE7BB;width: 100%">
          <div v-if="weapon.role.name !== ''" style="display: flex;align-items: center;height: 50px">
            <img style="width: 40px;border-radius: 50px;margin-left: 20px" :src="weapon.role.cover" alt="">
            <div style="margin-left: 20px;font-size: 18px;font-weight: 600;color: #707580">{{weapon.role.name}}已装备</div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div v-if="type === 'artifact'" style="display: flex;height: 610px;width: 1300px;overflow-y:auto">
    <div  style="width: 905px;display: flex;flex-wrap:wrap;overflow-x:auto;height: fit-content;max-height: 610px">
      <div v-for="item in artifactList" :key="item.id" @click="artifact = item" :class="artifact.id === item.id ? 'active hover' : 'hover'"
           style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center;position: relative">
        <img style="width: 90px;height: 90px;border-radius: 8px 8px 0 0" :src="item.cover" alt="">
        <div style="height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          +{{item.level}}
        </div>
        <img style="position: absolute;top: 0;right: 0;width: 30px;border-radius: 50px" v-if="item.role.name !== ''" :src="item.role.cover" alt="">
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
        <div  style="height: 50px;background-color: #FFE7BB;width: 100%">
          <div v-if="artifact.role.name !== ''" style="display: flex;align-items: center;height: 50px">
            <img style="width: 40px;border-radius: 50px;margin-left: 20px" :src="artifact.role.cover" alt="">
            <div style="margin-left: 20px;font-size: 18px;font-weight: 600;color: #707580">{{artifact.role.name}}已装备</div>
          </div>
        </div>
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
      .
    </div>
    <div style="margin-right: 10px">
      <el-button  v-if="type === 'weapon' && this.weapon.level !== 90"  @click="dialogVisible1 = true" style="width:120px;font-size: 18px;font-weight: 600;color: #000" type="warning" round>{{weapon.level === (weapon.rank - 1) * 10 + 40 ? '突破' : '强化'}}</el-button>
      <el-button v-if="type === 'artifact' && this.artifact.level !== 20"  @click="dialogVisible2 = true" style="width:120px;font-size: 18px;font-weight: 600;color: #000" type="warning" round>强化</el-button>
      <el-button  v-if="type === 'artifact' && this.artifact.role.name === ''" @click="dialogVisible = true" style="width:120px;font-size: 18px;font-weight: 600;color: #000" type="warning" round>上架</el-button>
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
  <el-dialog
      title="强化突破"
      :visible.sync="dialogVisible1"
      width="30%"
  >
    <div style="display: flex;flex-direction: column;align-items: center;font-size: 18px;font-weight: 600">
      <div style="width: 90%">
        Lv.{{weapon.level}}
        <span v-if="weapon.level === (weapon.rank - 1) * 10 + 40">  / {{weapon.level}}<span class="add"> + 10</span></span>
        <span v-else-if="num !== 0" class="add"> + {{num / 2}}</span>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;width: 90%;margin-top: 10px">
        <div>基础攻击力</div>
        <div>{{weapon.ATK}}<span v-if="num !== 0 && !(weapon.level === (weapon.rank - 1) * 10 + 40)" class="add"> + {{Math.floor((weapon.ATKIncrease * num / 2))}}</span></div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;width: 90%;margin-top: 10px">
        <div>{{weapon.secondary.type | effectType}}</div>
        <div>{{weapon.secondary.num}}%<span v-if="num !== 0 && !(weapon.level === (weapon.rank - 1) * 10 + 40)" class="add"> + {{(weapon.secondary.increase * num / 2).toFixed(1)}}%</span></div>
      </div>
      <div v-if="!(weapon.level === (weapon.rank - 1) * 10 + 40)" style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center">
        <img style="width: 90px;height: 90px;border-radius: 10px" :src="$store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].cover" alt="">
        <div style="height: 20px;line-height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          {{$store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num}}
        </div>
      </div>
      <div v-else>
        武器突破所需素材
      </div>
      <div v-if="!(weapon.level === (weapon.rank - 1) * 10 + 40)" style="display: flex;align-items: center;width: 80%">
        <div>使用数量</div>
        <div style="flex: 1;margin: 0 20px">
          <el-slider style="width: 100%"
              :max="Math.min($store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num,
              (40 + (weapon.rank - 1 ) * 10 - weapon.level) * 2)"
              v-model="num"
              :step="2">
          </el-slider>
        </div>
        <div>{{num}}</div>
      </div>
      <div v-else style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center">
        <img style="width: 90px;height: 90px;border-radius: 10px" :src="$store.getters.getUserData.inventory.materials.filter(item => item.name === weapon.material)[0].cover" alt="">
        <div style="height: 20px;line-height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          <span :class="$store.getters.getUserData.inventory.materials.filter(item => item.name === weapon.material)[0].num >= Math.pow(2,weapon.rank - 1) ? '' : 'no'">
            {{$store.getters.getUserData.inventory.materials.filter(item => item.name === weapon.material)[0].num}}</span> / {{Math.pow(2,weapon.rank - 1)}}
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="dialogVisible1 = false">取 消</el-button>
      <el-button v-if="!(weapon.level === (weapon.rank - 1) * 10 + 40)" type="primary" @click="enhance">强 化</el-button>
      <el-button v-else-if="$store.getters.getUserData.inventory.materials.filter
      (item => item.name === weapon.material)[0].num >= Math.pow(2,weapon.rank - 1)" type="primary" @click="ascend">突 破</el-button>
      <el-button v-else disabled type="primary">素材不足</el-button>
    </span>
  </el-dialog>
  <el-dialog
      title="强化"
      :visible.sync="dialogVisible2"
      width="30%"
  >
    <div style="display: flex;flex-direction: column;align-items: center;font-size: 18px;font-weight: 600">
      <div style="width: 90%">
        + {{artifact.level}}
        <span v-if="num !== 0" class="add"> + {{num / 3}}</span>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;width: 90%;margin-top: 10px;margin-bottom: 10px">
        <div>{{artifact.effect.type | effectType}}</div>
        <div>{{artifact.effect.num}}%<span v-if="num !== 0" class="add"> + {{(artifact.effect.increase * num / 3)}}%</span></div>
      </div>
      <div v-if="artifact.effects.length !== 4 && add > 0" class="add" style="width: 90%" >
        随机获得{{Math.min(add,4 - artifact.effects.length)}}条追加属性
      </div>
      <div v-if="add + artifact.effects.length - 4 > 0 " class="add" style="width: 90%;margin-top: 10px" >
        随机提升{{add + artifact.effects.length - 4}}条追加属性
      </div>
      <div v-for="item in artifact.effects" :key="item.type" style="display: flex;justify-content: space-between;align-items: center;width: 90%;margin-top: 5px">
        <div>{{item.type | effectType}}</div>
        <div>{{item.num}}%</div>
      </div>
      <div style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center">
        <img style="width: 90px;height: 90px;border-radius: 10px" :src="$store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].cover" alt="">
        <div style="height: 20px;line-height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          {{$store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num}}
        </div>
      </div>
      <div style="display: flex;align-items: center;width: 80%">
        <div>使用数量</div>
        <div style="flex: 1;margin: 0 20px">
          <el-slider style="width: 100%"
                     :max="Math.min($store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num,
              (20 - artifact.level) * 3)"
                     v-model="num"
                     :step="3">
          </el-slider>
        </div>
        <div>{{num}}</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="dialogVisible2 = false">取 消</el-button>
      <el-button  type="primary" @click="enhance1">强 化</el-button>

    </span>
  </el-dialog>
</div>
</template>

<script>


import {upGoods} from "@/network/goods";
import {getUser, setUser} from "@/network/user";

export default {
  name: "Inventory",
  data() {
    return {
      type: 'weapon',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      weapon: {},
      material: {},
      artifact: {},
      price: 0,
      num: 0,
      addEffects: [
        {
          type: "ATK",
          num: 5,
          increase: 5
        },  {
          type: "HP",
          num: 5,
          increase: 5
        },  {
          type: "DEF",
          num: 6.2,
          increase: 6.2
        },  {
          type: "energyRecharge",
          num: 5.5,
          increase: 5.5
        },  {
          type: "CRITDMG",
          num: 6.6,
          increase: 6.6
        },  {
          type: "CRITRate",
          num: 3.3,
          increase: 3.3
        },
      ]
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
    },
    enhance() {
      let add = this.num / 2
      this.weapon.level += add
      this.weapon.ATK += this.weapon.ATKIncrease * add
      this.weapon.ATK = Math.floor(this.weapon.ATK)
      this.weapon.secondary.num += this.weapon.secondary.increase * add
      this.weapon.secondary.num = this.weapon.secondary.num.toFixed(1) * 1
      let user = this.$store.getters.getUserData
      user.inventory.weapons.splice(
          user.inventory.weapons.findIndex((item) => item.id == this.weapon.id),
          1,
          this.weapon,
      )
      user.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num += -this.num
      if(this.weapon.role.name !== '') {
        user.roles.filter(item => item.name === this.weapon.role.name)[0].weapon = this.weapon
      }

      this.dialogVisible1 = false
      setUser(user).then(res => {
        this.$store.commit('updata',res.data.data.data)
        this.num = 0
      })
    },
    enhance1() {
      let up = this.num / 3
      this.artifact.level += up
      this.artifact.effect.num += this.artifact.effect.increase * up
      this.artifact.effect.num = this.artifact.effect.num.toFixed(1) * 1
      for (let i = 0; i < this.add; i++) {
        this.artifact = this.addEffect(this.artifact)
      }
      let user = this.$store.getters.getUserData
      user.inventory.artifacts.splice(
          user.inventory.artifacts.findIndex((item) => item.id == this.artifact.id),
          1,
          this.artifact,
      )
      user.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num += -this.num
      if(this.artifact.role.name !== '') {
        user.roles.filter(item => item.name === this.artifact.role.name)[0].artifacts[this.artifact.part] = this.artifact

      }
      this.dialogVisible2 = false
      setUser(user).then(res => {
        this.$store.commit('updata',res.data.data.data)
        this.num = 0
      })
    },
    ascend() {
      let user = this.$store.getters.getUserData
      user.inventory.materials.filter(item => item.name === this.weapon.material)[0].num += -Math.pow(2,this.weapon.rank - 1)
      this.weapon.rank++
      user.inventory.weapons.splice(
          user.inventory.weapons.findIndex((item) => item.id == this.weapon.id),
          1,
          this.weapon,
      )
      if(this.weapon.role.name !== '') {
        user.roles.filter(item => item.name === this.weapon.role.name)[0].weapon = this.weapon
      }
      this.dialogVisible1 = false
      setUser(user).then(res => {
        this.$store.commit('updata',res.data.data.data)

      })

    },
    addEffect(artifact) {
      if(artifact.effects.length < 4) {
        let effects = this.addEffects.filter(item => {
          let same = false
          artifact.effects.map(item1 => {
            if(item1.type === item.type) same = true
          })
          return !same
        })
        artifact.effects.push(effects[Math.floor(Math.random() * effects.length)])
      } else {
        let index = Math.floor(Math.random() * artifact.effects.length)
        artifact.effects[index].num += artifact.effects[index].increase
        artifact.effects[index].num = artifact.effects[index].num.toFixed(1) * 1
      }
      return artifact
    }

  },
  created() {
    this.weapon = this.$store.getters.getUserData.inventory.weapons.sort((a,b) => b.weight - a.weight)[0]
    this.material = this.$store.getters.getUserData.inventory.materials.sort((a,b) => b.weight - a.weight)[0]
    this.artifact = this.$store.getters.getUserData.inventory.artifacts.sort((a,b) => b.level - a.level)[0]
  },
  computed: {
    weaponList() {
      return this.$store.getters.getUserData.inventory.weapons.sort((a,b) => b.weight - a.weight).sort((a,b) => b.level - a.level)
    },
    materialList() {
      return this.$store.getters.getUserData.inventory.materials.sort((a,b) => b.weight - a.weight)
    },
    artifactList() {
      return this.$store.getters.getUserData.inventory.artifacts.sort((a,b) => b.level - a.level)
    },
    add() {
      let add = 0
      for (let i = this.artifact.level; i <= this.artifact.level + this.num / 3;i++) {
        if(i !== 0 && i % 4 === 0) {
          add++
        }
      }
      return add
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

.add {
  color: #FFCC32;
}

.no {
  color: #FF5F40;
}
</style>