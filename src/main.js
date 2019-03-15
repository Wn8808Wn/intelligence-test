// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入解决ES6语法的兼容问题
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'


//引入css
import './styles/reset.css'


//引入 elementUI库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  "./styles/commonStyle.scss"


// ajax
// import http from './config/api'

import store from './store/index'

import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

import getTimeStyle from './utils/public'

Vue.prototype.getTimeStyle = getTimeStyle

Vue.use(ElementUI);

// Vue.use(http)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
