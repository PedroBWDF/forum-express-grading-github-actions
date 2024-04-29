const { Restaurant } = require('../models') // 解構賦值寫法

const adminController = {
  getRestaurants: (req, res, next) => {
    Restaurant.findAll({

      raw: true

    })

      .then(restaurants => res.render('admin/restaurants', { restaurants }))

      .catch(err => next(err))
  }
}

module.exports = adminController
