<template>
    <div class="addroom">
        <commonTop :titleTop="titleTop"></commonTop>
        <div class="examRoomInfo">
            <div class="prov unit">
                <span class="commontips">管理单位:</span>
                <el-select v-model="manageUnit" placeholder="请选择"  :disabled="disabled">
                    <el-option
                    v-for="item in manageUnitList"
                    :key="item.id"
                    :label="item.unitName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <div class="prov invenunit">
                <span class="commontips">投资单位:</span>
                <el-select v-model="investUnit" multiple  placeholder="请选择" :disabled="disabled">
                    <el-option
                    v-for="item in investUnitList"
                    :key="item.id"
                    :label="item.unitName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <div class="prov">
                <span class="commontips">考场地址:(省)</span>
                <el-select v-model="province" placeholder="请选择" :disabled="disabled" @change="selectProvince">
                    <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <div class="prov">
                <span class="commontips">市</span>
                <el-select v-model="city" placeholder="请选择"  :disabled="disabled" @change="selectCity">
                    <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <div class="prov">
                <span class="commontips">区/县</span>
                <el-select v-model="distric" placeholder="请选择"  :disabled="disabled" @change="selectDistric" >
                    <el-option
                    v-for="item in districList"
                    :key="item.id"
                    :label="item.areaName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <div class="prov address">
                <span class="commontips">详细地址:</span>
                <el-input v-model="address" placeholder="请输入地址"  :disabled="disabled"></el-input>
            </div>

            <div class="prov examNamed">
                <span class="commontips">考场命名:</span>
                <el-input  v-model="examRoomName" :disabled="disabled"></el-input>
            </div>

            <div class="prov">
                <span class="commontips">考场总座位数(个)</span>
                <el-input v-model.number="seatSize"  :disabled="disabled"></el-input>
            </div>
 
            <div class="prov">
                <span class="commontips">备用座位数(个)</span>
                <el-input v-model.number="spareSeatSize"  :disabled="disabled"></el-input>
            </div>
        </div>

        <div class="createNumber" v-if="showNum == true">
          <p>考场编号:{{number}}</p>
        </div>

        <div style="text-align:center;width:100%;">
            <el-button type="primary" round 
                style="background:#1f91b5;
                width:145px;
                heiht:40px;
                font-size:16px;
                margin-top:38px;"
                @click="handleput"  
                v-if="showNum == false"
              >提交</el-button>

              <el-button type="primary" round 
                style="background:#1f91b5;
                width:145px;
                heiht:40px;
                font-size:16px;
                margin-top:38px;"
               v-if="showNum == true"
                @click="handlesent"
              >完成</el-button>
        </div>
    </div>
</template>

