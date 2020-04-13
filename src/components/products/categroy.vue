<template>
  <div class="m-product-categroy">
    <!-- <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="item in menuList" :key="item.type">
        <m-select :title="item.title" :list="item.subList"/>
      </dd>
    </dl>-->
    <m-select :List="menuList" :title1="'分类'" :title2="'全部'" />
    <m-select :List="areaList" :title1="'区域'" :title2="'全部'" />
  </div>
</template>

<script>
import MSelect from "./select.vue";
export default {
  created() {
    this.$store.dispatch("getClassify").then(data => {
      this.menuList = data;
    });
  },
  data() {
    return {
      menuList: [],
      areaList: [
        {
          title: "推荐商圈",
          subList: [
            {
              name: "望京",
              id: 120000
            },
            {
              name: "昌平",
              id: 12222
            }
          ]
        },
        {
          title: "南岗区",
          subList: [
            {
              name: "中央大街",
              id: 123
            },
            {
              name: "西客站",
              id: 11
            },
            {
              name: "花园街",
              id: 222
            },
            {
              name: "通乡街/果园街",
              id: 21
            },
            {
              name: "爱建社区",
              id: 1
            },
            {
              name: "学府路",
              id: 34
            }
          ]
        }
      ]
    };
  },
  components: {
    MSelect
  }
};
</script>

<style>
</style>