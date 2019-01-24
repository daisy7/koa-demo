const path = require('path')

// 默认导出当前文件夹下的映射
module.exports = require('../tools/mapDir')(path.join(__dirname))
