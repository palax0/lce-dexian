<template>
  <div id="order-analysis">
    <view-area-title>今日订单</view-area-title>
    <ul class="today-order">
      <li>
        <div class="today-order-title">新增订单数</div>
        <div class="today-order-number">100</div>
      </li>
      <li>
        <div class="today-order-title">已支付数</div>
        <div class="today-order-number">112300</div>
      </li>
      <li>
        <div class="today-order-title">累计金额</div>
        <div class="today-order-number">520</div>
      </li>
    </ul>
    <view-area-title>数据分析</view-area-title>
    <div class="data-analysis">
      <div class="data-analysis-select">
        <span style="margin: 0 20px 0 40px">时间:</span>
        <el-date-picker
          size="mini"
          v-model="selectedTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          unlink-panels
          :picker-options="pickerOptions"
        >
        </el-date-picker>
        {{ selectedTime }}
      </div>
      <div class="data-analysis-show"></div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="paymentTime" label="时间" width="180"></el-table-column>
      <el-table-column prop="name" label="订单总数" width="180"></el-table-column>
      <el-table-column prop="address" label="作废"></el-table-column>
      <el-table-column prop="address" label="已支付数"></el-table-column>
      <el-table-column prop="address" label="待支付数"></el-table-column>
      <el-table-column prop="totalPrice" label="累计金额"></el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="responseData.total"
      :size="10"
    >
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'OrderAnalysis',
  data() {
    return {
      responseData: '',

      selectedTime: [],
      tableData: [],

      queryObj: {
        pageNum: 0,
        pageSize: 3,
        status: 0,
      },

      // 时间选择器的快捷选项
      pickerOptions: {
        shortcuts: [{
          text: '最近7天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  created() {
    this.convert()
  },
  methods: {
    async convert() {
      const {data: result} = await this.$http.get(
        '/party/management/order/getOrderList/' + Object.values(this.queryObj).join('/'),
        { token: window.sessionStorage.getItem('token') }
      )
      console.log(result);
      this.responseData = result.data;
      this.tableData = result.data.list;

      // const temp = await this.$http.post(
      //   '/party/management/order/searchByTime/',
      //   this.pageQueryInfo, 
      //   {
      //     headers: {
      //       token: window.sessionStorage.getItem('token')
      //     }
      //   }
      // )
      // console.log(temp);
    }
  }
}

</script>

<style lang="scss" scoped>
#order-analysis {
  .today-order {
    margin: 30px 0 50px;
    li {
      display: inline-block;
      width: 33.3%;
      text-align: center;
      .today-order-number {
        margin-top: 20px;
        font-size: 36px;
        font-weight: 700;
      }
    }
  }
  .data-analysis {
    > span {
      font-size: 14px;
    }
  }
}
</style>