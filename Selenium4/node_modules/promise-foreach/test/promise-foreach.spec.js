var https = require('https')
var promiseForeach = require('../')
var assert = require('assert')

describe('#each()', function () {

  describe('Simple', function () {

    let result

    const list = [{
      firstName: 'John',
      lastName: 'Doe'
    }, {
      firstName: 'Marie',
      lastName: 'Doe'
    }]

    before(function (done) {
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
            done(err)
            return ;
          }
          result = newList
          done()
        })
    })

    it('should return a list with fullName property', function () {

      var expectedResult = [{
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe'
      }, {
        firstName: 'Marie',
        lastName: 'Doe',
        fullName: 'Marie Doe'
      }]

      assert.deepEqual(result, expectedResult)
    })

  })

  describe('Complex', function () {

    let result

    const list = [{
      firstName: 'John',
      lastName: 'Doe',
      photo_id: 1
    }, {
      firstName: 'Marie',
      lastName: 'Doe',
      photo_id: 2
    }]

    before(function (done) {
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
            done(err)
            return ;
          }
          result = newList
          done()
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
    })

    it('should return a list with photo property populated', function () {

      var expectedResult = [{
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        photo:
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'http://placehold.it/600/92c952',
          thumbnailUrl: 'http://placehold.it/150/92c952'
        }
      },
      {
        firstName: 'Marie',
        lastName: 'Doe',
        fullName: 'Marie Doe',
        photo:
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'http://placehold.it/600/771796',
          thumbnailUrl: 'http://placehold.it/150/771796'
        }
      }]

      assert.deepEqual(result, expectedResult)
    })

  })

  describe('Concurrency', function () {

    let result

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

    before(function (done) {
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
            done(err)
            return ;
          }
          result = newList
          done()
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
    })

    it('should return a list with photo and comment property populated', function () {

      var expectedResult = [{
        firstName: 'John',
        lastName: 'Doe',
        fullName: 'John Doe',
        photo:
        {
          albumId: 1,
          id: 1,
          title: 'accusamus beatae ad facilis cum similique qui sunt',
          url: 'http://placehold.it/600/92c952',
          thumbnailUrl: 'http://placehold.it/150/92c952'
        },
        comment:
        {
          "postId": 1,
          "id": 3,
          "name": "odio adipisci rerum aut animi",
          "email": "Nikita@garfield.biz",
          "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
        }
      },
      {
        firstName: 'Marie',
        lastName: 'Doe',
        fullName: 'Marie Doe',
        photo:
        {
          albumId: 1,
          id: 2,
          title: 'reprehenderit est deserunt velit ipsam',
          url: 'http://placehold.it/600/771796',
          thumbnailUrl: 'http://placehold.it/150/771796'
        },
        comment:
        {
          "postId": 1,
          "id": 4,
          "name": "alias odio sit",
          "email": "Lew@alysha.tv",
          "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
        }
      }]

      assert.deepEqual(result, expectedResult)
    })

  })
})