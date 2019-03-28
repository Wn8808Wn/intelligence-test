<template>
    <div class="limitRegistrationSet">
        <div class="top">
            <el-select  v-model="manageUnit" placeholder="全部管理单位" @change="changeSearch">
                <el-option
                v-for="item in manageUnits"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
                prop="sequence"
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
                    <el-select v-model="scope.row.NolimitLev">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                </el-table-column >

                <el-table-column
                prop="ageRequirement"
                label="不限报年龄"
                width="130">
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
            manageUnits:[],
            total:5,
            NolimitLev:'',
            tableData:[
                {
                    sequence:'1',
                    manageUnit:'黑龙江围棋协会',
                    NolimitLev:'25级',
                    ageRequirement:'18岁以上'
                },
                {
                    sequence:'2',
                    manageUnit:'黑龙江围棋协会',
                    NolimitLev:'25级',
                    ageRequirement:'18岁以上'
                },
                {
                    sequence:'3',
                    manageUnit:'黑龙江围棋协会',
                    NolimitLev:'25级',
                    ageRequirement:'18岁以上'
                },
                {
                    sequence:'4',
                    manageUnit:'黑龙江围棋协会',
                    NolimitLev:'25级',
                    ageRequirement:'18岁以上'
                },
                {
                    sequence:'5',
                    manageUnit:'黑龙江围棋协会',
                    NolimitLev:'25级',
                    ageRequirement:'18岁以上'
                }
            ],
            options:[
                {
                    value:'25',
                    label:'25级'
                },
                {
                    value:'20',
                    label:'20级'
                },
                {
                    value:'15',
                    label:'15级'
                },
                {
                    value:'10',
                    label:'10级'
                },
            ]
        }
    },
    methods:{
        changeSearch(){

        },
    }
    
}
</script>

<style lang='scss' scoped>
.limitRegistrationSet{
    width: 677px;
    .tabs-data{
        & /deep/ .el-table__row{
            background: #ffffff;
            & /deep/ .el-input__inner{
                border: none;
            }
            & /deep/.el-input__prefix, .el-input__suffix{
            left: 40px;
        }
        }
        & /deep/ .el-table__row--striped{
            background: #f2f2f2;
            // opacity: 0.95;
            & /deep/ .el-input__inner{
                border: none;
                background: #FAFAFA;;
               
            }
        }
        & /deep/ .el-icon-arrow-up:before {
            color: #000;
        }
    }
}
</style>
