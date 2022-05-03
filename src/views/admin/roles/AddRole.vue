<template>
  <div>
    <el-card>
      <el-alert
          :title="title"
          type="info"
          center
          close-text="返回"
          :show-icon="false"
          @close="back"
      ></el-alert>
      <el-steps
          :space="300"
          :active="activeIndex * 1"
          finish-status="success"
          align-center
      >
        <el-step title="角色图片"></el-step>
        <el-step title="基本资料"></el-step>
        <el-step title="角色属性"></el-step>
        <el-step title="角色特效"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form ref="form" :model="addForm" label-position="top">
        <el-tabs
            tab-position="left"
            v-model="activeIndex"
            :before-leave="beforeLeave"
        >
          <el-tab-pane label="角色图片" name="0">
            <el-upload
                class="avatar-uploader"
                action="/api/console/form/upload_v2"
                :show-file-list="false"
                :on-change="handleChange"
            >
              <img v-if="addForm.cover" :src="addForm.cover" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload
                class="avatar-uploader"
                action="/api/console/form/upload_v2"
                :show-file-list="false"
                :on-change="handleChange1"
            >
              <img v-if="addForm.background" :src="addForm.background" class="avatar1"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="基本资料" name="1">
            <el-form-item label="角色名称" >
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="角色类型" >
              <el-select v-model="addForm.type" placeholder="请选择">
                <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色神之眼" >
              <el-select v-model="addForm.vision" placeholder="请选择">
                <el-option
                    v-for="item in visionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色星级" >
              <el-select v-model="addForm.star" placeholder="请选择">
                <el-option
                    v-for="item in starOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色描述" >
              <el-input type="textarea" v-model="addForm.introduction"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="基础属性" name="2">
            <el-form-item label="基础生命值" >
              <el-input type="number" v-model.number="addForm.stats.ATk.basic"></el-input>
            </el-form-item>
            <el-form-item label="生命值成长" >
              <el-input type="number" v-model.number="addForm.stats.ATk.increase"></el-input>
            </el-form-item>
            <el-form-item label="基础攻击力" >
              <el-input type="number" v-model.number="addForm.stats.HP.basic"></el-input>
            </el-form-item>
            <el-form-item label="攻击力成长" >
              <el-input type="number" v-model.number="addForm.stats.HP.increase"></el-input>
            </el-form-item>
            <el-form-item label="基础防御力" >
              <el-input type="number" v-model.number="addForm.stats.DEF.basic"></el-input>
            </el-form-item>
            <el-form-item label="防御力成长" >
              <el-input type="number" v-model.number="addForm.stats.DEF.increase"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="角色突破" name="3">
            <el-form-item label="突破材料" >
              <el-select v-model="addForm.ascend.material" placeholder="请选择">
                <el-option
                    v-for="item in materialOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="突破加成" >
              <el-select v-model="addForm.ascend.effect" placeholder="请选择">
                <el-option
                    v-for="item in effectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item type="number" label="加成数值" >
              <el-input type="number" v-model.number="addForm.ascend.increase"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="完成" name="5">
            <el-button
                type="primary"
                v-if="title === '添加角色'"
                @click="addRole"
                style="margin-top: 20px"
            >添加角色
            </el-button
            >
            <el-button
                type="primary"
                v-else
                @click="setRole"
                style="margin-top: 20px"
            >修改角色
            </el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import {addRole ,setRole} from "@/network/roles";
import {selectMaterial} from "@/network/materials";


