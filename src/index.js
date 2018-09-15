import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
// import { counter } from './index.redux';
import reducer from './reducer'
import { 
    BrowserRouter, 
    Route, 
    Redirect, 
    Switch 
} from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension() ? window.devToolsExtension() : () => {}
));

console.log(store.getState());

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
        <Switch>
                {/* 被包含在Switch组件中的Router组件们，当路由匹配到一个则不再往下匹配 */}
            <Route path='/login' component={Auth}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Redirect to='/dashboard' />
        </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);