<template>
  <div class="breadcrumb">
    <el-tag
      :closable="item.name !== 'home'"
      type="danger"
      :effect="$route.path === item.path ? 'dark' : 'light'"
      v-for="item in breadcrumbList"
      :key="item.name"
      @click="toPage(item)"
      @close="deleteBreadcrumb(item)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Breadcrumb",
  computed: {
    ...mapState("tab", ["breadcrumbList"]),
  },
  methods: {
    deleteBreadcrumb(item) {
      if (item.path === this.$route.path) {
        this.$router.push({
          path: this.breadcrumbList[this.breadcrumbList.indexOf(item) - 1].path,
        });
      }
      this.deleteBreadcrumbList(item);
    },
    toPage(item) {
      this.$router.push({
        path: item.path,
      });
    },
    ...mapMutations("tab", ["deleteBreadcrumbList","saveBreadcrumbList"]),
  },
};
</script>

<style lang="less" scoped>
.breadcrumb {
  display: flex;
  margin-bottom: 30px;
  height: 25px;
  user-select: none;
  .el-tag {
    margin-right: 10px;
  }
}
</style>