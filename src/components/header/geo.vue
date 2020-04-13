<template>
  <div class="m-geo">
    <div class="position">
      <i class="el-icon-location" />
      {{ $store.state.position.name }}
      <router-link class="changeCity" :to="{name: 'changeCity'}" tag="a">切换城市</router-link>[
      <a href="/">门头沟区</a>
      <a href="/">大厂回族自治县</a>
      <a href="/">廊坊</a>
      ]
    </div>
    <div class="m-user" v-if="!$store.state.userName">
      <router-link class="login" :to="{name: 'login'}" tag="a">立即登录</router-link>
      <router-link class="register" :to="{name: 'register'}" tag="a">注册</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
