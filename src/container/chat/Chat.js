import React, { Component } from 'react'
import io from 'socket.io-client';
import {
    List,
    InputItem,
} from 'antd-mobile'

// 前端在3000端口，服务器端口在9093，需要跨域，手动配置绑定地址
const socket =  io('ws://192.168.1.108:9093');
// const socket =  io('ws://localhost:9093');


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
        socket.emit('sendmsg', {text:this.state.text});
        this.setState({
            text:''
        })
    }

    componentDidMount() {
        socket.on('recvmsg', (data) => {
            this.setState({
                msg:[...this.state.msg, data.text]
            })
            console.log(data.text);
        })
    }

    render() {
        return (
            <div>
                {this.state.msg.map(v => (
                    <p key={v} >{v}</p>
                ))}
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
