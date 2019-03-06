<template>
    <div>
         <div class="orderManage">
            <el-tabs type="border-card">
                <el-tab-pane>
                <span slot="label"><i class="el-icon-date iconfont icon-dingdanguanli-"></i>订单管理</span>
                <orderListCom v-if="!showContent"  @hanleShow="handleShow"></orderListCom>
                <examServerOrderDetailCom v-if="showContent"></examServerOrderDetailCom>
                <!-- <router-view></router-view> -->
                </el-tab-pane>
            </el-tabs>
        </div>
</div>
</template>

<script>
import {mapState}  from 'vuex'
import orderListCom from "./components/orderList"
import examServerOrderDetailCom from "./components/examServerOrderDetail"
export default {
  components:{
    orderListCom,
    examServerOrderDetailCom
  },
  data() {
    return {
      showContent:false,
    };
  },
  methods: {
    handleShow(val){
      this.showContent =val;
    }
  },
  computed:{
      // ...mapState({
      //   id: state => state.orderManageData.id
      // })

  }
  
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.orderManage {
  width: 1196px;
  height: 946px;
  background:#f0f0f0;
}
</style>



