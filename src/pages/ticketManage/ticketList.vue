<template>
    <div class="ticketList">
        <div class="top">
            <div class="search">
                <input type="text" placeholder="请输入考场姓名/证件号"  v-model.trim="nameNum">
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
                    <el-button type="text" icon="el-icon-error iconfont icon-fasong"  @click.prevent="handlSent(scope.row.id)">发送</el-button>
                    <el-button type="text" icon="el-icon-error iconfont icon-xiangqing"  @click.prevent="handlDetails(scope.row.id)">详情</el-button>
                    <el-dialog :title="title" :visible.sync="dialogFormVisible" width='30%'>
                        <el-radio  v-model="radio" @click="checkedButton"><el-input  v-model="email" placeholder="同时发送至用户邮箱:"></el-input></el-radio>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogFormVisible = false">发 送</el-button>
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
        return {
            tableData:[
                {
                    manageUnit:'黑龙江省围棋协会',
                    playerName: "刘强",
                    certificateNo:21090419888121901234,
                    chessLevel:"5级",
                    phone:18210465511,
                    examLevel:"1段",
                    examTime:'2019-01-01 8:00',
                    dataStatus:0
                },
                {
                    manageUnit:'黑龙江省围棋协会',
                    playerName: "刘强",
                    certificateNo:21090419888121901234,
                    chessLevel:"5级",
                    phone:18210465511,
                    examLevel:"1段",
                    examTime:'2019-01-01 8:00',
                    dataStatus:1
                },
                {
                    manageUnit:'黑龙江省围棋协会',
                    playerName: "刘强",
                    certificateNo:21090419888121901234,
                    chessLevel:"5级",
                    phone:18210465511,
                    examLevel:"1段",
                    examTime:'2019-01-01 8:00',
                    dataStatus:0
                },
                {
                    manageUnit:'黑龙江省围棋协会',
                    playerName: "刘强",
                    certificateNo:21090419888121901234,
                    chessLevel:"5级",
                    phone:18210465511,
                    examLevel:"1段",
                    examTime:'2019-01-01 8:00',
                    dataStatus:1
                },
                 {
                    manageUnit:'黑龙江省围棋协会',
                    playerName: "刘强",
                    certificateNo:21090419888121901234,
                    chessLevel:"5级",
                    phone:18210465511,
                    examLevel:"1段",
                    examTime:'2019-01-01 8:00',
                    dataStatus:0
                },
                {
                    manageUnit:'黑龙江省围棋协会',
                    playerName: "刘强",
                    certificateNo:21090419888121901234,
                    chessLevel:"5级",
                    phone:18210465511,
                    examLevel:"1段",
                    examTime:'2019-01-01 8:00',
                    dataStatus:1
                },
                 {
                    manageUnit:'黑龙江省围棋协会',
                    playerName: "刘强",
                    certificateNo:21090419888121901234,
                    chessLevel:"5级",
                    phone:18210465511,
                    examLevel:"1段",
                    examTime:'2019-01-01 8:00',
                    dataStatus:0
                },
                {
                    manageUnit:'黑龙江省围棋协会',
                    playerName: "刘强",
                    certificateNo:21090419888121901234,
                    chessLevel:"5级",
                    phone:18210465511,
                    examLevel:"1段",
                    examTime:'2019-01-01 8:00',
                    dataStatus:1
                },
            ],
            title:'重新发送准考证，用户可在报名端已报考项目内查看',
            total:10,
            currentPage:1,
            nameNum:'',
            dialogFormVisible: false,
            email:'',
            radio:1,
        }
    },
    methods:{
        handlDetails(){

        },
        handlSent(){
            this.dialogFormVisible = true;

        },
        handleCurrentChange(val){

        },
        searchData(){
            
        },
        checkedButton(){
        }
    }

}
</script>

<style  lang="scss" scoped>
.ticketList{
    #emailBox{
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
        
    }
}



</style>
