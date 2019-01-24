var redis = require('redis');
var config = require('../config');
var redisEnable = config.redis.enable;
const logger = require('log4js').getLogger('redis.js');
const defaultExpired = parseInt(config.redis.expired)

if (redisEnable) {
    // use custom redis url or localhost
    var client = redis.createClient(config.redis.port, config.redis.host);
    client.on('connected', function (err) {
        logger.info('Redis connection open to ' + config.redis.host + ':' + config.redis.port);
    });
    client.on('error', function (err) {
        logger.error('Redis连接错误: ' + err);
        process.exit(1);
    });
}

/**
 * 设置缓存
 * @param key 缓存key
 * @param value 缓存value
 * @param expired 缓存的有效时长，单位秒
 * @param callback 回调函数
 */

const setItem = (key, value, expired = defaultExpired) => {
    return new Promise((resolve, reject) => {
        if (!redisEnable) {
            reject(null, null)
        }
        client.set(key, JSON.stringify(value), (err, reply) => {
            if (err) {
                reject(err);
            }
            client.expire(key, expired);
            resolve(null);
        });

    })
}

/**
 * 获取缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
const getItem = key => {
    return new Promise((resolve, reject) => {
        if (!redisEnable) {
            reject(null)
        }
        client.get(key, function (err, reply) {
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(reply));
        });

    })
}

/**
 * 移除缓存
 * @param key 缓存key
 * @param callback 回调函数
 */
const removeItem = key => {
    if (!redisEnable) {
        return reject(null);
    }
    client.del(key, err => {
        if (err)
            reject(err)
        else
            resolve(null)
    });
};

module.exports = {
    getItem,
    setItem,
    removeItem
}
