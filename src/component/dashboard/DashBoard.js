import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    NavBar,
} from 'antd-mobile'
import NavLinkBar from '../navlink/NavLink';

const Boss = () => {
    return <h2>Boss首页</h2>
}
const Genius = () => {
    return <h2>Genius首页</h2>
}
const Msg = () => {
    return <h2>Msg首页</h2>
}
const User = () => {
    return <h2>User首页</h2>
}
@withRouter
@connect(
    state => state.user
)

export default class DashBoard extends Component {
    render() {
        const {pathname} = this.props.location;
        const type = this.props.type
        const navList = [
            {
                path:'/boss',
                text:'genius',
                icon:'boss',
                title:'genius',
                component:Boss,
                hide:type === 'genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'boss',
                title:'boss',
                component:Genius,
                hide:type === 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
                hide:false,
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
                hide:false
            },
        ]
        return (
            <div>
                <NavBar mode='dark' >
                    {navList.find(v => v.path===pathname).title}
                </NavBar>
                <span>content</span>
                <NavLinkBar data = {navList} ></NavLinkBar>
            </div>
        )
    }
}