<template>
    <div class="loadingPage" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:true,
        }
    },
    beforeRouteEnter(to,from,next){
    console.log(to,'to')
    let userInfo = to.query   // 打包前解开注释
    // let params={
    //     appid:userInfo.appid,
    //     loginName:userInfo.loginName,
    //     userId:userInfo.userId,
    //     unitId:userInfo.unitId,
    //     menu:userInfo.menu,
    //     permission:userInfo.permission
    // }
    // //打包前加上注释
    // let userInfo = {
    //     appid: "weiqi_service_platform",
    //     loginName: "管理员",
    //     menu: "hall,standard,plan,order,status,paper,message",
    //     permission: "hall:add,hall:list,hall:detail,hall:freeze,hall:resume,hall:freezeList,hall:freezeDetail,standard:add,standard:list,standard:update,standard:detail,standard:tempList,standard:tempAdd,standard:tempUpdate,standard:tempDetail,plan:add,plan:list,plan:update,plan:detail,plan:limitList,order:list,order:detail,status:list,status:export,paper:list,paper:detail,paper:send,paper:tempDetail,message:tempList,message:tempAdd,message:tempUpdate",
    //     unitId: "admin",
    //     userId: "admin",
    // }
    // let singleArr = userInfo.permission.split(',')
    // console.log(singleArr,'singleArr')

    let params = new URLSearchParams();
    params.append('appid',userInfo.appid)
    params.append('loginName',userInfo.loginName)
    params.append('userId',userInfo.userId)
    params.append('unitId',userInfo.unitId)
    params.append('menu',userInfo.menu.split(','))
    params.append('permission',userInfo.permission)
    //   console.log(params,'params')
      next( vm =>{
          vm.$http.post('/api/loginByPlatform',params).then( res =>{
              if( res.data.code == 0){
                  console.log(res.data,'00')
                  sessionStorage.setItem("dsToken",res.data.data.token)
                  console.log(sessionStorage.getItem("dsToken"),'token')
                   //把用户信息储存到vux中  
                  vm.$store.dispatch('saveUserInfo',userInfo)
                  vm.loading = false;
                  vm.$router.push({name:'manage'})
              }
          })
      })
  }
}
</script>

<style>
.loadingPage{
    width: 100%;
    height: 100%;
}
</style>
