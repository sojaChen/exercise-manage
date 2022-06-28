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
        <transition appear name="route-change">
          <router-view></router-view>
        </transition>
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
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}

.route-change-enter-active {
  transition: all .5s;
}

.route-change-enter,
.route-change-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>