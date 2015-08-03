/* */ 
var has = require("./has");
var keys = require("./keys");
module.exports = function invert(obj) {
  var props = keys(obj);
  var len = props.length;
  var idx = -1;
  var out = {};
  while (++idx < len) {
    var key = props[idx];
    var val = obj[key];
    if (!has(val, out)) {
      out[val] = [];
    }
    out[val].push(key);
  }
  return out;
};
