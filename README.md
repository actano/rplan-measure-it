[![Build Status](https://travis-ci.org/actano/rplan-measure-it.svg?branch=master)](https://travis-ci.org/actano/rplan-measure-it)

@rplan/measure-it
================

# Introduction

This is a toolkit to measures runtime.
   
# Usage

## Usage node

```javascript
import { start, stop, track } from '@rplan/measure-it'

function doSomeThing() {
    // ...    
}

start('foo')
doSomeThing()
stop('foo')

// alternative

track('bar', doSomeThing)

console.log(sortedTrackData())

```   

## Usage node async

```javascript
import { start, stop, track } from '@rplan/measure-it'

function doSomeThing() {
    // ...    
}

const startTime = start('foo')
await doSomeThing()
stop('foo', startTime)

// ...
```   

## Usage browser

```javascript
import { start, track } from '@rplan/measure-it/lib/browser'

function doSomeThing() {
    // ...    
}

const stop = start('foo')
doSomeThing()
stop()

// alternative

track('bar', doSomeThing)

// press key 'l' to log performance results to the browser console
// press key 'r' to reset results

```   
