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
    let userInfo = to.query
    // let params={
    //     appid:userInfo.appid,
    //     loginName:userInfo.loginName,
    //     userId:userInfo.userId,
    //     unitId:userInfo.unitId,
    //     menu:userInfo.menu,
    //     permission:userInfo.permission
    // }
    let params = new URLSearchParams();
    params.append('appid',userInfo.appid)
    params.append('loginName',userInfo.loginName)
    params.append('userId',userInfo.userId)
    params.append('unitId',userInfo.unitId)
    params.append('menu',userInfo.menu)
    params.append('permission',userInfo.permission)
    //   console.log(params,'params')
      next( vm =>{
          vm.$http.post('/api/loginByPlatform',params).then( res =>{
              if( res.data.code == 0){
                  console.log(res.data,'00')
                  sessionStorage.setItem("dsToken",res.data.data.token)
                  console.log(sessionStorage.getItem("dsToken"),'token')
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
