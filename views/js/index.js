const login = document.querySelector('.login')
const qrcode = document.querySelector('.qrcode')
login.onclick = function() {
  fetch('/login', {
    method: 'POST'
  })
    .then((res) => {
      const data = res.json()
      return data
    })
    .then((data) => {
      qrcode.src = data.qrcode
    })
}
