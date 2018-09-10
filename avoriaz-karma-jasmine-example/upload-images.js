"use strict";

var fs = require('fs');

var http = require('http');
var Eyes = require('eyes.images').Eyes;
var RSVP = require('rsvp');

var eyes = new Eyes();
var ConsoleLogHandler = require('eyes.images').ConsoleLogHandler;
eyes.setLogHandler(new ConsoleLogHandler(true));
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
const TestResultsFormatter = require('eyes.images').TestResultsFormatter;

eyes.setBatch("Karma Example");
eyes.setHostOS('Mac OS X 10.13');
eyes.setHostingApp("PhantomJS");

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const screenshotsDir = './.tmp/screenshots/';

fs.readdir(screenshotsDir, function( err, files ) {
   const start = async () => {
      await asyncForEach(files, async (file) => {
         
         await waitFor(50)
         console.log(file)
         var image = fs.readFileSync(screenshotsDir + file);
         console.log("My Image: " + file);

         var firstTestPromise = eyes.open('Karma Jasmine Example', file).then(function () {
             return eyes.checkImage(image, file);
         }).then(function () {
             console.log('Running session: ', eyes.getRunningSession());
             return eyes.close(false);
         }, function (err) {
             console.error("An Error Occured...", err);
             return eyes.abortIfNotClosed();
         });
         
         await firstTestPromise.then(function (results) {
             var testResultsFormatter = new TestResultsFormatter();
             testResultsFormatter.addResults(results);
             console.log(`${file} Results:`, results);
         });
      
      })
      console.log('Done')
   }
   start()
})


//Or alternatively use the ImageTester CLI
// var exec = require('child_process').exec;
// var child = exec(`java -jar ImageTester.jar -a "Karma Jasmine Example" -ap "PhantomJS" -os "Mac OS X 10.13" -k ${process.env.APPLITOOLS_API_KEY} -f ./.tmp/screenshots/`,
//   function (error, stdout, stderr){
//     console.log('Output -> ' + stdout);
//     if(error !== null){
//       console.log("Error -> "+error);
//     }
// });

