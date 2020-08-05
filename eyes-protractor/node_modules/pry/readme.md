## Pryjs

A interactive repl for node, inspired by [pry](https://github.com/pry/pry).
##### This is a fork of [pry.js](https://github.com/blainesch/pry.js) by [blainesch](https://github.com/blainesch). The work here is highly experimental and not to be trusted.

### Installing

~~~
npm install --save-dev pry
~~~

### Usage

~~~ coffeescript
pry = require 'pry'
eval pry.it
~~~

PRYINPUTCOLOR env variable makes pryjs also color input

### Extra Commands

While you are in the prompt there are a few things you might want to do:
* `whereami` will show you exactly where you are in the code. Accepts two integers to replace the default 5 before and 5 after.
* `stop` will exit the pryjs prompt and continue through the app.
* `kill` completely stop the script.
* `wtf` display the last caught exception.
* `version` display the current version.
* `mode` switch between javascript and coffeescript mode. Defaults to javascript.
* `help` display all the available commands.
* `play` play lines of code as if you had entered them. Accepts two integers: start and end. End defaults to start.

### Examples

Examples can be found in the [examples directory](./examples).

### Screenshots

![pryjs](./assets/demo.png)