export default {
  name: 'AddRole',
  data() {
    return {
      materialOptions: [],
      addForm: {
        name: "",
        star: 4,
        vision: "",
        type: "",
        introduction: "",
        cover: "",
        background: "",
        stats: {
          ATk: {
            basic: 0,
            increase: 0,
            num: 0
          },
          HP: {
            basic: 0,
            increase: 0,
            num: 0
          },
          DEF: {
            basic: 0,
            increase: 0,
            num: 0
          },
        },
        ascend: {
          material: "",
          effect: '',
          increase: 0
        }
        },
      visionOptions: [{
        value: 'geo',
        label: '岩'
      }, {
        value: 'anemo',
        label: '风'
      }, {
        value: 'cryo',
        label: '冰'
      }, {
        value: 'electro',
        label: '雷'
      }, {
        value: 'hydro',
        label: '水'
      }, {
        value: 'pyro',
        label: '火'
      } ],
      starOptions: [{
        value: 4,
        label: '四星'
      }, {
        value: 5,
        label: '五星'
      }],
      typeOptions: [{
        value: 'bow',
        label: '弓'
      }, {
        value: 'catalyst',
        label: '法器'
      }, {
        value: 'sword',
        label: '单手剑'
      }, {
        value: 'claymore',
        label: '双手剑'
      }, {
        value: 'polearm',
        label: '长柄角色'
      }],
      effectOptions: [{
        value: 'ATK',
        label: '攻击力'
      }, {
        value: 'DEF',
        label: '防御力'
      }, {
        value: 'HP',
        label: '生命值'
      }, {
        value: 'CRITRate',
        label: '暴击率'
      }, {
        value: 'CRITDMG',
        label: '暴击伤害'
      }, {
        value: 'energyRecharge',
        label: '充能效率'
      },{
        value: 'healingBonus',
        label: '治疗加成'
      }, {
        value: 'shieldStrength',
        label: '护盾强效'
      }, {
        value: 'physicalDMGBonus',
        label: '物理伤害加成'
      },   {
        value: 'pyroDMGBonus',
        label: '火元素伤害加成'
      },{
        value: 'hydroDMGBonus',
        label: '水元素伤害加成'
      },{
        value: 'electroDMGBonus',
        label: '雷元素伤害加成'
      },{
        value: 'anemoDMGBonus',
        label: '风元素伤害加成'
      },{
        value: 'cryoDMGBonus',
        label: '冰元素伤害加成'
      },{
        value: 'geoDMGBonus',
        label: '岩元素伤害加成'
      },],
      title: "添加角色",
      limited: false,
      activeIndex: 0,
    }
  },
  methods: {
    handleChange(info) {
      if (info.status === "ready") {
        return;
      }
      if (info.status === "success") {
        let avatar = info.response.data.file;
        avatar = "http://localhost:3000" + avatar;
        this.addForm.cover = avatar;
        this.addForm.name = info.name.slice(0, info.name.indexOf("."));
      }
    },
    handleChange1(info) {
      if (info.status === "ready") {
        return;
      }
      if (info.status === "success") {
        let avatar = info.response.data.file;
        avatar = "http://localhost:3000" + avatar;
        this.addForm.background = avatar;
      }
    },
    addRole() {
      addRole(this.addForm).then((res) => {
        this.$message.success("添加成功！");
        this.$router.push("roles");
      });
    },
    setRole() {
      setRole(this.addForm).then(() => {
        console.log(this.addForm)
        this.$message.success("修改成功！");
        this.$router.push("roles");
      });
    },
    back() {
      this.$router.back();
    },
    beforeLeave(activeName, oldActiveName) {
      if (activeName === "5") {
        if((this.addForm.name === "")) {
          this.$message.error("请先补全角色信息");
          return false;
        } else {
          if(this.title === '添加角色') this.addRole()
          else this.setRole()
        }
      }
    }
  },
  created() {
    if (this.$route.params.name !== undefined) {
      this.title = this.$route.params.name;
      this.addForm = this.$route.params.data;
    }
    selectMaterial({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      console.log(res);
      res.data.data.items.map(item => {
        if(item.weight === 5) {
          this.materialOptions.push({value: item.name,label:item.name})
        }
      })
    })
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar1 {
  height: 178px;
  display: block;
}

/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>
