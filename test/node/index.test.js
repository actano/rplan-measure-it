import { expect } from 'chai'

import {
  resetTrack, sortedTrackData, start, stop, track,
} from '../../src/node'

describe('measure-it node', () => {
  beforeEach(() => {
    resetTrack()
  })

  it('should measure runtime with start/ stop', () => {
    start('bar')
    start('foo')
    stop('foo')
    start('foo')
    stop('foo')
    stop('bar')

    const result = sortedTrackData()
    expect(result).to.have.length(2)

    const resultMap = {
      [result[0].key]: result[0],
      [result[1].key]: result[1],
    }

    expect(Object.keys(resultMap.foo)).to.have.members([
      'key', 'count', 'time', 'avg', 'min', 'max', 'p90', 'p95', 'p99',
    ])
    expect(Object.keys(resultMap.bar)).to.have.members([
      'key', 'count', 'time', 'avg', 'min', 'max', 'p90', 'p95', 'p99',
    ])


    expect(resultMap.bar.count).to.equal(1)
    expect(resultMap.bar.time).to.be.a('number')
    expect(resultMap.bar.time).to.equal(resultMap.bar.avg)
    expect(resultMap.bar.time).to.equal(resultMap.bar.min)
    expect(resultMap.bar.time).to.equal(resultMap.bar.max)

    expect(resultMap.foo.count).to.equal(2)
    expect(resultMap.foo.time).to.be.a('number')
  })

  it('should measure runtime with with given timestamp at stop', () => {
    const startTime = start('bar')
    stop('bar', 0)

    const result = sortedTrackData()

    expect(startTime).to.be.a('number')
    expect(result[0].time).to.be.least(startTime)
  })

  it('should measure runtime of tracked function', () => {
    function functionToMeasure() {
      // ..
    }

    const trackedFunction = track('foo', functionToMeasure)

    trackedFunction()
    const result = sortedTrackData()

    expect(result).to.have.length(1)
    expect(result[0].key).to.equal('foo')
  })

  describe('resetTrack', () => {
    it('should reset track data', () => {
      start('foo')
      stop('foo')

      resetTrack()

      const result = sortedTrackData()

      expect(result).to.have.length(0)
    })
  })
})
