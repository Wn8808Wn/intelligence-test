<template>
    <div class="messagePage">
       <div id="countNum">
           <p>共有<span>{{total}}</span>条</p>
       </div>
        <!-- 表格数据部分 -->
        <div class="tabs-data">     
            <el-table
            stripe
            :data="messageList" 
            style="width: 100%;">
                <el-table-column
                prop="msgType"
                label="服务类型"
                width="185">
                </el-table-column>
                <el-table-column
                prop="msgDetails"
                label="短信内容"
                width="830">
                </el-table-column>
                <el-table-column
                prop="sendTime"
                label="发送时间"
                width="177">
                </el-table-column>
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
    </div>
</template>

<script>
export default {
    data(){
        return{
            messageList:[
                // {
                //     msgType:"认证服务订单通知",
                //     msgDetails:'恭喜刘强230281198901021101通过1段定级考评，请于2019年6月1日前，前往公众号报名系统_我的订单缴纳认证服务费完成段级位认证，更多内容请咨询公众号“中国围棋协会”客服，关键字”认证服务“【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"认证服务通知",
                //     msgDetails:'恭喜刘强230281198901021101成功定级1段【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"考试结果通知",
                //     msgDetails:'恭喜刘强23刘强230281198901021101本次1段定级考试中，取得90分【智能考场】。0281198901021101通过1段定级考评，请于2019年6月1日前，前往公众号报名系统_我的订单缴纳认证服务费完成段级位认证，更多内容请咨询公众号“中国围棋协会”客服，关键字”认证服务“【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"认证服务订单通知",
                //     msgDetails:'恭喜刘强230281198901021101通过1段定级考评，请于2019年6月1日前，前往公众号报名系统_我的订单缴纳认证服务费完成段级位认证，更多内容请咨询公众号“中国围棋协会”客服，关键字”认证服务“【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"认证服务通知",
                //     msgDetails:'恭喜刘强230281198901021101成功定级1段【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"考试结果通知",
                //     msgDetails:'恭喜刘强23刘强230281198901021101本次1段定级考试中，取得90分【智能考场】。0281198901021101通过1段定级考评，请于2019年6月1日前，前往公众号报名系统_我的订单缴纳认证服务费完成段级位认证，更多内容请咨询公众号“中国围棋协会”客服，关键字”认证服务“【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"认证服务订单通知",
                //     msgDetails:'恭喜刘强230281198901021101通过1段定级考评，请于2019年6月1日前，前往公众号报名系统_我的订单缴纳认证服务费完成段级位认证，更多内容请咨询公众号“中国围棋协会”客服，关键字”认证服务“【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"认证服务通知",
                //     msgDetails:'恭喜刘强230281198901021101成功定级1段【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"考试结果通知",
                //     msgDetails:'恭喜刘强23刘强230281198901021101本次1段定级考试中，取得90分【智能考场】。0281198901021101通过1段定级考评，请于2019年6月1日前，前往公众号报名系统_我的订单缴纳认证服务费完成段级位认证，更多内容请咨询公众号“中国围棋协会”客服，关键字”认证服务“【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // },
                // {
                //     msgType:"认证服务通知",
                //     msgDetails:'恭喜刘强230281198901021101成功定级1段【智能考场】。',
                //     sendTime:"2019-2-25 19:20"
                // }
            ],
            total:10,
            totalPage:'',
            pageSize:'',
            currentPage:1,
        }
    },
    methods:{
        //  getTimeStyle(time){
        //     let d = new Date(time);
        //     let times =
        //     d.getFullYear() +"-" +(d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1): d.getMonth() + 1) +
        //     "-" +(d.getDate() < 10 ? "0" + d.getDate() : d.getDate())+' '+(d.getHours() < 10 ? "0" + d.getHours() : d.getHours())
        //     +":"+(d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes())
        //     return times;
        // },
        getData(url,params){
            this.messageList =[];
            this.$http.get(url,params).then( res => {
                // console.log(res)
                this.total = res.data.data.total;
                this.totalPage = res.data.data.totalPage;
                this.pageSize = res.data.data.pageSize;
                this.currentPage = res.data.data.page;
                let  rst = res.data.data.rows;
                if(rst.length > 0) {
                    this.messageList = rst ;
                    this.messageList.forEach((item,index) => {
                        item.sendTime  = this.getTimeStyle(item.sendTime)
                    })  
                }
            })
        },
        handleCurrentChange(val){
            let params = new URLSearchParams();
            params.append("page", val);
            params.append("userId", 1);
            this.getData("/api/message/notice_list", { params });
        }
    },
    mounted(){
        let params = new URLSearchParams();
        params.append("userId", 1);
        this.getData("/api/message/notice_list", { params });
    }
}
</script>


<style rel='stylesheet/scss' lang="scss" scoped>
.messagePage{
    width: 100%;
    #countNum{
        width: 100%;
        height: 97px;
        background: #ffffff;
        &>p{
            float: right;
            margin-top: 45px;
            margin-right: 40px;
        }
    }
    
}
</style>
