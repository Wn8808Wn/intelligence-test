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
                          :key="item.id"
                          :value="item.id"
                          :label="item.areaName">
                        </el-option>
                    </el-select>

                    <el-select  v-model="manageUnit" placeholder="全部管理单位" @change="changeManageUnit">
                        <el-option
                        v-for="item in manageUnits"
                        :key="item.id"
                        :label="item.unitName"
                        :value="item.id">
                        </el-option>
                    </el-select>

                    <el-select  v-model="examLevel" placeholder="全部报考级别" @change="changeExamLevel">
                        <el-option
                        v-for="item in examLevels"
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
                          <span v-if="scope.row.resultName === '未考试'" style="color: #000000">未考试</span>
                          <span v-else-if="scope.row.resultName === '未通过'" style="color: #F92020">未通过</span>
                          <span v-else-if="scope.row.resultName === '通过未认证'" style="color: #0067F1">通过未认证</span>
                          <span v-else-if="scope.row.resultName === '通过已认证'" style="color: #42D781">通过已认证</span>
                          <span v-else-if="scope.row.resultName === '已取消考试'" style="color: #6F6F6F">已取消考试</span>
                          <!-- <span v-else style="color: #6F6F6F">已取消考试</span> -->
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
      province: "",
      provinces: [],
      manageUnit: "",
      manageUnits: [],
      examLevel: "",
      examLevels: [],
      examResult: "",
      examResults: [
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
    getData(url, params) {
      this.$http.get(url, params).then(res => {
        console.log(res, 11111);
        if (res) {
          this.tableData = [];
          this.total = res.data.data.examStatusList.total;
          this.totalPage = res.data.data.examStatusList.totalPage;
          this.pageSize = res.data.data.examStatusList.pageSize;
          this.currentPage = res.data.data.examStatusList.page;
          this.tableData = res.data.data.examStatusList.rows;
          //全部省份
          this.provinces = res.data.data.areaList;
          //全部管理单位
          this.manageUnits = res.data.data.unitsList;
          //全部报考级别
          this.examLevels = res.data.data.levelList;
          //管理单位转换成对应的名字
          // if (res.data.data.unitsList && res.data.data.levelList) {
          //   this.tableData.forEach((item, index) => {
          //     item.examTime = this.getTimeStyle(item.examTime);
          //     //管理单位转换成对应的名字
          //     let unitID = item.manageUnit;
          //     item.manageUnit = res.data.data.unitsList.filter(
          //       (item, index, arr) => item.id === unitID
          //     )[0].unitName;
          //     //级别转换成对应的名字
          //     let examLevelID = item.examLevel;
          //     item.examLevel = res.data.data.levelList.filter(
          //       (item, index, arr) => item.id === examLevelID
          //     )[0].levelName;
          //     //报考级别转换成对应的名字
          //     let chessLevelID = item.chessLevel;
          //     item.chessLevel = res.data.data.levelList.filter(
          //       (item, index, arr) => item.id === chessLevelID
          //     )[0].levelName;
          //   });
          // }
        }
      });
    },
    handleCurrentChange(val) {
      let params = new URLSearchParams();
      params.append("page", val);
      params.append("userId", 1);
      this.getData("/api/exam/status_list", { params });
    },
    searchData() {
      //输入考生姓名或证件号搜索相对应的考场
      let params = new URLSearchParams();
      params.append("userId", 1);
      if (this.inputVal !== "") {
        params.append("str", this.inputVal);
      }
      if (this.province !== "") {
        params.append("provinceCode", this.province);
      }
      if (this.manageUnit !== "") {
        params.append("manageUnit", this.manageUnit);
      }

      if (this.examLevel !== "") {
        params.append("examLevel", this.examLevel);
      }

      if (this.examResult !== "") {
        params.append("examResult", this.examResult);
      }

      if (this.pickerTime !== "") {
        params.append("beginTime", this.pickerTime[0]);
        params.append("endTime", this.pickerTime[1]);
      }
      this.getData("/api/exam/status_list", { params });
    },
    changeProvince(val) {
      let params = new URLSearchParams();
      if (this.province !== "") {
        params.append("provinceCode", val);
      }

      if (this.manageUnit !== "") {
        params.append("manageUnit", this.manageUnit);
      }

      if (this.examLevel !== "") {
        params.append("examLevel", this.examLevel);
      }

      if (this.examResult !== "") {
        params.append("examResult", this.examResult);
      }

      if (this.pickerTime !== "") {
        params.append("beginTime", this.pickerTime[0]);
        params.append("endTime", this.pickerTime[1]);
      }
      this.getData("/api/exam/status_list", { params });
    },
    changeManageUnit(val) {
      let params = new URLSearchParams();
      if (this.province !== "") {
        params.append("provinceCode", this.province);
      }

      if (this.manageUnit !== "") {
        params.append("manageUnit", val);
      }

      if (this.examLevel !== "") {
        params.append("examLevel", this.examLevel);
      }

      if (this.examResult !== "") {
        params.append("examResult", this.examResult);
      }

      if (this.pickerTime !== "") {
        params.append("beginTime", this.pickerTime[0]);
        params.append("endTime", this.pickerTime[1]);
      }
      this.getData("/api/exam/status_list", { params });
    },
    changeExamLevel(val) {
      let params = new URLSearchParams();
      if (this.province !== "") {
        params.append("provinceCode", this.province);
      }

      if (this.manageUnit !== "") {
        params.append("manageUnit", this.manageUnit);
      }

      if (this.examLevel !== "") {
        params.append("examLevel", val);
      }

      if (this.examResult !== "") {
        params.append("examResult", this.examResult);
      }

      if (this.pickerTime !== "") {
        params.append("beginTime", this.pickerTime[0]);
        params.append("endTime", this.pickerTime[1]);
      }
      this.getData("/api/exam/status_list", { params });
    },
    changeExamResult(val) {
      let params = new URLSearchParams();
      if (this.province !== "") {
        params.append("provinceCode", this.province);
      }

      if (this.manageUnit !== "") {
        params.append("manageUnit", this.manageUnit);
      }

      if (this.examLevel !== "") {
        params.append("examLevel", this.examLevel);
      }

      if (this.examResult !== "") {
        params.append("examResult", val);
      }

      if (this.pickerTime !== "") {
        params.append("beginTime", this.pickerTime[0]);
        params.append("endTime", this.pickerTime[1]);
      }
      this.getData("/api/exam/status_list", { params });
    },
    changePickerTime(val) {
      let params = new URLSearchParams();
      if (this.province !== "") {
        params.append("provinceCode", this.province);
      }

      if (this.manageUnit !== "") {
        params.append("manageUnit", this.manageUnit);
      }

      if (this.examLevel !== "") {
        params.append("examLevel", this.examLevel);
      }

      if (this.examResult !== "") {
        params.append("examResult", this.examResult);
      }

      if (this.pickerTime !== "") {
        params.append("beginTime", val[0]);
        params.append("endTime", val[1]);
      }
      this.getData("/api/exam/status_list", { params });
    },
    handleDownload() {
      let params = new URLSearchParams();
      if (this.inputVal !== "") {
        params.append("str", this.inputVal);
      }
      if (this.province !== "") {
        params.append("provinceCode", this.province);
      }
      if (this.manageUnit !== "") {
        params.append("manageUnit", this.manageUnit);
      }

      if (this.examLevel !== "") {
        params.append("examLevel", this.examLevel);
      }

      if (this.examResult !== "") {
        params.append("examResult", this.examResult);
      }

      if (this.pickerTime !== "") {
        params.append("beginTime", this.pickerTime[0]);
        params.append("endTime", this.pickerTime[1]);
      }
      this.$http.get("/api/exam/export_list_all", { params }).then(res => {
        console.log(res);
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
    params.append("userId", 1);
    this.getData("/api/exam/status_list", { params });
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
