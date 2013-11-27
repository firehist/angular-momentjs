/**
 * grunt-angular-translate
 * https://github.com/firehist/grunt-angular-translate
 * 
 * Copyright (c) 2013 "firehist" Benjamin Longearet, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var userConfig = require('./build.config.js');

  // Project configuration.
  var taskConfig = {

    pkg: grunt.file.readJSON("package.json"),

    meta: {
      banner: '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' */\n'
    },

    jshint: {
      src: [
        '<%= app_files.jshint %>'
      ],
      test: [
        '<%= app_files.jsunit %>'
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        evil: true,
        boss: true,
        eqnull: true
      },
      globals: {}
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      build: ['bin'],
      test: ['tmp']
    },

    /**
     * Increments the version number, etc.
     */
    bump: {
      options: {
        files: [
          "bower.json",
          "package.json"
        ],
        commit: true,
        commitMessage: 'chore(release): v%VERSION%',
        commitFiles: [
          "bower.json",
          "package.json"
        ],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin'
      }
    },

    /**
     * Concat file to provide a single js file
     */
    concat: {
      build: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: '<%= app_files.js %>',
        dest: '<%= compile_dir %>/<%= pkg.name %>.js'
      }
    },

    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= compile_dir %>/<%= pkg.name %>.min.js': '<%= compile_dir %>/<%= pkg.name %>.js'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('build', ['clean:build', 'jshint:src', 'concat:build', 'uglify:compile']);
  grunt.registerTask('test', ['clean:test', 'nodeunit', 'clean:test']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};