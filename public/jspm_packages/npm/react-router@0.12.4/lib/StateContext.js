/* */ 
"use strict";
var assign = require("react/lib/Object.assign");
var PropTypes = require("./PropTypes");
var PathUtils = require("./PathUtils");
function routeIsActive(activeRoutes, routeName) {
  return activeRoutes.some(function(route) {
    return route.name === routeName;
  });
}
function paramsAreActive(activeParams, params) {
  for (var property in params)
    if (String(activeParams[property]) !== String(params[property])) {
      return false;
    }
  return true;
}
function queryIsActive(activeQuery, query) {
  for (var property in query)
    if (String(activeQuery[property]) !== String(query[property])) {
      return false;
    }
  return true;
}
var StateContext = {
  getCurrentPath: function getCurrentPath() {
    return this.state.path;
  },
  getCurrentRoutes: function getCurrentRoutes() {
    return this.state.routes.slice(0);
  },
  getCurrentPathname: function getCurrentPathname() {
    return this.state.pathname;
  },
  getCurrentParams: function getCurrentParams() {
    return assign({}, this.state.params);
  },
  getCurrentQuery: function getCurrentQuery() {
    return assign({}, this.state.query);
  },
  isActive: function isActive(to, params, query) {
    if (PathUtils.isAbsolute(to)) {
      return to === this.state.path;
    }
    return routeIsActive(this.state.routes, to) && paramsAreActive(this.state.params, params) && (query == null || queryIsActive(this.state.query, query));
  },
  childContextTypes: {
    getCurrentPath: PropTypes.func.isRequired,
    getCurrentRoutes: PropTypes.func.isRequired,
    getCurrentPathname: PropTypes.func.isRequired,
    getCurrentParams: PropTypes.func.isRequired,
    getCurrentQuery: PropTypes.func.isRequired,
    isActive: PropTypes.func.isRequired
  },
  getChildContext: function getChildContext() {
    return {
      getCurrentPath: this.getCurrentPath,
      getCurrentRoutes: this.getCurrentRoutes,
      getCurrentPathname: this.getCurrentPathname,
      getCurrentParams: this.getCurrentParams,
      getCurrentQuery: this.getCurrentQuery,
      isActive: this.isActive
    };
  }
};
module.exports = StateContext;
