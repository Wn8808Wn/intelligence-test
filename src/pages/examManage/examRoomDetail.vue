<template>
    <div class="addroom">
        <div class="examRoomInfo">
             <div class="prov unit">
                <span class="commontips">管理单位:</span>
                <el-input v-model="manageUnit"  :disabled="disabled">
                </el-input>
            </div>
            <div class="prov invenunit">
                <span class="commontips">投资单位:</span>
                <el-input v-model="investUnit"  :disabled="disabled"></el-input>
               
            </div>

            <div class="prov">
                <span class="commontips">考场地址:(省)</span>
                <el-input v-model="province"  :disabled="disabled"></el-input>
            </div>


             <div class="prov">
                <span class="commontips">市</span>
                <el-input v-model="city"  :disabled="disabled"> </el-input>
            </div>

            <div class="prov">
                <span class="commontips">区/县</span>
                <el-input   v-model="distric"  :disabled="disabled"></el-input>
            </div>

            <div class="prov address">
                <span class="commontips">详细地址:</span>
                <el-input v-model="address"   :disabled="disabled"></el-input>
            </div>

            <div class="prov examNamed">
                <span class="commontips">考场命名:</span>
                <el-input  v-model="examRoomName" :disabled="disabled"></el-input>
            </div>

             <div class="prov">
                <span class="commontips">考场总座位数(个)</span>
                <el-input v-model="seatSize"  :disabled="disabled"></el-input>
            </div>

 
             <div class="prov">
                <span class="commontips">备用座位数(个)</span>
                <el-input v-model="spareSeatSize"  :disabled="disabled"></el-input>
            </div>


        </div>

        <div class="createNumber">
            <p>考场编号:{{examRoomCode}}</p>
        </div>

        <div style="text-align:center;width:100%;">
              <el-button type="primary" round 
              style="background:#1f91b5;
              width:145px;
              heiht:40px;
              font-size:16px;
              margin-top:38px;
            "
              @click="handleBack"
            >完成</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            province: "",
            manageUnit: null,
            unitsList:[],
            investUnit: "",
            city: "",
            distric: "",
            address: "",
            seatSize: "",
            spareSeatSize: "",
            disabled: true,
            examRoomCode: "",
            examRoomName: "",
            comeName:''
        }
    },
    methods:{
        handleBack(){
            if(this.comeName === 'frozenRoom'){
                    this.$router.push({name:'frozenRoom'})
            }else{
                this.$router.push({name:'examManage'})
            }
        }
    },
    //记录路由决定返回那个页面
    beforeRouteEnter(to,from,next){
        next( (vm) =>{
            vm.comeName = from.name;
        });
    },
    created(){
        let  currentId = this.$route.query.id
        console.log(currentId)
        let params = new URLSearchParams();
        params.append('userId',1)
        params.append('id',currentId);
        this.$http.get('/api/room/room_detail',{params}).then( res => {
            // console.log(res.data.data.unitsList)
            this.unitsList = res.data.data.unitsList;
            let rst = res.data.data.list[0]
            this.province = rst.province
            this.manageUnit = this.unitsList.filter(item => item.id === rst.manageUnit)[0].unitName;
            let investUnitArr = rst.investUnit.split(',');
            investUnitArr.map( (e,index) =>{
                investUnitArr.splice(index,1,this.unitsList.filter(item => item.id == e)[0].unitName)
            })
            this.investUnit = investUnitArr.join(',')
            this.city=rst.city
            this.distric=rst.distric
            this.address=rst.address
            this.seatSize= rst.seatSize
            this.spareSeatSize= rst.spareSeatSize
            this.examRoomCode= rst.examRoomCode
            this.examRoomName=rst.examRoomName
            })
    }
}
</script>

<style rel='stylesheet/scss' lang="scss"  scoped>
.el-tab-pane {
  background: #f0f0f0;
}
.addroom {
  width: 952px;
  min-height: 858px;
  padding: 40px 50px 40px 40px;
  background: #ffffff;
  .examRoomInfo {
    padding-top: 20px;
    padding-left: 3px;
    width: 952px;
    overflow: hidden;
    padding-bottom: 39px;
    border-bottom: 1px solid #acacac;
    .prov {
      width: 167px;
      height: 100px;
      float: left;
      margin-right: 30px;
      .commontips {
        width: 167px;
        height: 17px;
        display: block;
        height: 15px;
        color: #a3a3a3;
        padding-top: 27px;
        padding-bottom: 11px;
        padding-left: 7px;
      }
    }
    .unit {
      width: 100%;
      float: left;
      margin-right: 0px;
    }
    .invenunit {
      width: 100%;
    }
    .address {
      width: 360px;
      margin-right: 0px;
    }
    .examNamed{
      width: 364px;
      margin-right: 400px;
    }
  }
  .el-select {
    width: 100%;
    background: #f8f8f8;
    border-color: #cccccc;
    border-radius: 4px;
    color: #000;
  }
}
.el-select-dropdown__item {
  font-size: 16px;
  color: #000;
}
.el-tag {
  font-size: 16px;
  color: #000;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #000;
  font-weight: 400;
}
.el-input__inner {
  padding: 0;
  padding-left: 10px;
  color: #000;
  height: 45px !important;
  font-size: 16px;
//   background-color: #f8f8f8;
}
.el-input.is-disabled .el-input__inner {
  color: #000;
}
.createNumber {
  margin-top: 30px;
  width: 100%;
  height: 80px;
  text-align: center;
  & > p {
    width: 100%;
    height: 75px;
    line-height: 75px;
    font-size: 16px;
    color: #000;
  }
}
</style>




