'use strict'
const mongoose = require('../../db')

var magnet = new mongoose.Schema({
    infohash: { type: String, required: true },
    name: String,
    type: String,
    size: { type: Number, default: 0 },
    subList: [{
        _id: false, name: { type: String }, size: { type: Number, default: 0 }
    }],
    hot: { type: Number, default: 1 },
    hots: [
        { _id: false, date: { type: Date }, val: { type: Number, default: 1 } }
    ],
    disable: { type: Boolean, default: false },
    meta: { createdAt: { type: Date, default: Date.now() }, updatedAt: { type: Date, default: Date.now() } }
}, { versionKey: false })

module.exports = mongoose.model('magnet', magnet)
