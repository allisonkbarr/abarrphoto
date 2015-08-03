/* */ 
(function(process) {
  ;
  (function(root) {
    function Grapnel(opts) {
      "use strict";
      var self = this;
      this.events = {};
      this.state = null;
      this.options = opts || {};
      this.options.env = this.options.env || (!!(Object.keys(root).length === 0 && process && process.browser !== true) ? 'server' : 'client');
      this.options.mode = this.options.mode || (!!(this.options.env !== 'server' && this.options.pushState && root.history && root.history.pushState) ? 'pushState' : 'hashchange');
      this.version = '0.5.8';
      if ('function' === typeof root.addEventListener) {
        root.addEventListener('hashchange', function() {
          self.trigger('hashchange');
        });
        root.addEventListener('popstate', function(e) {
          if (self.state && self.state.previousState === null)
            return false;
          self.trigger('navigate');
        });
      }
      this.fragment = {
        get: function() {
          var frag;
          if (self.options.mode === 'pushState') {
            frag = root.location.pathname.replace(self.options.root, '');
          } else if (self.options.mode !== 'pushState' && root.location) {
            frag = (root.location.hash) ? root.location.hash.split((self.options.hashBang ? '#!' : '#'))[1] : '';
          } else {
            frag = root._pathname || '';
          }
          return frag;
        },
        set: function(frag) {
          if (self.options.mode === 'pushState') {
            frag = (self.options.root) ? (self.options.root + frag) : frag;
            root.history.pushState({}, null, frag);
          } else if (root.location) {
            root.location.hash = (self.options.hashBang ? '!' : '') + frag;
          } else {
            root._pathname = frag || '';
          }
          return self;
        },
        clear: function() {
          if (self.options.mode === 'pushState') {
            root.history.pushState({}, null, self.options.root || '/');
          } else if (root.location) {
            root.location.hash = (self.options.hashBang) ? '!' : '';
          }
          return self;
        }
      };
      return this;
    }
    Grapnel.regexRoute = function(path, keys, sensitive, strict) {
      if (path instanceof RegExp)
        return path;
      if (path instanceof Array)
        path = '(' + path.join('|') + ')';
      path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional) {
        keys.push({
          name: key,
          optional: !!optional
        });
        slash = slash || '';
        return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
      }).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');
      return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    };
    Grapnel._forEach = function(a, callback) {
      if (typeof Array.prototype.forEach === 'function')
        return Array.prototype.forEach.call(a, callback);
      return function(c, next) {
        for (var i = 0,
            n = this.length; i < n; ++i) {
          c.call(next, this[i], i, this);
        }
      }.call(a, callback);
    };
    Grapnel.prototype.get = Grapnel.prototype.add = function(route) {
      var self = this,
          keys = [],
          middleware = Array.prototype.slice.call(arguments, 1, -1),
          handler = Array.prototype.slice.call(arguments, -1)[0],
          regex = Grapnel.regexRoute(route, keys);
      var invoke = function RouteHandler() {
        var match = self.fragment.get().match(regex);
        if (match) {
          var req = {
            params: {},
            keys: keys,
            matches: match.slice(1)
          };
          Grapnel._forEach(req.matches, function(value, i) {
            var key = (keys[i] && keys[i].name) ? keys[i].name : i;
            req.params[key] = (value) ? decodeURIComponent(value) : undefined;
          });
          var event = {
            route: route,
            value: self.fragment.get(),
            params: req.params,
            regex: match,
            stack: [],
            runCallback: true,
            callbackRan: false,
            propagateEvent: true,
            next: function() {
              return this.stack.shift().call(self, req, event, function() {
                event.next.call(event);
              });
            },
            preventDefault: function() {
              this.runCallback = false;
            },
            stopPropagation: function() {
              this.propagateEvent = false;
            },
            parent: function() {
              var hasParentEvents = !!(this.previousState && this.previousState.value && this.previousState.value == this.value);
              return (hasParentEvents) ? this.previousState : false;
            },
            callback: function() {
              event.callbackRan = true;
              event.timeStamp = Date.now();
              event.next();
            }
          };
          event.stack = middleware.concat(handler);
          self.trigger('match', event, req);
          if (!event.runCallback)
            return self;
          event.previousState = self.state;
          self.state = event;
          if (event.parent() && event.parent().propagateEvent === false) {
            event.propagateEvent = false;
            return self;
          }
          event.callback();
        }
        return self;
      };
      var eventName = (self.options.mode !== 'pushState' && self.options.env !== 'server') ? 'hashchange' : 'navigate';
      return invoke().on(eventName, invoke);
    };
    Grapnel.prototype.trigger = function(event) {
      var self = this,
          params = Array.prototype.slice.call(arguments, 1);
      if (this.events[event]) {
        Grapnel._forEach(this.events[event], function(fn) {
          fn.apply(self, params);
        });
      }
      return this;
    };
    Grapnel.prototype.on = Grapnel.prototype.bind = function(event, handler) {
      var self = this,
          events = event.split(' ');
      Grapnel._forEach(events, function(event) {
        if (self.events[event]) {
          self.events[event].push(handler);
        } else {
          self.events[event] = [handler];
        }
      });
      return this;
    };
    Grapnel.prototype.context = function(context) {
      var self = this;
      return function(value, callback) {
        var prefix = (context.slice(-1) !== '/') ? context + '/' : context,
            pattern = prefix + value;
        return self.get.call(self, pattern, callback);
      };
    };
    Grapnel.prototype.navigate = function(path) {
      return this.fragment.set(path).trigger('navigate');
    };
    Grapnel.listen = function() {
      var opts,
          routes;
      if (arguments[0] && arguments[1]) {
        opts = arguments[0];
        routes = arguments[1];
      } else {
        routes = arguments[0];
      }
      return (function() {
        for (var key in routes) {
          this.get.call(this, key, routes[key]);
        }
        return this;
      }).call(new Grapnel(opts || {}));
    };
    if ('function' === typeof root.define && !root.define.amd.grapnel) {
      root.define(function(require, exports, module) {
        root.define.amd.grapnel = true;
        return Grapnel;
      });
    } else if ('object' === typeof module && 'object' === typeof module.exports) {
      module.exports = exports = Grapnel;
    } else {
      root.Grapnel = Grapnel;
    }
  }).call({}, ('object' === typeof window) ? window : this);
})(require("process"));
