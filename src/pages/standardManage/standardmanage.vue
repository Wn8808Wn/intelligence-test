<template>
    <div class="standardmanage">
        <el-tabs type="border-card">
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-kaotibiaozhun" ></i>考场标准</span>
                <!-- 显示子页面 -->
                    <!-- <router-view></router-view> -->
                    <standardPage></standardPage>
            </el-tab-pane> 
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-kaotibiaozhunmoban" ></i>考场标准模板</span>
                <!-- 显示子页面 -->
                    <!-- <router-view></router-view> -->
                    <standardTemplatePage></standardTemplatePage>
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>

<script>
import standardPage from './standard/standard'
import standardTemplatePage from './standardTemplate/standardTemplate' 
export default {
  components:{
    standardPage,
    standardTemplatePage
  },
  data() {
    return {};
  },
  methods:{
   
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