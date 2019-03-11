'use strict'
 
const fs = require('fs')
const smta = require('sitemap-to-array')

const data = fs.readFileSync('selenium.xml', 'utf-8')
var array = [];
const options = { returnOnComplete: true };
smta(data, options, (error, list) => {
  for (var url in list) {
     array.push(list[url]);
   }
});

Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize) {
        var that = this;
        return Array(Math.ceil(that.length/chunkSize)).fill().map(function(_,i){
            return that.slice(i*chunkSize,i*chunkSize+chunkSize);
        });
    }
});

chunkArray = array.chunk(3);