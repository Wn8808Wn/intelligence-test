<template>
    <div class="planmanage commonRight">
        <el-tabs type="border-card" v-model="activeName" @tab-click="handelGo">
            <el-tab-pane name="1">
            <span  slot="label"><i class="iconfont icon-duanxintongzhi"></i>限报设置</span>
                <!-- 显示子页面 -->
                <limiteRegistrationSet></limiteRegistrationSet>
            </el-tab-pane> 
            <el-tab-pane name="2">
            <span slot="label"><i class="iconfont icon-duanxinmobanguanli"></i>考试计划</span>
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
      activeName:'2'
    };
  },
  components: {
    plansListComponent,
    limiteRegistrationSet,
  },
  methods:{
    handelGo(val){
      console.log(val.index)
      if(val.index == 0){
        this.$router.push({name:'limiteSet'})
      }
      if(val.index == 1){
        this.$router.push({name:'planList'})
      }
    }
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
//  标签页样式
.planmanage {
  width: 1429px;
  min-height: 925px;
  height: 925px;
  & /deep/ .el-tabs--border-card > .el-tabs__content {
    padding: 0px;
  }
}
</style>