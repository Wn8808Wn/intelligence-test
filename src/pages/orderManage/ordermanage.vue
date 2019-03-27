<template>
    <div>
         <div class="orderManage commonRight">
            <el-tabs type="border-card">
                <el-tab-pane>
                <span slot="label"><i class="el-icon-date iconfont icon-dingdanguanli-"></i>订单管理</span>
                <orderListCom v-if="!showContent"  @hanleShow="handleShow"></orderListCom>
                <examServerOrderDetailCom v-if="showContent" :index='index'></examServerOrderDetailCom>
                </el-tab-pane>
            </el-tabs>
        </div>
</div>
</template>

<script>
import orderListCom from "./orderList"
import examServerOrderDetailCom from "./examServerOrderDetail"
export default {
  components:{
    orderListCom,
    examServerOrderDetailCom
  },
  data() {
    return {
      showContent:false,
      index:''
    };
  },
  methods: {
    handleShow(val){
      this.showContent =val.boolean;
      this.index = val.index;
      console.log(val.index)
    }
  },
  computed:{
  }
  
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.orderManage {
  width: 1196px;
  // height: 946px;
  // background:#f0f0f0;
  & /deep/ .el-tabs--border-card > .el-tabs__content {
      padding: 0px;
  }
}
</style>



