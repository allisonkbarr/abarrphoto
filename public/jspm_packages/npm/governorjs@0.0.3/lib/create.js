/* */ 
var R = require("ramda");
var React = require("react/addons");
var createHub = require("./hub");
module.exports = function(links, output) {
  var hub = createHub();
  var nestedPath = function(delta, path) {
    return path ? R.assocPath(path, delta, {}) : delta;
  };
  var swap = (function() {
    var state = {};
    return function(path, delta) {
      return delta ? (state = React.addons.update(state, nestedPath(delta, path))) : (path ? R.path(path, state) : state);
    };
  })();
  var render = R.ifElse(function() {
    return stores;
  }, R.compose(R.partialRight(output, hub), swap), swap);
  var stores = R.toPairs(links).map(function(link) {
    var path = link[0],
        Store = link[1];
    return Store({
      set: render.bind(null, path),
      get: swap.bind(null, path)
    }, hub);
  });
  hub.set = render.bind(null, 'view');
  hub.get = swap.bind(null, 'view');
  swap('view', {$set: {}});
  render();
  return {hub: hub};
};
