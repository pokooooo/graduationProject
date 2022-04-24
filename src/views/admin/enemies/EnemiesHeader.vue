<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加敌人</el-button>
      </el-col>
    </el-row>
    <el-dialog
        title="添加敌人"
        :visible.sync="dialogVisible"
        width="30%"
        @close="closeForm"
    >
      <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addForm"
          label-width="80px"
      >
        <el-form-item prop="name" label="敌人名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="敌人介绍">
          <el-input type="textarea" v-model="addForm.introduction"></el-input>
        </el-form-item>
        <el-form-item prop="HP" label="基准生命倍率">
          <el-input type="number" v-model.number="addForm.HP"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="基准攻击倍率">
          <el-input type="number" v-model.number="addForm.AKT"></el-input>
        </el-form-item>
        <el-form-item label="敌人类型" >
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="敌人图像">
          <el-upload
              class="cover-uploader"
              action="/api/console/form/upload_v2"
              :show-file-list="false"
              :on-change="handleChange"
          >
            <img v-if="addForm.cover" :src="addForm.cover" class="cover" />
            <i v-else class="el-icon-plus cover-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEnemies">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {addEnemies} from "@/network/enemies";

import SelectInput from "../../../components/select/Input.vue"



export default {
  name: 'EnemiesHeader',
  components: {
    SelectInput
  },
  data() {
    return {
      dialogVisible: false,
      addForm: {
        name: "",
        introduction: "",
        type: "",
        AKT: 0,
        HP: 0,
        cover: "",
      },
      addFormRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        introduction: [],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        ATK: [{ required: true, message: "请输入倍率", trigger: "blur" }],
        HP: [{ required: true, message: "请输入倍率", trigger: "blur" }],
      },
      typeOptions:  [{
        value: 'normal',
        label: '普通'
      }, {
        value: 'elite',
        label: '精英'
      }, {
        value: 'boss',
        label: '首领'
      }]
    }
  },
  methods: {
    closeForm() {
      this.$refs.addForm.resetFields();
      this.addForm.cover = "";
    },
    handleChange(info) {
      //循环执行，所以要判断，在加载中的话跳过
      if (info.status === "ready") {
        return;
      }
      if (info.status === "success") {
        let cover = info.response.data.file;
        cover = "http://localhost:3000" + cover;
        this.addForm.cover = cover;
        this.addForm.name = info.name.slice(0, info.name.indexOf("."));
      }
    },
    addEnemies() {
      console.log(this.addForm)
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addEnemies(this.addForm).then((res) => {
            this.$message.success("添加成功！");
            this.dialogVisible = false;
            this.$emit("refresh");
          });
        } else {
          this.$message.error("输入信息有误！");
        }
      });
    },
    select(text) {
      this.$emit("select", text);
    }
  }
}
</script>

<style scoped>
.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.cover {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
