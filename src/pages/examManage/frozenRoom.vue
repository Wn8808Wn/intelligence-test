<template>
    <div class="exammanage">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="iconfont icon-kaochangguanli-"></i>考场管理</span>
                <frozenRoomComponent></frozenRoomComponent>
            </el-tab-pane> 
        </el-tabs>
    </div>
</template>
<script>
import frozenRoomComponent from "./frozenRoomComponent";
export default {
  name:'frozenRoom',
  components:{
      frozenRoomComponent,
  },
  data(){
    return{
    }
  },
}
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.exammanage {
  overflow: hidden;
  max-height: 926px;
  margin-right: 319px;
  padding-top: 12px;
  .el-tabs--border-card{
    background: #f0f0f0;
   & /deep/ .el-tabs__content{
      padding: 0;
    }
  }
}
</style>
