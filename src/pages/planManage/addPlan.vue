<template>
    <div class="addPlanPages">   
        <commonTop :titleTop="title"></commonTop>
        <div class="examSelect">
            <div class="prov">
                <span class="commontips">考场:</span>
                <el-select v-model="examRoomId" placeholder="请选择考场" @change="chooseRoom">
                    <el-option
                    v-for="item in roomList"
                    :key="item.id"
                    :label="item.examRoomName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <p>座位数:<span>{{realSeatings}}个</span></p>  
        </div>

        <div class="examSelect">
            <div class="prov">
                <span class="commontips">考场计划:</span>
                <div class="btnGroup">
                    <el-button type="primary" plain  @click="dialogFormVisible = true">新增</el-button>
                    <el-button type="primary" @click="showDelIconEvent" plain>删除</el-button>
                    <el-button type="primary" plain @click="UNDO" :class="{'deactive': currStatus === 0 ,'active': currStatus === 1}">撤销</el-button>
                </div>
            </div>
        </div>
        
        <el-dialog title="新增计划" :visible.sync="dialogFormVisible" width="580px">
            <div class="setTop clearfix">
                <div class="setLev">
                    <p>设置报考级别:</p>
                    <el-select v-model="form.examLev" placeholder="请选择报考级别" @change="changeTimes">
                        <el-option
                            v-for="item in examLevClassify"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="setLev mgrt0">
                    <p>选择日期:</p>
                    <el-date-picker
                    v-model="selectDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="setTimer">
                    <p>设置考试时间:</p> 
                    <setTimeItem :examLev="form.examLev" :curIndex="index"  @delCurTimeEmitter="delCurTimeEmitter" 
                        v-for="(item,index) in timeList" :key="index"  @addData='addData'
                        >
                    </setTimeItem>
                    <el-button type="primary" @click="addTimeEvent" icon="el-icon-plus" round>增加</el-button>
                </div>
                
                <p>开放报名时间: 提前两周，当日早上8：00开放报名</p>
                
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitBtn" round>完 成</el-button>
            </div>
        </el-dialog>

        <!-- <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <p><span>本次新增2条</span>  <span>成功2条</span>  <span>失败2条</span></p>
        <p>失败如下:</p>
        <p v-for="(item,index) in errorList" :key="index">
            <span>日期</span> <span>时间</span>

        </p>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">完 成(5)</el-button>
        </span>
      </el-dialog> -->

        <div class="tabs-data" id="addPlanTabs">     
            <el-table 
            border
            :data="tableData" 
            style="width: 862px">

            <el-table-column
            label="日期"
            width="153">
            <template slot-scope="scope">
              <span style="margin-right:10px">{{scope.row.examDate}}</span>  <span>周{{"日一二三四五六".charAt(new Date(scope.row.examDate).getDay())}}</span>
            </template> 
            </el-table-column>

            <el-table-column
            prop="examTime"
            label="考试时间"
            width="102">
            </el-table-column>

            <el-table-column
            label="报考级别(考试时长)"
            width="418">
              <template slot-scope="scope">
                  <span>{{scope.row.levelStr.replace(/,/g,'/')}}</span>
                  <span style="margin-left:10px">({{scope.row.timeStr}}钟)</span>
                  <i  v-if='showDelIcon' class="el-icon-error" @click="delCurRow(scope.row)" style="cursor:pointer;color:#1f91b5;margin-left:10px;"></i>
              </template>
            </el-table-column>

            <el-table-column
            prop="openTime"
            label="开放报名时间"
            width="188">
            </el-table-column>
            </el-table>

            <p style="margin-top:20px" v-if="tableData !==[]">共有{{total}}条结果</p>
            <!-- 分页 -->
            <el-pagination
            background
            :total="total" 
            :page-size="pageSize"
            layout="prev, pager, next"
            :current-page="page"
            @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import commonTop from "../common/commonTop";
