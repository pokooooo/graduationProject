<template>
<div class="event">
  <div style="height: 100px;display: flex;justify-content: space-between;align-items: center">
    <div>
      {{eventsList[index].type === 'weapon' ? '武器活动祈愿' : '角色活动祈愿'}}
    </div>
    <div></div>
  </div>
  <div style="width: 1300px">
      <el-carousel :initial-index="index" :autoplay="false" type="card" height="320px"  >
        <el-carousel-item   v-for="item in eventsList" :key="item.id">
          <img  :src="item.cover" alt="">
        </el-carousel-item>
      </el-carousel>
  </div>
  <div >
    <div>下次必得五星还差祈愿:{{50 - this.$store.getters.getUserData.weaponTime.big}}次</div>
    <div>下次必得五星还差祈愿:{{10 - this.$store.getters.getUserData.weaponTime.small}}次</div>
  </div>
  <div>
    <div></div>
    <div style="display: flex">
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 200px;height: 60px;color: #B4A08C;border-radius: 20px;border: #B4A08C solid 1px">
        <div >祈愿1次</div>
        <div ><img style="width: 14px" src="../../assets/image/prop/jiuchan.png">x1</div>
      </div>
      <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 200px;height: 60px;color: #B4A08C;border-radius: 20px;border: #B4A08C solid 1px">
        <div >祈愿10次</div>
        <div ><img style="width: 14px" src="../../assets/image/prop/jiuchan.png">x10</div>
      </div>
    </div>
  </div>
  <div>
  </div>
</div>
</template>

<script>
import {selectEvent} from "@/network/events";

export default {
  name: "Event",
  data() {
    return {
      eventsList: [],
      index: 0,
      num1: 0,
      num2: 0,
      num3: 0,
    }
  },
  created() {
    this.$store.getters.getUserData.inventory.materials.map(item => {
      if(item.name === '纠缠之缘') {
        this.num1 = item.num
      }
      if(item.name === '无主的星辉') {
        this.num2 = item.num
      }
      if(item.name === '无主的星尘') {
        this.num3 = item.num
      }
    })
    selectEvent({
      pageIndex: 1,
      pageSize: 999,
      keyword: "",
    }).then(res => {
      this.eventsList = res.data.data.items
    })
  }
}
</script>

<style scoped>
.event {
  display: flex;
  flex-direction: column;
}

.title {


}
</style>