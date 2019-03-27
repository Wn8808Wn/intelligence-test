<template>
    <div>
         <div class="examStatus commonRight">
            <el-tabs type="border-card">
                <el-tab-pane>
                <span slot="label"><i class="el-icon-date iconfont icon-kaoshizhuangtaichaxun-"></i>考试状态查询</span>
                <div class="top">
                    <div class="search">
                        <input type="text" placeholder="请输入考生姓名/证件号"  v-model.trim ="inputVal">
                        <el-button circle @click="searchData">搜索</el-button>
                    </div>
                    <el-button  type="primary" round icon="el-icon-more iconfont icon-yijiandaochu" @click="handleDownload">一键导出</el-button>
                    <p class="NoFloat">共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
                </div>
                <div class="top" id="topSearch">
                    <el-select  v-model="province" placeholder="全部省份" @change="changeProvince">
                        <el-option
                          v-for="item in provinces"
                          :key="item.value"
                          :value="item.value"
                          :label="item.label">
                        </el-option>
                    </el-select>

                    <el-select  v-model="manageUnit" placeholder="全部管理单位" @change="changeManageUnit">
                        <el-option
                        v-for="item in manageUnits"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select  v-model="examLevel" placeholder="全部报考级别" @change="changeExamLevel">
                        <el-option
                        v-for="item in examLevels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    
                    <el-select  v-model="examResult" placeholder="全部考试状态" @change="changeExamResult" >
                        <el-option
                        v-for="item in examResults"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    
                      <el-date-picker
                        v-model="pickerTime"
                        type="daterange"
                        @change="changePickerTime"
                        format="yyyy 年 MM 月 dd 日"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                 </div>
                <!-- 表格数据部分 -->
                <div class="tabs-data" id="tableStatus">     
                    <el-table
                    :data="tableData"
                    stripe
                    style="width: 1130px">
                        <el-table-column
                        prop="province"
                        label="省份"
                        width="134">
                        </el-table-column>
                        <el-table-column
                        prop="manageUnit"
                        label="管理单位"
                        width="195">
                        </el-table-column>
                        <el-table-column
                        prop="playerName"
                        label="姓名"
                        width="80">
                        </el-table-column>
                        <el-table-column
                        prop="certificateNo"
                        label="证件号"
                        width="166">
                        </el-table-column>
                        <el-table-column
                        prop="phone"
                        label="联系方式"
                        width="111">
                        </el-table-column>
                        <el-table-column
                        prop="chessLevel"
                        label="级别"
                        width="58">
                        </el-table-column>

                        <el-table-column
                          label="报考级别"
                          width="81">
                          <template slot-scope="scope">
                            <p>{{ scope.row.examLevel[scope.row.examLevel.length-1] === 'k'  ? parseInt(scope.row.examLevel,10)+"级" : parseInt(scope.row.examLevel,10) +"段"}}</p>
                          </template>
                        </el-table-column>
                        
                        <el-table-column
                        prop="examTime"
                        label="考试时间"
                        width="135">
                        </el-table-column>

                        <el-table-column
                        label="考试状态"
                       >
                        <template slot-scope="scope">
                          <span v-if="scope.row.examResult== 0" style="color: red">待考试</span>
                          <span v-else-if="scope.row.examResult== 1" style="color: black">已通过</span>
                          <span v-else-if="scope.row.examResult== 2" style="color: blue">未通过</span>
                          <span v-else style="color: darkgray">已取消考试</span>
                        </template>
                      </el-table-column>
                    </el-table>
                    
                    <el-pagination
                    background
                    :total="total" 
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange">
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
      inputVal:'',
      currentPage: 1,
      pageSize: 10,
      totalPage: '',
      total: null,
      tableData: [
      ],
      province:'',
      provinces: [
        {
          value: "河北省",
          label: "河北省"
        },
        {
          value: "北京",
          label: "北京"
        },
        {
          value: "湖南省",
          label: "湖南省"
        },
        {
          value: "湖北省",
          label: "湖北省"
        }
        
      ],
      manageUnit:'',
      manageUnits: [
        {
          value: 1,
          label: "河北省围棋协会"
        },
        {
          value: 2,
          label: "北京围棋协会"
        },
        {
          value: 3,
          label: "湖南省围棋协会"
        },
        {
          value: 4,
          label: "湖北省围棋协会"
        }
      ],
      examLevel:'',
      examLevels:[
         {
          value: 5,
          label: "5级"
        },
        {
          value: 10,
          label: "10级"
        },
        {
          value: 15,
          label: "15级"
        },
        {
          value: 20,
          label: "20级"
        }
      ],
      examResult:'',
      examResults:[
        {
          value: 0,
          label: "未考试"
        },
        {
          value: 1,
          label: "未通过"
        },
        {
          value: 2,
          label: "通过未认证"
        },
        {
          value: 3,
          label: "通过已认证"
        },
        {
          value: 4,
          label: "已取消考试"
        }

      ],
       pickerTime:'',
       certificateNo:''
    };
  },
  methods: {
    getData(url,params){
      this.$http.get(url,params).then(res => {
        if(res){
          this.tableData =[];
          this.total = res.data.data.total;
          this.totalPage = res.data.data.totalPage;
          this.pageSize = res.data.data.pageSize;
          this.currentPage = res.data.data.page;
          let rst = res.data.data.rows
          this.tableData = rst;
          // console.log(this.tableData)
          this.tableData.forEach((item,index)=>{
              item.examTime = this.getTimeStyle(item.examTime);
            })
        }
       
      })
    },
    handleCurrentChange(val) {
      let params = new URLSearchParams();
      params.append("page",val);
      params.append("userId", 1);
      this.getData("/api/order/order_list", { params });
    },
    searchData(){
      //输入考生姓名或证件号搜索相对应的考场 
      let params = new URLSearchParams();
      params.append("userId", 1);
      params.append("str", this.inputVal);
      this.getData("/api/exam/status_list", { params }); 
    },
    changeProvince(data){
      let params = new URLSearchParams();
      if(this.province !== ''){
        params.append("province",data); 
      }
      if(this.manageUnit !== ''){
        params.append("manageUnit",this.manageUnit); 
          
      }

      if(this.examLevel !== ''){
        params.append("examLevel",this.examLevel); 
      }
      
      if(this.examResult !== ''){  
         params.append("examResult",this.examResult); 
      }

      if(this.pickerTime !== ''){
        params.append("pickerTime",this.pickerTime); 
      }
      this.getData("/api/exam/status_list", { params });
    },
    changeManageUnit(data){
      let params = new URLSearchParams();
      if(this.province !== ''){
        params.append("province",this.province); 
      }
      if(this.manageUnit !== ''){
        params.append("manageUnit",data); 
      }

      if(this.examLevel !== ''){
        params.append("examLevel",this.examLevel); 
      }
      
      if(this.examResult !== ''){  
         params.append("examResult",this.examResult); 
      }

      if(this.pickerTime !== ''){
        params.append("pickerTime",this.pickerTime); 
      }
      this.getData("/api/exam/status_list", { params });
    },
    changeExamLevel(data){
     let params = new URLSearchParams();
      if(this.province !== ''){
        params.append("province",this.province); 
      }
      if(this.manageUnit !== ''){
        params.append("manageUnit",this.manageUnit); 
          
      }

      if(this.examLevel !== ''){
        params.append("examLevel",data); 
      }
      
      if(this.examResult !== ''){  
         params.append("examResult",this.examResult); 
      }

      if(this.pickerTime !== ''){
        params.append("pickerTime",this.pickerTime); 
      }
      this.getData("/api/exam/status_list", { params });
    },
    changeExamResult(data){
      let params = new URLSearchParams();
      if(this.province !== ''){
        params.append("province",this.province); 
      }
      if(this.manageUnit !== ''){
        params.append("manageUnit",this.manageUnit); 
          
      }

      if(this.examLevel !== ''){
        params.append("examLevel",this.examLevel); 
      }
      
      if(this.examResult !== ''){  
         params.append("examResult",data); 
      }

      if(this.pickerTime !== ''){
        params.append("pickerTime",this.pickerTime); 
      }
      this.getData("/api/exam/status_list", { params });
    },
    changePickerTime(data){
      let params = new URLSearchParams();
      if(this.province !== ''){
        params.append("province",this.province); 
      }
      if(this.manageUnit !== ''){
        params.append("manageUnit",this.manageUnit); 
          
      }

      if(this.examLevel !== ''){
        params.append("examLevel",this.examLevel); 
      }
      
      if(this.examResult !== ''){  
         params.append("examResult",this.examResult); 
      }

      if(this.pickerTime !== ''){
        params.append("beginTime",this.pickerTime[0])
        params.append("endTime",this.pickerTime[1])
      }

      this.getData("/api/exam/status_list", { params });
    },
    handleDownload() { 
      let params = new URLSearchParams()
      params.append("province",this.province)
      params.append("manageUnit",this.manageUnit)
      params.append("examLevel",this.examLevel)
      params.append("examResult",this.examResult)  
      params.append("beginTime",this.pickerTime[0])
      params.append("endTime",this.pickerTime[1])
      this.$http.get('/api/exam/export_list_all',{params}).then( res => {
            console.log(res.data.data)
            this.tableData = res.data.data
            require.ensure([], () => { // 用 webpack Code Splitting xlsl还是很大的
            const { export_json_to_excel } = require('@/vendor/Export2Excel');
            const tHeader = ['省份', '管理单位', '姓名','证件号',
                  '联系方式','级别','报考级别', '考试时间', '考试状态'
                ]; // excel 表格头
            const filterVal = ['province', 'manageUnit','playerName','certificateNo',
                 'phone','chessLevel', 'examLevel', 'examTime','examResult'
                ];
            const list = this.tableData;
            const data = this.formatJson(filterVal, list); // 自行洗数据 按序排序的一个array数组
            export_json_to_excel(tHeader, data, '导出的excel表');
          })
      })
  },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
  },
  created(){
    //页面进入请求数据
    let params = new URLSearchParams();
    params.append("userId", 1);
    this.getData("/api/exam/status_list", { params });
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.examStatus{
  width: 1176px;
  & /deep/ .el-tabs--border-card > .el-tabs__content {
      padding: 0px;
  }
  .top>.NoFloat{
      float: none;
      margin-right: 0;
  }
  .top > .el-button.el-button--primary.is-round{
    margin-left: 440px;
    width: 145px;
  }
  #tableStatus{
    min-height: 695px;
  }
}
#topSearch{
  height: 76px;
  &>.el-select{
    margin:5px 10px  0 0;
    &:nth-of-type(1){
      margin-left: 23px;
    }
  }
  //修改时间划过样式border变蓝色
  .el-input__inner{
    border-radius: 32px;
    border-color:#8b8b8b;
  }
  .el-range-editor.is-active, .el-range-editor.is-active:hover{
    border-color: #409EFF;
  }
}
</style>
