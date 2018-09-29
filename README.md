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
使用socket.io来处理实时通信(npm install socket.io --save / npm install socket.io-client --save)
  socket.io是基于事件的实时双向通信库
    socket.io基于websocket协议(与ajax的http协议不同)
    前后端通过事件进行双向通信

ajax是基于http协议的单向的异步通信库，想要实现实时获取数据只能通过轮询
websocket是双向网络通信协议，后端可以主动向前端推送数据

现代浏览器基本都支持websocket协议
![Alt text](https://github.com/zeppelinn/MERN/raw/master/Screenshots/socket通信模型.png)

#项目打包编译
1.编译打包后，生成build目录
  npm run build
  运行以上命令会在项目根目录下生成一个build目录，结构如下
  .
  ├── asset-manifest.json                   //记录打包后的js和css文件
  ├── favicon.ico
  ├── index.html
  ├── manifest.json                         //项目主体配置
  ├── service-worker.js
  └── static
      ├── css
      │   ├── main.c76cf106.css
      │   └── main.c76cf106.css.map
      └── js
          ├── main.9fcb9246.js
          └── main.9fcb9246.js.map

2.express中间件，拦截路由，手动渲染index.html
  (server/server.js)
3.将build设置为静态资源地址

#React服务端SSR
1.node环境使用babel-node支持jsx
  运行npm install babel-cli --save，安装babel的命令行工具
  将package.json中scripts对象的server属性修改为NODE_ENV=test node --exec babel-node server/server.js(定义当前环境，并将node环境修改成babel-node，使server端支持es6的语法以及jsx，为后端渲染首页提供条件))
  在项目根目录下新建文件.babelrc，将package.json中的babel配置复制进去

2.设置css和图片的hook
  npm install css-modules-require-hook --save
  在根目录下新建钩子文件cmrh.conf.js，添加css钩子配置
  npm install asset-require-hook --save (图片钩子)
3.renderToString渲染html