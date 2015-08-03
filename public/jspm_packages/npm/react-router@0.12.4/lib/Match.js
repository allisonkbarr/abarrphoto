/* */ 
"use strict";
var _prototypeProperties = function(child, staticProps, instanceProps) {
  if (staticProps)
    Object.defineProperties(child, staticProps);
  if (instanceProps)
    Object.defineProperties(child.prototype, instanceProps);
};
var _classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
var PathUtils = require("./PathUtils");
function deepSearch(route, pathname, query) {
  var childRoutes = route.childRoutes;
  if (childRoutes) {
    var match,
        childRoute;
    for (var i = 0,
        len = childRoutes.length; i < len; ++i) {
      childRoute = childRoutes[i];
      if (childRoute.isDefault || childRoute.isNotFound)
        continue;
      if (match = deepSearch(childRoute, pathname, query)) {
        match.routes.unshift(route);
        return match;
      }
    }
  }
  var defaultRoute = route.defaultRoute;
  if (defaultRoute && (params = PathUtils.extractParams(defaultRoute.path, pathname))) {
    return new Match(pathname, params, query, [route, defaultRoute]);
  }
  var notFoundRoute = route.notFoundRoute;
  if (notFoundRoute && (params = PathUtils.extractParams(notFoundRoute.path, pathname))) {
    return new Match(pathname, params, query, [route, notFoundRoute]);
  }
  var params = PathUtils.extractParams(route.path, pathname);
  if (params) {
    return new Match(pathname, params, query, [route]);
  }
  return null;
}
var Match = (function() {
  function Match(pathname, params, query, routes) {
    _classCallCheck(this, Match);
    this.pathname = pathname;
    this.params = params;
    this.query = query;
    this.routes = routes;
  }
  _prototypeProperties(Match, {findMatch: {
      value: function findMatch(routes, path) {
        var pathname = PathUtils.withoutQuery(path);
        var query = PathUtils.extractQuery(path);
        var match = null;
        for (var i = 0,
            len = routes.length; match == null && i < len; ++i)
          match = deepSearch(routes[i], pathname, query);
        return match;
      },
      writable: true,
      configurable: true
    }});
  return Match;
})();
module.exports = Match;
