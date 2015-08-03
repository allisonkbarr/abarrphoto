/* */ 
"use strict";
var React = require("react");
var classSet = require("react/lib/cx");
var assign = require("react/lib/Object.assign");
var Navigation = require("../Navigation");
var State = require("../State");
var PropTypes = require("../PropTypes");
var Route = require("../Route");
function isLeftClickEvent(event) {
  return event.button === 0;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var Link = React.createClass({
  displayName: "Link",
  mixins: [Navigation, State],
  propTypes: {
    activeClassName: PropTypes.string.isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Route)]),
    params: PropTypes.object,
    query: PropTypes.object,
    activeStyle: PropTypes.object,
    onClick: PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {activeClassName: "active"};
  },
  handleClick: function handleClick(event) {
    var allowTransition = true;
    var clickResult;
    if (this.props.onClick)
      clickResult = this.props.onClick(event);
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return ;
    }
    if (clickResult === false || event.defaultPrevented === true)
      allowTransition = false;
    event.preventDefault();
    if (allowTransition)
      this.transitionTo(this.props.to, this.props.params, this.props.query);
  },
  getHref: function getHref() {
    return this.makeHref(this.props.to, this.props.params, this.props.query);
  },
  getClassName: function getClassName() {
    var classNames = {};
    if (this.props.className)
      classNames[this.props.className] = true;
    if (this.getActiveState())
      classNames[this.props.activeClassName] = true;
    return classSet(classNames);
  },
  getActiveState: function getActiveState() {
    return this.isActive(this.props.to, this.props.params, this.props.query);
  },
  render: function render() {
    var props = assign({}, this.props, {
      href: this.getHref(),
      className: this.getClassName(),
      onClick: this.handleClick
    });
    if (props.activeStyle && this.getActiveState())
      props.style = props.activeStyle;
    return React.DOM.a(props, this.props.children);
  }
});
module.exports = Link;
