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
            background-color="#222f3c"
            text-color="#fff"
            active-text-color="#fff"
            router
            style="border-right: none"> 
                <el-menu-item index="/examManage" v-if="showHall">
                    <i class="iconfont icon-kaochangguanli-"></i>
                    <span slot="title">考场管理</span>
                </el-menu-item>
                <el-menu-item  index="/standardManage" v-if="showStandard">
                     <i class="iconfont icon-kaotibiaozhunguanli-"></i>
                    <span slot="title">考题标准管理</span>
                </el-menu-item>
                <el-menu-item  index="/planManage/planList" v-if="showPlan">
                     <i class="iconfont icon-kaoshijihuaguanli-"></i>
                    <span slot="title">考试计划管理</span>
                </el-menu-item>
                <el-menu-item  index="/orderManage" v-if="showOrder">
                     <i class="iconfont icon-dingdanguanli-"></i>
                    <span slot="title">订单管理</span>
                </el-menu-item>
                <el-menu-item index="/examStatus" v-if="showStatus">
                    <i class="iconfont icon-kaoshizhuangtaichaxun-"></i>
                    <span slot="title">考试状态查询</span>
                </el-menu-item>
                <el-menu-item index="/ticketManage" v-if="showPaper">
                   <i class="iconfont icon-zhuankaozhengguanli-"></i>
                    <span slot="title">准考证管理</span>
                </el-menu-item>
                <el-menu-item index="7" v-if="false">
                    <i class="iconfont icon-caiwuguanli-"></i>
                    <span slot="title">财务管理</span>
                </el-menu-item>
                <el-menu-item index="8"  v-if="false">
                    <i class="iconfont icon-tongjifenxi-"></i>
                    <span slot="title">统计分析</span>
                </el-menu-item>
                <el-menu-item index="9"  v-if="false">
                    <i class="iconfont icon-QA-"></i>
                    <span slot="title">Q&A</span>
                </el-menu-item>
                <el-menu-item index="/shortMessage" v-if="showMessage">
                    <i class="iconfont icon-duanxintongzhi-"></i>
                    <span slot="title">短信通知</span>
                </el-menu-item>
                <el-menu-item index="11"  v-if="false">
                    <i class="iconfont icon-xitongtongzhi-"></i>
                    <span slot="title">系统通知</span>
                </el-menu-item>
                <el-menu-item index="12"  v-if="false">
                    <i class="iconfont icon-xitongrizhi-"></i>
                    <span slot="title">系统日志</span>
                </el-menu-item>
            </el-menu>
            <!-- 用户信息区域 -->
            <div class="user-info">
                <img src="../assets/userimg.png" alt="">
                <span>超级管理员</span>
                <i class="iconfont icon-tuichu-" style="margin-left:13px;vertical-align:middle;color:#4d655e; cursor:pointer" @click="logOut"></i>
            </div>

        </div>
        <div id="right-box">
            <router-view v-if="isRouterAlive"></router-view> 
        </div>
    </div>
</template>


<script>
import Cookies from "js-cookie";
import "../assets/iconfont/iconfont.css";
export default {
  name: "manage",
  // 向后代注入这个provide中的所有内容
  provide() {
    return {
      reload: this.reload // 调用的是methods中的方法
    };
  },
  data() {
    return {
      isRouterAlive: true,
      activeIndex: "/examManage",
      keyPath: "",
      nodeRouter: "",
      menuList: "",
      showHall: false,
      showStandard: false,
      showPlan: false,
      showOrder: false,
      showStatus: false,
      showPaper: false,
      showMessage: false
    };
  },
  methods: {
    showRoleMenuList() {
      let menuArrlist = this.menuList.split(",");
      console.log(menuArrlist, "000");
      if (menuArrlist.indexOf("hall") !== -1) {
        this.showHall = true;
      } else {
        this.showHall = false;
      }

      if (menuArrlist.indexOf("standard") !== -1) {
        this.showStandard = true;
      } else {
        this.showStandard = false;
      }

      if (menuArrlist.indexOf("plan") !== -1) {
        this.showPlan = true;
      } else {
        this.showPlan = false;
      }

      if (menuArrlist.indexOf("order") !== -1) {
        this.showOrder = true;
      } else {
        this.showOrder = false;
      }

      if (menuArrlist.indexOf("status") !== -1) {
        this.showStatus = true;
      } else {
        this.showStatus = false;
      }

      if (menuArrlist.indexOf("paper") !== -1) {
        this.showPaper = true;
      } else {
        this.showPaper = false;
      }
      
      if (menuArrlist.indexOf("message") !== -1) {
        this.showMessage = true;
      } else {
        this.showMessage = false;
      }
    },
    reload() {
      // 调用这个reload()函数时，v-if=false,页面会将router-view中的DOM元素全部删除，当页面更新完毕时，
      //再重新创建一个router-view出口。这时里面的页面内容会重新加载。
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    handleSelect(key, keyPath) {
      this.keyPath = keyPath[0];
      console.log(key, "uuu");
      this.nodeRouter = key;
      this.reload();
    },
    logOut() {
      let dataStr = new URLSearchParams();
      dataStr.append("token", sessionStorage.getItem("dsToken"));
      this.$http.post("/api/logout", dataStr).then(res => {
        if (res.data.code === 0) {
          sessionStorage.clear();
          Cookies.remove("dsName");
          Cookies.remove("dsWord");
        }
      });
    }
  },
  mounted() {
    window.addEventListener("beforeunload", e => {
      alert(0);
      this.activeIndex = this.nodeRouter;
    });
  },
  created() {
    console.log(this.$store.state.userInfo, "this.$store.state.userInfo");
    this.menuList = this.$store.state.userInfo.menu;
    // console.log(this.menuList,'this.menuList')
    this.showRoleMenuList();
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  min-height: 938px;
  background: #f0f0f0;
  position: relative;
  overflow-y: auto;
  .left-box {
    width: 176px;
    min-height: 938px;
    float: left;
    margin-right: 13px;
    background: #222f3c;
    .log-top {
      width: 176px;
      height: 71px;
      background: #222f3c;
      & > img {
        margin: 18px 12px 18px 12px;
        border: none;
        width: 33px;
        height: 33px;
      }
      & > span {
        font-size: 16px;
        color: #52b1cf;
        font-weight: 700;
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
      & > i {
        margin-right: 12px;
        margin-left: 16px;
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
  #right-box {
    margin-left: 176px;
    min-height: 938px;
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
    border: 12px solid #fff;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    top: 16px;
    right: 0; //根据三角形的位置，可以随意更改。
  }
}
</style>
