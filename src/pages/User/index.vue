<template>
  <div>
    <!-- 新增按钮与搜索栏 -->
    <el-form class="manage-header" @submit.native.prevent :inline="true">
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
        <el-form-item label-width="50px">
          <el-select
            placeholder="请选择类型"
            style="width: 120px"
            v-model="searchType"
          >
            <el-option label="姓名" value="name"></el-option>
            <el-option label="年龄" value="age"></el-option>
            <el-option label="性别" value="sex"></el-option>
            <el-option label="出生日期" value="birthday"></el-option>
            <el-option label="住址" value="address"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchText" placeholder="搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchPersonData" type="danger" plain
            >搜索</el-button
          >
          <el-button @click="reset" plain>重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- 新增窗口 -->
    <el-dialog
      title="新增用户"
      :visible.sync="addDialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :model="newPerson">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name" label="姓名">
              <el-input style="width: 100%" v-model="newPerson.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="age" label="年龄">
              <el-input style="width: 100%" v-model="newPerson.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"
            ><el-form-item prop="sex" label="性别">
              <el-select style="width: 100%" v-model="newPerson.sex">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item prop="birthday" label="出生日期">
              <el-date-picker
                style="width: 100%"
                v-model="newPerson.birthday"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="address" label="住址">
              <el-input
                style="width: 100%"
                v-model="newPerson.address"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPersonData()">新增</el-button>
      </span>
    </el-dialog>
    <!-- 数据表格 -->
    <el-table :data="showPersonDataList" border style="width: 100%">
      <el-table-column align="center" prop="name" label="姓名">
      </el-table-column>
      <el-table-column align="center" prop="age" label="年龄">
      </el-table-column>
      <el-table-column align="center" prop="sex" label="性别">
      </el-table-column>
      <el-table-column align="center" prop="birthday" label="出生日期">
      </el-table-column>
      <el-table-column align="center" prop="address" label="住址">
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
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="35%"
      :before-close="handleClose"
    >
      <el-form :rules="rules" :model="editPerson">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name" label="姓名">
              <el-input
                style="width: 100%"
                v-model="editPerson.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="age" label="年龄">
              <el-input style="width: 100%" v-model="editPerson.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="width: 100%" prop="sex" label="性别">
              <el-select v-model="editPerson.sex">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="birthday" label="出生日期">
              <el-date-picker
                style="width: 100%"
                v-model="editPerson.birthday"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="address" label="住址">
              <el-input
                style="width: 100%"
                v-model="editPerson.address"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editPersonData">保存修改</el-button>
      </span>
    </el-dialog>
    <!-- 分页器 -->
    <el-pagination
      @current-change="currentPageChange"
      style="float: right;"
      background
      layout="prev, pager, next"
      :current-page="currentPage"
      :total="personDataList.length"
      :page-size="11"
    >
    </el-pagination>
  </div>
</template>

