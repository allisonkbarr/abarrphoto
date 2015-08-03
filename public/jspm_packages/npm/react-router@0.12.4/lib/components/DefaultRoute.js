/* */ 
"use strict";
var React = require("react");
var Configuration = require("../Configuration");
var PropTypes = require("../PropTypes");
var DefaultRoute = React.createClass({
  displayName: "DefaultRoute",
  mixins: [Configuration],
  propTypes: {
    name: PropTypes.string,
    path: PropTypes.falsy,
    children: PropTypes.falsy,
    handler: PropTypes.func.isRequired
  }
});
module.exports = DefaultRoute;
