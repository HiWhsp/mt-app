<template>
  <div class="page-changeCity">
    <el-row>
      <province />
    </el-row>
    <el-row>
      <hot title="热门城市：" :list="hotList" />
    </el-row>
    <el-row>
      <hot title="最近访问：" :list="recentList" />
    </el-row>
    <el-row>
      <categroy />
    </el-row>
  </div>
</template>

<script>
import Province from "@/components/changeCity/province.vue";
import Hot from "@/components/changeCity/hot.vue";
import Categroy from "@/components/changeCity/categroy.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      hotList: [],
      recentList: []
    };
  },
  created() {
    this.getHotCity().then(data => {
      this.hotList = data;
    });
    this.getRecents().then(data => {
      this.recentList = data;
    });
  },
  methods: {
    ...mapActions(["getHotCity", "getRecents"])
  },
  components: {
    Province,
    Hot,
    Categroy
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/iselect.scss";
</style>