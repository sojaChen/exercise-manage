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
*{
  font-family: Helvetica, Arial, sans-serif !important;
}
#app {
  height: 100vh;
}
.el-main {
  background-color: #f4f4f4;
}

</style>
