const puppeteer = require('puppeteer')
const config = require('../config')

async function getWeatherData(page) {
  const weatherTips = await getWeatherTips(page)
  const weatherDetail = await getWeatherDetail(page)
  return {
    weatherTips,
    ...weatherDetail
  }
}

// 获取天气提示
async function getWeatherTips(page) {
  const wea_tips = await page.$('.wea_tips')
  const weatherTips = await wea_tips.$eval('em', em => em.innerText)
  return weatherTips
}

// 获取天气数据
async function getWeatherDetail(page) {
  const domToday = await page.$('.days')
  const weatherDetail = await domToday.$$eval('li', li => {
    const statusImg = li[1].querySelector('img')
    const statusImgSrc = statusImg.getAttribute('src')
    const statusText = li[1].innerText
    const temperature = li[2].innerText
    const wind = li[3].innerText.replace(/\n/g, ' ')
    const air = li[4].innerText

    return {
      statusImgSrc,
      statusText,
      temperature,
      wind,
      air
    }
  })

  return weatherDetail
}

module.exports = getWeatherData