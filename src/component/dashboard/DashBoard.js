import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    NavBar,
} from 'antd-mobile'
import NavLinkBar from '../navlink/NavLink';
import Boss from '../boss/Boss';
import Genius from '../genius/Genius';
import My from '../my/My';
import Msg from '../msg/Msg';
import { getMsgList, receiveMsg } from '../../redux/chat.redux';
import QueueAnim from 'rc-queue-anim';

@withRouter
@connect(
    state => state,
    { getMsgList, receiveMsg }
)

export default class DashBoard extends Component {
    componentDidMount = () => {
        if (!this.props.chatTarget.userList.length) {
            this.props.getMsgList();
            this.props.receiveMsg();
        }
    }

    render() {
        const {pathname} = this.props.location;
        const type = this.props.user.type
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
                component:My,
                hide:false
            },
        ]
        const NotFound = () => (
            <h1>Page Not Found</h1>
        )

        const page = navList.find(v => v.path === pathname)
        return (
            page ? 
            <div>
                <NavBar className='fixed-header' mode='dark' >
                    {navList.find(v => v.path===pathname).title}
                </NavBar>
                <div style={{marginTop:45}} >
                    <QueueAnim type='bottom' >
                        <Route path={page.path} key={page.path} component={page.component}/>
                    </QueueAnim>
                </div>
                <NavLinkBar data = {navList} ></NavLinkBar>
            </div> : <NotFound></NotFound>
        )
    }
    }