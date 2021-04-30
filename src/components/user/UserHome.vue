<template>
  <div>
    <home-header/>
    <side-bar></side-bar>
  </div>
</template>

<script>
const HomeHeader = () => import('../HomeHeader')
const SideBar = () => import('../SideBar')

export default {
  name: 'UserHome',
  props: ['userId'],
  components: {
    HomeHeader,
    SideBar
  }
}
</script>

<style lang="scss" scoped>

</style>