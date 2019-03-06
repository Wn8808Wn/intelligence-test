<template>
    <div class="createNumberTop">
        <p>考场编号:{{number}}</p>
        <div id="examNamed">
            <input type="text"  v-model="county" :disabled="disabled" v-on:blur="resetExamName">
            <p>考场命名:</p>
            <i class="el-icon-edit-outline" @click="modifyExamName"></i>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: true,
      name:''
    };
  },
  props: {county:String, number:String},
  methods: {
    modifyExamName() {
      alert(111)
      this.disabled = !this.disabled;
    },
    resetExamName(){
      alert('修改名字了')
      this.$emit("sentExamName",this.name)
    }
    
  }
};
</script>

<style rel='stylesheet/scss' lang="scss">
.createNumberTop{
  width: 952px;
  height: 175px;
  text-align: center;
  & > p {
    width: 100%;
    height: 75px;
    line-height: 75px;
    font-size: 16px;
    color: #000;
  }
  #examNamed {
    width: 376px;
    height: 43px;
    margin: 0 auto;
    position: relative;
    &>input {
      width: 285px;
      height: 43px;
      font-size: 16px;
      color: #000;
      position: absolute;
      left: 0;
      top: 0;
      border: 1px solid #cccccc;
      background: #f8f8f8;
      padding-left: 90px;
      border-radius: 4px;
    }
    & > p {
      position: absolute;
      font-size: 16px;
      color: #000;
      top: 16px;
      left: 10px;
    }
    & > i {
      position: absolute;
      right: 13px;
      top: 14px;
      font-size: 24px;
      color: #1f91b5;
      cursor: pointer;
    }
  }
}
</style>
