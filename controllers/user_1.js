'use strict'
const jwt = require('jsonwebtoken')
const { validate, enbcrypt } = require('../tools/bcrypt')
const User = require('../db/schemas/user')
const tool = require('../tools/tool')
const SMS = require('../db/schemas/sms')
const SMS_client = require('../tools/sms-sdk')
const config = require('../config')

/**
 * 账户密码登录业务处理
 * @param {*} ctx 
 */
const login = async ctx => {
    let { username, password } = ctx.request.body
    username = tool.convertStr(username)
    password = tool.convertStr(password)
    if (!username || !password) {
        return ctx.state = {
            message: '账户和密码不能为空'
        }
    }
    let result = await User.findOne({ username });
    if (!result) {
        return ctx.state = {
            message: '用户不存在'
        };
    }
    result = await validate(password, result.password)
    if (!result) {
        return ctx.state = {
            message: '密码错误'
        };
    }
    const token = jwt.sign({
        username: result.username,
        _id: result._id
    }, 'my_token', { expiresIn: '2h' });
    return ctx.state = {
        data: token,
        code: 0
    }
}

/**
 * 注册业务处理
 * @param {*} ctx 
 */
const register = async ctx => {
    let { username, password, challengecode, phone } = ctx.request.body
    username = tool.convertStr(username)
    password = tool.convertStr(password)
    if (!username || !password) {
        return ctx.state = {
            message: '账户和密码不能为空'
        }
    }
    if (config.sms.enable) {
        challengecode = tool.convertStr(challengecode)
        phone = tool.convertStr(phone)
        if (!challengecode || !phone) {
            return ctx.state = {
                message: '手机号和验证码不能为空'
            }
        }
        let result = SMS_client.CheckChallengecode(phone, challengecode)
        if (!result) {
            return ctx.state = {
                message: '验证码错误或过期'
            }
        }
    }
    let result = await User.findOne({ username })
    if (result) {
        return ctx.state = {
            message: `已经存在账户为 ${username} 的用户`
        }
    }
    let model = new User({
        username: username,
        password: await enbcrypt(password),
    })
    result = await model.save();
    if (!result) {
        return ctx.state = {
            message: '注册失败,服务器错误'
        }
    }
    return ctx.state.code = 0
}

/**
 * 修改用户信息
 * @param {*} ctx 
 */
const edit_user = async ctx => {
    let params = ctx.request.body
    let username = tool.convertStr(ctx.params.username)
    if (!username) {
        return ctx.state = {
            message: '账户不能为空'
        }
    }
    params = tool.convertObj(params)
    if (!params) {
        return ctx.state = {
            message: '参数有误'
        }
    }
    let result = await User.update({ username}, params)
    if (!result) {
        return ctx.state = {
            message: `不存在账户为 ${username} 的用户`
        }
    }
    return ctx.state.code = 0
}

module.exports = {
    login,
    register,
    edit_user
}
