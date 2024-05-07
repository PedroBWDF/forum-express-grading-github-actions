const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null // 因為共用categories路由，這裡先判斷若id存在，去DB找出相對應的id跟類別，傳到下面程式碼的category。hbs檔案的category就為true，渲染對應的樣板
    ])
      .then(([categories, category]) => {
        res.render('admin/categories', {
          categories,
          category
        })
      })
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
  },

  putCategory: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')

    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category doesn't exist!")
        return category.update({ name })
      })
      .then(() => {
        req.flash('success_messages', '成功更新餐廳類別')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  },

  deleteCategory: (req, res, next) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category didn't exist!") // 反查，確認要刪除的類別存在，再進行下面刪除動作
        return category.destroy()
      })
      .then(() => {
        req.flash('success_messages', '此餐廳類別已成功刪除')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  }
}

module.exports = categoryController
