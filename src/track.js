const initTrack = (performance) => {
  let trackData

  function resetTrack() {
    trackData = {}
  }

  function sortedTrackData() {
    return Object.keys(trackData)
      .map((key) => {
        const trackDataOfKey = trackData[key]
        return {
          key,
          avg: trackDataOfKey.count ? trackDataOfKey.time / trackDataOfKey.count : undefined,
          ...trackDataOfKey,
        }
      })
      .sort((a, b) =>
        b.time - a.time)
  }

  const trackSingleCall = {}

  function start(tag) {
    if (trackData[tag] == null) {
      trackData[tag] = { time: 0, count: 0 }
    }
    trackSingleCall[tag] = performance.now()
    return trackSingleCall[tag]
  }

  function stop(tag, startTime) {
    const st = startTime == null ? trackSingleCall[tag] : startTime
    const time = performance.now() - st
    trackData[tag].time += time
    trackData[tag].count += 1
    if (!trackData[tag].max || trackData[tag].max < time) {
      trackData[tag].max = time
    }
    if (!trackData[tag].min || trackData[tag].min > time) {
      trackData[tag].min = time
    }
  }


  function track(name, fn) {
    const _fn = (...args) => {
      start(name)
      const result = fn(...args)
      stop(name)
      return result
    }
    return _fn
  }

  resetTrack()

  return {
    resetTrack,
    sortedTrackData,
    start,
    stop,
    track,
  }
}

export {
  initTrack,
}
