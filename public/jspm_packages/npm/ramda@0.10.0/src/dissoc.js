/* */ 
var _curry2 = require("./internal/_curry2");
var _pickBy = require("./internal/_pickBy");
module.exports = _curry2(function dissoc(prop, obj) {
  return _pickBy(function(val, key) {
    return key !== prop;
  }, obj);
});
