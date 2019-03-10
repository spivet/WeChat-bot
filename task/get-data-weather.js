/**
 * 获取墨迹天气数据
 * @param {Object} page 无头浏览器上下文
 * @returns {Object} object
 */
async function getWeatherData(page) {
  const weaTips = await getWeatherTips(page)
  const weatherDetail = await getWeatherDetail(page)
  return {
    weaTips,
    ...weatherDetail
  }
}

// 获取天气提示
async function getWeatherTips(page) {
  const wea_tips = await page.$('.wea_tips')
  const weatherTips = await wea_tips.$eval('em', (em) => em.innerText)
  return weatherTips
}

// 获取天气数据
async function getWeatherDetail(page) {
  const domToday = await page.$('.days')
  const weatherDetail = await domToday.$$eval('li', (li) => {
    const statusImg = li[1].querySelector('img')
    const weaImg = statusImg.getAttribute('src')
    const weaStatus = li[1].innerText
    const weaTemp = li[2].innerText
    const wind = li[3].innerText.replace(/\n/g, ' ')
    const air = li[4].innerText

    return {
      weaImg,
      weaStatus,
      weaTemp,
      wind,
      air
    }
  })

  return weatherDetail
}

module.exports = getWeatherData
