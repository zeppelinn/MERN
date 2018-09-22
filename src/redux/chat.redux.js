import io from 'socket.io-client';
import axios from 'axios';
import {IPADDR} from '../config'

const socket =  io(`ws://${IPADDR}:9093`);
// 获取聊天信息列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';

const initState =  {
    chatmsg:[],
    unread:0,
}

export const chat = (state=initState, action) => {
    switch (action.type) {
        case MSG_LIST:
            return {...state, chatmsg:action.payload, unread:action.payload.filter(v => !v.read).length}
        case MSG_RECV:
            
            break;
        case MSG_READ:
            
            break;
        default:
            return state;
    }
}

const msgList = (data) => {
    return {type:MSG_LIST, payload:data};
}

export const getMsgList = () => {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(msgList(res.data.msgs))
                }
            })
    }
}