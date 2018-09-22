import React, { Component } from 'react'
import io from 'socket.io-client';

export default class Chat extends Component {

    componentDidMount() {
        // 前端在3000端口，服务器端口在9093，需要跨域，手动配置绑定地址
        const socket =  io('ws://localhost:9093');
    }

    render() {
        console.log(this.props);
        return (
        <div>
            <h2>{this.props.match.params.user}</h2>
        </div>
        )
    }
}
