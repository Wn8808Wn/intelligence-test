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
                    <el-button type="primary" plain  @click="dialogFormVisible = true" :disabled="addStatus===0"  :class="{'deactive': addStatus === 0 ,'active': addStatus === 1}" >新增</el-button>
                    <el-button type="primary" @click="showDelIconEvent" plain  :disabled="delStatus===0" :class="{'deactive': delStatus === 0 ,'active': delStatus === 1}">删除</el-button>
                    <el-button type="primary" plain @click="UNDO"  :disabled="recoveryStatus===0" :class="{'deactive': recoveryStatus === 0 ,'active': recoveryStatus === 1}">撤销</el-button>
                </div>
            </div>
        </div>
        
        <el-dialog title="新增计划" :visible.sync="dialogFormVisible" width="580px">
            <div class="setTop clearfix">
                <div class="setLev">
                    <p>设置报考级别:</p>
                    <el-select v-model="form.examLev" placeholder="请选择报考级别" @change="changeLevel">
                        <el-option
                            v-for="item in examLevClassify"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
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

        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
            <p><span>本次新增{{this.timeList.length*this.muchDate}}条</span>  <span>成功{{this.timeList.length*this.muchDate}}条</span>  <span>失败{{0}}条</span></p>
            <!-- <p>失败如下:</p>
            <p v-for="(item,index) in errorList" :key="index">
                <span>日期</span> <span>时间</span>
            </p> -->
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">完 成({{timeOff}})</el-button>
            </span>
       </el-dialog>

        <div class="tabs-data" id="addPlanTabs">     
            <el-table 
            border
            :sort-method='sortExamLevel'
            :data="tableData" 
            style="width: 862px">
            <el-table-column
            label="日期"
            width="153">
            <template slot-scope="scope">
              <span style="margin-right:10px">{{scope.row.examDate.split(' ')[0]}}</span>  <span>周{{"日一二三四五六".charAt(new Date(scope.row.examDate).getDay())}}</span>
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
                  <i  v-if='showDelIcon && outTime(scope.row.openTime)' class="el-icon-error" @click="delCurRow(scope.row)" style="cursor:pointer;color:#1f91b5;margin-left:10px;"></i>
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
          label: "25级 — 10级 30分钟",
          id: 1
        },
        {
          label: "9 级 — 1 级  45分钟",
          id: 2
        },
        {
          label: "1 段 — 4 段  60分钟",
          id: 3
        },
        {
          label: "5 段   90分钟",
          id: 4
        }
      ],
      dialogFormVisible: false,
      form: {
        examLev: 1
      },
      selectDate: "",
      timeList: [],
      showDelIcon: false,
      addStatus:0,  //初始化新增按钮的样式 0:不可用 1：可用
      delStatus:0,  //初始化删除按钮的样式 0:不可用 (没有数据或初始化) 1：可用
      recoveryStatus: 0,// 通过状态码来控制撤销状态
      page: null,
      total:null,
      totalPage:null,
      pageSize:6,
      dialogVisible:false,
      errorList:[],
      timeOff:5,
      muchDate:'',
    };
  },
  methods: {
    sortExamLevel(a,b){
      return a-b;
    },
    outTime(time){
        var strtime = time.replace("/-/g", "/");//时间转换
        var date1=new Date(strtime).getTime();
        //现在时间
        var date2=new Date().getTime();
        //判断时间是否过期
        return date1>date2?true:false;
    },
    getData(params){
        this.$http.get("/api/plan/room_plan",params).then(res =>{
          console.log(res,'000')
          if(res.data.code === 0){
            this.tableData=[];
            this.totalPage = res.data.data.totalPage;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.page = res.data.data.page;
            this.tableData=res.data.data.rows;
            if(this.tableData.length>0){
              this.delStatus =1;  // 有数据才可以删除
            }else{
              this.delStatus =0;  // 没有数据禁用
            }
            this.tableData.forEach((item, index) => {
                item.openTime = item.signOpenDate.split(' ')[0]+' '+item.signOpenTime;
            })
          }
        })
    },
    chooseRoom(val) {
      this.addStatus =1; //选择考场后新增功能可用
      console.log(val,'val')
      var obj = this.roomList.filter(item => item.id === val);
      this.realSeatings = obj[0].seatSize-obj[0].spareSeatSize
      let params = new URLSearchParams();
      params.append("roomId", val);
      params.append('activeStatus',0)
      this.getData({ params })
    },
    showDelIconEvent() {
      this.showDelIcon = !this.showDelIcon;
      if(this.showDelIcon === false){
        this.$store.dispatch('resetDeledeleCurrentRowId',null)
      }
      if (this.showDelIcon && this.$store.state.deleCurrentRowId !==null){
        this.recoveryStatus = 1;
      } else {
        this.recoveryStatus = 0;
      }
    },
    handleCurrentChange(val) {
      // console.log(val)
      let params = new URLSearchParams();
      params.append("page", val);
      params.append('activeStatus',0)
      params.append("roomId", this.examRoomId)
      // params.append("provinceCode",110000) //后期更改
      this.getData({ params });
    },
    //删除当前行
    delCurRow(row) {
      this.recoveryStatus =1; //删除后撤销功能启用;
      let params = new URLSearchParams()
      params.append('id',row.id)
      params.append('activeStatus',1)
      this.$http.post("/api/plan/edit_plan",params).then( res =>{
          // console.log(res)
          if(res.data.code === 0 && res.data.msg ==='操作成功'){
            this.$message({
              type:'success',
              showClose: true,
              message:'删除成功'
            })
           this.$store.dispatch('deleCurrentRow',row.id)
           //删除后刷新页面
           let params = new URLSearchParams();
            params.append("roomId", this.examRoomId);
            params.append('activeStatus',0)
            // params.append("provinceCode",110000) //后期更改
            this.getData({ params })
          //  console.log(row.id,this.$store.state.deleCurrentRowId,"22222")
          }else{
             this.$message({
              type:'error',
              showClose: true,
              message:'删除不成功'
            })
          }
      })
     
    },
    UNDO() {
      var index = this.$store.state.deleCurrentRowId;
      // console.log(index,"111")
      let params = new URLSearchParams()
      params.append('id',index)
      params.append('activeStatus',0)
      this.$http.post("/api/plan/edit_plan",params).then( res =>{
          // console.log(res)
          if(res.data.code === 0 && res.data.msg ==='操作成功'){
            this.recoveryStatus =0; //撤销成功后禁用撤销
            let params = new URLSearchParams();
            params.append("roomId", this.examRoomId);
            params.append('activeStatus',0)
            // params.append("provinceCode",110000) //后期更改
            this.getData({ params })
            this.$message({
              type:'success',
              showClose: true,
              message:'恢复成功'
            })
          }
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
    changeLevel(val){
      this.form.examLev=val;
    },
    addData(val) {
      this.timeList[this.timeList.length - 1] = val;
      // console.log(this.timeList, "aaaaa");
    },
    setIntervalFn(){
      var timer = setInterval(()=>{
          this.timeOff--;
          if(this.timeOff<=0){
           this.dialogVisible =false;
           this.form.examLev =1;
           this.selectDate ='';
           this.timeList = [];
           let params = new URLSearchParams()
           params.append("roomId", this.examRoomId);
           params.append('activeStatus',0)
          //  params.append("provinceCode",110000) //后期更改
           this.getData({ params })
           clearInterval(timer);
          }
      }, 1000);
    },
    submitBtn() {
      let params = new URLSearchParams();
      params.append("roomId", this.examRoomId);
      params.append("examLevel", this.form.examLev);
      params.append("beginDate", this.selectDate[0]);
      params.append("endDate", this.selectDate[1]);
      params.append("timeStrs", JSON.stringify(this.timeList));
      this.muchDate = (this.selectDate[1].getTime()-this.selectDate[0].getTime())/(1000*60*60*24)+1
      console.log(this.muchDate,'this.machdate')
      this.$http.post("/api/plan/add_plan", params).then(res => {
          if(res.data.code===0){
              var p1 = new Promise( (resolve, reject)=> {
                setTimeout(()=>{
                    this.dialogFormVisible = false;
                }, 2000, 'P1');
              });
              var p2 = new Promise( (resolve, reject) => {
                  setTimeout(()=>{
                      this.dialogVisible =true;
                      this.timeOff = 5 ;
                      this.setIntervalFn()
                  }, 3500, 'P2');
              });
          }
      });
    }
  },
  mounted() {
    let params = new URLSearchParams();
    this.$http.get("/api/room/get_room_by_province", { params }).then(res => {
      console.log(res,"roomList")
      if ( res.data.code === 0) {
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
          color: #000000;
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
