<template>
    <div class="standard">
        <div class="top">
            <el-button type="primary" icon="el-icon-plus"  round @click="handleAddStandardTemplate">新增模板</el-button>
            <el-select  v-model="value" placeholder="全部管理单位">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
        </div>

    <!-- 表格数据部分 -->
        <div class="tabs-data">     
            <el-table
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                prop="id"
                label="序号"
                width="74">
                </el-table-column>
                <el-table-column
                prop="manageUnit"
                label="管理单位"
                width="165">
                </el-table-column>
                <el-table-column
                prop="examLevel"
                label="级别"
                sortable  
                width="78">
                </el-table-column>
                <el-table-column
                prop="itemDifficulty"
                label="题库难度"
                width="104">
                </el-table-column>
                <el-table-column
                prop="knowledgeHierarchy"
                label="知识体系"
                width="245">
                </el-table-column>
                <el-table-column
                prop="examLength"
                label="考试时长"
                width="88">
                </el-table-column>
                <el-table-column
                prop="examServiceFee"
                label="考试服务费"
                width="106">
                </el-table-column>
                <el-table-column
                prop="certificationServiceFee"
                label="认证服务费"
                width="110">
                </el-table-column>
                <el-table-column
                prop="updatedTime"
                label="修改时间"
                width="133">
                </el-table-column>
                <el-table-column
                prop="updatedUser"
                label="修改人"
                width="95">
                </el-table-column>
                <el-table-column
                label="管理操作">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-error" @click.prevent="modifyData(scope.row.id)" >修改</el-button>
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
export default {
  data() {
    return {
      tableData: [
      ],
      options: [
        {
          value: "中国围棋协会",
          label: "中国围棋协会"
        },
        {
          value: "上海围棋协会",
          label: "上海围棋协会"
        },
        {
          value: "河北围棋协会",
          label: "河北围棋协会"
        },
        {
          value: "河南围棋协会",
          label: "河南围棋协会"
        },
        {
          value: "北京围棋协会",
          label: "北京围棋协会"
        }
      ],
      total: null,
      value: "",
      dataType:0,
      currentPage: 1,
      pageSize: 10,
      totalPage: null,
      total: null,
    };
  },
  methods: {
    handleAddStandardTemplate() {
      this.$router.push({path: '/addStandardTemplate' })
    },
    getData(url,params){
        this.tableData=null;
        this.$http.get(url,params).then(res => {
            // console.log(res.data.data.rows);
            this.total = res.data.data.total;
            this.totalPage = res.data.data.totalPage;
            this.pageSize = res.data.data.pageSize;
            this.currentPage = res.data.data.page;

            let rst = res.data.data.rows;
            this.tableData = rst;
            // console.log(this.tableData)
            //处理数据
            for(let i = 0 ;  i< this.tableData.length; i++){
              this.tableData[i].examLevel = rst[i].examLevel +'级'
              this.tableData[i].itemDifficulty = rst[i].itemDifficulty +'级'
              this.tableData[i].knowledgeHierarchy = rst[i].knowledgeHierarchy.replace(/道/g,'/')
              //处理时间
              let time = rst[i].updatedTime;
              let d = new Date(time);
              let times =
                  d.getFullYear() +"-" +(d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1): d.getMonth() + 1) +
                    "-" +
                  (d.getDate() < 10 ? "0" + d.getDate() : d.getDate() + 1);
               this.tableData[i].updatedTime = times 
            }
        })
    },
     handleCurrentChange(val) {
      let params = new URLSearchParams();
      params.append("dataType", this.dataType);
      params.append("userId", 1);
      params.append("page", val);
      this.getData("/api/standard/standard_list", { params });
    },

    // 修改对应的数据
    modifyData(id){
      this.$router.push({path:'/updateStandardTemplate',query: { id: id }})
      // console.log(id)
    },
    //查看详情页
    handldetails(id){
      this.$router.push({path:'/standardDetail',query: { id: id }})
      // console.log(id)
    }


  },
  created(){

    //进入页面显示考题标准信息
    let params = new URLSearchParams();
    params.append("userId", 1);
    params.append("dataType", this.dataType);
    this.getData("/api/standard/standard_list", { params });
  }
};
</script>

<style rel='stylesheet/scss' lang="scss">
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

  // 下拉菜单样式
  .el-select {
    margin: 34px 20px 22px 23px;
    .el-input__inner {
      color: #000;
      width: 180px;
      height: 38px;
      font-size: 16px;
      padding-left: 20px;
      background: #f8f8f8;
      border-radius: 38px;
      border: 1px solid #8b8b8b;
    }
  }
  // 下拉三角样式
  .el-select .el-input .el-select__caret {
    // color: #000;
    font-size: 22px;
    margin-right: 7px;
    margin-top: 1px;
  }
  & > p {
    height: 47px;
    padding-top: 48px;
    float: right;
    margin-right: 27px;
    font-size: 14px;
    color: #000;
  }
}
</style>
