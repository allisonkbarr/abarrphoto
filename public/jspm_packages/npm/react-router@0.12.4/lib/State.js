/* */ 
"use strict";
var PropTypes = require("./PropTypes");
var State = {
  contextTypes: {
    getCurrentPath: PropTypes.func.isRequired,
    getCurrentRoutes: PropTypes.func.isRequired,
    getCurrentPathname: PropTypes.func.isRequired,
    getCurrentParams: PropTypes.func.isRequired,
    getCurrentQuery: PropTypes.func.isRequired,
    isActive: PropTypes.func.isRequired
  },
  getPath: function getPath() {
    return this.context.getCurrentPath();
  },
  getRoutes: function getRoutes() {
    return this.context.getCurrentRoutes();
  },
  getPathname: function getPathname() {
    return this.context.getCurrentPathname();
  },
  getParams: function getParams() {
    return this.context.getCurrentParams();
  },
  getQuery: function getQuery() {
    return this.context.getCurrentQuery();
  },
  isActive: function isActive(to, params, query) {
    return this.context.isActive(to, params, query);
  }
};
module.exports = State;
