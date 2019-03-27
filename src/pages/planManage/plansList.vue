<template>
    <div class="planList">
        <div class="top">
            <el-button type="primary" icon="el-icon-plus"  round @click="handleAddPlan">新增计划</el-button>
            <div class="search">
                <input type="text" placeholder="请输入考场编号或级别"  v-model.trim ="inputVal">
                <el-button circle @click="searchData">搜索</el-button>
            </div>
            <el-button  type="primary"  icon="el-icon-time" round >历史考试计划</el-button>
           
        </div>
        <div class="top" id="searchPart">
            <el-date-picker
            v-model="pickerTime"
            type="daterange"
            @change="changePickerTime"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>

            <el-select  v-model="manageUnit" placeholder="全部管理单位" @change="changeManageUnit">
                <el-option
                v-for="item in manageUnits"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <el-select  v-model="examRoom" placeholder="全部考场" @change="changeExamRoom">
                <el-option
                    v-for="item in examRooms"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label">
                </el-option>
            </el-select>
            <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
        </div>

         <div class="tabs-data" id="tableStatus">     
                    <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                        <el-table-column
                        prop="sequence"
                        label="序号"
                        width="55">
                        </el-table-column>

                        <el-table-column
                        prop="manageUnit"
                        label="管理单位"
                        width="195">
                        </el-table-column>

                        <el-table-column
                        prop="examName"
                        label="考场名称"
                        width="105">
                        </el-table-column>

                        <el-table-column
                        prop="examDate"
                        label="考试日期"
                        width="105">
                        </el-table-column>

                        <el-table-column
                        prop="examTime"
                        label="考试时间"
                        width="85">
                        </el-table-column>

                        <el-table-column
                        prop="timeLong"
                        label="时长"
                        width="70">
                        </el-table-column>

                        <el-table-column
                          label="级别"
                          width="180">
                          <template slot-scope="scope">
                            <p>{{ scope.row.examLevel[scope.row.examLevel.length-1] === 'k'  ? parseInt(scope.row.examLevel,10)+"级" : parseInt(scope.row.examLevel,10) +"段"}}</p>
                          </template>
                        </el-table-column>
                        
                        <el-table-column
                        prop="openTime"
                        label="开放报名时间"
                        width="160">
                        </el-table-column>

                        <el-table-column
                        prop="createdTime"
                        label="创建时间"
                        width="160">
                        </el-table-column>


                        <el-table-column
                        prop="author"
                        label="作者"
                        width="115">
                        </el-table-column>

                        <el-table-column
                        label="管理操作">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-error iconfont icon-xiugai-" @click.prevent="modifyData(scope.row.id)" >修改</el-button>
                            <el-button type="text" icon="el-icon-error iconfont icon-xiangqing" @click.prevent="handldetails(scope.row.id)">详情</el-button>
                        </template>
                        </el-table-column >
                    </el-table>
                    
                    <el-pagination
                    background
                    :total="total" 
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange">
                    </el-pagination>
                </div>  





    </div>
</template>

<script>
export default {
    data(){
        return{
            inputVal:'',
            total:10,
            pickerTime:'',
            manageUnit:'',
            manageUnits:[],
            examRoom:'',
            examRooms:[],
            tableData:[
                {
                    sequence:1,
                    manageUnit:'河北省围棋协会',
                    examName:'动力区考场',
                    examDate:'2018-11-04',
                    examTime:'9:30',
                    timeLong:'45分钟',
                    examLevel:'25K',
                    openTime:'2019-09-09 9:30',
                    createdTime:'2019-03-22  14:22',
                    author:'王老师',
                },
                 {
                    sequence:2,
                    manageUnit:'河北省围棋协会',
                    examName:'动力区考场',
                    examDate:'2018-11-04',
                    examTime:'9:30',
                    timeLong:'45分钟',
                    examLevel:'25K',
                    openTime:'2019-09-09 9:30',
                    createdTime:'2019-03-22  14:22',
                    author:'王老师',
                },
                 {
                    sequence:3,
                    manageUnit:'河北省围棋协会',
                    examName:'动力区考场',
                    examDate:'2018-11-04',
                    examTime:'9:30',
                    timeLong:'45分钟',
                    examLevel:'25K',
                    openTime:'2019-09-09 9:30',
                    createdTime:'2019-03-22  14:22',
                    author:'王老师',
                },
                 {
                    sequence:4,
                    manageUnit:'河北省围棋协会',
                    examName:'动力区考场',
                    examDate:'2018-11-04',
                    examTime:'9:30',
                    timeLong:'45分钟',
                    examLevel:'25K',
                    openTime:'2019-09-09 9:30',
                    createdTime:'2019-03-22  14:22',
                    author:'王老师',
                },
                 {
                    sequence:5,
                    manageUnit:'河北省围棋协会',
                    examName:'动力区考场',
                    examDate:'2018-11-04',
                    examTime:'9:30',
                    timeLong:'45分钟',
                    examLevel:'25K',
                    openTime:'2019-09-09 9:30',
                    createdTime:'2019-03-22  14:22',
                    author:'王老师',
                },

            ],
            sequence:'',
            manageUnit:'',
            examName:'',
            examDate:'',
            examTime:'',
            timeLong:'',
            examLevel:'',
            openTime:'',
            createdTime:'',
            author:'',
            currentPage:1,
        }

    },
    methods:{
        handleAddPlan(){
            this.$router.push('')

        },
        searchData(){

        },
        changePickerTime(){

        },
        changeManageUnit(){

        },
        changeExamRoom(){

        },
        modifyData(){

        },
        handldetails(){

        },
        handleCurrentChange(){
            
        }
    }
    
}
</script>

<style lang="scss" scoped>
.planList{
    width: 100%;
    height: 926px;
    // background: skyblue;
    #searchPart{   
        height: 66px;
        width: 100%;
        &>.el-select{
            margin:0 13px;
        }
        &>.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
             margin-left: -760px;
        }
        //修改时间划过样式border变蓝色
        .el-input__inner{
            vertical-align: middle;
            border-radius: 32px;
            border-color:#8b8b8b;
        }
        .el-range-editor.is-active, .el-range-editor.is-active:hover{
            border-color: #409EFF;
        }
        &>p{
            padding-top: 20px;
            margin-right: 20px;
        }
    }
}
</style>
