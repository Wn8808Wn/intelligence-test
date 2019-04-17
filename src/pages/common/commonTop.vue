<template>
    <div class="common">
        <p>{{titleTop}}</p>

        <div class="right">
            <i class="iconfont icon-fanhui"></i> 
            <span @click="handleBack" style="cursor:pointer">返回</span>   
        </div>
    </div>
</template>

<script>
export default {
    props:{titleTop:String},
    data(){
        return{
        }
    },
    methods:{
        handleBack(){
           if(this.$route.path == "/orderManage"){
                this.$router.go(0)
           }else if(this.$route.path == "/examManage"){
                this.$router.go(0)
           }else if(this.$route.path == "/planManage"){
                this.$router.go(0)
           }else if(this.$route.path == "/orderManage"){
                this.$router.go(0)
           }else if(this.$route.path == "/ticketManage"){
                this.$router.go(0)
           }
           else{
               this.$router.go(-1)
           }
        }
    }
   
}
</script>

<style scoped>
.common{
    width: 100%;
    height: 69px;
    border-bottom: 1px solid #acacac;
    /* background: salmon; */
}
.common>p{
    font-size: 16px;
    padding-top: 42px;
    padding-bottom: 11px;
    color: #000;
    float: left;
    margin-left: 4px;
    
}
.right{
    float: right;
    font-size: 16px;
    color: #1f91b5;
    margin-right: 10px;
    padding-top: 42px;
    padding-bottom: 11px;

}

.right>i{
    margin-right: 10px;
}
</style>
