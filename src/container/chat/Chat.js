import React, { Component } from 'react'
import io from 'socket.io-client';
import {
    List,
    InputItem,
    NavBar,
    Icon,
    Grid
} from 'antd-mobile'
import { connect } from 'react-redux';
import { IPADDR } from '../../config';
import { getMsgList, sendMsg, receiveMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';

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
            msg:[],
            showEmoji:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        if(!msg || msg === '') return ;
        this.props.sendMsg({from, to, msg});
        this.setState({
            text:'',
            showEmoji:false
        })
    }

    fixCarousel = () => {
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        }, 0);
    }

    componentDidMount = () => {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
                                        .map(v=>({text:v}));
        
        const userId = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        if(!users[userId]){
            return null;
        }
        const extra = () => (
            <div>
                {<span style={{marginRight:'12px'}} onClick={() => {this.fixCarousel();this.setState({showEmoji:!this.state.showEmoji})}} >{'😀'}</span>}
                {<span style={{marginBottom:'3px'}} onClick={() => this.handleSubmit()} >发送</span>}
            </div>
        )
        const chatid = getChatId(userId, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => {return v.chatid === chatid})
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
                {chatmsgs.map(v => {
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
                                <Item 
                                    extra={<img src={avatar} />}
                                    className='chat-me'
                                >
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
                            extra={extra()}
                        >
                            信息
                        </InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(element) => {
                            this.setState({
                                text:this.state.text + element.text
                            })
                        }}
                    /> : null}
                </div>
            </div>
        )
    }
}
