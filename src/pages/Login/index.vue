<template>
  <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
    <el-form-item style="margin-top: 50px" prop="username" label="用户名">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="login-btn" type="primary" @click="login"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { Message } from "element-ui";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, message: "长度不能小于3个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, message: "长度不能小于3个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      if (
        this.loginForm.username.trim().length >= 3 &&
        this.loginForm.password.trim().length >= 3
      ) {
        axios({
          url: "/mock/login",
          method: "post",
          data: {
            username: this.loginForm.username.trim(),
            password: this.loginForm.password.trim(),
          },
        })
          .then((res) => {
            if (res.data.code === 200) {
              this.setUserInfo(res.data.data);
              this.$router.replace('/')
            } else {
              Message.error(res.data.message);
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      } else {
        Message.warning("请按要求输入用户名和密码");
      }
    },
    ...mapMutations("user", ["setUserInfo"]),
  },
};
</script>

<style lang="less" scoped>
.el-form {
  width: 380px;
  height: 250px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-shadow: 0 0 25px #ccc;
  position: absolute;
  top: 25%;
  left: 40%;
}
.el-input {
  width: 250px;
}
.login-btn {
  margin-left: 80px;
}
</style>