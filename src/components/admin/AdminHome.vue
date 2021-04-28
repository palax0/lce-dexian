<template>
  <div>
    {{'欢迎管理员' + userId}}
  </div>
</template>

<script>
export default {
  name: 'AdminHome',
  props: ['userId']
}
</script>

<style lang="scss" scoped>

</style>