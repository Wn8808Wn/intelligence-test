<template>
    <div class="ticketList">
        <div class="top">
            <div class="search">
                <input type="text" placeholder="请输入考生姓名/证件号"  v-model.trim="nameNum">
                <el-button circle @click="searchData">搜索</el-button>
            </div>
            <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
        </div>
            
        <div class="tabs-data" id="emailBox">     
            <el-table
            :data="tableData"
            stripe
            style="width: 100%">
                <el-table-column
                prop="manageUnit"
                label="管理单位"
                width="190">
                </el-table-column>

                <el-table-column
                prop="playerName"
                label="姓名"
                width="100">
                </el-table-column>

                <el-table-column
                prop="certificateNo"
                label="证件号"
                width="180">
                </el-table-column>

                <el-table-column
                prop="phone"
                label="联系方式"
                width="120">
                </el-table-column>

                <el-table-column
                prop="chessLevel"
                label="级别"
                width="80">
                </el-table-column>

                <el-table-column
                prop="examLevel"
                label="报考级别"
                width="80">
                </el-table-column>

                <el-table-column
                prop="examTime"
                label="考试时间"
                width="140">
                </el-table-column>

                <el-table-column
                  label="准考证状态"
                  width="90">
                  <template slot-scope="scope">
                    <span v-if="scope.row.dataStatus== 0" style="color: #000">有效</span>
                    <span v-else="scope.row.dataStatus== 1" style="color: #f00">失效</span>
                  </template>
                </el-table-column>

                <el-table-column
                label="操作"
               >
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-error iconfont icon-fasong"  @click.prevent="dialogFormVisible = true">发送</el-button>
                    <el-button type="text" icon="el-icon-error iconfont icon-xiangqing"  @click.prevent="handlDetails(scope.row.id)">详情</el-button>
                    
                    <el-dialog :title="title" :visible.sync="dialogFormVisible" width='30%' >
                        <el-radio  v-model="radio" @click.native="checkedButton"><el-input  v-model="email" placeholder="同时发送至用户邮箱:"></el-input></el-radio>
                    <div slot="footer" class="dialog-footer">
                        <el-button class="sentButton" type="primary" @click="handlSent(scope.row.id)">发 送</el-button>
                    </div>
                    </el-dialog>
                </template>
                </el-table-column >
            </el-table>
            <el-pagination
            background
            :total="total" 
            layout="prev, pager, next"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>

        <el-dialog  id="detailPageDialog"
        :visible.sync="showDetailPage"
        top="0"
        width="690px"
        >
        <div  class="ticketDetails" v-if="showDetailPage">
            <div class="titleTop">
                <div>准考证</div>
                <p>2019年中国围棋协会段级位标准化考试</p>
                <i class="el-icon-close" @click="closeBtn"></i>
            </div>
            <div class="examerInfo">
                <div class="lf">
                    <p>姓　　名:<span>{{this.examerInfo.playerName}}</span></p>
                    <p>性　　别:<span>{{this.examerInfo.gender == 0? '女' : '男'}}</span> 证件类型:<span>{{this.examerInfo.certificateType == 1? '身份证' :'护照'}}</span></p>
                    <p>报考等级:<span>{{this.examerInfo.examLevel}}</span></p>
                    <p><i class="threeLetter">证件号</i>:<span>{{this.examerInfo.certificateNo}}</span></p>
                    <p>考试时间:<span>{{this.examerInfo.examTime}}</span></p>
                    <p>考试地点:<span>{{this.examerInfo.address}}</span></p>
                </div>
                <div id="qrcode">

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
        
        </el-dialog>





        
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
    data(){
        return {
            tableData:[],
            unitsList:[],  //管理单位数组
            levelList:[],  // 考试级别数组
            title:'重新发送准考证，用户可在报名端已报考项目内查看',
            currentPage: null,
            pageSize: 10,
            totalPage: null,
            total: null,
            nameNum:'',
            dialogFormVisible: false,
            showDetailPage:false,
            email:'',
            radio:false,
            examerInfo:{
                playerName:'',
                gender:'',
                examLevel:'',
                examTime:'',
                address:'',
                certificateType:'',
                certificateNo:'',
                examPermitNo:''
            }
        }
    },
    methods:{
        getData(url,params){
            this.$http.get(url, params).then( (res) => {
               console.log(res,111111)
                if(res){
                    this.pageSize = res.data.data.examPermit.pageSize
                    this.totalPage = res.data.data.examPermit.totalPage
                    this.total = res.data.data.examPermit.total
                    this.currentPage = res.data.data.examPermit.page
                    let rst = res.data.data.examPermit.rows 
                    this.tableData = rst
                    this.unitsList = res.data.data.unitsList;
                    this.levelList = res.data.data.levelList;
                    this.tableData.forEach( (item,index) =>{
                        item.examTime = this.getTimeStyle(item.examTime)
                        item.manageUnit = this.unitsList.filter( (value) => value.id === item.manageUnit)[0].unitName
                        item.chessLevel = this.levelList.filter( (value) => value.id === item.chessLevel)[0].levelName
                        item.examLevel = this.levelList.filter( (value) => value.id === item.examLevel)[0].levelName
                    } )

                }
            }).catch( error =>{
                console.log(error)
            })
        },
        handlDetails(id){
            this.showDetailPage = true;
            let params = new URLSearchParams();
            params.append("id",id);
            params.append("userId", 1);
            this.$http.get("/api/ticket/details_list", { params }).then( res => {
                console.log(res.data.data,111112)
                let rst = res.data.data
                this.examerInfo = rst;
                this.examerInfo.examLevel = this.levelList.filter( (value) => value.id === this.examerInfo.examLevel)[0].levelName
                this.examerInfo.examTime = this.getTimeStyle(rst.examTime)
                // this.examerInfo.examTime = this.getTimeStyle(rst.examTime)
                this.getQrCode(this.examerInfo.examPermitNo)
            } )
        },
        getQrCode(val) {
            let qrcode = new QRCode('qrcode', {
                width: 180,
                height: 180,  // 高度  
                text: val,  // 二维码内容
            })
	    },
        closeBtn(){
            this.showDetailPage = false;
        },
        handlSent(){
            if(this.radio){
                var reg = new RegExp("^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"); 
                // 发送邮箱逻辑
               if(this.email === ''){
                   this.$message({
                    message: '邮箱地址不能为空',
                    type: 'warning'
                    });
                    return false
               }
               if( reg.test(this.email)) { 
                   let params = new URLSearchParams();
                   params.append("userId", 1);
                   params.append("id", 1);
                   params.append(email, this.email);
                //    this.getData('/api/ /ticket/details_send',params) 
               }else{
                   //邮箱格式不正确
               }
            }else{
            }
            this.dialogFormVisible = false;
        },
        handleCurrentChange(val) {
            let params = new URLSearchParams();
            params.append("page",val);
            params.append("userId", 1);
            this.getData("/api/ticket/manage_list", { params });
        },
        searchData(){
            alert(this.nameNum)
            let params = new URLSearchParams();
            params.append("userId", 1);
            params.append("id", 1);
            params.append("str",this.nameNum)
            this.getData('/api/ticket/manage_list', { params })
        },
        checkedButton(){
            this.radio =!this.radio
        }
    },
    mounted(){
        let params = new URLSearchParams();
        params.append("userId", 1);
        params.append("id", 1);
        this.getData('/api/ticket/manage_list', { params })
    }
}
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
.ticketList{
    // width: 100%;
    // height: 100%;
    #emailBox{
        min-height: 730px;
        .el-radio{
            width: 88%;
            & /deep/ .el-radio__inner{
                width: 20px;
                height: 20px;
            }
            & /deep/ .el-radio__inner::after {
                width: 8px;
                height: 8px;
                background-color: #1F91B5;
            }
            & /deep/ .el-radio__input.is-checked .el-radio__inner {
                border-color: #48BDD1;
                background: #B3E2ED;
            }
        }
        .sentButton{
            width: 90px;
            background: #1F91B5;
            border-radius: 40px;
            margin-right: 6px;
        }

        & /deep/ .el-dialog__footer{
            padding: 4px 16px 9px
        }


    }
    #detailPageDialog{
        width: 690px;
        height: 100%;
        margin: 0 auto;
        & /deep/ .el-dialog__header{
            padding: 0;
        }
        & /deep/ .el-dialog{
            width: calc( 100% - 40px);
            height: calc( 100% - 60px);
        }
        & /deep/ .el-dialog__body{
            width: calc( 100% - 40px);
            height: 100%;
            position: relative;
            .ticketDetails{
                width: 690px;
                height: 100%;
                // margin: 0 auto;
                position: absolute;
                top: 0;
                left: 0;
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
                        margin-left: 4.5%;
                    }
                    &>p{
                        font-size: 29px;
                        width: 42.6%;
                        float: left;
                        margin-left: 2%;
                        line-height: 41px;
                    }
                    &>i{
                        float: right;
                        margin-right: 2%;
                        font-size: 30px;
                        cursor: pointer;
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
                    #qrcode{
                        width: 180px;
                        height: 180px;
                        float: left;
                        margin-top: 5%;
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
    }
    
}
</style>
