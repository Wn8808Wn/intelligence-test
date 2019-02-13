<template>
    <div class="standardmanage">
        <el-tabs type="border-card">
            <el-tab-pane >
            <span @click='handleStandard' slot="label"><i class="el-icon-date" ></i>考场标准</span>
                <!-- 显示子页面 -->
                <router-view></router-view>
            </el-tab-pane> 
            <el-tab-pane >
            <span slot="label" @click='handleStandardTemplate'><i class="el-icon-date"  ></i>考场标准模板</span>
                <!-- 显示子页面 -->
                <router-view></router-view>
            </el-tab-pane> 
        </el-tabs>
       
    </div>
</template>

<script>
// import standard from "./standard/standard";
export default {
  // components: {
  //   standard
  // },
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

<style rel='stylesheet/scss' lang="scss">
//  标签页样式
.standardmanage {
  width: 100%;
  height: 916px;
  .el-tabs {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    .el-tabs__item.is-top,
    .el-tabs__item.is-top.is-active {
      width: 190px;
      height: 42px;
      border: none;
      padding: 0;
      margin: 0;
      color: #5a5a5a;
      & > span {
        color: #5a5a5a;
        display: block;
        width: 100%;
        height: 100%;
        font-size: 16px;
        line-height: 42px;
      }
      .el-icon-date {
        padding-left: 41px;
        padding-right: 12px;
      }
    }
  }
}
</style>