<template>
  <div id="admin-home">
    <home-header/>
    <side-bar :list-data="listData" :list-icon-data="listIconData"></side-bar>
    <div class="view-area">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const HomeHeader = () => import('../HomeHeader')
const SideBar = () => import('../SideBar')

export default {
  name: 'AdminHome',
  components: {
    HomeHeader,
    SideBar
  },
  data() {
    return {
      listData: {
        '统计': ['订单分析'],
        '管理': ['用户管理', '前台管理', '活动管理', '订单管理'],
        '售后': ['意见反馈'],
        '设置': ['账户权限']
      },
      listIconData: [
        'el-icon-pie-chart',
        'el-icon-folder',
        'el-icon-chat-dot-square',
        'el-icon-setting'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  #admin-home {
    background-color: #f5f5f5;
    .view-area {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 70px - 160px);
      padding: 25px;
      box-sizing: border-box;
      > div {
        background-color: #fff;
      }
    }
  }
</style>