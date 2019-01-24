const Koa = require('koa')
const app = new Koa();
const config = require('./config')
const bodyParser = require('koa-bodyparser');
const koajwt = require('koa-jwt')
const logger = require('log4js').getLogger('app.js')
const response = require('./middlewares/response')

// 解析请求体
app.use(bodyParser());

// 使用响应处理中间件
app.use(response)

//验证token
// app.use(koajwt({
//     secret: 'my_token'
// }).unless({
//     path: [/\/login/, /\/register/,"/"]
// }));

// 引入路由分发
const router = require('./routers')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => logger.info(`listening on port ${config.port}`));

//捕获异常记录错误日志
app.on("error", (err) => {
    logger.error(err);
});
