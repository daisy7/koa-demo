const Router = require('koa-router');
const controllers = require('../controllers')

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Welcome'
})
    .get('/api/cars', controllers.car.find)

    .post('/api/cars', controllers.car.insert)

    .get('/api/cars/:id', controllers.car.findById)

    .delete('/api/cars/:id', controllers.car.delete)

    .post('/api/register', controllers.user.register)

    .post('/api/login', controllers.user.login)

    .post('/api/magnets', controllers.magnet.find)

    .get('/api/magnets/:id', controllers.magnet.findById)

    .post('/api/user/:username', controllers.user.edit_user)

module.exports = router;