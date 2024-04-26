const express = require('express')
const router = express.Router()

const restController = require('../controllers/restaurant-controller')
const userController = require('../controllers/user-controller') // 新增這行
// 載入admin.js
const admin = require('./modules/admin')

router.use('/admin', admin)

// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp) // 注意用 post
router.get('/restaurants', restController.getRestaurants)

router.use('/', (req, res) => res.redirect('/restaurants'))

module.exports = router
