<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加秘境</el-button>
      </el-col>
    </el-row>
    <el-dialog
        title="添加秘境"
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
        <el-form-item prop="name" label="秘境名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="秘境介绍">
          <el-input type="textarea" v-model="addForm.introduction"></el-input>
        </el-form-item>
        <el-form-item label="秘境类型" >
          <el-select v-model="addForm.type" @change="change" placeholder="请选择">
            <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="掉落">
          <el-select v-model="addForm.list" multiple placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="秘境图像">
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
        <el-button type="primary" @click="addDomain">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {addDomain} from "@/network/domains";

import SelectInput from "../../../components/select/Input.vue"
import {selectMaterial} from "@/network/materials";
import {selectArtifact} from "@/network/artifacts";



export default {
  name: 'DomainsHeader',
  components: {
    SelectInput
  },
  data() {
    return {
      dialogVisible: false,
      options: [],
      materialsList: [],
      artifactsList: [],
      addForm: {
        name: "",
        introduction: "",
        type: "",
        list: [],
        cover: "",
        weight: 0
      },
      addFormRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }],
        introduction: [],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
      },
      typeOptions:  [{
        value: 'artifact',
        label: '圣遗物'
      }, {
        value: 'role',
        label: '角色突破素材'
      }, {
        value: 'weapon',
        label: '武器突破素材'
      }, {
        value: 'talent',
        label: '角色天赋素材'
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
    change(value) {
      this.options = []
      let type = 12
      if(value === 'role') {
        type = 5
      } else if(value === 'weapon') {
        type = 4
      } else if(value === 'talent') {
        type = 3
      }
      if(type === 12) {
        this.artifactsList.map(item => {
          this.options.push({
            label: item.name,
            value: item.id
          })
        })
      } else {
        this.materialsList.map(item => {
          if(item.weight === type) {
            this.options.push({
              label: item.name,
              value: item.id
            })
          }
        })
      }
      this.addForm.weight = type
    },
    addDomain() {

      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addDomain(this.addForm).then((res) => {
            this.$message.success("添加成功！");
            this.dialogVisible = false;
            this.addForm.list = []
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
  },
  created() {
    selectMaterial({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      this.materialsList = res.data.data.items
    });
    selectArtifact({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      this.artifactsList = res.data.data.items
    });
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
  width: 360px;

  display: block;
}
</style>
