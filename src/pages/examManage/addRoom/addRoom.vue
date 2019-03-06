<template>
    <div class="addroom">
        <common-top :titleTop="titleTop"></common-top>
        <div class="examRoomInfo">
            <create-number  v-if="showNum" :county='distric'  :number ='number' @sentExamName="getExamName"></create-number>
            <div class="prov">
                <span class="commontips">考生所在省份:</span>
                <el-select v-model="province" placeholder="请选择" :disabled="disabled">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
             <div class="prov unit">
                <span class="commontips">管理单位:</span>
                <el-select v-model="manageUnit" placeholder="请选择"  :disabled="disabled">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="prov invenunit">
                <span class="commontips">投资单位:</span>
                <el-select v-model="investUnit" multiple placeholder="请选择" :disabled="disabled">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>

             <div class="prov">
                <span class="commontips">市</span>
                <el-select v-model="city" placeholder="请选择"  :disabled="disabled">
                    <el-option
                    v-for="item in options4"
                    :key="item.value"
                    
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <div class="prov">
                <span class="commontips">区/县</span>
                <el-select v-model="distric" placeholder="请选择"  :disabled="disabled">
                    <el-option
                    v-for="item in options5"
                    :key="item.value"
                    
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <div class="prov address">
                <span class="commontips">详细地址:</span>
                <el-input v-model="address" placeholder="请输入地址"  :disabled="disabled"></el-input>
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
          <div style="text-align:center;width:100%;">
              <el-button type="primary" round 
                style="background:#1f91b5;
                width:145px;
                heiht:40px;
                font-size:16px;
                margin-top:38px;
              "
                @click="handleput"  
                v-if="showNum == false"
              >提交</el-button>

               <el-button type="primary" round 
                style="background:#1f91b5;
                width:145px;
                heiht:40px;
                font-size:16px;
                margin-top:38px;
              "
               v-if="showNum == true"
                @click="handlesent"
              >完成</el-button>
          </div>
    </div>
</template>

<script>
import commonTop from "../../common/common-top";
import createNumber from "./createNumber";
export default {
  components: {
    commonTop,
    createNumber
  },
  data() {
    return {
      titleTop:'新增考场',
      options1: [
        {
          value: "黑龙江省",
          label: "黑龙江省"
        },
        {
          value: "河北省",
          label: "河北省"
        },
        {
          value: "河南省",
          label: "河南省"
        }
      ],
      options2: [
        {
          value: "黑龙江省围棋协会",
          label: "黑龙江省围棋协会"
        },
        {
          value: "河北省围棋协会",
          label: "河北省围棋协会"
        },
        {
          value: "河南省围棋协会",
          label: "河南省围棋协会"
        }
      ],
      options3: [
        {
          value: "北京棋智科技有限公司",
          label: "北京棋智科技有限公司"
        },
        {
          value: "黑龙江省围棋协会",
          label: "黑龙江省围棋协会"
        },
        {
          value: "河北省围棋协会",
          label: "河北省围棋协会"
        }
      ],
      options4: [
        {
          value: "黑龙江省",
          label: "黑龙江省"
        },
        {
          value: "河北省",
          label: "河北省"
        },
        {
          value: "河南省",
          label: "河南省"
        }
      ],
      options5: [
        {
          value: "长安区",
          label: "长安区"
        },
        {
          value: "新华区",
          label: "新华区"
        },
        {
          value: "西城区",
          label: "西城区"
        }
      ],
      province: "",
      manageUnit: "",
      investUnit: "",
      city: "",
      distric: "",
      address: "",
      seatSize: "",
      spareSeatSize: "",
      showNum: false,
      disabled: false,
      number: "",
      examRoomName: ""
    };
  },
  methods: {
    handleput() {
      //所有内容填写完成时，点击【提交】（1）内容不可再编辑，（2）生成考场编号，（3）出现【完成】按钮，（4）同时隐藏【提交】按钮；
        this.showNum = true;
        this.disabled = true;
     
    },
    getExamName(res) {
      this.examRoomName = res;
      console.log(this.examRoomName)
    },
    handlesent() {      //点击【完成】  写入数据 跳转到当前模块页面
      if (this.showNum) {
        let investUnitToString = this.investUnit.join(",");
        let params = new URLSearchParams();
        params.append("province", this.province);
        params.append("manageUnit", 2); //管理单位 int类型
        params.append("investUnit", investUnitToString);
        params.append("city", this.city);
        params.append("distric", this.distric);
        params.append("address", this.address);
        params.append("seatSize", this.seatSize);
        params.append("spareSeatSize", this.spareSeatSize);
        params.append("examRoomName", this.examRoomName);
        this.$http.post("/api/room/add_room", params).then(res => {
          console.log(res);
        });
        this.$router.push({path: "/exammanage"})
      }
    },
    getProvinceList() {}
  },
  mounted() {}
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
      width: 755px;
      float: left;
      margin-right: 0px;
    }
    .invenunit {
      width: 100%;
    }
    .address {
      width: 558px;
      margin-right: 0px;
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
  background: #f8f8f8;
}
.el-input.is-disabled .el-input__inner {
  color: #000;
}
</style>
