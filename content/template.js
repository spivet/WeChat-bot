const path = require('path')
const puppeteer = require('puppeteer')
const config = require('../config')

async function getTemplate(weaTemp, weaImg, weaStatus, weaTips, oneImg, oneWords) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 730,
      height: 1334
    }
  })
  const page = await browser.newPage()
  await page.goto(config.TEP_HOST)
  await page.$eval('.main', (el) => {
    el.style.backgroundImage = 'url(http://image.wufazhuce.com/FvUWnb7Rq8Lk45XcEnffiK4_6NRb)'
  })
  await page.$eval('.weather-temp', (el) => {
    el.textContent = weaTemp
  })
  // await page.$eval('.weather-status', (el) => {
  //   el.style.backgroundImage = oneImg
  //   el.textContent = weaStatus
  // })
  // await page.$eval('.weather-tips', (el) => {
  //   el.textContent = weaTips
  // })
  // await page.$eval('.date', (el) => {
  //   const today = new Date()
  //   const todayArr = today.toString().split(' ')
  //   const newContent = `${todayArr[2]} ${todayArr[1]}. ${todayArr[3]} | 相遇的第${getDay(config.MEET_DAY)}天`
  //   el.textContent = newContent
  // })
  // await page.$eval('.one-words', (el) => {
  //   el.textContent = oneWords
  // })
  await page.screenshot({ path: path.join('./content/', config.TEP_PIC_NAME) })

  await browser.close()
}

// 从认识到今天的总天数
function getDay(date) {
  const dateNow = new Date()
  const dateMet = new Date(date)
  const days = parseInt(Math.abs(dateNow.getTime() - dateMet.getTime()) / 1000 / 60 / 60 / 24)
  return days
}

module.exports = getTemplate
