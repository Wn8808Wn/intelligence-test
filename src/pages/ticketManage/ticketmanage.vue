<template>
    <div class="ticketmanage">
        <el-tabs type="border-card">
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxintongzhi" ></i>准考证管理</span>
                <!-- 显示子页面 -->
                <ticketListCom></ticketListCom>
            </el-tab-pane> 
            <el-tab-pane >
            <span  slot="label"><i class="el-icon-date iconfont icon-duanxinmobanguanli" ></i>准考证模板管理</span>
                <!-- 显示子页面 -->
                  <ticketTemplateCom></ticketTemplateCom>
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>

<script>
import ticketListCom from './ticketList'
import ticketTemplateCom from './ticketTemplate'
export default {
  data() {
    return {};
  },
  components:{
      ticketListCom,
      ticketTemplateCom
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
//  标签页样式
.ticketmanage {
 width: 1188px;
 height: 916px;
}
</style>