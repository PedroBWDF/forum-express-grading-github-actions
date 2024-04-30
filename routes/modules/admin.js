const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')
// const { authenticatedAdmin } = require('../../middleware/auth') // 引入 auth.js

router.get('/restaurants/create', adminController.createRestaurant)
router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', adminController.postRestaurant)

// router.get('/restaurants/create', adminController.createRestaurant)
// router.get('/restaurants', adminController.getRestaurants)

// router.get('/restaurants', adminController.getRestaurants)
router.get('/', (req, res) => res.redirect('/admin/restaurants'))

module.exports = router
