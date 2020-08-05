'use strict'
const throatPkg = require('throat')

function transactionThroat(size) {
  const throat = throatPkg(size)
  return start

  function start(func) {
    let stop
    return {
      promise: throat(run),
      resolve: () => {
        if (stop) stop()
        else throw new Error('stopped transaction before it started') // TODO
      },
    }

    function run() {
      return new Promise(resolve => {
        stop = resolve
        func()
      })
    }
  }
}

module.exports = transactionThroat
