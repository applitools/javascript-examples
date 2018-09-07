

module.exports = {
   takeScreenshot: function() {
      var options = {type: 'render'};
      // if the file argument is defined, we'll save the file in the path defined eg: `fname: '/tmp/myscreen.png'
      // otherwise we'll save it in the default directory with a progressive name
      options.fname = file || '.tmp/screenshots/' + (renderId++) + '.png';

      // this calls the onCallback function of PhantomJS, the type: 'render' will trigger the screenshot script
      window.top.callPhantom(options);
   }
}

// var renderId = 0;
// function takeScreenshot(file) {
//     // check if we are in PhantomJS
//     //if (window.top.callPhantom === undefined) return;
//
//     var options = {type: 'render'};
//     // if the file argument is defined, we'll save the file in the path defined eg: `fname: '/tmp/myscreen.png'
//     // otherwise we'll save it in the default directory with a progressive name
//     options.fname = file || '.tmp/screenshots/' + (renderId++) + '.png';
//
//     // this calls the onCallback function of PhantomJS, the type: 'render' will trigger the screenshot script
//     window.top.callPhantom(options);
// }