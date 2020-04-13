<template>
  <div class="categroy">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item, index) in list" :key="index">
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      class="m-categroy-section"
      v-for="(item, index) in cityList"
      :key="index"
      :id="'city-' + index"
    >
      <dt>{{ index }}</dt>
      <dd>
        <span v-for="(city, index) in item" :key="index" @click="changeCity(city)">{{ city.name }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  created() {
    this.getProvince().then(data => {
      let obj = {};
      data.forEach((item, index) => {
        if (!obj[item.firstChar]) {
          obj[item.firstChar] = [];
        }
        obj[item.firstChar].push(item);
      });

      let newkey = Object.keys(obj).sort(); //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
      let newObj = {}; //创建一个新的对象，用于存放排好序的键值对
      for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
      }
      this.cityList = newObj;
    });
  },
  data() {
    return {
      list: "ABCDEFGHJKLMNPQRSTWXYZ",
      cityList: []
    };
  },
  methods: {
    changeCity(city) {
      this.$store.dispatch("getPosition", city);
      this.$router.push("/");
    },
    ...mapActions(["getProvince"])
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/categroy.scss";
</style>