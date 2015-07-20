/*
 * grunt-decompress-gzip
 * https://github.com/Succo/grunt-decompress-gzip
 *
 * Copyright (c) 2015 fabrice
 * Licensed under the MIT license.
 */
var zlib = require('zlib');
var fs = require('fs');
'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('decompress_gzip', 'Plugin to decompress gziped files', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
          punctuation: '.',
          separator: ', '
        });
        var done = this.async();
        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
          // Concat specified files.
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var gunzip = zlib.createGunzip();

                var rstream = fs.createReadStream(filepath);
                var wstream = fs.createWriteStream(f.dest);
                  
                wstream.on('open', function(){
                    rstream
                    .pipe(gunzip)
                    .pipe(wstream)  
                    .on('finish', function () {  
                        console.log('done decompressing');
                        done();
                    });
                })
            });
        });
    });
};
