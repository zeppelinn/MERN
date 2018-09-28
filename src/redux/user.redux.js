import axios from "axios";
import { getRedirectPath } from "../util";

const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOG_OUT = 'LOG_OUT';

const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    pwd:'',
    type:'',
}

export const user = (state = initState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, msg:'', ...action.payload, redirectTo:getRedirectPath(action.payload)};
        case ERROR_MSG:
            return {...state, msg:action.error,};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case LOG_OUT:
            return {...initState, redirectTo:'/login'}
        default:
            return state;
    }
}

const authSuccess = (obj) => {
    const {pwd, ...data} = obj
    return {type:AUTH_SUCCESS, payload:data};
}

const errorMsg = (error) => {
    return {error, type:ERROR_MSG};
}

export const loadData = (userInfo) => {
    return {type:LOAD_DATA, payload:userInfo}
}

export const handleLogout = () => {
    return {type:LOG_OUT}
}

export const register = ({user, pwd, repeatPwd, type}) => {
    if(!user || ! pwd || !type) return errorMsg('用户名或密码不合法')
    if(repeatPwd !== pwd) return errorMsg('密码不一致，请重新输入密码')

    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(authSuccess({user, pwd, type, _id:res.data.data._id}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export const login = ({user, pwd}) => {
    if(!user || !pwd) return errorMsg('请输入用户名或密码')
    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

export const updateBossInfo = (data) => {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}