// 合并所有的reducer，并返回
import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { chatTarget } from './redux/chatuser.redux';
import { chat } from './redux/chat.redux';

export default combineReducers({user, chatTarget, chat});