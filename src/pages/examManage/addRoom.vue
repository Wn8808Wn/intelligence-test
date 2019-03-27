<template>
    <div class="addroom">
        <common-top-item :titleTop="titleTop"></common-top-item>
        <div class="examRoomInfo">
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
                <el-select v-model="investUnit" multiple  placeholder="请选择" :disabled="disabled">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <div class="prov">
                <span class="commontips">考场地址:(省)</span>
                <el-select v-model="province" placeholder="请选择" :disabled="disabled">
                    <el-option
                    v-for="item in options1"
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
                <el-select v-model="distric" placeholder="请选择"  :disabled="disabled" 
                @change = changeDistric>
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
    "common-top-item": commonTop
  },
  props: ["SHOWTYPE"],
  data() {
    return {
      titleTop: "新增考场",
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
      investUnit: [],
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
    changeDistric(value) {
      this.examRoomName = value + "考场";
    },
    handleput() {
      //所有内容填写完成时，点击【提交】（1）内容不可再编辑，（2）生成考场编号，（3）出现【完成】按钮，（4）同时隐藏【提交】按钮；
      this.showNum = true;
      this.disabled = true;
      if (this.showNum) {
        let params = new URLSearchParams();
        params.append("province", this.province);
        params.append("manageUnit", 2); //管理单位 int类型
        params.append("investUnit", this.investUnit.join(","));
        params.append("city", this.city);
        params.append("distric", this.distric);
        params.append("address", this.address);
        params.append("seatSize", this.seatSize);
        params.append("spareSeatSize", this.spareSeatSize);
        params.append("examRoomName", this.examRoomName);
        this.$http.post("/api/room/add_room", params).then(res => {
          if(res){
            this.number = res.data.data;
          }
        });
      }
    },
    handlesent() {
      this.$router.go(0)
      // this.$emit("showDiffPage",this.SHOWTYPE.LIST);
    },
    getProvinceList() {

    },
    
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
