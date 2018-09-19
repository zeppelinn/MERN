import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer'
import { 
    BrowserRouter, 
    Route,
    Switch
} from 'react-router-dom';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import BossInfo from './container/bossinfo/BossInfo'
import GeniusInfo from './container/geniusinfo/GeniusInfo'
import 'antd-mobile/dist/antd-mobile.css'
import AuthRoute from './component/authroute/authroute';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension() ? window.devToolsExtension() : () => {}
));

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
        <div>
            <AuthRoute></AuthRoute>
            <Switch>
                <Route path='/bossinfo' component={BossInfo}/>
                <Route path='/geniusinfo' component={GeniusInfo}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </Switch>
        </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);