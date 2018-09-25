import React, { Component } from 'react'
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(
    state => state,
)

export default class Msg extends Component {

    getLastMsg = (arr) => (
        arr[arr.length - 1]
    )

    render() {
        if(!this.props.chat.chatmsg.length) return null;
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        })
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getLastMsg(a).create_time;
            const b_last = this.getLastMsg(b).create_time;
            return b_last - a_last;
        });
        const Item = List.Item;
        const Brief = List.Item.Brief;
        const userid = this.props.user._id;
        return (
            <div>
                {chatList.map(v => {
                    const lastItem = this.getLastMsg(v);
                    const targetId = lastItem.to === userid ? lastItem.from : lastItem.to;
                    const unreadNum = v.filter(value => !value.read && value.to === userid).length;
                    const userInfo = this.props.chat.users[targetId];
                    const name = userInfo ? userInfo.name : '';
                    const avatar = userInfo ? userInfo.avatar : '';
                    return (
                        <List key={lastItem._id} >
                            <Item 
                                extra={<Badge text={unreadNum} overflowCount={99} />}
                                thumb={<img src={require(`../../res/images/${avatar}.png`)} />}
                                arrow='horizontal'
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`);
                                }}
                                >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        </List>
                    )
                })}
            </div>
        )
    }
}
