<template>
    <div id="orderManagePage">
        <!-- 搜索部分 -->   
        <div class="top">
            <div class="search">
                <input type="text" placeholder="请输入订单编号/用户名"  v-model.trim="orderNumber">
                <el-button circle @click="searchData">搜索</el-button>
            </div>
            <el-select  v-model="payStatus" placeholder="全部订单" @change="changeSearch">
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
                    <span v-if="scope.row.payStatus== 0" style="color: #ff0000">已支付</span>
                    <span v-else-if="scope.row.payStatus== 1" style="color: #000000">待支付</span>
                    <span v-else-if="scope.row.payStatus== 2" style="color: #000000">已关闭</span>
                    <span v-else style="color: #1AE642">有退款</span>
                  </template>
                </el-table-column>

                <el-table-column
                label="订单详情"
                width="98">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-error iconfont icon-xiangqing"  @click.prevent="handldetails(scope.row.id)">详情</el-button>
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
      orderNumber: "",
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
          value: 0,
          label: "已支付"
        },
        {
          value: 1,
          label: "待支付"
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
    getData(url, params) {
      this.$http.get(url, params).then(res => {
        this.tableData = [];
        this.total = res.data.data.total;
        this.totalPage = res.data.data.totalPage;
        this.pageSize = res.data.data.pageSize;
        this.currentPage = res.data.data.page;
        // console.log(res.data.data.rows)
        var rst = res.data.data.rows;
        if (rst) {
          this.tableData = rst;
          this.tableData.forEach((item, index) => {
            item.createdTime = this.getTimeStyle(item.createdTime);
            item.payTime = this.getTimeStyle(item.payTime);
          });
        } else {
          console.log("err");
        }
      });
    },
    handleCurrentChange(val) {
      let params = new URLSearchParams();
      params.append("page", val);
      params.append("userId", 1);
      this.getData("/api/order/order_list", { params });
    },
    searchData() {
      //输入订单编号或用户名搜索相对应的考场
      let params = new URLSearchParams();
      params.append("str", this.orderNumber) 
      params.append("userId", 1);
      this.getData("/api/order/order_list", { params });
    },
    changeSearch(val) {
      // 输入订单状态搜索相对应的考场
      let params = new URLSearchParams();
      if (this.orderType !== "") {
        params.append("orderType", this.orderType);
      }
      params.append("payStatus", val);
      params.append("userId", 1);
      this.getData("/api/order/order_list", { params });
    },
    changeServerType(val) {
      //输入服务类型搜索相对应的考场
      let params = new URLSearchParams();
      if (this.payStatus !== "") {
        params.append("payStatus", this.payStatus);
      }
      params.append("orderType", val);
      params.append("userId", 1);
      this.getData("/api/order/order_list", { params });
    },
    handldetails(val) {
      //查看详细页
      this.$emit("hanleShow", {boolean:true,index:val});
    }
  },
  mounted() {
    //页面进入请求数据
    let params = new URLSearchParams();
    params.append("userId", 1);
    this.getData("/api/order/order_list", { params });
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
</style>