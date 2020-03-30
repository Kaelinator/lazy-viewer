const FAST_RATE = 2
const RATE = 1

// const players = [...document.getElementsByTagName('video')]

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
  const source = context.createMediaElementSource(video)
  console.log(source)
  source.connect(analyser)
  analyser.connect(context.destination)
  const controls = document.getElementById(`video-controls-${i}`)
  const header = document.getElementById(`ui-${i}`)

  const polling = Array(10).fill(true)
  console.log(video)

  setInterval(() => {
    analyser.getByteTimeDomainData(dataArray)
    const sum = dataArray.reduce((s, a) => s + a, 0)
    const avg = (sum / dataArray.length - 128) * (1 / video.volume)

    const isTalking = Math.abs(avg) > 3
    polling.shift()
    polling.push(isTalking)
    const hasNotTalked = polling.every(x => !x)
    video.playbackRate = hasNotTalked ? FAST_RATE : RATE
    header.innerText = `${video.playbackRate}x`
    controls.style.backgroundColor = hasNotTalked ? 'red' : 'blue'
  }, 16)
}

players.forEach(addUI)
players.forEach(getAudio)