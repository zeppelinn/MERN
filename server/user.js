const express = require('express');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const utils = require('utility');

Router.get('/list', (req, res) => {
    User.find({}, (err, doc) => {
        return res.json(doc);
    })
});

Router.post('/register', (req, res) => {
    const {user, pwd, type} = req.body;
    User.findOne({user}, (err, doc) => {
        if(doc) return res.json({code:1, msg:'用户名重复'})
        User.create({user, pwd:md5Password(pwd) , type}, (e, d) => {
            if(e) return res.json({code:1, msg:'数据库存储错误'});
            return res.json({code:0});
        });
    })
})

Router.post('/login', (req, res) => {
    const {user, pwd} = req.body;
    User.findOne({user:user, pwd:md5Password(pwd)}, (err, doc) => {
        if(!doc) return res.json({code:1, msg:'用户不存在'})
        if(err) return res.json({code:1, msg:'登录出错，请稍后尝试'})
        return res.json({code:0, data:doc})
    })
});

Router.get('/info', (req, res) => {
    return res.json({code:1});
});

const md5Password = (pwd) => {
    const salt = 'no_body_loves_me-6639*503u:˙∂∫åASF††£¡33SA*^@)FHAC9943';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;