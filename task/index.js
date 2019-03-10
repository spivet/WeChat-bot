const { Wechaty } = require('wechaty')
const generateQrcode = require('qrcode-terminal')
const startScheduleJob = require('./schedule-job')

/**
 * 登录微信，并开始执行定时任务
 */
function startTask() {
  const bot = new Wechaty()
  bot.on('scan', (qrcode, status) => {
    console.log(`扫描二维码: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`)
    generateQrcode.generate(qrcode, function(code) {
      console.log(code)
    })
  })
  bot.on('login', (user) => {
    console.log(`用户 ${user} 登录成功`)
    // 登陆后创建定时任务
    startScheduleJob(bot)
  })
  bot.on('message', (message) => console.log(`收到消息: ${message}`))
  bot.start()
}

module.exports = startTask