<script>
import Mock from "mockjs";
import { MessageBox, Message } from "element-ui";
export default {
  name: "User",
  data() {
    return {
      addDialogVisible: false,
      editDialogVisible: false,
      isSearch: false,
      searchType: "",
      searchText: "",
      currentPage: 1,
      personDataList: [],
      newPerson: {
        name: "",
        age: "",
        sex: "",
        birthday: "",
        address: "",
        id: "",
      },
      editPerson: {
        name: "",
        age: "",
        sex: "",
        birthday: "",
        address: "",
        id: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        age: [{ required: true, message: "请输入年龄", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          { required: true, message: "请选择出生日期", trigger: "change" },
        ],
        address: [{ required: true, message: "请输入住址", trigger: "change" }],
      },
    };
  },
  computed: {
    showPersonDataList() {
      let start = (this.currentPage - 1) * 11;
      let end = this.currentPage * 11;
      return this.personDataList.slice(start, end);
    },
  },
  watch: {
    personDataList(val) {
      if (!this.isSearch) {
        localStorage.setItem("personDataList", JSON.stringify(val));
      }
    },
    currentPage(val) {
      sessionStorage.setItem("currentPage", JSON.stringify(val));
    },
  },
  methods: {
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
    getPersonDataIndex(currentItem) {
      let personList = JSON.parse(localStorage.getItem("personDataList"));
      const showIndex = this.personDataList.findIndex(
        (item) => item.id === currentItem.id
      );
      const valIndex = personList.findIndex(
        (item) => item.id === currentItem.id
      );
      return { personList, showIndex, valIndex };
    },
    handleEdit(_, item) {
      this.editDialogVisible = true;
      // 浅层次深拷贝
      this.editPerson = { ...item };
    },
    handleDelete(_, currentItem) {
      MessageBox.confirm("确认删除？")
        .then(() => {
          const { personList, showIndex, valIndex } =
            this.getPersonDataIndex(currentItem);
          if (this.isSearch) {
            this.personDataList.splice(showIndex, 1);
            personList.splice(valIndex, 1);
            localStorage.setItem("personDataList", JSON.stringify(personList));
            Message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.personDataList.splice(valIndex, 1);
            localStorage.setItem(
              "personDataList",
              JSON.stringify(this.personDataList)
            );
            Message({
              message: "删除成功",
              type: "success",
            });
          }
        })
        .catch(() => {});
    },
    isFull(obj) {
      let isFull = true;
      const keyArr = Object.keys(obj).filter((key) => key !== "id");
      keyArr.forEach((key) => {
        if (obj[key] === "") {
          isFull = false;
        }
      });
      return { keyArr, isFull };
    },
    addPersonData() {
      let personList = [];
      const { keyArr, isFull } = this.isFull(this.newPerson);
      if (isFull) {
        this.addDialogVisible = false;
        localStorage.getItem("personDataList") &&
          (personList = JSON.parse(localStorage.getItem("personDataList")));
        this.newPerson.id = Mock.mock("@id");
        personList.push(this.newPerson);
        localStorage.setItem("personDataList", JSON.stringify(personList));
        keyArr.forEach((key) => (this.newPerson[key] = ""));
        Message({
          message: "添加用户成功",
          type: "success",
        });
        this.$router.go(0);
      } else {
        Message({
          message: "内容不能为空",
          type: "warning",
        });
      }
    },
    editPersonData() {
      const { personList, showIndex, valIndex } = this.getPersonDataIndex(
        this.editPerson
      );
      const { isFull } = this.isFull(this.editPerson);
      if (this.isSearch) {
        if (isFull) {
          this.personDataList.splice(showIndex, 1, this.editPerson);
          personList.splice(valIndex, 1, this.editPerson);
          localStorage.setItem("personDataList", JSON.stringify(personList));
          Message({
            message: "编辑成功",
            type: "success",
          });
          this.editDialogVisible = false;
        } else {
          Message.warning("内容不能为空");
        }
      } else {
        if (isFull) {
          this.personDataList.splice(valIndex, 1, this.editPerson);
          localStorage.setItem(
            "personDataList",
            JSON.stringify(this.personDataList)
          );
          Message({
            message: "编辑成功",
            type: "success",
          });
          this.editDialogVisible = false;
        } else {
          Message.warning("内容不能为空");
        }
      }
    },
    searchPersonData() {
      if (this.searchType === "" || this.searchText === "") {
        Message({
          message: "搜索类型与搜索内容不能为空",
          type: "warning",
        });
      } else {
        this.isSearch = true;
        localStorage.getItem("personDataList") &&
          (this.personDataList = JSON.parse(
            localStorage.getItem("personDataList")
          ));
        this.personDataList = this.personDataList.filter((item) => {
          return item[this.searchType] === this.searchText;
        });
      }
    },
    reset() {
      localStorage.getItem("personDataList") &&
        (this.personDataList = JSON.parse(
          localStorage.getItem("personDataList")
        ));
      this.searchType = "";
      this.searchText = "";
    },
  },
  created() {
    sessionStorage.getItem("currentPage") &&
      (this.currentPage = JSON.parse(sessionStorage.getItem("currentPage")));
    localStorage.getItem("personDataList") &&
      (this.personDataList = JSON.parse(
        localStorage.getItem("personDataList")
      ));
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
/deep/.el-pagination {
  padding: 20px 0;
}
</style>