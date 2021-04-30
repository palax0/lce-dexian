<template>
  <div>
    <home-header/>
    <side-bar :list-data="listData" :list-icon-data="listIconData"></side-bar>
  </div>
</template>

<script>
const HomeHeader = () => import('../HomeHeader')
const SideBar = () => import('../SideBar')

export default {
  name: 'UserHome',
  components: {
    HomeHeader,
    SideBar
  },
  data() {
    return {
      listData: {
        '统计': ['数据分析'],
        '管理': ['财务管理', '活动管理'],
        '咨询': ['咨询评价'],
        '设置': ['账户管理']
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

</style>