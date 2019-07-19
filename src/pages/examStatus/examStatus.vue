<template>
    <div>
         <div class="examStatus commonRight">
            <el-tabs type="border-card">
                <el-tab-pane>
                <span slot="label"><i class="iconfont icon-kaoshizhuangtaichaxun-"></i>考试状态查询</span>
                <div class="top">
                    <div class="search">
                        <input type="text" placeholder="请输入考生姓名/证件号"  v-model.trim ="inputVal">
                        <el-button circle @click="searchData">搜索</el-button>
                    </div>
                    <el-button  type="primary" round icon="iconfont icon-yijiandaochu" @click="handleDownload">一键导出</el-button>
                    <p class="NoFloat">共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
                </div>
                <div class="top" id="topSearch">
                    <el-select  v-model="province" placeholder="全部省份" @change="changeProvince">
                        <el-option
                          v-for="item in provincesList"
                          :key="item.id"
                          :value="item.id"
                          :label="item.areaName">
                        </el-option>
                    </el-select>

                    <el-select  v-model="manageUnit" placeholder="全部管理单位" @change="changeManageUnit">
                        <el-option
                        v-for="item in manageUnitsList"
                        :key="item.id"
                        :label="item.unitName"
                        :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select  v-model="examLevel" placeholder="全部报考级别" @change="changeExamLevel">
                        <el-option
                        v-for="item in examLevelsList"
                        :key="item.id"
                        :label="item.levelName"
                        :value="item.id">
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
                        format="yyyy - MM - dd "
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
                        prop="manageUnitName"
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
                        prop="chessLevelName"
                        label="级别"
                        width="58">
                        </el-table-column>

                        <el-table-column
                          prop="examLevelName"
                          label="报考级别"
                          width="81">
                        </el-table-column>
                        
                        <el-table-column
                        prop="examTimeStr"
                        label="考试时间"
                        width="160">
                        </el-table-column>
                      
                       <!-- <el-table-column
                        prop="resultName"
                        label="考试状态"
                        width="135">
                        </el-table-column> -->

                        <el-table-column
                        label="考试状态"
                       >
                        <template slot-scope="scope">
                          <span v-if="scope.row.resultName === '未考试'" style="color: #000000">待考试</span>
                          <span v-else-if="scope.row.resultName === '未通过'" style="color: #F92020">未通过</span>
                          <span v-else-if="scope.row.resultName === '通过未认证'" style="color: #0067F1">通过未认证</span>
                          <span v-else-if="scope.row.resultName === '通过已认证'" style="color: #42D781">通过已认证</span>
                          <span v-else-if="scope.row.resultName === '已取消考试'" style="color: #6F6F6F">已取消考试</span>
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
      inputVal: "",
      currentPage: 1,
      pageSize: 10,
      totalPage: "",
      total: 0,
      tableData: [],
      province: '',
      provincesList: [],
      manageUnit: '',
      manageUnitsList: [],
      examLevel: '',
      examLevelsList: [],
      examResult: '',
      examResults: [
        {
          value: -1,
          label: "全部"
        },
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
      pickerTime: "",
      certificateNo: ""
    };
  },
  methods: {
    getData(params) {
      this.$http.get('/api/exam/status_list', {params}).then(res => {
        if (res.data.code === 0) {
          console.log(res.data.data,'ddd')
          this.tableData = [];
          this.total = res.data.data.examStatusList.total;
          this.totalPage = res.data.data.examStatusList.totalPage;
          this.pageSize = res.data.data.examStatusList.pageSize;
          this.currentPage = res.data.data.examStatusList.page;
          this.tableData = res.data.data.examStatusList.rows;
          //全部省份
          this.provincesList = res.data.data.areaList;
          this.provincesList.unshift({areaName:'全部',id:0})
          //全部管理单位
          this.manageUnitsList = res.data.data.unitsList;
          this.manageUnitsList.unshift({unitName:'全部',id:0})
          //全部报考级别
          this.examLevelsList = res.data.data.levelList;
          this.examLevelsList.unshift({levelName:'全部',id:0})
        }
      });
    },
    handleCurrentChange(val) {
        let params = new URLSearchParams();
        params.append("page", val);
        if (this.inputVal !== "") {
            params.append("str", this.inputVal);
        }else{
            params.append("str",'');
        }
        if (this.province !== "") {
            params.append("provinceCode", this.province);
        }else{
            params.append("provinceCode",0);
        }
        if (this.manageUnit !== "") {
            params.append("manageUnit", this.manageUnit);
        }else{
            params.append("manageUnit",0);
        }
        if (this.examLevel !== "") {
            params.append("examLevel", this.examLevel);
        }else{
            params.append("examLevel",0);
        }
        if (this.examResult !== "") {
            params.append("examResult", this.examResult);
        }else{
            params.append("examResult",-1);
        }
        if(this.pickerTime !== '' && this.pickerTime !== null){
            params.append("beginTime", this.pickerTime[0]);
            params.append("endTime", this.pickerTime[1]);
        }
        this.getData(params);
    },
    searchData() {
        //输入考生姓名或证件号搜索相对应的考场
        let params = new URLSearchParams();
        params.append("str", this.inputVal);
        if (this.province !== "") {
            params.append("provinceCode", this.province);
        }else{
            params.append("provinceCode", 0);
        }
        if (this.manageUnit !== "") {
            params.append("manageUnit", this.manageUnit);
        }else{
            params.append("manageUnit", 0);
        }
        if (this.examLevel !== "") {
            params.append("examLevel", this.examLevel);
        }else{
            params.append("examLevel", 0);
        }
        if (this.examResult !== "") {
            params.append("examResult", this.examResult);
        }else{
            params.append("examResult", -1);
        }
        if(this.pickerTime !== '' && this.pickerTime !== null){
            params.append("beginTime", this.pickerTime[0]);
            params.append("endTime", this.pickerTime[1]);
        }
        this.getData(params);
    },
    changeProvince(val) {
        let params = new URLSearchParams();
        this.province =val;
        params.append("provinceCode", val);
        if (this.inputVal !== "") {
            params.append("str", this.inputVal);
        }else{
            params.append("str",'');
        }
        if (this.manageUnit !== "") {
            params.append("manageUnit", this.manageUnit);
        }else{
            params.append("manageUnit", 0);
        }
        if (this.examLevel !== "") {
            params.append("examLevel", this.examLevel);
        }else{
            params.append("examLevel", 0);
        }
        if (this.examResult !== "") {
            params.append("examResult", this.examResult);
        }else{
            params.append("examResult", -1);
        }
        if(this.pickerTime !== '' && this.pickerTime !== null){
            params.append("beginTime", this.pickerTime[0]);
            params.append("endTime", this.pickerTime[1]);
        }
        this.getData(params);
    },
    changeManageUnit(val) {
        let params = new URLSearchParams();
        this.manageUnit =val;
        params.append("manageUnit", val);
        if (this.inputVal !== "") {
            params.append("str", this.inputVal);
        }else{
            params.append("str",'');
        }
        if (this.province !== "") {
            params.append("provinceCode", this.province);
        }else{
            params.append("provinceCode", 0);
        }
        if (this.examLevel !== "") {
            params.append("examLevel", this.examLevel);
        }else{
            params.append("examLevel", 0);
        }
        if (this.examResult !== "") {
            params.append("examResult", this.examResult);
        }else{
            params.append("examResult", -1);
        }
        if(this.pickerTime !== '' && this.pickerTime !== null){
            params.append("beginTime", this.pickerTime[0]);
            params.append("endTime", this.pickerTime[1]);
        }
        this.getData(params);
    },
    changeExamLevel(val) {
        let params = new URLSearchParams();
        this.examLevel =val;
        params.append("examLevel", val);
        if (this.inputVal !== "") {
            params.append("str", this.inputVal);
        }else{
            params.append("str",'');
        }
        if (this.province !== "") {
            params.append("provinceCode", this.province);
        }else{
            params.append("provinceCode", 0);
        }
        if (this.manageUnit !== "") {
            params.append("manageUnit", this.manageUnit);
        }else{
            params.append("manageUnit", 0);
        }
        if (this.examResult !== "") {
            params.append("examResult", this.examResult);
        }else{
            params.append("examResult", -1);
        }
        if(this.pickerTime !== '' && this.pickerTime !== null){
            params.append("beginTime", this.pickerTime[0]);
            params.append("endTime", this.pickerTime[1]);
        }
        this.getData(params);
    },
    changeExamResult(val) {
        let params = new URLSearchParams();
        this.examResult=val;
        params.append("examResult", val);
        if (this.inputVal !== "") {
            params.append("str", this.inputVal);
        }else{
            params.append("str",'');
        }
        if (this.province !== "") {
            params.append("provinceCode", this.province);
        }else{
            params.append("provinceCode", 0);
        }
        if (this.manageUnit !== "") {
            params.append("manageUnit", this.manageUnit);
        }else{
            params.append("manageUnit", 0);
        }
        if (this.examLevel !== "") {
            params.append("examLevel", this.examLevel);
        }else{
            params.append("examLevel", 0);
        }
        if(this.pickerTime !== '' && this.pickerTime !== null){
            params.append("beginTime", this.pickerTime[0]);
            params.append("endTime", this.pickerTime[1]);
        }
        this.getData(params);
    },
    changePickerTime(val) {
        let params = new URLSearchParams();
        if (this.inputVal !== "") {
            params.append("str", this.inputVal);
        }else{
            params.append("str",'');
        }
        if (this.province !== "") {
            params.append("provinceCode", this.province);
        }else{
            params.append("provinceCode", 0);
        }
        if (this.manageUnit !== "") {
            params.append("manageUnit", this.manageUnit);
        }else{
            params.append("manageUnit", 0);
        }
        if (this.examLevel !== "") {
            params.append("examLevel", this.examLevel);
        }else{
            params.append("examLevel", 0);
        }
        if (this.examResult !== "") {
            params.append("examResult", this.examResult);
        }else{
            params.append("examResult", -1);
        }
        if(this.pickerTime !== '' && this.pickerTime !== null){
            params.append("beginTime", this.pickerTime[0]);
            params.append("endTime", this.pickerTime[1]);
        }
        this.getData(params);
    },
    handleDownload() {
        let params = new URLSearchParams();
        if (this.inputVal !== "") {
            params.append("str", this.inputVal);
        }else{
            params.append("str",'');
        }
        if (this.province !== "") {
            params.append("provinceCode", this.province);
        }else{
            params.append("provinceCode",0);
        }
        if (this.manageUnit !== "") {
            params.append("manageUnit", this.manageUnit);
        }else{
            params.append("manageUnit",0);
        }
        if (this.examLevel !== "") {
            params.append("examLevel", this.examLevel);
        }else{
            params.append("examLevel",0);
        }
        if (this.examResult !== "") {
            params.append("examResult", this.examResult);
        }else{
            params.append("examResult",-1);
        }
        if(this.pickerTime !== '' && this.pickerTime !== null){
            params.append("beginTime", this.pickerTime[0]);
            params.append("endTime", this.pickerTime[1]);
        }
        this.$http.get("/api/exam/export_list_all", { params }).then( res => {
            this.tableData = res.data.data;
            require.ensure([], () => {
            // 用 webpack Code Splitting xlsl还是很大的
            const { export_json_to_excel } = require("@/vendor/Export2Excel");
            const tHeader = [
                "省份",
                "管理单位",
                "姓名",
                "证件号",
                "联系方式",
                "级别",
                "报考级别",
                "考试时间",
                "考试状态"
            ]; // excel 表格头
            const filterVal = [
                "province",
                "manageUnitName",
                "playerName",
                "certificateNo",
                "phone",
                "chessLevelName",
                "examLevelName",
                "examTimeStr",
                "resultName"
            ];
            const list = this.tableData;
            const data = this.formatJson(filterVal, list); // 自行洗数据 按序排序的一个array数组
            export_json_to_excel(tHeader, data, "导出的excel表");
            });
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  created() {
    //页面进入请求数据
    let params = new URLSearchParams();
    params.append("provinceCode", 0);
    params.append("areaLevel", 1);
    params.append("manageUnit", 0);
    params.append("examLevel", 0);
    params.append("examResult", -1);
    // params.append('beginTime','');
    // params.append('endTime','');
    this.getData(params);
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.examStatus {
  width: 1176px;
  & /deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
  .top > .NoFloat {
    float: none;
    margin-right: 0;
  }
  .top > .el-button.el-button--primary.is-round {
    margin-left: 440px;
    width: 145px;
  }
  #tableStatus {
    min-height: 695px;
  }
}
#topSearch {
  height: 76px;
  & > .el-select {
    margin: 5px 10px 0 0;
    &:nth-of-type(1) {
      margin-left: 23px;
    }
  }
  //修改时间划过样式border变蓝色
  .el-input__inner {
    border-radius: 32px;
    border-color: #8b8b8b;
  }
  .el-range-editor.is-active,
  .el-range-editor.is-active:hover {
    border-color: #409eff;
  }
}
</style>
