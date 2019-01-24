const path = require('path')

const router = require('koa-router')()

router.get('/', async ctx => {
    ctx.body = 'welcome'
})
// 默认导出当前文件夹下的映射
const routers = require('../tools/mapDir')(path.join(__dirname))

Object.keys(routers).forEach(key => {
    if (key !== 'index')
        router.use(routers[key].routes())
})

module.exports = router
