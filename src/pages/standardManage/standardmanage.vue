<template>
    <div class="standardmanage">
        <el-tabs type="border-card"  v-model="activeName2"   @tab-click="handleClick">
            <el-tab-pane name="first">
            <span  slot="label"><i class="el-icon-date iconfont icon-kaotibiaozhun" ></i>考场标准</span>
                <!-- 显示子页面 -->
                    <router-view></router-view>
                    <!-- <standardPage></standardPage> -->
            </el-tab-pane> 
            <el-tab-pane name="second">
            <span  slot="label"><i class="el-icon-date iconfont icon-kaotibiaozhunmoban" ></i>考场标准模板</span>
                <!-- 显示子页面 -->
                    <router-view></router-view>
                    <!-- <standardTemplatePage></standardTemplatePage> -->
            </el-tab-pane> 
        </el-tabs>
    </div>
</template>

<script>
// import standardPage from './standard/standard'
// import standardTemplatePage from './standardTemplate/standardTemplate' 
export default {
  components:{
    // standardPage,
    // standardTemplatePage
  },
  data() {
    return {
      activeName2:"first",
    };
  },
  methods:{
   handleClick(tab,event){
    //  console.log(tab, event,11111);
    //  console.log(this.activeName2)
    if(this.activeName2 === "first"){
      this.$router.push({name:'standard'})
    }
    if(this.activeName2 === "second"){
      this.$router.push({name:'standardTemplate'})
    }
   }
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
//  标签页样式
.standardmanage {
  overflow: hidden;
  max-height: 926px;
  margin-right: 319px;
  padding-top: 12px;
  .el-tabs--border-card{
    background: #f0f0f0;
  }
  .el-tabs--border-card /deep/ .el-tabs__content{
    padding: 0;
  }
}
</style>