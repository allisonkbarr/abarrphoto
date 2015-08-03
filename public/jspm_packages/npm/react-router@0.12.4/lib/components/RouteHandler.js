/* */ 
"use strict";
var React = require("react");
var RouteHandlerMixin = require("../RouteHandlerMixin");
var RouteHandler = React.createClass({
  displayName: "RouteHandler",
  mixins: [RouteHandlerMixin],
  render: function render() {
    return this.createChildRouteHandler();
  }
});
module.exports = RouteHandler;
