'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sms = new Schema({
    phone: { type: String },
    createTime: { type: Date, default: Date.now },
    challengecode: { type: String, unique: true },
}, { versionKey: false });

sms.index({ createTime: 1, Status: -1 });

module.exports = mongoose.model('sms', sms)