<template>
  <div class='errarbox'>
        <div class="errarpages">
             <img src="../../assets/404.png" alt="">
            <p>你访问的网页已被围困住了.....</p>
            <el-button type="primary" icon="el-icon-refresh" round @click="updataPages">刷新页面</el-button>
            <el-button type="primary" icon="el-icon-refresh"  round  @click="toHome">返回首页</el-button>    
        </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        updataPages(){
            alert(111)
        },
        toHome(){
            this.$router.push('/')
        }

    }
};
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.errarbox{
    width: 100%;
    height: 100%;
    background:#f0f0f0;
    .errarpages{
        width: 440px;
        height: 307px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        & > img {
            width: 440px;
            height: 144px;
        }
        &>p{
            width: 100%;
            height: 128px;
            line-height: 128px;
            font-size: 22px;
            color: #000;
            text-align: center;
        }
        .el-button{
            background: #1f91b5;
            font-size: 16px;
            color: #fff;
            width: 145px;
            height: 40px;
            padding: 0;
            border: none;
            
        }

        .el-button:nth-of-type(1){
               margin-left: 55px;
               margin-right: 30px;
              
        }
    }
}
</style>
