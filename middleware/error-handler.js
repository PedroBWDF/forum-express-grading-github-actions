module.exports = {
  generalErrorHandler (err, req, res, next) {
    if (err instanceof Error) { // 在 JavaScript 中遇到如語法錯誤、範圍錯誤或其他異常情況時，通常會拋出一個 Error 物件
      req.flash('error_messages', `${err.name}: ${err.message}`)
    } else {
      req.flash('error_messages', `${err}`)
    }
    res.redirect('back')
    next(err)
  }
}
