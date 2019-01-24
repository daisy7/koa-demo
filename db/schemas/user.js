'use strict'
const mongoose = require('../../db');
const Schema = mongoose.Schema;

const user = new Schema({
    username: { type: String, index: true, unique: true },
    createTime: { type: Date, default: Date.now },
    password: { type: String, required: true },
    Sex: Number,
    photoUrl: { type: String, default: '' },
    nickName: String,
    phone: String,
    validWalletAmount: { type: Number, default: 0 },
    paymentPassword: String,
    status: { type: Number, default: 0 }
}, { versionKey: false });

user.index({ username: 1, createTime: -1 });

module.exports = mongoose.model('user', user)
