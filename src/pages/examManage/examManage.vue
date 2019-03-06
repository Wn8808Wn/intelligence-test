<template>
    <div>
        <div class="exammanage">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label"><i class="el-icon-date iconfont icon-kaochangguanli-"></i>考场管理</span>
                    <examRoomListCom  v-if="showFrozenRoomPage == false"  @showFrozenRoom = 'showFrozenRoom'></examRoomListCom>
                    <frozenRoomCom v-if="showFrozenRoomPage == true"></frozenRoomCom>
                </el-tab-pane> 
            </el-tabs>
        </div>
</div>
</template>
<script>
import examRoomListCom from './examRoomList'
import frozenRoomCom from './frozenRoom'
export default {
  components:{
    examRoomListCom,
    frozenRoomCom
  },
  data(){
    return{
      showFrozenRoomPage:false,
    }
  },
  methods:{
    showFrozenRoom(val){
      this.showFrozenRoomPage = val;
    }
  }
}
</script>



<style rel='stylesheet/scss' lang="scss" >
.exammanage {
  width: 100%;
  height: 916px;
}
</style>


