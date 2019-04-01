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
 *     console.log(sortedTrackData())
 */

import { performance } from 'perf_hooks'

import { initTrack } from '../track'

const {
  resetTrack,
  sortedTrackData,
  start,
  stop,
  track,
} = initTrack(performance)

export {
  resetTrack,
  sortedTrackData,
  start,
  stop,
  track,
}
