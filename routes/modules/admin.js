const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')
// const { authenticatedAdmin } = require('../../middleware/auth') // 引入 auth.js

const categoryController = require('../../controllers/category-controller')

const upload = require('../../middleware/multer') // 載入 multer

router.get('/users', adminController.getUsers) // 路由到管理使用者的頁面
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategories)
router.patch('/users/:id', adminController.patchUser)
router.get('/restaurants/create', adminController.createRestaurant)
router.get('/restaurants/:id/edit', adminController.editRestaurant)
router.get('/restaurants/:id', adminController.getRestaurant)
router.put('/restaurants/:id', upload.single('image'), adminController.putRestaurant) // 修改後台編輯餐廳的路由，使用multer中間件
router.delete('/restaurants/:id', adminController.deleteRestaurant)
router.get('/restaurants', adminController.getRestaurants)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)

// router.get('/restaurants/create', adminController.createRestaurant)
// router.get('/restaurants', adminController.getRestaurants)

// router.get('/restaurants', adminController.getRestaurants)
router.get('/', (req, res) => res.redirect('/admin/restaurants'))

module.exports = router
