import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import Qs from 'qs'

//是否提示 请求返回状态码非200时的 错误信息
let errorMessage = true

// 创建axio实例
const service = axios.create({
    baseURL: process.env.BASE_API, //api的base_url
    timeout: 10000 //请求超时时间
})

//request拦截器
service.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        // 设置token
        try {
            if(store.getters.userInfo.token) {
                config.data.token = store.getters.userInfo.token
            }
        } catch (err) {}

         // 设置当前请求是否是错误提示
         try {
            errorMessage = config.setting.errorMessage
        } catch (err) {
            errorMessage = true
        }
        //设置请求参数
        config.data = Qs.stringify(config.data)
        return config

    },
    error => {
        // Do something with requset error
        Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        //code为非200时报错 可以结合自己业务进行修改
        const res = response.data
        if (res.code !== 200) {
            if(res.code === 1002 || res.code === 1003){
                Message({
                    message:res.msg || '网络错误,请稍后从事',
                    type:'error',
                    duration:5000
                }).then( () => {
                    store.dispatch('logOut').then( () => {
                        window.location.href = process.env.API_HOST //回头登录页面
                    })
                }).catch( () => {})
            }else if( res.code === 1111 || res.code === 2222){

            }else if( errorMessage ) {
                // 提示错误信息
                Message( { 
                    message:'res.msg' || '网络错误',
                    type:'error',
                    duration:5000
                })
            }
            
            return Promise.reject(response.data)
        }else {
            return response.data
        }
    },
    error => {
        Message( { 
            message:'res.msg' || '网络错误',
            type:'error',
            duration:5000
        })
        return Promise.reject(error)
    }
)