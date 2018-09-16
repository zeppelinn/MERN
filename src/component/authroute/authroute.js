import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
// 使用withRouter标记之后，可以获取到this.props.history对象，以及其中的方法(go, goBack, goForward...)
@withRouter

export default class AuthRoute extends React.Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1){
            // 获取当前路由，如果当前已经是登录页或者注册页，则直接返回
            // 如果不是则获取用户信息并校验
            return null;
        }
        // 获取用户信息
        axios.get('/user/info')
            .then(result => {
                if(result.status === 200){
                    // 登录成功
                }else{
                    // 登录失败,则跳转到登录页
                    this.props.history.push('/login');
                }
            })
            .catch(err => {

            })
    }

    render(){
        return null;
    }
}