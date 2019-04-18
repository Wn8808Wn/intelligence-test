<template>
    <div class="examRoomList">
        <!-- 搜索部分 -->
        <div class="top common">
            <el-button type="primary" icon="el-icon-plus"  round @click="handleAddRoom">新增考场</el-button>
            <div class="search">
                <input type="text" placeholder="请输入考场编号"  v-model.trim="RoomCode">
                <el-button circle @click="searchData">搜索</el-button>
            </div>
            <el-button type="primary" round @click="freezedRoom">已冻结考场</el-button>
            <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
        </div>
        <!-- 表格数据部分 -->
        <div class="tabs-data">     
            <el-table
            stripe
            :data="tableData" 
            style="width: 100%">
                <el-table-column
                prop="province"
                label="省份"
                width="120">
                </el-table-column>
                <el-table-column
                prop="manageUnit"
                label="管理单位"
                width="226">
                </el-table-column>
                <el-table-column
                prop="examRoomCode"
                label="考场编号"
                width="140">
                </el-table-column>

                 <el-table-column
                label="座位数"
                width="104">
                <template slot-scope="scope">{{ scope.row.seatSize+'个' }}</template>
                </el-table-column>

                <el-table-column
                prop="addressabbr"
                label="地址"
                width="300">
                </el-table-column>
                <el-table-column
                prop="buildDate"
                label="设立时间"
                width="158">
                </el-table-column>
                <el-table-column
                prop="createdUser"
                label="添加人"
                width="125">
                </el-table-column>
                <el-table-column
                label="管理操作">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-error iconfont icon-dongjie" @click.prevent="freezeData(scope.row.id)"  :disabled="isDisable">冻结</el-button>
                    <el-button type="text" icon="el-icon-error iconfont icon-xiangqing" @click.prevent="handldetails(scope.row.id)">详情</el-button>
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
import { _debounce } from "../../utils/public.js";
export default {
  inject:['reload'],
  data() {
    return {
      RoomCode: "",
      currentPage: null,
      pageSize: 10,
      totalPage: null,
      total: null,
      isDisable: false,
      tableData: [],
      unitsList:[]
    };
  },
  props: ["SHOWTYPE"],
  methods: {
    getData(url, params) {
      this.tableData = [];
      this.$http.get(url, params).then(res => {
          // 分页
          // console.log(res,'212313');
          this.total = res.data.data.roomPage.total;
          this.totalPage = res.data.data.roomPage.totalPage;
          this.pageSize = res.data.data.roomPage.pageSize;
          this.currentPage = res.data.data.roomPage.page;
          //列表数据
          let rst = res.data.data.roomPage.rows;
          //转换日期格式  地址缩写
          this.tableData = rst;
          this.unitsList = res.data.data.unitsList;
          this.tableData.forEach( (item,index) => {
            item.buildDate = this.getTimeStyle(item.buildDate)
            item.addressabbr = item.province + item.city + item.distric;
            //管理单位code码转换为名字
            item.manageUnit = this.unitsList.filter( (value) => value.id === item.manageUnit)[0].unitName
          })

        })
        .catch(err => {
          console.log(err);
        });
    },
    freezedRoom() {
      //查看已冻结考场信息  1：冻结  0 ：正常
      this.$emit("showDiffPage",this.SHOWTYPE.FROZEN);
    },
    handleCurrentChange:_debounce(function(val) {
      //分页切换当前页
      let params = new URLSearchParams();
      params.append("dataStatus", 0);
      params.append("userId", 1);
      params.append("page", val);
      this.getData("/api/room/room_list", { params });
    },300),
    handleAddRoom() {
      //跳转新增考场页面
      this.$emit("showDiffPage",this.SHOWTYPE.ADD);
    },
    freezeData(id) {
      //冻结考场操作
      alert(id);
      this.$confirm(
        "考场冻结后，将不能对该考场新增考试计划，但不影响已编排计划。",
        "考场冻结",
        {
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }
      )
        .then(() => {
          let params = new URLSearchParams();
          params.append("id", id);
          params.append("dataStatus", 1);
          this.$http.post("/api/room/update_status", params)
          this.$message({
            type: "success",
            message: "冻结成功!"
          });
          this.reload();
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "已取消冻结"
          });
        });
    },
    searchData() {
      //输入考场编号搜索相对应的考场   //考场编号加 考场状态
      alert(this.RoomCode);
      let params = new URLSearchParams();
      params.append("examRoomCode", this.RoomCode);
      params.append("dataStatus", 0);
      params.append("userId", 1);
      this.getData("/api/room/room_list", { params });
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
    params.append("dataStatus", 0);
    this.getData("/api/room/room_list", { params });
  }
};
</script>

<style rel='stylesheet/scss' lang="scss">

</style>
