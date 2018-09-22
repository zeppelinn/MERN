import axios from 'axios';
import { Toast } from 'antd-mobile';
// 拦截请求
// 设置拦截器后，所有的请求都会被该函数拦截
axios.interceptors.request.use(config => {
    Toast.loading('加载中', 0);
    return config;
})

// 拦截响应
axios.interceptors.response.use(config => {
    Toast.hide();
    return config;
})

export const IPADDR = '192.168.1.108';