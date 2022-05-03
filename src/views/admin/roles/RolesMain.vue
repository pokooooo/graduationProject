<template>
  <div>
    <el-table :data="rolesList" border stripe>
      <el-table-column label="角色名称" prop="name"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" class="cover" />
        </template>
      </el-table-column>
      <el-table-column label="神之眼" width="100">
        <template slot-scope="scope">
          <div>{{scope.row.vision | visionType}}</div>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="100">
        <template slot-scope="scope">
          <div>{{scope.row.type | weaponType}}</div>
        </template>
      </el-table-column>
      <el-table-column label="属性">
        <template slot-scope="scope">
          <div>生命值：{{scope.row.stats.ATk.basic}} + {{scope.row.stats.ATk.increase}}</div>
          <div>攻击力：{{scope.row.stats.HP.basic}} + {{scope.row.stats.HP.increase}}</div>
          <div>防御力：{{scope.row.stats.DEF.basic}} + {{scope.row.stats.DEF.increase}}</div>
        </template>
      </el-table-column>
      <el-table-column label="突破">
        <template slot-scope="scope">
          <div>材料：{{scope.row.ascend.material}}</div>
          <div>加成：{{scope.row.ascend.effect | effectType}}</div>
          <div>数值：{{scope.row.ascend.increase}}%</div>
        </template>
      </el-table-column>
      <el-table-column label="权重" width="80" prop="weight"></el-table-column>
      <el-table-column label="状态" width="100" prop="status">
        <template slot-scope="scope">
          {{ scope.row.status === 2 ? "下架中" : "上架中" }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280px">
        <template slot-scope="scope">
          <el-button
              type="primary"
              icon="el-icon-edit"
              @click="set(scope.row)"
          ></el-button>
          <el-button
              v-if="scope.row.status === 2"
              type="primary"
              icon="el-icon-upload2"
              @click="up(scope.row.id)"
          ></el-button>
          <el-button
              v-else
              type="primary"
              icon="el-icon-download"
              @click="down(scope.row.id)"
          ></el-button>
          <el-button
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row.id)"
          ></el-button>
          <el-button
              type="primary"
              icon="el-icon-setting"
              @click="setweight(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="设置权重" :visible.sync="dialogVisible" width="30%">
      <el-input-number v-model="weight" :min="0" :max="100"></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setWeight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>


import {deleteRole, downRole, setWeight, upRole} from "@/network/roles";


export default {
  name: 'RolesMain',
  props: {
    rolesList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      weight: 0,
      id: ""
    }
  },
  methods: {
    down(id) {
      downRole({id});
      this.$message.success("下架成功!");
      this.$emit("refresh");
    },
    up(id) {
      upRole({id});
      this.$message.success("上架成功!");
      this.$emit("refresh");
    },
    setweight(item) {
      this.dialogVisible = true;
      this.weight = item.weight;
      this.id = item.id;
    },
    setWeight() {
      setWeight({id: this.id, weight: this.weight})
      this.$emit("refresh");
      this.$message.success("设置成功!");
      this.dialogVisible = false;
    },
    remove(id) {
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            deleteRole({id}).then(() => {
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
      this.$router.push({
        name: "addRole",
        params: {
          name: "编辑角色",
          data: item
        },
      });
    }
  }

}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}

.cover {
  width: 80%;
}
</style>
