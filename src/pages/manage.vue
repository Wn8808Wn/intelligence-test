<template>
    <div class="fillcontain">
        <div class="left-box">
            <!-- log区域 -->
            <div class="log-top">
                <img src="../assets/logo.png" alt="logo">
                <span>考试管理平台</span>
            </div>
            <!-- 导航区域 -->
            <el-menu
            :default-active="activeIndex" 
            mode="vertical" 
            @select="handleSelect"
            class="el-menu-vertical-demo"
            background-color="#07281f"
            text-color="#fff"
            active-text-color="#fff"
            router
            style="border-right: none">   
                <el-menu-item index="/exammanage">
                    <img src="../assets/nav-icon1.png" alt="">
                    <span slot="title">考场管理</span>
                </el-menu-item>
                <el-menu-item  index="/standardmanage">
                    <img src="../assets/nav-icon2.png" alt="">
                    <span slot="title">考题标准管理</span>
                </el-menu-item>
                <el-menu-item  index="/planmanage">
                    <img src="../assets/nav-icon3.png" alt="">
                    <span slot="title">考题计划管理</span>
                </el-menu-item>
                <el-menu-item  index="/ordermanage">
                    <img src="../assets/nav-icon4.png" alt="">
                    <span slot="title">订单管理</span>
                </el-menu-item>
                <el-menu-item index="/status">
                    <img src="../assets/nav-icon5.png" alt="">
                    <span slot="title">考试状态查询</span>
                </el-menu-item>
                <el-menu-item index="/ticketmanage">
                    <img src="../assets/nav-icon6.png" alt="">
                    <span slot="title">准考证管理</span>
                </el-menu-item>
                <el-menu-item index="7">
                    <img src="../assets/nav-icon7.png" alt="">
                    <span slot="title">财务管理</span>
                </el-menu-item>
                <el-menu-item index="8">
                    <img src="../assets/nav-icon8.png" alt="">
                    <span slot="title">统计分析</span>
                </el-menu-item>
                <el-menu-item index="9">
                    <img src="../assets/nav-icon9.png" alt="">
                    <span slot="title">Q&A</span>
                </el-menu-item>
                <el-menu-item index="10">
                    <img src="../assets/nav-icon10.png" alt="">
                    <span slot="title">短信通知</span>
                </el-menu-item>
                <el-menu-item index="11">
                    <img src="../assets/nav-icon11.png" alt="">
                    <span slot="title">系统通知</span>
                </el-menu-item>
                <el-menu-item index="12">
                    <img src="../assets/nav-icon12.png" alt="">
                    <span slot="title">系统日志</span>
                </el-menu-item>
            </el-menu>

            <!-- 用户信息区域 -->
            <div class="user-info">
                <img src="../assets/userimg.png" alt="">
                <span>超级管理员</span>
                <i class="el-icon-menu"></i>

            </div>

        </div>
        <div class="right-box">
            <router-view></router-view> 
        </div>

    </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "/exammanage",
      keyPath: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.keyPath = keyPath[0];
      console.log(this.keyPath);
    }
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  min-height: 820px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
  .left-box {
    width: 176px;
    height: 100%;
    float: left;
    margin-right: 13px;
    background: #07281f;
    .log-top {
      width: 176px;
      height: 71px;
      background: #021b14;
      & > img {
        margin: 20px 15px 18px 11px;
        border: none;
      }
      & > span {
        font-size: 16px;
        color: #1f91b5;
        float: right;
        margin-top: 26px;
        margin-bottom: 25px;
        margin-right: 19px;
      }
    }
    .el-menu-item {
      width: 176px;
      height: 54px;
      padding-left: 0 !important;
      padding-right: 0 !important;
      border-left: 3px solid #07281f;
      & > img {
        width: 18px;
        height: 18px;
        margin-right: 19px;
        margin-left: 18px;
      }
      & > span {
        font-size: 16px;
      }
    }
    & > .user-info {
      width: 176px;
      height: 71px;
      position: absolute;
      bottom: 0;
      line-height: 71px;
      & > img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-left: 10px;
        margin-right: 10px;
      }
      & > span {
        font-size: 12px;
        color: #4d655e;
      }
      & > .el-icon-menu {
        font-size: 18px;
        position: absolute;
        color: #fff;
        right: 14px;
        bottom: 26px;
      }
    }
  }
  .right-box {
    overflow: hidden;
    margin-left: 0px;
    height: 100%;
    margin: 12px 319px 10px 13px;
    background: #f0f0f0;
  }
}
//白色三角形
.is-active {
  background-color: #020b0e !important;
  border-left: 3px solid #1f91b5 !important;
  :after {
    content: "";
    width: 0;
    height: 0;
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-right: 18px solid #fff;
    position: absolute;
    top: 10px;
    right: 0; //根据三角形的位置，可以随意更改。
  }
}
</style>
