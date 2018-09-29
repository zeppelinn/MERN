const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model');
const Chat = model.getModel('chat');

const app = express();
const path = require('path')
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
    // 使用path.resolve('build/index.html')是将相对路径转化成为绝对路径
    return res.sendFile(path.resolve('build/index.html'));
})
// 将/build设置为静态资源地址
// 在package.json的"scripts"对象中加入"server":"node server/server.js"属性，
// 在跟目录下执行npm run server 即可以在服务端(9093)查看项目
// 浏览器现在访问localhost:9093/login就可以登录了
app.use('/', express.static(path.resolve('build')))

server.listen(9093, function(){
    console.log("Node app start at port 9093");
})