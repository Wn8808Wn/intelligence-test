<template>
    <div class="addPlanPages">   
        <commonTop :titleTop="title"></commonTop>
        <div class="examSelect">
            <div class="prov">
                <span class="commontips">考场:</span>
                <el-select v-model="examRoom" placeholder="请选择考场" @change="chooseRoom">
                    <el-option
                    v-for="item in roomList"
                    :key="item.value"
                    :label="item.examRoomName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <p>座位数:<span>{{spareSeatSize}}个</span></p>
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
                    <el-select v-model="form.examLev" placeholder="请选择报考级别">
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

        <div class="tabs-data" id="addPlanTabs">     
            <el-table 
            border
            :data="tableData" 
            style="width: 862px">

            <el-table-column
            label="日期"
            prop="date"
            width="153">
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
                  <span>{{scope.row.examLeve}}</span>
                  <i  v-if='showDelIcon' class="el-icon-error" @click="delCurRow(scope.$index)" style="cursor:pointer;color:#1f91b5;margin-left:10px;"></i>
              </template>
            </el-table-column>

            <el-table-column
            prop="openTime"
            label="开放报名时间"
            width="188">
            </el-table-column>
            </el-table>

            <p style="margin-top:20px" v-if="tableData.length>0">共有{{total}}条结果</p>
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import commonTop from "../common/commonTop";
import setTimeItem from "../common/setExamTime";
export default {
  data() {
    return {
      title: "修改计划",
      examRoom: "",
      roomList: [],
      spareSeatSize: "",
      tableData: [
        {
          date: "2019-05-01",
          examTime: "15:30",
          examLeve: "25级 / 20级 / 10级 / 5级 （45分钟)",
          openTime: "2019-05-05"
        },
        {
          date: "2019-05-01",
          examTime: "15:30",
          examLeve: "25级 / 20级 / 10级 / 5级 （45分钟)",
          openTime: "2019-05-06"
        },
        {
          date: "2019-05-01",
          examTime: "15:30",
          examLeve: "25级 / 20级 / 10级 / 5级 （45分钟)",
          openTime: "2019-05-07"
        },
        {
          date: "2019-05-01",
          examTime: "15:30",
          examLeve: "25级 / 20级 / 10级 / 5级 （45分钟)",
          openTime: "2019-05-08"
        },
        {
          date: "2019-05-01",
          examTime: "15:30",
          examLeve: "25级 / 20级 / 10级 / 5级 （45分钟)",
          openTime: "2019-05-09"
        },
        {
          date: "2019-05-01",
          examTime: "15:30",
          examLeve: "25级 / 20级 / 10级 / 5级 （45分钟)",
          openTime: "2019-05-10"
        }
      ],
      examLevClassify: [
        {
          label: "25级——10级  45分钟",
          value: 45
        },
        {
          label: "9级——1级  60分钟",
          value: 60
        },
        {
          label: "1段——5段  90分钟",
          value: 90
        }
      ],
      date: "",
      examTime: "",
      examLeve: "",
      openTime: "",
      dialogFormVisible: false,
      form: {
        examLev: 45
      },
      selectDate: "",
      timeList: [],
      showDelIcon: false,
      delTabs: [],
      currentPage: 1,
      total:'',
      currStatus: 0 // 通过状态码来控制撤销状态
    };
  },
  components: {
    commonTop,
    setTimeItem
  },
  methods: {
    chooseRoom(val) {
      var obj = this.roomList.filter(item => item.id === val);
      console.log(obj);
      this.spareSeatSize = obj[0].spareSeatSize;
      // 选择切换考场获取当前考场的考试列表 接口？？？？
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
      let params = new URLSearchParams();
      params.append("page", val);
      this.getData("/api/plan/plan_list", { params });
    },
    delCurRow(index) {
      this.delTabs.push(this.tableData[index]);
      this.delTabs.splice(0, this.delTabs.length - 1);
      this.tableData.splice(index, 1);
      console.log(this.tableData);
    },
    //撤销 删除的数据重新存入一个新数组delTabs，当点击时拿到数组中最后一个回填至tableData中。
    UNDO() {
      if (this.delTabs.length <= 0) {
        this.$message({
          showClose: true,
          type: "warning",
          message: "抱歉,只能撤销一步"
        });
      } else {
        this.tableData.push(this.delTabs.pop());
        console.log(this.tableData, this.delTabs);
      }
      // this.tableData.push(this.delTabs[this.delTabs.length-1])
      // this.delTabs.pop()
    },
    addTimeEvent() {
      //  this.timeList.push({'stTime':this.startExamTime,'endTime':this.endExamTime});
      this.timeList.push({});
      if (this.timeList.length >= 6) {
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
      console.log(this.timeList, "aaaaa");
    },
    submitBtn() {
      let params = new URLSearchParams();
      params.append("roomId", 1);
      params.append("examLevel", this.form.examLev);
      params.append("beginDate", this.selectDate[0]);
      params.append("endDate", this.selectDate[1]);
      params.append("timeStrs", JSON.stringify(this.timeList));
      // this.$http.post('/api/plan/add_plan',{
      //     examLevel:this.form.examLev,
      //     beginDate:this.selectDate[0],
      //     endDate:this.selectDate[1],
      //     timeStrs:JSON.stringify(this.timeList)
      // }).then( res =>{
      //   console.log(res)
      // })
      this.$http.post("/api/plan/add_plan", params).then(res => {
        console.log(res);
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
    this.$http.get("/api/plan/plan_list", { params }).then(res => {
      // console.log(res.data.data.roomList)
      if (res.status === 200 && res.data.code === 0) {
        this.roomList = res.data.data.roomList;
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
