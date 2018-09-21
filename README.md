#mongoDB
启动本地mongodb服务
mongod --config /usr/local/etc/mongod.conf 

#antd-mobile的按需加载
对antd的组件进行按需加载
npm install babel-plugin-import --save
在package.json的 babel 下的 plugins 数组中中添加
[
  "import",
  {
    "libraryName":"antd-mobile",
    "style":"css"
  }
]

#装饰器
安装支持装饰器的插件
npm install babel-plugin-transform-decorators-legacy --save
在package.json的plugins中添加"transform-decorators-legacy"

#axios
使用axios来发送异步请求
在package.json中添加 "proxy":"http://localhost:9390" 可以实现express服务(3000)跨域访问mongodb服务(9093)

#cookies
用户登录基于cookie验证
express依赖cookie-parser，使用npm install cookie-parser安装
使用browser-cookies模块来操作用户的cookie

#socket.io
使用socket.io来处理实时通信
  socket.io是基于事件的实时双向通信库
    socket.io基于websocket协议(与ajax的http协议不同)
    前后端通过事件进行双向通信

ajax是基于http协议的单向的异步通信库，想要实现实时获取数据只能通过轮询
websocket是双向网络通信协议，后端可以主动向前端推送数据

现代浏览器基本都支持websocket协议
![Alt text](https://github.com/zeppelinn/MERN/raw/master/Screenshots/socket通信模型.png)