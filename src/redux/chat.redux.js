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
            return {...state, users: action.payload.users, chatmsg:action.payload.data, unread:action.payload.data.filter(v => !v.read && v.to === action.payload.userid).length}
        case MSG_RECV:
            const unread = action.payload.to === action.userid ? 1 : 0
            return {...state, chatmsg:[...state.chatmsg, action.payload], unread:state.unread + unread}
        case MSG_READ:
            const { from, num} = action.payload;
            return {...state, chatmsg:state.chatmsg.map(v => ({...v, read:from === v.from ? true : v.read})), unread:state.unread - num}
        default:
            return state;
    }
}

const msgList = (data, users, userid) => {
    return {type:MSG_LIST, payload:{data, users, userid}};
}

const msgRecv = (data, userid) => {
    return {type:MSG_RECV, payload:data, userid};
} 

const msgRead = ({from, userid, num}) => {
    return {type:MSG_READ, payload:{from, userid, num}};
}

export const receiveMsg = () => {
    return (dispatch, getState) => {
        socket.on('recvmsg', (data) => {
			// !!!!!!!!一定要注意这个，异步获取userid，否则DashBoard里的属性还没有获取到值，getState()的值全为空，所以要放到异步处理
            const userid = getState().user._id;
            dispatch(msgRecv(data, userid));
        })
    }
}

export const getMsgList = () => {
    // 第二个参数getState，是store.getState();
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}

export const sendMsg = ({from, to, msg}) => {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg});
    }
}

export const readMsg = (from) => {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {from})
            .then(res => {
                const userid = getState().user._id;
                if(res.status === 200 && res.data.code === 0){
                    dispatch(msgRead({userid, from, num:res.data.num}))
                }
            })
    }
}