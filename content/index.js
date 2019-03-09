const puppeteer = require('puppeteer')
const getWeatherData = require('./weather')
const getOneData = require('./one')
const getTemplate = require('./template')
const config = require('../config')

async function getContent() {
  const browser = await puppeteer.launch()

  // 获取墨迹天气数据
  const pageMoji = await browser.newPage()
  await pageMoji.goto(config.MOJI_HOST)
  const { weatherTips, temperature, statusImgSrc, statusText } = await getWeatherData(pageMoji)

  // 获取One数据
  const pageOne = await browser.newPage()
  await pageOne.goto(config.ONE_HOST)
  const { oneImgSrc, oneText } = await getOneData(pageOne)

  await browser.close()

  await getTemplate(temperature, statusImgSrc, statusText, weatherTips, oneImgSrc, oneText)
}

getContent()
// module.exports = getContent
