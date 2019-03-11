# promise-foreach
This is a simple implementation of foreach based on promises.

Works great in the browser with [browserify](http://github.com/substack/node-browserify).

### Installation
`$ npm install promise-foreach`

### Usage
###### Simple case
```javascript
const promiseForeach = require('promise-foreach')

const list = [{
  firstName: 'John',
  lastName: 'Doe'
}, {
  firstName: 'Marie',
  lastName: 'Doe'
}]

promiseForeach.each(list,
  person => {
    return `${person.firstName} ${person.lastName}`
  },
  (arrResult, person) => {
    return {
      firstName: person.firstName,
      lastName: person.lastName,
      fullName: arrResult[0]
    }
  },
  (err, newList) => {
    if (err) {
      console.error(err)
      return ;
    }
    console.log('newList : ', newList)
  })
```

###### Complex case
```javascript
const https = require('https');
const promiseForeach = require('promise-foreach')

const list = [{
  firstName: 'John',
  lastName: 'Doe',
  photo_id: 1
}, {
  firstName: 'Marie',
  lastName: 'Doe',
  photo_id: 2
}]

promiseForeach.each(list,
  [
    person => {
      return `${person.firstName} ${person.lastName}`
    },
    person => {
      return asyncGetPhoto(person.photo_id)
    }
  ],
  (arrResult, person) => {
    return {
      firstName: person.firstName,
      lastName: person.lastName,
      fullName: arrResult[0],
      photo: arrResult[1]
    }
  },
  (err, newList) => {
    if (err) {
      console.error(err)
      return ;
    }
    console.log('newList : ', newList)
  })

function asyncGetPhoto(photo_id) {
  return new Promise(function (resolve, reject) {
    var request = https.get('https://jsonplaceholder.typicode.com/photos/' + photo_id, function (response) {
      var body = []
      response.on('data', function (chunk) {
        body.push(chunk)
      })
      response.on('end', function () {
        resolve(JSON.parse(body.join('')))
      })
    })
    request.on('error', function (err) {
      reject(err)
    })
  })
}
```

###### Concurrency case
```javascript
const https = require('https');
const promiseForeach = require('promise-foreach')

const list = [{
  firstName: 'John',
  lastName: 'Doe',
  photo_id: 1,
  comment_id: 3
}, {
  firstName: 'Marie',
  lastName: 'Doe',
  photo_id: 2,
  comment_id: 4
}]

promiseForeach.each(list,
  [
    person => {
      return `${person.firstName} ${person.lastName}`
    },
    person => {
      return asyncGetPhoto(person.photo_id)
    },
    person => {
      return asyncGetComment(person.comment_id)
    }
  ],
  (arrResult, person) => {
    return {
      firstName: person.firstName,
      lastName: person.lastName,
      fullName: arrResult[0],
      photo: arrResult[1],
      comment: arrResult[2]
    }
  },
  (err, newList) => {
    if (err) {
      console.error(err)
      return ;
    }
    console.log('newList : ', newList)
  })

function asyncGetPhoto(photo_id) {
  return new Promise(function (resolve, reject) {
    var request = https.get('https://jsonplaceholder.typicode.com/photos/' + photo_id, function (response) {
      var body = []
      response.on('data', function (chunk) {
        body.push(chunk)
      })
      response.on('end', function () {
        setTimeout(function () {
          resolve(JSON.parse(body.join('')))
        }, 1000)
      })
    })
    request.on('error', function (err) {
      reject(err)
    })
  })
}
function asyncGetComment(comment_id) {
  return new Promise(function (resolve, reject) {
    var request = https.get('https://jsonplaceholder.typicode.com/comments/' + comment_id, function (response) {
      var body = []
      response.on('data', function (chunk) {
        body.push(chunk)
      })
      response.on('end', function () {
        resolve(JSON.parse(body.join('')))
      })
    })
    request.on('error', function (err) {
      reject(err)
    })
  })
}
```

###### Browser case
`$ browserify -r promise-foreach > modules.js`

```html
<script src="modules.js"></script>

<script>
  const promiseForeach = require('promise-foreach');
</script>

<script>
const list = [{
  firstName: 'John',
  lastName: 'Doe',
  photo_id: 1
}, {
  firstName: 'Marie',
  lastName: 'Doe',
  photo_id: 2
}]

promiseForeach.each(list,
  [
    person => {
      return `${person.firstName} ${person.lastName}`
    },
    person => {
      return asyncGetPhoto(person.photo_id)
    }
  ],
  (arrResult, person) => {
    return {
      firstName: person.firstName,
      lastName: person.lastName,
      fullName: arrResult[0],
      photo: arrResult[1]
    }
  },
  (err, newList) => {
    if (err) {
      console.error(err)
      return ;
    }
    console.log('newList : ', newList)
  })

function asyncGetPhoto(photo_id){
    return new Promise(function(resolve, reject){
      var request = new Request('https://jsonplaceholder.typicode.com/photos/' + photo_id,{
        method: 'GET'
      })
      fetch(request).then(function(response){
        resolve(response.json())
      })
      .catch(function(error){
        reject(error)
      })
    })
  }
</script>
```

### Tests

To run the package's test, first install the dependencies, then run `npm test`:

```
$ npm install
$ npm test
```

### License

MIT License
