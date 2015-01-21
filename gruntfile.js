"use strict";

module.exports = function (grunt) {

  grunt.initConfig({
    'gh-pages': {
      public: {
        options: {
          base: 'public',
          message: 'Auto-generated commit using grunt-gh-pages'
        },
        src: '**/*'
      }
    }
  });

  grunt.loadNpmTasks('grunt-gh-pages');

};
