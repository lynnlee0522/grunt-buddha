/*
 * grunt-buddha-test
 * 
 *
 * Copyright (c) 2018 lilin
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // 第一个是插件的名字，第二个是插件的描述
  grunt.registerMultiTask('buddha_test', 'Buddha\'s grace illuminates code as sunshine', function () {

    // Merge task-specific and/or target-specific options with these defaults.
    // this.options 获取在gruntfile.js文件中，配置task声明的options,函数参数是默认的task的options配置
    // 如果gruntfile.js 的task配置了同名的options时，this.options返回的就是gruntfile.js配置的，这里的默认的options配置就会被覆盖掉
    var options = this.options({
      who: 'buddha',
      commentSymbol: '//'
    });

    var testExistRegexMap = {
      'buddha': /o8888888o/
    };

    var who = options.who,
        commentSymbol = options.commentSymbol;

    var commentFilePathMap = {
      'buddha': 'assets/buddha.txt'
    };

    var commentFilePath = path.join(__dirname, commentFilePathMap[who]),
        commentContent = grunt.file.read(commentFilePath);

    // 拿到字符画每一行的内容,对换行符进行转义
    var lineCommentArr = commentContent.split(grunt.util.normalizelf('\n'));

    lineCommentArr.forEach(function(val,idx,arr) {
      // 为每一行加上注释符
        arr[idx] = commentSymbol + val;
    });
    commentContent = lineCommentArr.join(grunt.util.normalizelf('\n'));

// -------------------------------------------------------------------------------------


    // Iterate over all specified file groups.
    // 如果我们的grunt task是通过registerMultiTask注册的，不管在gruntfile.js中
    // 使用何种grunt file format声明文件配置的,都会被转成files array format
    // this.files拿到的就是转换之后的包含src，dest键值对object的数组
    this.files.forEach(function (file) {
      // Concat specified files.
      // Array.isArray(file.src) === true
      file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        // 检验文件是否存在
        if (!grunt.file.exists(filepath)) {
          // log不会中断task
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) {
        // Read file source.
        var originalFileContent = grunt.file.read(filepath),
            newFileContent= commentContent + 
                            grunt.util.normalizelf('\n') +
                            originalFileContent;
        if (testExistRegexMap[who].test(originalFileContent)) {
          return;
        }
        // 第一个是写入的路径，第二个是写入的内容
        grunt.file.write(filepath, newFileContent);
      });

      // Print a success message.
      // file.dest  --> string
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
