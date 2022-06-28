<template>
  <div class="header">
    <div class="l-content">
      <el-button
        size="mini"
        icon="el-icon-menu"
        @click="isCollapseChange"
      ></el-button>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="small">
        <span class="el-dropdown-link">
          <el-image class="user-img" :src="userInfo.imgUrl" fit="fill" lazy style="width:40px;height=40px;" key="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Cookies from "js-cookie";
import { Message } from "element-ui";
export default {
  name: "Header",
  computed: {
    ...mapState("tab", ["breadcrumbList"]),
    ...mapState("user", ["userInfo"]),
  },
  methods: {
    logout() {
      Cookies.remove("token");
      this.$router.replace("/login");
      Message.warning("退出登录");
      this.resetTab();
      this.removeUserInfo();
    },
    ...mapMutations("tab", ["isCollapseChange", "resetTab"]),
    ...mapMutations("user", ["removeUserInfo"]),
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
  .user-img {
    border-radius: 50%;
  }
}

/deep/ .el-breadcrumb__inner {
  color: rgb(179, 172, 172);
  font-size: 18px;
}
</style>