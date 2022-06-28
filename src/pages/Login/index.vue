<template>
  <div id="login">
    <el-form
      ref="loginForm"
      :rules="rules"
      :model="loginForm"
      label-width="80px"
    >
      <el-form-item style="margin-top: 50px" prop="username" label="用户名">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
          type="password"
          v-model="loginForm.password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "@/api";
import Cookies from "js-cookie";
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
          url: "/login",
          method: "post",
          data: {
            username: this.loginForm.username.trim(),
            password: this.loginForm.password.trim(),
          },
        })
          .then(({ data: loginRes }) => {
            if (loginRes.code === 200) {
              Message.success("登录成功");
              Cookies.set("token", loginRes.data.token);
              axios
                .post("/userInfo", loginRes.data.token)
                .then(({ data: userRes }) => {
                  this.setUserInfo(userRes.data);
                  return axios.post("/menu", loginRes.data.token);
                })
                .then(({ data: menuRes }) => {
                  this.setMenuList(menuRes.data);
                  this.setRoutes();
                  this.$router.replace("/");
                })
                .catch((err) => {
                  throw new Error(err);
                });
            } else {
              Message.error(loginRes.message);
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
    ...mapMutations("tab", ["setMenuList", "setRoutes"]),
  },
};
</script>

<style lang="less" scoped>
#login{
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse farthest-side at 76% 77%, rgba(245, 228, 212, 0.25) 4%, rgba(255, 255, 255, 0) calc(4% + 1px)), radial-gradient(circle at 76% 40%, #fef6ec 4%, rgba(255, 255, 255, 0) 4.18%), linear-gradient(135deg, #ff0000 0%, #000036 100%), radial-gradient(ellipse at 28% 0%, #ffcfac 0%, rgba(98, 149, 144, 0.5) 100%), linear-gradient(180deg, #cd6e8a 0%, #f5eab0 69%, #d6c8a2 70%, #a2758d 100%); background-blend-mode: normal, normal, screen, overlay, normal;
}

.el-form {
  width: 380px;
  height: 250px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background: rgba(255, 255, 255, .8);
  box-shadow: 0 10px 25px #ccc;
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