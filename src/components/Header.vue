<template>
  <div class="header">
    <div class="l-content">
      <el-button
        size="mini"
        icon="el-icon-menu"
        @click="isCollapseChange"
      ></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.name"
          >{{item.label}}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span class="el-dropdown-link">
          <img class="userImg" height="40px" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      userImg: require("@/assets/userImg.jpg"),
    };
  },
  computed: {
    ...mapState("tab", ["breadcrumbList"]),
  },
  methods: {
    logout(){
      this.$router.replace('/login');
      this.removeUserInfo();
    },
    ...mapMutations("tab", ["isCollapseChange"]),
    ...mapMutations("user",["removeUserInfo"])
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
.l-content {
  display: flex;
  align-items: center;
  color: #fff;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .userImg {
    border-radius: 50%;
  }
}

/deep/ .el-breadcrumb__inner {
  color: rgb(179, 172, 172);
  font-size: 18px;
}
</style>