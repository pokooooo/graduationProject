<template>
  <div>
    <el-table :data="artifactsList" border stripe>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="特效">
        <template slot-scope="scope">
          <div>{{scope.row.pieceSet.type | effectType}}：{{scope.row.pieceSet.num}}</div>
        </template>
      </el-table-column>
      <el-table-column label="生之花">
        <template slot-scope="scope">
          <div>{{scope.row.parts[0].name}}</div>
          <img :src="scope.row.parts[0].cover" alt="" class="cover" />
        </template>
      </el-table-column>
      <el-table-column label="死之羽">
        <template slot-scope="scope">
          <div>{{scope.row.parts[1].name}}</div>
          <img :src="scope.row.parts[1].cover" alt="" class="cover" />
        </template>
      </el-table-column>
      <el-table-column label="时之沙">
        <template slot-scope="scope">
          <div>{{scope.row.parts[2].name}}</div>
          <img :src="scope.row.parts[2].cover" alt="" class="cover" />
        </template>
      </el-table-column>
      <el-table-column label="空之杯">
        <template slot-scope="scope">
          <div>{{scope.row.parts[3].name}}</div>
          <img :src="scope.row.parts[3].cover" alt="" class="cover" />
        </template>
      </el-table-column>
      <el-table-column label="理之帽">
        <template slot-scope="scope">
          <div>{{scope.row.parts[4].name}}</div>
          <img :src="scope.row.parts[4].cover" alt="" class="cover" />
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

  </div>
</template>

<script>
import { deleteArtifact } from "@/network/artifacts";



export default {
  name: 'ArtifactsMain',

  data() {
    return {
      dialogVisible: false,
    }
  },
  props: {
    artifactsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    remove(id) {
      this.$confirm("是否删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            deleteArtifact({id}).then(() => {
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
        name: "addArtifact",
        params: {
          name: "编辑圣遗物",
          data: item
        },
      });
    },
  }


}
</script>

<style scoped>
.cover {
  width: 80%;
}
</style>
