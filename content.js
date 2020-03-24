const players = [...document.getElementsByTagName('video')]

const addUI = video => video.style.border = '5px solid red'

players.forEach(addUI)