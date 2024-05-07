const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    return Category.findAll({
      raw: true
    })
      .then(categories => res.render('admin/categories', { categories }))
      .catch(err => next(err))
  },

  postCategories: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')
      
    return Category.create({
      name
    })
      .then(categories => {
        req.flash('success_messages', '餐廳類別新增成功')
        res.redirect('admin/categories', { categories })
      })
      .catch(err => next(err))
  }
}

module.exports = categoryController
