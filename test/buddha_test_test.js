'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.buddha_test = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  // 测试单元
  default_options: function (test) {
    // 用来声明这个测试单元内有多少个断言要执行,确保所有的cb和assert都被执行到
    test.expect(1);

    // 将实际生成的合并后的文件读取进来
    var actual = grunt.file.read('test/fixtures/test1.js');
    // 将测试用例中提前写好的认为正确的文件读取进来
    var expected = grunt.file.read('test/expected/default_options');
    // 比较这两个文件是否相等
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function (test) {
    test.expect(1);
    var actual = grunt.file.read('test/fixtures/test1.js');
    var expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  }
};
