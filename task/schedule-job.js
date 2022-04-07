import schedule from 'node-schedule'
import puppeteer from 'puppeteer-core'
import { FileBox } from 'file-box'
import config from '../config/index.js'
import { getOneData } from './get-data-one.js'
import { getWeatherData } from './get-data-weather.js'
import { getTemplate } from './get-data-temp.js'

/**
 * 开始定时任务
 * @param {Objcet} bot 微信机器人
 */
async function start(bot) {
  // 每日天气
  schedule.scheduleJob(config.GETUP_TIME, async () => {
    try {
      // 启动浏览器
      const browser = await puppeteer.launch()
      // 获取墨迹天气数据
      const pageMoji = await browser.newPage()
      await pageMoji.goto(config.MOJI_HOST)
      const { weaTips, weaTemp, weaImg, weaStatus } = await getWeatherData(pageMoji)
      // 获取One数据
      const pageOne = await browser.newPage()
      await pageOne.goto(config.ONE_HOST)
      const { oneImg, oneWords } = await getOneData(pageOne)
      // 关闭浏览器
      await browser.close()
      // 把取到的值赋给变量tempData
      global.tempData = { weaTips, weaTemp, weaImg, weaStatus, oneImg, oneWords }
      // 重新启动一个浏览器，并截图
      await getTemplate()
      // 给尾巴发消息
      const fileBox = FileBox.fromFile(config.TEP_PIC_NAME)
      const weiba = await bot.Contact.find({ alias: config.ALIAS })
      weiba.say(fileBox)
    } catch (err) {
      console.log('错误：\n', err)
    }
  })

  // 喝水提醒
  const drinks = config.DRINK_TIME
  for (let drink of drinks) {
    schedule.scheduleJob(drink.time, async () => {
      try {
        const weiba = await bot.Contact.find({ alias: config.ALIAS })
        weiba.say(drink.words)
      } catch (err) {
        console.log('喝水提醒错误：\n', err)
      }
    })
  }
}

export default {
  start
}