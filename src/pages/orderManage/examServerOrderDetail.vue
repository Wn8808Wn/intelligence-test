<template>
<div id="orderDetails">
    <commonTop :titleTop="titleTop"></commonTop>
    <div class="tabs-data dataDetail" id="tableDetail">   
            <el-table
            :data="orderInfo"
            stripe
            style=" width:100%; margin-top:28px">
                <el-table-column
                prop="orderNo"
                label="订单编号"
                width="208">
                </el-table-column>
                <el-table-column
                prop="userName"
                label="用户名"
                width="143">
                </el-table-column>
                <el-table-column
                prop="phone"
                label="联系方式"
                width="140">
                </el-table-column>
                <el-table-column
                prop="totalFee"
                label="费用"
                width="93">
                </el-table-column>
                <el-table-column
                prop="createdTime"
                label="创建时间"
                width="184">
                </el-table-column>
                <el-table-column
                prop="payTime"
                label="付款时间"
                width="187">
                </el-table-column>
            </el-table>    
    </div>

    <div class="examInfoBox" v-if="orderType == 0">
        <p>报考级别：<span>{{examLevel}}</span></p>
        <p>考试地点：<span>{{address}}</span>
        <p>考试时间：<span>{{examTime}}</span></p>
    </div>

    <div class="examInfoBox"  v-if="orderType == 1">
        <p>认证级别：<span>{{examLevel}}</span></p>
        <p>邮寄地址：<span>后期微信公众号添加</span>
        <p>收件人：<span>刘强</span></p>
        <p>联系方式：<span>18777777778</span></p>
    </div>

    <div class="examerInfo" v-if="orderType == 0">
        <h3>考生信息</h3>
        <div class="tabs-data examerInfoDetail" id="orType0tabel">   
            <el-table
            :data="detailList"
            stripe
            style="width: 583px;margin-top:28px;">
                <el-table-column
                prop="playerName"
                label="姓名"
                width="106">
                </el-table-column>

                <el-table-column
                label="证件类型"
                width="111">
                 <template slot-scope="scope">
                     <span v-if="scope.row.certificateType === 0">身份证</span>
                     <span v-if="scope.row.certificateType === 1">港澳台身份证身份证</span>
                 </template>
                </el-table-column>


                <el-table-column
                prop="certificateNo"
                label="证件号"
                width="185">
                </el-table-column>
                <el-table-column
                prop="chessLevel"
                label="当前段位"
                width="82">
                </el-table-column>
                <el-table-column
                prop="payoffStatus"
                label="退款处理"
                width="99">
                <template slot-scope="scope">
                    <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                    <div class="refundInfo">
                        <div v-for="(item,index) in refundList" :key="index">
                            <p><span>订单号:</span>          <span>{{item.refundOrderNo}}</span></p>
                            <p><span>退款考生姓名:</span>     <span>{{item.playerName}}</span></p>
                            <p><span>退款考生证件号:</span>   <span>{{item.certificateNo}}</span></p>
                            <p><span>退款账户:</span>         <span>{{item.accountNum}}</span></p>
                            <p><span>退款时间:</span>         <span>{{item.refundTime}}</span></p>
                            <p><span>退款金额:</span>         <span>{{item.refundFee}}</span>元</p>
                        </div>
                    </div>
                    <el-button type="text" slot="reference" icon="el-icon-error iconfont icon-yituikuan"  @click.prevent="handldetails(scope.row.id)">{{payoffStatus}}</el-button>
                    </el-popover>
                </template>
                </el-table-column>
            </el-table>    
    </div>
    </div>

    <div class="examerInfo examInfoType2" v-if="orderType == 1">
        <h3>考生信息</h3>
        <div class="tabs-data examerInfoDetail">   
            <el-table
            :data="detailList"
            stripe
            style="width: 583px;margin-top:28px;">
                <el-table-column
                prop="playerName"
                label="姓名"
                width="106">
                </el-table-column>
                <el-table-column
                prop="certificateType"
                label="证件类型"
                width="111">
                </el-table-column>
                <el-table-column
                prop="certificateNo"
                label="证件号"
                width="185">
                </el-table-column>
                <el-table-column
                prop="chessLevel"
                label="当前段位"
                width="82">
                </el-table-column>
                <el-table-column
                prop="examFee"
                label="认证费用"
                width="99">
                </el-table-column>
            </el-table>    
    </div>
    </div>
</div>
</template>

<script>
import commonTop from "../common/commonTop";
export default {
  components: {
    commonTop,
  },
  props:["index"],
  data(){
      return{
          titleTop:'订单详情',
          payoffStatus:'已退款',
          examLevel:null,
          address:null,
          examTime:null,
          orderInfo:null,
          detailList:null,
          refundList:null,
          orderType:''
      }
  },
  methods:{
    getData(url,params){
      this.orderInfo = [];
      this.detailList = [];
      this.refundList = [];
      this.$http.get(url,params).then(res => {
        //   console.log(res)
          console.log(res.data.data.orderInfo)
          console.log(res.data.data.detailList)
        //   console.log(res.data.data.refundList)

        let orderInfo = res.data.data.orderInfo
        this.orderInfo.push(orderInfo)

        this.orderType = this.orderInfo[0].orderType
          //创建时间
        this.orderInfo[0].createdTime = this.getTimeStyle(orderInfo.createdTime); 
          //付款时间
        this.orderInfo[0].payTime =this.getTimeStyle(orderInfo.payTime);
        //考试时间
        this.examTime = this.getTimeStyle(orderInfo.examTime);
        this.examLevel = orderInfo.examLevel;
        this.address =orderInfo.address;
        this.detailList = res.data.data.detailList;


        //考生信息表  //判断有无退款？？？？？？？？？？？？
        let refundList = res.data.data.refundList;
        this.refundList = refundList;
        for(let i = 0; i<this.refundList.length; i++){

        let refundTime = this.getTimeStyle(refundList[i].refundTime);
        this.refundList[i].refundTime = refundTime 
        }
      })
    },
    handldetails(val){
         console.log(val) 
    }
  },
  mounted(){
          let params = new URLSearchParams();
          params.append("userId", 1);
          params.append("id", this.index);
          this.getData("/api/order/order_detail", { params });
  }
}  
</script>

<style rel='stylesheet/scss' lang="scss" scoped>
#orderDetails{
    width: 955px;
    height: 946px;
    padding-left: 36px;
    padding-right: 205px;
    background: #ffffff;
    &>.dataDetail{
        width: 100%;
    }
    #tableDetail{
        padding: 0;
        height: 110px;
        // background: sandybrown;
        min-height: 0px;
    }
    &>.examInfoBox{
        width: 100%;
        margin-top:45px;
        &>p{
            height: 41px;
            line-height: 41px;
            width: 100%;
            font-size: 16px;
            color: #000;
            span{
                padding-left: 20px;
            }
        }
    }
    .examerInfo{
        margin-top: 62px;
        &>h3{
            font-size: 16px;
            color: #c7c7c7;
            height: 39px;
            line-height: 39px;
        }
        .examerInfoDetail{
            padding: 0;
        }
        #orType0tabel{
            & .el-button--text{
                color: red;
            }
        }
    }
    .examInfoType2{
        margin-top: 22px;
    }
}
.refundInfo{
    padding: 20px  33px 26px;
    &>div{
        margin-top: 20px;
        &:first-child{
            margin-top: 0; 
        }
        &>p{
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            &>span:last-child{
                margin-left: 20px;
            }
        }
    }
}
</style>

