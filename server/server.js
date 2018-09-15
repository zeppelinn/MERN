const express = require('express');
const mongoose = require('mongoose');
// 连接mongodb
const DB_URL = 'mongodb://localhost:27017/hiring';
// 连接mongoDB
mongoose.connect(DB_URL);
mongoose.connection.on('connected', function(){
    console.log('mongodb connect successfully');
})
// 定义文档模型
const User = mongoose.model('user', new mongoose.Schema({
    user:{type:String, require:true},
    age:{type:Number, require:true}
}))
// // 新增数据
// User.create({
//     user:'Robert Plant',
//     age:27
// }, function(err, doc){
//     if(!err){ console.log(doc)}else{console.log('User create failed ---> ', err)};
// })

// 新建app
const app = express();

app.get('/', function(req, res){
    res.send('<h1>Hello World</h1>');
})

app.get('/data', function(req, res){
    User.find({}, (err, docs) => {
        if(!err){res.json(docs)}else{res.send('find failed ----> ', err);}
    })
})

app.listen(9093, function(){
    console.log("Node app start at port 9093");
})