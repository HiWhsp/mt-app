<template>
  <div
    :class="['cityCur', disabled?'disabled':'']"
    @click="showWrap"
    v-document-click="documentClick"
  >
    <span>{{ value }}</span>
    <i class="el-icon-caret-bottom icon-downarrow"></i>
    <div class="mt-content" :class="{'active':showWrapperActive}">
      <p>{{ title }}</p>
      <div :class="{wrapper: true}" v-if="!cityName">
        <div class="col" v-for="(listData, index) in renderList" :key="index">
          <span
            :class="{'mt-item': true, 'active':  item.provinceName === value}"
            v-for="(item, index) in listData"
            :key="index"
            @click="changeValue(item)"
          >{{item.provinceName ? item.provinceName : item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "list",
    "title",
    "iscity",
    "value",
    "cityName",
    "showWrapperActive",
    "disabled"
  ],
  data() {
    return {
      showActive: false
    };
  },
  computed: {
    renderList() {
      let resultList = [];
      if (this.list) {
        let col = Math.ceil(this.list.length / 12);
        for (var i = 0; i < col; i++) {
          let data = this.list.slice(i * 12, i * 12 + 12);
          resultList.push(data);
        }
      }
      return resultList;
    }
  },
  methods: {
    showWrap(e) {
      e.stopPropagation();
      if (!this.disabled) {
        this.$emit("change_active", true);
      }
      // this.$emit("change_active", true);
    },
    documentClick() {
      this.$emit("change_active", false);
    },
    changeValue(item) {
      this.$emit("change", item);
    }
  },
  directives: {
    documentClick: {
      // 指令的定义
      bind: function(el, binding, VNode) {
        document.addEventListener("click", binding.value, false);
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changecity/select.scss";
</style>