import React, { Component } from 'react'
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/BossInfo'
import GeniusInfo from './container/geniusinfo/GeniusInfo'
import AuthRoute from './component/authroute/authroute';
import DashBoard from './component/dashboard/DashBoard';
import Chat from './container/chat/Chat';
import {
    Route,
    Switch
} from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/geniusinfo' component={GeniusInfo}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/chat/:user' component={Chat}/>
                    <Route component={DashBoard}/>
                </Switch>
            </div>
        )
    }
}
