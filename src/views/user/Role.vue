<template>
<div style="display: flex;flex-direction: column">
  <div style="height: 73px">

  </div>
  <div style="width: 1300px;height: 600px">
    <img src="../../assets/image/456.png" alt="">
  </div>
  <div style="height: 80px">
  </div>
</div>
</template>

<script>
export default {
  name: "Role",
  data() {
    return {
      role: {}
    }
  },
  computed: {
    rolesList() {
      return this.$store.getters.getUserData.roles.sort((a,b) => b.weight - a.weight)
    }
  }
}
</script>

<style scoped>

</style>