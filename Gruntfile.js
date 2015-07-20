/*
 * grunt-decompress-gzip
 * https://github.com/Succo/grunt-decompress-gzip
 *
 * Copyright (c) 2015 fabrice
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/output.txt']
    },

    // Configuration to be run (and then tested).
    decompress_gzip: {
      default_options: {
        options: {
        },
        files: {
          'test/output.txt': 'test/version.txt'
        }
      },
    },

    // Unit tests.

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first removes the test/output.txt file, then run the plugindefault task
  grunt.registerTask('test', ['clean', 'decompress_gzip']);

};
