export default {
  ONE_HOST: 'http://wufazhuce.com/', // ONE的web版网站
  MOJI_HOST: 'https://tianqi.moji.com/weather/china/hubei/dongxihu-district', // 中国墨迹天气url
  TEP_HOST: 'http://localhost:3000/temp', // 生成消息图片用的HTML模板页面
  TEP_PIC_NAME: 'template.png', // 生成的消息图片名
  MEET_DAY: '2016,5,1', // 和她认识的那一天2016年6月1号
  ALIAS: '尾巴', // 备注姓名
  GETUP_TIME: '30 10 7 * * *', // 每天发送第一条消息的时间，每天7点10分30秒发送
  DRINK_TIME: [
    { time: '30 13 7 * * *', words: '起床喝水，排毒养颜' },
    { time: '30 10 8 * * *', words: '要准备上班啦，先喝杯水吧' },
    { time: '30 10 12 * * *', words: '听说午餐后喝水，能减负减肥' },
    { time: '30 30 14 * * *', words: '喝杯水，提神醒脑' },
    { time: '30 30 17 * * *', words: '晚饭前喝杯水，晚上吃的就少了' },
    { time: '30 0 22 * * *', words: '睡觉前也别忘了喝水' }
  ]
}
