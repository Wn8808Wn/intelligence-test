<template>
    <div>
         <div class="orderManage commonRight">
            <el-tabs type="border-card">
                <el-tab-pane>
                <span slot="label"><i class="el-icon-date iconfont icon-dingdanguanli-"></i>订单管理</span>
                    <orderDetailCom ></orderDetailCom>
                </el-tab-pane>
            </el-tabs>
        </div>
</div>
</template>

<script>

import orderDetailCom from "./orderDetailComponent"
export default {
  components:{
    orderDetailCom
  },
  data() {
    return {
    };
  },
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.orderManage {
    width: 1196px;
    & /deep/ .el-tabs--border-card > .el-tabs__content {
        padding: 0px;
    }
}
</style>
