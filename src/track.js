function compareNumbers(a, b) {
  return a - b
}

const initTrack = (performance) => {
  let trackData

  function resetTrack() {
    trackData = {}
  }

  function percentile(factor, list) {
    const sortedList = [...list].sort(compareNumbers)
    const idx = Math.round(factor * (sortedList.length - 1))
    return sortedList[idx]
  }

  function sortedTrackData() {
    return Object.keys(trackData)
      .map((key) => {
        const {
          count, time, times, ...rest
        } = trackData[key]
        const p90 = percentile(0.9, times)
        const p95 = percentile(0.95, times)
        const p99 = percentile(0.99, times)
        return {
          key,
          avg: count ? time / count : undefined,
          p90,
          p95,
          p99,
          count,
          time,
          ...rest,
        }
      })
      .sort((a, b) =>
        compareNumbers(b.time, a.time))
  }

  const trackSingleCall = {}

  function start(tag) {
    if (trackData[tag] == null) {
      trackData[tag] = { time: 0, count: 0, times: [] }
    }
    trackSingleCall[tag] = performance.now()
    return trackSingleCall[tag]
  }

  function stop(tag, startTime) {
    const st = startTime == null ? trackSingleCall[tag] : startTime
    const time = performance.now() - st
    trackData[tag].time += time
    trackData[tag].count += 1
    trackData[tag].times.push(time)
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
