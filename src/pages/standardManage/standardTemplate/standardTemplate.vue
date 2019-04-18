<template>
    <div class="standard">
        <div class="top">
            <el-button type="primary" icon="el-icon-plus"  round @click="handleAddStandardTemplate">新增模板</el-button>
            <el-select  v-model="currManageUnit" placeholder="全部管理单位" @change="changeSearch">
                <el-option
                v-for="item in unitsList"
                :key="item.id"
                :label="item.unitName"
                :value="item.id">
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
                type="index"
                :index="indexMethod"
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
      tableData: [],
      unitsList:[],
      levelList:[],
      currManageUnit:"",
      total: null,
      dataType:0,
      currentPage: 1,
      pageSize: 10,
      totalPage: null,
      total: null,
    };
  },
  methods: {
    indexMethod(index){
        return index+1+this.pageSize*(this.currentPage-1);
    },
    handleAddStandardTemplate() {
      this.$router.push({name: 'addStandardTemplate' })
    },
    getData(url,params){
        this.$http.get(url,params).then(res => {
            this.tableData=[];
            this.total = res.data.data.standPage.total;
            this.currentPage = res.data.data.standPage.page;
            this.pageSize = res.data.data.standPage.pageSize;
            this.totalPage = res.data.data.standPage.totalPage;
            this.tableData = res.data.data.standPage.rows;;
            this.unitsList  = res.data.data.unitsList;
            this.levelList = res.data.data.levelList;
            this.tableData.forEach( (item,index) =>{
                item.manageUnit = this.unitsList.filter( (val) => val.id === item.manageUnit)[0].unitName
                item.examLevel = this.levelList.filter( (val) => val.id === item.examLevel)[0].levelName
                item.itemDifficulty = this.levelList.filter( (val) => val.id == item.itemDifficulty)[0].levelName
                item.updatedTime = item.updatedTime.split(' ')[0]
            } )
        })
    },
     handleCurrentChange(val) {
      let params = new URLSearchParams();
      params.append("dataType", this.dataType);
      params.append("userId", 1);
      params.append("page", val);
      this.getData("/api/standard/standard_list", { params });
    },
     changeSearch(val){
      let params = new URLSearchParams();
      params.append("userId", 1);
      params.append("dataType", this.dataType);
      params.append("manageUnit", val);    // 管理单位对应的数字编码
      this.getData("/api/standard/standard_list", { params });
    },
    // 修改对应的数据
    modifyData(id){
      this.$router.push({name:'updateStandardTemplate',query: { id: id }})
      // console.log(id)
    },
    //查看详情页
    handldetails(id){
      this.$router.push({name:'standardDetail',query: { id: id }})
      // console.log(id)
    }
  },
  mounted(){
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
