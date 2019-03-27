<template>
    <div class="ticketTemplate">
        <commonTop :titleTop="title"></commonTop>
        <!-- <el-button @click="editButton" v-if="showButton">修改</el-button> -->
            <div  class="ticketDetails">
                <div class="titleTop">
                    <div>准考证</div>
                    <p>2019年中国围棋协会段级位标准化考试</p>
                </div>
                <div class="examerInfo">
                    <div class="lf">
                        <p>姓　　名:<span>{{name}}</span></p>
                        <p>性　　别:<span>女</span> 证件类型:<span>身份证</span></p>
                        <p>报考等级:<span>XX级</span></p>
                        <p><i class="threeLetter">证件号</i>:<span>XXXXXXXXXXXXXXXXXX</span></p>
                        <p>考试时间:<span>XXXX-XX-XX  X:XX - XX:XX</span></p>
                        <p>考试地点:<span>XXX省XXX市围棋协会</span></p>
                    </div>
                    <div class="QRCode">
                        <img src="../../assets/ewm.png" alt="">
                    </div>
                </div>
                <div class="testInstructions">
                    <h3>考试须知:</h3>
                    <p>1、 考试可提前15分钟到场；迟到10分，考试资格作废，需重新报名。</p>
                    <p>2、 考试座位:无固定座位号，无人座位均可使用。</p>
                    <p>3、 考试流程</p>
                        <li>(1) 找到座位</li>
                        <li>(2) 确定考试设备开机</li>
                        <li>(3) 准考证二维码对准镜头，进行身份认证</li>
                        <li>(4) 扫码成功，开始答题</li>
                        <div id="examSteps">
                            <el-steps align-center>
                            <el-step   description="找到座位"></el-step>
                            <el-step   description="确认设备开机"></el-step>
                            <el-step   description="准考证二维码扫描"></el-step>
                            <el-step   description="答题"></el-step>
                            </el-steps>
                        </div>
                    <p>4、 现场除考试题相关问题，均可咨询监考老师。</p>
                </div>
            </div>
      
    </div>
</template>

<script>
import commonTop from '../../pages/common/commonTop'
export default {
    components:{
        commonTop
    },
    data(){
        return{
            title:'模板修改',
            name: 'XX',
            showButton:false
        }
    },
    methods:{
        editButton(){
            // this.showButton = false;
        },
        completeButton(){
            // this.showButton =true;
        }
    }
}
</script>

<style lang='scss' scoped>
.ticketTemplate{
    width: 965px;
    padding: 0 35px;
    position: relative;
    height: 100%;
    background: #ffffff;
    & /deep/ .el-button{
        width: 80px;
        height: 40px;
        border:none;
        margin-top: 20px;
        margin-left: 20px;
        border-radius: 30px;
        font-size: 14px;
        color: #000;
        background: #1f91b5;
    }
  
    .ticketDetails{
        width: 800px;
        height: 978px;
        margin: 30px 0;
        // margin-left: 20px;
        border: 1px solid #000;
        background: #ffffff;
        .titleTop{
            width: 100%;
            height: calc( 14.4% - 55px);
            padding: 17px  0 38px;
            &>div{
                width: 20%;
                height: 80px;
                line-height: 80px;
                background: #000;
                font-size: 34px;
                color: #ffffff;
                text-align: center;
                float: left;
                margin-left: 15%;
            }
            &>p{
                font-size: 29px;
                width: 42.6%;
                float: left;
                margin-left: 2%;
                line-height: 41px;
            }
        }
        .examerInfo{
            width: 100%;
            height: 40%;
            background: #e5e5e5;
            &>.lf{
                width: 55.3%;
                height: 81.5%;
                margin-left: 6%;
                padding: 27px 0 30px 0px;
                float: left;
                // background: sandybrown;
                &>p{
                    width: 100%;
                    font-size: 20px;
                    height: 48px;
                    line-height: 48px;
                    &>span:nth-of-type(1){
                        margin-left: 26px
                    }
                    .threeLetter{
                        letter-spacing:9px;
                        margin-right:-9px;
                    }
                    
                    &:nth-of-type(2){
                    &>span:nth-of-type(1){
                        margin-right: 20px
                    }
                    }
                }
            }
            &>.QRCode{
                // width: 29.3%;
                // height: 52.6%;
                width: 200px;
                height: 200px;
                float: left;
                margin-top: 8%;
                margin-left: 2%;
                background: #000;
                &>img{
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            }
        }
        .testInstructions{
            width: calc( 100% -82px);
            height: calc( 45.6% - 44px);
            padding: 22px 41px;
            &>h3{
                width: 100%;
                height: 44px;
                line-height: 44px;
                font-size: 20px;
            }
            &>p{
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                color: #838383;
                
            }
            li{
                width: calc(100% - 20px); 
                height: 30px;
                line-height: 30px;
                font-size: 16px;
                color: #838383;
                list-style: none;
                padding-left: 20px;
                &:nth-of-type(4){
                    margin-bottom: 20px;
                }
            }
            #examSteps{
                width: calc( 100% -20px);
                padding-left: 20px;
                & /deep/ .el-step__line{
                    background-color:#838383;
                }
                & /deep/ .el-step__head.is-wait {
                    color:#838383;
                    border-color: #838383;
                }
                & /deep/ .el-step.is-center .el-step__description{
                    padding-top: 15px;
                    color:#838383;
                }    
            }
        }
    }
}
</style>
