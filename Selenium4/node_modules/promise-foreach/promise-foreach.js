
exports.each = function (arr = [], iterable = [], onStepDone = ()=>{}, onDone = ()=>{}) {
  if (typeof iterable == 'function') {
    iterable = [iterable]
  }

  let jobs = []

  arr.forEach( currentValue => {

    const tasks = iterable.map( currentFunction => {
      let cf = currentFunction(currentValue)
      if (!cf instanceof Promise) cf = Promise.resolve(cf)
      return cf
    })

    const promiseAll = Promise.all(tasks).then( values => {
      return onStepDone(values, currentValue)
    })

    jobs.push(promiseAll)
  })

  Promise.all(jobs).catch( err => {
    onDone(err, null)
  }).then( values => {
    onDone(null, values)
  })
}