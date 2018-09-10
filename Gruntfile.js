/*
 * grunt-buddha-test
 * 
 *
 * Copyright (c) 2018 lilin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    buddha_test: {
      options: {
        who: 'buddha',
        commentSymbol: '//'
      },
      dist: ['test/fixtures/*.js']
    },

    // Unit tests.
    nodeunit: {
      // 指向测试脚本
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  // 从指定目录加载task相关的文件，一般用grunt加载本地的grunt插件都会用这个方法
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'buddha_test', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
