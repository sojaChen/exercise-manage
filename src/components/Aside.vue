<template>
  <!-- 侧边栏 -->
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#fab"
  >
    <h3 class="logo">
      {{ isCollapse ? "后台" : "后台管理系统" }}
    </h3>
    <!-- <el-menu-item class="logo" index="/" @click="toPage('/')">
      <i v-show="isCollapse" class="el-icon-s-platform"></i>
      <span>后台管理系统</span>
    </el-menu-item> -->
    <el-menu-item
      v-for="item in noChildren"
      :key="item.path"
      :index="item.path"
      @click="toPage(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="child.path"
        :index="child.path"
        @click="toPage(child)"
        >{{ child.label }}</el-menu-item
      >
    </el-submenu>
  </el-menu>
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Aside",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 跳转页面
    toPage(menuItem) {
      this.updateBreadcrumbList(menuItem);
      this.$router.push({
        path: menuItem.path,
      });
    },
    ...mapMutations("tab", ["updateBreadcrumbList", "setMenuList"]),
  },
  computed: {
    // 没有子数据的菜单数据
    noChildren() {
      return this.menuList.filter((item) => !item.children);
    },
    // 有子数据的菜单数据
    hasChildren() {
      return this.menuList.filter((item) => item.children);
    },
    // 控制是否展开侧边栏
    ...mapState("tab", ["isCollapse", "menuList"]),
  },
  mounted() {
    // 获取菜单数据
    axios.get("/mock/menu").then((response) => {
      this.setMenuList(response.data.data);
    });
  },
  updated(){
    this.updateBreadcrumbList(this.menuList[0]);
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

a {
  text-decoration: none;
}

.el-menu {
  height: 100%;
  border: none;
  user-select: none;
  word-break: keep-all;
}
.logo {
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  height: 56px;
  line-height: 56px;
  text-align: center;
}
</style>