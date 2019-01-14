var util = require('util');
var events = require('events');
var Eyes = require('eyes.selenium').Eyes;

function EyesInit() {
  events.EventEmitter.call(this);
}

util.inherits(EyesInit, events.EventEmitter);

EyesInit.prototype.command = function() {
  console.log('open eyes called '+ p1);
  this.globals.Eyes = new Eyes();
  //this.emit('complete');
  return this;
};

console.log('NightEyes was called');

module.exports = EyesInit;
