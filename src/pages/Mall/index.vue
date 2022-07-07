<template>
  <div>
    <!-- 新增按钮与搜索栏 -->
    <el-form @submit.native.prevent class="manage-header" :inline="true">
      <el-form-item>
        <el-button
          type="danger"
          @click="addDialogVisible = true"
          plain
          icon="el-icon-plus"
          >新增</el-button
        >
      </el-form-item>
      <div class="search">
        <el-form-item>
          <el-input
            v-model="searchText"
            placeholder="请输入搜索内容"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearchData" type="danger" plain
            >搜索</el-button
          >
          <el-button @click="reset" plain>重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 新增窗口 -->
    <el-dialog
      title="新增商品"
      :visible.sync="addDialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :model="newGood">
        <el-row :gutter="20">
          <el-col :span="16" :offset="8">
            <el-upload
              class="avatar-uploader"
              action="/mock/saveImg"
              :show-file-list="false"
              :on-success="handleNewAvatarSuccess"
              :before-upload="beforeNewAvatarUpload"
            >
              <img v-if="newGood.imgUrl" :src="newGood.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col
            :span="12"
            v-for="goodInfo in goodsInfo.slice(0, 2)"
            :key="goodInfo.prop"
          >
            <el-form-item :prop="goodInfo.prop" :label="goodInfo.label">
              <el-input
                style="width: 100%"
                v-model="newGood[goodInfo.prop]"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="shelvingTime" label="上架时间">
              <el-date-picker
                style="width: 100%"
                v-model="newGood.shelvingTime"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddData">新增</el-button>
      </span>
    </el-dialog>
    <!-- 数据表格 -->
    <el-table :data="showDataList" border style="width: 100%">
      <el-table-column align="center" label="略缩图">
        <template v-slot="slotProps">
          <el-popover placement="top-start" width="100" trigger="hover">
            <el-image
              style="width: 100px; height: 100px"
              :src="slotProps.row.imgUrl"
              :fit="'fill'"
            ></el-image>
            <el-image
              :src="slotProps.row.imgUrl"
              style="width: 20px; height: 20px"
              :lazy="true"
              slot="reference"
            ></el-image>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in goodsInfo"
        :key="index"
      >
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑窗口 -->
    <el-dialog
      title="编辑商品"
      :visible.sync="editDialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :model="editGood">
        <el-row :gutter="20">
          <el-col :span="16" :offset="8">
            <el-upload
              class="avatar-uploader"
              action="/mock/saveImg"
              :show-file-list="false"
              :on-success="handleEditAvatarSuccess"
              :before-upload="beforeEditAvatarUpload"
            >
              <img
                v-if="editGood.imgUrl"
                :src="editGood.imgUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col
            :span="12"
            v-for="goodInfo in goodsInfo.slice(0, 2)"
            :key="goodInfo.prop"
          >
            <el-form-item :prop="goodInfo.prop" :label="goodInfo.label">
              <el-input
                style="width: 100%"
                v-model="editGood[goodInfo.prop]"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="shelvingTime" label="上架时间">
              <el-date-picker
                style="width: 100%"
                v-model="editGood.shelvingTime"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEditGood">保存修改</el-button>
      </span>
    </el-dialog>
    <!-- 分页器 -->
    <el-pagination
      @current-change="currentPageChange"
      style="float: right"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :total="dataList.length"
      :page-size="11"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "@/api";
