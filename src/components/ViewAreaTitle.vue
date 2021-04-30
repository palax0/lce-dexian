<template>
  <div class="view-area-title">
    <i class="el-icon-s-help"></i>
    <span class="title-content"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: 'ViewAreaTitle'
}
</script>

<style lang="scss" scoped>
  $dexian-color: rgb(255, 142, 0);
  .view-area-title {
    padding: 10px;
    i {
      color: $dexian-color;
      margin-right: 8px;
      font-size: 18px;
    }
    .title-content {
      font-weight: 700;
      font-size: 16px;
    }
  }
</style>