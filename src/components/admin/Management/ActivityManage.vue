<template>
  <div id="order-manage">
    <view-area-title>活动管理</view-area-title>
    <form action="" class="search-form">
      <input
        type="text"
        placeholder="请输入活动名称、主办方"
        v-model="searchForm.content"
      >
      <el-date-picker
        size="mini"
        v-model="searchForm.startTime"
        type="datetime"
        placeholder="请选择发起时间"
        default-time="12:00:00"
        value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <span>状态</span>
      <select v-model="searchForm.status">
        <option value="0">全部</option>
        <option value="1">上架</option>
        <option value="-1">下架</option>
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
    <el-table :data="resArray" stripe style="width: 100%" :cell-style="{'text-align': 'center'}" :header-cell-style="{'text-align': 'center'}">
      <el-table-column prop="activityId" label="序号"></el-table-column>
      <el-table-column prop="activityName" label="活动名称" min-width="120px"></el-table-column>
      <el-table-column prop="organizer" label="主办方"></el-table-column>
      <el-table-column label="缩略图">
        <template slot-scope="scope">
          <el-image :src="scope.row.posterImage" alt="" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="已报名" width="100px"></el-table-column>
      <el-table-column prop="releaseTime" label="发布时间" width="100px"></el-table-column>
      <el-table-column prop="startTime" label="活动时间" width="100px"></el-table-column>
      <el-table-column label="状态(上下架)">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value=1
            inactive-value=-1
            active-color="#ffa32e"
            inactive-color="#aaa"
            @change="setStatus(scope.row.activityId, scope.$index)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini">查看</el-button>
        <br>
        <el-button size="mini">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'OrderManage',
  data() {
    return {
      searchForm: {
        content: '',
        startTime: '',
        status: 0,
        pageSize: 5
      },
      pageNum: 0,
      resArray: []
    }
  },
  computed: {
    accountId() {
      return window.sessionStorage.getItem('userId')
    }
  },
  created() {
    this.submitSearchForm()
  },
  methods: {
    async submitSearchForm() {
      const sF = this.searchForm

      // 选出所有满足状态的
      let result = await this.$http.get(
        '/party/web_public/get_activity_list',
        {
          headers: { token: window.sessionStorage.getItem('token') },
          params: { status: sF.status, accountId: this.accountId }
        }
      ).catch(() => {
        this.$message.error('网络异常,请重试')
        result = null
      })
      if (!result)
        return
      this.resArray = result.data.data.list

      // 使用时间筛选
      if (sF.startTime !== '') {
        let tempDate = new Date(sF.startTime)
        const stdTime = tempDate.getTime()
        this.resArray = this.resArray.filter(ele => {
          tempDate = new Date(ele.startTime)
          return tempDate.getTime() >= stdTime
        })
      }
      // 使用活动名称,主办方筛选
      if (sF.content !== '') {
        this.resArray = this.resArray.filter(ele => {
          return ele.activityName.includes(sF.content) || ele.organizer.includes(sF.content)
        })
      }

      console.log(this.resArray);
    },
    async setStatus(activityId) {
      let result = await this.$http.put(
        '/party/web_public/modify_activity_status/' + activityId, {},
        {headers: {token: window.sessionStorage.getItem('token')}}
      ).catch(() => {
        this.$message.error('状态设置失败,请再试一次')
      })
      if (result.data.code !== '0')
        this.$message.error(result.data.msg)
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