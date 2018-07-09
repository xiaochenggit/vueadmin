/* eslint-disable */
import axios from 'axios'// 引入axios
import { Message, MessageBox } from 'element-ui'

// 创建axios实例
const axiosReqest = axios.create({
    baseURL: '/admin',
    timeout: 5000// 超时时间
})

// request拦截器；
// axiosReqest.interceptors.request.use(config => {
    
//     // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//     if (store.getters.hadLogin) { // 登陆与否

//     }
//     return config
// }, error => {
    
//     Promose.reject(error)
// })

// response拦截器；
axiosReqest.interceptors.response.use(
    response => {
        var res = response.data
        if (res.success == true || true) { // 请求数据成功
            // this.$router.push({ path: '/' });
            return res
        } else if (res.type == 'error') {
            if (data.extra != null && typeof data.extra.key !== 'undefined' && data.extra.key == 'REDIRECT_LONGIN_PAGE') {
                this.$router.push({ path: '/login' })
            } else {
                if (data.content != null) {
                    Message({
                        message: data.content,
                        type: 'error',
                        duration: 3 * 1000
                    })
                }
                return Promise.reject('error')
            }
        } else {
            Message({
                message: '系统繁忙请稍后再试',
                type: 'error',
                duration: 3 * 1000
            })
            return Promise.reject('error')
        }
    }
)

export default axiosReqest
