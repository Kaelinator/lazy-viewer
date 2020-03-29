const players = [...document.getElementsByTagName('video')]

const addUI = (video, i) => {
  const overlay = document.createElement('div')
  overlay.className = 'video-overlay'
  const controls = document.createElement('div')
  controls.className = 'video-controls'
  controls.id = `video-controls-${i}`
  const header = document.createElement('h1')
  header.id = `ui-${i}`
  header.innerText = 'content'
  controls.appendChild(header)
  overlay.appendChild(controls)

  video.parentNode.insertBefore(overlay, video)
}

const getAudio = (video, i) => {
  const context = new AudioContext()
  const analyser = context.createAnalyser()
  analyser.fftSize = 256
  const dataArray = new Uint8Array(analyser.frequencyBinCount)
  source = context.createMediaElementSource(video)
  source.connect(analyser)
  analyser.connect(context.destination)
  const controls = document.getElementById(`video-controls-${i}`)
  const header = document.getElementById(`ui-${i}`)

  setInterval(() => {
    analyser.getByteTimeDomainData(dataArray)
    const sum = dataArray.reduce((s, a) => s + a, 0)
    const avg = (sum / dataArray.length - 128) * (1 / video.volume) + 128

    header.innerText = `${avg} / ${analyser.maxDecibels}`
    controls.style.backgroundColor = (Math.abs(avg - 128) <= 3) ? 'red' : 'blue'
  }, 16)
}

players.forEach(addUI)
players.forEach(getAudio)