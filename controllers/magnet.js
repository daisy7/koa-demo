const redis = require('../db/redis')
const Model = require('../db/schemas/magnet')
const config = require('../config/config');
const tool = require('../tools/tool')
const redisEnable = config.redis.enable;

/**
 * 为首页数据查询构建条件对象
 * @param params 查询参数对象
 * @returns {{}}
 */
function getQuery(params) {
    const query = {};
    query.status = 0;
    if (params.name)
        query.name = { $regex: params.name, $options: 'gi' }
    return query;
}

module.exports = {
    find: async ctx => {
        let params = ctx.query;
        let result = null
        if (redisEnable) {
            let cache_key = tool.generateKey(ctx.originalUrl, params)
            result = await redis.getItem(cache_key);
        }
        if (!result) {
            let page = parseInt(params.pageIndex) || 1;
            page = page > 0 ? page : 1;
            let size = parseInt(params.pageSize) || 10;
            let options = {};
            options.skip = (page - 1) * size;
            options.limit = size;
            let query = getQuery(params)
            result = await Model.find(query, {}, options);
            if (result.length <= 0) {
                return ctx.state = {
                    message: '未查询到参数为 ' + JSON.stringify(params) + ' 的数据',
                }
            }
            if (redisEnable)
                redis.setItem(cache_key, result);
        }
        return ctx.state = {
            data: result
        }
    },

    findById: async ctx => {
        const id = ctx.params.id;
        if (id == undefined || id.replace(/(^s*)|(s*$)/g, "").length == 0) {
            return ctx.state = {
                message: 'id参数值不能为空'
            }
        }
        let result = null;
        try {
            result = await Model.findById(id);
        } catch (error) {
            return ctx.state = {
                message: '未查询到id为 ' + id + ' 数据'
            }
        }
        return ctx.state = {
            data: result
        }
    }
}
