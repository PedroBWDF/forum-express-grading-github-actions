const dayjs = require('dayjs') // 載入 dayjs 套件
const relativeTime = require('dayjs/plugin/relativeTime') // 引入relativeTime插件
dayjs.extend(relativeTime)

module.exports = {
  currentYear: () => dayjs().year(), // 取得當年年份作為 currentYear 的屬性值，並導出
  relativeTimeFromNow: a => dayjs(a).fromNow(), // 傳入時間參數a，函式回傳 dayjs(a).fromNow()變成相對時間
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this) // ifCond helper，在這裡先寫好執行邏輯，再到handlebars使用
  }
}
