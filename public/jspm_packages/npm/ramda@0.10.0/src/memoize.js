/* */ 
var _map = require("./internal/_map");
var has = require("./has");
module.exports = (function() {
  var repr = function(x) {
    return x + '::' + Object.prototype.toString.call(x);
  };
  var serialize = function(args) {
    return args.length + ':{' + _map(repr, args).join(',') + '}';
  };
  return function memoize(fn) {
    var cache = {};
    return function() {
      var key = serialize(arguments);
      if (!has(key, cache)) {
        cache[key] = fn.apply(this, arguments);
      }
      return cache[key];
    };
  };
}());
