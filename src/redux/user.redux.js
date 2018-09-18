import axios from "axios";
import { getRedirectPath } from "../util";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LONGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const CLEAN_STATE = 'CLEAN_STATE';

const initState = {
    redirectTo:'',
    isAuth:false,
    msg:'',
    user:'',
    pwd:'',
    type:'',
}

export const user = (state = initState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg:'', isAuth:true, ...action.payload, redirectTo:getRedirectPath(action.payload)};
        case ERROR_MSG:
            return {...state, msg:action.error, isAuth:false};
        case LONGIN_SUCCESS:
            return {...state, isAuth:true, ...action.payload, msg:'', redirectTo:getRedirectPath(action.payload)};
        case CLEAN_STATE:
            return {...initState};
        default:
            return state;
    }
}

const errorMsg = (error) => {
    return {error, type:ERROR_MSG};
}

const regitserSuccess = (data) => {
    return {type:REGISTER_SUCCESS, payload:data};
}

const loginSuccess = (data) => {
    return {type:LONGIN_SUCCESS, payload:data};
}

export const cleanState = () => {
    return {type:CLEAN_STATE};
}

export const register = ({user, pwd, repeatPwd, type}) => {
    if(!user || ! pwd || !type) return errorMsg('用户名或密码不合法')
    if(repeatPwd !== pwd) return errorMsg('密码不一致，请重新输入密码')

    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(regitserSuccess({user, pwd, type}))
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
                    dispatch(loginSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}