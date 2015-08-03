/* */ 
"use strict";
var React = require("react");
var assign = require("react/lib/Object.assign");
var warning = require("react/lib/warning");
var DefaultRouteType = require("./components/DefaultRoute").type;
var NotFoundRouteType = require("./components/NotFoundRoute").type;
var RedirectType = require("./components/Redirect").type;
var Route = require("./Route");
function checkPropTypes(componentName, propTypes, props) {
  componentName = componentName || "UnknownComponent";
  for (var propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      var error = propTypes[propName](props, propName, componentName);
      if (error instanceof Error)
        warning(false, error.message);
    }
  }
}
function createRouteOptions(props) {
  var options = assign({}, props);
  var handler = options.handler;
  if (handler) {
    options.onEnter = handler.willTransitionTo;
    options.onLeave = handler.willTransitionFrom;
  }
  return options;
}
function createRouteFromReactElement(element) {
  if (!React.isValidElement(element)) {
    return ;
  }
  var type = element.type;
  var props = element.props;
  if (type.propTypes)
    checkPropTypes(type.displayName, type.propTypes, props);
  if (type === DefaultRouteType) {
    return Route.createDefaultRoute(createRouteOptions(props));
  }
  if (type === NotFoundRouteType) {
    return Route.createNotFoundRoute(createRouteOptions(props));
  }
  if (type === RedirectType) {
    return Route.createRedirect(createRouteOptions(props));
  }
  return Route.createRoute(createRouteOptions(props), function() {
    if (props.children)
      createRoutesFromReactChildren(props.children);
  });
}
function createRoutesFromReactChildren(children) {
  var routes = [];
  React.Children.forEach(children, function(child) {
    if (child = createRouteFromReactElement(child))
      routes.push(child);
  });
  return routes;
}
module.exports = createRoutesFromReactChildren;
