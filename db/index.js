const dbUrl = require('../config').mongodb.host

const mongoose = require('mongoose');

const logger = require('log4js').getLogger('db.js');

// 连接数据库
mongoose.connect(dbUrl);
const connection = mongoose.connection;
/**
 * 连接成功
 */
connection.on('connected', () => {
    logger.info(`Mongoose connection open to ${dbUrl}`)
})

/**
 * 连接出错
 */
connection.on('error', err => {
    logger.error(`Mongoose connection error: ${err}`)
    process.exit(1);
})

/**
 * 连接断开
 */
connection.on('disconnected', () => {
    logger.error('Mongoose connection disconnected')
})

module.exports = mongoose
