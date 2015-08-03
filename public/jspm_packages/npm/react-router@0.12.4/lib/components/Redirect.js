/* */ 
"use strict";
var React = require("react");
var Configuration = require("../Configuration");
var PropTypes = require("../PropTypes");
var Redirect = React.createClass({
  displayName: "Redirect",
  mixins: [Configuration],
  propTypes: {
    path: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    handler: PropTypes.falsy
  }
});
module.exports = Redirect;
