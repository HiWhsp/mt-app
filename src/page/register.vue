<template>
  <div class="page-register">
    <div class="header">
      <header>
        <a class="site-logo" href="http://www.meituan.com">美团</a>
        <div class="login">
          <span>美团已有美团账号？</span>
          <router-link :to="{name: 'login'}">登录</router-link>
        </div>
      </header>
    </div>
    <div class="content">
      <el-form
        :model="registerFrom"
        status-icon
        :rules="rules"
        ref="registerFrom"
        label-width="100px"
        class="demo-registerFrom"
      >
        <el-form-item label="手机号" prop="userName">
          <el-input type="text" v-model="registerFrom.userName" autocomplete="off" validate-on-rule-change></el-input>
        </el-form-item>
        <el-form-item>
          <input type="button" value="免费获取短信动态码" />
        </el-form-item>
        <el-form-item label="短信动态码">
          <el-input type="text" v-model="registerFrom.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建密码" prop="password">
          <el-input
            type="password"
            v-model="registerFrom.password"
            autocomplete="off"
            @input="input"
            validate-on-rule-change
          ></el-input>
          <div class="pw-strength">
            <div :class="['bar', strengthClass]"></div>
            <div class="letter">
              <span>弱</span>
              <span>中</span>
              <span>强</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
          <el-input type="password" v-model="registerFrom.rePassword" autocomplete="off" validate-on-rule-change></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerFrom')">同意以下协议并注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (value.length < 4 || value.length > 16) {
          callback(new Error("用户名必须为4-16位的字母数字下划线组成"));
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerFrom.rePassword !== "") {
          this.$refs.registerFrom.validateField("rePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerFrom.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerFrom: {
        userName: "",
        password: "",
        rePassword: ""
      },
      strengthClass: "",
      rules: {
        userName: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        rePassword: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api.register(this.registerFrom).then(res => {
            if(res.data.status == "success") {
              this.$store.commit("setUserName", res.data.data);
              this.$router.push('/login');
            }
          });
        } else {
          return false;
        }
      });
    },
    input() {
      const paw = this.registerFrom.password;
      if (paw.length > 0 && paw.length <= 12) {
        this.strengthClass = "week";
      } else if (paw.length > 12 && paw.length < 25) {
        this.strengthClass = "normal";
      } else if (paw.length >= 25) {
        this.strengthClass = "strong";
      } else {
        this.strengthClass = "";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>