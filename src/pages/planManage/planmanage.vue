<template>
    <div class="planmanage commonRight">
        <el-tabs type="border-card">
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxintongzhi"></i>限报设置</span>
                <!-- 显示子页面 -->
                <limiteRegistrationSet></limiteRegistrationSet>
            </el-tab-pane> 
            <el-tab-pane>
            <span slot="label"><i class="el-icon-date iconfont icon-duanxinmobanguanli"></i>考试计划</span>
                <!-- 显示子页面 -->
                <plansList :CurrentPages="CurrentPages" v-if="defaultVal == CurrentPages.LIST_PLAN "  @showPage="showPage"></plansList>
                <addPlan  :CurrentPages="CurrentPages"  v-else-if="defaultVal == CurrentPages.ADD_PLAN" @showPage="showPage"></addPlan>
                <editPlan  :CurrentPages="CurrentPages" v-else="defaultVal == CurrentPages.EDIT_PLAN"  @showPage="showPage"></editPlan>
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>

<script>
import editPlan from "./editPlan"
import plansList from "./plansList"
import addPlan from "./addPlan"
import limiteRegistrationSet from "./limiteRegistrationSet"
import editPlanVue from './editPlan.vue'
export default {
  data() {
    return {
      CurrentPages:{
        ADD_PLAN: "add",
        EDIT_PLAN:"edit",
        LIST_PLAN:'list'
      },
      defaultVal:'list'
    };
  },
  components: {
    plansList,
    limiteRegistrationSet,
    addPlan,
    editPlan
  },
  methods:{
    showPage(val){
      this.defaultVal = val;
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