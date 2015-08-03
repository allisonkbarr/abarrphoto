/* */ 
(function(process) {
  var __ = require("./__");
  var _noArgsException = require("./internal/_noArgsException");
  var flip = require("./flip");
  var partial = require("./partial");
  module.exports = function op(fn) {
    if (fn.length !== 2) {
      throw new Error('Expected binary function.');
    }
    return function _op(a, b) {
      switch (arguments.length) {
        case 0:
          throw _noArgsException();
        case 1:
          return a === __ ? flip(_op) : partial(fn, a);
        default:
          return a === __ ? flip(fn)(b) : fn(a, b);
      }
    };
  };
})(require("process"));
