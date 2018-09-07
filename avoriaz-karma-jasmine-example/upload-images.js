"use strict";

var fs = require('fs');

var http = require('http');
var Eyes = require('eyes.images').Eyes;
var RSVP = require('rsvp');

var eyes = new Eyes();
var ConsoleLogHandler = require('eyes.images').ConsoleLogHandler;
eyes.setLogHandler(new ConsoleLogHandler(true));
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
var TestResultsFormatter = require('eyes.images').TestResultsFormatter;

eyes.setHostOS('Mac OS X 10.13');
eyes.setHostingApp("PhantomJS");

// const screenshots = './.tmp/screenshots/';
//
// fs.readdir( screenshots, function( err, files ) {
//    files.forEach( function( file, index ) {
//
//       var image = fs.readFileSync('./.tmp/screenshots/' + file);
//       console.log("My File: " + file);
//
//       var firstTestPromise = eyes.open('Karma Jasmine Example', file).then(function () {
//           return eyes.checkImage(image, file);
//       }).then(function () {
//           console.log('Running session: ', eyes.getRunningSession());
//           return eyes.close(false);
//       }, function (err) {
//           console.error("An Error Occured...", err);
//           return eyes.abortIfNotClosed();
//       });
//
//       firstTestPromise = firstTestPromise.then(function (results) {
//          // do something with results
//          // ...
//           var testResultsFormatter = new TestResultsFormatter();
//           testResultsFormatter.addResults(results);
//           console.log("first results", results);
//       });
//
//    });
// })

var exec = require('child_process').exec;
var child = exec(`java -jar ImageTester.jar -a "Karma Jasmine Example" -ap "PhantomJS" -os "Mac OS X 10.13" -k ${process.env.APPLITOOLS_API_KEY} -f ./.tmp/screenshots/`,
  function (error, stdout, stderr){
    console.log('Output -> ' + stdout);
    if(error !== null){
      console.log("Error -> "+error);
    }
});

