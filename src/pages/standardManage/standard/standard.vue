<template>
    <div class="standard">
        <div class="top">
            <el-button type="primary" icon="el-icon-plus"  round @click="handleAddStandard">新增标准</el-button>
            <el-select  v-model="value" placeholder="全部管理单位">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <p>共有<span>10</span>/<span>10</span>条结果</p>
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
                    <el-button type="text" icon="el-icon-error" @click.prevent="freezeData(scope.row.id)" >修改</el-button>
                    <el-button type="text" icon="el-icon-error" @click.prevent="handldetails(scope.row.id)">详情</el-button>
                </template>
                </el-table-column >
            </el-table>

                <el-pagination
                background
                :total="total" 
                layout="prev, pager, next"
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
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 1,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 2,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 3,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 4,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 5,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 6,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 7,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 8,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 9,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        },
        {
          certificationServiceFee: 200,
          examLength: "45分钟",
          examLevel: "10级",
          examServiceFee: 200,
          id: 10,
          itemDifficulty: "15级",
          knowledgeHierarchy: "中盘2/布局2/官子2/死活2/对弈1",
          manageUnit: "黑龙江围棋协会",
          updatedTime: "2019-01-31",
          updatedUser: "张老师"
        }
      ],
      options: [
        {
          value: "1",
          label: "中国围棋协会"
        },
        {
          value: "2",
          label: "上海围棋协会"
        },
        {
          value: "3",
          label: "河北围棋协会"
        },
        {
          value: "4",
          label: "河南围棋协会"
        },
        {
          value: "5",
          label: "北京围棋协会"
        }
      ],
      total: 10,
      value: ""
    };
  },
  methods: {
    handleAddStandard() {
      this.$router.push({path: '/addStandard' })
    },
    handleCurrentChange() {}
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

// 表格部分样式
.tabs-data {
  width: 100%;
  height: 100%;
  padding: 0 20px 60px 20px;
  background: #ffffff;
  // overflow-x: hidden;
  .el-table th {
    width: 100%;
    height: 55px;
    color: #7c7c7c;
    font-size: 14px;
    background-color: #e5e5e5;
  }
  .el-table tr {
    width: 100%;
    font-size: 14px;
    color: #000;
    background-color: #f2f2f2;
  }
  // 控制表格的tr行高
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 55px;
  }

  // 分页样式
  .el-pagination {
    text-align: center;
    margin-top: 58px;
    & li.active {
      background: #1f91b5 !important;
    }
    .el-pager li {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      text-align: center;
      line-height: 34px;
      background: #e9e9eb;
    }
    .btn-prev,
    .btn-next {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #1f91b5;
      color: #fff;
    }
  }
}
</style>
