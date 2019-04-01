/**
 * usage:
 *
 *     start('foo')
 *     ... doSomeThing()
 *     stop('foo')
 *
 *     // alternative
 *
 *     trackFn('bar', doSomeThing)
 *
 *     // press key 'l' to see perfomance result in the browser console
 *     // press key 'r' to reset results
 */

import { initTrack } from '../track'

// override performance in unit tests with dummy impl
const performance = window.performance ? window.performance : { now: () => new Date().getTime() }

const {
  resetTrack,
  sortedTrackData,
  start,
  stop,
  track,
} = initTrack(performance)

function log() {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(sortedTrackData(), null, 2))
}

function handleKeyPress(e) {
  if (!e.ctrlKey) return
  if (e.key === 'r') {
    resetTrack()
    log()
  }
  if (e.key === 'l') {
    log()
  }
}

window.addEventListener('keypress', handleKeyPress)

export {
  sortedTrackData,
  start,
  stop,
  track,
}