import setTimeItem from "../common/setExamTime";
export default {
  // inject:['reload'], //注入依赖 自动刷新页面
  components: {
    commonTop,
    setTimeItem
  },
  data() {
    return {
      title: "新增计划",
      examRoomId: "",
      roomList: [],
      realSeatings:'', //真实座位数 
      provinceCode:"",  // 根据考场列表获取当前的考场省份Code
      tableData: [],
      examLevClassify: [
        {
          label: "25级 — 10级  45分钟",
          value: 1
        },
        {
          label: "5级 — 2段  60分钟",
          value: 2
        },
        {
          label: "3段 —7段  90分钟",
          value: 3
        }
      ],
      dialogFormVisible: false,
      form: {
        examLev: 1
      },
      selectDate: "",
      timeList: [],
      showDelIcon: false,
      delTabs: [],
      page: null,
      total:null,
      totalPage:null,
      pageSize:6,
      currStatus: 0,// 通过状态码来控制撤销状态
      dialogVisible:false,
      errorList:[]
    };
  },
 
  methods: {
    changeTimes(val){
      console.log(val)
    },
    getData(params){
        this.$http.get("/api/plan/room_plan",params).then(res =>{
          // console.log(res)
          if(res){
            this.tableData=[];
            this.totalPage = res.data.data.totalPage;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.page = res.data.data.page;
            this.tableData=res.data.data.rows;
            this.tableData.forEach((item, index) => {
                item.openTime = item.signOpenDate.split(' ')[0]+' '+item.signOpenTime;
            })
          }
        })
    },

    chooseRoom(val) {
      var obj = this.roomList.filter(item => item.id === val);
      this.realSeatings = obj[0].seatSize-obj[0].spareSeatSize
      let params = new URLSearchParams();
      params.append("roomId", val);
      params.append('activeStatus',0)
      params.append("provinceCode",110000) //后期更改
      this.getData({ params })
    },
    showDelIconEvent() {
      this.showDelIcon = !this.showDelIcon;
      if (this.showDelIcon && this.delTabs.length > 0) {
        this.currStatus = 1;
      } else {
        this.currStatus = 0;
        this.delTabs.length = 0;
      }
    },
    handleCurrentChange(val) {
      console.log(val)
      let params = new URLSearchParams();
      params.append("page", val);
      params.append('activeStatus',0)
      params.append("roomId", this.examRoomId)
      params.append("provinceCode",110000) //后期更改
      this.getData({ params });
    },
    //删除当前行
    delCurRow(row) {
      // this.delTabs.push(this.tableData[index]);
      // this.delTabs.splice(0, this.delTabs.length - 1);
      // // this.tableData.splice(index, 1);
      // let params = new URLSearchParams()
      // params.append('id',index)
      // this.$http.post("/api/plan/del_plan",params).then( res =>{
      //     console.log(res)
      // })
      let params = new URLSearchParams()
      params.append('id',row.id)
      params.append('activeStatus',1)
      this.$http.post("/api/plan/edit_plan",params).then( res =>{
          console.log(res)
          if(res.data.code === 0 && res.data.msg ==='操作成功'){
            this.$message({
              type:'success',
              showClose: true,
              message:'删除成功'
            })
           this.$store.dispatch('deleCurrentRow',row.id)
          //  console.log(row.id,this.$store.state.deleCurrentRowId,"22222")
          //  this.$router.go(0);
          }else{
             this.$message({
              type:'error',
              showClose: true,
              message:'删除不成功'
            })
          }
      })
     
    },
    //撤销 删除的数据重新存入一个新数组delTabs，当点击时拿到数组中最后一个回填至tableData中。
    UNDO() {
      // if (this.delTabs.length <= 0) {
      //   this.$message({
      //     showClose: true,
      //     type: "warning",
      //     message: "抱歉,只能撤销一步"
      //   });
      // } else {
      //   this.tableData.push(this.delTabs.pop());
      // }
      // this.tableData.push(this.delTabs[this.delTabs.length-1])
      // this.delTabs.pop()
      var index = this.$store.state.deleCurrentRowId;
      console.log(index,"111")
      let params = new URLSearchParams()
      params.append('id',index)
      params.append('activeStatus',0)
      this.$http.post("/api/plan/edit_plan",params).then( res =>{
          console.log(res)
      })
    },
    addTimeEvent() {
      //  this.timeList.push({'stTime':this.startExamTime,'endTime':this.endExamTime});
      this.timeList.push({});
      if (this.timeList.length > 6) {
        this.$message({
          showClose: true,
          message: "每天最多只能添加6场考试",
          type: "warning"
        });
        this.timeList.length = 6;
      }
    },
    delCurTimeEmitter(index) {
      this.timeList.splice(index, 1);
    },
    addData(val) {
      this.timeList[this.timeList.length - 1] = val;
      // console.log(this.timeList, "aaaaa");
    },
    submitBtn() {
      let params = new URLSearchParams();
      params.append("roomId", this.examRoomId);
      params.append("examLevel", this.form.examLev);
      params.append("beginDate", this.selectDate[0]);
      params.append("endDate", this.selectDate[1]);
      params.append("timeStrs", JSON.stringify(this.timeList));
      console.log(params)
      this.$http.post("/api/plan/add_plan", params).then(res => {
        console.log(res);
        this.dialogVisible = true;
      });
    }
  },
  watch: {
    delTabs() {
      if (this.delTabs.length <= 0) {
        this.currStatus = 0;
      } else {
        this.currStatus = 1;
      }
    }
  },
  mounted() {
    let params = new URLSearchParams();
    params.append("userId", 1);
    params.append("provinceCode",110000) //后期更改 目前传值110000
    this.$http.get("/api/room/get_room_by_province", { params }).then(res => {
      // console.log(res,"addplan")
      if (res.status === 200 && res.data.code === 0) {
        this.roomList = res.data.data;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.addPlanPages {
  width: 960px;
  height: 926px;
  padding: 0 40px;
  background: #ffffff;
  .examSelect {
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    .prov {
      width: 317px;
      height: 100px;
      float: left;
      margin-right: 30px;
      & /deep/ .el-input__inner {
        width: 317px;
        background-color: #f8f8f8;
      }
      .el-button {
        width: 84px;
        height: 38px;
        font-size: 14px;
        background: #1f91b5;
        border-radius: 18px;
        // margin-right: 13px;
        color: #ffffff;
      }
      .btnGroup {
        margin-top: 10px;
        & > .el-button:nth-last-child(1) {
          border-color: #c3c3c3;
          color: #333333;
        }
        .active {
          background: #1f91b5;
          color: #ffffff;
        }
        .deactive {
          background: #c3c3c3;
          border-color: #c3c3c3;
          color: #ffffff;
        }
      }
    }
    .commontips {
      width: 310px;
      height: 17px;
      display: block;
      height: 15px;
      color: #a3a3a3;
      padding-top: 27px;
      padding-bottom: 11px;
      padding-left: 7px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 17px;
      opacity: 0.5;
    }
    & > p {
      float: left;
      width: 104px;
      height: 17px;
      margin-top: 62px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 22px;
      opacity: 0.99;
    }
  }
  &>#addPlanTabs {
    height: 580px;
    padding: 0;
    min-height:0;
    & /deep/ .el-table tr {
      background-color: #ffffff;
    }
    & /deep/ .el-table__header {
      box-sizing: border-box;
      border-collapse: collapse;
    }
    & /deep/ .tabs-data .el-pagination {
      text-align: center;
      margin-top: 58px;
      position: absolute;
      /* bottom: -220px; */
      left: 0;
      right: 0;
    }
  }

  .setTop {
    width: 100%;
    & > .setLev {
      width: 260px;
      float: left;
      margin-right: 18px;
      margin-bottom: 10px;
      & > p {
        height: 17px;
        font-size: 16px;
        color: rgba(0, 0, 0, 1);
        line-height: 17px;
        opacity: 0.5;
        margin-bottom: 10px;
      }
      & /deep/ .el-input__inner {
        width: 260px;
      }
    }
    & > p {
      width: 100%;
      height: 17px;
      float: left;
      font-size: 16px;
      color: #000;
      line-height: 17px;
      margin-top: 20px;
    }
    & > .mgrt0 {
      margin-right: 0;
    }
    .setTimer {
      width: 100%;
      float: left;
      & > p {
        width: 100%;
        height: 40px;
        font-size: 16px;
        color: #000;
        line-height: 40px;
        margin-bottom: 10px;
      }
      & > .el-button.is-round {
        padding: 10px 10px;
        width: 84px;
        height: 37px;
        background: #1f91b5;
      }
    }
  }
  & /deep/ .el-dialog__body {
    height: 500px;
  }
  .dialog-footer {
    & > .el-button--primary {
      padding: 10px 10px;
      width: 84px;
      height: 37px;
      background: #1f91b5;
    }
  }
}
</style>
