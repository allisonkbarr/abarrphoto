/* */ 
"use strict";
var LocationActions = require("../actions/LocationActions");
var History = require("../History");
function getHashPath() {
  return decodeURI(window.location.href.split("#")[1] || "");
}
var _actionType;
function ensureSlash() {
  var path = getHashPath();
  if (path.charAt(0) === "/") {
    return true;
  }
  HashLocation.replace("/" + path);
  return false;
}
var _changeListeners = [];
function notifyChange(type) {
  if (type === LocationActions.PUSH)
    History.length += 1;
  var change = {
    path: getHashPath(),
    type: type
  };
  _changeListeners.forEach(function(listener) {
    listener(change);
  });
}
var _isListening = false;
function onHashChange() {
  if (ensureSlash()) {
    notifyChange(_actionType || LocationActions.POP);
    _actionType = null;
  }
}
var HashLocation = {
  addChangeListener: function addChangeListener(listener) {
    _changeListeners.push(listener);
    ensureSlash();
    if (!_isListening) {
      if (window.addEventListener) {
        window.addEventListener("hashchange", onHashChange, false);
      } else {
        window.attachEvent("onhashchange", onHashChange);
      }
      _isListening = true;
    }
  },
  removeChangeListener: function removeChangeListener(listener) {
    _changeListeners = _changeListeners.filter(function(l) {
      return l !== listener;
    });
    if (_changeListeners.length === 0) {
      if (window.removeEventListener) {
        window.removeEventListener("hashchange", onHashChange, false);
      } else {
        window.removeEvent("onhashchange", onHashChange);
      }
      _isListening = false;
    }
  },
  push: function push(path) {
    _actionType = LocationActions.PUSH;
    window.location.hash = path;
  },
  replace: function replace(path) {
    _actionType = LocationActions.REPLACE;
    window.location.replace(window.location.pathname + window.location.search + "#" + path);
  },
  pop: function pop() {
    _actionType = LocationActions.POP;
    History.back();
  },
  getCurrentPath: getHashPath,
  toString: function toString() {
    return "<HashLocation>";
  }
};
module.exports = HashLocation;
