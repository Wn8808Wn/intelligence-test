<template>
    <div class="standard">
        <div class="top">
            <el-button type="primary" icon="el-icon-plus"  round @click="handleAddStandard">新增标准</el-button>
            <el-select  v-model="currManageUnit" placeholder="全部管理单位" @change="changeManageUnit">
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
                >
                </el-table-column>
                <el-table-column
                prop="manageUnitName"
                label="管理单位"
                >
                </el-table-column>
                <el-table-column
                prop="examLevel"
                label="级别"
                sortable
                :sort-method="sortExamLevel"  
                width="78">
                </el-table-column>
                <el-table-column
                label="题库难度"
                width="104">
                <template slot-scope="scope">
                    <span>{{scope.row.itemDifficulty}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="知识体系"
                width="285">
                <template slot-scope="scope">
                    <span>{{scope.row.knowledgeHierarchy.replace(/@/g,'')}}</span>
                </template>
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
                    <el-button type="text" icon="iconfont icon-xiugai-" @click.prevent="modifyData(scope.row.id)" >修改</el-button>
                    <el-button type="text" icon="iconfont icon-xiangqing" @click.prevent="handldetails(scope.row.id)">详情</el-button>
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
      itemDifficulty:'',
      currManageUnit:'',
      dataType:1,
      currentPage: 1,
      pageSize: 10,
      totalPage: null,
      total: null,
    };
  },
  methods: {
    sortExamLevel(a,b){
      return a.sortNum-b.sortNum  //获取name上的数据进行排序
    },
    indexMethod(index){
            return index+1+this.pageSize*(this.currentPage-1);
    },
    getData(params){
        this.$http.get("/api/standard/standard_list", { params }).then(res => {
            this.tableData=[];
            console.log(res.data.data.standPage.rows,'000');
            this.total = res.data.data.standPage.total;
            this.pageSize = res.data.data.standPage.pageSize;
            this.currentPage = res.data.data.standPage.page;
            this.totalPage = res.data.data.standPage.totalPage;
            this.tableData = res.data.data.standPage.rows;
            this.unitsList  = res.data.data.unitsList;
            this.unitsList.unshift({unitName:'全部',id:0})
            this.levelList = res.data.data.levelList;
            this.tableData.forEach( (item,index) =>{
                item.examLevel = this.levelList.filter( (val) => val.id == item.examLevel)[0].levelName
                item.itemDifficulty = this.levelList.filter( (val) => val.id == parseInt(item.itemDifficulty))[0].levelName
                item.updatedTime = item.updatedTime.split(' ')[0]
            } )
        })
    },
    handleAddStandard() {
      this.$router.push({name: 'addStandard' })
    },
    handleCurrentChange(val) {
      let params = new URLSearchParams();
      params.append("page", val);
      params.append("dataType", this.dataType);
     params.append("userId", 1);
      if(this.currManageUnit !== ''){
        params.append("manageUnit", this.currManageUnit);  
      }else{
        params.append("manageUnit",0); 
      }
      this.getData(params);
    },
    changeManageUnit(val){
      let params = new URLSearchParams();
      this.manageUnit =val;
      params.append("manageUnit", val);   
     params.append("userId", 1);
      params.append("dataType", this.dataType);
      this.getData(params);
    },
    // 修改对应的数据
    modifyData(id){
      this.$router.push({name:'updateStandard',query: { id: id }})
    },
    //查看详情页
    handldetails(id){
      this.$router.push({name:'standardDetail',query: { id: id }})
    }
  },
  created(){
    //进入页面显示考题标准信息
    let params = new URLSearchParams();
    params.append("manageUnit", 0);
    params.append("dataType", 1);
    this.getData(params);
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
