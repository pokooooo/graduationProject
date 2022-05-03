<template>

</template>

<script>
import {getRewards} from "@/network/domains";

export default {
  name: "Domain",
  methods: {
    getRewards() {
      getRewards({
        account: this.$store.getters.getUserData.account,
        id: '35a03242-9242-434f-aec6-a1c115e1385e',
        list: [0,1],
        num: 4
      }).then(res => {
        console.log(res);
      })
    }
  },
  created() {
    this.getRewards()
  }
}
</script>

<style scoped>

</style>