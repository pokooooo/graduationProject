<template>
  <div>
    <el-card>
    <el-row :gutter="20">
      <el-col :span="8">
        <select-input :typeList="[{label: '昵称',value: 'nickname'},{label: '账号',value: 'account'}]" @select="select"></select-input>
      </el-col>
    </el-row>
    <users-main :usersList="usersList"></users-main>
    </el-card>
    <pagination
      :data="data"
      :total="total"
      @setNewSize="setNewSize"
      @setNewPage="setNewPage"
    ></pagination>
  </div>
</template>

<script>


import Pagination from "@/components/pagination/Pagination.vue";
import SelectInput from "@/components/select/SelectInput.vue";
import UsersMain from "@/components/main/UsersMain.vue";
import { searchUsers } from "@/network/users";



export default {
  name: 'Users',
  components: {
    SelectInput,
    UsersMain,
    Pagination,
  },
  data() {
    return {
      usersList: [],
      data: {
        pageIndex: 1,
        pageSize: 5,
        keyword: "",
        type: "nickname"
      },
      total: 0
      }
  },

  methods: {
  refresh() {
    this.selectRich();
  },
  select({keyword,type}) {
    this.data.keyword = keyword;
    this.data.type = type;
    this.refresh();
  },
  setNewSize(newSize) {
    this.data.pageSize = newSize;
    this.refresh();
  },
  setNewPage(newPage) {
    this.data.pageIndex = newPage;
    this.refresh();
  },
  selectRich() {
    searchUsers(this.data).then((res) => {
      this.usersList = res.data.data.items;
      this.total = res.data.data.total;
    });
  }
  },
  created() {
    this.selectRich();
  }
}
</script>

<style scoped></style>
