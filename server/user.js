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
    console.log(req.body);
    const {user, pwd, type} = req.body;
    User.findOne({user}, (err, doc) => {
        if(doc) return res.json({code:1, msg:'用户名重复'})
        User.create({user, pwd:md5Password(pwd) , type}, (e, d) => {
            if(e) return res.json({code:1, msg:'数据库存储错误'});
            return res.json({code:0});
        });
    })
})

Router.get('/info', (req, res) => {
    return res.json({code:1});
});

const md5Password = (pwd) => {
    const salt = 'no_body_loves_me-6639*503u:˙∂∫åASF††£¡33SA*^@)FHAC9943';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;