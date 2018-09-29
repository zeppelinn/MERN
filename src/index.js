import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer'
import { 
    BrowserRouter, 
} from 'react-router-dom';
import './config';
// import 'antd-mobile/dist/antd-mobile.css'
import App from './app';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

// 如果服务端推流，这里需要用hydrate渲染
ReactDom.hydrate(
    (<Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);