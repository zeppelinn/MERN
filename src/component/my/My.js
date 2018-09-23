import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Result,
    List,
    WhiteSpace,
    Modal,
} from 'antd-mobile'
import browserCookies from 'browser-cookies';
import { handleLogout } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';

@connect(
    state => state.user,
    {handleLogout}
)

export default class My extends Component {

    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    // 退出登录
    logOut = () => {
        const mAlert = Modal.alert;
        mAlert('注销', '确认退出？', [
            {text:'取消', onPress: () => {}},
            {text:'确认', onPress: () => {
                // 直接删除当前的cookie，简单粗暴
                browserCookies.erase('userid');
                this.props.handleLogout();
            }}
        ])
    }

    render() {
        const props = this.props;
        const ListItem = List.Item
        const Brief = List.Item.Brief
        console.log('props.user', props.user);
        return props.user ? (
            <div>
                <Result 
                    img={<img style={{width:50}} src={require(`../../res/images/${this.props.avatar}.png`)} alt=""/>}
                    title={this.props.user}
                    message={props.type === 'boss' ? props.company : ''}
                />
                <List
                    renderHeader={() => '简介'}
                >
                    <ListItem
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('\n').map(v => (
                            <Brief key={v} >{v}</Brief>
                        ))}
                        {props.salary ? <Brief>薪资:{props.salary}</Brief> : null}
                    </ListItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <ListItem onClick={() => this.logOut()} >
                        退出登录
                    </ListItem>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo} ></Redirect>
    }
}