<script>
import commonTop from "../common/commonTop";
export default {
  components: {
    commonTop
  },
  data() {
    return {
      titleTop: "新增考场",
      manageUnitList: [],
      investUnitList: [],
      cityList: [],
      provinceList: [],
      districList: [],
      province: "",
      manageUnit: "",
      investUnit: [],
      city: "",
      distric: "",
      address: "",
      seatSize: "",
      spareSeatSize: "",
      showNum: false,
      disabled: false,
      number: "",
      examRoomName: "",
      a:'',
      b:'',
      c:'',
      d:'',
      e:'',
      f:'',
      g:'',
      h:'',
      j:''
    };
  },
  methods: {
    handleput() {
        let params = new URLSearchParams();
        if(this.manageUnit){
            this.a = true;
            params.append("manageUnit",this.manageUnit); 
        }else{
            this.a =false;
        }
        if(this.investUnit){
            this.b = true;
            params.append("investUnit", this.investUnit.join(","));
        }else{
            this.b = false;
        }
        if(this.province){
            this.c = true;
            let provinceName = this.provinceList.filter( e => e.id === this.province)[0].areaName
            params.append("province", provinceName);
            params.append("provinceCode", this.province);
        }else{
            this.c = false;
        }
        if(this.city){
            this.d = true;
            let cityName = this.cityList.filter( e => e.id === this.city)[0].areaName
            params.append("city", cityName);
            params.append("cityCode", this.city);
        }else{
            this.d = false;
        }
        if(this.distric){
            this.e = true;
            let districName = this.districList.filter( e => e.id === this.distric)[0].areaName
            params.append("distric", districName);
            params.append("districCode", this.distric);
        }else{
            this.e = false;
        }
        if(this.address){
            this.f = true;
            params.append("address", this.address);
        }else{
            this.f = false;
        }
        if(this.seatSize){
            this.g = true;
            params.append("seatSize", this.seatSize);
        }else{
            this.g = false;
        }
        if(this.spareSeatSize){
            this.h = true;
            params.append("spareSeatSize", this.spareSeatSize);
        }else{
            this.h = false;
        }
        if(this.examRoomName){
            this.j = true;
            params.append("examRoomName", this.examRoomName);
        }else{
            this.j = false;
        }
      //所有内容填写完成时，点击【提交】（1）内容不可再编辑，（2）生成考场编号，（3）出现【完成】按钮，（4）同时隐藏【提交】按钮；
      if( this.a && this.b && this.c && this.d  && this.e && this.f && this.g && this.h&&this.j){
          this.showNum = true;
          this.disabled = true;
          this.$http.post("/api/room/add_room", params).then(res => {
              if(res.data.code === 0){
                console.log(res.data.data)
                this.number = res.data.data;
              }
          });
      }else{
          this.$message.error('需要完善全部数据后才可以点击提交')
      }
    },
    handlesent() {
        this.$router.push({name:'examManage'})
    },
    selectProvince(val){
        this.city = '';
        this.distric = '';
        let params = new URLSearchParams();
        params.append('parentId',val)
        this.$http.get('/api/area/get_area_by_parentid',{params}).then( res =>{
            if(res.data.code === 0){
               this.cityList = res.data.data.areaList;
            }
        })
    },
    selectCity(val){
        this.distric = '';
        let params = new URLSearchParams();
        params.append('parentId',val)
        this.$http.get('/api/area/get_area_by_parentid',{params}).then( res =>{
            if(res.data.code === 0){
               this.districList = res.data.data.areaList;
            }
        })
    },
    selectDistric(val){
        this.examRoomName = this.districList.filter( item => item.id === val)[0].areaName+'考场';
    }
  },
  created(){
        let params = new URLSearchParams();
        params.append('unitType',1) //后台固定传1
        this.$http.get('/api/units/list',{params}).then( res => {
          if ( res.data.code === 0 ) {
              this.manageUnitList = res.data.data;
              this.investUnitList = res.data.data;
          }
        })
        this.$http.get('/api/area/get_area_by_parentid?parentId=100000').then( res => {
          if(res.data.code === 0){
              // console.log(res.data.data)
              this.provinceList = res.data.data.areaList;
          }
        })
  }
};
</script>

<style rel='stylesheet/scss' lang="scss"  scoped>
.el-tab-pane {
  background: #f0f0f0;
}
.addroom {
  width: 952px;
  height: 880px;
  padding: 0 50px 0 40px;
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
      & /deep/ .el-input__inner {
      background-color:#f8f8f8;
    }

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
      & /deep/ .el-tag.el-tag--info .el-tag__close{
          color: #ffffff;
      }
    }
    .address {
      width: 360px;
      margin-right: 0px;
    }
    .examNamed {
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
    & /deep/ .el-tag__close.el-icon-close{
        background-color: #1f91b5;
    }
    & /deep/ .el-input__inner {
      padding: 0;
      padding-left: 10px;
      color: #000;
      height: 45px !important;
      font-size: 16px;
      background-color:#f8f8f8;
    }
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

.el-input.is-disabled .el-input__inner {
  color: #000;
}
.createNumber {
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
