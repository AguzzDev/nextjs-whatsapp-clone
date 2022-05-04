export const recordAudio = {
  startAudio: getMedia.then((s) => {
    const audios = []

    const mediaRecorder = new MediaRecorder(s)
    mediaRecorder.start()
    mediaRecorder.addEventListener("dataavailable", (e) => {
      audios.push(e.data)
    })
  }),
  stopAudio: () => {
    const mimeType = mediaRecorder.mimeType
    
    mediaRecorder.addEventListener("stop", () => {
      const blob = new Blob(audios, { type: mimeType })
      setAudio(blob)
    })
    mediaRecorder.stop()
  },
  cancelAudio: () => {
    mediaRecorder.stop()
  },
}
