<template>
    <div class="exammanage">
        <el-tabs type="border-card">
            <el-tab-pane>
                <span slot="label"><i class="el-icon-date iconfont icon-kaochangguanli-"></i>考场管理</span>
                <exam-roomList :SHOWTYPE="SHOW_TYPE" v-if="defaultValue === SHOW_TYPE.LIST"  @showDiffPage = 'showDiffPage'></exam-roomList>
                <frozen-room  :SHOWTYPE="SHOW_TYPE" v-else-if="defaultValue === SHOW_TYPE.FROZEN"></frozen-room>
                <add-room   :SHOWTYPE="SHOW_TYPE"  v-else="defaultValue === SHOW_TYPE.ADD"></add-room>
            </el-tab-pane> 
        </el-tabs>
    </div>
</template>
<script>
import examRoomList from "./examRoomList";
import frozenRoom from "./frozenRoom";
import addRoom from "./addRoom";

export default {
  components:{
    'exam-roomList':examRoomList,
    'frozen-room':frozenRoom,
    'add-room':addRoom
  },
  data(){
    return{
      SHOW_TYPE: {
        LIST: "list",
        ADD: "add",
        FROZEN: "frozen"
      },
      defaultValue: "list"      
    }
  },
  methods:{
    showDiffPage(val){
      this.defaultValue = val;
    }
  }
}
</script>

<style rel='stylesheet/scss' lang="scss" >
.exammanage {
  // width: 100%;
  overflow: hidden;
  max-height: 926px;
  margin-right: 319px;
  padding-top: 12px;
  .el-tabs--border-card{
    background: #f0f0f0;
  }
  .el-tabs--border-card>.el-tabs__content{
    padding: 0;
  }
}
</style>


