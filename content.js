const players = [...document.getElementsByTagName('video')]

const addUI = (video, i) => {
  const overlay = document.createElement('h1')
  overlay.innerText = 'hi'
  video.parentNode.insertBefore(overlay, video)
}

players.forEach(addUI)