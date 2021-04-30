<template>
  <div id="home-header">
    <div class="header-logo">Dexian</div>
    <div class="header-name">得闲管理平台</div>
    <div class="header-logout" @click="logout">
      <i class="el-icon-switch-button"></i>退出
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message.success('成功退出登录')
    }
  }
}
</script>

<style lang="scss" scoped>
  $header-height: 115px;
  $dexian-color: rgb(255, 142, 0);
  #home-header {
    display: flex;
    align-items: center;
    height: $header-height;
    background-color: #fff;
    // 左边两个共同部分
    .header-logo,
    .header-name {
      height: $header-height;
      padding: 0 25px;
      font-size: 34px;
      line-height: $header-height;
      cursor: default;
    }
    .header-logo {
      box-sizing: border-box;
      border-bottom: 1px solid #dddddd;
      margin-left: 40px;
      color: $dexian-color;
      font-size: 36px;
    }
    .header-logout {
      padding: 8px;
      // 神奇的操作，让flex布局元素掉到主轴另一边
      margin-left: auto;
      margin-right: 40px;
      cursor: pointer;
      transition: transform ease 0.2s;
      > i {
        color: red;
        margin-right: 8px;
        font-size: 18px;
      }
      &:hover i {
        animation: zoom-out-in 0.5s;
      }
      @keyframes zoom-out-in {
        0% {transform: scale(1)}
        50% {transform: scale(1.2)}
        100% {transform: scale(1)}
      }
    }
  }
</style>