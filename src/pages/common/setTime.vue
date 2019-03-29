<template>
    <div class="setTimeCompotents">
        <span>{{curIndex+1}}</span>
        <el-time-picker
            v-model="startExamTime"
            format="HH 时 mm 分"
            :picker-options="{
            selectableRange: '8:00:00 - 18:00:00'
            }"
            placeholder="设置开始时间">
        </el-time-picker>

        <el-time-picker
            format="HH 时 mm 分"
            :disabled='disabled'
            v-model="endExamTime"
            placeholder="考试结束时间">
        </el-time-picker>
        <i class="el-icon-error" @click="delCurTime" style="cursor:pointer"></i>
    </div>
</template>

<script>
export default {
    props:['examLev','curIndex','item'],
    data(){
        return{
            disabled: false,
            startExamTime: "",
        }
    },
    computed: {
        endExamTime() {
        if (this.startExamTime) {
            var date = new Date(this.startExamTime);
            return date.setMinutes(date.getMinutes() + this.examLev);
        } else {
            this.disabled = true;
            return;
        }
    }
    },
    methods:{
        delCurTime(){
            this.$emit('delCurTimeEmitter',this.curIndex)
        },
    },
}
</script>

<style lang='scss' scoped>
.setTimeCompotents{
    margin-bottom: 10px;
    &>span{
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
    & /deep/ .el-input.is-disabled .el-input__inner{
        background-color:#ffffff;
        color: #000;
    }
    &>i{
        margin-left: 10px;
        font-size: 18px;
        color: #1f91b5;
        vertical-align: middle;
    }
}
</style>
