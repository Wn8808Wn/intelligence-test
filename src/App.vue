<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      
    };
  },
  methods: {
  },
   created() {
    var whdef = 100 / 1920; // 表示1920的设计图,使用100PX的默认值
    var wH = window.innerHeight; // 当前窗口的高度
    var wW = window.innerWidth; // 当前窗口的宽度
    var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
    $("html").css("font-size", rem + "px");
    // console.log(rem);
   }
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
