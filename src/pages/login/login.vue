<template>
    <div class="login">
        <div class="login-left">
              <h3>中国围棋协会</h3>
              <h3>智能管理平台</h3>
        </div>
        <div class="login-right">
            <el-form class="lr login-input" :model="form"  :rules="rules" ref="form">
                <div class="input-bg"><span v-show="showtips">{{tipsTitle===1?'账号不存在,请重新输入':'密码错误,请重新输入'}}</span></div>
                <el-form-item prop="username" label="用户名:" :class="{'redBorder':tipsTitle===1}">
                    <el-input type="username" v-model="form.username"> </el-input>
                </el-form-item>

                <el-form-item prop="password" label="密　码:" :class="{'redBorder':tipsTitle===2}">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <div class="remember">
                    <label class="check-box">
                    <input type="checkbox"  v-model="remember" />&nbsp;&nbsp;记住密码</label>
                </div>
                <div class="forget">
                    <label class="check-box"   v-model="forget" />&nbsp;&nbsp;忘记密码？</label>
                </div>
                <el-button class="submit"  @click="submit('form')"></el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
import md5 from "md5";
import Cookies from "js-cookie";
export default {
  name: "login",
  data() {
    let validateUserName = (rule, value, callback) => {
        if (!value) {
            callback(new Error("账号不能为空"));
        } else {
            callback();
        }
    };
    let validatePassWord = (rule, value, callback) => {
        if (!value) {
            callback(new Error("密码不能为空"));
        } else {
            callback();
        }
    };
    return {
      remember: false,
      showtips: false,
      tipsTitle: 0,
      forget: 1,
      form: {
          username: "",
          password: ""
      },
      rules: {
          username: [{ validator: validateUserName, trigger: "blur" }],
          password: [{ validator: validatePassWord, trigger: "blur" }]
      }
    };
  },
  methods: {
    submit(form) {
      let username = this.form.username;
      let password = this.form.password;
      this.$refs[form].validate(valid => {
          if (valid) {
          // 如果验证通过 存用户的id provent
              if (this.remember === true) {
                // 记住密码按钮勾选
                  Cookies.set("dsName", username, { expires: 7 });
                  Cookies.set("dsWord", password, { expires: 7 });
              } else {
                  this.region = false;
                  Cookies.remove("dsName");
                  Cookies.remove("dsWord");
              }
              let dataStr = new URLSearchParams();
              dataStr.append("loginName", username);
              dataStr.append("passWord", password);

          this.$http.post("/api/login", dataStr).then(res => {
              console.log(res,'988')
              if (res.data.code === 0) {
                  let token = res.data.data.token;
                  console.log(token);
                  sessionStorage.setItem("dsToken", token); // 存token
                  this.showtips = false;
                  this.tipsTitle = 0;
                  this.$message({
                      customClass:'message',
                      showClose: true,
                      type: "success",
                      message: "登录成功",
                      duration: 800
                  });
                setTimeout(() => {
                    this.$router.push({name: 'manage'});
                }, 1000);
              }
              if (res.status === 200 && res.data.code === 10002) {
                this.showtips = true;
                this.tipsTitle = 1;
              }
              if (res.status === 200 && res.data.code === 10003) {
                this.showtips = true;
                this.tipsTitle = 2;
              }
            })
            .catch(res => {
              errcallback: msg => {
                console.log(msg);
              };
            });
        } else {
          // 如果验证不通过
          this.$message({
            showClose: true,
            type: "warning",
            message: "验证不通过",
            duration: 1000
          });
        }
      });
    }
  },
  created() {
    // var whdef = 100 / 1920; // 表示1920的设计图,使用100PX的默认值
    // var wH = window.innerHeight; // 当前窗口的高度
    // var wW = window.innerWidth; // 当前窗口的宽度
    // var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    // $("html").css("font-size", rem + "px");
    // console.log(rem);
    if (Cookies.get("dsName") != null) {
      this.form.username = Cookies.get("dsName") || "";
      this.form.password = Cookies.get("dsWord") || "";
      this.remember = true;
    } else {
      this.form.username = "";
      this.form.password = "";
      this.remember = false;
    }
  }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .login-left {
    width: 5.54rem;
    height: 2.38rem;
    position: absolute;
    left: 1.82rem;
    top: 3.34rem;
    & > h3 {
      width: 100%;
      height: 0.9rem;
      font-size: 0.9rem;
      line-height: 1;
      font-weight: 900;
      background: linear-gradient(to bottom, #22effe, #008ae1);
      -webkit-background-clip: text;
      color: transparent;
      &:nth-child(1) {
        margin-bottom: 0.3rem;
        // margin-bottom: 11.95%;
      }
    }
  }

  .login-right {
    width: 9.66rem;
    height: 4.72rem;
    left: 8.78rem;
    top: 2.23rem;
    position: absolute;
    background: url(../../assets/login_bg.png) no-repeat;
    background-size: cover;
    .remember {
      float: left;
      font-size: 0.14rem;
    }
    .forget {
      float: right;
      font-size: 0.14rem;
    }
    .submit {
      width: 1.88rem;
      height: 1.38rem;
      margin-top: 0.48rem;
      margin-left: 0.84rem;
      background: url(../../assets/button.png) no-repeat;
      background-size: cover;
      border: none;
    }
  }
}
</style>


<style rel='stylesheet/scss' lang="scss">
.message{
  width:.5rem;
  font-size:.14rem;
}
.login-input {
  width: 3.46rem;
  height: 4.47rem;
  margin-left: 3rem;
  margin-top: 0.74rem;
  // width: 35.82%;
  // height: 94.7%;
  // margin-left: 31.05%;
  // margin-top: 7.66%;
  & > .input-bg {
    width: 100%;
    height: 0.75rem;
    font-size: 0.18rem;
    margin-bottom: 0.17rem;
    text-align: center;
    line-height: 1;
    color: #ff0000;
  }
  & /deep/ .el-form-item {
    margin-bottom: 0;
    width: 100%;
    position: relative;
    height: 0.33rem;
    margin-bottom: 0.66rem;
    border-bottom: 0.02rem solid #000000;
    & > label {
      line-height: 0.33rem;
      height: 0.33rem;
      font-size: 0.18rem;
      color: #000000;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }

    & /deep/ .el-form-item__content {
      width: 100%;
      height: 0.33rem;
      & /deep/ .el-input {
        width: 100%;
        height: 0.36rem;
        & /deep/ .el-input__inner {
          height: 0.33rem;
          padding: 0;
          border: none;
          border-radius: 0%;
          position: absolute;
          // top: -0.25rem;
          left: 0;
          padding-left: 0.68rem;
          font-size: 0.18rem;
          color: #000;
          line-height: 0.33rem;
        }
      }
    }
  }
  & > div:nth-of-type(3) {
    margin-bottom: 0.18rem;
  }
  .redBorder {
    border-color: red;
    & > label {
      color: red;
    }
  }
}
</style>