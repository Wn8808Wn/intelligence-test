<template>
    <div id="orderManagePage">
        <!-- 搜索部分 -->   
        <div class="top">
            <div class="search">
                <input type="text" placeholder="请输入订单编号/用户名"  v-model.trim="orderNumber">
                <el-button circle @click="searchData">搜索</el-button>
            </div>
            <el-select  v-model="payStatus" placeholder="全部订单" @change="changePayStatus">
                <el-option
                v-for="item in payStatuses"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select  v-model="orderType" placeholder="全部服务类型" @change="changeServerType" >
                <el-option
                v-for="item in orderTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
        </div>
        <!-- 表格数据部分 -->
        <div class="tabs-data">     
            <el-table
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                prop="orderNo"
                label="订单编号"
                width="170">
                </el-table-column>
                <el-table-column
                prop="userName"
                label="用户名"
                width="170">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="联系方式"
                width="137">
                </el-table-column>
                <el-table-column
                prop="totalFee"
                label="费用"
                width="93">
                </el-table-column>
                <el-table-column
                prop="createdTime"
                label="创建时间"
                width="184">
                </el-table-column>
                <el-table-column
                prop="payTime"
                label="付款时间"
                width="184">
                </el-table-column>

                <el-table-column
                  label="订单状态"
                  width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.payStatus== 0" style="color:#00D067">待支付</span>
                    <span v-else-if="scope.row.payStatus== 1" style="color:#0067F1">已支付</span>
                    <span v-else-if="scope.row.payStatus== 2" style="color:#6F6F6F">已关闭</span>
                    <span v-else style="color:#F91111">有退款</span>
                  </template>
                </el-table-column>

                <el-table-column
                label="订单详情"
                width="98">
                <template slot-scope="scope">
                    <el-button type="text" icon="iconfont icon-xiangqing"  @click.prevent="handldetails(scope.row.id)">详情</el-button>
                </template>
                </el-table-column >
            </el-table>
            <el-pagination
            background
            :total="total" 
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions,mapMutations}  from 'vuex'
export default {
  data() {
    return {
      orderNumber:'',
      currentPage: 1,
      pageSize: 10,
      totalPage: null,
      total: null,
      tableData: [
        //  {
        //   orderNo:"KH001181200001",
        //   userName:'sis12345',
        //   phone:18511848808,
        //   totalFee:200,
        //   createdTime:'2018-12-04 12:20',
        //   payTime:'2018-12-04 12:20',
        //   payStatus:'已支付'
        // },
      ],
      payStatus: "",
      payStatuses: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "待支付"
        },
        {
          value: 1,
          label: "已支付"
        },
        {
          value: 2,
          label: "已关闭"
        },
        {
          value: 3,
          label: "有退款"
        }
      ],
      orderType: "",
      orderTypes: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 0,
          label: "考试服务"
        },
        {
          value: 1,
          label: "认证服务"
        }
      ]
    };
  },
  methods: {
    ...mapMutations({
      update:'modifyID'
    }),
    ...mapActions({
      sendID : "modify"
    }),
    getData(params) {
      this.$http.get('/api/order/order_list', {params}).then(res => {
        this.tableData = [];
        console.log(res,'orderList')
        this.total = res.data.data.total;
        this.totalPage = res.data.data.totalPage;
        this.pageSize = res.data.data.pageSize;
        this.currentPage = res.data.data.page;
        // console.log(res.data.data.rows,'888')
        var rst = res.data.data.rows;
        if (rst) {
          this.tableData = rst;
          this.tableData.forEach((item, index) => {
            item.createdTime = this.getTimeStyle(item.createdTime);
            if(item.payTime){
                item.payTime = this.getTimeStyle(item.payTime);
            }
          });
        } else {
          console.log("err");
        }
      });
    },
    handleCurrentChange(val) {
      let params = new URLSearchParams();
      params.append("page", val);
      if(this.orderNumber !== ''){
        params.append('str',this.orderNumber);
      }else{
        params.append('str','');
      }
      if(this.payStatus !== ''){
        params.append('payStatus',this.payStatus);
      }else{
        params.append('payStatus',-1);
      }
      if(this.orderType !== ''){
        params.append('orderType',this.orderType);
      }else{
        params.append('orderType',-1);
      }
      this.getData(params);
    },
    searchData() {
      //输入订单编号或用户名搜索相对应的考场
      let params = new URLSearchParams();
      params.append("str", this.orderNumber) 
      if(this.payStatus !== ''){
        params.append('payStatus',this.payStatus);
      }else{
        params.append('payStatus',-1);
      }
      if(this.orderType !== ''){
        params.append('orderType',this.orderType);
      }else{
        params.append('orderType',-1);
      }
      this.getData(params);
    },
    changePayStatus(val) {
      // 输入订单状态搜索相对应的考场
      this.payStatus = val;
      let params = new URLSearchParams();
      params.append("payStatus", val);
      if(this.orderNumber !== ''){
        params.append('str',this.orderNumber);
      }else{
        params.append('str','');
      }
      if(this.orderType !== ''){
        params.append('orderType',this.orderType);
      }else{
        params.append('orderType',-1);
      }
      this.getData(params);
    },
    changeServerType(val) {
      //输入服务类型搜索相对应的考场
      this.orderType = val;
      let params = new URLSearchParams();
      params.append("orderType", val);
      if(this.orderNumber !== ''){
        params.append('str',this.orderNumber);
      }else{
        params.append('str','');
      }
      if(this.payStatus !== ''){
        params.append('payStatus',this.payStatus);
      }else{
        params.append('payStatus',-1);
      }
      this.getData(params);
    },
    handldetails(val) {
      //查看详细页
      this.$router.push({name:'orderDetail',query:{id:val}})
    }
  },
  mounted() {
    //页面进入请求数据
    let params = new URLSearchParams();
    params.append("payStatus",-1);
    params.append("orderType", -1);
    params.append("str", '');
    this.getData(params)
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
</style>