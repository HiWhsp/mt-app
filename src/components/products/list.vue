<template>
  <div class="m-products-list">
    <ul>
      <li
        v-for="(item, index) in nav"
        :key="index"
        :class="{'s-nav-active': item.active}"
      >{{ item.name }}</li>
    </ul>
    <dl class="s-item" v-for="(item, index) in list" :key="index">
      <dt>
        <img :src="item.image" alt="图片" />
      </dt>
      <dd>
        <h3>
          <router-link :to="{name: 'productDeatil'}">{{ item.title }}</router-link>
        </h3>
        <p>
          <el-rate v-model="item.score" show-score disabled></el-rate>
          <span v-if="item.score >= 4.5">很好</span>
          <span v-else-if="item.score >= 4">好</span>
          <span v-else-if="item.score >= 3.5">不错</span>
          <span v-else-if="item.score >= 3">一般</span>
          <span v-else>差</span>
          <span>{{item.score}}分</span>
          <span class="s-item-comment-total">{{item.commentNum}}人评论</span>
        </p>
        <p>
          <span>
            <span
              v-for="(v, i) in item.tab"
              :key="i"
            >{{v}}{{(i >= item.tab.length - 1) ? "" : "|" }}</span>
          </span>
          <span>{{ item.address }}</span>
          <span>
            <a href="#">
              <i class="el-icon-place"></i>
              查看地图
            </a>
          </span>
        </p>
        <p>
          <span class>人均¥{{ item.avgPrice }}</span>
        </p>
        <el-row class="deal-items">
          <div class="items" v-for="(deal, index) in item.dealItems.slice(0, 2)" :key="index">
            <p>
              <span class="deal-title">{{ deal.title }}</span>
            </p>
            <p>
              <span class="deal-price">¥{{ deal.price }}</span>
              <span class="deal-old-price">门市价¥{{ deal.counterPrice }}</span>
              <span class="deal-sales">已售{{ deal.saleNum }}</span>
            </p>
            <p v-if="item.dealItems.length > 2">
              <span>
                更多{{ item.dealItems.length - 2 }}个优惠
                <i class="el-icon-arrow-down"></i>
              </span>
            </p>
          </div>
        </el-row>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getGoodsList").then(data => {
      this.list = data;
    });
  },
  data() {
    return {
      value: 3.7,
      list: [],
      nav: [
        {
          key: "s-default",
          name: "智能排序",
          active: true
        },
        {
          key: "s-price",
          name: "价格排序"
        },
        {
          key: "s-score",
          name: "人气最高"
        },
        {
          key: "s-comment",
          name: "评价最高"
        }
      ]
    };
  }
};
</script>

<style>
</style>