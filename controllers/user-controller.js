const bcrypt = require('bcryptjs') // 載入 bcrypt
// const db = require('../models')
const { User } = require('../models')

const { localFileHandler } = require('../helpers/file-helpers') // 讓程式邏輯可以把image檔案傳到 file-helper 處理

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    // 如果兩次輸入的密碼不同，就建立一個 Error 物件並拋出
    if (req.body.password !== req.body.passwordCheck) throw new Error('Passwords do not match!')

    // 確認資料裡面沒有一樣的 email，若有，就建立一個 Error 物件並拋出
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exists!')
        return bcrypt.hash(req.body.password, 10) // 前面加 return
      })

      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號！') // 並顯示成功訊息
        res.redirect('/signin')
      })
      .catch(err =>
        next(err)
      )
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    return User.findByPk(req.params.id)

      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        res.render('users/profile', { user: user.toJSON() })
      })
  },

  editUser: (req, res, next) => {
    return User.findByPk(req.params.id)

      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        res.render('users/edit', { user: user.toJSON() })
      })
  },

  putUser: (req, res, next) => {
    if (Number(req.params.id) !== Number(req.user.id)) {
      res.redirect(`/users/${req.params.id}`)
    }

    const { name } = req.body
    const { file } = req // 把檔案取出來，也可以寫成 const file = req.file

    return Promise.all([
      User.findByPk(req.params.id),
      localFileHandler(file) // 把image檔案傳到 file-helper 處理
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error("User didn't exist!")

        return user.update({
          name,
          image: filePath || user.image
        })
      })
      .then(() => {
        req.flash('success_messages', '使用者資料編輯成功')
        res.redirect(`/users/${req.params.id}`)
      })
      .catch(err => next(err))
  }
}

module.exports = userController
