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
    users:{},
}

export const chat = (state=initState, action) => {
    switch (action.type) {
        case MSG_LIST:
            return {...state, users: action.payload.users, chatmsg:action.payload.data, unread:action.payload.data.filter(v => !v.read).length}
        case MSG_RECV:
            return {...state, chatmsg:[...state.chatmsg, action.payload], unread:state.unread+1}
        case MSG_READ:
            
            break;
        default:
            return state;
    }
}

const msgList = (data, users) => {
    return {type:MSG_LIST, payload:{data, users}};
}

const msgRecv = (data) => {
    return {type:MSG_RECV, payload:data};
} 

export const receiveMsg = () => {
    return dispatch => {
        socket.on('recvmsg', (data) => {
            console.log('receive msg----->', data);
            dispatch(msgRecv(data));
        })
    }
}

export const getMsgList = () => {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(msgList(res.data.msgs, res.data.users))
                }
            })
    }
}

export const sendMsg = ({from, to, msg}) => {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg});
    }
}