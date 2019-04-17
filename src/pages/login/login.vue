<template>
    <div class="login">
        <div class="login-left">
              <h3 id="firstH3">中国围棋协会</h3>
              <h3>智能管理平台</h3>
        </div>
        <div class="login-right">
            <el-form class="lr login-input"
            :model="form"
            :rules="rules"
            ref="form">

                <div class="input-bg"><span v-show="showtips">{{tipsTitle===1?'账号不存在,请重新输入':'密码错误,请重新输入'}}</span></div>
                <el-form-item prop="username" label="用户名:" :class="{'redBorder':tipsTitle===1}">
                    <el-input type="username"
                    v-model="form.username">
                    </el-input>
                </el-form-item>

                <el-form-item prop="password" label="密　码:" :class="{'redBorder':tipsTitle===2}">
                    <el-input type="password"
                    v-model="form.password">
                    </el-input>
                </el-form-item>

                <div class="remember">
                    <label class="check-box">
                    <input type="checkbox"
                    v-model="remember" />&nbsp;&nbsp;记住密码</label>
                </div>
                <div class="forget">
                    <label class="check-box"
                    v-model="forget" />&nbsp;&nbsp;忘记密码？</label>
                </div>

              <el-button class="submit"
                @click="submit('form')"></el-button>
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
      tipsTitle:0,
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
              console.log(res,321)
              if (res.status === 200 && res.data.code === 0) {
                // console.log(111)
                res = res.data.data;
                let token = res.token;
                console.log(token);
                let expiration = res.expiration;
                sessionStorage.setItem("dsToken", token); // 存token
                sessionStorage.setItem("lifeTime", expiration); // 存过期时间
                this.showtips =false;
                this.tipsTitle=0;
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "登录成功",
                  duration: 800
                });
                
                setTimeout(() => {
                  this.$router.push({ path: "/exammanage" });
                }, 1000);
              }
              if (res.status === 200 && res.data.code === 10002) {
                 this.showtips = true;
                this.tipsTitle = 1;
                // this.$message({
                //   showClose: true,
                //   type: "error",
                //   message: "账号不存在",
                //   duration: 1000
                // });
              }
              if (res.status === 200 && res.data.code === 10003) {
                //
                this.showtips = true;
                this.tipsTitle = 2;
                // this.$message({
                //   showClose: true,
                //   type: "error",
                //   message: "密码错误",
                //   duration: 1000
                // });
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
  .login-left{
    width: 28.85%;
    height: 26.76%;
    position: absolute;
    left: 9.48%;
    top: 37.63%;
      &>h3{
          width: 100%;
          height: 90px;
          font-size: 90px;
          line-height: 90px;
          font-weight: 900;
          background: linear-gradient(to bottom, #22effe, #008ae1);
          -webkit-background-clip: text;
          color: transparent;
          &:nth-child(1){
            margin-bottom: 30px;
          }
      }
  }

  .login-right {
    width: 50.31%;
    height: 50.32%;
    position: absolute;
    left: 45.74%;
    top: 23.77%;
    background: url(../../assets/login_bg.png) no-repeat;
    .remember {
      float: left;
    }

    .forget {
      float: right;
    }

    .submit {
      width: 188px;
      height: 138px;
      background: url(../../assets/button.png) no-repeat;
      margin-top: 48px;
      margin-left: 84px;
      border: none;
    }
  }
}
</style>


<style rel='stylesheet/scss' lang="scss">
.login-right .login-input {
  width: 346px;
  height: 447px;
  margin-left: 300px;
  margin-top: 74px;
  & > .input-bg {
    width: 100%;
    height: 75px;
    text-align: center;
    line-height: 75px;
    color: #ff0000;
    font-size: 18px;
    margin-bottom: 17px;
  }
  .el-form-item__content {
    height: 33px;
    width: 100%;
  }

  $error: #000000;
  .el-form-item {
    margin-bottom: 0;
    height: 33px;
    width: 100%;
    position: relative;
    margin-bottom: 66px;
    border-bottom: 2px solid $error;
    & > label {
      height: 33px;
      line-height: 33px;
      font-size: 18px;
      color: $error;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }

    .el-input__inner {
      height: 33px;
      padding: 0;
      border: none;
      border-radius: 0%;
      position: absolute;
      top: -25px;
      left: 0;
      padding-left: 68px;
      font-size: 18px;
      color: #000;
    }
  }
  & > div:nth-of-type(3) {
    margin-bottom: 18px;
  }
  .redBorder{
    border-color:red;
    &>label{
      color:red;
    }
  }
}
</style>