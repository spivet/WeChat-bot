const { Wechaty } = require('wechaty')
const generateQrcode = require('qrcode-terminal')
const schedule = require('node-schedule')
const { FileBox } = require('file-box')
const config = require('./config')
const getContent = require('./content')
const getWeatherData = require('./content/weather')
const getOneData = require('./content/one')

async function main() {
  const bot = new Wechaty()
  bot.on('scan', (qrcode, status) => {
    console.log(`Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrcode)}`)
    generateQrcode.generate(qrcode, function(code) {
      console.log(code)
    })
  })
  bot.on('login', async (user) => {
    console.log(`User ${user} logined`)
    // const fileBox = FileBox.fromFile(`./content/${config.TEP_PIC_NAME}`)
    // const weiba = await bot.Contact.find({ alias: config.ALIAS })
    // weiba.say(fileBox)
    // 登陆后创建定时任务
    startScheduleJob(bot)
  })
  bot.on('message', (message) => console.log(`Message: ${message}`))
  bot.start()
}
main()

// 开始定时任务
async function startScheduleJob(bot) {
  // 首发
  schedule.scheduleJob(config.GETUP_TIME, async () => {
    await getContent()
    const fileBox = FileBox.fromFile(`./content/${config.TEP_PIC_NAME}`)
    const weiba = await bot.Contact.find({ alias: config.ALIAS })
    weiba.say(fileBox)
    // const weatherData = await getWeatherData()
    // const oneData = await getOneData()
//     const weiba = await bot.Contact.find({ alias: config.ALIAS })
//     weiba.say(`${weatherData.weatherTips}
// 天气：${weatherData.statusText}
// 温度：${weatherData.temperature}
// 风力：${weatherData.wind}
// 空气：${weatherData.air}
// ${oneData.oneText}`)
  })

  // 喝水提醒
  const drinks = config.DRINK_TIME
  for(let drink of drinks) {
    schedule.scheduleJob(drink.time, async () => {
      const weiba = await bot.Contact.find({ alias: config.ALIAS })
      weiba.say(drink.words)
    })
  }
}
