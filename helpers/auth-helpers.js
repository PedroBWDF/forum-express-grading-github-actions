const getUser = req => {
  return req.user || null
}

// Passport 提供的 isAuthenticated()方法
const ensureAuthenticated = req => {
  return req.isAuthenticated()
}

module.exports = {
  getUser,
  ensureAuthenticated
}
