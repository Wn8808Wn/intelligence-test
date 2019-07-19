<template>
    <div class="planList">
        <div class="top">
            <el-button type="primary" icon="el-icon-plus"  round @click="handleAddPlan">新增计划</el-button>
            <div class="search">
                <input type="text" placeholder="请输入考场编号或级别"  v-model.trim ="inputVal">
                <el-button circle @click="searchData">搜索</el-button>
            </div>
            <el-button class="historyBtn"  type="primary"  icon="el-icon-time" round @click="handleHistory" >历史考试计划</el-button>
        </div>
        <div class="top" id="searchPart"> 
            <div class="lfPart">
            <el-date-picker
            v-model="pickerTime"
            type="daterange"
            @change="changePickerTime"
            format="yyyy - MM - dd "
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>

            <el-select  v-model="manageUnitId" placeholder="全部管理单位" @change="changeManageUnit">
                <el-option
                v-for="item in unitsList"
                :key="item.id"
                :label="item.unitName"
                :value="item.id">
                </el-option>
            </el-select>

            <el-select  v-model="examRoomId" placeholder="全部考场" @change="changeExamRoom">
                <el-option
                    v-for="item in roomList"
                    :key="item.id"
                    :label="item.examRoomName"
                    :value="item.id">
                </el-option>
            </el-select>
            </div>
            <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
        </div>

         <div class="tabs-data" id="planListTbs">     
                    <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%">
                        <el-table-column
                        label="序号"
                        type="index"
                        :index="indexMethod"
                        width="55">
                        </el-table-column>

                        <el-table-column
                        prop="manageUnit"
                        label="管理单位"
                        width="195">
                        </el-table-column>

                        <el-table-column
                        prop="roomIdName"
                        label="考场名称"
                        width="120">
                        </el-table-column>

                        <el-table-column
                          label="考试日期"
                          width="105">
                          <template slot-scope="scope">
                            <span>{{scope.row.examDate.split(' ')[0]}}</span>
                          </template>
                        </el-table-column>

                        <el-table-column
                        prop="examTime"
                        label="考试时间"
                        width="85">
                        </el-table-column>

                        <el-table-column
                        prop="timeStr"
                        label="时长"
                        width="70">
                        </el-table-column>

                        <el-table-column
                          label="级别"
                          width="180">
                          <template slot-scope="scope">
                            <!-- <p>{{ scope.row.examLevel}}</p> -->
                            <span>{{scope.row.levelStr.replace(/,/g,'/')}}</span>
                          </template>
                        </el-table-column>
                        
                        <!-- 开放报名时间 有两部分组成 signOpenDate + signOpenTime 组成新的字符串 -->
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
                        prop="createdUser"
                        label="作者"
                        width="115">
                        </el-table-column>

                        <el-table-column
                        label="管理操作">
                        <template slot-scope="scope">
                            <el-button type="text" icon="iconfont icon-xiugai-" @click.prevent="modifyData(scope.row)" :disabled ="scope.row.status" >修改</el-button>
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
import { mapMutations,mapActions }from 'vuex';
export default {
    props:["CurrentPages"],
    data(){
        return{
            inputVal:'',
            pickerTime:'',
            manageUnitId:'',
            examRoomId:'',
            unitsList:[],
            roomList:[],
            tableData:[],
            currentPage:1,
            total:null,
            totalPage:null,
            pageSize:null,
            tableData1:[]
        }

    },
    methods:{
        indexMethod(index){
            return index+1+this.pageSize*(this.currentPage-1);
        },
        getData(params){
            this.$http.get('/api/plan/plan_list', {params}).then(res => {
                this.tableData = [];
                if(res.status === 200 && res.data.code ===0){
                    this.total = res.data.data.planPage.total;
                    this.totalPage = res.data.data.planPage.totalPage;
                    this.pageSize = res.data.data.planPage.pageSize;
                    this.currentPage = res.data.data.planPage.page;
                    // console.log(res.data.data,'999')
                    let rst = res.data.data;
                    this.unitsList = rst.unitsList
                    this.unitsList.unshift({unitName:'全部',id:0})
                    this.roomList = rst.roomList
                    this.roomList.unshift({examRoomName:'全部',id:0})
                    this.tableData = rst.planPage.rows
                    this.tableData.forEach((item, index) => {
                        item.createdTime = this.getTimeStyle(item.createdTime).split(' ')[0]
                        item.manageUnit = this.unitsList.filter(itemVal => itemVal.id === item.manageUnit)[0].unitName
                        item.roomIdName = this.roomList.filter(itemVal => itemVal.id === item.roomId)[0].examRoomName
                        item.openTime = item.signOpenDate.split(' ')[0]+' '+item.signOpenTime;
                        //判断修改的状态
                        let openTimeStamp = Number(Date.parse(item.openTime.replace(/-/g,'/')))
                        let nowTImeStamp = Number(new Date())
                        if(openTimeStamp-nowTImeStamp >= 0){
                            //开放报名时间比现在晚
                            item.status = false
                        }else{
                            item.status = true
                        }
                    });
                }else{
                    console.log(res.data.msg)
                }
            }).catch((err)=>{
                console.log('数据异常')
            });
        },
        handleAddPlan(){
            this.$router.push({name:'addPlan'})
        },
        searchData(){
            let params = new URLSearchParams();
            params.append("provinceId",110000);
            params.append("paramStr",this.inputVal)
            if(this.manageUnitId !== ''){
                params.append("manageUnit",this.manageUnitId)
            }else{
                params.append("manageUnit",0)
            }
            if(this.examRoomId !== ''){
                params.append("roomId",this.examRoomId)
            }else{
                params.append("roomId",0)
            }
            if(this.pickerTime !== '' && this.pickerTime !== null){
                params.append("begin",this.pickerTime[0])
                params.append("end",this.pickerTime[1])
            }
            this.getData(params); 
        },
        handleHistory(){
            alert("后期增加历史考试计划")
        },
        changePickerTime(val){
            let params = new URLSearchParams();
            params.append("provinceId",110000);
            if(this.pickerTime !== '' && this.pickerTime !== null){
                params.append("begin",this.pickerTime[0])
                params.append("end",this.pickerTime[1])
            }
            if(this.inputVal !== ''){
                params.append("paramStr",this.inputVal)
            }else{
                params.append("paramStr",'')
            }
            if(this.manageUnitId !== ''){
                params.append("manageUnit",this.manageUnitId)
            }else{
                params.append("manageUnit",0)
            }
            if(this.examRoomId !== ''){
                params.append("roomId",this.examRoomId)
            }else{
                params.append("roomId",0)
            }
            this.getData(params); 
        },
        changeManageUnit(val){
            this.manageUnitId = val;
            let params = new URLSearchParams();
            params.append("provinceId",110000);
            params.append("manageUnit",val)
            if(this.inputVal !== ''){
                params.append("paramStr",this.inputVal)          
            }else{
                params.append("paramStr",'');
            }
            if(this.examRoomId !== ''){
                params.append("roomId",this.examRoomId)          
            }else{
                params.append("roomId",0);
            }
            if(this.pickerTime !== '' && this.pickerTime !== null){
                params.append("begin",this.pickerTime[0])
               params.append("end",this.pickerTime[1])
            }
            this.getData(params); 
        },  
        changeExamRoom(val){
            this.examRoomId =val;
            let params = new URLSearchParams();
            params.append("roomId",val)
            params.append("provinceId",110000);
            if(this.inputVal !== ''){
                params.append("paramStr",this.inputVal)        
            }else{
                params.append("paramStr",'')
            }
            if(this.manageUnitId !== ''){
                params.append("manageUnit",this.manageUnitId)        
            }else{
                params.append("manageUnit",0)
            }
            if(this.pickerTime !== '' && this.pickerTime !== null){
                params.append("begin",this.pickerTime[0])
               params.append("end",this.pickerTime[1])
            }
            this.getData(params); 
        },
        modifyData(val){
            console.log(val)
            let timetamp4 = Number(Date.parse(val.openTime.replace(/-/g,'/')))
            let timetamp3 = Number(new Date())
                    console.log(timetamp4-timetamp3,111111)
            if(timetamp4-timetamp3 <= 0){
                this.$message({
                    message: '已经过了开放报名时间了,不能修改了',
                    type: 'warning'
                })
                this.$router.go(0)
                //刷新页面更改状态
            }else{
                 this.$router.push({name:'editPlan'})
                this.$store.dispatch('modifyDate',{'currentId':val.id,'storeRoomId':val.roomId})
            }
        },
        handleCurrentChange(val){
            let params = new URLSearchParams();
            params.append("provinceId",110000);
            params.append("page", val);
            if(this.inputVal !== ''){
                params.append("paramStr",this.inputVal)        
            }else{
                params.append("paramStr",'')
            }
            if(this.manageUnitId !== ''){
                params.append("manageUnit",this.manageUnitId)        
            }else{
                params.append("manageUnit",0)
            }
            if(this.examRoomId !== ''){
                params.append("roomId",this.examRoomId)        
            }else{
                params.append("roomId",0)
            }
            if(this.pickerTime !== '' && this.pickerTime !== null){
                params.append("begin",this.pickerTime[0])
                params.append("end",this.pickerTime[1])
            }
            this.getData(params); 
        },
    },
    mounted(){
        // let  params={
        //     "provinceId":110000,
        //     "manageUnit":0,
        //     "roomId":0,
        //     // begin:this.pickerTime[0],
        //     // end:this.pickerTime[1],
        //     "paramStr":''
        // }
        let params = new URLSearchParams();
        params.append("provinceId", 110000);
        params.append("manageUnit", 0);
        params.append("roomId", 0);
        params.append("paramStr", '');
        this.getData(params); 
    }
}
</script>

<style lang="scss" scoped>
.planList{
    width: 100%;
    height: 926px;
    #searchPart{   
        height: 50px;
        padding-left:20px;
        width: calc(100% - 20px);
        &>.lfPart{
            float: left;
            &>.el-select{
                width: 180px;
                height: 40px;
                margin:0 13px;
            }
            &>.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
                width: 350px;
                height: 40px;
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
        }
        &>p{
            float: right;
            height: 20px;
            padding-top: 20px;
        }
    }
    & > .tabs-data{
       .el-button.is-disabled.el-button--text {
            color: #c0c4cc;
        }
        & /deep/ .el-pagination{
            bottom: 224px;
        }
    }
    .historyBtn{
        width: 167px;
        & /deep/ .el-icon-time:before {
            margin-right: 8px;
        }
    }
}
</style>
