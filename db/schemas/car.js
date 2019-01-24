'use strict'
const mongoose = require('../../db');

const model = new mongoose.Schema({
    name: { type: String, required: true },
    ctime: { type: Date, default: Date.now() },
    status: { type: Number, default: 0 }
}, { versionKey: false })

module.exports = mongoose.model('car', model)
