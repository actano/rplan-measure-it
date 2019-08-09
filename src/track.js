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

  function stop(tag, startTime) {
    return function () {
      const time = performance.now() - startTime
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
  }

  function start(tag) {
    if (trackData[tag] == null) {
      trackData[tag] = { time: 0, count: 0, times: [] }
    }
    return stop(tag, performance.now())
  }

  function track(name, fn) {
    const _fn = (...args) => {
      const _stop = start(name)
      const result = fn(...args)
      _stop()
      return result
    }
    return _fn
  }

  resetTrack()

  return {
    resetTrack,
    sortedTrackData,
    start,
    track,
  }
}

export {
  initTrack,
}
