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
} from 'react-router-dom';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import 'antd-mobile/dist/antd-mobile.css'
import AuthRoute from './component/authroute/authroute';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension() ? window.devToolsExtension() : () => {}
));

const Boss = () => {
    return <div>
        test
    </div>
}

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
        <div>
            <AuthRoute></AuthRoute>
            <Route path='boss' component={Boss}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
        </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);