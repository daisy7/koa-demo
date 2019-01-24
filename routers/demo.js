const router = require('koa-router')({
    prefix: '/demo'
})

const controllers = require('../controllers')

router.get('/cars', controllers.car.find)

    .post('/cars', controllers.car.insert)

    .get('/cars/:id', controllers.car.findById)

    .delete('/cars/:id', controllers.car.delete)

    .post('/register', controllers.user_1.register)

    .post('/login', controllers.user_1.login)

    .post('/magnets', controllers.magnet.find)

    .get('/magnets/:id', controllers.magnet.findById)

    .post('/user/:username', controllers.user_1.edit_user)

module.exports = router
