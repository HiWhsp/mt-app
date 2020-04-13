<template>
  <div class="m-iselect">
    <div class="choose-by-province">
      <h3 class="attr-l">按省份选择:</h3>
      <div class="choose-wrap">
        <m-select
          title="省份"
          :list="listData"
          :showWrapperActive="provinceActive"
          @change_active="changeProvinceActive"
          @change="changeProvince"
          class="province"
          :value="province"
        />
        <m-select
          :list="cityList"
          title="城市"
          :showWrapperActive="cityActive"
          @change_active="changeCityActive"
          @change="changeCity"
          :value="city"
          :disabled="cityDisabled"
          class="city"
          cityName
        />
      </div>
    </div>
    <div class="search">
      <h3 class="attr-l">直接搜索：</h3>
      <el-select
        v-model="value"
        filterable
        remote
        reserve-keyword
        placeholder="请输入城市中文或拼音"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option v-for="(item, index) in options" :key="index" :value="item.name"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import MSelect from "./select.vue";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      // listData: [],
      showActive: false,
      province: "省份",
      city: "城市",
      cityList: [],
      cityActive: false,
      provinceActive: false,
      cityDisabled: true,
      searchList: [],
      options: [],
      content: 0,
      value: "",
      loading: false,
      cityName: true
    };
  },
  computed: {
    ...mapState({
      listData: state => state.province
    })
  },
  methods: {
    changeProvinceActive(flag) {
      this.provinceActive = flag;
      if (flag) {
        this.cityActive = false;
      }
    },
    changeCityActive(flag) {
      this.cityActive = flag;
      if (flag) {
        this.provinceActive = false;
      }
    },
    changeProvince(item) {
      this.province = item.provinceName;
      this.cityDisabled = false;
      this.cityList = item.cityInfoList;
    },
    changeCity(item) {
      console.log(item);
      this.$store.dispatch("getPosition", item);
      this.$router.push('/');
    },
    remoteMethod(query) {
      console.log(query);
      if (query !== "") {
        this.loading = true;
        setTimeout(_ => {
          this.loading = false;
          this.options = this.searchList.filter(item => {
            return (
              item.name.indexOf(query) !== -1 ||
              item.pinyin.toLowerCase().indexOf(query.toLowerCase()) !== -1
            );
          });
          console.log(this.options);
        }, 200);
      } else {
        this.options = [];
      }
    },
    ...mapActions(["getProvince"]),
    ...mapMutations(["setCityList"])
  },
  components: {
    MSelect
  }
};
</script>

<style lang="scss">
</style>