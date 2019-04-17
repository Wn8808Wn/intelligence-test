<template>
    <div class="limitRegistrationSet">
        <div class="top">
            <el-select  v-model="manageUnit" placeholder="全部管理单位" @change="changeSearch">
                <el-option
                v-for="item in unitsList"
                :key="item.id"
                :label="item.unitName"
                :value="item.id">
                </el-option>
            </el-select>
            <p>共有<span>{{total}}</span>/<span>{{total}}</span>条结果</p>
        </div>
        
         <div class="tabs-data">     
            <el-table
            stripe
            :data="tableData"
            style="width: 100%">
                <el-table-column
                prop="id"
                label="序号"
                width="110">
                </el-table-column>
                <el-table-column
                prop="manageUnit"
                label="管理单位"
                width="225">
                </el-table-column>
                 <el-table-column
                label="无证限报级别"
                width="152">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.limitLevel" @change='changeNolimitLevEvent(scope.row)'>
                        <el-option
                            v-for="item in levelList"
                            :key="item.id"
                            :label="item.levelName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </template>
                </el-table-column >

                <el-table-column
                label="不限报年龄"
                width="150">
                <template slot-scope="scope">
                    <div class="ageLimit">
                        <el-input 
                        @blur="changeAge(scope.row)"
                        v-model="scope.row.limitAge"
                        >
                        </el-input>
                        <span>岁以上</span>
                    </div>
                    <!-- <p><input type="text" v-model.number="age">岁以上</p> -->
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            manageUnit:'',
            unitsList:[],
            levelList:[],
            total:5,
            limitLevel:'',
            tableData:[]
        }
    },
    methods:{
        getData( url, params){
            this.$http.get(url, params).then(res => {
            // console.log(res)
                if(res){
                    let rst = res.data.data.list;
                    this.tableData = rst;
                    this.unitsList = res.data.data.unitsList;
                    this.levelList = res.data.data.levelList;
                    this.tableData.forEach( (item,index) =>{
                        item.examTime = this.getTimeStyle(item.examTime)
                        item.manageUnit = this.unitsList.filter( (value) => value.id === item.manageUnit)[0].unitName
                        item.limitLevel = this.levelList.filter( (value) => value.id === item.limitLevel)[0].levelName
                    } )
                }else{
                    console.log(res.data.msg)
                }
            });
        },
        changeSearch(val){
            let params = new URLSearchParams();
            params.append('manageUnit',val)
            this.getData('/api/sign_limit/list', { params })
        },
        changeNolimitLevEvent(val){
            // console.log(val)
            let params = new URLSearchParams();
            params.append('id',val.id)
            params.append('limitLevel',val.limitLevel)
            this.$http.post('/api/sign_limit/edit',params).then( res => {
                console.log(res)
            })
        },
        changeAge(val){
            // console.log(val.id,val.age)
            let params = new URLSearchParams();
            params.append('id',val.id)
            params.append('age',val.limitAge)
            this.$http.post('/api/sign_limit/edit',params).then( res => {
                console.log(res)
            })
        }
    },
    mounted(){
        // let params = new URLSearchParams();
        // params.append('userId',1)
        // this.getData('/api/sign_limit/list', { params })
    }
    
}
</script>

<style lang='scss' scoped>
.limitRegistrationSet{
    width: 677px;
    .tabs-data{
        & /deep/ .el-table__row{
            background: #ffffff;
            // & /deep/ .el-input__inner{
            //     border: none;
            // }
            & /deep/.el-input__prefix, .el-input__suffix{
            left: 40px;
        }
        }
        & /deep/ .el-table__row--striped{
            background: #f2f2f2;
            // opacity: 0.95;
            & /deep/ .el-input__inner{
                // border: none;
                background: #FAFAFA;;
               
            }
        }
        & /deep/ .el-icon-arrow-up:before {
            color: #000;
        }
        .ageLimit{
            width:100%;
            height: 100%;
            &>span{
                width: 40%;
                height: 100%;
                line-height: 40px;
                float: left;
                margin-left: 10px;
            }
            & /deep/ .el-input{
                width: 50%;
                float: left;
            }
        }
    }
}
</style>
