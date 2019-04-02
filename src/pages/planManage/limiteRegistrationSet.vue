<template>
    <div class="limitRegistrationSet">
        <div class="top">
            <el-select  v-model="manageUnit" placeholder="全部管理单位" @change="changeSearch">
                <el-option
                v-for="item in unitsList"
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
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
            total:5,
            limitLevel:'',
            tableData:[
                {   
                    id:1,
                    manageUnit:1,
                    limitLevel:15,
                    limitAge:18
                },
                {   
                    id:2,
                    manageUnit:1,
                    limitLevel:15,
                    limitAge:20
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
        getData( url, params){
            this.$http.get(url, params).then(res => {
            console.log(res)
            if(res.status == 200 && res.data.code == 1){
                this.tableData = [];
                this.total = res.data.data.total;
                this.totalPage = res.data.data.totalPage;
                this.pageSize = res.data.data.pageSize;
                this.currentPage = res.data.data.page;
                console.log(res.data.data.rows)
                var rst = res.data.data.rows;

            }else{
                console.log(res.data.msg)
            }
            // if (rst) {
            // this.tableData = rst;
            // this.tableData.forEach((item, index) => {
            //     item.createdTime = this.getTimeStyle(item.createdTime);
            // });
            // } else {
            // console.log("err");
            // }
            });
        },
        changeSearch(val){
            console.log(val)
            let params = new URLSearchParams();
            params.append('manageUnit',val)
            // this.getData('/api/sign_limit/list', { params })
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
        let params = new URLSearchParams();
        params.append('userId',1)
        this.getData('/api/sign_limit/list', { params })
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
