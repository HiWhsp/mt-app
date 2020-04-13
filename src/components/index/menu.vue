<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="menuLeave">
      <dt>全部分类</dt>
      <dd v-for="(item, index) in menuLeft" :key="index" @mouseenter="menuEnter(item.items)">
        <i :class="item.type"></i>
        <span>{{item.name}}</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="homestay"></i>
        <span>民宿</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="movie"></i>
        <span>猫眼电影</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="airport"></i>
        <span>机票 / 火车票</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="ktv"></i>
        <span>休闲娱乐 / KTV</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="life"></i>
        <span>生活服务</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="hair"></i>
        <span>丽人 / 美发 / 医学美容</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="marry"></i>
        <span>结婚 / 婚纱摄影 / 婚宴</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="offspring"></i>
        <span>亲子 / 儿童乐园 / 幼教</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="sport"></i>
        <span>运动健身 / 健身中心</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="furniture"></i>
        <span>家装 / 建材 / 家居</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="study"></i>
        <span>学习培训 / 音乐培训</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="health"></i>
        <span>医疗健康 / 宠物 / 爱车</span>
        <i class="arrow"></i>
      </dd>
      <dd>
        <i class="bar"></i>
        <span>酒吧 / 密室逃脱</span>
        <i class="arrow"></i>
      </dd>
    </dl>
    <div class="detail" v-if="curDetail" @mouseenter="detailEnter" @mouseleave="detailLeave">
      <template v-for="(item, index) in curDetail">
        <h2 :key="index">{{item.title}}</h2>
        <span v-for="(prop, index) in item.items" :key="prop+'_'+index">{{prop}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  created() {
    this.getNavLeft();
  },
  data() {
    return {
      curDetail: null
    };
  },
  computed: {
    ...mapState({
      menuLeft: state => state.navLeft
    })
  },
  methods: {
    menuEnter(item) {
      this.curDetail = item;
    },
    menuLeave() {
      const self = this;
      this.timer = setTimeout(function() {
        self.curDetail = null;
      }, 200);
    },
    detailEnter() {
      clearTimeout(this.timer);
    },
    detailLeave() {
      this.curDetail = null;
    },
    ...mapActions(["getNavLeft"])
  }
};
</script>

<style>
</style>