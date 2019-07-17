<template>
    <div class="planmanage commonRight">
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane  name="first">
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxintongzhi"></i>限报设置</span>
                <!-- 显示子页面 -->
                <limiteRegistrationSet></limiteRegistrationSet>
            </el-tab-pane> 
            <el-tab-pane  name="second">
            <span slot="label"><i class="el-icon-date iconfont icon-duanxinmobanguanli"></i>考试计划</span>
                <!-- 显示子页面 -->
                <plansListComponent></plansListComponent>
            </el-tab-pane> 
        </el-tabs>
    </div>
</template>

<script>
import plansListComponent from "./plansListComponent"
import limiteRegistrationSet from "./limiteRegistrationSet"

export default {
  data() {
    return {
      activeName:'first'
    };
  },
  components: {
    plansListComponent,
    limiteRegistrationSet,
  },
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