<template>
    <div>
         <div class="exammanage">
            <el-tabs type="border-card">
                <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i>考场管理</span>
                <!-- 搜索部分 -->
                  <div class="top">
                    <el-button type="primary" icon="el-icon-plus"  round @click="handleAddRoom">新增考场</el-button>
                    <div class="search">
                        <input type="text" placeholder="请输入考场编号"  v-model="RoomCode">
                        <el-button circle @click="searchData">搜索</el-button>
                    </div>
                    <el-button type="primary" round @click="freezedRoom">已冻结考场</el-button>
                    <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
                </div>

                  <!-- 表格数据部分 -->
                  <div class="tabs-data">     
                      <el-table
                      :data="this.tableData.slice((this.currentPage-1)*10,this.currentPage*10)"
                      stripe
                      style="width: 100%">
                          <el-table-column
                          prop="province"
                          label="省份"
                          width="112">
                          </el-table-column>
                          <el-table-column
                          prop="manageUnit"
                          label="管理单位"
                          width="256">
                          </el-table-column>
                          <el-table-column
                          prop="examRoomCode"
                          label="考场编号"
                          width="140">
                          </el-table-column>
                          <el-table-column
                          prop="seatSize"
                          label="座位数"
                          width="104">
                          </el-table-column>
                          <el-table-column
                          prop="addressabbr"
                          label="地址"
                          width="314">
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
                                <el-button type="text" icon="el-icon-error" @click.prevent="freezeData(scope.row.id)" v-if="showFreezeButton" :disabled="isDisable">冻结</el-button>
                                <el-button type="text" icon="el-icon-error" @click.prevent="freezeData(scope.row.id)" v-if="showFreezeButton == false"  :disabled="isDisable">恢复</el-button>
                                <el-button type="text" icon="el-icon-error" @click.prevent="handldetails(scope.row.id)">详情</el-button>
                            </template>
                          </el-table-column >
                      </el-table>
                    <el-pagination
                    background
                    :total="total" 
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                  >
                    </el-pagination>
                  </div>
                </el-tab-pane> 
            </el-tabs>
        </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      RoomCode: "",
      currentPage: 1,
      pageSize: 10,
      totalPage: null,
      total: null,
      isDisable: false,
      showFreezeButton: true,
      tableData: []
    };
  },
  methods: {
    getDate(url, params) {
      this.tableData = [];
      this.$http
        .get(url, params)
        .then(res => {
          // 分页
          console.log(res.data.data);
          this.total = res.data.data.total;
          this.totalPage = res.data.data.totalPage;
          this.pageSize = res.data.data.pageSize;
          this.page = res.data.data.page;
          //列表数据
          let rst = res.data.data.rows;
          // console.log(rst)
          //转换日期格式   座位数(加单位'个')   地址缩写
          for (let i = 0; i < rst.length; i++) {
            //转换日期格式
            let time = rst[i].buildDate;
            let d = new Date(time);
            let times =
              d.getFullYear() +
              "-" +
              (d.getMonth() + 1 < 10
                ? "0" + (d.getMonth() + 1)
                : d.getMonth() + 1) +
              "-" +
              (d.getDate() < 10 ? "0" + d.getDate() : d.getDate() + 1);
            rst[i].buildDate = times;
            // 转换座位数
            let seatSizes = rst[i].seatSize + "个";
            rst[i].seatSize = seatSizes;
            //地址缩写
            rst[i].addressabbr = rst[i].province + rst[i].city + rst[i].distric;
            this.tableData.push(rst[i]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    freezedRoom() {
      //查看已冻结考场信息  1：冻结  0 ：正常
      this.showFreezeButton = false;
      let params = new URLSearchParams();
      params.append("dataStatus", 1);
      params.append("userId", 1);
      this.getDate("/api/room/room_list", { params });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleAddRoom() {
      //跳转新增考场页面
      this.$router.push({ path: "/addroom" });
    },
    freezeData(id) {
      //冻结考场操作
      alert(id);
      this.$confirm(
        "考场冻结后,将不能对该考场新增考试计划,但不影响已编排计划。",
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
          this.$http.post("/api/room/update_status", params);
          this.$message({
            type: "success",
            message: "冻结成功!"
          });
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
      this.getDate("/api/room/room_list", { params });
    },
    handldetails(id) {
      //查看详细页

      this.$router.push({ name: "examRoomDetail", query: { id: id } });
    }
  },
  created() {
    //页面进入请求数据
    let params = new URLSearchParams();
    params.append("userId", 1);
    params.append("dataStatus", 0);
    this.getDate("/api/room/room_list", { params });
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" >
// 搜索部分样式
.top {
  width: 100%;
  height: 95px;
  background: #ffffff;
  & > .el-button.el-button--primary.is-round {
    width: 145px;
    height: 40px;
    font-size: 16px;
    background: #1f91b5;
    border: none;
    float: left;
    margin: 34px 20px 22px 21px;
    padding: 0;
    i.el-icon-plus {
      margin-left: 8px;
      margin-right: 16px;
    }
    & > span {
      font-size: 16px;
    }
  }
  .search {
    float: left;
    width: 372px;
    height: 40px;
    border: none;
    margin: 34px 20px 22px 20px;
    position: relative;
    & > input {
      width: calc(100% - 20px);
      height: 100%;
      border: none;
      border: 1px solid #1f91b5;
      background: #e9f2f5;
      border-radius: 20px;
      padding-left: 20px;
    }
    & > .is-circle {
      width: 75px;
      height: 100%;
      position: absolute;
      right: -2px;
      top: 1px;
      background: #1f91b5;
      border-radius: 20px;
      padding: 0;
      color: #fff;
    }
  }
  & > p {
    height: 47px;
    padding-top: 48px;
    float: right;
    margin-right: 27px;
    font-size: 14px;
    color: #000;
  }
  .el-button {
    margin: 0;
    padding: 0;
    border: none;
  }
}
// 表格部分样式
.tabs-data {
  width: calc(100%-40px);
  height: calc(100%-60px);
  padding: 0 20px 60px 20px;
  background: #ffffff;
  // overflow-x: hidden;
  .el-table th {
    width: 100%;
    height: 55px;
    color: #7c7c7c;
    font-size: 14px;
    background-color: #e5e5e5;
  }
  .el-table tr {
    width: 100%;

    font-size: 14px;
    color: #000;
    background-color: #f2f2f2;
  }
  // 控制表格的tr行高
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 55px;
  }

  // 分页样式
  .el-pagination {
    text-align: center;
    margin-top: 58px;
    & li.active {
      background: #1f91b5 !important;
    }
    .el-pager li {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      text-align: center;
      line-height: 34px;
      background: #e9e9eb;
    }
    .btn-prev,
    .btn-next {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #1f91b5;
      color: #fff;
    }
  }
}

// 弹框样式
.el-message-box {
  width: 580px;
  height: 220px;
  border-color: #878787;
  padding: 0;
  border-radius: 10px;
  .el-message-box__header {
    height: 55px;
    padding: 0;
    border-bottom: 1px solid #e5e5e5;
    .el-message-box__title {
      line-height: 55px;
      padding-left: 18px;
      & > span {
        font-size: 16px;
        color: #000;
      }
    }
  }
  .el-message-box__content {
    width: 100%;
    height: 108px;
    padding: 0;
    font-size: 16px;
    border-bottom: 1px solid #e5e5e5;
    .el-message-box__message {
      & > p {
        line-height: 108px;
        padding-left: 48px;
        color: #000;
      }
    }
  }
  .el-message-box__btns {
    padding: 0;
    height: 51px;
    width: 100%;
    button {
      width: 84px;
      height: 40px;
      border-radius: 20px;
      margin-bottom: 6px;
      margin-top: 6px;
      font-size: 14px;
      &:nth-of-type(1) {
        background: #c3c3c3;
        margin-right: 10px;
        color: #000;
      }
      &:nth-of-type(2) {
        background: #1f91b5;
        color: #ffffff;
        margin-right: 35px;
      }
    }
  }
}
</style>


<style rel='stylesheet/scss' lang="scss">
//  标签页样式
.exammanage {
  width: 100%;
  height: 916px;
  .el-tabs {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    .el-tabs__item.is-top,
    .el-tabs__item.is-top.is-active {
      width: 190px;
      height: 42px;
      border: none;
      padding: 0;
      margin: 0;
      color: #5a5a5a;
      & > span {
        color: #5a5a5a;
        display: block;
        width: 100%;
        height: 100%;
        font-size: 16px;
        line-height: 42px;
      }
      .el-icon-date {
        padding-left: 41px;
        padding-right: 12px;
      }
    }
  }
}
</style>