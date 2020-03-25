const players = [...document.getElementsByTagName('video')]

const addUI = (video, i) => {
  const overlay = document.createElement('div')
  overlay.className = 'video-overlay'
  const controls = document.createElement('div')
  controls.className = 'video-controls'
  const header = document.createElement('h1')
  header.innerText = 'content'
  controls.appendChild(header)
  overlay.appendChild(controls)

  video.parentNode.insertBefore(overlay, video)
}

const getAudio = (video, i) => {
  // const context = new AudioContext()
  // const gainNode = context.createGain()
  // source = context.createMediaElementSource(video)
  // source.connect(gainNode)
  const context = new AudioContext()
  const analyser = context.createAnalyser()
  analyser.fftSize = 256
  const dataArray = new Uint8Array(analyser.frequencyBinCount)
  source = context.createMediaElementSource(video)
  source.connect(analyser)
  analyser.connect(context.destination)

  setInterval(() => {
    analyser.getByteTimeDomainData(dataArray)
    const sum = dataArray.reduce((s, a) => s + a, 0)

    console.log(sum / dataArray.length)
  }, 16)
}

// players.forEach(addUI)
players.forEach(getAudio)