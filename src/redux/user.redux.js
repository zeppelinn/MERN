import axios from "axios";
import { getRedirectPath } from "../util";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

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
            return {...state, msg:'', isAuth:true, ...action.payload, redirectTo:getRedirectPath(action.payload)}
        case ERROR_MSG:
            return {...state, msg:action.error, isAuth:false}
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