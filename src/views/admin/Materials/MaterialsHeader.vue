<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加材料</el-button>
      </el-col>
    </el-row>
    <el-dialog
        title="添加材料"
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
        <el-form-item prop="name" label="材料名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="get" label="材料来源">
          <el-input type="textarea" v-model="addForm.get"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="材料描述">
          <el-input type="textarea" v-model="addForm.introduction"></el-input>
        </el-form-item>
        <el-form-item prop="purpose" label="材料用途">
          <el-input type="textarea" v-model="addForm.purpose"></el-input>
        </el-form-item>
        <el-form-item label="材料图像">
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
        <el-button type="primary" @click="addMaterial">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {addMaterial} from "@/network/materials";

import SelectInput from "../../../components/select/Input.vue"



export default {
  name: 'MaterialsHeader',
  components: {
    SelectInput
  },
  data() {
    return {
      dialogVisible: false,
      addForm: {
        name: "",
        get: "菫色之庭",
        introduction: "",
        purpose: "角色天赋素材",
        cover: "",
      },
      addFormRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        introduction: [{ required: true, message: "请输入描述", trigger: "blur" }],
        get: [{ required: true, message: "请输入来源", trigger: "blur" }],
        purpose: [{ required: true, message: "请输入用途", trigger: "blur" }],
      },

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
    addMaterial() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addMaterial(this.addForm).then((res) => {
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
