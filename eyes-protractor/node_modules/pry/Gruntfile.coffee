{execSync} = require 'child_process'

module.exports = (grunt) ->

  grunt.initConfig
    coffee:
      compile:
        expand: true
        cwd: './src/'
        src: ['**/*.coffee']
        dest: './lib/'
        ext: '.js'
    clean:
      compiled:
        src: ["lib/**/*"]
        options:
          "no-write": false

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.registerTask 'default', ['clean:compiled', 'coffee']
  grunt.registerTask 'copyLibs', -> execSync "cp -r src/libs lib/"
  grunt.registerTask 'createExec', -> execSync "echo '#!/usr/bin/env node' | cat - lib/pry.js > lib/pry.bin.js && chmod +x lib/pry.bin.js"
