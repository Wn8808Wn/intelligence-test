<template>
    <div class="addPlanPages">   
        <commonTop :titleTop="title"></commonTop>
        <div class="examSelect">
            <div class="prov">
                    <span class="commontips">考场:</span>
                    <el-select v-model="examRoom" placeholder="请选择考场">
                        <el-option
                        v-for="item in examRooms"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
            </div>
            <p>座位数:<span>20个</span></p>
        </div>

        <div class="examSelect">
            <div class="prov">
                <span class="commontips">考场计划:</span>
                <div class="btnGroup">
                    <el-button type="primary" plain  @click="dialogFormVisible = true">新增</el-button>
                    <el-button type="primary" @click="showDelIconEvent" plain>删除</el-button>
                    <el-button type="primary" plain @click="UNDO">撤销</el-button>
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
                                v-for="(item,index) in timeList" :key="index"
                                >
                            </setTimeItem>
                            <el-button type="primary" @click="addTimeEvent" icon="el-icon-plus" round>增加</el-button>
                        </div>
                        
                        <p>开放报名时间: 提前两周，当日早上8：00开放报名</p>
                        
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogFormVisible = false" round>完 成</el-button>
                    </div>
                    </el-dialog>

        <div class="tabs-data addPlanTabs">     
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
        </div>
</div>

</template>

<script>
import commonTop from "../common/commonTop";
import setTimeItem from '../common/setExamTime';
export default {
  data() {
    return {
      title: "新增计划",
      examRoom: "",
      examRooms: "",
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
      timeList:[],
      showDelIcon:false,
      delTabs:[]
    };
  },
  components: {
    commonTop,
    setTimeItem
  },
  methods:{
      showDelIconEvent(){
        this.showDelIcon = !this.showDelIcon;
      },
      delCurRow(index){
        this.delTabs.push(this.tableData[index])
        this.delTabs.splice(0,this.delTabs.length-1)
        this.tableData.splice(index,1);
        console.log(this.tableData)
      },
      //撤销 删除的数据重新存入一个新数组delTabs，当点击时拿到数组中最后一个回填至tableData中。
      UNDO(){
        if(this.delTabs.length <= 0){
          this.$message({
            showClose:true,
            type:'warning',
            message:'抱歉,只能撤销一步'

          })
        }else{
          this.tableData.push(this.delTabs.pop())
          console.log(this.tableData,this.delTabs)
        }
        // this.tableData.push(this.delTabs[this.delTabs.length-1])
        // this.delTabs.pop()
      },
      addTimeEvent() {
        //  this.timeList.push({'stTime':this.startExamTime,'endTime':this.endExamTime});
         this.timeList.push({});
         if(this.timeList.length >=6){
            this.$message({
              showClose: true,
              message: '每天最多只能添加6场考试',
              type: 'warning'
            });
            this.timeList.length = 6;
         }
      },
      delCurTimeEmitter(index){
          this.timeList.splice(index,1);
      },
  },
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
          background: #c3c3c3;
          color: #333333;
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
  .addPlanTabs {
    padding: 0;
    & /deep/ .el-table tr {
      background-color: #ffffff;
    }
    & /deep/ .el-table__header {
      box-sizing: border-box;
      border-collapse: collapse;
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
    &>p{
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
    .setTimer{
        width: 100%;
        float: left;
        &>p{
            width: 100%;
            height: 40px;
            font-size: 16px;
            color: #000;
            line-height: 40px;
            margin-bottom: 10px;
        }
        &>.el-button.is-round{
          padding: 10px 10px;
          width: 84px;
          height: 37px;
          background: #1f91b5;
        }
    }
  }
  & /deep/ .el-dialog__body{
      height: 500px;
  }
  .dialog-footer{
    &>.el-button--primary{
      padding: 10px 10px;
      width: 84px;
      height: 37px;
      background: #1f91b5;
    }
  }
}
</style>
