<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <a href="//bj.meituan.com">
          <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团" />
        </a>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="inputVal" placeholder="搜索商家或地点" @focus="focus" @blur="blur"></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <dl class="hotPlace" v-if="isHot">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlace" :key="index">
              <router-link :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearch">
            <dd v-for="(item, index) in searchList" :key="index">
              <router-link to="/">{{item}}</router-link>
            </dd>
          </dl>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      inputVal: "",
      isfocus: false
    };
  },
  computed: {
    isHot: function() {
      return this.isfocus && !this.inputVal;
    },
    isSearch: function() {
      return this.isfocus && this.inputVal;
    },
    ...mapState(["searchList", "hotPlace"])
  },
  methods: {
    focus() {
      this.isfocus = true;
      this.$store.dispatch("getSearch");
      this.$store.dispatch("getHotPlace");
    },
    blur() {
      let self = this;
      setTimeout(function() {
        self.isfocus = false;
      }, 200);
    }
  }
};
</script>
