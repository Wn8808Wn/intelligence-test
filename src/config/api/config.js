export default {
    url: '',
    method: '',
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL: '',
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
    transformRequest: [
      data => data
    ],
    transformResponse: [],
    // 请求头在这里配置
    // headers: { 'Content-Type': 'application/json' },
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    params:{},
    data: {},
    timeout: 2000,   // 指定请求超时的毫秒数(0 表示无超时时间)  如果请求话费了超过 `timeout` 的时间，请求将被中断
    withCredentials: false, // default 表示跨域请求时是否需要使用凭证
    responseType: 'json', // default
    maxContentLength: 2000,   //定义允许的响应内容的最大尺寸
    validateStatus: function (status) { // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  
      // default
      return status >= 200 && status < 300
    },
    maxRedirects: 5// default   //定义在 node.js 中 follow 的最大重定向数目
  
  //  'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  //这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  //   proxy: {
  //     host: 'http://192.168.1.88',
  //     port: 8090,
  //     auth: {
  //       username: 'mikeymike',
  //       password: 'rapunz3l'
  //     }
  // }
}