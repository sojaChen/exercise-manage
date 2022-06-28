<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
/deep/ * {
  font-family: Helvetica, Arial, sans-serif;
}
#app {
  height: 100vh;
}
.el-main {
  background-color: #f4f4f4;
}

</style>
