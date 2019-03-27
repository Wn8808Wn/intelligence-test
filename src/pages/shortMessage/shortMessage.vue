<template>
    <div class="shortMessage commonRight">
        <el-tabs type="border-card">
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxintongzhi" ></i>短信通知</span>
                <!-- 显示子页面 -->
                <messageCom></messageCom>
            </el-tab-pane> 
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxinmobanguanli" ></i>短信模板管理</span>
                <!-- 显示子页面 -->
                  <messageTemplateCom></messageTemplateCom>
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>

<script>
import messageCom from './message'
import messageTemplateCom from './messageTemplate'
export default {
  data() {
    return {};
  },
  components:{
      messageCom,
      messageTemplateCom
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
//  标签页样式
.shortMessage {
 width: 1232px;
 height: 938px;
  & /deep/ .el-tabs--border-card > .el-tabs__content {
      padding: 0px;
  }
}
</style>