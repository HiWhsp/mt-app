<template>
  <div class="m-istyle">
    <el-row>
      <dl @mouseover="over">
        <dt>有格调</dt>
        <dd :class="{active : king === 'all'}" data-type="all">全部</dd>
        <dd :class="{active : king === 'food'}" data-type="food">约会聚餐</dd>
        <dd :class="{active : king === 'spa'}" data-type="spa">丽人SPA</dd>
        <dd :class="{active : king === 'movie'}" data-type="movie">电影演出</dd>
        <dd :class="{active : king === 'travel'}" data-type="travel">品质出游</dd>
      </dl>
      <ul class="ibody">
        <li v-for="(item, index) in dataList" :key="index">
          <a href="#" class="el-card">
            <div class="el-card-body">
              <img :src="item.image" :alt="item.address" />
              <div class="cbody">
                <h3 class="title">{{ item.title }}</h3>
                <p class="sub-title">{{ item.subTitle }}</p>
                <div class="price-info">
                  <span class="price-symbol">￥</span>
                  <span class="current-price">{{ item.price }}</span>
                  <span class="sold">{{ item.address }}</span>
                </div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    created() {
      this.$store.dispatch("getResult").then(data => {
        this.dataList = data;
      });
    },
  data() {
    return {
      dataList: null,
      king: "all"
    };
  },
  methods: {
    over(e) {
      let tag = e.target;
      let tagName = tag.tagName;
      if (tagName !== "DD") {
        return false;
      }
      this.king = tag.getAttribute("data-type");
      this.getResult(this.king).then(data => {
          this.dataList = data;
      });
    },
    ...mapActions(["getResult"])
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>