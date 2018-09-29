// const express = require('express');
// 在将node环境替换成babel-node之后，就可以使用import这样的es6语法了
import express from 'express'
import userRouter  from './user'
import bodyParser  from 'body-parser'
import cookieParser from 'cookie-parser'
import model from './model';
const Chat = model.getModel('chat');

const app = express();
const path = require('path')
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook';
assethook({
    extensions:['png']
})
// 支持jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from '../src/app';
import reducers from '../src/reducer'
// 动态引入build生成的css和js文件
// 将staticPath中定义的所有文件路径引入到pageHtml中就行了
import staticPath from '../build/asset-manifest.json'

io.on(
    'connection',
    function(socket){
        socket.on('sendmsg', function(data){
            const {from, to, msg} = data;
            // 每组聊天的唯一的id
            const chatid = [from, to].sort().join('_');
            Chat.create({chatid, from, to, content:msg}, (err, doc) => {
                io.emit('recvmsg', Object.assign({}, doc._doc))
            })
        })
    }
)

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use(function(req, res, next){
    // 设置白名单
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
        // 只要不是/user或者/static开头的，就往下走，返回渲染的页面
        return next();
    }

    const store = createStore(reducers, compose(
        applyMiddleware(thunk)
    ))
    let context = {}
    const markup = renderToString(
        <Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App></App>
            </StaticRouter>
        </Provider>)
    const obj = {
        '/msg':"聊天列表",
        "/boss":"招聘"
    }

    // pageHtml即为public/index.html中的内容，是整个web应用的骨架
    // 以下就是服务端渲染的内容，包括了css和js，可以用浏览器查看源代码
    // 搜索引擎在爬网站数据的时候就能从下面爬到首页数据，增强了SEO友好性
    const pageHtml = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <meta name="keywords" content="react,redux,聊天,chat,招聘" >
            <meta name="author" content="lijun,zeppelinn" >
            <meta name="description" content="${obj[req.url]}" >
            <link rel="stylesheet" href="/${staticPath['main.css']}" >
            <title>React App</title>
        </head>
        <body>
            <noscript>
            You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">${markup}</div>
            <script src="/${staticPath['main.js']}" ></script>
        </body>
        </html>
    `
    res.send(pageHtml)
    // 使用path.resolve('build/index.html')是将相对路径转化成为绝对路径
    // return res.sendFile(path.resolve('build/index.html'));
})
// 将/build设置为静态资源地址
// 在package.json的"scripts"对象中加入"server":"node server/server.js"属性，
// 在跟目录下执行npm run server 即可以在服务端(9093)查看项目
// 浏览器现在访问localhost:9093/login就可以登录了
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function(){
    console.log("Node app start at port 9093");
})