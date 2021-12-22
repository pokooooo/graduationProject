<template>
  <div>
    <el-table :data="goodsList" border stripe>
      <el-table-column label="商品名称" prop="title"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="" class="avatar" />
        </template>
      </el-table-column>
      <el-table-column label="购买上限">
        <template slot-scope="scope">
          {{ scope.row.limit === 0 ? "无" : scope.row.limit }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.ctime | dataFormat }}
        </template>
      </el-table-column>
      <el-table-column label="权重" prop="weight"></el-table-column>
      <el-table-column label="状态" prop="status">
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
import { deleteGoods, upGoods, downGoods, setweight } from "@/network/goods";

export default {
  name: 'RichMain',
  
  data() {
    return {
      dialogVisible: false,
      weight: 0,
      id: ""
    }
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
  down(id) {
    downGoods(id);
    this.$message.success("下架成功!");
    this.$emit("refresh");
  },
  up(id) {
    upGoods(id);
    this.$message.success("上架成功!");
    this.$emit("refresh");
  },
  setweight(item) {
    this.dialogVisible = true;
    this.weight = item.weight;
    this.id = item.id;
  },
  setWeight() {
    setweight(this.id, this.weight)
    this.$emit("refresh");
    this.$message.success("设置成功!");
    this.dialogVisible = false;
  },
  remove(id) {
    this.$confirm("是否删除该商品?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        deleteGoods(id).then((res) => {
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
      name: "add",
      params: {
        name: "编辑商品",
        title: item.title,
        price: item.price,
        cover: item.cover,
        limit: item.limit,
        id: item.id,
      },
    });
  },
  }



}
</script>

<style scoped>
.avatar {
  width: 80%;
}
</style>
