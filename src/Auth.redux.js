import axios from 'axios';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const USERDATA = 'USERDATA';

const initState = {
    isAuth:false,
    user:'',
    age:0
}

export const auth = (state=initState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth:true}
        case LOGOUT:
            return {...state, isAuth:false}
        case USERDATA:
            console.log("payload ===> ", action.payload);
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const fetchUser = () => {
    return dispatch => {
        axios.get('/data')
            .then(res => {
                console.log(res.data);
                if(res.status === 200)
                    dispatch(getUserData(res.data));
            })
    }
}

export const getUserData = (data) => {
    return {type:USERDATA, payload:data}
}

export const login = () => {
    return {type:LOGIN}
}

export const logout = () => {
    return {type:LOGOUT}
}