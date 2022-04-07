import { WechatyBuilder }  from 'wechaty'
import generateQrcode from 'qrcode-terminal'
import scheduleJob from './schedule-job.js'

/**
 * 登录微信，并开始执行定时任务
 */
function start() {
  const bot = WechatyBuilder.build({
    name: 'mybot'
  })
  bot.on('scan', (qrcode, status) => {
    console.log(`扫描二维码: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`)
    generateQrcode.generate(qrcode, function(code) {
      console.log(code)
    })
  })
  bot.on('login', (user) => {
    console.log(`用户 ${user} 登录成功`)
    // 登陆后创建定时任务
    scheduleJob.start(bot)
  })
  bot.on('message', (message) => console.log(`收到消息: ${message}`))
  bot.start()
    .catch(async e => {
      console.error('Bot start() fail:', e)
      await bot.stop()
      process.exit(-1)
    })
}

export default {
  start
}