const log4js = require('log4js'); // 日志
const path = require('path');
const logger = require('log4js').getLogger('response.js')
// 加载日志配置文件
log4js.configure(path.resolve(__dirname, '..', 'config', 'log4j.json'));
const fn = log4js.connectLogger(log4js.getLogger('http'), { level: 'trace' });
/**
 * 响应处理模块
 */
module.exports = async (ctx, next) => {
    try {
        fn(ctx.req, ctx.res, err => {
            if (err)
                throw err
        });

        // 调用下一个 middleware
        await next()

        // 处理响应结果
        // 如果直接写入在 body 中，则不作处理
        // 如果写在 ctx.body 为空，则使用 state 作为响应
        // if (JSON.stringify(ctx.state) !== '{}') {
        if (ctx.state.message)
            ctx.state.code = -1

        if (ctx.state.code === undefined)
            return
        ctx.body = ctx.body ? ctx.body : {
            code: ctx.state.code !== undefined ? ctx.state.code : 0,
            data: ctx.state.data !== undefined ? ctx.state.data : {},
            message: ctx.state.message !== undefined ? ctx.state.message : ''
        }
        // }
    } catch (e) {
        //权限拦截
        if (e.status === 401) {
            ctx.status = 401;
            return ctx.body = 'Protected resource, use Authorization header to get access\n'
        }

        // catch 住全局的错误信息
        logger.error('Catch Error: %o', e)

        // 设置状态码为 200 - 服务端错误
        ctx.status = 200

        // 输出详细的错误信息
        ctx.body = {
            code: -1,
            error: e && e.message ? e.message : e.toString()
        }

    }
}