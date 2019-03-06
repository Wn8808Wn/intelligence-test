<template>
    <div class="messageTemplatePage">
       <div class="top" id="messageTem">
            <el-button type="primary" icon="el-icon-plus"  round @click="handleAddmsgType">新增服务类型</el-button>
            <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
                <el-form :model="addForm" label-width="80px"  ref="addForm">
                    <el-form-item label="代码" prop="msgCode">
                        <!-- <el-input v-model="addForm.msgCode" auto-complete="off"></el-input> -->
                        <span>{{addForm.msgCode}}</span>
                    </el-form-item>
                    <el-form-item label="服务类型" prop="msgType">
                        <el-input v-model="addForm.msgType" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="短信内容">
                        <el-input type="textarea" v-model="addForm.templateDetails"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button  @click.native="cancelAdd">取消</el-button>
                    <el-button  type="primary" @click.native="SubmitAdd" >提交 </el-button>
                </div>
            </el-dialog>
            <p>共有<span>{{total}}</span>条结果</p>
        </div>
        <!-- 表格数据部分 -->
        <div class="tabs-data msgTmplate">     
            <el-table
            stripe
            :data="messageTemplateList" 
            style="width: 100%;">
                <el-table-column
                prop="msgCode"
                label="代码"
                type="index"
                :index="indexMethod"
                width="70">
                </el-table-column>

                <el-table-column
                prop="msgType"
                label="服务类型"
                width="150">
                </el-table-column>    

                <el-table-column
                prop="templateDetails"
                label="短信内容"
                width="825">
                </el-table-column>
                <el-table-column
                prop="updatedTime"
                label="修改时间"
                width="150">
                </el-table-column>

                <el-table-column
                label="管理操作">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-error iconfont icon-xiugai-"  @click.native="editCurrentDate(scope.$index, scope.row)">修改</el-button>
                    <!--编辑界面-->
                    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
                        <el-form :model="editForm" label-width="80px"  ref="editForm">
                            <!-- <el-form-item label="代码" prop="msgCode">
                                <el-input v-model="editForm.msgCode" auto-complete="off"></el-input>
                            </el-form-item> -->
                            <el-form-item label="服务类型" prop="msgType">
                                <el-input v-model="editForm.msgType" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="短信内容">
                                <el-input type="textarea" v-model="editForm.templateDetails"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click.native="cancelEdit">取消</el-button>
                            <el-button type="primary" @click.native="editSubmitEdit" >提交 </el-button>
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
            editForm: {
                id:'',
                msgCode: '',
                msgType: '',
                templateDetails: '',
                updatedTime:''
            },
            addForm: {
                msgCode: '',
                msgType: '',
                templateDetails: '',
                updatedTime:''
            },
            addFormVisible:false,
            editFormVisible:false,
        }
    },
    methods:{
        indexMethod(index){
            return 10*(this.currentPage-1)+index+1
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
        handleAddmsgType(index){
            this.addFormVisible = true
            this.addForm.msgCode = this.total+1
        },
        SubmitAdd(){
           // 提交按钮
           if(this.addForm.msgCode && this.addForm.msgType && this.addForm.templateDetails){
               let params = new URLSearchParams();
               params.append("msgCode", this.addForm.msgCode)
               params.append("msgType", this.addForm.msgType)
               params.append("templateDetails", this.addForm.templateDetails)
               this.addFormVisible = false;
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
                    //清空原来数据
                this.addForm = {
                    msgCode: '',
                    msgType: '',
                    templateDetails: '',
                }
               })  
           }else{
                this.$message({
                message: '很遗憾,代码或服务类型或短信内容不能为空',
                type: 'warning',
                center: true
                });

           }
        },
        cancelAdd(){
            this.addFormVisible = false
            this.$message({
                message: '取消新增',
                type:"warning",
                center: true
            })
            this.addForm = {
                msgCode: '',
                msgType: '',
                templateDetails: '',
                updatedTime:''
            }
        },
        editCurrentDate(index,row){
            console.log(index,row)
            this.editFormVisible = true
            // this.editForm.msgCode = val.msgCode
            // this.editForm.msgType = val.msgType
            // this.editForm.templateDetails = val.templateDetails
			this.editForm = Object.assign({}, row);
        },
        editSubmitEdit(){
            this.editFormVisible = false
            let params = new URLSearchParams();
            params.append("id", this.editForm.id)
            params.append("msgCode", this.editForm.msgCode)
            params.append("msgType", this.editForm.msgType)
            params.append("templateDetails", this.editForm.templateDetails)
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
        },
        cancelEdit(){
            this.editFormVisible = false
            this.$message({
                message: '取消修改',
                type:"warning",
                center: true
            });
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
