var util = require('util');
var events = require('events');

function EyesOpen() {
  events.EventEmitter.call(this);
}

util.inherits(EyesOpen, events.EventEmitter);

EyesOpen.prototype.command = function(p1) {
  console.log('open eyes called '+ p1);
  console.log(this.globals.Eyes);
  this.emit('complete');
  return this;
};

console.log('NightEyes was called');

module.exports = EyesOpen;
