<template>
  <div>
    123
    {{'欢迎用户' + userId}}
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  props: ['userId']
}
</script>

<style lang="scss" scoped>

</style>