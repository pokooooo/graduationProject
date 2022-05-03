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
        <el-step title="基本资料"></el-step>
        <el-step title="生之花"></el-step>
        <el-step title="死之羽"></el-step>
        <el-step title="时之沙"></el-step>
        <el-step title="空之杯"></el-step>
        <el-step title="理之帽"></el-step>
      </el-steps>
      <el-form ref="form" :model="addForm" label-position="top">
        <el-tabs
            tab-position="left"
            v-model="activeIndex"
            :before-leave="beforeLeave"
        >
          <el-tab-pane label="基本资料" name="0">
            <el-form-item label="圣遗物名称" >
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="套装效果" >
              <el-select v-model="addForm.pieceSet.type" placeholder="请选择">
                <el-option
                    v-for="item in effectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item type="number" label="套装效果数值" >
              <el-input type="number" v-model.number="addForm.pieceSet.num"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane v-for="(item,index) in addForm.parts" :key="index"  :label="partsType(item.part)" :name="(index + 1) + ''">
            <el-form-item label="名称" >
              <el-input v-model="item.name"></el-input>
            </el-form-item>
            <el-form-item label="描述" >
              <el-input type="textarea" v-model="item.introduction"></el-input>
            </el-form-item>
            <el-upload
                class="avatar-uploader"
                action="/api/console/form/upload_v2"
                :show-file-list="false"
                :on-change="handleChange"
            >
              <img v-if="item.cover" :src="item.cover" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>

          <el-tab-pane label="完成" name="6">
<!--            <el-button-->
<!--                type="primary"-->
<!--                v-if="title === '添加圣遗物'"-->
<!--                @click="addArtifact"-->
<!--                style="margin-top: 20px"-->
<!--            >添加圣遗物-->
<!--            </el-button-->
<!--            >-->
<!--            <el-button-->
<!--                type="primary"-->
<!--                v-else-->
<!--                @click="setArtifact"-->
<!--                style="margin-top: 20px"-->
<!--            >修改圣遗物-->
<!--            </el-button-->
<!--            >-->
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import {addArtifact ,setArtifact} from "@/network/artifacts";


export default {
  name: 'AddArtifact',
  data() {
    return {
      addForm: {
        name: '',
        pieceSet: {
          type: '',
          num: ''
        },
        parts: [
          {
            part: "flower",
            name: "",
            cover: "",
            introduction: ""
          },
          {
            part: "plume",
            name: "",
            cover: "",
            introduction: ""
          },
          {
            part: "sands",
            name: "",
            cover: "",
            introduction: ""
          },
          {
            part: "goblet",
            name: "",
            cover: "",
            introduction: ""
          },
          {
            part: "circlet",
            name: "",
            cover: "",
            introduction: ""
          }
        ]

      },
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
      },{
        value: 'energyRecharge',
        label: '充能效率'
      },
        {
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
      },{
        value: 'healingBonus',
        label: '治疗加成'
      }, {
        value: 'shieldStrength',
        label: '护盾强效'
      }, {
        value: 'physicalDMGBonus',
        label: '物理伤害加成'
      }],
      title: "添加圣遗物",
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
        this.addForm.parts[this.activeIndex - 1].cover = avatar;
        this.addForm.parts[this.activeIndex - 1].name = info.name.slice(0, info.name.indexOf("."));
      }
    },
    addArtifact() {
      addArtifact(this.addForm).then((res) => {
        this.$message.success("添加成功！");
        this.$router.push("artifacts");
      });
    },
    setArtifact() {
      console.log(this.addForm)
      setArtifact(this.addForm).then(() => {
        console.log(this.addForm)
        this.$message.success("修改成功！");
        this.$router.push("artifacts");
      });
    },
    back() {
      this.$router.back();
    },
    beforeLeave(activeName, oldActiveName) {
      if (activeName === "6") {
        if((this.addForm.name === "")) {
          this.$message.error("请先补全圣遗物信息");
          return false;
        } else {
          if(this.title === '添加圣遗物') this.addArtifact()
          else this.setArtifact()
        }
      }
    }
  },
  computed: {
    partsType: function () {
      return type => {
        if(type === 'flower') return '生之花'
        if(type === 'plume') return '死之羽'
        if(type === 'sands') return '时之沙'
        if(type === 'goblet') return '空之杯'
        if(type === 'circlet') return '理之帽'
      }
    }
  },
  created() {
    if (this.$route.params.name !== undefined) {
      this.title = this.$route.params.name;
      this.addForm = this.$route.params.data;
    }
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

/deep/ input::-webkit-outer-spin-button,
/deep/ input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/ input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>
