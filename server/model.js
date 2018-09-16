const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/hiring-net';
mongoose.connect(DB_URL);

const models = {
    user:{
        "user":{type:String, require:true},
        "pwd":{type:String, require:true},
        "type":{type:String, require:true},
        // 头像
        "avatar":{type:String},
        // 简介
        "desc":{type:String},
        // 职位名称
        "title":{type:String},
        "company":{type:String},
        "salary":{type:String},
    },
    chat:{

    }
}

// 批量注册数据模型
for(let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}

// 外部根据模型名称来获取数据模型
module.exports = {
    getModel:(name) => {
        return mongoose.model(name);
    }
}