<template>
    <div class="messageTemplatePage">
       <div class="top" id="messageTem">
            <el-button type="primary" icon="el-icon-plus"  round @click="serverTypeAdd">新增服务类型</el-button>
         <p>共有<span>{{total}}</span>条结果</p>
        </div>
        <!-- 表格数据部分 -->
        <div class="tabs-data msgTmplate">
            <el-table :data="messageTemplateList" style="width: 100%">
                <el-table-column
                prop="msgCode"
                label="代码"
                type="index"
                :index="indexMethod"
                width="60"
                >
                </el-table-column>

                <el-table-column prop="msgType" label="服务类型" width="146">
                    <template  slot-scope="scope">
                    <span v-if="messageTemplateList[scope.$index].editable">{{messageTemplateList[scope.$index].msgType}}</span>
                    <el-input  v-if="!messageTemplateList[scope.$index].editable"  v-model="messageTemplateList[scope.$index].msgType"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="templateDetails" label="短信内容"  width="730">
                <template  slot-scope="scope">
                    <span v-if="messageTemplateList[scope.$index].editable">{{messageTemplateList[scope.$index].templateDetails}}</span>
                    <el-input  v-if="!messageTemplateList[scope.$index].editable"  v-model="messageTemplateList[scope.$index].templateDetails"></el-input>
                </template>
                </el-table-column>

                <el-table-column prop="updatedTime" label="修改时间"  width="165">
                <template  slot-scope="scope">
                    <span>{{messageTemplateList[scope.$index].updatedTime}}</span>
                </template>
                </el-table-column>

                <el-table-column
                    label="管理操作">
                    <template slot-scope="scope">
                        <el-button v-if="messageTemplateList[scope.$index].editable"  type="text" icon="el-icon-error iconfont icon-xiugai-"  @click.native="editCurrentDate(scope.$index, scope.row)">修改</el-button>
                        <el-button  v-if="!messageTemplateList[scope.$index].editable" type="text" icon="el-icon-error iconfont icon-wancheng"  @click.native="completeEdit(scope.$index, scope.row)">完成</el-button>
                    </template>
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
            messageTemplateList:[
            ], 
            // msgCode: '',
            // msgType: '',
            // templateDetails: '',
            // updatedTime:'',
            total:10,
            totalPage:'',
            pageSize:'',
            currentPage:1,
        }
    },
    methods:{
        indexMethod(index){
            return 10*(this.currentPage-1)+index+1
        },
        // getTimeStyle(time){
        //     let d = new Date(time);
        //     let times =
        //     d.getFullYear() +"-" +(d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1): d.getMonth() + 1) +
        //     "-" +(d.getDate() < 10 ? "0" + d.getDate() : d.getDate())+' '+(d.getHours() < 10 ? "0" + d.getHours() : d.getHours())
        //     +":"+(d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes())
        //     return times;
        // },
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
                        this.$set(item,'editable',true);
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
        serverTypeAdd(){
            // if(this.messageTemplateList.length>=10){
                let addCurrentPage = this.totalPage;
                let params = new URLSearchParams();
                params.append("page", addCurrentPage);
                params.append("userId", 1);
                this.$http.get("/api/message/template_list",{ params }).then( res => {
                // console.log(res,1111)
                this.total = res.data.data.total;
                this.totalPage = res.data.data.totalPage;
                this.pageSize = res.data.data.pageSize;
                this.currentPage = res.data.data.page;
                let  rst = res.data.data.rows;
                
                if(rst.length >0){
                    this.messageTemplateList = rst;
                    this.messageTemplateList.forEach((item,index) => {
                        this.$set(item,'editable',true);
                        item.updatedTime  = this.getTimeStyle(item.updatedTime)
                    })  
                }
                rst.push({'editable':false,'addComplete':true,"msgCode":this.total+1})
            })
            // }
            
        },
        editCurrentDate(index,row){
            console.log(index,row)
            row.editable = false;
        },
        completeEdit(index,row){
            if(!row.addComplete){
                let params = new URLSearchParams();
                params.append("id", row.id)
                // params.append("msgCode", row.msgCode)
                params.append("msgType", row.msgType)
                params.append("templateDetails", row.templateDetails)
                this.$http.post('/api/message/template_edit',params).then( res =>{
                this.$message({
                message: '恭喜你，修改成功',
                type: 'success',
                center: true
                });
                let params = new URLSearchParams();
                params.append("userId", 1);
                this.getData('/api/message/template_list',{ params })
                })  
            }else{
                if( row.msgCode && row.msgType && row.templateDetails){
                    let params = new URLSearchParams();
                    params.append("msgCode", row.msgCode)
                    params.append("msgType", row.msgType)
                    params.append("templateDetails", row.templateDetails)
                    this.$http.post('/api/message/template_add',params).then( res =>{
                    this.$alert('请联系技术人员，进一步完成短信服务对接，否则新增的内容无法生效', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    message: '恭喜你，添加短信模板成功',
                                    type: 'success',
                                    center: true
                                });
                            let params = new URLSearchParams();
                            params.append("userId", 1);
                            this.getData('/api/message/template_list',{ params })
                            }
                        });


                    })
                }else{
                    this.$message({
                    message: '很遗憾,代码或服务类型或短信内容不能为空',
                    type: 'warning',
                    center: true
                    });
                }
            }
        }    
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
