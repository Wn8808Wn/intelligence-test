<template>
    <div class="planmanage commonRight">
        <el-tabs type="border-card">
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxintongzhi"></i>限报设置</span>
                <!-- 显示子页面 -->
                <limiteRegistrationSet></limiteRegistrationSet>
            </el-tab-pane> 
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxinmobanguanli"></i>考试计划</span>
                <!-- 显示子页面 -->
                <plansList v-if="showList" @showAddPlanPage ="showAddPlanPage" ></plansList>
                <addPlan v-if="!showList"></addPlan>
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>

<script>
import plansList from "./plansList";
import addPlan from "./addPlan";
import limiteRegistrationSet from "./limiteRegistrationSet";
export default {
  data() {
    return {
      showList: true,
    };
  },
  components: {
    plansList,
    limiteRegistrationSet,
    addPlan
  },
  methods:{
    showAddPlanPage(val){
      this.showList = val;
    }
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
//  标签页样式
.planmanage {
  width: 1429px;
  min-height: 926px;
  height: 926px;
  & /deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
}
</style>