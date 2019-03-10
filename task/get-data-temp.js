const path = require('path')
const puppeteer = require('puppeteer')
const config = require('../config')

async function getTemplate(weaTemp, weaImg, weaStatus, weaTips, oneImg, oneWords) {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 375,
      height: 667
    }
  })
  const page = await browser.newPage()
  await page.goto(config.TEP_HOST)
  await page.screenshot({ path: path.join(config.TEP_PIC_NAME) })
  await browser.close()
}

module.exports = getTemplate
