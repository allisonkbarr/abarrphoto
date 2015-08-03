/* */ 
"use strict";
var PropTypes = require("./PropTypes");
var Navigation = {
  contextTypes: {
    makePath: PropTypes.func.isRequired,
    makeHref: PropTypes.func.isRequired,
    transitionTo: PropTypes.func.isRequired,
    replaceWith: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  },
  makePath: function makePath(to, params, query) {
    return this.context.makePath(to, params, query);
  },
  makeHref: function makeHref(to, params, query) {
    return this.context.makeHref(to, params, query);
  },
  transitionTo: function transitionTo(to, params, query) {
    this.context.transitionTo(to, params, query);
  },
  replaceWith: function replaceWith(to, params, query) {
    this.context.replaceWith(to, params, query);
  },
  goBack: function goBack() {
    return this.context.goBack();
  }
};
module.exports = Navigation;
