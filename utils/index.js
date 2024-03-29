// 从认识到今天的总天数
export function getDay(date) {
  const dateNow = new Date()
  const dateMet = new Date(date)
  const days = parseInt(Math.abs(dateNow.getTime() - dateMet.getTime()) / 1000 / 60 / 60 / 24)
  return days
}

export function getDate() {
  const today = new Date()
  const todayArr = today.toString().split(' ')
  return `${todayArr[2]} ${todayArr[1]}.${todayArr[3]}`
}

export default {
  getDay,
  getDate
}
