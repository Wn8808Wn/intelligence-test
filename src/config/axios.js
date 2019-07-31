/**
 * http配置
 */
import axios from 'axios'
import router from '../router/index.js';
import { Message } from 'element-ui'
//超时时间
axios.defaults.timeout = 30000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
let msg;
//HTTPrequest拦截
axios.interceptors.request.use(config => {
    if (sessionStorage.getItem('dsToken')) {
		config.headers['Authorization'] = sessionStorage.getItem('dsToken') 
    }
	return config
}, error => {
	return Promise.reject(error)
})
//HTTPresponse拦截
axios.interceptors.response.use( response => {

    if(response.data.data === 401){
        console.log('token过期啦')
        //重定向到登录页面
        router.replace('/');
    }
	return response
}, error => {
	Message({
		message:'请求错误,请稍后重试',
		type: 'error'
	});
	return Promise.reject(new Error(error));

})
export default axios;
