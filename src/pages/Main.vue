<template>
  <el-container style="height: 100%">
    <!-- 侧边栏 -->
    <el-aside width="auto">
      <Aside />
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <Header></Header>
      </el-header>
      <!-- 内容区 -->
      <el-main>
        <!-- 面包屑 -->
        <Breadcrumb></Breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";
import Breadcrumb from "@/components/Breadcrumb";
export default {
  name: "Main",
  components: { Aside, Header, Breadcrumb },
  data() {
    return {};
  },
  mounted() {
    if (this.$store.state.user.userInfo.name) {
      this.$router.replace({ path: "/home" });
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
</style>