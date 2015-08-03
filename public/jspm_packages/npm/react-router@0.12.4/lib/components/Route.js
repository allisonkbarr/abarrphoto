/* */ 
"use strict";
var React = require("react");
var Configuration = require("../Configuration");
var PropTypes = require("../PropTypes");
var RouteHandler = require("./RouteHandler");
var Route = React.createClass({
  displayName: "Route",
  mixins: [Configuration],
  propTypes: {
    name: PropTypes.string,
    path: PropTypes.string,
    handler: PropTypes.func,
    ignoreScrollBehavior: PropTypes.bool
  },
  getDefaultProps: function getDefaultProps() {
    return {handler: RouteHandler};
  }
});
module.exports = Route;
