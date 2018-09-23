import React, { Component } from 'react'
import { connect } from 'react-redux';
import { List } from 'antd-mobile';

@connect(
    state => state,
)

export default class Msg extends Component {

    getLastMsg = (arr) => (
        arr[arr.length - 1]
    )

    render() {
        console.log(this.props);
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        })
        const chatList = Object.values(msgGroup);
        const Item = List.Item;
        const Brief = List.Item.Brief;
        const userid = this.props.user._id;
        return (
            <div>
                
                    {chatList.map(v => {
                        console.log('v======', v);
                        const lastItem = this.getLastMsg(v);
                        const targetId = lastItem.from === userid ? lastItem.from : lastItem.to;
                        const userInfo = this.props.chat.users[targetId];
                        const name = userInfo ? userInfo.name : '';
                        const avatar = userInfo ? userInfo.avatar : '';
                        return <List key={lastItem._id} >
                            <Item 
                                thumb={<img src={require(`../../res/images/${avatar}.png`)} />}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        </List>
                    })}
                
            </div>
        )
    }
}
