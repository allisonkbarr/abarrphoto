/* */ 
var _extend = require("./internal/_extend");
var op = require("./op");
module.exports = op(function merge(a, b) {
  return _extend(_extend({}, a), b);
});
