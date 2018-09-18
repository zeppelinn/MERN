const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const utils = require('utility');

// 为数据库查询结果添加过滤条件，不显示加密的密码和版本号
const _filter = {pwd:0, '__v':0}

Router.get('/list', (req, res) => {
    User.find({}, (err, doc) => {
        return res.json(doc);
    })
});

Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body;
    User.findOne({user}, (err, doc) => {
        if(doc) return res.json({code:1, msg:'用户名重复'});
        const userModel = new User({user, pwd:md5Password(pwd) , type});
        userModel.save((e, d) => {
            if(e) return res.json({code:1, msg:'数据库存储错误'});
            const {user, type, _id} = d;
            res.cookie('userid', d._id);
            return res.json({code:0, data:{user, type, _id}});
        })
    })
})

Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    User.findOne({user:user, pwd:md5Password(pwd)}, _filter,  (err, doc) => {
        if(!doc) return res.json({code:1, msg:'用户不存在'})
        if(err) return res.json({code:1, msg:'登录出错，请稍后尝试'})
        res.cookie('userid', doc._id);
        return res.json({code:0, data:doc})
    })
});

Router.get('/info', (req, res) => {
    const {userid} = req.cookies;
    // 如果用户没有cookie，直接返回
    if(!userid) return res.json({code:1});
    // 如果有，则查询id
    User.findOne({_id:userid}, _filter, (error, doc) => {
        if(error || !doc) return res.json({code:1, msg:'后端出错'})
        return res.json({code:0, data:doc});
    })
});

const md5Password = (pwd) => {
    const salt = 'no_body_loves_me-6639*503u:˙∂∫åASF††£¡33SA*^@)FHAC9943';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;