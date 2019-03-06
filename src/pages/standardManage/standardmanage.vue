<template>
    <div class="standardmanage">
        <el-tabs type="border-card">
            <el-tab-pane >
            <span @click='handleStandard' slot="label"><i class="el-icon-date iconfont icon-kaotibiaozhun" ></i>考场标准</span>
                <!-- 显示子页面 -->
                    <router-view></router-view>
            </el-tab-pane> 
            <el-tab-pane >
            <span @click='handleStandardTemplate' slot="label"><i class="el-icon-date iconfont icon-kaotibiaozhunmoban" ></i>考场标准模板</span>
                <!-- 显示子页面 -->
                    <router-view></router-view>
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    handleStandard(){
     this.$router.push({name:'standard'})
    },
    handleStandardTemplate(){
     this.$router.push({name:'standardTemplate'})
    }
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
//  标签页样式
.standardmanage {
  width: 100%;
  height: 916px;
}
</style>