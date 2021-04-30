<template>
  <div id="user-manage">
    <form action="" class="search-form">
      <input
        type="text"
        placeholder="输入手机号、昵称或用户名查找"
        v-model="searchForm.searchValue"
      >
      <span>类型</span>
      <select v-model="searchForm.searchUserType">
        <option value="0">用户</option>
        <option value="1">商家</option>
        <option value="2">所有</option>
      </select>
      <span>每页显示</span>
      <select v-model="searchForm.eachPage">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <button @click.prevent="submitSearchForm">搜索</button>
    </form>
    <!-- {{ searchForm }} -->

    <view-area-title>用户列表</view-area-title>
  </div>
</template>

<script>
export default {
  name: "UserManage",
  data() {
    return {
      searchForm: {
        searchValue: '',
        searchUserType: 2,
        eachPage: 5,
      },
    }
  },
  methods: {
    async submitSearchForm() {
      if (this.searchForm.searchValue === '') {
        this.$message.error('搜索内容不能为空!')
        return
      }
      const {searchUserType: role, searchValue: content} = this.searchForm
      const {data: result} = await this.$http.post(
        '/party/web/management/search',
        {role, content}
      )
      console.log(result);
    }
  }
};
</script>

<style lang="scss" scoped>
#user-manage {
  $dexian-color: rgb(255, 142, 0);
  .search-form {
    background-color: #f5f5f5;
    padding: 15px 0;
    input {
      padding: 2px 15px;
      width: 190px;
      // margin-left: 20px;
      margin-right: 60px;
    }
    select {
      padding: 2px 8px;
      margin-right: 20px;
    }
    span {
      margin-right: 10px;
      font-weight: 700;
    }
    button {
      background-color: $dexian-color;
      padding: 5px 18px;
      color: #fff;
      font-weight: 700;
      border-radius: 5px;
    }
  }
}
</style>