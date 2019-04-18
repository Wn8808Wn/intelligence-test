<template>
    <div class="frozenRoom">
        <commonTop :titleTop="titleTop"></commonTop>
        <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
        <!-- 表格数据部分 -->
        <div class="tabs-data">     
            <el-table
            stripe
            :data="tableData" 
            style="width: 100%,padding:0;">
                <el-table-column
                prop="province"
                label="省份"
                width="160">
                </el-table-column>
                
                <el-table-column
                prop="examRoomCode"
                label="考场编号"
                width="160">
                </el-table-column>

                <el-table-column
                label="座位数"
                width="120">
                <template slot-scope="scope">{{ scope.row.seatSize+'个' }}</template>
                </el-table-column>

                <el-table-column
                prop="addressabbr"
                label="地址"
                width="280">
                </el-table-column>

                <el-table-column
                prop="buildDate"
                label="设立时间"
                width="180">
                </el-table-column>

               <el-table-column
                prop="manageUnit"
                label="管理单位"
                width="256">
                </el-table-column>

                <el-table-column
                label="管理操作">
                <template slot-scope="scope">
                    <el-button class="recoverBtn" type="text" icon="el-icon-error iconfont icon-huifu" @click.prevent="unFreezeData(scope.row.id)" :disabled="isDisable">恢复</el-button>
                    <el-button type="text" icon="el-icon-error" @click.prevent="handldetails(scope.row.id)">详情</el-button>
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
import commonTop from '../common/commonTop.vue'
import { _debounce } from "../../utils/public.js";
export default {
  inject:['reload'],
  components:{
        commonTop
  },
  data() {
    return {
      titleTop:'已冻结考场',
      currentPage: null,
      pageSize: 10,
      totalPage: null,
      total: null,
      isDisable: false,
      tableData: [],
      unitsList:[]
    };
  },
  methods: {
    getData(url, params) {
      this.tableData = [];
      this.$http.get(url, params).then(res => {
          // 分页
          console.log(res,11111);
          this.total = res.data.data.roomPage.total;
          this.totalPage = res.data.data.roomPage.totalPage;
          this.pageSize = res.data.data.roomPage.pageSize;
          this.currentPage = res.data.data.roomPage.page;
          //列表数据
          this.unitsList = res.data.data.unitsList;
          let rst = res.data.data.roomPage.rows;
          this.tableData = rst 
          this.tableData.forEach( (item,index) =>{
              item.buildDate = this.getTimeStyle(item.buildDate)
              item.addressabbr = item.province+item.city+item.distric
              item.manageUnit = this.unitsList.filter((value,index) => value.id === item.manageUnit)[0].unitName;
          })
    })
      .catch(err => {
        console.log(err);
      });
    },
    handleCurrentChange:_debounce(function(val) {
      //分页切换当前页
      let params = new URLSearchParams();
      params.append("dataStatus", 1);
      params.append("userId", 1);
      params.append("page", val);
      this.getData("/api/room/room_list", { params });
    },200),
    unFreezeData(id){
       //恢复考场操作
      alert(id);
      this.$confirm(
         "考场恢复使用后，可在考场列表中查看。确定恢复？",
        "考场恢复",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }
      )
        .then(() => {
          let params = new URLSearchParams();
          params.append("id", id);
          params.append("dataStatus", 0);
          this.$http.post("/api/room/update_status", params).then( res =>{

            let params = new URLSearchParams();
            params.append("userId", 1);
            params.append("dataStatus", 1);
            this.getData("/api/room/room_list", { params });
            this.$message({
              type: "success",
              message: "恢复成功!"
            });
                    
          })
          // this.reload();
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消恢复"
          });
        });
    },
    handldetails(id) {
      //查看详细页
      this.$router.push({ name: "examRoomDetail", query: { id: id } });
    }
  },
  mounted() {
    //页面进入请求数据
    let params = new URLSearchParams();
    params.append("userId", 1);
    params.append("dataStatus", 1);
    this.getData("/api/room/room_list", { params });
  }
};
</script>

<style rel='stylesheet/scss' lang="scss"  scoped>
.frozenRoom {
     width: calc(100% - 40px);
     padding: 0 20px;
     background: #ffffff;
  &>p{
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #000;
      margin-top: 10px;
      margin-bottom: 14px;
  }

  &>.tabs-data {
  width: 100%;
  height: calc(100% - 20px);
  min-height: 762px;
  padding: 0 0 20px 0;
  }
  .recoverBtn{
    & /deep/ span{
      color:#96a324;
    }
  }
}
</style>