import Mock from "mockjs";
import { checkIsFull } from "@/utils";
import { MessageBox, Message } from "element-ui";
export default {
  name: "Mall",
  data() {
    return {
      goodsInfo: [
        {
          prop: "name",
          label: "商品名称",
        },
        {
          prop: "price",
          label: "价格",
        },
        {
          prop: "shelvingTime",
          label: "上架时间",
        },
      ],
      addDialogVisible: false,
      editDialogVisible: false,
      isSearch: false,
      searchText: "",
      currentPage: 1,
      dataList: [],
      newGood: {
        imgUrl: "",
        name: "",
        price: "",
        shelvingTime: "",
        id: "",
      },
      editGood: {
        imgUrl: "",
        name: "",
        price: "",
        shelvingTime: "",
        id: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        price: [{ required: true, message: "请输入价格", trigger: "change" }],
        shelvingTime: [
          { required: true, message: "请选择上架时间", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    showDataList() {
      let start = (this.currentPage - 1) * 11;
      let end = this.currentPage * 11;
      return this.dataList.slice(start, end);
    },
  },
  methods: {
    getGoodsList() {
      axios
        .get("/getGoodsList")
        .then(({ data: res }) => {
          this.dataList = res.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    deleteGoodsList(id) {
      axios
        .post("/deleteGoodsList", id)
        .then(({ data: res }) => {
          if (res.code === 200) {
            Message({
              message: "删除成功",
              type: "success",
            });
            this.isSearch
              ? this.searchGoodsList(this.searchText)
              : this.getGoodsList();
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    editGoodsList(isSearch) {
      const { isFull } = checkIsFull(this.editGood);
      if (isFull) {
        axios.post("/editGoodsList", this.editGood).then(({ data: res }) => {
          if (res.code === 200) {
            Message({
              message: "编辑成功",
              type: "success",
            });
            this.editDialogVisible = false;
            isSearch
              ? this.searchGoodsList(this.searchText)
              : this.getGoodsList();
          }
        });
      } else {
        Message.warning("内容不能为空");
      }
    },
    searchGoodsList(keyword) {
      axios
        .post("/searchGoodsList", keyword)
        .then(({ data: res }) => {
          if (res.code === 200) this.dataList = res.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    handleClose(done) {
      MessageBox.confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    currentPageChange(pageNo) {
      this.currentPage = pageNo;
    },
    handleEdit(_, item) {
      this.editDialogVisible = true;
      // 浅层次深拷贝
      this.editGood = { ...item };
    },
    handleAddData() {
      const { keyArr, isFull } = checkIsFull(this.newGood);
      if (isFull) {
        this.addDialogVisible = false;
        this.newGood.id = Mock.mock("@id");
        axios.post("/addGoodsList", this.newGood);
        keyArr.forEach((key) => (this.newGood[key] = ""));
        Message({
          message: "添加用户成功",
          type: "success",
        });
        this.getGoodsList();
      } else {
        Message({
          message: "内容不能为空",
          type: "warning",
        });
      }
    },
    handleDelete(pageIndex, currentItem) {
      MessageBox.confirm("确认删除？")
        .then(() => {
          this.deleteGoodsList(currentItem.id);
        })
        .catch(() => {});
    },
    handleEditGood() {
      this.editGoodsList(this.isSearch);
    },
    handleSearchData() {
      if (this.searchText.trim() === "") {
        Message({
          message: "搜索内容不能为空",
          type: "warning",
        });
      } else {
        this.isSearch = true;
        this.searchGoodsList(this.searchText);
      }
    },
    reset() {
      this.getGoodsList();
      this.searchText = "";
    },
    handleNewAvatarSuccess(response, file, fileList) {
      Message.success("图片上传成功");
    },
    beforeNewAvatarUpload(file) {
      console.log(file);
      if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
        Message.warning("仅支持jpg和jpeg格式文件");
        return false;
      }
      this.newGood.imgUrl = URL.createObjectURL(file);
    },
    handleEditAvatarSuccess(response, file, fileList) {
      Message.success("图片上传成功");
    },
    beforeEditAvatarUpload(file) {
      if (file.type !== "image/jpeg" && file.type !== "image/jpg") {
        Message.warning("仅支持jpg和jpeg格式文件");
        return false;
      }
      this.editGood.imgUrl = URL.createObjectURL(file);
    },
  },
  created() {
    this.getGoodsList();
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fab;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #fab;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #fab;
  color: #fff;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/deep/.el-pagination {
  padding: 20px 0;
}
</style>