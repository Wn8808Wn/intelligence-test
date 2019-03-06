<template>
    <div class="messageTemplatePage">
       <div class="top" id="messageTem">
            <el-button type="primary" icon="el-icon-plus"  round @click="add">新增服务类型</el-button>
         <p>共有<span>{{total}}</span>条结果</p>
        </div>
        <!-- 表格数据部分 -->
        <el-table :data="messageTemplateList" style="width: 100%">
            <el-table-column
            prop="msgCode"
            label="代码"
            type="index"
            :index="indexMethod"
            width="70"
            >
            </el-table-column>

            <el-table-column prop="msgType" label="服务类型" width="150">
                <template  slot-scope="scope">
                <span v-if="showInput">{{messageTemplateList[scope.$index].msgType}}</span>
                <el-input  v-if="!showInput"  v-model="messageTemplateList[scope.$index].msgType"></el-input>
                </template>
            </el-table-column>

            <el-table-column prop="templateDetails" label="短信内容"  width="825">
            <template  slot-scope="scope">
                <span v-if="showInput">{{messageTemplateList[scope.$index].templateDetails}}</span>
                <el-input  v-if="!showInput"  v-model="messageTemplateList[scope.$index].templateDetails"></el-input>
            </template>
            </el-table-column>

            <el-table-column prop="updatedTime" label="修改时间"  width="150">
            <template  slot-scope="scope">
                <span>{{messageTemplateList[scope.$index].updatedTime}}</span>
            </template>
            </el-table-column>

            <el-table-column
                label="管理操作">
                <template slot-scope="scope">
                    <el-button v-if="showInput "  type="text" icon="el-icon-error iconfont icon-xiugai-"  @click.native="editCurrentDate(scope.$index, scope.row)">修改</el-button>
                    <el-button  v-if="!showInput" type="text" icon="el-icon-error iconfont icon-wancheng"  @click.native="editCurrentDate(scope.$index, scope.row)">完成</el-button>
                 </template>
            </el-table-column>


        </el-table>
       
        </div>
 
</template>

<script>
export default {
    data(){
        return{
            messageTemplateList:[
            ], 
            msgCode: '',
            msgType: '',
            templateDetails: '',
            updatedTime:'',
            total:10,
            totalPage:'',
            pageSize:'',
            currentPage:1,
            showInput:true,
           
        }
    },
    methods:{
        indexMethod(index){
            return  index+100;
        },
        getTimeStyle(time){
            let d = new Date(time);
            let times =
            d.getFullYear() +"-" +(d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1): d.getMonth() + 1) +
            "-" +(d.getDate() < 10 ? "0" + d.getDate() : d.getDate())+' '+(d.getHours() < 10 ? "0" + d.getHours() : d.getHours())
            +":"+(d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes())
            return times;
        },
        getData(url,params){
            this.$http.get(url,params).then( res => {
                // console.log(res,1111)
                this.total = res.data.data.total;
                this.totalPage = res.data.data.totalPage;
                this.pageSize = res.data.data.pageSize;
                this.currentPage = res.data.data.page;
                let  rst = res.data.data.rows;
                if(rst.length >0){
                    this.messageTemplateList = rst;
                    this.messageTemplateList.forEach((item,index) => {
                        item.updatedTime  = this.getTimeStyle(item.updatedTime)
                    })  
                }
            })
        },
        handleCurrentChange(val){
            let params = new URLSearchParams();
            params.append("page", val);
            params.append("userId", 1);
            this.getData("/api/message/template_list", { params });
        },
        add(){
            this.showInput = false;
            this.messageTemplateList.push({});
        },
       
        
    },
    mounted(){
        let params = new URLSearchParams();
        params.append("userId", 1);
        this.getData('/api/message/template_list',{ params })
    }
      
}
</script>


<style rel='stylesheet/scss' lang="scss" scoped>
.messageTemplatePage{
    width: 100%;
    #messageTem{
       & > .el-button.el-button--primary.is-round{
           width: 182px;
       }
    }
}
</style>
