import React, { Component } from 'react'
import io from 'socket.io-client';
import {
    List,
    InputItem,
    NavBar,
    Icon
} from 'antd-mobile'
import { connect } from 'react-redux';
import { IPADDR } from '../../config';
import { getMsgList, sendMsg, receiveMsg } from '../../redux/chat.redux';

// 前端在3000端口，服务器端口在9093，需要跨域，手动配置绑定地址
const socket =  io(`ws://${IPADDR}:9093`);

@connect(
    state => state,
    {getMsgList, sendMsg, receiveMsg}
)
export default class Chat extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            text:'',
            msg:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({
            text:''
        })
    }

    componentDidMount = () => {
        console.log(this.props);
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    render() {
        const userId = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        if(!users[userId]){
            return null;
        }
        return (
            <div id='chat-page'>
                <NavBar 
                    mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={() => {
                        this.props.history.goBack();
                    }}
                >
                    {users[userId].name}
                </NavBar>
                {this.props.chat.chatmsg.map(v => {
                    const avatar = require(`../../res/images/${users[v.from].avatar}.png`)
                    return v.from === userId ? 
                        (
                            <List key={v._id} >
                                <Item thumb={avatar} >
                                    {v.content}
                                </Item>
                            </List>
                        ):
                        (
                            <List key={v._id} >
                                <Item extra={<img src={avatar} />} className='chat-me' >
                                    {v.content}
                                </Item>
                            </List>
                        )
                    })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text:v
                                })
                            }}
                            extra={<span onClick={() => this.handleSubmit()} >发送</span>}
                        >
                            信息
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}
