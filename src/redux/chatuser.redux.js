import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initState = {
    userList:[],
}

export const chatTarget = (state = initState, action) => {
    switch (action.type) {
        case USER_LIST:
            return {...state, userList:action.payload};
        default:
            return state;        
    }
}

const userList = (data) => {
    return {type:USER_LIST, payload:data};
}

export const getUserList = (type) => {
    return dispatch => {
        axios.get(`/user/list?type=${type}`)
            .then(res => {
                dispatch(userList(res.data))
            })
    }
}