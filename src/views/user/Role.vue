<template>
<div style="display: flex;flex-direction: column">
  <div  style="height: 73px;width: 1300px;display: flex;justify-content: center;align-items: center">
    <div style="height: 73px;display: flex;align-items: center;">
      <img style="height: 60px;margin: 0 10px;border-radius: 50px" v-for="item in rolesList" :key="item.id" :src="item.cover" @click="role = item;type = 'base';type1 = 'base'">
    </div>
  </div>
  <div style="width: 1300px;height: 600px;position: relative">
    <div v-if="type === 'base'">
      <img v-if="JSON.stringify(role.weapon) !== '{}'" style="border-radius: 10px;position: absolute;width: 70px;top: 30px;left: 60px" :src="role.weapon.cover" @click="change('weapons')">
      <img v-else style="border-radius: 10px;position: absolute;width: 70px;top: 30px;left: 60px" src="../../assets/image/prop/1.png" @click="change('weapons')">
      <img v-if="JSON.stringify(role.artifacts.sands) !== '{}'" style="border-radius: 10px;position: absolute;width: 70px;top: 30px;left: 150px" :src="role.artifacts.sands.cover" @click="change('sands')">
      <img v-else style="border-radius: 10px;position: absolute;width: 70px;top: 30px;left: 150px" src="../../assets/image/prop/3.png" @click="change('sands')">
      <img v-if="JSON.stringify(role.artifacts.flower) !== '{}'" style="border-radius: 10px;position: absolute;width: 70px;top: 120px;left: 60px" :src="role.artifacts.flower.cover" @click="change('flower')">
      <img v-else style="border-radius: 10px;position: absolute;width: 70px;top: 120px;left: 60px"  src="../../assets/image/prop/1.png" @click="change('flower')">
      <img v-if="JSON.stringify(role.artifacts.goblet) !== '{}'" style="border-radius: 10px;position: absolute;width: 70px;top: 120px;left: 150px" :src="role.artifacts.goblet.cover" @click="change('goblet')">
      <img v-else style="border-radius: 10px;position: absolute;width: 70px;top: 120px;left: 150px"  src="../../assets/image/prop/4.png" @click="change('goblet')">
      <img v-if="JSON.stringify(role.artifacts.plume) !== '{}'" style="border-radius: 10px;position: absolute;width: 70px;top: 210px;left: 60px" :src="role.artifacts.plume.cover" @click="change('plume')">
      <img v-else style="border-radius: 10px;position: absolute;width: 70px;top: 210px;left: 60px"  src="../../assets/image/prop/2.png" @click="change('plume')">
      <img v-if="JSON.stringify(role.artifacts.circlet) !== '{}'" style="border-radius: 10px;position: absolute;width: 70px;top: 210px;left: 150px"  :src="role.artifacts.circlet.cover" @click="change('circlet')">
      <img v-else style="border-radius: 10px;position: absolute;width: 70px;top: 210px;left: 150px"  src="../../assets/image/prop/5.png" @click="change('circlet')">
    </div>
    <div v-if="type === 'artifacts'" style="position: absolute" >
      <div  style="width: 425px;display: flex;flex-wrap:wrap;overflow-x:auto;height: fit-content;max-height: 600px;opacity: 0.8">
        <div v-for="item in artifacts" :key="item.id" @click="artifact = item" :class="artifact.id === item.id ? 'active hover' : 'hover'"
             style="width: 100px;height: 120px;padding: 5px;display: flex;flex-direction: column;align-items: center;position: relative">
          <img style="width: 90px;height: 90px;border-radius: 8px 8px 0 0" :src="item.cover" alt="">
          <div style="height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
            +{{item.level}}
          </div>
          <img style="position: absolute;top: 0;right: 0;width: 30px;border-radius: 50px" v-if="item.role.name !== ''" :src="item.role.cover" alt="">
        </div>
      </div>
    </div>
    <div v-if="type === 'weapons'" style="position: absolute" >
      <div  style="width: 425px;display: flex;flex-wrap:wrap;overflow-x:auto;height: fit-content;max-height: 600px;opacity: 0.8">
        <div v-for="item in weaponList" :key="item.id" @click="weapon = item" :class="weapon.id === item.id ? 'active hover' : 'hover'"
             style="width: 100px;height: 120px;padding: 5px;display: flex;flex-direction: column;align-items: center;position: relative">
          <img style="width: 90px;height: 90px;border-radius: 8px 8px 0 0" :src="item.cover" alt="">
          <div style="height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
            Lv.{{item.level}}
          </div>
          <img style="position: absolute;top: 0;right: 0;width: 30px;border-radius: 50px" v-if="item.role.name !== ''" :src="item.role.cover" alt="">
        </div>
      </div>
    </div>
    <div style="width: 495px;height: 600px;position: absolute;left: 425px" @click="type = 'base'">

    </div>
    <div :class="role.vision" v-if="type === 'base'" style="position: absolute;right: 0;width: 320px;opacity: 0.9">
      <div style="display: flex;flex-direction: column;height: 600px;border-radius: 5px;padding: 0 20px">
        <div  style="margin-top: 10px;width: 100%;color: #fff;font-weight: 700;font-size: 28px">
          {{role.name}}
        </div>
        <div  style="width: 100%;color: #fff;font-weight: 600;font-size: 24px">
          等级{{role.level}}
          <span class="add" v-if="(num > 0 && type1 === 'up') && role.level !== (role.rank - 1) * 10 + 40"> + {{num / 3}} </span>/ {{30 + role.rank * 10}}
          <span  v-if="role.level === (role.rank - 1) * 10 + 40 && type1 === 'up'" class="add"> + 10</span>
        </div>
        <div  style="margin-top: 10px;width: 100%;position: relative;height: 100%;color: #fff;font-weight: bold;font-size: 16px;padding: 0 5px;display: flex;flex-direction: column;">
          <div style="display: flex;justify-content: space-between;align-items: center ;border-radius: 5px">
            <div style="height: 25px;display: flex;align-items: center">
              <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/HP.png" alt="">
              <div style="height: 25px;line-height: 25px">生命值</div>
            </div>
            <div>{{Math.floor(stats.HP)}}
              <span class="add" v-if="(num > 0 && type1 === 'up') && role.level !== (role.rank - 1) * 10 + 40"> + {{Math.floor(role.stats.basicHP.increase * stats.H * num / 3)}}</span></div>
          </div>
          <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
            <div style="height: 25px;display: flex;align-items: center">
              <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/ATK.png" alt="">
              <div style="height: 25px;line-height: 25px">攻击力</div>
            </div>
            <div>{{Math.floor(stats.ATK)}}
              <span class="add" v-if="(num > 0 && type1 === 'up') && role.level !== (role.rank - 1) * 10 + 40"> + {{Math.floor(role.stats.basicATK.increase * stats.A * num / 3)}}</span></div>
          </div>
          <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
            <div style="height: 25px;display: flex;align-items: center">
              <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/DEF.png" alt="">
              <div style="height: 25px;line-height: 25px">防御力</div>
            </div>
            <div>{{Math.floor(stats.DEF)}}
              <span class="add" v-if="(num > 0 && type1 === 'up') && role.level !== (role.rank - 1) * 10 + 40"> + {{Math.floor(role.stats.basicDEF.increase * stats.D * num / 3)}}</span></div>
          </div>
          <div v-if="type1 === 'base'" style="height: 100%">
            <div style="width: 100%;border-radius: 20px;background-color: rgba(255,255,255,0.2);height: 30px;line-height: 30px;
          text-align: center;margin-top: 10px" @click="type1 = 'more'" class="hover">详细信息</div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 10px">
              <div style="height: 25px;display: flex;align-items: center">
                神之眼
              </div>
              <div>{{role.vision | visionType}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 10px">
              {{role.introduction}}
            </div>
            <div v-if="role.level !== 90" style="position: absolute;bottom: 20px;width: 100%">
              <div style="width: 70%;border-radius: 20px;background-color: rgba(0,0,0,0.4);height: 40px;line-height: 40px;margin: 0 auto;
          text-align: center" @click="type1 = 'up'" class="hover">{{role.level === (role.rank - 1) * 10 + 40 ? '突破' : '升级'}}</div>
            </div>
          </div>
          <div v-if="type1 === 'up'" style="height: 100%">

            <div  v-if="role.level === (role.rank - 1) * 10 + 40" style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
<!--                <img style="width: 20px;margin-right: 5px" :src="`../../assets/image/prop/CRITDMG.png`" alt="">-->
                <div style="height: 25px;line-height: 25px">{{role.ascend.effect | effectType}}</div>
              </div>
              <div>{{(stats[role.ascend.effect].toFixed(1))}}
                <span class="add"> + {{role.ascend.increase.toFixed(1)}}</span></div>
            </div>
            <div style="margin-top: 120px;display: flex;justify-content: center">
              <div v-if="role.level === (role.rank - 1) * 10 + 40" style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center">
                <img style="width: 90px;height: 90px;border-radius: 10px" :src="$store.getters.getUserData.inventory.materials.filter(item => item.name === role.ascend.material)[0].cover" alt="">
                <div style="height: 20px;line-height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
          <span :class="$store.getters.getUserData.inventory.materials.filter(item => item.name === role.ascend.material)[0].num >= Math.pow(2,role.rank - 1) ? '' : 'no'">
            {{$store.getters.getUserData.inventory.materials.filter(item => item.name === role.ascend.material)[0].num}}</span> / {{Math.pow(2,role.rank - 1)}}
                </div>
              </div>
              <div v-else  style="width: 110px;height: 130px;padding: 10px;display: flex;flex-direction: column;align-items: center">
                <img style="width: 90px;height: 90px;border-radius: 10px" :src="$store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].cover" alt="">
                <div style="height: 20px;line-height: 20px;width:100%;background-color: #E9E5DC;text-align: center;font-weight: 600;border-radius: 0 0 8px 8px">
                  {{$store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num}}
                </div>
              </div>

            </div>
            <div v-if="!(role.level === (role.rank - 1) * 10 + 40)" style="display: flex;align-items: center;width: 100%;margin-top: 10px">
              <div>使用数量</div>
              <div style="flex: 1;margin: 0 20px">
                <el-slider style="width: 100%"
                           :max="Math.min($store.getters.getUserData.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num,(40 + (role.rank - 1 ) * 10 - role.level) * 3)"
                           v-model="num"
                           :step="3">
                </el-slider>
              </div>
              <div>{{num}}</div>
            </div>
            <div style="position: absolute;bottom: 20px;width: 100%">
              <div style="margin: 0 auto;display: flex;justify-content: space-around">
                <div style="width: 40%;border-radius: 20px;background-color: rgba(0,0,0,0.4);height: 40px;line-height: 40px;
          text-align: center" @click="type1 = 'base'" class="hover">取消</div>
                <div v-if="!(role.level === (role.rank - 1) * 10 + 40)" style="width: 40%;border-radius: 20px;background-color: rgba(0,0,0,0.4);height: 40px;line-height: 40px;
          text-align: center" @click="up" class="hover">升级</div>
                <div v-else-if="$store.getters.getUserData.inventory.materials.filter(item => item.name === role.ascend.material)[0].num >= Math.pow(2,role.rank - 1)" style="width: 40%;border-radius: 20px;background-color: rgba(0,0,0,0.4);height: 40px;line-height: 40px;
          text-align: center" @click="ascend" class="hover">突破</div>
                <div v-else style="width: 40%;border-radius: 20px;background-color: rgba(0,0,0,0.4);height: 40px;line-height: 40px;
          text-align: center" >材料不足</div>
              </div>
            </div>
          </div>
          <div v-if="type1 === 'more'" @click="type1 = 'base'">
            <div style="margin-top: 5px">进阶属性</div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/CRITRate.png" alt="">
                <div style="height: 25px;line-height: 25px">暴击率</div>
              </div>
              <div>{{stats.CRITRate.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/CRITDMG.png" alt="">
                <div style="height: 25px;line-height: 25px">暴击伤害</div>
              </div>
              <div>{{stats.CRITDMG.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/energyRecharge.png" alt="">
                <div style="height: 25px;line-height: 25px">充能效率</div>
              </div>
              <div>{{stats.energyRecharge.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/healingBonus.png" alt="">
                <div style="height: 25px;line-height: 25px">治疗加成</div>
              </div>
              <div>{{stats.healingBonus.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/DEF.png" alt="">
                <div style="height: 25px;line-height: 25px">护盾强效</div>
              </div>
            <div>{{stats.shieldStrength.toFixed(1)}}</div>
            </div>
            <div style="margin-top: 5px">元素属性</div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/physicalDMGBonus.png" alt="">
                <div style="height: 25px;line-height: 25px">物理伤害加成</div>
              </div>
              <div>{{stats.physicalDMGBonus.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/pyroDMGBonus.png" alt="">
                <div style="height: 25px;line-height: 25px">火元素伤害加成</div>
              </div>
              <div>{{stats.pyroDMGBonus.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/hydroDMGBonus.png" alt="">
                <div style="height: 25px;line-height: 25px">水元素伤害加成</div>
              </div>
              <div>{{stats.hydroDMGBonus.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/electroDMGBonus.png" alt="">
                <div style="height: 25px;line-height: 25px">雷元素伤害加成</div>
              </div>
              <div>{{stats.electroDMGBonus.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/anemoDMGBonus.png" alt="">
                <div style="height: 25px;line-height: 25px">风元素伤害加成</div>
              </div>
              <div>{{stats.anemoDMGBonus.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/cryoDMGBonus.png" alt="">
                <div style="height: 25px;line-height: 25px">冰元素伤害加成</div>
              </div>
              <div>{{stats.cryoDMGBonus.toFixed(1)}}</div>
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 5px">
              <div style="height: 25px;display: flex;align-items: center">
                <img style="width: 20px;margin-right: 5px" src="../../assets/image/prop/geoDMGBonus.png" alt="">
                <div style="height: 25px;line-height: 25px">岩元素伤害加成</div>
              </div>
              <div>{{stats.geoDMGBonus.toFixed(1)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="type === 'artifacts'" style="position: absolute;right: 0;width: 380px;opacity: 0.9">
      <div style="display: flex;flex-direction: column;height: 600px;border-radius: 5px;">
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
          <div :class="(artifact.name1 === two[0] || artifact.name1 === two[1]) && artifact.role.name === role.name ? 'active1' : ''" style="margin-top: 10px;color: green">{{artifact.name1}}</div>
          <div :class="(artifact.name1 === two[0] || artifact.name1 === two[1]) && artifact.role.name === role.name ? 'active1' : ''" style="margin-top: 10px;color: #707580;margin-left: 20px">2件套: {{artifact.pieceSet.type | effectType}}提高{{artifact.pieceSet.num}}</div>
          <div :class="artifact.name1 === four[0] && artifact.role.name === role.name ? 'active1' : ''" style="margin-top: 10px;color: #707580;margin-left: 20px">4件套: {{artifact.pieceSet.type | effectType}}提高{{artifact.pieceSet.num * 2}}</div>
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
    <div v-if="type === 'weapons'" style="position: absolute;right: 0;width: 380px;opacity: 0.9">
      <div style="display: flex;flex-direction: column;height: 600px;border-radius: 5px;">
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
        <div style="height: 350px;background-color: #E3DDD2;font-size: 18px;font-weight: 600;display: flex;flex-direction: column;padding: 20px">
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
    <img style="width: 1300px;height: 600px" :src="role.background1" alt="">
  </div>
  <div style="height: 70px;display: flex;justify-content: space-between;align-items: center">
    <div>.</div>
    <div>
      <div v-if="type === 'artifacts'" style="margin-right: 10px">
        <el-button v-if="artifact.role.name !== role.name" @click="equip(artifact.part)" style="width:120px;font-size: 18px;font-weight: 600;color: #000" type="warning" round>装备</el-button>
        <el-button v-else @click="remove(artifact.part)" style="width:120px;font-size: 18px;font-weight: 600;color: #000" type="warning" round>卸下</el-button>
      </div>
      <div v-if="type === 'weapons'" style="margin-right: 10px">
        <el-button v-if="weapon.role.name !== role.name"  @click="equip('weapon')" style="width:120px;font-size: 18px;font-weight: 600;color: #000" type="warning" round>装备</el-button>
        <el-button v-else @click="remove('weapon')" style="width:120px;font-size: 18px;font-weight: 600;color: #000" type="warning" round>卸下</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {setUser} from "@/network/user";

export default {
  name: "Role",
  data() {
    return {
      role: {},
      type: 'base',
      type1: 'base',
      artifacts: [],
      artifact: {},
      weapons: [],
      weapon: {},
      effect2: [],
      effect4: {},
      num: 0
    }
  },
  methods: {
    change(part) {
      if(part === 'weapons') {
        this.type = 'weapons'
        if(JSON.stringify(this.role.weapon)  !== '{}') {
          this.weapon = this.role.weapon
        }
      } else {
        this.type = 'artifacts'
        this.artifacts = this.artifactList.filter(item => item.part === part)
        if(JSON.stringify(this.role.artifacts[part]) !== '{}') {
          this.artifact = this.role.artifacts[part]
        } else {
          this.artifact = this.artifactList.filter(item => item.part === part)[0]
        }
      }

    },
    setUser(user) {
      setUser(user).then(res => {
        this.$store.commit('updata',res.data.data.data)
      })
      this.weapons = this.weaponList.filter(item => item.type === this.role.type)
      this.artifacts = this.artifactList.filter(item => item.part === this.artifact.part)
      this.type = 'base'
    },
    equip(part) {
      if(part === 'weapon') {
        let user = this.$store.getters.getUserData
        let role = user.roles.find((item) => item.weapon.id === this.weapon.id)
        if(role !== undefined) {
          role.weapon = {}
          user.roles.splice(
              user.roles.findIndex((item) => item.name == role.name),
              1,
              role,
          )
        }
        let weapon = user.inventory.weapons.find((item) => item.role.name === this.role.name)
        if(weapon !== undefined) {
          weapon.role = {
            "name": "",
            "id": "",
            "cover": ""
          }
          user.inventory.weapons.splice(
              user.inventory.weapons.findIndex((item) => item.id == weapon.id),
              1,
              weapon,
          )
        }
        this.role.weapon = this.weapon
        this.weapon.role = {
          name: this.role.name,
          id: this.role.id,
          cover: this.role.cover
        }
        user.roles.splice(
            user.roles.findIndex((item) => item.name == this.role.name),
            1,
            this.role,
        )
        user.inventory.weapons.splice(
            user.inventory.weapons.findIndex((item) => item.id == this.weapon.id),
            1,
            this.weapon,
        )
        this.setUser(user)
      } else {
        let user = this.$store.getters.getUserData
        let role = user.roles.find((item) => item.artifacts[part].id === this.artifact.id)
        if(role !== undefined) {
          role.artifacts[part] = {}
          user.roles.splice(
              user.roles.findIndex((item) => item.name == role.name),
              1,
              role,
          )
        }
        let artifact = user.inventory.artifacts.find((item) => item.role.name === this.role.name && item.part === part)
        if(artifact !== undefined) {
          artifact.role = {
            "name": "",
            "id": "",
            "cover": ""
          }
          user.inventory.artifacts.splice(
              user.inventory.artifacts.findIndex((item) => item.id == artifact.id),
              1,
              artifact,
          )
        }
        this.role.artifacts[part] = this.artifact
        this.artifact.role = {
          name: this.role.name,
          id: this.role.id,
          cover: this.role.cover
        }
        user.roles.splice(
            user.roles.findIndex((item) => item.name == this.role.name),
            1,
            this.role,
        )
        user.inventory.artifacts.splice(
            user.inventory.artifacts.findIndex((item) => item.id == this.artifact.id),
            1,
            this.artifact,
        )

        this.setUser(user)
      }
      // this.type = 'base'
    },
    remove(part) {
      if(part === 'weapon') {
        let user = this.$store.getters.getUserData
        this.role.weapon = {}
        this.weapon.role = {
          "name": "",
          "id": "",
          "cover": ""
        }
        user.roles.splice(
            user.roles.findIndex((item) => item.name == this.role.name),
            1,
            this.role,
        )
        user.inventory.weapons.splice(
            user.inventory.weapons.findIndex((item) => item.id == this.weapon.id),
            1,
            this.weapon,
        )
        this.setUser(user)
      } else {
        let user = this.$store.getters.getUserData
        this.role.artifacts[part] = {}
        this.artifact.role = {
          "name": "",
          "id": "",
          "cover": ""
        }
        user.roles.splice(
            user.roles.findIndex((item) => item.name == this.role.name),
            1,
            this.role,
        )
        user.inventory.artifacts.splice(
            user.inventory.artifacts.findIndex((item) => item.id == this.artifact.id),
            1,
            this.artifact,
        )
        setUser(user)
      }
      this.type = 'base'
      },
    up() {
      let add = this.num / 3
      this.role.level += add
      let user = this.$store.getters.getUserData
      user.roles.splice(
          user.roles.findIndex((item) => item.name == this.role.name),
          1,
          this.role,
      )
      user.inventory.materials.filter(item => item.name === '大英雄的经验')[0].num += -this.num
      this.type1 = 'base'
      this.setUser(user)
    },
    ascend() {
      let user = this.$store.getters.getUserData
      user.inventory.materials.filter(item => item.name === this.role.ascend.material)[0].num += -Math.pow(2,this.role.rank - 1)
      this.role.rank++
      user.roles.splice(
          user.roles.findIndex((item) => item.name == this.role.name),
          1,
          this.role,
      )
      this.type1 = 'base'
      this.setUser(user)

    },
  },
  computed: {
    rolesList() {
      return this.$store.getters.getUserData.roles.sort((a,b) => b.weight - a.weight)
    },
    weaponList() {
      return this.$store.getters.getUserData.inventory.weapons.filter(item => item.type === this.role.type).sort((a,b) => b.weight - a.weight)
    },
    materialList() {
      return this.$store.getters.getUserData.inventory.materials.sort((a,b) => b.weight - a.weight)
    },
    artifactList() {
      return this.$store.getters.getUserData.inventory.artifacts.sort((a,b) => b.level - a.level)
    },
    two() {
      let list = []
      this.effect2 = []
      let map = new Map
      for (let item in this.role.artifacts) {
        if(map.has(this.role.artifacts[item].name1)) {
          map.set(this.role.artifacts[item].name1,map.get(this.role.artifacts[item].name1) + 1)
          if(map.get(this.role.artifacts[item].name1) === 2) {
            list.push(this.role.artifacts[item].name1)
            // this.effect2.push({
            //   type: this.role.artifacts[item].pieceSet.type,
            //   num: this.role.artifacts[item].pieceSet.num
            // })
          }
        } else {
          map.set(this.role.artifacts[item].name1,1)
        }
      }
      return list
    },
    four() {
      let list = []
      this.effect4 = []
      let map = new Map
      for (let item in this.role.artifacts) {
        if(map.has(this.role.artifacts[item].name1)) {
          map.set(this.role.artifacts[item].name1,map.get(this.role.artifacts[item].name1) + 1)
          if(map.get(this.role.artifacts[item].name1) === 4) {
            list.push(this.role.artifacts[item].name1)
            // this.effect4.push({
            //   type: this.role.artifacts[item].pieceSet.type,
            //   num: this.role.artifacts[item].pieceSet.num
            // })
          }
        } else {
          map.set(this.role.artifacts[item].name1,1)
        }
      }
      return list
    },
    stats() {
        let {stats,level,weapon,artifacts,ascend,rank} = this.role
      let stats1 = {
        basicHP: {},
        basicATK: {},
        basicDEF: {},
        HP: 0,
        ATK: 0,
        DEF: 0,
        CRITRate: 5,
        CRITDMG: 50,
        energyRecharge: 100,
        healingBonus: 0,
        shieldStrength: 0,
        physicalDMGBonus: 0,
        elementDMGBonus: 0,
        pyroDMGBonus: 0,
        hydroDMGBonus: 0,
        electroDMGBonus: 0,
        anemoDMGBonus: 0,
        cryoDMGBonus: 0,
        geoDMGBonus: 0
      }
        stats1.basicHP.num = stats.basicHP.increase * (level - 1) + stats.basicHP.basic
      stats1.basicATK.num = stats.basicATK.increase * (level - 1) + stats.basicATK.basic
        stats1.basicDEF.num = stats.basicDEF.increase * (level - 1) + stats.basicDEF.basic
      if(JSON.stringify(weapon) !== '{}')  {
        stats1.basicATK.num += weapon.ATK
        stats1[weapon.secondary.type] += weapon.secondary.num
        stats1[weapon.effect.type] += weapon.effect.num
      }
        for(let item in artifacts) {
          if(JSON.stringify(artifacts[item]) !== '{}') {
            stats1[artifacts[item].effect.type] += artifacts[item].effect.num
            artifacts[item].effects.map(item => {
              stats1[item.type] += item.num
            })
          }
        }
        stats1[ascend.effect] += ascend.increase * (rank - 1)
        // if(this.effect4.length !== 0) {
        //   this.effect2.map(item => {
        //     stats[item.type] += item.num
        //   })
        // } else if (this.effect2.length !== 0) {
        //   this.effect2.map(item => {
        //     stats[item.type] += item.num
        //   })
        // }


          stats1.pyroDMGBonus += stats1['elementDMGBonus']
      stats1.hydroDMGBonus += stats1['elementDMGBonus']
          stats1.electroDMGBonus += stats1['elementDMGBonus']
          stats1.anemoDMGBonus += stats1['elementDMGBonus']
      stats1.cryoDMGBonus += stats1['elementDMGBonus']
      stats1.geoDMGBonus += stats1['elementDMGBonus']
      stats1.A = 1 + stats1.ATK / 100
      stats1.H = 1 + stats1.HP / 100
      stats1.D = 1 + stats1.DEF / 100
        stats1.ATK = (1 + stats1.ATK / 100) * stats1.basicATK.num
        stats1.HP = (1 + stats1.HP / 100) * stats1.basicHP.num
        stats1.DEF = (1 + stats1.DEF / 100) * stats1.basicDEF.num
        return stats1

    },
  },
  created() {
    this.role = this.$store.getters.getUserData.roles.sort((a,b) => b.weight - a.weight)[0]
    this.artifact = this.$store.getters.getUserData.inventory.artifacts.sort((a,b) => b.level - a.level)[0]
    this.weapon = this.$store.getters.getUserData.inventory.weapons.filter(item => item.type === this.role.type).sort((a,b) => b.weight - a.weight)[0]
  }
}
</script>

<style scoped>
.geo{
  background-color: rgba(159,134,53,0.5)
}

.anemo{
  background-color: rgba(41,143,131,0.5)
}

.cryo{
  background-color: rgba(57,155,184,0.5)
}

.electro{
  background-color: rgba(136,72,165,0.5)
}

.hydro{
  background-color: rgba(34,101,182,0.5)
}

.pyro{
  background-color: rgba(147,52,38,0.5)
}

.active {
  transform: scale(1.1);

  /*border: #fff solid 1px;*/

}

.active1 {
  color: #8EF380!important;
}

.add {
  color: #FFCC32;
}

.no {
  color: #FF5F40;
}

</style>