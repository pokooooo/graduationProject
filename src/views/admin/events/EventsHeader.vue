<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input @select="select"></select-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible = true">添加卡池</el-button>
      </el-col>
    </el-row>
    <el-dialog
        title="添加卡池"
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
        <el-form-item prop="name" label="卡池名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="池子类型">
          <el-switch
              v-model="bool"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="武器池"
              inactive-text="角色池"
              @change="change"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="选择UP" >
          <el-select multiple collapse-tags v-model="addForm.UP" placeholder="请选择">
            <el-option-group
                v-for="group in UPOptions"
                :key="group.label"
                :label="group.label">
              <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="卡池时间">
          <el-date-picker
              v-model="addForm.time"
              type="datetimerange"
              value-format="timestamp"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="卡池图像">
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
        <el-button type="primary" @click="addEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {addEvent} from "@/network/events";

import SelectInput from "../../../components/select/Input.vue"
import {selectWeapon} from "@/network/weapons";



export default {
  name: 'EventHeader',
  components: {
    SelectInput
  },
  data() {
    return {
      bool: true,
      dialogVisible: false,
      addForm: {
        name: "",
        UP: [],
        type: "",
        cover: "",
        time: []
      },
      addFormRules: {
        name: [{required: true, message: "请输入名称", trigger: "blur"},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}],

      },
      typeOptions: [{
        value: 'weapon',
        label: '武器池'
      }, {
        value: 'role',
        label: '角色池'
      }],
      UPOptions: [{
        label: '五星',
        options: []
      }, {
        label: '四星',
        options: []
      }],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      rolesList: [],
      weaponList: []
    }},
  methods: {
    change(type) {
      if(type) {
        this.addForm.type = 'weapon'
        this.setUPOptions(this.weaponList)
      } else {
        this.addForm.type = 'role'
        this.setUPOptions(this.rolesList)
      }
    },
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
    addEvent() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addEvent(this.addForm).then((res) => {
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
    },
    setUPOptions(list) {
      this.UPOptions[0].options = []
      this.UPOptions[1].options = []
      list.map(item => {
        if(item.star === 5) {
          console.log(item)
          this.UPOptions[0].options.push({
            value: item.id,
            label: item.name
          })
        } else {
          this.UPOptions[1].options.push({
            value: item.id,
            label: item.name
          })
        }
      })
      console.log(this.UPOptions)
    }
  },
  created() {
    selectWeapon({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      this.weaponList = res.data.data.items
      this.addForm.type = 'weapon'
      this.setUPOptions(this.weaponList)
    })
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
