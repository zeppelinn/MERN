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
                component:My,
                hide:false
            },
        ]
        return (
            <div>
                <NavBar className='fixed-header' mode='dark' >
                    {navList.find(v => v.path===pathname).title}
                </NavBar>
                <div style={{marginTop:45}} >
                    <Switch>
                        {navList.map(v => (
                            <Route 
                                key={v.path}
                                path={v.path}
                                component={v.component}
                            />
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data = {navList} ></NavLinkBar>
            </div>
        )
    }
}