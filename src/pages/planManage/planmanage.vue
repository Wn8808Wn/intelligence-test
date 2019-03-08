<template>
    <div class="planmanage">
        <el-tabs type="border-card">
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxintongzhi"></i>无门槛考级设计</span>
                <!-- 显示子页面 -->
                <plansListCom></plansListCom>
            </el-tab-pane> 
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxinmobanguanli"></i>考试计划</span>
                <!-- 显示子页面 -->
                 <plansListCom></plansListCom>
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>

<script>
import plansListCom from './plansList'
// import ticketTemplateCom from './plansList'
export default {
  data() {
    return {};
  },
  components:{
      plansListCom,
    //   ticketTemplateCom
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
//  标签页样式
.planmanage {
 width: 1188px;
 height: 916px;
}
</style>