<template>
  <div id="order-manage">
    <view-area-title>订单信息</view-area-title>
    <form action="" class="search-form">
      <input
        type="text"
        placeholder="请输入订单编号"
        v-model="searchForm.orderId"
      >
      <el-date-picker
        size="mini"
        v-model="searchForm.startTime"
        type="datetime"
        placeholder="选择日期时间"
        default-time="12:00:00"
        value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <span>状态</span>
      <select v-model="searchForm.status">
        <option value="0">全部</option>
        <option value="1">已经付款</option>
        <option value="2">申请退款</option>
        <option value="3">已经退款</option>
      </select>
      <span>每页显示</span>
      <select v-model="searchForm.pageSize">
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
    {{searchForm}}
  </div>
</template>

<script>
export default {
  name: 'OrderManage',
  data() {
    return {
      searchForm: {
        orderId: '',
        startTime: '',
        status: 0,
        pageSize: 5
      },
      pageNum: 0
    }
  },
  methods: {
    async submitSearchForm() {
      const sF = this.searchForm
      if (sF.orderId === '' && sF.startTime === '') {
        this.$message.error('请输入时间或订单号!')
        return
      }
      let result
      if (sF.startId !== '') {
        ({data: result} = await this.$http.post(
          '/party/management/order/searchByOrderId',
          // {...this.searchForm, pageNum: this.pageNum},
          {orderId: 'QYWX1', pageNum: 1, pageSize: 1, status: 0},
          {
            headers: {
              token: window.sessionStorage.getItem('token')
              // 'Content-Type': 'application/multipart/form-data'
              // 'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        ))
        console.log(result);
      }
      else {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
#order-manage {
  $dexian-color: rgb(255, 142, 0);
  .search-form {
    padding: 15px 0;
    input {
      padding: 5px 15px;
      width: 190px;
      margin-left: 2.8%;
      margin-right: 2.1%;
    }
    select {
      padding: 5px 8px;
      margin-left: 0.7%;
    }
    > span:first-of-type {
      margin-left: 6%;
      font-size: 14px;
      font-weight: 700;
    }
    > span:last-of-type {
      margin-left: 2%;
      font-size: 14px;
      font-weight: 700;
    }
    button {
      background-color: $dexian-color;
      padding: 5px 18px;
      margin-left: 2%;
      color: #fff;
      font-weight: 700;
      border-radius: 5px;
    }
  }
}
</style>