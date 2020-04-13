<template>
  <div class="page-login">
    <div class="login-header">
      <a class="logo" href="http://www.meituan.com">美团网</a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网"
        />
      </div>
      <div class="form">
        <div class="tips" v-if="error">
          <i class="tip-status tip-status--opinfo"></i>
          <span>{{error}}</span>
        </div>
        <p>
          <span class="login-type">账号登录</span>
        </p>
        <el-input
          :class="{error: error && !userName}"
          v-model="userName"
          placeholder="手机号"
          prefix-icon="profile"
        ></el-input>
        <el-input v-model="password" placeholder="密码" show-password prefix-icon="password"></el-input>
        <div class="foot">
          <a href="#">忘记密码?</a>
        </div>
        <el-button type="primary" class="btn-login" @click="submit">登录</el-button>
        <p class="reg">
          <span>还没有账号？</span>
          <router-link :to="{name: 'register'}">免费注册</router-link>
        </p>
        <div class="oauth-wrapper">
          <h3 class="title-wrapper">
            <span class="title">用合作网站账号登录</span>
          </h3>
          <div class="oauth">
            <span class="oauth__link oauth__link--qq"></span>
            <span class="oauth__link oauth__link--weibo"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <ul>
        <li>
          <a href="#">关于美团</a>
        </li>
        <li>
          <a href="#">加入我们</a>
        </li>
        <li>
          <a href="#">商家入驻</a>
        </li>
        <li>
          <a href="#">帮助中心</a>
        </li>
        <li>
          <a href="#">美团手机版</a>
        </li>
      </ul>
      <p>©2020 美团网团购 meituan.com 京ICP证070791号 京公网安备11010502025545号</p>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  created() {},
  data() {
    return {
      userName: "",
      password: "",
      error: ""
    };
  },
  methods: {
    submit() {
      if (!this.userName) {
        // this.error = "请输入账号";
      }
      api
        .login({
          userName: this.userName,
          password: this.password
        })
        .then(res => {
          if (res.data.status == "success") {
            this.$router.push("/");
            this.$store.commit("setUserName", this.userName);
          } else {
            this.error = res.data.msg;
          }
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/login/index.scss";
</style>