<template>
    <div class="setTimeCompotents">
        <span>{{curIndex+1}}</span>
        <el-time-picker
            v-model="startExamTime"
            format="HH 时 mm 分"
            @blur= "blurEvent"
            :picker-options="{
            selectableRange: '8:00:00 - 18:00:00'
            }"
            placeholder="设置开始时间">
        </el-time-picker>

        <el-time-picker
            format="HH 时 mm 分"
            disabled
            v-model="endExamTime"
            placeholder="考试结束时间">
        </el-time-picker>
        <i class="el-icon-error" @click="delCurTime" style="cursor:pointer"></i>
    </div>
</template>

<script>
export default {
  props: ["examLev", "curIndex"],
  data() {
    return {
      startExamTime:"",
    };
  },
  computed: {
    endExamTime() {
      if (this.startExamTime) {
        var date = new Date(this.startExamTime);
        switch(this.examLev){
          case 1:{
            return date.setMinutes(date.getMinutes() + 45);
          }
          case 2:{
            return date.setMinutes(date.getMinutes() + 60);
          }
          case 3:{
            return date.setMinutes(date.getMinutes() + 90);
          }
        }
        
      } else {
        return
      }
    }
  },
  methods: {
      formatFn(val){ 
        var now = new Date(val);
        var hh = now.getHours();         //时
        var ii = now.getMinutes();       //分
        var clock = "";
        if(hh < 10) clock += "0";
        clock += hh + ":";
        if (ii < 10) clock += '0'; 
        clock += ii;
        return clock;
     },
    delCurTime() {
      this.$emit("delCurTimeEmitter", this.curIndex);
    },
    blurEvent(){
      //先将时间戳转为Date对象，然后才能使用Date的方法
      let obj = {"startTime" :this.formatFn(this.startExamTime), "endTime":this.formatFn(this.endExamTime)};
      this.$emit("addData",obj)
      // console.log(obj)
    }
  }
};
</script>

<style lang='scss' scoped>
.setTimeCompotents {
  margin-bottom: 10px;
  & > span {
    display: inline-block;
    height: 38px;
    background: #1f91b5;
    width: 20px;
    text-align: center;
    line-height: 38px;
    border: 1px solid #dcdfe6;
    vertical-align: middle;
    border-radius: 2px;
    margin-right: -6px;
  }
  & /deep/ .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
    color: #000;
  }
  & > i {
    margin-left: 10px;
    font-size: 18px;
    color: #1f91b5;
    vertical-align: middle;
  }
}
</style>
