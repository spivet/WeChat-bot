const puppeteer = require('puppeteer')
const config = require('../config')

async function getOneData(page) {
  const oneData = await getOneDetail(page)
  return oneData
}


// 获取 one·一个 的数据
async function getOneDetail(page) {
  const carousel_inner = await page.$('.carousel-inner')
  const activeItem = await carousel_inner.$('.active')
  const oneImgSrc = await activeItem.$eval('.fp-one-imagen', img => img.src)
  const oneText = await activeItem.$eval('.fp-one-cita', div => div.innerText)

  return {oneImgSrc, oneText}
}

module.exports = getOneData