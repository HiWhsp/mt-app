<template>
  <dl class="classic">
    <dt>{{title1}}</dt>
    <dt>{{title2}}</dt>
    <dd v-for="item in List" :key="item.type">
      <div class="m-product-select">
        <dl class="tab">
          <dt>
            {{ item.title }}
            <i class="el-icon-caret-bottom"></i>
          </dt>
          <dd>
            <h3 class="select-title">{{item.title}}</h3>
            <span v-for="(prop, index) in item.subList" :key="index">{{prop.name}}</span>
          </dd>
        </dl>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  props: ["List", "title1", "title2"]
};
</script>

<style>
</style>