<template>
  <div>
    <el-table :data="enemiesList" border stripe>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" class="cover" />
        </template>
      </el-table-column>
      <el-table-column label="基准生命倍率" prop="HP"></el-table-column>
      <el-table-column label="基准攻击倍率"prop="AKT"></el-table-column>
      <el-table-column label="类型" width="80">
        <template slot-scope="scope">
          {{scope.row.type | enemiesType}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button
              type="primary"
              icon="el-icon-edit"
              @click="set(scope.row)"
          ></el-button>
          <el-button
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑人物" :visible.sync="dialogVisible1" width="30%">
      <el-form
          :model="setForm"
          :rules="setFormRules"
          ref="setForm"
          label-width="80px"
      >
        <el-form-item prop="name" label="敌人名称">
          <el-input v-model="setForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="敌人介绍">
          <el-input type="textarea" v-model="setForm.introduction"></el-input>
        </el-form-item>
        <el-form-item prop="HP" label="基准生命倍率">
          <el-input type="number" v-model.number="setForm.HP"></el-input>
        </el-form-item>
        <el-form-item prop="introduction" label="基准攻击倍率">
          <el-input type="number" v-model.number="setForm.AKT"></el-input>
        </el-form-item>
        <el-form-item label="敌人类型" >
          <el-select v-model="setForm.type" placeholder="请选择">
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
            <img v-if="setForm.cover" :src="setForm.cover" class="cover" />
            <i v-else class="el-icon-plus cover-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitSet">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {deleteEnemies, upEnemies, downEnemies, setWeight, setEnemies} from "@/network/enemies";




export default {
  name: 'EnemiesMain',

  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      setForm: {
        name: "",
        introduction: "",
        type: "",
        AKT: 0,
        HP: 0,
        cover: "",
      },
      setFormRules: {
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
  props: {
    enemiesList: {
      type: Array,
      default() {
        return []
      }
    }
  },

  methods: {
    remove(id) {
      this.$confirm("是否删除该敌人?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            deleteEnemies({id}).then(() => {
              this.$message.success("删除成功!");
              this.$emit("refresh");
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    set(item) {
      this.dialogVisible1 = true;
      this.setForm = item
    },
    handleChange(info) {
      //循环执行，所以要判断，在加载中的话跳过
      if (info.status === "ready") {
        return;
      }
      if (info.status === "success") {
        let cover = info.response.data.file;
        cover = "http://localhost:3000" + cover;
        this.setForm.cover = cover;
        this.setForm.name = info.name.slice(0, info.name.indexOf("."));
      }
    },
    commitSet() {
      this.$refs.setForm.validate((valid) => {
        if (valid) {
          setEnemies(this.setForm).then((res) => {
            this.dialogVisible1 = false;
            this.$emit("refresh");
            this.$message.success("编辑成功!");
          });
        } else {
          this.$message.error("输入信息有误！");
        }
      });
    }
  }


}
</script>

<style scoped>
.cover {
  width: 80%;
}
</style>
