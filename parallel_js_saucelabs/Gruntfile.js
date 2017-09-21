'use strict';
var os = require('os');
var path = require('path');

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
        mocha_parallel: {
            options: {
                args: function(suiteName) {
                    return [];
                },
                env: function(suiteName) {
                    process.env.BROWSER  = grunt.option('browser');
                    process.env.VERSION  = grunt.option('version');
                    process.env.PLATFORM = grunt.option('platform');
                    return process.env;
                },
                report: function(suite, code, stdout, stderr) {
                    if (stdout.length) {
                      process.stdout.write(stdout);
                    }
                    if (stderr.length) {
                      process.stderr.write(stderr);
                    }
                },
                done: function(success, results) {
                },
                mocha: path.join('node_modules', '.bin', 'mocha') + (/win32/.test(os.platform()) ? '.cmd' : ''),
                //this is the default concurrency, change as needed.
                concurrency: os.cpus().length * 1.5
            }
        },

        parallel: {
            assets: {
                options: {
                    grunt: true
                },
                tasks: [
                            'run_windows10_chrome',
                            'run_Windows10_firefox',
                            'run_Windows8_IE',
                            'run_OSX10.10_chrome'
                        ]
            }
        }
    });

    //https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
    // load tasks
    grunt.loadNpmTasks('grunt-mocha-parallel');
    grunt.loadNpmTasks('grunt-parallel');

    grunt.registerTask('Windows10_chrome', function(n) {
      grunt.option('browser', 'chrome');
      grunt.option('version', '59.0');
      grunt.option('platform', "Windows 10");
    });

    grunt.registerTask('Windows10_firefox', function(n) {
      grunt.option('browser', 'firefox');
      grunt.option('version', '49.0');
      grunt.option('platform', "Windows 10");
    });

    grunt.registerTask('Windows8_IE', function(n) {
      grunt.option('browser', 'internet explorer');
      grunt.option('version', '10.0');
      grunt.option('platform', "Windows 8");
    });

    grunt.registerTask('OSX10.10_chrome_54', function(n) {
      grunt.option('browser', 'chrome');
      grunt.option('version', '54.0');
      grunt.option('platform', "OS X 10.10");
    });

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_windows10_chrome',  ['Windows10_chrome',   'mocha_parallel']);
    grunt.registerTask('run_Windows10_firefox', ['Windows10_firefox',  'mocha_parallel']);
    grunt.registerTask('run_Windows8_IE',       ['Windows8_IE',        'mocha_parallel']);
    grunt.registerTask('run_OSX10.10_chrome',   ['OSX10.10_chrome_54', 'mocha_parallel']);
};
