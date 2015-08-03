"format register";
System.register("npm:process@0.10.1/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return ;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/escapeTextForBrowser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ESCAPE_LOOKUP = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    "\"": "&quot;",
    "'": "&#x27;"
  };
  var ESCAPE_REGEX = /[&><"']/g;
  function escaper(match) {
    return ESCAPE_LOOKUP[match];
  }
  function escapeTextForBrowser(text) {
    return ('' + text).replace(ESCAPE_REGEX, escaper);
  }
  module.exports = escapeTextForBrowser;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/memoizeStringOnly", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function memoizeStringOnly(callback) {
    var cache = {};
    return function(string) {
      if (cache.hasOwnProperty(string)) {
        return cache[string];
      } else {
        return cache[string] = callback.call(this, string);
      }
    };
  }
  module.exports = memoizeStringOnly;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/emptyFunction", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }
  function emptyFunction() {}
  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function() {
    return this;
  };
  emptyFunction.thatReturnsArgument = function(arg) {
    return arg;
  };
  module.exports = emptyFunction;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/keyMirror", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var keyMirror = function(obj) {
      var ret = {};
      var key;
      ("production" !== process.env.NODE_ENV ? invariant(obj instanceof Object && !Array.isArray(obj), 'keyMirror(...): Argument must be an object.') : invariant(obj instanceof Object && !Array.isArray(obj)));
      for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        ret[key] = key;
      }
      return ret;
    };
    module.exports = keyMirror;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/PooledClass", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var oneArgumentPooler = function(copyFieldsFrom) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance;
      } else {
        return new Klass(copyFieldsFrom);
      }
    };
    var twoArgumentPooler = function(a1, a2) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2);
        return instance;
      } else {
        return new Klass(a1, a2);
      }
    };
    var threeArgumentPooler = function(a1, a2, a3) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3);
        return instance;
      } else {
        return new Klass(a1, a2, a3);
      }
    };
    var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4, a5);
        return instance;
      } else {
        return new Klass(a1, a2, a3, a4, a5);
      }
    };
    var standardReleaser = function(instance) {
      var Klass = this;
      ("production" !== process.env.NODE_ENV ? invariant(instance instanceof Klass, 'Trying to release an instance into a pool of a different type.') : invariant(instance instanceof Klass));
      if (instance.destructor) {
        instance.destructor();
      }
      if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance);
      }
    };
    var DEFAULT_POOL_SIZE = 10;
    var DEFAULT_POOLER = oneArgumentPooler;
    var addPoolingTo = function(CopyConstructor, pooler) {
      var NewKlass = CopyConstructor;
      NewKlass.instancePool = [];
      NewKlass.getPooled = pooler || DEFAULT_POOLER;
      if (!NewKlass.poolSize) {
        NewKlass.poolSize = DEFAULT_POOL_SIZE;
      }
      NewKlass.release = standardReleaser;
      return NewKlass;
    };
    var PooledClass = {
      addPoolingTo: addPoolingTo,
      oneArgumentPooler: oneArgumentPooler,
      twoArgumentPooler: twoArgumentPooler,
      threeArgumentPooler: threeArgumentPooler,
      fiveArgumentPooler: fiveArgumentPooler
    };
    module.exports = PooledClass;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/Object.assign", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function assign(target, sources) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }
    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource == null) {
        continue;
      }
      var from = Object(nextSource);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
    }
    return to;
  }
  ;
  module.exports = assign;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactCurrentOwner", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactCurrentOwner = {current: null};
  module.exports = ReactCurrentOwner;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactRootIndex", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactRootIndexInjection = {injectCreateReactRootIndex: function(_createReactRootIndex) {
      ReactRootIndex.createReactRootIndex = _createReactRootIndex;
    }};
  var ReactRootIndex = {
    createReactRootIndex: null,
    injection: ReactRootIndexInjection
  };
  module.exports = ReactRootIndex;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/emptyObject", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var emptyObject = {};
    if ("production" !== process.env.NODE_ENV) {
      Object.freeze(emptyObject);
    }
    module.exports = emptyObject;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/CallbackQueue", ["npm:react@0.12.2/lib/PooledClass", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var PooledClass = require("npm:react@0.12.2/lib/PooledClass");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function CallbackQueue() {
      this._callbacks = null;
      this._contexts = null;
    }
    assign(CallbackQueue.prototype, {
      enqueue: function(callback, context) {
        this._callbacks = this._callbacks || [];
        this._contexts = this._contexts || [];
        this._callbacks.push(callback);
        this._contexts.push(context);
      },
      notifyAll: function() {
        var callbacks = this._callbacks;
        var contexts = this._contexts;
        if (callbacks) {
          ("production" !== process.env.NODE_ENV ? invariant(callbacks.length === contexts.length, "Mismatched list of contexts in callback queue") : invariant(callbacks.length === contexts.length));
          this._callbacks = null;
          this._contexts = null;
          for (var i = 0,
              l = callbacks.length; i < l; i++) {
            callbacks[i].call(contexts[i]);
          }
          callbacks.length = 0;
          contexts.length = 0;
        }
      },
      reset: function() {
        this._callbacks = null;
        this._contexts = null;
      },
      destructor: function() {
        this.reset();
      }
    });
    PooledClass.addPoolingTo(CallbackQueue);
    module.exports = CallbackQueue;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactPerf", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactPerf = {
      enableMeasure: false,
      storedMeasure: _noMeasure,
      measure: function(objName, fnName, func) {
        if ("production" !== process.env.NODE_ENV) {
          var measuredFunc = null;
          var wrapper = function() {
            if (ReactPerf.enableMeasure) {
              if (!measuredFunc) {
                measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
              }
              return measuredFunc.apply(this, arguments);
            }
            return func.apply(this, arguments);
          };
          wrapper.displayName = objName + '_' + fnName;
          return wrapper;
        }
        return func;
      },
      injection: {injectMeasure: function(measure) {
          ReactPerf.storedMeasure = measure;
        }}
    };
    function _noMeasure(objName, fnName, func) {
      return func;
    }
    module.exports = ReactPerf;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/Transaction", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var Mixin = {
      reinitializeTransaction: function() {
        this.transactionWrappers = this.getTransactionWrappers();
        if (!this.wrapperInitData) {
          this.wrapperInitData = [];
        } else {
          this.wrapperInitData.length = 0;
        }
        this._isInTransaction = false;
      },
      _isInTransaction: false,
      getTransactionWrappers: null,
      isInTransaction: function() {
        return !!this._isInTransaction;
      },
      perform: function(method, scope, a, b, c, d, e, f) {
        ("production" !== process.env.NODE_ENV ? invariant(!this.isInTransaction(), 'Transaction.perform(...): Cannot initialize a transaction when there ' + 'is already an outstanding transaction.') : invariant(!this.isInTransaction()));
        var errorThrown;
        var ret;
        try {
          this._isInTransaction = true;
          errorThrown = true;
          this.initializeAll(0);
          ret = method.call(scope, a, b, c, d, e, f);
          errorThrown = false;
        } finally {
          try {
            if (errorThrown) {
              try {
                this.closeAll(0);
              } catch (err) {}
            } else {
              this.closeAll(0);
            }
          } finally {
            this._isInTransaction = false;
          }
        }
        return ret;
      },
      initializeAll: function(startIndex) {
        var transactionWrappers = this.transactionWrappers;
        for (var i = startIndex; i < transactionWrappers.length; i++) {
          var wrapper = transactionWrappers[i];
          try {
            this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
            this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
          } finally {
            if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
              try {
                this.initializeAll(i + 1);
              } catch (err) {}
            }
          }
        }
      },
      closeAll: function(startIndex) {
        ("production" !== process.env.NODE_ENV ? invariant(this.isInTransaction(), 'Transaction.closeAll(): Cannot close transaction when none are open.') : invariant(this.isInTransaction()));
        var transactionWrappers = this.transactionWrappers;
        for (var i = startIndex; i < transactionWrappers.length; i++) {
          var wrapper = transactionWrappers[i];
          var initData = this.wrapperInitData[i];
          var errorThrown;
          try {
            errorThrown = true;
            if (initData !== Transaction.OBSERVED_ERROR) {
              wrapper.close && wrapper.close.call(this, initData);
            }
            errorThrown = false;
          } finally {
            if (errorThrown) {
              try {
                this.closeAll(i + 1);
              } catch (e) {}
            }
          }
        }
        this.wrapperInitData.length = 0;
      }
    };
    var Transaction = {
      Mixin: Mixin,
      OBSERVED_ERROR: {}
    };
    module.exports = Transaction;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactPropTypeLocations", ["npm:react@0.12.2/lib/keyMirror"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var keyMirror = require("npm:react@0.12.2/lib/keyMirror");
  var ReactPropTypeLocations = keyMirror({
    prop: null,
    context: null,
    childContext: null
  });
  module.exports = ReactPropTypeLocations;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/monitorCodeUse", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function monitorCodeUse(eventName, data) {
      ("production" !== process.env.NODE_ENV ? invariant(eventName && !/[^a-z0-9_]/.test(eventName), 'You must provide an eventName using only the characters [a-z0-9_]') : invariant(eventName && !/[^a-z0-9_]/.test(eventName)));
    }
    module.exports = monitorCodeUse;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactEmptyComponent", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var component;
    var nullComponentIdsRegistry = {};
    var ReactEmptyComponentInjection = {injectEmptyComponent: function(emptyComponent) {
        component = ReactElement.createFactory(emptyComponent);
      }};
    function getEmptyComponent() {
      ("production" !== process.env.NODE_ENV ? invariant(component, 'Trying to return null from a render, but no null placeholder component ' + 'was injected.') : invariant(component));
      return component();
    }
    function registerNullComponentID(id) {
      nullComponentIdsRegistry[id] = true;
    }
    function deregisterNullComponentID(id) {
      delete nullComponentIdsRegistry[id];
    }
    function isNullComponentID(id) {
      return nullComponentIdsRegistry[id];
    }
    var ReactEmptyComponent = {
      deregisterNullComponentID: deregisterNullComponentID,
      getEmptyComponent: getEmptyComponent,
      injection: ReactEmptyComponentInjection,
      isNullComponentID: isNullComponentID,
      registerNullComponentID: registerNullComponentID
    };
    module.exports = ReactEmptyComponent;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactErrorUtils", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactErrorUtils = {guard: function(func, name) {
      return func;
    }};
  module.exports = ReactErrorUtils;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactLegacyElement", ["npm:react@0.12.2/lib/ReactCurrentOwner", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/monitorCodeUse", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactCurrentOwner = require("npm:react@0.12.2/lib/ReactCurrentOwner");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var monitorCodeUse = require("npm:react@0.12.2/lib/monitorCodeUse");
    var warning = require("npm:react@0.12.2/lib/warning");
    var legacyFactoryLogs = {};
    function warnForLegacyFactoryCall() {
      if (!ReactLegacyElementFactory._isLegacyCallWarningEnabled) {
        return ;
      }
      var owner = ReactCurrentOwner.current;
      var name = owner && owner.constructor ? owner.constructor.displayName : '';
      if (!name) {
        name = 'Something';
      }
      if (legacyFactoryLogs.hasOwnProperty(name)) {
        return ;
      }
      legacyFactoryLogs[name] = true;
      ("production" !== process.env.NODE_ENV ? warning(false, name + ' is calling a React component directly. ' + 'Use a factory or JSX instead. See: http://fb.me/react-legacyfactory') : null);
      monitorCodeUse('react_legacy_factory_call', {
        version: 3,
        name: name
      });
    }
    function warnForPlainFunctionType(type) {
      var isReactClass = type.prototype && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
      if (isReactClass) {
        ("production" !== process.env.NODE_ENV ? warning(false, 'Did not expect to get a React class here. Use `Component` instead ' + 'of `Component.type` or `this.constructor`.') : null);
      } else {
        if (!type._reactWarnedForThisType) {
          try {
            type._reactWarnedForThisType = true;
          } catch (x) {}
          monitorCodeUse('react_non_component_in_jsx', {
            version: 3,
            name: type.name
          });
        }
        ("production" !== process.env.NODE_ENV ? warning(false, 'This JSX uses a plain function. Only React components are ' + 'valid in React\'s JSX transform.') : null);
      }
    }
    function warnForNonLegacyFactory(type) {
      ("production" !== process.env.NODE_ENV ? warning(false, 'Do not pass React.DOM.' + type.type + ' to JSX or createFactory. ' + 'Use the string "' + type.type + '" instead.') : null);
    }
    function proxyStaticMethods(target, source) {
      if (typeof source !== 'function') {
        return ;
      }
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          var value = source[key];
          if (typeof value === 'function') {
            var bound = value.bind(source);
            for (var k in value) {
              if (value.hasOwnProperty(k)) {
                bound[k] = value[k];
              }
            }
            target[key] = bound;
          } else {
            target[key] = value;
          }
        }
      }
    }
    var LEGACY_MARKER = {};
    var NON_LEGACY_MARKER = {};
    var ReactLegacyElementFactory = {};
    ReactLegacyElementFactory.wrapCreateFactory = function(createFactory) {
      var legacyCreateFactory = function(type) {
        if (typeof type !== 'function') {
          return createFactory(type);
        }
        if (type.isReactNonLegacyFactory) {
          if ("production" !== process.env.NODE_ENV) {
            warnForNonLegacyFactory(type);
          }
          return createFactory(type.type);
        }
        if (type.isReactLegacyFactory) {
          return createFactory(type.type);
        }
        if ("production" !== process.env.NODE_ENV) {
          warnForPlainFunctionType(type);
        }
        return type;
      };
      return legacyCreateFactory;
    };
    ReactLegacyElementFactory.wrapCreateElement = function(createElement) {
      var legacyCreateElement = function(type, props, children) {
        if (typeof type !== 'function') {
          return createElement.apply(this, arguments);
        }
        var args;
        if (type.isReactNonLegacyFactory) {
          if ("production" !== process.env.NODE_ENV) {
            warnForNonLegacyFactory(type);
          }
          args = Array.prototype.slice.call(arguments, 0);
          args[0] = type.type;
          return createElement.apply(this, args);
        }
        if (type.isReactLegacyFactory) {
          if (type._isMockFunction) {
            type.type._mockedReactClassConstructor = type;
          }
          args = Array.prototype.slice.call(arguments, 0);
          args[0] = type.type;
          return createElement.apply(this, args);
        }
        if ("production" !== process.env.NODE_ENV) {
          warnForPlainFunctionType(type);
        }
        return type.apply(null, Array.prototype.slice.call(arguments, 1));
      };
      return legacyCreateElement;
    };
    ReactLegacyElementFactory.wrapFactory = function(factory) {
      ("production" !== process.env.NODE_ENV ? invariant(typeof factory === 'function', 'This is suppose to accept a element factory') : invariant(typeof factory === 'function'));
      var legacyElementFactory = function(config, children) {
        if ("production" !== process.env.NODE_ENV) {
          warnForLegacyFactoryCall();
        }
        return factory.apply(this, arguments);
      };
      proxyStaticMethods(legacyElementFactory, factory.type);
      legacyElementFactory.isReactLegacyFactory = LEGACY_MARKER;
      legacyElementFactory.type = factory.type;
      return legacyElementFactory;
    };
    ReactLegacyElementFactory.markNonLegacyFactory = function(factory) {
      factory.isReactNonLegacyFactory = NON_LEGACY_MARKER;
      return factory;
    };
    ReactLegacyElementFactory.isValidFactory = function(factory) {
      return typeof factory === 'function' && factory.isReactLegacyFactory === LEGACY_MARKER;
    };
    ReactLegacyElementFactory.isValidClass = function(factory) {
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(false, 'isValidClass is deprecated and will be removed in a future release. ' + 'Use a more specific validator instead.') : null);
      }
      return ReactLegacyElementFactory.isValidFactory(factory);
    };
    ReactLegacyElementFactory._isLegacyCallWarningEnabled = true;
    module.exports = ReactLegacyElementFactory;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/joinClasses", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function joinClasses(className) {
    if (!className) {
      className = '';
    }
    var nextClass;
    var argLength = arguments.length;
    if (argLength > 1) {
      for (var ii = 1; ii < argLength; ii++) {
        nextClass = arguments[ii];
        if (nextClass) {
          className = (className ? className + ' ' : '') + nextClass;
        }
      }
    }
    return className;
  }
  module.exports = joinClasses;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactPropTypeLocationNames", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactPropTypeLocationNames = {};
    if ("production" !== process.env.NODE_ENV) {
      ReactPropTypeLocationNames = {
        prop: 'prop',
        context: 'context',
        childContext: 'child context'
      };
    }
    module.exports = ReactPropTypeLocationNames;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactNativeComponent", ["npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var genericComponentClass = null;
    var tagToComponentClass = {};
    var ReactNativeComponentInjection = {
      injectGenericComponentClass: function(componentClass) {
        genericComponentClass = componentClass;
      },
      injectComponentClasses: function(componentClasses) {
        assign(tagToComponentClass, componentClasses);
      }
    };
    function createInstanceForTag(tag, props, parentType) {
      var componentClass = tagToComponentClass[tag];
      if (componentClass == null) {
        ("production" !== process.env.NODE_ENV ? invariant(genericComponentClass, 'There is no registered component for the tag %s', tag) : invariant(genericComponentClass));
        return new genericComponentClass(tag, props);
      }
      if (parentType === tag) {
        ("production" !== process.env.NODE_ENV ? invariant(genericComponentClass, 'There is no registered component for the tag %s', tag) : invariant(genericComponentClass));
        return new genericComponentClass(tag, props);
      }
      return new componentClass.type(props);
    }
    var ReactNativeComponent = {
      createInstanceForTag: createInstanceForTag,
      injection: ReactNativeComponentInjection
    };
    module.exports = ReactNativeComponent;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/keyOf", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var keyOf = function(oneKeyObj) {
    var key;
    for (key in oneKeyObj) {
      if (!oneKeyObj.hasOwnProperty(key)) {
        continue;
      }
      return key;
    }
    return null;
  };
  module.exports = keyOf;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/mapObject", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function mapObject(object, callback, context) {
    if (!object) {
      return null;
    }
    var result = {};
    for (var name in object) {
      if (hasOwnProperty.call(object, name)) {
        result[name] = callback.call(context, object[name], name, object);
      }
    }
    return result;
  }
  module.exports = mapObject;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/shouldUpdateReactComponent", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function shouldUpdateReactComponent(prevElement, nextElement) {
    if (prevElement && nextElement && prevElement.type === nextElement.type && prevElement.key === nextElement.key && prevElement._owner === nextElement._owner) {
      return true;
    }
    return false;
  }
  module.exports = shouldUpdateReactComponent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOM", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactElementValidator", "npm:react@0.12.2/lib/ReactLegacyElement", "npm:react@0.12.2/lib/mapObject", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactElementValidator = require("npm:react@0.12.2/lib/ReactElementValidator");
    var ReactLegacyElement = require("npm:react@0.12.2/lib/ReactLegacyElement");
    var mapObject = require("npm:react@0.12.2/lib/mapObject");
    function createDOMFactory(tag) {
      if ("production" !== process.env.NODE_ENV) {
        return ReactLegacyElement.markNonLegacyFactory(ReactElementValidator.createFactory(tag));
      }
      return ReactLegacyElement.markNonLegacyFactory(ReactElement.createFactory(tag));
    }
    var ReactDOM = mapObject({
      a: 'a',
      abbr: 'abbr',
      address: 'address',
      area: 'area',
      article: 'article',
      aside: 'aside',
      audio: 'audio',
      b: 'b',
      base: 'base',
      bdi: 'bdi',
      bdo: 'bdo',
      big: 'big',
      blockquote: 'blockquote',
      body: 'body',
      br: 'br',
      button: 'button',
      canvas: 'canvas',
      caption: 'caption',
      cite: 'cite',
      code: 'code',
      col: 'col',
      colgroup: 'colgroup',
      data: 'data',
      datalist: 'datalist',
      dd: 'dd',
      del: 'del',
      details: 'details',
      dfn: 'dfn',
      dialog: 'dialog',
      div: 'div',
      dl: 'dl',
      dt: 'dt',
      em: 'em',
      embed: 'embed',
      fieldset: 'fieldset',
      figcaption: 'figcaption',
      figure: 'figure',
      footer: 'footer',
      form: 'form',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      head: 'head',
      header: 'header',
      hr: 'hr',
      html: 'html',
      i: 'i',
      iframe: 'iframe',
      img: 'img',
      input: 'input',
      ins: 'ins',
      kbd: 'kbd',
      keygen: 'keygen',
      label: 'label',
      legend: 'legend',
      li: 'li',
      link: 'link',
      main: 'main',
      map: 'map',
      mark: 'mark',
      menu: 'menu',
      menuitem: 'menuitem',
      meta: 'meta',
      meter: 'meter',
      nav: 'nav',
      noscript: 'noscript',
      object: 'object',
      ol: 'ol',
      optgroup: 'optgroup',
      option: 'option',
      output: 'output',
      p: 'p',
      param: 'param',
      picture: 'picture',
      pre: 'pre',
      progress: 'progress',
      q: 'q',
      rp: 'rp',
      rt: 'rt',
      ruby: 'ruby',
      s: 's',
      samp: 'samp',
      script: 'script',
      section: 'section',
      select: 'select',
      small: 'small',
      source: 'source',
      span: 'span',
      strong: 'strong',
      style: 'style',
      sub: 'sub',
      summary: 'summary',
      sup: 'sup',
      table: 'table',
      tbody: 'tbody',
      td: 'td',
      textarea: 'textarea',
      tfoot: 'tfoot',
      th: 'th',
      thead: 'thead',
      time: 'time',
      title: 'title',
      tr: 'tr',
      track: 'track',
      u: 'u',
      ul: 'ul',
      'var': 'var',
      video: 'video',
      wbr: 'wbr',
      circle: 'circle',
      defs: 'defs',
      ellipse: 'ellipse',
      g: 'g',
      line: 'line',
      linearGradient: 'linearGradient',
      mask: 'mask',
      path: 'path',
      pattern: 'pattern',
      polygon: 'polygon',
      polyline: 'polyline',
      radialGradient: 'radialGradient',
      rect: 'rect',
      stop: 'stop',
      svg: 'svg',
      text: 'text',
      tspan: 'tspan'
    }, createDOMFactory);
    module.exports = ReactDOM;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/CSSProperty", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var isUnitlessNumber = {
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    strokeOpacity: true
  };
  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }
  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(isUnitlessNumber).forEach(function(prop) {
    prefixes.forEach(function(prefix) {
      isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
  });
  var shorthandPropertyExpansions = {
    background: {
      backgroundImage: true,
      backgroundPosition: true,
      backgroundRepeat: true,
      backgroundColor: true
    },
    border: {
      borderWidth: true,
      borderStyle: true,
      borderColor: true
    },
    borderBottom: {
      borderBottomWidth: true,
      borderBottomStyle: true,
      borderBottomColor: true
    },
    borderLeft: {
      borderLeftWidth: true,
      borderLeftStyle: true,
      borderLeftColor: true
    },
    borderRight: {
      borderRightWidth: true,
      borderRightStyle: true,
      borderRightColor: true
    },
    borderTop: {
      borderTopWidth: true,
      borderTopStyle: true,
      borderTopColor: true
    },
    font: {
      fontStyle: true,
      fontVariant: true,
      fontWeight: true,
      fontSize: true,
      lineHeight: true,
      fontFamily: true
    }
  };
  var CSSProperty = {
    isUnitlessNumber: isUnitlessNumber,
    shorthandPropertyExpansions: shorthandPropertyExpansions
  };
  module.exports = CSSProperty;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ExecutionEnvironment", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  var ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM
  };
  module.exports = ExecutionEnvironment;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/camelize", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var _hyphenPattern = /-(.)/g;
  function camelize(string) {
    return string.replace(_hyphenPattern, function(_, character) {
      return character.toUpperCase();
    });
  }
  module.exports = camelize;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/dangerousStyleValue", ["npm:react@0.12.2/lib/CSSProperty"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var CSSProperty = require("npm:react@0.12.2/lib/CSSProperty");
  var isUnitlessNumber = CSSProperty.isUnitlessNumber;
  function dangerousStyleValue(name, value) {
    var isEmpty = value == null || typeof value === 'boolean' || value === '';
    if (isEmpty) {
      return '';
    }
    var isNonNumeric = isNaN(value);
    if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
      return '' + value;
    }
    if (typeof value === 'string') {
      value = value.trim();
    }
    return value + 'px';
  }
  module.exports = dangerousStyleValue;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/hyphenate", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var _uppercasePattern = /([A-Z])/g;
  function hyphenate(string) {
    return string.replace(_uppercasePattern, '-$1').toLowerCase();
  }
  module.exports = hyphenate;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/EventPluginRegistry", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var EventPluginOrder = null;
    var namesToPlugins = {};
    function recomputePluginOrdering() {
      if (!EventPluginOrder) {
        return ;
      }
      for (var pluginName in namesToPlugins) {
        var PluginModule = namesToPlugins[pluginName];
        var pluginIndex = EventPluginOrder.indexOf(pluginName);
        ("production" !== process.env.NODE_ENV ? invariant(pluginIndex > -1, 'EventPluginRegistry: Cannot inject event plugins that do not exist in ' + 'the plugin ordering, `%s`.', pluginName) : invariant(pluginIndex > -1));
        if (EventPluginRegistry.plugins[pluginIndex]) {
          continue;
        }
        ("production" !== process.env.NODE_ENV ? invariant(PluginModule.extractEvents, 'EventPluginRegistry: Event plugins must implement an `extractEvents` ' + 'method, but `%s` does not.', pluginName) : invariant(PluginModule.extractEvents));
        EventPluginRegistry.plugins[pluginIndex] = PluginModule;
        var publishedEvents = PluginModule.eventTypes;
        for (var eventName in publishedEvents) {
          ("production" !== process.env.NODE_ENV ? invariant(publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName), 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : invariant(publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName)));
        }
      }
    }
    function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
      ("production" !== process.env.NODE_ENV ? invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName), 'EventPluginHub: More than one plugin attempted to publish the same ' + 'event name, `%s`.', eventName) : invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)));
      EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
      if (phasedRegistrationNames) {
        for (var phaseName in phasedRegistrationNames) {
          if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
            var phasedRegistrationName = phasedRegistrationNames[phaseName];
            publishRegistrationName(phasedRegistrationName, PluginModule, eventName);
          }
        }
        return true;
      } else if (dispatchConfig.registrationName) {
        publishRegistrationName(dispatchConfig.registrationName, PluginModule, eventName);
        return true;
      }
      return false;
    }
    function publishRegistrationName(registrationName, PluginModule, eventName) {
      ("production" !== process.env.NODE_ENV ? invariant(!EventPluginRegistry.registrationNameModules[registrationName], 'EventPluginHub: More than one plugin attempted to publish the same ' + 'registration name, `%s`.', registrationName) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
      EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
      EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
    }
    var EventPluginRegistry = {
      plugins: [],
      eventNameDispatchConfigs: {},
      registrationNameModules: {},
      registrationNameDependencies: {},
      injectEventPluginOrder: function(InjectedEventPluginOrder) {
        ("production" !== process.env.NODE_ENV ? invariant(!EventPluginOrder, 'EventPluginRegistry: Cannot inject event plugin ordering more than ' + 'once. You are likely trying to load more than one copy of React.') : invariant(!EventPluginOrder));
        EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
        recomputePluginOrdering();
      },
      injectEventPluginsByName: function(injectedNamesToPlugins) {
        var isOrderingDirty = false;
        for (var pluginName in injectedNamesToPlugins) {
          if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
            continue;
          }
          var PluginModule = injectedNamesToPlugins[pluginName];
          if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== PluginModule) {
            ("production" !== process.env.NODE_ENV ? invariant(!namesToPlugins[pluginName], 'EventPluginRegistry: Cannot inject two different event plugins ' + 'using the same name, `%s`.', pluginName) : invariant(!namesToPlugins[pluginName]));
            namesToPlugins[pluginName] = PluginModule;
            isOrderingDirty = true;
          }
        }
        if (isOrderingDirty) {
          recomputePluginOrdering();
        }
      },
      getPluginModuleForEvent: function(event) {
        var dispatchConfig = event.dispatchConfig;
        if (dispatchConfig.registrationName) {
          return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
        }
        for (var phase in dispatchConfig.phasedRegistrationNames) {
          if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
            continue;
          }
          var PluginModule = EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
          if (PluginModule) {
            return PluginModule;
          }
        }
        return null;
      },
      _resetEventPlugins: function() {
        EventPluginOrder = null;
        for (var pluginName in namesToPlugins) {
          if (namesToPlugins.hasOwnProperty(pluginName)) {
            delete namesToPlugins[pluginName];
          }
        }
        EventPluginRegistry.plugins.length = 0;
        var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
        for (var eventName in eventNameDispatchConfigs) {
          if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
            delete eventNameDispatchConfigs[eventName];
          }
        }
        var registrationNameModules = EventPluginRegistry.registrationNameModules;
        for (var registrationName in registrationNameModules) {
          if (registrationNameModules.hasOwnProperty(registrationName)) {
            delete registrationNameModules[registrationName];
          }
        }
      }
    };
    module.exports = EventPluginRegistry;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/accumulateInto", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function accumulateInto(current, next) {
      ("production" !== process.env.NODE_ENV ? invariant(next != null, 'accumulateInto(...): Accumulated items must not be null or undefined.') : invariant(next != null));
      if (current == null) {
        return next;
      }
      var currentIsArray = Array.isArray(current);
      var nextIsArray = Array.isArray(next);
      if (currentIsArray && nextIsArray) {
        current.push.apply(current, next);
        return current;
      }
      if (currentIsArray) {
        current.push(next);
        return current;
      }
      if (nextIsArray) {
        return [current].concat(next);
      }
      return [current, next];
    }
    module.exports = accumulateInto;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/forEachAccumulated", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var forEachAccumulated = function(arr, cb, scope) {
    if (Array.isArray(arr)) {
      arr.forEach(cb, scope);
    } else if (arr) {
      cb.call(scope, arr);
    }
  };
  module.exports = forEachAccumulated;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactEventEmitterMixin", ["npm:react@0.12.2/lib/EventPluginHub"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventPluginHub = require("npm:react@0.12.2/lib/EventPluginHub");
  function runEventQueueInBatch(events) {
    EventPluginHub.enqueueEvents(events);
    EventPluginHub.processEventQueue();
  }
  var ReactEventEmitterMixin = {handleTopLevel: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent);
      runEventQueueInBatch(events);
    }};
  module.exports = ReactEventEmitterMixin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getUnboundedScrollPosition", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function getUnboundedScrollPosition(scrollable) {
    if (scrollable === window) {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      };
    }
    return {
      x: scrollable.scrollLeft,
      y: scrollable.scrollTop
    };
  }
  module.exports = getUnboundedScrollPosition;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/isEventSupported", ["npm:react@0.12.2/lib/ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
  var useHasFeature;
  if (ExecutionEnvironment.canUseDOM) {
    useHasFeature = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true;
  }
  function isEventSupported(eventNameSuffix, capture) {
    if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
      return false;
    }
    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in document;
    if (!isSupported) {
      var element = document.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }
    if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
      isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }
    return isSupported;
  }
  module.exports = isEventSupported;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/isNode", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function isNode(object) {
    return !!(object && (typeof Node === 'function' ? object instanceof Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
  }
  module.exports = isNode;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/deprecated", ["npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var warning = require("npm:react@0.12.2/lib/warning");
    function deprecated(namespace, oldName, newName, ctx, fn) {
      var warned = false;
      if ("production" !== process.env.NODE_ENV) {
        var newFn = function() {
          ("production" !== process.env.NODE_ENV ? warning(warned, (namespace + "." + oldName + " will be deprecated in a future version. ") + ("Use " + namespace + "." + newName + " instead.")) : null);
          warned = true;
          return fn.apply(ctx, arguments);
        };
        newFn.displayName = (namespace + "_" + oldName);
        return assign(newFn, fn);
      }
      return fn;
    }
    module.exports = deprecated;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getReactRootElementInContainer", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var DOC_NODE_TYPE = 9;
  function getReactRootElementInContainer(container) {
    if (!container) {
      return null;
    }
    if (container.nodeType === DOC_NODE_TYPE) {
      return container.documentElement;
    } else {
      return container.firstChild;
    }
  }
  module.exports = getReactRootElementInContainer;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactMultiChildUpdateTypes", ["npm:react@0.12.2/lib/keyMirror"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var keyMirror = require("npm:react@0.12.2/lib/keyMirror");
  var ReactMultiChildUpdateTypes = keyMirror({
    INSERT_MARKUP: null,
    MOVE_EXISTING: null,
    REMOVE_NODE: null,
    TEXT_CONTENT: null
  });
  module.exports = ReactMultiChildUpdateTypes;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactTextComponent", ["npm:react@0.12.2/lib/DOMPropertyOperations", "npm:react@0.12.2/lib/ReactComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/escapeTextForBrowser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var DOMPropertyOperations = require("npm:react@0.12.2/lib/DOMPropertyOperations");
  var ReactComponent = require("npm:react@0.12.2/lib/ReactComponent");
  var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var escapeTextForBrowser = require("npm:react@0.12.2/lib/escapeTextForBrowser");
  var ReactTextComponent = function(props) {};
  assign(ReactTextComponent.prototype, ReactComponent.Mixin, {
    mountComponent: function(rootID, transaction, mountDepth) {
      ReactComponent.Mixin.mountComponent.call(this, rootID, transaction, mountDepth);
      var escapedText = escapeTextForBrowser(this.props);
      if (transaction.renderToStaticMarkup) {
        return escapedText;
      }
      return ('<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' + escapedText + '</span>');
    },
    receiveComponent: function(nextComponent, transaction) {
      var nextProps = nextComponent.props;
      if (nextProps !== this.props) {
        this.props = nextProps;
        ReactComponent.BackendIDOperations.updateTextContentByID(this._rootNodeID, nextProps);
      }
    }
  });
  var ReactTextComponentFactory = function(text) {
    return new ReactElement(ReactTextComponent, null, null, null, null, text);
  };
  ReactTextComponentFactory.type = ReactTextComponent;
  module.exports = ReactTextComponentFactory;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/EventPropagators", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPluginHub", "npm:react@0.12.2/lib/accumulateInto", "npm:react@0.12.2/lib/forEachAccumulated", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
    var EventPluginHub = require("npm:react@0.12.2/lib/EventPluginHub");
    var accumulateInto = require("npm:react@0.12.2/lib/accumulateInto");
    var forEachAccumulated = require("npm:react@0.12.2/lib/forEachAccumulated");
    var PropagationPhases = EventConstants.PropagationPhases;
    var getListener = EventPluginHub.getListener;
    function listenerAtPhase(id, event, propagationPhase) {
      var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
      return getListener(id, registrationName);
    }
    function accumulateDirectionalDispatches(domID, upwards, event) {
      if ("production" !== process.env.NODE_ENV) {
        if (!domID) {
          throw new Error('Dispatching id must not be null');
        }
      }
      var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
      var listener = listenerAtPhase(domID, event, phase);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
      }
    }
    function accumulateTwoPhaseDispatchesSingle(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, accumulateDirectionalDispatches, event);
      }
    }
    function accumulateDispatches(id, ignoredDirection, event) {
      if (event && event.dispatchConfig.registrationName) {
        var registrationName = event.dispatchConfig.registrationName;
        var listener = getListener(id, registrationName);
        if (listener) {
          event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
          event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
        }
      }
    }
    function accumulateDirectDispatchesSingle(event) {
      if (event && event.dispatchConfig.registrationName) {
        accumulateDispatches(event.dispatchMarker, null, event);
      }
    }
    function accumulateTwoPhaseDispatches(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
    }
    function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
      EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter);
    }
    function accumulateDirectDispatches(events) {
      forEachAccumulated(events, accumulateDirectDispatchesSingle);
    }
    var EventPropagators = {
      accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
      accumulateDirectDispatches: accumulateDirectDispatches,
      accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
    };
    module.exports = EventPropagators;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getEventTarget", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function getEventTarget(nativeEvent) {
    var target = nativeEvent.target || nativeEvent.srcElement || window;
    return target.nodeType === 3 ? target.parentNode : target;
  }
  module.exports = getEventTarget;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/isTextInputElement", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var supportedInputTypes = {
    'color': true,
    'date': true,
    'datetime': true,
    'datetime-local': true,
    'email': true,
    'month': true,
    'number': true,
    'password': true,
    'range': true,
    'search': true,
    'tel': true,
    'text': true,
    'time': true,
    'url': true,
    'week': true
  };
  function isTextInputElement(elem) {
    return elem && ((elem.nodeName === 'INPUT' && supportedInputTypes[elem.type]) || elem.nodeName === 'TEXTAREA');
  }
  module.exports = isTextInputElement;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ClientReactRootIndex", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var nextReactRootIndex = 0;
  var ClientReactRootIndex = {createReactRootIndex: function() {
      return nextReactRootIndex++;
    }};
  module.exports = ClientReactRootIndex;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getNodeForCharacterOffset", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function getLeafNode(node) {
    while (node && node.firstChild) {
      node = node.firstChild;
    }
    return node;
  }
  function getSiblingNode(node) {
    while (node) {
      if (node.nextSibling) {
        return node.nextSibling;
      }
      node = node.parentNode;
    }
  }
  function getNodeForCharacterOffset(root, offset) {
    var node = getLeafNode(root);
    var nodeStart = 0;
    var nodeEnd = 0;
    while (node) {
      if (node.nodeType == 3) {
        nodeEnd = nodeStart + node.textContent.length;
        if (nodeStart <= offset && nodeEnd >= offset) {
          return {
            node: node,
            offset: offset - nodeStart
          };
        }
        nodeStart = nodeEnd;
      }
      node = getLeafNode(getSiblingNode(node));
    }
  }
  module.exports = getNodeForCharacterOffset;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getTextContentAccessor", ["npm:react@0.12.2/lib/ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
  var contentKey = null;
  function getTextContentAccessor() {
    if (!contentKey && ExecutionEnvironment.canUseDOM) {
      contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
    }
    return contentKey;
  }
  module.exports = getTextContentAccessor;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/focusNode", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function focusNode(node) {
    try {
      node.focus();
    } catch (e) {}
  }
  module.exports = focusNode;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getActiveElement", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function getActiveElement() {
    try {
      return document.activeElement || document.body;
    } catch (e) {
      return document.body;
    }
  }
  module.exports = getActiveElement;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticCompositionEvent", ["npm:react@0.12.2/lib/SyntheticEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticEvent = require("npm:react@0.12.2/lib/SyntheticEvent");
  var CompositionEventInterface = {data: null};
  function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticEvent.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);
  module.exports = SyntheticCompositionEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/DefaultEventPluginOrder", ["npm:react@0.12.2/lib/keyOf"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var keyOf = require("npm:react@0.12.2/lib/keyOf");
  var DefaultEventPluginOrder = [keyOf({ResponderEventPlugin: null}), keyOf({SimpleEventPlugin: null}), keyOf({TapEventPlugin: null}), keyOf({EnterLeaveEventPlugin: null}), keyOf({ChangeEventPlugin: null}), keyOf({SelectEventPlugin: null}), keyOf({CompositionEventPlugin: null}), keyOf({BeforeInputEventPlugin: null}), keyOf({AnalyticsEventPlugin: null}), keyOf({MobileSafariClickEventPlugin: null})];
  module.exports = DefaultEventPluginOrder;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticUIEvent", ["npm:react@0.12.2/lib/SyntheticEvent", "npm:react@0.12.2/lib/getEventTarget"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticEvent = require("npm:react@0.12.2/lib/SyntheticEvent");
  var getEventTarget = require("npm:react@0.12.2/lib/getEventTarget");
  var UIEventInterface = {
    view: function(event) {
      if (event.view) {
        return event.view;
      }
      var target = getEventTarget(event);
      if (target != null && target.window === target) {
        return target;
      }
      var doc = target.ownerDocument;
      if (doc) {
        return doc.defaultView || doc.parentWindow;
      } else {
        return window;
      }
    },
    detail: function(event) {
      return event.detail || 0;
    }
  };
  function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);
  module.exports = SyntheticUIEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getEventModifierState", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var modifierKeyToProp = {
    'Alt': 'altKey',
    'Control': 'ctrlKey',
    'Meta': 'metaKey',
    'Shift': 'shiftKey'
  };
  function modifierStateGetter(keyArg) {
    var syntheticEvent = this;
    var nativeEvent = syntheticEvent.nativeEvent;
    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyArg);
    }
    var keyProp = modifierKeyToProp[keyArg];
    return keyProp ? !!nativeEvent[keyProp] : false;
  }
  function getEventModifierState(nativeEvent) {
    return modifierStateGetter;
  }
  module.exports = getEventModifierState;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/HTMLDOMPropertyConfig", ["npm:react@0.12.2/lib/DOMProperty", "npm:react@0.12.2/lib/ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var DOMProperty = require("npm:react@0.12.2/lib/DOMProperty");
  var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
  var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
  var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
  var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
  var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
  var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
  var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
  var hasSVG;
  if (ExecutionEnvironment.canUseDOM) {
    var implementation = document.implementation;
    hasSVG = (implementation && implementation.hasFeature && implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'));
  }
  var HTMLDOMPropertyConfig = {
    isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
    Properties: {
      accept: null,
      acceptCharset: null,
      accessKey: null,
      action: null,
      allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      allowTransparency: MUST_USE_ATTRIBUTE,
      alt: null,
      async: HAS_BOOLEAN_VALUE,
      autoComplete: null,
      autoPlay: HAS_BOOLEAN_VALUE,
      cellPadding: null,
      cellSpacing: null,
      charSet: MUST_USE_ATTRIBUTE,
      checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      classID: MUST_USE_ATTRIBUTE,
      className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
      cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      colSpan: null,
      content: null,
      contentEditable: null,
      contextMenu: MUST_USE_ATTRIBUTE,
      controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      coords: null,
      crossOrigin: null,
      data: null,
      dateTime: MUST_USE_ATTRIBUTE,
      defer: HAS_BOOLEAN_VALUE,
      dir: null,
      disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      download: HAS_OVERLOADED_BOOLEAN_VALUE,
      draggable: null,
      encType: null,
      form: MUST_USE_ATTRIBUTE,
      formAction: MUST_USE_ATTRIBUTE,
      formEncType: MUST_USE_ATTRIBUTE,
      formMethod: MUST_USE_ATTRIBUTE,
      formNoValidate: HAS_BOOLEAN_VALUE,
      formTarget: MUST_USE_ATTRIBUTE,
      frameBorder: MUST_USE_ATTRIBUTE,
      height: MUST_USE_ATTRIBUTE,
      hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      href: null,
      hrefLang: null,
      htmlFor: null,
      httpEquiv: null,
      icon: null,
      id: MUST_USE_PROPERTY,
      label: null,
      lang: null,
      list: MUST_USE_ATTRIBUTE,
      loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      manifest: MUST_USE_ATTRIBUTE,
      marginHeight: null,
      marginWidth: null,
      max: null,
      maxLength: MUST_USE_ATTRIBUTE,
      media: MUST_USE_ATTRIBUTE,
      mediaGroup: null,
      method: null,
      min: null,
      multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      name: null,
      noValidate: HAS_BOOLEAN_VALUE,
      open: null,
      pattern: null,
      placeholder: null,
      poster: null,
      preload: null,
      radioGroup: null,
      readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      rel: null,
      required: HAS_BOOLEAN_VALUE,
      role: MUST_USE_ATTRIBUTE,
      rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      rowSpan: null,
      sandbox: null,
      scope: null,
      scrolling: null,
      seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      shape: null,
      size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      sizes: MUST_USE_ATTRIBUTE,
      span: HAS_POSITIVE_NUMERIC_VALUE,
      spellCheck: null,
      src: null,
      srcDoc: MUST_USE_PROPERTY,
      srcSet: MUST_USE_ATTRIBUTE,
      start: HAS_NUMERIC_VALUE,
      step: null,
      style: null,
      tabIndex: null,
      target: null,
      title: null,
      type: null,
      useMap: null,
      value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
      width: MUST_USE_ATTRIBUTE,
      wmode: MUST_USE_ATTRIBUTE,
      autoCapitalize: null,
      autoCorrect: null,
      itemProp: MUST_USE_ATTRIBUTE,
      itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      itemType: MUST_USE_ATTRIBUTE,
      property: null
    },
    DOMAttributeNames: {
      acceptCharset: 'accept-charset',
      className: 'class',
      htmlFor: 'for',
      httpEquiv: 'http-equiv'
    },
    DOMPropertyNames: {
      autoCapitalize: 'autocapitalize',
      autoComplete: 'autocomplete',
      autoCorrect: 'autocorrect',
      autoFocus: 'autofocus',
      autoPlay: 'autoplay',
      encType: 'enctype',
      hrefLang: 'hreflang',
      radioGroup: 'radiogroup',
      spellCheck: 'spellcheck',
      srcDoc: 'srcdoc',
      srcSet: 'srcset'
    }
  };
  module.exports = HTMLDOMPropertyConfig;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/MobileSafariClickEventPlugin", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
  var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
  var topLevelTypes = EventConstants.topLevelTypes;
  var MobileSafariClickEventPlugin = {
    eventTypes: null,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      if (topLevelType === topLevelTypes.topTouchStart) {
        var target = nativeEvent.target;
        if (target && !target.onclick) {
          target.onclick = emptyFunction;
        }
      }
    }
  };
  module.exports = MobileSafariClickEventPlugin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/toArray", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function toArray(obj) {
      var length = obj.length;
      ("production" !== process.env.NODE_ENV ? invariant(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function'), 'toArray: Array-like object expected') : invariant(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')));
      ("production" !== process.env.NODE_ENV ? invariant(typeof length === 'number', 'toArray: Object needs a length property') : invariant(typeof length === 'number'));
      ("production" !== process.env.NODE_ENV ? invariant(length === 0 || (length - 1) in obj, 'toArray: Object should have keys for indices') : invariant(length === 0 || (length - 1) in obj));
      if (obj.hasOwnProperty) {
        try {
          return Array.prototype.slice.call(obj);
        } catch (e) {}
      }
      var ret = Array(length);
      for (var ii = 0; ii < length; ii++) {
        ret[ii] = obj[ii];
      }
      return ret;
    }
    module.exports = toArray;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getMarkupWrap", ["npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
    var shouldWrap = {
      'circle': true,
      'defs': true,
      'ellipse': true,
      'g': true,
      'line': true,
      'linearGradient': true,
      'path': true,
      'polygon': true,
      'polyline': true,
      'radialGradient': true,
      'rect': true,
      'stop': true,
      'text': true
    };
    var selectWrap = [1, '<select multiple="true">', '</select>'];
    var tableWrap = [1, '<table>', '</table>'];
    var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
    var svgWrap = [1, '<svg>', '</svg>'];
    var markupWrap = {
      '*': [1, '?<div>', '</div>'],
      'area': [1, '<map>', '</map>'],
      'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
      'legend': [1, '<fieldset>', '</fieldset>'],
      'param': [1, '<object>', '</object>'],
      'tr': [2, '<table><tbody>', '</tbody></table>'],
      'optgroup': selectWrap,
      'option': selectWrap,
      'caption': tableWrap,
      'colgroup': tableWrap,
      'tbody': tableWrap,
      'tfoot': tableWrap,
      'thead': tableWrap,
      'td': trWrap,
      'th': trWrap,
      'circle': svgWrap,
      'defs': svgWrap,
      'ellipse': svgWrap,
      'g': svgWrap,
      'line': svgWrap,
      'linearGradient': svgWrap,
      'path': svgWrap,
      'polygon': svgWrap,
      'polyline': svgWrap,
      'radialGradient': svgWrap,
      'rect': svgWrap,
      'stop': svgWrap,
      'text': svgWrap
    };
    function getMarkupWrap(nodeName) {
      ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'Markup wrapping node not initialized') : invariant(!!dummyNode));
      if (!markupWrap.hasOwnProperty(nodeName)) {
        nodeName = '*';
      }
      if (!shouldWrap.hasOwnProperty(nodeName)) {
        if (nodeName === '*') {
          dummyNode.innerHTML = '<link />';
        } else {
          dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
        }
        shouldWrap[nodeName] = !dummyNode.firstChild;
      }
      return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
    }
    module.exports = getMarkupWrap;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/setInnerHTML", ["npm:react@0.12.2/lib/ExecutionEnvironment", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
    var WHITESPACE_TEST = /^[ \r\n\t\f]/;
    var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
    var setInnerHTML = function(node, html) {
      node.innerHTML = html;
    };
    if (ExecutionEnvironment.canUseDOM) {
      var testElement = document.createElement('div');
      testElement.innerHTML = ' ';
      if (testElement.innerHTML === '') {
        setInnerHTML = function(node, html) {
          if (node.parentNode) {
            node.parentNode.replaceChild(node, node);
          }
          if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
            node.innerHTML = '\uFEFF' + html;
            var textNode = node.firstChild;
            if (textNode.data.length === 1) {
              node.removeChild(textNode);
            } else {
              textNode.deleteData(0, 1);
            }
          } else {
            node.innerHTML = html;
          }
        };
      }
    }
    module.exports = setInnerHTML;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/adler32", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var MOD = 65521;
  function adler32(data) {
    var a = 1;
    var b = 0;
    for (var i = 0; i < data.length; i++) {
      a = (a + data.charCodeAt(i)) % MOD;
      b = (b + a) % MOD;
    }
    return a | (b << 16);
  }
  module.exports = adler32;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactPutListenerQueue", ["npm:react@0.12.2/lib/PooledClass", "npm:react@0.12.2/lib/ReactBrowserEventEmitter", "npm:react@0.12.2/lib/Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var PooledClass = require("npm:react@0.12.2/lib/PooledClass");
  var ReactBrowserEventEmitter = require("npm:react@0.12.2/lib/ReactBrowserEventEmitter");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  function ReactPutListenerQueue() {
    this.listenersToPut = [];
  }
  assign(ReactPutListenerQueue.prototype, {
    enqueuePutListener: function(rootNodeID, propKey, propValue) {
      this.listenersToPut.push({
        rootNodeID: rootNodeID,
        propKey: propKey,
        propValue: propValue
      });
    },
    putListeners: function() {
      for (var i = 0; i < this.listenersToPut.length; i++) {
        var listenerToPut = this.listenersToPut[i];
        ReactBrowserEventEmitter.putListener(listenerToPut.rootNodeID, listenerToPut.propKey, listenerToPut.propValue);
      }
    },
    reset: function() {
      this.listenersToPut.length = 0;
    },
    destructor: function() {
      this.reset();
    }
  });
  PooledClass.addPoolingTo(ReactPutListenerQueue);
  module.exports = ReactPutListenerQueue;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDefaultBatchingStrategy", ["npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/Transaction", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
  var Transaction = require("npm:react@0.12.2/lib/Transaction");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
  var RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: function() {
      ReactDefaultBatchingStrategy.isBatchingUpdates = false;
    }
  };
  var FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
  };
  var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
  function ReactDefaultBatchingStrategyTransaction() {
    this.reinitializeTransaction();
  }
  assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction.Mixin, {getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    }});
  var transaction = new ReactDefaultBatchingStrategyTransaction();
  var ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,
    batchedUpdates: function(callback, a, b) {
      var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
      ReactDefaultBatchingStrategy.isBatchingUpdates = true;
      if (alreadyBatchingUpdates) {
        callback(a, b);
      } else {
        transaction.perform(callback, null, a, b);
      }
    }
  };
  module.exports = ReactDefaultBatchingStrategy;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/AutoFocusMixin", ["npm:react@0.12.2/lib/focusNode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var focusNode = require("npm:react@0.12.2/lib/focusNode");
  var AutoFocusMixin = {componentDidMount: function() {
      if (this.props.autoFocus) {
        focusNode(this.getDOMNode());
      }
    }};
  module.exports = AutoFocusMixin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/LocalEventTrapMixin", ["npm:react@0.12.2/lib/ReactBrowserEventEmitter", "npm:react@0.12.2/lib/accumulateInto", "npm:react@0.12.2/lib/forEachAccumulated", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactBrowserEventEmitter = require("npm:react@0.12.2/lib/ReactBrowserEventEmitter");
    var accumulateInto = require("npm:react@0.12.2/lib/accumulateInto");
    var forEachAccumulated = require("npm:react@0.12.2/lib/forEachAccumulated");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function remove(event) {
      event.remove();
    }
    var LocalEventTrapMixin = {
      trapBubbledEvent: function(topLevelType, handlerBaseName) {
        ("production" !== process.env.NODE_ENV ? invariant(this.isMounted(), 'Must be mounted to trap events') : invariant(this.isMounted()));
        var listener = ReactBrowserEventEmitter.trapBubbledEvent(topLevelType, handlerBaseName, this.getDOMNode());
        this._localEventListeners = accumulateInto(this._localEventListeners, listener);
      },
      componentWillUnmount: function() {
        if (this._localEventListeners) {
          forEachAccumulated(this._localEventListeners, remove);
        }
      }
    };
    module.exports = LocalEventTrapMixin;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMImg", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/LocalEventTrapMixin", "npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactDOM"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
  var LocalEventTrapMixin = require("npm:react@0.12.2/lib/LocalEventTrapMixin");
  var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
  var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
  var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
  var ReactDOM = require("npm:react@0.12.2/lib/ReactDOM");
  var img = ReactElement.createFactory(ReactDOM.img.type);
  var ReactDOMImg = ReactCompositeComponent.createClass({
    displayName: 'ReactDOMImg',
    tagName: 'IMG',
    mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
    render: function() {
      return img(this.props);
    },
    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load');
      this.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error');
    }
  });
  module.exports = ReactDOMImg;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactPropTypes", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactPropTypeLocationNames", "npm:react@0.12.2/lib/deprecated", "npm:react@0.12.2/lib/emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
  var ReactPropTypeLocationNames = require("npm:react@0.12.2/lib/ReactPropTypeLocationNames");
  var deprecated = require("npm:react@0.12.2/lib/deprecated");
  var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
  var ANONYMOUS = '<<anonymous>>';
  var elementTypeChecker = createElementTypeChecker();
  var nodeTypeChecker = createNodeChecker();
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: elementTypeChecker,
    instanceOf: createInstanceTypeChecker,
    node: nodeTypeChecker,
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    component: deprecated('React.PropTypes', 'component', 'element', this, elementTypeChecker),
    renderable: deprecated('React.PropTypes', 'renderable', 'node', this, nodeTypeChecker)
  };
  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location) {
      componentName = componentName || ANONYMOUS;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error(("Required " + locationName + " `" + propName + "` was not specified in ") + ("`" + componentName + "`."));
        }
      } else {
        return validate(props, propName, componentName, location);
      }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var locationName = ReactPropTypeLocationNames[location];
        var preciseType = getPreciseType(propValue);
        return new Error(("Invalid " + locationName + " `" + propName + "` of type `" + preciseType + "` ") + ("supplied to `" + componentName + "`, expected `" + expectedType + "`."));
      }
    }
    return createChainableTypeChecker(validate);
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns());
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var locationName = ReactPropTypeLocationNames[location];
        var propType = getPropType(propValue);
        return new Error(("Invalid " + locationName + " `" + propName + "` of type ") + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location) {
      if (!ReactElement.isValidElement(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(("Invalid " + locationName + " `" + propName + "` supplied to ") + ("`" + componentName + "`, expected a ReactElement."));
      }
    }
    return createChainableTypeChecker(validate);
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location) {
      if (!(props[propName] instanceof expectedClass)) {
        var locationName = ReactPropTypeLocationNames[location];
        var expectedClassName = expectedClass.name || ANONYMOUS;
        return new Error(("Invalid " + locationName + " `" + propName + "` supplied to ") + ("`" + componentName + "`, expected instance of `" + expectedClassName + "`."));
      }
    }
    return createChainableTypeChecker(validate);
  }
  function createEnumTypeChecker(expectedValues) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (propValue === expectedValues[i]) {
          return ;
        }
      }
      var locationName = ReactPropTypeLocationNames[location];
      var valuesString = JSON.stringify(expectedValues);
      return new Error(("Invalid " + locationName + " `" + propName + "` of value `" + propValue + "` ") + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
    }
    return createChainableTypeChecker(validate);
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(("Invalid " + locationName + " `" + propName + "` of type ") + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location);
          if (error instanceof Error) {
            return error;
          }
        }
      }
    }
    return createChainableTypeChecker(validate);
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    function validate(props, propName, componentName, location) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location) == null) {
          return ;
        }
      }
      var locationName = ReactPropTypeLocationNames[location];
      return new Error(("Invalid " + locationName + " `" + propName + "` supplied to ") + ("`" + componentName + "`."));
    }
    return createChainableTypeChecker(validate);
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location) {
      if (!isNode(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(("Invalid " + locationName + " `" + propName + "` supplied to ") + ("`" + componentName + "`, expected a ReactNode."));
      }
    }
    return createChainableTypeChecker(validate);
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(("Invalid " + locationName + " `" + propName + "` of type `" + propType + "` ") + ("supplied to `" + componentName + "`, expected `object`."));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location);
        if (error) {
          return error;
        }
      }
    }
    return createChainableTypeChecker(validate, 'expected `object`');
  }
  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (ReactElement.isValidElement(propValue)) {
          return true;
        }
        for (var k in propValue) {
          if (!isNode(propValue[k])) {
            return false;
          }
        }
        return true;
      default:
        return false;
    }
  }
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      return 'object';
    }
    return propType;
  }
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }
  module.exports = ReactPropTypes;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMOption", ["npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactDOM", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
    var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactDOM = require("npm:react@0.12.2/lib/ReactDOM");
    var warning = require("npm:react@0.12.2/lib/warning");
    var option = ReactElement.createFactory(ReactDOM.option.type);
    var ReactDOMOption = ReactCompositeComponent.createClass({
      displayName: 'ReactDOMOption',
      mixins: [ReactBrowserComponentMixin],
      componentWillMount: function() {
        if ("production" !== process.env.NODE_ENV) {
          ("production" !== process.env.NODE_ENV ? warning(this.props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : null);
        }
      },
      render: function() {
        return option(this.props, this.props.children);
      }
    });
    module.exports = ReactDOMOption;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMSelect", ["npm:react@0.12.2/lib/AutoFocusMixin", "npm:react@0.12.2/lib/LinkedValueUtils", "npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactDOM", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var AutoFocusMixin = require("npm:react@0.12.2/lib/AutoFocusMixin");
  var LinkedValueUtils = require("npm:react@0.12.2/lib/LinkedValueUtils");
  var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
  var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
  var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
  var ReactDOM = require("npm:react@0.12.2/lib/ReactDOM");
  var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var select = ReactElement.createFactory(ReactDOM.select.type);
  function updateWithPendingValueIfMounted() {
    if (this.isMounted()) {
      this.setState({value: this._pendingValue});
      this._pendingValue = 0;
    }
  }
  function selectValueType(props, propName, componentName) {
    if (props[propName] == null) {
      return ;
    }
    if (props.multiple) {
      if (!Array.isArray(props[propName])) {
        return new Error(("The `" + propName + "` prop supplied to <select> must be an array if ") + ("`multiple` is true."));
      }
    } else {
      if (Array.isArray(props[propName])) {
        return new Error(("The `" + propName + "` prop supplied to <select> must be a scalar ") + ("value if `multiple` is false."));
      }
    }
  }
  function updateOptions(component, propValue) {
    var multiple = component.props.multiple;
    var value = propValue != null ? propValue : component.state.value;
    var options = component.getDOMNode().options;
    var selectedValue,
        i,
        l;
    if (multiple) {
      selectedValue = {};
      for (i = 0, l = value.length; i < l; ++i) {
        selectedValue['' + value[i]] = true;
      }
    } else {
      selectedValue = '' + value;
    }
    for (i = 0, l = options.length; i < l; i++) {
      var selected = multiple ? selectedValue.hasOwnProperty(options[i].value) : options[i].value === selectedValue;
      if (selected !== options[i].selected) {
        options[i].selected = selected;
      }
    }
  }
  var ReactDOMSelect = ReactCompositeComponent.createClass({
    displayName: 'ReactDOMSelect',
    mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
    propTypes: {
      defaultValue: selectValueType,
      value: selectValueType
    },
    getInitialState: function() {
      return {value: this.props.defaultValue || (this.props.multiple ? [] : '')};
    },
    componentWillMount: function() {
      this._pendingValue = null;
    },
    componentWillReceiveProps: function(nextProps) {
      if (!this.props.multiple && nextProps.multiple) {
        this.setState({value: [this.state.value]});
      } else if (this.props.multiple && !nextProps.multiple) {
        this.setState({value: this.state.value[0]});
      }
    },
    render: function() {
      var props = assign({}, this.props);
      props.onChange = this._handleChange;
      props.value = null;
      return select(props, this.props.children);
    },
    componentDidMount: function() {
      updateOptions(this, LinkedValueUtils.getValue(this));
    },
    componentDidUpdate: function(prevProps) {
      var value = LinkedValueUtils.getValue(this);
      var prevMultiple = !!prevProps.multiple;
      var multiple = !!this.props.multiple;
      if (value != null || prevMultiple !== multiple) {
        updateOptions(this, value);
      }
    },
    _handleChange: function(event) {
      var returnValue;
      var onChange = LinkedValueUtils.getOnChange(this);
      if (onChange) {
        returnValue = onChange.call(this, event);
      }
      var selectedValue;
      if (this.props.multiple) {
        selectedValue = [];
        var options = event.target.options;
        for (var i = 0,
            l = options.length; i < l; i++) {
          if (options[i].selected) {
            selectedValue.push(options[i].value);
          }
        }
      } else {
        selectedValue = event.target.value;
      }
      this._pendingValue = selectedValue;
      ReactUpdates.asap(updateWithPendingValueIfMounted, this);
      return returnValue;
    }
  });
  module.exports = ReactDOMSelect;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMTextarea", ["npm:react@0.12.2/lib/AutoFocusMixin", "npm:react@0.12.2/lib/DOMPropertyOperations", "npm:react@0.12.2/lib/LinkedValueUtils", "npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactDOM", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var AutoFocusMixin = require("npm:react@0.12.2/lib/AutoFocusMixin");
    var DOMPropertyOperations = require("npm:react@0.12.2/lib/DOMPropertyOperations");
    var LinkedValueUtils = require("npm:react@0.12.2/lib/LinkedValueUtils");
    var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
    var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactDOM = require("npm:react@0.12.2/lib/ReactDOM");
    var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var warning = require("npm:react@0.12.2/lib/warning");
    var textarea = ReactElement.createFactory(ReactDOM.textarea.type);
    function forceUpdateIfMounted() {
      if (this.isMounted()) {
        this.forceUpdate();
      }
    }
    var ReactDOMTextarea = ReactCompositeComponent.createClass({
      displayName: 'ReactDOMTextarea',
      mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
      getInitialState: function() {
        var defaultValue = this.props.defaultValue;
        var children = this.props.children;
        if (children != null) {
          if ("production" !== process.env.NODE_ENV) {
            ("production" !== process.env.NODE_ENV ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : null);
          }
          ("production" !== process.env.NODE_ENV ? invariant(defaultValue == null, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : invariant(defaultValue == null));
          if (Array.isArray(children)) {
            ("production" !== process.env.NODE_ENV ? invariant(children.length <= 1, '<textarea> can only have at most one child.') : invariant(children.length <= 1));
            children = children[0];
          }
          defaultValue = '' + children;
        }
        if (defaultValue == null) {
          defaultValue = '';
        }
        var value = LinkedValueUtils.getValue(this);
        return {initialValue: '' + (value != null ? value : defaultValue)};
      },
      render: function() {
        var props = assign({}, this.props);
        ("production" !== process.env.NODE_ENV ? invariant(props.dangerouslySetInnerHTML == null, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(props.dangerouslySetInnerHTML == null));
        props.defaultValue = null;
        props.value = null;
        props.onChange = this._handleChange;
        return textarea(props, this.state.initialValue);
      },
      componentDidUpdate: function(prevProps, prevState, prevContext) {
        var value = LinkedValueUtils.getValue(this);
        if (value != null) {
          var rootNode = this.getDOMNode();
          DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
        }
      },
      _handleChange: function(event) {
        var returnValue;
        var onChange = LinkedValueUtils.getOnChange(this);
        if (onChange) {
          returnValue = onChange.call(this, event);
        }
        ReactUpdates.asap(forceUpdateIfMounted, this);
        return returnValue;
      }
    });
    module.exports = ReactDOMTextarea;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/EventListener", ["npm:react@0.12.2/lib/emptyFunction", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
    var EventListener = {
      listen: function(target, eventType, callback) {
        if (target.addEventListener) {
          target.addEventListener(eventType, callback, false);
          return {remove: function() {
              target.removeEventListener(eventType, callback, false);
            }};
        } else if (target.attachEvent) {
          target.attachEvent('on' + eventType, callback);
          return {remove: function() {
              target.detachEvent('on' + eventType, callback);
            }};
        }
      },
      capture: function(target, eventType, callback) {
        if (!target.addEventListener) {
          if ("production" !== process.env.NODE_ENV) {
            console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
          }
          return {remove: emptyFunction};
        } else {
          target.addEventListener(eventType, callback, true);
          return {remove: function() {
              target.removeEventListener(eventType, callback, true);
            }};
        }
      },
      registerDefault: function() {}
    };
    module.exports = EventListener;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactInjection", ["npm:react@0.12.2/lib/DOMProperty", "npm:react@0.12.2/lib/EventPluginHub", "npm:react@0.12.2/lib/ReactComponent", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactEmptyComponent", "npm:react@0.12.2/lib/ReactBrowserEventEmitter", "npm:react@0.12.2/lib/ReactNativeComponent", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/ReactRootIndex", "npm:react@0.12.2/lib/ReactUpdates"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var DOMProperty = require("npm:react@0.12.2/lib/DOMProperty");
  var EventPluginHub = require("npm:react@0.12.2/lib/EventPluginHub");
  var ReactComponent = require("npm:react@0.12.2/lib/ReactComponent");
  var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
  var ReactEmptyComponent = require("npm:react@0.12.2/lib/ReactEmptyComponent");
  var ReactBrowserEventEmitter = require("npm:react@0.12.2/lib/ReactBrowserEventEmitter");
  var ReactNativeComponent = require("npm:react@0.12.2/lib/ReactNativeComponent");
  var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
  var ReactRootIndex = require("npm:react@0.12.2/lib/ReactRootIndex");
  var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
  var ReactInjection = {
    Component: ReactComponent.injection,
    CompositeComponent: ReactCompositeComponent.injection,
    DOMProperty: DOMProperty.injection,
    EmptyComponent: ReactEmptyComponent.injection,
    EventPluginHub: EventPluginHub.injection,
    EventEmitter: ReactBrowserEventEmitter.injection,
    NativeComponent: ReactNativeComponent.injection,
    Perf: ReactPerf.injection,
    RootIndex: ReactRootIndex.injection,
    Updates: ReactUpdates.injection
  };
  module.exports = ReactInjection;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/shallowEqual", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }
    var key;
    for (key in objA) {
      if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
        return false;
      }
    }
    for (key in objB) {
      if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  module.exports = shallowEqual;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ServerReactRootIndex", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);
  var ServerReactRootIndex = {createReactRootIndex: function() {
      return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
    }};
  module.exports = ServerReactRootIndex;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticClipboardEvent", ["npm:react@0.12.2/lib/SyntheticEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticEvent = require("npm:react@0.12.2/lib/SyntheticEvent");
  var ClipboardEventInterface = {clipboardData: function(event) {
      return ('clipboardData' in event ? event.clipboardData : window.clipboardData);
    }};
  function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);
  module.exports = SyntheticClipboardEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticFocusEvent", ["npm:react@0.12.2/lib/SyntheticUIEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticUIEvent = require("npm:react@0.12.2/lib/SyntheticUIEvent");
  var FocusEventInterface = {relatedTarget: null};
  function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);
  module.exports = SyntheticFocusEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getEventCharCode", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function getEventCharCode(nativeEvent) {
    var charCode;
    var keyCode = nativeEvent.keyCode;
    if ('charCode' in nativeEvent) {
      charCode = nativeEvent.charCode;
      if (charCode === 0 && keyCode === 13) {
        charCode = 13;
      }
    } else {
      charCode = keyCode;
    }
    if (charCode >= 32 || charCode === 13) {
      return charCode;
    }
    return 0;
  }
  module.exports = getEventCharCode;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/getEventKey", ["npm:react@0.12.2/lib/getEventCharCode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var getEventCharCode = require("npm:react@0.12.2/lib/getEventCharCode");
  var normalizeKey = {
    'Esc': 'Escape',
    'Spacebar': ' ',
    'Left': 'ArrowLeft',
    'Up': 'ArrowUp',
    'Right': 'ArrowRight',
    'Down': 'ArrowDown',
    'Del': 'Delete',
    'Win': 'OS',
    'Menu': 'ContextMenu',
    'Apps': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'MozPrintableKey': 'Unidentified'
  };
  var translateToKey = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta'
  };
  function getEventKey(nativeEvent) {
    if (nativeEvent.key) {
      var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
      if (key !== 'Unidentified') {
        return key;
      }
    }
    if (nativeEvent.type === 'keypress') {
      var charCode = getEventCharCode(nativeEvent);
      return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
    }
    if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
      return translateToKey[nativeEvent.keyCode] || 'Unidentified';
    }
    return '';
  }
  module.exports = getEventKey;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticDragEvent", ["npm:react@0.12.2/lib/SyntheticMouseEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticMouseEvent = require("npm:react@0.12.2/lib/SyntheticMouseEvent");
  var DragEventInterface = {dataTransfer: null};
  function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);
  module.exports = SyntheticDragEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticTouchEvent", ["npm:react@0.12.2/lib/SyntheticUIEvent", "npm:react@0.12.2/lib/getEventModifierState"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticUIEvent = require("npm:react@0.12.2/lib/SyntheticUIEvent");
  var getEventModifierState = require("npm:react@0.12.2/lib/getEventModifierState");
  var TouchEventInterface = {
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  };
  function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);
  module.exports = SyntheticTouchEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticWheelEvent", ["npm:react@0.12.2/lib/SyntheticMouseEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticMouseEvent = require("npm:react@0.12.2/lib/SyntheticMouseEvent");
  var WheelEventInterface = {
    deltaX: function(event) {
      return ('deltaX' in event ? event.deltaX : 'wheelDeltaX' in event ? -event.wheelDeltaX : 0);
    },
    deltaY: function(event) {
      return ('deltaY' in event ? event.deltaY : 'wheelDeltaY' in event ? -event.wheelDeltaY : 'wheelDelta' in event ? -event.wheelDelta : 0);
    },
    deltaZ: null,
    deltaMode: null
  };
  function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);
  module.exports = SyntheticWheelEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SVGDOMPropertyConfig", ["npm:react@0.12.2/lib/DOMProperty"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var DOMProperty = require("npm:react@0.12.2/lib/DOMProperty");
  var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  var SVGDOMPropertyConfig = {
    Properties: {
      cx: MUST_USE_ATTRIBUTE,
      cy: MUST_USE_ATTRIBUTE,
      d: MUST_USE_ATTRIBUTE,
      dx: MUST_USE_ATTRIBUTE,
      dy: MUST_USE_ATTRIBUTE,
      fill: MUST_USE_ATTRIBUTE,
      fillOpacity: MUST_USE_ATTRIBUTE,
      fontFamily: MUST_USE_ATTRIBUTE,
      fontSize: MUST_USE_ATTRIBUTE,
      fx: MUST_USE_ATTRIBUTE,
      fy: MUST_USE_ATTRIBUTE,
      gradientTransform: MUST_USE_ATTRIBUTE,
      gradientUnits: MUST_USE_ATTRIBUTE,
      markerEnd: MUST_USE_ATTRIBUTE,
      markerMid: MUST_USE_ATTRIBUTE,
      markerStart: MUST_USE_ATTRIBUTE,
      offset: MUST_USE_ATTRIBUTE,
      opacity: MUST_USE_ATTRIBUTE,
      patternContentUnits: MUST_USE_ATTRIBUTE,
      patternUnits: MUST_USE_ATTRIBUTE,
      points: MUST_USE_ATTRIBUTE,
      preserveAspectRatio: MUST_USE_ATTRIBUTE,
      r: MUST_USE_ATTRIBUTE,
      rx: MUST_USE_ATTRIBUTE,
      ry: MUST_USE_ATTRIBUTE,
      spreadMethod: MUST_USE_ATTRIBUTE,
      stopColor: MUST_USE_ATTRIBUTE,
      stopOpacity: MUST_USE_ATTRIBUTE,
      stroke: MUST_USE_ATTRIBUTE,
      strokeDasharray: MUST_USE_ATTRIBUTE,
      strokeLinecap: MUST_USE_ATTRIBUTE,
      strokeOpacity: MUST_USE_ATTRIBUTE,
      strokeWidth: MUST_USE_ATTRIBUTE,
      textAnchor: MUST_USE_ATTRIBUTE,
      transform: MUST_USE_ATTRIBUTE,
      version: MUST_USE_ATTRIBUTE,
      viewBox: MUST_USE_ATTRIBUTE,
      x1: MUST_USE_ATTRIBUTE,
      x2: MUST_USE_ATTRIBUTE,
      x: MUST_USE_ATTRIBUTE,
      y1: MUST_USE_ATTRIBUTE,
      y2: MUST_USE_ATTRIBUTE,
      y: MUST_USE_ATTRIBUTE
    },
    DOMAttributeNames: {
      fillOpacity: 'fill-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      gradientTransform: 'gradientTransform',
      gradientUnits: 'gradientUnits',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      patternContentUnits: 'patternContentUnits',
      patternUnits: 'patternUnits',
      preserveAspectRatio: 'preserveAspectRatio',
      spreadMethod: 'spreadMethod',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strokeDasharray: 'stroke-dasharray',
      strokeLinecap: 'stroke-linecap',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      textAnchor: 'text-anchor',
      viewBox: 'viewBox'
    }
  };
  module.exports = SVGDOMPropertyConfig;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/createFullPageComponent", ["npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function createFullPageComponent(tag) {
      var elementFactory = ReactElement.createFactory(tag);
      var FullPageComponent = ReactCompositeComponent.createClass({
        displayName: 'ReactFullPageComponent' + tag,
        componentWillUnmount: function() {
          ("production" !== process.env.NODE_ENV ? invariant(false, '%s tried to unmount. Because of cross-browser quirks it is ' + 'impossible to unmount some top-level components (eg <html>, <head>, ' + 'and <body>) reliably and efficiently. To fix this, have a single ' + 'top-level component that never unmounts render these elements.', this.constructor.displayName) : invariant(false));
        },
        render: function() {
          return elementFactory(this.props);
        }
      });
      return FullPageComponent;
    }
    module.exports = createFullPageComponent;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDefaultPerfAnalysis", ["npm:react@0.12.2/lib/Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var DONT_CARE_THRESHOLD = 1.2;
  var DOM_OPERATION_TYPES = {
    'mountImageIntoNode': 'set innerHTML',
    INSERT_MARKUP: 'set innerHTML',
    MOVE_EXISTING: 'move',
    REMOVE_NODE: 'remove',
    TEXT_CONTENT: 'set textContent',
    'updatePropertyByID': 'update attribute',
    'deletePropertyByID': 'delete attribute',
    'updateStylesByID': 'update styles',
    'updateInnerHTMLByID': 'set innerHTML',
    'dangerouslyReplaceNodeWithMarkupByID': 'replace'
  };
  function getTotalTime(measurements) {
    var totalTime = 0;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      totalTime += measurement.totalTime;
    }
    return totalTime;
  }
  function getDOMSummary(measurements) {
    var items = [];
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var id;
      for (id in measurement.writes) {
        measurement.writes[id].forEach(function(write) {
          items.push({
            id: id,
            type: DOM_OPERATION_TYPES[write.type] || write.type,
            args: write.args
          });
        });
      }
    }
    return items;
  }
  function getExclusiveSummary(measurements) {
    var candidates = {};
    var displayName;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
      for (var id in allIDs) {
        displayName = measurement.displayNames[id].current;
        candidates[displayName] = candidates[displayName] || {
          componentName: displayName,
          inclusive: 0,
          exclusive: 0,
          render: 0,
          count: 0
        };
        if (measurement.render[id]) {
          candidates[displayName].render += measurement.render[id];
        }
        if (measurement.exclusive[id]) {
          candidates[displayName].exclusive += measurement.exclusive[id];
        }
        if (measurement.inclusive[id]) {
          candidates[displayName].inclusive += measurement.inclusive[id];
        }
        if (measurement.counts[id]) {
          candidates[displayName].count += measurement.counts[id];
        }
      }
    }
    var arr = [];
    for (displayName in candidates) {
      if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
        arr.push(candidates[displayName]);
      }
    }
    arr.sort(function(a, b) {
      return b.exclusive - a.exclusive;
    });
    return arr;
  }
  function getInclusiveSummary(measurements, onlyClean) {
    var candidates = {};
    var inclusiveKey;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
      var cleanComponents;
      if (onlyClean) {
        cleanComponents = getUnchangedComponents(measurement);
      }
      for (var id in allIDs) {
        if (onlyClean && !cleanComponents[id]) {
          continue;
        }
        var displayName = measurement.displayNames[id];
        inclusiveKey = displayName.owner + ' > ' + displayName.current;
        candidates[inclusiveKey] = candidates[inclusiveKey] || {
          componentName: inclusiveKey,
          time: 0,
          count: 0
        };
        if (measurement.inclusive[id]) {
          candidates[inclusiveKey].time += measurement.inclusive[id];
        }
        if (measurement.counts[id]) {
          candidates[inclusiveKey].count += measurement.counts[id];
        }
      }
    }
    var arr = [];
    for (inclusiveKey in candidates) {
      if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
        arr.push(candidates[inclusiveKey]);
      }
    }
    arr.sort(function(a, b) {
      return b.time - a.time;
    });
    return arr;
  }
  function getUnchangedComponents(measurement) {
    var cleanComponents = {};
    var dirtyLeafIDs = Object.keys(measurement.writes);
    var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
    for (var id in allIDs) {
      var isDirty = false;
      for (var i = 0; i < dirtyLeafIDs.length; i++) {
        if (dirtyLeafIDs[i].indexOf(id) === 0) {
          isDirty = true;
          break;
        }
      }
      if (!isDirty && measurement.counts[id] > 0) {
        cleanComponents[id] = true;
      }
    }
    return cleanComponents;
  }
  var ReactDefaultPerfAnalysis = {
    getExclusiveSummary: getExclusiveSummary,
    getInclusiveSummary: getInclusiveSummary,
    getDOMSummary: getDOMSummary,
    getTotalTime: getTotalTime
  };
  module.exports = ReactDefaultPerfAnalysis;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/performance", ["npm:react@0.12.2/lib/ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
  var performance;
  if (ExecutionEnvironment.canUseDOM) {
    performance = window.performance || window.msPerformance || window.webkitPerformance;
  }
  module.exports = performance || {};
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactServerRenderingTransaction", ["npm:react@0.12.2/lib/PooledClass", "npm:react@0.12.2/lib/CallbackQueue", "npm:react@0.12.2/lib/ReactPutListenerQueue", "npm:react@0.12.2/lib/Transaction", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var PooledClass = require("npm:react@0.12.2/lib/PooledClass");
  var CallbackQueue = require("npm:react@0.12.2/lib/CallbackQueue");
  var ReactPutListenerQueue = require("npm:react@0.12.2/lib/ReactPutListenerQueue");
  var Transaction = require("npm:react@0.12.2/lib/Transaction");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
  var ON_DOM_READY_QUEUEING = {
    initialize: function() {
      this.reactMountReady.reset();
    },
    close: emptyFunction
  };
  var PUT_LISTENER_QUEUEING = {
    initialize: function() {
      this.putListenerQueue.reset();
    },
    close: emptyFunction
  };
  var TRANSACTION_WRAPPERS = [PUT_LISTENER_QUEUEING, ON_DOM_READY_QUEUEING];
  function ReactServerRenderingTransaction(renderToStaticMarkup) {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = renderToStaticMarkup;
    this.reactMountReady = CallbackQueue.getPooled(null);
    this.putListenerQueue = ReactPutListenerQueue.getPooled();
  }
  var Mixin = {
    getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    },
    getReactMountReady: function() {
      return this.reactMountReady;
    },
    getPutListenerQueue: function() {
      return this.putListenerQueue;
    },
    destructor: function() {
      CallbackQueue.release(this.reactMountReady);
      this.reactMountReady = null;
      ReactPutListenerQueue.release(this.putListenerQueue);
      this.putListenerQueue = null;
    }
  };
  assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, Mixin);
  PooledClass.addPoolingTo(ReactServerRenderingTransaction);
  module.exports = ReactServerRenderingTransaction;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/onlyChild", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function onlyChild(children) {
      ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(children), 'onlyChild must be passed a children with exactly one child.') : invariant(ReactElement.isValidElement(children)));
      return children;
    }
    module.exports = onlyChild;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:ramda@0.10.0/dist/ramda", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  (function(process) {
    ;
    (function() {
      'use strict';
      var __ = {ramda: 'placeholder'};
      var _add = function _add(a, b) {
        return a + b;
      };
      var _all = function _all(fn, list) {
        var idx = -1;
        while (++idx < list.length) {
          if (!fn(list[idx])) {
            return false;
          }
        }
        return true;
      };
      var _any = function _any(fn, list) {
        var idx = -1;
        while (++idx < list.length) {
          if (fn(list[idx])) {
            return true;
          }
        }
        return false;
      };
      var _compose = function _compose(f, g) {
        return function() {
          return f.call(this, g.apply(this, arguments));
        };
      };
      var _concat = function _concat(set1, set2) {
        set1 = set1 || [];
        set2 = set2 || [];
        var idx;
        var len1 = set1.length;
        var len2 = set2.length;
        var result = new Array(len1 + len2);
        idx = -1;
        while (++idx < len1) {
          result[idx] = set1[idx];
        }
        idx = -1;
        while (++idx < len2) {
          result[len1 + idx] = set2[idx];
        }
        return result;
      };
      var _containsWith = function _containsWith(pred, x, list) {
        var idx = -1,
            len = list.length;
        while (++idx < len) {
          if (pred(x, list[idx])) {
            return true;
          }
        }
        return false;
      };
      var _createMaxMinBy = function _createMaxMinBy(comparator) {
        return function(valueComputer, list) {
          if (!(list && list.length > 0)) {
            return ;
          }
          var idx = 0,
              winner = list[idx],
              computedWinner = valueComputer(winner),
              computedCurrent;
          while (++idx < list.length) {
            computedCurrent = valueComputer(list[idx]);
            if (comparator(computedCurrent, computedWinner)) {
              computedWinner = computedCurrent;
              winner = list[idx];
            }
          }
          return winner;
        };
      };
      var _filter = function _filter(fn, list) {
        var idx = -1,
            len = list.length,
            result = [];
        while (++idx < len) {
          if (fn(list[idx])) {
            result[result.length] = list[idx];
          }
        }
        return result;
      };
      var _filterIndexed = function _filterIndexed(fn, list) {
        var idx = -1,
            len = list.length,
            result = [];
        while (++idx < len) {
          if (fn(list[idx], idx, list)) {
            result[result.length] = list[idx];
          }
        }
        return result;
      };
      var _forEach = function _forEach(fn, list) {
        var idx = -1,
            len = list.length;
        while (++idx < len) {
          fn(list[idx]);
        }
        return list;
      };
      var _functionsWith = function _functionsWith(fn) {
        return function(obj) {
          return _filter(function(key) {
            return typeof obj[key] === 'function';
          }, fn(obj));
        };
      };
      var _gt = function _gt(a, b) {
        return a > b;
      };
      var _indexOf = function _indexOf(list, item, from) {
        var idx = 0,
            len = list.length;
        if (typeof from == 'number') {
          idx = from < 0 ? Math.max(0, len + from) : from;
        }
        while (idx < len) {
          if (list[idx] === item) {
            return idx;
          }
          ++idx;
        }
        return -1;
      };
      var _isArray = Array.isArray || function _isArray(val) {
        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
      };
      var _isInteger = Number.isInteger || function _isInteger(n) {
        return n << 0 === n;
      };
      var _isThenable = function _isThenable(value) {
        return value != null && value === Object(value) && typeof value.then === 'function';
      };
      var _lastIndexOf = function _lastIndexOf(list, item, from) {
        var idx = list.length;
        if (typeof from == 'number') {
          idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
        }
        while (--idx >= 0) {
          if (list[idx] === item) {
            return idx;
          }
        }
        return -1;
      };
      var _lt = function _lt(a, b) {
        return a < b;
      };
      var _map = function _map(fn, list) {
        var idx = -1,
            len = list.length,
            result = new Array(len);
        while (++idx < len) {
          result[idx] = fn(list[idx]);
        }
        return result;
      };
      var _multiply = function _multiply(a, b) {
        return a * b;
      };
      var _noArgsException = function _noArgsException() {
        return new TypeError('Function called with no arguments');
      };
      var _nth = function _nth(n, list) {
        return n < 0 ? list[list.length + n] : list[n];
      };
      var _pairWith = function _pairWith(fn) {
        return function(obj) {
          return _map(function(key) {
            return [key, obj[key]];
          }, fn(obj));
        };
      };
      var _path = function _path(paths, obj) {
        var idx = -1,
            length = paths.length,
            val;
        if (obj == null) {
          return ;
        }
        val = obj;
        while (val != null && ++idx < length) {
          val = val[paths[idx]];
        }
        return val;
      };
      var _pickAll = function _pickAll(names, obj) {
        var copy = {};
        _forEach(function(name) {
          copy[name] = obj[name];
        }, names);
        return copy;
      };
      var _prepend = function _prepend(el, list) {
        return _concat([el], list);
      };
      var _reduce = function _reduce(fn, acc, list) {
        var idx = -1,
            len = list.length;
        while (++idx < len) {
          acc = fn(acc, list[idx]);
        }
        return acc;
      };
      var _satisfiesSpec = function _satisfiesSpec(spec, parsedSpec, testObj) {
        if (spec === testObj) {
          return true;
        }
        if (testObj == null) {
          return false;
        }
        parsedSpec.fn = parsedSpec.fn || [];
        parsedSpec.obj = parsedSpec.obj || [];
        var key,
            val,
            idx = -1,
            fnLen = parsedSpec.fn.length,
            j = -1,
            objLen = parsedSpec.obj.length;
        while (++idx < fnLen) {
          key = parsedSpec.fn[idx];
          val = spec[key];
          if (!(key in testObj)) {
            return false;
          }
          if (!val(testObj[key], testObj)) {
            return false;
          }
        }
        while (++j < objLen) {
          key = parsedSpec.obj[j];
          if (spec[key] !== testObj[key]) {
            return false;
          }
        }
        return true;
      };
      var _slice = function _slice(args, from, to) {
        switch (arguments.length) {
          case 0:
            throw _noArgsException();
          case 1:
            return _slice(args, 0, args.length);
          case 2:
            return _slice(args, from, args.length);
          default:
            var length = Math.max(0, to - from),
                list = new Array(length),
                idx = -1;
            while (++idx < length) {
              list[idx] = args[from + idx];
            }
            return list;
        }
      };
      var always = function always(val) {
        return function() {
          return val;
        };
      };
      var arity = function(n, fn) {
        switch (n) {
          case 0:
            return function() {
              return fn.apply(this, arguments);
            };
          case 1:
            return function(a0) {
              void a0;
              return fn.apply(this, arguments);
            };
          case 2:
            return function(a0, a1) {
              void a1;
              return fn.apply(this, arguments);
            };
          case 3:
            return function(a0, a1, a2) {
              void a2;
              return fn.apply(this, arguments);
            };
          case 4:
            return function(a0, a1, a2, a3) {
              void a3;
              return fn.apply(this, arguments);
            };
          case 5:
            return function(a0, a1, a2, a3, a4) {
              void a4;
              return fn.apply(this, arguments);
            };
          case 6:
            return function(a0, a1, a2, a3, a4, a5) {
              void a5;
              return fn.apply(this, arguments);
            };
          case 7:
            return function(a0, a1, a2, a3, a4, a5, a6) {
              void a6;
              return fn.apply(this, arguments);
            };
          case 8:
            return function(a0, a1, a2, a3, a4, a5, a6, a7) {
              void a7;
              return fn.apply(this, arguments);
            };
          case 9:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
              void a8;
              return fn.apply(this, arguments);
            };
          case 10:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
              void a9;
              return fn.apply(this, arguments);
            };
          default:
            throw new Error('First argument to arity must be a non-negative integer no greater than ten');
        }
      };
      var call = function call(fn) {
        return fn.apply(this, _slice(arguments, 1));
      };
      var comparator = function comparator(pred) {
        return function(a, b) {
          return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
        };
      };
      var cond = function cond() {
        var pairs = arguments;
        return function() {
          var idx = -1;
          while (++idx < pairs.length) {
            if (pairs[idx][0].apply(this, arguments)) {
              return pairs[idx][1].apply(this, arguments);
            }
          }
        };
      };
      var converge = function(after) {
        var fns = _slice(arguments, 1);
        return function() {
          var args = arguments;
          return after.apply(this, _map(function(fn) {
            return fn.apply(this, args);
          }, fns));
        };
      };
      var flip = function flip(fn) {
        return function(a, b) {
          switch (arguments.length) {
            case 0:
              throw _noArgsException();
            case 1:
              return function(b) {
                return fn.apply(this, [b, a].concat(_slice(arguments, 1)));
              };
            default:
              return fn.apply(this, _concat([b, a], _slice(arguments, 2)));
          }
        };
      };
      var fromPairs = function fromPairs(pairs) {
        var idx = -1,
            len = pairs.length,
            out = {};
        while (++idx < len) {
          if (_isArray(pairs[idx]) && pairs[idx].length) {
            out[pairs[idx][0]] = pairs[idx][1];
          }
        }
        return out;
      };
      var func = function func(funcName, obj) {
        switch (arguments.length) {
          case 0:
            throw _noArgsException();
          case 1:
            return function(obj) {
              return obj[funcName].apply(obj, _slice(arguments, 1));
            };
          default:
            return obj[funcName].apply(obj, _slice(arguments, 2));
        }
      };
      var identity = function identity(x) {
        return x;
      };
      var isArrayLike = function isArrayLike(x) {
        if (_isArray(x)) {
          return true;
        }
        if (!x) {
          return false;
        }
        if (typeof x !== 'object') {
          return false;
        }
        if (x instanceof String) {
          return false;
        }
        if (x.nodeType === 1) {
          return !!x.length;
        }
        if (x.length === 0) {
          return true;
        }
        if (x.length > 0) {
          return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
        }
        return false;
      };
      var isEmpty = function isEmpty(list) {
        return Object(list).length === 0;
      };
      var isNil = function isNil(x) {
        return x == null;
      };
      var isSet = function isSet(list) {
        var len = list.length;
        var idx = -1;
        while (++idx < len) {
          if (_indexOf(list, list[idx], idx + 1) >= 0) {
            return false;
          }
        }
        return true;
      };
      var keysIn = function keysIn(obj) {
        var prop,
            ks = [];
        for (prop in obj) {
          ks[ks.length] = prop;
        }
        return ks;
      };
      var nAry = function(n, fn) {
        switch (n) {
          case 0:
            return function() {
              return fn.call(this);
            };
          case 1:
            return function(a0) {
              return fn.call(this, a0);
            };
          case 2:
            return function(a0, a1) {
              return fn.call(this, a0, a1);
            };
          case 3:
            return function(a0, a1, a2) {
              return fn.call(this, a0, a1, a2);
            };
          case 4:
            return function(a0, a1, a2, a3) {
              return fn.call(this, a0, a1, a2, a3);
            };
          case 5:
            return function(a0, a1, a2, a3, a4) {
              return fn.call(this, a0, a1, a2, a3, a4);
            };
          case 6:
            return function(a0, a1, a2, a3, a4, a5) {
              return fn.call(this, a0, a1, a2, a3, a4, a5);
            };
          case 7:
            return function(a0, a1, a2, a3, a4, a5, a6) {
              return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
            };
          case 8:
            return function(a0, a1, a2, a3, a4, a5, a6, a7) {
              return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
            };
          case 9:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
              return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
            };
          case 10:
            return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
              return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            };
          default:
            throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
        }
      };
      var not = function not(f) {
        return function() {
          return !f.apply(this, arguments);
        };
      };
      var nthArg = function nthArg(n) {
        return function() {
          return _nth(n, arguments);
        };
      };
      var of = function of(x) {
        return [x];
      };
      var once = function once(fn) {
        var called = false,
            result;
        return function() {
          if (called) {
            return result;
          }
          called = true;
          result = fn.apply(this, arguments);
          return result;
        };
      };
      var prependTo = flip(_prepend);
      var prop = function prop(p, obj) {
        switch (arguments.length) {
          case 0:
            throw _noArgsException();
          case 1:
            return function _prop(obj) {
              return obj[p];
            };
        }
        return obj[p];
      };
      var propOf = flip(prop);
      var reverse = function reverse(list) {
        return _slice(list).reverse();
      };
      var toPairsIn = _pairWith(keysIn);
      var trim = function() {
        var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
        var zeroWidth = '\u200B';
        var hasProtoTrim = typeof String.prototype.trim === 'function';
        if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
          return function trim(str) {
            var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
            var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
            return str.replace(beginRx, '').replace(endRx, '');
          };
        } else {
          return function trim(str) {
            return str.trim();
          };
        }
      }();
      var type = function type(val) {
        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
      };
      var unapply = function unapply(fn) {
        if (arguments.length === 0) {
          throw _noArgsException();
        }
        return function() {
          return fn(_slice(arguments));
        };
      };
      var unary = function unary(fn) {
        return nAry(1, fn);
      };
      var valuesIn = function valuesIn(obj) {
        var prop,
            vs = [];
        for (prop in obj) {
          vs[vs.length] = obj[prop];
        }
        return vs;
      };
      var F = always(false);
      var I = identity;
      var T = always(true);
      var _append = function _append(el, list) {
        return _concat(list, [el]);
      };
      var _baseCopy = function _baseCopy(value, refFrom, refTo) {
        var copy = function copy(copiedValue) {
          var len = refFrom.length;
          var idx = -1;
          while (++idx < len) {
            if (value === refFrom[idx]) {
              return refTo[idx];
            }
          }
          refFrom[refFrom.length] = value;
          refTo[refTo.length] = copiedValue;
          for (var key in value) {
            copiedValue[key] = _baseCopy(value[key], refFrom, refTo);
          }
          return copiedValue;
        };
        switch (type(value)) {
          case 'Object':
            return copy({});
          case 'Array':
            return copy([]);
          case 'Date':
            return new Date(value);
          default:
            return value;
        }
      };
      var _checkForMethod = function _checkForMethod(methodname, fn) {
        return function(a, b, c) {
          var length = arguments.length;
          var obj = arguments[length - 1],
              callBound = obj && !_isArray(obj) && typeof obj[methodname] === 'function';
          switch (arguments.length) {
            case 0:
              return fn();
            case 1:
              return callBound ? obj[methodname]() : fn(a);
            case 2:
              return callBound ? obj[methodname](a) : fn(a, b);
            case 3:
              return callBound ? obj[methodname](a, b) : fn(a, b, c);
          }
        };
      };
      var _composeP = function _composeP(f, g) {
        return function() {
          var context = this;
          var value = g.apply(this, arguments);
          if (_isThenable(value)) {
            return value.then(function(result) {
              return f.call(context, result);
            });
          } else {
            return f.call(this, value);
          }
        };
      };
      var _contains = function _contains(a, list) {
        return _indexOf(list, a) >= 0;
      };
      var _createComposer = function _createComposer(composeFunction) {
        return function() {
          switch (arguments.length) {
            case 0:
              throw _noArgsException();
            case 1:
              return arguments[0];
            default:
              var idx = arguments.length - 1,
                  fn = arguments[idx],
                  length = fn.length;
              while (idx--) {
                fn = composeFunction(arguments[idx], fn);
              }
              return arity(length, fn);
          }
        };
      };
      var _createMaxMin = function _createMaxMin(comparator, initialVal) {
        return function(list) {
          if (arguments.length === 0) {
            throw _noArgsException();
          }
          var idx = -1,
              winner = initialVal,
              computed;
          while (++idx < list.length) {
            computed = +list[idx];
            if (comparator(computed, winner)) {
              winner = computed;
            }
          }
          return winner;
        };
      };
      var _createPartialApplicator = function _createPartialApplicator(concat) {
        return function(fn) {
          var args = _slice(arguments, 1);
          return arity(Math.max(0, fn.length - args.length), function() {
            return fn.apply(this, concat(args, arguments));
          });
        };
      };
      var _curry2 = function _curry2(fn) {
        return function(a, b) {
          switch (arguments.length) {
            case 0:
              throw _noArgsException();
            case 1:
              return function(b) {
                return fn(a, b);
              };
            default:
              return fn(a, b);
          }
        };
      };
      var _curry3 = function _curry3(fn) {
        return function(a, b, c) {
          switch (arguments.length) {
            case 0:
              throw _noArgsException();
            case 1:
              return _curry2(function(b, c) {
                return fn(a, b, c);
              });
            case 2:
              return function(c) {
                return fn(a, b, c);
              };
            default:
              return fn(a, b, c);
          }
        };
      };
      var _hasMethod = function _hasMethod(methodName, obj) {
        return obj != null && !_isArray(obj) && typeof obj[methodName] === 'function';
      };
      var _makeFlat = function _makeFlat(recursive) {
        return function flatt(list) {
          var value,
              result = [],
              idx = -1,
              j,
              ilen = list.length,
              jlen;
          while (++idx < ilen) {
            if (isArrayLike(list[idx])) {
              value = recursive ? flatt(list[idx]) : list[idx];
              j = -1;
              jlen = value.length;
              while (++j < jlen) {
                result[result.length] = value[j];
              }
            } else {
              result[result.length] = list[idx];
            }
          }
          return result;
        };
      };
      var _pickBy = function _pickBy(test, obj) {
        var copy = {};
        var prop;
        var props = keysIn(obj);
        var len = props.length;
        var idx = -1;
        while (++idx < len) {
          prop = props[idx];
          if (test(obj[prop], prop, obj)) {
            copy[prop] = obj[prop];
          }
        }
        return copy;
      };
      var _pluck = function _pluck(p, list) {
        return _map(prop(p), list);
      };
      var add = _curry2(_add);
      var all = _curry2(_all);
      var and = _curry2(function and(f, g) {
        return function _and() {
          return f.apply(this, arguments) && g.apply(this, arguments);
        };
      });
      var any = _curry2(_any);
      var append = _curry2(_append);
      var appendTo = flip(_append);
      var apply = _curry2(function apply(fn, args) {
        return fn.apply(this, args);
      });
      var binary = function binary(fn) {
        return nAry(2, fn);
      };
      var bind = _curry2(function bind(fn, thisObj) {
        return function() {
          return fn.apply(thisObj, arguments);
        };
      });
      var clone = function clone(value) {
        return _baseCopy(value, [], []);
      };
      var compose = _createComposer(_compose);
      var composeP = _createComposer(_composeP);
      var containsWith = _curry3(_containsWith);
      var createMapEntry = _curry2(function(key, val) {
        var obj = {};
        obj[key] = val;
        return obj;
      });
      var curryN = _curry2(function curryN(length, fn) {
        return function recurry(args) {
          return arity(Math.max(length - (args && args.length || 0), 0), function() {
            if (arguments.length === 0) {
              throw _noArgsException();
            }
            var newArgs = _concat(args, arguments);
            if (newArgs.length >= length) {
              return fn.apply(this, newArgs);
            } else {
              return recurry(newArgs);
            }
          });
        }([]);
      });
      var dec = add(-1);
      var defaultTo = _curry2(function _defaultTo(d, v) {
        return v == null ? d : v;
      });
      var difference = _curry2(function difference(first, second) {
        var out = [];
        var idx = -1;
        var firstLen = first.length;
        while (++idx < firstLen) {
          if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
            out[out.length] = first[idx];
          }
        }
        return out;
      });
      var differenceWith = _curry3(function differenceWith(pred, first, second) {
        var out = [];
        var idx = -1;
        var firstLen = first.length;
        var containsPred = containsWith(pred);
        while (++idx < firstLen) {
          if (!containsPred(first[idx], second) && !containsPred(first[idx], out)) {
            out[out.length] = first[idx];
          }
        }
        return out;
      });
      var dissoc = _curry2(function dissoc(prop, obj) {
        return _pickBy(function(val, key) {
          return key !== prop;
        }, obj);
      });
      var drop = _curry2(_checkForMethod('drop', function drop(n, list) {
        return n < list.length ? _slice(list, n) : [];
      }));
      var dropWhile = _curry2(function dropWhile(pred, list) {
        var idx = -1,
            len = list.length;
        while (++idx < len && pred(list[idx])) {}
        return _slice(list, idx);
      });
      var empty = function empty(x) {
        return _hasMethod('empty', x) ? x.empty() : [];
      };
      var eq = _curry2(function eq(a, b) {
        if (a === 0) {
          return 1 / a === 1 / b;
        } else {
          return a === b || a !== a && b !== b;
        }
      });
      var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
        return obj1[prop] === obj2[prop];
      });
      var filter = _curry2(_checkForMethod('filter', _filter));
      var filterIndexed = _curry2(_filterIndexed);
      var find = _curry2(function find(fn, list) {
        var idx = -1;
        var len = list.length;
        while (++idx < len) {
          if (fn(list[idx])) {
            return list[idx];
          }
        }
      });
      var findIndex = _curry2(function findIndex(fn, list) {
        var idx = -1;
        var len = list.length;
        while (++idx < len) {
          if (fn(list[idx])) {
            return idx;
          }
        }
        return -1;
      });
      var findLast = _curry2(function findLast(fn, list) {
        var idx = list.length;
        while (idx--) {
          if (fn(list[idx])) {
            return list[idx];
          }
        }
      });
      var findLastIndex = _curry2(function findLastIndex(fn, list) {
        var idx = list.length;
        while (idx--) {
          if (fn(list[idx])) {
            return idx;
          }
        }
        return -1;
      });
      var flatten = _makeFlat(true);
      var forEach = _curry2(_forEach);
      var forEachIndexed = _curry2(function forEachIndexed(fn, list) {
        var idx = -1,
            len = list.length;
        while (++idx < len) {
          fn(list[idx], idx, list);
        }
        return list;
      });
      var functionsIn = _functionsWith(keysIn);
      var get = prop;
      var groupBy = _curry2(function groupBy(fn, list) {
        return _reduce(function(acc, elt) {
          var key = fn(elt);
          acc[key] = _append(elt, acc[key] || (acc[key] = []));
          return acc;
        }, {}, list);
      });
      var has = _curry2(function(prop, obj) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      });
      var hasIn = _curry2(function(prop, obj) {
        return prop in obj;
      });
      var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
        return function _ifElse() {
          return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
        };
      });
      var inc = add(1);
      var indexOf = _curry2(function indexOf(target, list) {
        return _indexOf(list, target);
      });
      var insert = _curry3(function insert(idx, elt, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        return _concat(_append(elt, _slice(list, 0, idx)), _slice(list, idx));
      });
      var insertAll = _curry3(function insertAll(idx, elts, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
      });
      var invoker = function invoker(arity, method) {
        var initialArgs = _slice(arguments, 2);
        var len = arity - initialArgs.length;
        return curryN(len + 1, function() {
          var target = arguments[len];
          var args = initialArgs.concat(_slice(arguments, 0, len));
          return target[method].apply(target, args);
        });
      };
      var is = _curry2(function is(Ctor, val) {
        return val != null && val.constructor === Ctor || val instanceof Ctor;
      });
      var join = invoker(1, 'join');
      var keys = function() {
        var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
        var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
        return function keys(obj) {
          if (Object(obj) !== obj) {
            return [];
          }
          if (Object.keys) {
            return Object.keys(obj);
          }
          var prop,
              ks = [],
              nIdx;
          for (prop in obj) {
            if (has(prop, obj)) {
              ks[ks.length] = prop;
            }
          }
          if (hasEnumBug) {
            nIdx = nonEnumerableProps.length;
            while (nIdx--) {
              prop = nonEnumerableProps[nIdx];
              if (has(prop, obj) && !_contains(prop, ks)) {
                ks[ks.length] = prop;
              }
            }
          }
          return ks;
        };
      }();
      var lastIndexOf = _curry2(function lastIndexOf(target, list) {
        return _lastIndexOf(list, target);
      });
      var length = function length(list) {
        return list != null && is(Number, list.length) ? list.length : NaN;
      };
      var lens = _curry2(function lens(get, set) {
        var lns = function(a) {
          return get(a);
        };
        lns.set = _curry2(set);
        lns.map = _curry2(function(fn, a) {
          return set(fn(get(a)), a);
        });
        return lns;
      });
      var map = _curry2(_checkForMethod('map', _map));
      var mapAccum = _curry3(function mapAccum(fn, acc, list) {
        var idx = -1,
            len = list.length,
            result = new Array(len),
            tuple = [acc];
        while (++idx < len) {
          tuple = fn(tuple[0], list[idx]);
          result[idx] = tuple[1];
        }
        return [tuple[0], result];
      });
      var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
        var idx = list.length,
            len = list.length,
            result = new Array(len),
            tuple = [acc];
        while (idx--) {
          tuple = fn(tuple[0], list[idx]);
          result[idx] = tuple[1];
        }
        return [tuple[0], result];
      });
      var mapIndexed = _curry2(function mapIndexed(fn, list) {
        var idx = -1,
            len = list.length,
            result = new Array(len);
        while (++idx < len) {
          result[idx] = fn(list[idx], idx, list);
        }
        return result;
      });
      var mapObj = _curry2(function mapObject(fn, obj) {
        return _reduce(function(acc, key) {
          acc[key] = fn(obj[key]);
          return acc;
        }, {}, keys(obj));
      });
      var mapObjIndexed = _curry2(function mapObjectIndexed(fn, obj) {
        return _reduce(function(acc, key) {
          acc[key] = fn(obj[key], key, obj);
          return acc;
        }, {}, keys(obj));
      });
      var match = invoker(1, 'match');
      var max = _createMaxMin(_gt, -Infinity);
      var maxBy = _curry2(_createMaxMinBy(_gt));
      var memoize = function() {
        var repr = function(x) {
          return x + '::' + Object.prototype.toString.call(x);
        };
        var serialize = function(args) {
          return args.length + ':{' + _map(repr, args).join(',') + '}';
        };
        return function memoize(fn) {
          var cache = {};
          return function() {
            var key = serialize(arguments);
            if (!has(key, cache)) {
              cache[key] = fn.apply(this, arguments);
            }
            return cache[key];
          };
        };
      }();
      var min = _createMaxMin(_lt, Infinity);
      var minBy = _curry2(_createMaxMinBy(_lt));
      var multiply = _curry2(_multiply);
      var negate = multiply(-1);
      var nth = _curry2(_nth);
      var omit = _curry2(function omit(names, obj) {
        return _pickBy(function(val, key) {
          return !_contains(key, names);
        }, obj);
      });
      var or = _curry2(function or(f, g) {
        return function _or() {
          return f.apply(this, arguments) || g.apply(this, arguments);
        };
      });
      var partial = _createPartialApplicator(_concat);
      var partialRight = _createPartialApplicator(flip(_concat));
      var partition = _curry2(function partition(pred, list) {
        return _reduce(function(acc, elt) {
          acc[pred(elt) ? 0 : 1].push(elt);
          return acc;
        }, [[], []], list);
      });
      var pathEq = _curry3(function(path, val, obj) {
        return _path(path.split('.'), obj) === val;
      });
      var pathOn = _curry3(function pathOn(sep, str, obj) {
        return _path(str.split(sep), obj);
      });
      var pick = _curry2(function pick(names, obj) {
        return _pickBy(function(val, key) {
          return _contains(key, names);
        }, obj);
      });
      var pickAll = _curry2(_pickAll);
      var pickBy = _curry2(_pickBy);
      var pipe = function pipe() {
        return compose.apply(this, reverse(arguments));
      };
      var pipeP = function pipeP() {
        return composeP.apply(this, reverse(arguments));
      };
      var pluck = _curry2(_pluck);
      var prepend = _curry2(_prepend);
      var propEq = _curry3(function propEq(name, val, obj) {
        return obj[name] === val;
      });
      var propOr = _curry3(function propOr(val, p, obj) {
        return has(p, obj) ? obj[p] : val;
      });
      var props = _curry2(function props(ps, obj) {
        var len = ps.length,
            out = new Array(len),
            idx = -1;
        while (++idx < len) {
          out[idx] = obj[ps[idx]];
        }
        return out;
      });
      var range = _curry2(function range(from, to) {
        if (from >= to) {
          return [];
        }
        var idx = 0,
            result = new Array(Math.floor(to) - Math.ceil(from));
        while (from < to) {
          result[idx++] = from++;
        }
        return result;
      });
      var reduce = _curry3(_reduce);
      var reduceIndexed = _curry3(function reduceIndexed(fn, acc, list) {
        var idx = -1,
            len = list.length;
        while (++idx < len) {
          acc = fn(acc, list[idx], idx, list);
        }
        return acc;
      });
      var reduceRight = _curry3(function reduceRight(fn, acc, list) {
        var idx = list.length;
        while (idx--) {
          acc = fn(acc, list[idx]);
        }
        return acc;
      });
      var reduceRightIndexed = _curry3(function reduceRightIndexed(fn, acc, list) {
        var idx = list.length;
        while (idx--) {
          acc = fn(acc, list[idx], idx, list);
        }
        return acc;
      });
      var reject = _curry2(function reject(fn, list) {
        return filter(not(fn), list);
      });
      var rejectIndexed = _curry2(function rejectIndexed(fn, list) {
        return _filterIndexed(not(fn), list);
      });
      var remove = _curry3(function remove(start, count, list) {
        return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
      });
      var replace = _curry3(function replace(regex, replacement, str) {
        return str.replace(regex, replacement);
      });
      var scan = _curry3(function scan(fn, acc, list) {
        var idx = 0,
            len = list.length + 1,
            result = new Array(len);
        result[idx] = acc;
        while (++idx < len) {
          acc = fn(acc, list[idx - 1]);
          result[idx] = acc;
        }
        return result;
      });
      var slice = invoker(2, 'slice');
      var sort = _curry2(function sort(comparator, list) {
        return clone(list).sort(comparator);
      });
      var sortBy = _curry2(function sortBy(fn, list) {
        return _slice(list).sort(function(a, b) {
          var aa = fn(a);
          var bb = fn(b);
          return aa < bb ? -1 : aa > bb ? 1 : 0;
        });
      });
      var split = invoker(1, 'split');
      var strIndexOf = _curry2(function strIndexOf(c, str) {
        return str.indexOf(c);
      });
      var strLastIndexOf = _curry2(function(c, str) {
        return str.lastIndexOf(c);
      });
      var substring = invoker(2, 'substring');
      var substringFrom = flip(substring)(void 0);
      var substringTo = substring(0);
      var sum = reduce(_add, 0);
      var tail = _checkForMethod('tail', function(list) {
        return _slice(list, 1);
      });
      var take = _curry2(_checkForMethod('take', function(n, list) {
        return _slice(list, 0, Math.min(n, list.length));
      }));
      var takeWhile = _curry2(_checkForMethod('takeWhile', function(fn, list) {
        var idx = -1,
            len = list.length;
        while (++idx < len && fn(list[idx])) {}
        return _slice(list, 0, idx);
      }));
      var tap = _curry2(function tap(fn, x) {
        fn(x);
        return x;
      });
      var times = _curry2(function times(fn, n) {
        var list = new Array(Number(n));
        var len = list.length;
        var idx = -1;
        while (++idx < len) {
          list[idx] = fn(idx);
        }
        return list;
      });
      var toLower = invoker(0, 'toLowerCase');
      var toPairs = _pairWith(keys);
      var toUpper = invoker(0, 'toUpperCase');
      var unfold = _curry2(function unfold(fn, seed) {
        var pair = fn(seed);
        var result = [];
        while (pair && pair.length) {
          result[result.length] = pair[0];
          pair = fn(pair[1]);
        }
        return result;
      });
      var uniq = function uniq(list) {
        var idx = -1,
            len = list.length;
        var result = [],
            item;
        while (++idx < len) {
          item = list[idx];
          if (!_contains(item, result)) {
            result[result.length] = item;
          }
        }
        return result;
      };
      var uniqWith = _curry2(function uniqWith(pred, list) {
        var idx = -1,
            len = list.length;
        var result = [],
            item;
        while (++idx < len) {
          item = list[idx];
          if (!_containsWith(pred, item, result)) {
            result[result.length] = item;
          }
        }
        return result;
      });
      var unnest = _makeFlat(false);
      var values = function values(obj) {
        var props = keys(obj);
        var len = props.length;
        var vals = new Array(len);
        var idx = -1;
        while (++idx < len) {
          vals[idx] = obj[props[idx]];
        }
        return vals;
      };
      var where = function where(spec, testObj) {
        var parsedSpec = groupBy(function(key) {
          return typeof spec[key] === 'function' ? 'fn' : 'obj';
        }, keys(spec));
        switch (arguments.length) {
          case 0:
            throw _noArgsException();
          case 1:
            return function(testObj) {
              return _satisfiesSpec(spec, parsedSpec, testObj);
            };
        }
        return _satisfiesSpec(spec, parsedSpec, testObj);
      };
      var wrap = function wrap(fn, wrapper) {
        return curryN(fn.length, function() {
          return wrapper.apply(this, _concat([fn], arguments));
        });
      };
      var xprod = _curry2(function xprod(a, b) {
        var idx = -1;
        var ilen = a.length;
        var j;
        var jlen = b.length;
        var result = [];
        while (++idx < ilen) {
          j = -1;
          while (++j < jlen) {
            result[result.length] = [a[idx], b[j]];
          }
        }
        return result;
      });
      var zip = _curry2(function zip(a, b) {
        var rv = [];
        var idx = -1;
        var len = Math.min(a.length, b.length);
        while (++idx < len) {
          rv[idx] = [a[idx], b[idx]];
        }
        return rv;
      });
      var zipObj = _curry2(function zipObj(keys, values) {
        var idx = -1,
            len = keys.length,
            out = {};
        while (++idx < len) {
          out[keys[idx]] = values[idx];
        }
        return out;
      });
      var zipWith = _curry3(function zipWith(fn, a, b) {
        var rv = [],
            idx = -1,
            len = Math.min(a.length, b.length);
        while (++idx < len) {
          rv[idx] = fn(a[idx], b[idx]);
        }
        return rv;
      });
      var _ap = function _ap(fns, vs) {
        return _hasMethod('ap', fns) ? fns.ap(vs) : _reduce(function(acc, fn) {
          return _concat(acc, _map(fn, vs));
        }, [], fns);
      };
      var _eqDeep = function _eqDeep(a, b, stackA, stackB) {
        var typeA = type(a);
        if (typeA !== type(b)) {
          return false;
        }
        if (eq(a, b)) {
          return true;
        }
        if (typeA == 'RegExp') {
          return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode;
        }
        if (Object(a) === a) {
          if (typeA === 'Date' && a.getTime() != b.getTime()) {
            return false;
          }
          var keysA = keys(a);
          if (keysA.length !== keys(b).length) {
            return false;
          }
          var idx = stackA.length;
          while (idx--) {
            if (stackA[idx] === a) {
              return stackB[idx] === b;
            }
          }
          stackA.push(a);
          stackB.push(b);
          idx = keysA.length;
          while (idx--) {
            var key = keysA[idx];
            if (!has(key, b) || !_eqDeep(b[key], a[key], stackA, stackB)) {
              return false;
            }
          }
          stackA.pop();
          stackB.pop();
          return true;
        }
        return false;
      };
      var _extend = function _extend(destination, other) {
        var props = keys(other),
            idx = -1,
            length = props.length;
        while (++idx < length) {
          destination[props[idx]] = other[props[idx]];
        }
        return destination;
      };
      var _predicateWrap = function _predicateWrap(predPicker) {
        return function(preds) {
          var predIterator = function() {
            var args = arguments;
            return predPicker(function(predicate) {
              return predicate.apply(null, args);
            }, preds);
          };
          return arguments.length > 1 ? predIterator.apply(null, _slice(arguments, 1)) : arity(max(_pluck('length', preds)), predIterator);
        };
      };
      var allPass = _predicateWrap(_all);
      var anyPass = _predicateWrap(_any);
      var ap = _curry2(_ap);
      var assoc = _curry3(function assoc(prop, val, obj) {
        return _extend(fromPairs(_map(function(key) {
          return [key, obj[key]];
        }, keysIn(obj))), createMapEntry(prop, val));
      });
      var assocPath = function() {
        var setParts = function(parts, val, obj) {
          if (parts.length === 1) {
            return assoc(parts[0], val, obj);
          }
          var current = obj[parts[0]];
          return assoc(parts[0], setParts(_slice(parts, 1), val, is(Object, current) ? current : {}), obj);
        };
        return function(path, val, obj) {
          var length = arguments.length;
          if (length === 0) {
            throw _noArgsException();
          }
          var parts = split('.', path);
          var fn = _curry2(function(val, obj) {
            return setParts(parts, val, obj);
          });
          switch (length) {
            case 1:
              return fn;
            case 2:
              return fn(val);
            default:
              return fn(val, obj);
          }
        };
      }();
      var chain = _curry2(_checkForMethod('chain', function chain(f, list) {
        return unnest(_map(f, list));
      }));
      var charAt = invoker(1, 'charAt');
      var charCodeAt = invoker(1, 'charCodeAt');
      var commuteMap = _curry3(function commuteMap(fn, of, list) {
        function consF(acc, ftor) {
          return _ap(_map(append, fn(ftor)), acc);
        }
        return _reduce(consF, of([]), list);
      });
      var countBy = _curry2(function countBy(fn, list) {
        var counts = {};
        var len = list.length;
        var idx = -1;
        while (++idx < len) {
          var key = fn(list[idx]);
          counts[key] = (has(key, counts) ? counts[key] : 0) + 1;
        }
        return counts;
      });
      var curry = function curry(fn) {
        return curryN(fn.length, fn);
      };
      var eqDeep = _curry2(function eqDeep(a, b) {
        return _eqDeep(a, b, [], []);
      });
      var evolve = _curry2(function evolve(transformations, object) {
        return _extend(_extend({}, object), mapObjIndexed(function(fn, key) {
          return fn(object[key]);
        }, transformations));
      });
      var functions = _functionsWith(keys);
      var head = nth(0);
      var init = slice(0, -1);
      var installTo = function(obj) {
        return _extend(obj, R);
      };
      var intersection = _curry2(function intersection(list1, list2) {
        return uniq(_filter(flip(_contains)(list1), list2));
      });
      var intersectionWith = _curry3(function intersectionWith(pred, list1, list2) {
        var results = [],
            idx = -1;
        while (++idx < list1.length) {
          if (_containsWith(pred, list1[idx], list2)) {
            results[results.length] = list1[idx];
          }
        }
        return uniqWith(pred, results);
      });
      var invert = function invert(obj) {
        var props = keys(obj);
        var len = props.length;
        var idx = -1;
        var out = {};
        while (++idx < len) {
          var key = props[idx];
          var val = obj[key];
          if (!has(val, out)) {
            out[val] = [];
          }
          out[val].push(key);
        }
        return out;
      };
      var invertObj = function invertObj(obj) {
        var props = keys(obj);
        var len = props.length;
        var idx = -1;
        var out = {};
        while (++idx < len) {
          var key = props[idx];
          out[obj[key]] = key;
        }
        return out;
      };
      var last = nth(-1);
      var liftN = _curry2(function liftN(arity, fn) {
        var lifted = curryN(arity, fn);
        if (arguments.length === 0) {
          throw _noArgsException();
        }
        return curryN(arity, function() {
          return _reduce(_ap, map(lifted, arguments[0]), _slice(arguments, 1));
        });
      });
      var op = function op(fn) {
        if (fn.length !== 2) {
          throw new Error('Expected binary function.');
        }
        return function _op(a, b) {
          switch (arguments.length) {
            case 0:
              throw _noArgsException();
            case 1:
              return a === __ ? flip(_op) : partial(fn, a);
            default:
              return a === __ ? flip(fn)(b) : fn(a, b);
          }
        };
      };
      var path = pathOn('.');
      var product = reduce(_multiply, 1);
      var repeat = _curry2(function repeat(value, n) {
        return times(always(value), n);
      });
      var subtract = op(function subtract(a, b) {
        return a - b;
      });
      var union = _curry2(compose(uniq, _concat));
      var unionWith = _curry3(function unionWith(pred, list1, list2) {
        return uniqWith(pred, _concat(list1, list2));
      });
      var useWith = function useWith(fn) {
        var transformers = _slice(arguments, 1);
        var tlen = transformers.length;
        return curry(arity(tlen, function() {
          var args = [],
              idx = -1;
          while (++idx < tlen) {
            args[args.length] = transformers[idx](arguments[idx]);
          }
          return fn.apply(this, args.concat(_slice(arguments, tlen)));
        }));
      };
      var commute = commuteMap(map(identity));
      var concat = op(function(set1, set2) {
        if (_isArray(set2)) {
          return _concat(set1, set2);
        } else if (_hasMethod('concat', set1)) {
          return set1.concat(set2);
        } else {
          throw new TypeError('can\'t concat ' + typeof set1);
        }
      });
      var constructN = _curry2(function constructN(n, Fn) {
        if (n > 10) {
          throw new Error('Constructor with greater than ten arguments');
        }
        if (n === 0) {
          return function() {
            return new Fn();
          };
        }
        return curry(nAry(n, function($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
          switch (arguments.length) {
            case 1:
              return new Fn($0);
            case 2:
              return new Fn($0, $1);
            case 3:
              return new Fn($0, $1, $2);
            case 4:
              return new Fn($0, $1, $2, $3);
            case 5:
              return new Fn($0, $1, $2, $3, $4);
            case 6:
              return new Fn($0, $1, $2, $3, $4, $5);
            case 7:
              return new Fn($0, $1, $2, $3, $4, $5, $6);
            case 8:
              return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
            case 9:
              return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
            case 10:
              return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
          }
        }));
      });
      var contains = op(_contains);
      var divide = op(function divide(a, b) {
        return a / b;
      });
      var gt = op(_gt);
      var gte = op(function gte(a, b) {
        return a >= b;
      });
      var lift = function lift(fn) {
        if (arguments.length === 0) {
          throw _noArgsException();
        }
        return liftN(fn.length, fn);
      };
      var lt = op(_lt);
      var lte = op(function lte(a, b) {
        return a <= b;
      });
      var mathMod = op(function mathMod(m, p) {
        if (!_isInteger(m)) {
          return NaN;
        }
        if (!_isInteger(p) || p < 1) {
          return NaN;
        }
        return (m % p + p) % p;
      });
      var merge = op(function merge(a, b) {
        return _extend(_extend({}, a), b);
      });
      var mergeAll = reduce(merge, {});
      var modulo = op(function modulo(a, b) {
        return a % b;
      });
      var project = useWith(_map, pickAll, identity);
      var construct = function construct(Fn) {
        return constructN(Fn.length, Fn);
      };
      var R = {
        F: F,
        I: I,
        T: T,
        __: __,
        add: add,
        all: all,
        allPass: allPass,
        always: always,
        and: and,
        any: any,
        anyPass: anyPass,
        ap: ap,
        append: append,
        appendTo: appendTo,
        apply: apply,
        arity: arity,
        assoc: assoc,
        assocPath: assocPath,
        binary: binary,
        bind: bind,
        call: call,
        chain: chain,
        charAt: charAt,
        charCodeAt: charCodeAt,
        clone: clone,
        commute: commute,
        commuteMap: commuteMap,
        comparator: comparator,
        compose: compose,
        composeP: composeP,
        concat: concat,
        cond: cond,
        construct: construct,
        constructN: constructN,
        contains: contains,
        containsWith: containsWith,
        converge: converge,
        countBy: countBy,
        createMapEntry: createMapEntry,
        curry: curry,
        curryN: curryN,
        dec: dec,
        defaultTo: defaultTo,
        difference: difference,
        differenceWith: differenceWith,
        dissoc: dissoc,
        divide: divide,
        drop: drop,
        dropWhile: dropWhile,
        empty: empty,
        eq: eq,
        eqDeep: eqDeep,
        eqProps: eqProps,
        evolve: evolve,
        filter: filter,
        filterIndexed: filterIndexed,
        find: find,
        findIndex: findIndex,
        findLast: findLast,
        findLastIndex: findLastIndex,
        flatten: flatten,
        flip: flip,
        forEach: forEach,
        forEachIndexed: forEachIndexed,
        fromPairs: fromPairs,
        func: func,
        functions: functions,
        functionsIn: functionsIn,
        get: get,
        groupBy: groupBy,
        gt: gt,
        gte: gte,
        has: has,
        hasIn: hasIn,
        head: head,
        identity: identity,
        ifElse: ifElse,
        inc: inc,
        indexOf: indexOf,
        init: init,
        insert: insert,
        insertAll: insertAll,
        installTo: installTo,
        intersection: intersection,
        intersectionWith: intersectionWith,
        invert: invert,
        invertObj: invertObj,
        invoker: invoker,
        is: is,
        isArrayLike: isArrayLike,
        isEmpty: isEmpty,
        isNil: isNil,
        isSet: isSet,
        join: join,
        keys: keys,
        keysIn: keysIn,
        last: last,
        lastIndexOf: lastIndexOf,
        length: length,
        lens: lens,
        lift: lift,
        liftN: liftN,
        lt: lt,
        lte: lte,
        map: map,
        mapAccum: mapAccum,
        mapAccumRight: mapAccumRight,
        mapIndexed: mapIndexed,
        mapObj: mapObj,
        mapObjIndexed: mapObjIndexed,
        match: match,
        mathMod: mathMod,
        max: max,
        maxBy: maxBy,
        memoize: memoize,
        merge: merge,
        mergeAll: mergeAll,
        min: min,
        minBy: minBy,
        modulo: modulo,
        multiply: multiply,
        nAry: nAry,
        negate: negate,
        not: not,
        nth: nth,
        nthArg: nthArg,
        of: of,
        omit: omit,
        once: once,
        op: op,
        or: or,
        partial: partial,
        partialRight: partialRight,
        partition: partition,
        path: path,
        pathEq: pathEq,
        pathOn: pathOn,
        pick: pick,
        pickAll: pickAll,
        pickBy: pickBy,
        pipe: pipe,
        pipeP: pipeP,
        pluck: pluck,
        prepend: prepend,
        prependTo: prependTo,
        product: product,
        project: project,
        prop: prop,
        propEq: propEq,
        propOf: propOf,
        propOr: propOr,
        props: props,
        range: range,
        reduce: reduce,
        reduceIndexed: reduceIndexed,
        reduceRight: reduceRight,
        reduceRightIndexed: reduceRightIndexed,
        reject: reject,
        rejectIndexed: rejectIndexed,
        remove: remove,
        repeat: repeat,
        replace: replace,
        reverse: reverse,
        scan: scan,
        slice: slice,
        sort: sort,
        sortBy: sortBy,
        split: split,
        strIndexOf: strIndexOf,
        strLastIndexOf: strLastIndexOf,
        substring: substring,
        substringFrom: substringFrom,
        substringTo: substringTo,
        subtract: subtract,
        sum: sum,
        tail: tail,
        take: take,
        takeWhile: takeWhile,
        tap: tap,
        times: times,
        toLower: toLower,
        toPairs: toPairs,
        toPairsIn: toPairsIn,
        toUpper: toUpper,
        trim: trim,
        type: type,
        unapply: unapply,
        unary: unary,
        unfold: unfold,
        union: union,
        unionWith: unionWith,
        uniq: uniq,
        uniqWith: uniqWith,
        unnest: unnest,
        useWith: useWith,
        values: values,
        valuesIn: valuesIn,
        where: where,
        wrap: wrap,
        xprod: xprod,
        zip: zip,
        zipObj: zipObj,
        zipWith: zipWith
      };
      if (typeof exports === 'object') {
        module.exports = R;
      } else if (typeof define === 'function' && define.amd) {
        define(function() {
          return R;
        });
      } else {
        this.R = R;
      }
    }.call(this));
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactLink", ["npm:react@0.12.2/lib/React"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2/lib/React");
  function ReactLink(value, requestChange) {
    this.value = value;
    this.requestChange = requestChange;
  }
  function createLinkTypeChecker(linkType) {
    var shapes = {
      value: typeof linkType === 'undefined' ? React.PropTypes.any.isRequired : linkType.isRequired,
      requestChange: React.PropTypes.func.isRequired
    };
    return React.PropTypes.shape(shapes);
  }
  ReactLink.PropTypes = {link: createLinkTypeChecker};
  module.exports = ReactLink;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactStateSetters", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactStateSetters = {
    createStateSetter: function(component, funcReturningState) {
      return function(a, b, c, d, e, f) {
        var partialState = funcReturningState.call(component, a, b, c, d, e, f);
        if (partialState) {
          component.setState(partialState);
        }
      };
    },
    createStateKeySetter: function(component, key) {
      var cache = component.__keySetters || (component.__keySetters = {});
      return cache[key] || (cache[key] = createStateKeySetter(component, key));
    }
  };
  function createStateKeySetter(component, key) {
    var partialState = {};
    return function stateKeySetter(value) {
      partialState[key] = value;
      component.setState(partialState);
    };
  }
  ReactStateSetters.Mixin = {
    createStateSetter: function(funcReturningState) {
      return ReactStateSetters.createStateSetter(this, funcReturningState);
    },
    createStateKeySetter: function(key) {
      return ReactStateSetters.createStateKeySetter(this, key);
    }
  };
  module.exports = ReactStateSetters;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactComponentWithPureRenderMixin", ["npm:react@0.12.2/lib/shallowEqual"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var shallowEqual = require("npm:react@0.12.2/lib/shallowEqual");
  var ReactComponentWithPureRenderMixin = {shouldComponentUpdate: function(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }};
  module.exports = ReactComponentWithPureRenderMixin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactTransitionChildMapping", ["npm:react@0.12.2/lib/ReactChildren"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactChildren = require("npm:react@0.12.2/lib/ReactChildren");
  var ReactTransitionChildMapping = {
    getChildMapping: function(children) {
      return ReactChildren.map(children, function(child) {
        return child;
      });
    },
    mergeChildMappings: function(prev, next) {
      prev = prev || {};
      next = next || {};
      function getValueForKey(key) {
        if (next.hasOwnProperty(key)) {
          return next[key];
        } else {
          return prev[key];
        }
      }
      var nextKeysPending = {};
      var pendingKeys = [];
      for (var prevKey in prev) {
        if (next.hasOwnProperty(prevKey)) {
          if (pendingKeys.length) {
            nextKeysPending[prevKey] = pendingKeys;
            pendingKeys = [];
          }
        } else {
          pendingKeys.push(prevKey);
        }
      }
      var i;
      var childMapping = {};
      for (var nextKey in next) {
        if (nextKeysPending.hasOwnProperty(nextKey)) {
          for (i = 0; i < nextKeysPending[nextKey].length; i++) {
            var pendingNextKey = nextKeysPending[nextKey][i];
            childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
          }
        }
        childMapping[nextKey] = getValueForKey(nextKey);
      }
      for (i = 0; i < pendingKeys.length; i++) {
        childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
      }
      return childMapping;
    }
  };
  module.exports = ReactTransitionChildMapping;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/cloneWithProps", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactPropTransferer", "npm:react@0.12.2/lib/keyOf", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactPropTransferer = require("npm:react@0.12.2/lib/ReactPropTransferer");
    var keyOf = require("npm:react@0.12.2/lib/keyOf");
    var warning = require("npm:react@0.12.2/lib/warning");
    var CHILDREN_PROP = keyOf({children: null});
    function cloneWithProps(child, props) {
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(!child.ref, 'You are calling cloneWithProps() on a child with a ref. This is ' + 'dangerous because you\'re creating a new child which will not be ' + 'added as a ref to its parent.') : null);
      }
      var newProps = ReactPropTransferer.mergeProps(props, child.props);
      if (!newProps.hasOwnProperty(CHILDREN_PROP) && child.props.hasOwnProperty(CHILDREN_PROP)) {
        newProps.children = child.props.children;
      }
      return ReactElement.createElement(child.type, newProps);
    }
    module.exports = cloneWithProps;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/CSSCore", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var CSSCore = {
      addClass: function(element, className) {
        ("production" !== process.env.NODE_ENV ? invariant(!/\s/.test(className), 'CSSCore.addClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(!/\s/.test(className)));
        if (className) {
          if (element.classList) {
            element.classList.add(className);
          } else if (!CSSCore.hasClass(element, className)) {
            element.className = element.className + ' ' + className;
          }
        }
        return element;
      },
      removeClass: function(element, className) {
        ("production" !== process.env.NODE_ENV ? invariant(!/\s/.test(className), 'CSSCore.removeClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(!/\s/.test(className)));
        if (className) {
          if (element.classList) {
            element.classList.remove(className);
          } else if (CSSCore.hasClass(element, className)) {
            element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
          }
        }
        return element;
      },
      conditionClass: function(element, className, bool) {
        return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
      },
      hasClass: function(element, className) {
        ("production" !== process.env.NODE_ENV ? invariant(!/\s/.test(className), 'CSS.hasClass takes only a single class name.') : invariant(!/\s/.test(className)));
        if (element.classList) {
          return !!className && element.classList.contains(className);
        }
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
      }
    };
    module.exports = CSSCore;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactTransitionEvents", ["npm:react@0.12.2/lib/ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
  var EVENT_NAME_MAP = {
    transitionend: {
      'transition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'mozTransitionEnd',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd'
    },
    animationend: {
      'animation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd',
      'MozAnimation': 'mozAnimationEnd',
      'OAnimation': 'oAnimationEnd',
      'msAnimation': 'MSAnimationEnd'
    }
  };
  var endEvents = [];
  function detectEvents() {
    var testEl = document.createElement('div');
    var style = testEl.style;
    if (!('AnimationEvent' in window)) {
      delete EVENT_NAME_MAP.animationend.animation;
    }
    if (!('TransitionEvent' in window)) {
      delete EVENT_NAME_MAP.transitionend.transition;
    }
    for (var baseEventName in EVENT_NAME_MAP) {
      var baseEvents = EVENT_NAME_MAP[baseEventName];
      for (var styleName in baseEvents) {
        if (styleName in style) {
          endEvents.push(baseEvents[styleName]);
          break;
        }
      }
    }
  }
  if (ExecutionEnvironment.canUseDOM) {
    detectEvents();
  }
  function addEventListener(node, eventName, eventListener) {
    node.addEventListener(eventName, eventListener, false);
  }
  function removeEventListener(node, eventName, eventListener) {
    node.removeEventListener(eventName, eventListener, false);
  }
  var ReactTransitionEvents = {
    addEndEventListener: function(node, eventListener) {
      if (endEvents.length === 0) {
        window.setTimeout(eventListener, 0);
        return ;
      }
      endEvents.forEach(function(endEvent) {
        addEventListener(node, endEvent, eventListener);
      });
    },
    removeEndEventListener: function(node, eventListener) {
      if (endEvents.length === 0) {
        return ;
      }
      endEvents.forEach(function(endEvent) {
        removeEventListener(node, endEvent, eventListener);
      });
    }
  };
  module.exports = ReactTransitionEvents;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/cx", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function cx(classNames) {
    if (typeof classNames == 'object') {
      return Object.keys(classNames).filter(function(className) {
        return classNames[className];
      }).join(' ');
    } else {
      return Array.prototype.join.call(arguments, ' ');
    }
  }
  module.exports = cx;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/update", ["npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/keyOf", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var keyOf = require("npm:react@0.12.2/lib/keyOf");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function shallowCopy(x) {
      if (Array.isArray(x)) {
        return x.concat();
      } else if (x && typeof x === 'object') {
        return assign(new x.constructor(), x);
      } else {
        return x;
      }
    }
    var COMMAND_PUSH = keyOf({$push: null});
    var COMMAND_UNSHIFT = keyOf({$unshift: null});
    var COMMAND_SPLICE = keyOf({$splice: null});
    var COMMAND_SET = keyOf({$set: null});
    var COMMAND_MERGE = keyOf({$merge: null});
    var COMMAND_APPLY = keyOf({$apply: null});
    var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];
    var ALL_COMMANDS_SET = {};
    ALL_COMMANDS_LIST.forEach(function(command) {
      ALL_COMMANDS_SET[command] = true;
    });
    function invariantArrayCase(value, spec, command) {
      ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(value), 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(Array.isArray(value)));
      var specValue = spec[command];
      ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(specValue), 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(Array.isArray(specValue)));
    }
    function update(value, spec) {
      ("production" !== process.env.NODE_ENV ? invariant(typeof spec === 'object', 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(typeof spec === 'object'));
      if (spec.hasOwnProperty(COMMAND_SET)) {
        ("production" !== process.env.NODE_ENV ? invariant(Object.keys(spec).length === 1, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(Object.keys(spec).length === 1));
        return spec[COMMAND_SET];
      }
      var nextValue = shallowCopy(value);
      if (spec.hasOwnProperty(COMMAND_MERGE)) {
        var mergeObj = spec[COMMAND_MERGE];
        ("production" !== process.env.NODE_ENV ? invariant(mergeObj && typeof mergeObj === 'object', 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(mergeObj && typeof mergeObj === 'object'));
        ("production" !== process.env.NODE_ENV ? invariant(nextValue && typeof nextValue === 'object', 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(nextValue && typeof nextValue === 'object'));
        assign(nextValue, spec[COMMAND_MERGE]);
      }
      if (spec.hasOwnProperty(COMMAND_PUSH)) {
        invariantArrayCase(value, spec, COMMAND_PUSH);
        spec[COMMAND_PUSH].forEach(function(item) {
          nextValue.push(item);
        });
      }
      if (spec.hasOwnProperty(COMMAND_UNSHIFT)) {
        invariantArrayCase(value, spec, COMMAND_UNSHIFT);
        spec[COMMAND_UNSHIFT].forEach(function(item) {
          nextValue.unshift(item);
        });
      }
      if (spec.hasOwnProperty(COMMAND_SPLICE)) {
        ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(value), 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(Array.isArray(value)));
        ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(spec[COMMAND_SPLICE]), 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(Array.isArray(spec[COMMAND_SPLICE])));
        spec[COMMAND_SPLICE].forEach(function(args) {
          ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(args), 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(Array.isArray(args)));
          nextValue.splice.apply(nextValue, args);
        });
      }
      if (spec.hasOwnProperty(COMMAND_APPLY)) {
        ("production" !== process.env.NODE_ENV ? invariant(typeof spec[COMMAND_APPLY] === 'function', 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(typeof spec[COMMAND_APPLY] === 'function'));
        nextValue = spec[COMMAND_APPLY](nextValue);
      }
      for (var k in spec) {
        if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
          nextValue[k] = update(value[k], spec[k]);
        }
      }
      return nextValue;
    }
    module.exports = update;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactTestUtils", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPluginHub", "npm:react@0.12.2/lib/EventPropagators", "npm:react@0.12.2/lib/React", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactBrowserEventEmitter", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/ReactTextComponent", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/SyntheticEvent", "npm:react@0.12.2/lib/Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
  var EventPluginHub = require("npm:react@0.12.2/lib/EventPluginHub");
  var EventPropagators = require("npm:react@0.12.2/lib/EventPropagators");
  var React = require("npm:react@0.12.2/lib/React");
  var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
  var ReactBrowserEventEmitter = require("npm:react@0.12.2/lib/ReactBrowserEventEmitter");
  var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
  var ReactTextComponent = require("npm:react@0.12.2/lib/ReactTextComponent");
  var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
  var SyntheticEvent = require("npm:react@0.12.2/lib/SyntheticEvent");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var topLevelTypes = EventConstants.topLevelTypes;
  function Event(suffix) {}
  var ReactTestUtils = {
    renderIntoDocument: function(instance) {
      var div = document.createElement('div');
      return React.render(instance, div);
    },
    isElement: function(element) {
      return ReactElement.isValidElement(element);
    },
    isElementOfType: function(inst, convenienceConstructor) {
      return (ReactElement.isValidElement(inst) && inst.type === convenienceConstructor.type);
    },
    isDOMComponent: function(inst) {
      return !!(inst && inst.mountComponent && inst.tagName);
    },
    isDOMComponentElement: function(inst) {
      return !!(inst && ReactElement.isValidElement(inst) && !!inst.tagName);
    },
    isCompositeComponent: function(inst) {
      return typeof inst.render === 'function' && typeof inst.setState === 'function';
    },
    isCompositeComponentWithType: function(inst, type) {
      return !!(ReactTestUtils.isCompositeComponent(inst) && (inst.constructor === type.type));
    },
    isCompositeComponentElement: function(inst) {
      if (!ReactElement.isValidElement(inst)) {
        return false;
      }
      var prototype = inst.type.prototype;
      return (typeof prototype.render === 'function' && typeof prototype.setState === 'function');
    },
    isCompositeComponentElementWithType: function(inst, type) {
      return !!(ReactTestUtils.isCompositeComponentElement(inst) && (inst.constructor === type));
    },
    isTextComponent: function(inst) {
      return inst instanceof ReactTextComponent.type;
    },
    findAllInRenderedTree: function(inst, test) {
      if (!inst) {
        return [];
      }
      var ret = test(inst) ? [inst] : [];
      if (ReactTestUtils.isDOMComponent(inst)) {
        var renderedChildren = inst._renderedChildren;
        var key;
        for (key in renderedChildren) {
          if (!renderedChildren.hasOwnProperty(key)) {
            continue;
          }
          ret = ret.concat(ReactTestUtils.findAllInRenderedTree(renderedChildren[key], test));
        }
      } else if (ReactTestUtils.isCompositeComponent(inst)) {
        ret = ret.concat(ReactTestUtils.findAllInRenderedTree(inst._renderedComponent, test));
      }
      return ret;
    },
    scryRenderedDOMComponentsWithClass: function(root, className) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        var instClassName = inst.props.className;
        return ReactTestUtils.isDOMComponent(inst) && (instClassName && (' ' + instClassName + ' ').indexOf(' ' + className + ' ') !== -1);
      });
    },
    findRenderedDOMComponentWithClass: function(root, className) {
      var all = ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match for class:' + className);
      }
      return all[0];
    },
    scryRenderedDOMComponentsWithTag: function(root, tagName) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isDOMComponent(inst) && inst.tagName === tagName.toUpperCase();
      });
    },
    findRenderedDOMComponentWithTag: function(root, tagName) {
      var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match for tag:' + tagName);
      }
      return all[0];
    },
    scryRenderedComponentsWithType: function(root, componentType) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isCompositeComponentWithType(inst, componentType);
      });
    },
    findRenderedComponentWithType: function(root, componentType) {
      var all = ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match for componentType:' + componentType);
      }
      return all[0];
    },
    mockComponent: function(module, mockTagName) {
      mockTagName = mockTagName || module.mockTagName || "div";
      var ConvenienceConstructor = React.createClass({
        displayName: "ConvenienceConstructor",
        render: function() {
          return React.createElement(mockTagName, null, this.props.children);
        }
      });
      module.mockImplementation(ConvenienceConstructor);
      module.type = ConvenienceConstructor.type;
      module.isReactLegacyFactory = true;
      return this;
    },
    simulateNativeEventOnNode: function(topLevelType, node, fakeNativeEvent) {
      fakeNativeEvent.target = node;
      ReactBrowserEventEmitter.ReactEventListener.dispatchEvent(topLevelType, fakeNativeEvent);
    },
    simulateNativeEventOnDOMComponent: function(topLevelType, comp, fakeNativeEvent) {
      ReactTestUtils.simulateNativeEventOnNode(topLevelType, comp.getDOMNode(), fakeNativeEvent);
    },
    nativeTouchData: function(x, y) {
      return {touches: [{
          pageX: x,
          pageY: y
        }]};
    },
    Simulate: null,
    SimulateNative: {}
  };
  function makeSimulator(eventType) {
    return function(domComponentOrNode, eventData) {
      var node;
      if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
        node = domComponentOrNode.getDOMNode();
      } else if (domComponentOrNode.tagName) {
        node = domComponentOrNode;
      }
      var fakeNativeEvent = new Event();
      fakeNativeEvent.target = node;
      var event = new SyntheticEvent(ReactBrowserEventEmitter.eventNameDispatchConfigs[eventType], ReactMount.getID(node), fakeNativeEvent);
      assign(event, eventData);
      EventPropagators.accumulateTwoPhaseDispatches(event);
      ReactUpdates.batchedUpdates(function() {
        EventPluginHub.enqueueEvents(event);
        EventPluginHub.processEventQueue();
      });
    };
  }
  function buildSimulators() {
    ReactTestUtils.Simulate = {};
    var eventType;
    for (eventType in ReactBrowserEventEmitter.eventNameDispatchConfigs) {
      ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
    }
  }
  var oldInjectEventPluginOrder = EventPluginHub.injection.injectEventPluginOrder;
  EventPluginHub.injection.injectEventPluginOrder = function() {
    oldInjectEventPluginOrder.apply(this, arguments);
    buildSimulators();
  };
  var oldInjectEventPlugins = EventPluginHub.injection.injectEventPluginsByName;
  EventPluginHub.injection.injectEventPluginsByName = function() {
    oldInjectEventPlugins.apply(this, arguments);
    buildSimulators();
  };
  buildSimulators();
  function makeNativeSimulator(eventType) {
    return function(domComponentOrNode, nativeEventData) {
      var fakeNativeEvent = new Event(eventType);
      assign(fakeNativeEvent, nativeEventData);
      if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
        ReactTestUtils.simulateNativeEventOnDOMComponent(eventType, domComponentOrNode, fakeNativeEvent);
      } else if (!!domComponentOrNode.tagName) {
        ReactTestUtils.simulateNativeEventOnNode(eventType, domComponentOrNode, fakeNativeEvent);
      }
    };
  }
  var eventType;
  for (eventType in topLevelTypes) {
    var convenienceName = eventType.indexOf('top') === 0 ? eventType.charAt(3).toLowerCase() + eventType.substr(4) : eventType;
    ReactTestUtils.SimulateNative[convenienceName] = makeNativeSimulator(eventType);
  }
  module.exports = ReactTestUtils;
  global.define = __define;
  return module.exports;
});

System.register("npm:governorjs@0.0.3/lib/pure_render_mixin", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var ChildMixin = function() {
    var args = [].slice.call(arguments);
    return {shouldComponentUpdate: function(newProps) {
        var currentProps = this.props;
        return args.reduce(function(bool, arg) {
          return bool || currentProps[arg] !== newProps[arg];
        }, false);
      }};
  };
  module.exports = ChildMixin;
  global.define = __define;
  return module.exports;
});

System.register("npm:governorjs@0.0.3/lib/highlight_mixin", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    highlightTimer: null,
    componentDidUpdate: function() {
      var el = this.getDOMNode();
      if (this.highlightTimer)
        return ;
      el.classList.add('highlight');
      this.highlightTimer = setTimeout(function() {
        clearTimeout(this.highlightTimer);
        this.highlightTimer = null;
        el.classList.remove('highlight');
      }, 100);
    }
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:grapnel@0.5.8/dist/grapnel.min", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    (function(a) {
      function b(b) {
        "use strict";
        var c = this;
        return this.events = {}, this.state = null, this.options = b || {}, this.options.env = this.options.env || (0 === Object.keys(a).length && process && process.browser !== !0 ? "server" : "client"), this.options.mode = this.options.mode || ("server" !== this.options.env && this.options.pushState && a.history && a.history.pushState ? "pushState" : "hashchange"), this.version = "0.5.8", "function" == typeof a.addEventListener && (a.addEventListener("hashchange", function() {
          c.trigger("hashchange");
        }), a.addEventListener("popstate", function() {
          return c.state && null === c.state.previousState ? !1 : void c.trigger("navigate");
        })), this.fragment = {
          get: function() {
            var b;
            return b = "pushState" === c.options.mode ? a.location.pathname.replace(c.options.root, "") : "pushState" !== c.options.mode && a.location ? a.location.hash ? a.location.hash.split(c.options.hashBang ? "#!" : "#")[1] : "" : a._pathname || "";
          },
          set: function(b) {
            return "pushState" === c.options.mode ? (b = c.options.root ? c.options.root + b : b, a.history.pushState({}, null, b)) : a.location ? a.location.hash = (c.options.hashBang ? "!" : "") + b : a._pathname = b || "", c;
          },
          clear: function() {
            return "pushState" === c.options.mode ? a.history.pushState({}, null, c.options.root || "/") : a.location && (a.location.hash = c.options.hashBang ? "!" : ""), c;
          }
        }, this;
      }
      b.regexRoute = function(a, b, c, d) {
        return a instanceof RegExp ? a : (a instanceof Array && (a = "(" + a.join("|") + ")"), a = a.concat(d ? "" : "/?").replace(/\/\(/g, "(?:/").replace(/\+/g, "__plus__").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(a, c, d, e, f, g) {
          return b.push({
            name: e,
            optional: !!g
          }), c = c || "", "" + (g ? "" : c) + "(?:" + (g ? c : "") + (d || "") + (f || d && "([^/.]+?)" || "([^/]+?)") + ")" + (g || "");
        }).replace(/([\/.])/g, "\\$1").replace(/__plus__/g, "(.+)").replace(/\*/g, "(.*)"), new RegExp("^" + a + "$", c ? "" : "i"));
      }, b._forEach = function(a, b) {
        return "function" == typeof Array.prototype.forEach ? Array.prototype.forEach.call(a, b) : function(a, b) {
          for (var c = 0,
              d = this.length; d > c; ++c)
            a.call(b, this[c], c, this);
        }.call(a, b);
      }, b.prototype.get = b.prototype.add = function(a) {
        var c = this,
            d = [],
            e = Array.prototype.slice.call(arguments, 1, -1),
            f = Array.prototype.slice.call(arguments, -1)[0],
            g = b.regexRoute(a, d),
            h = function() {
              var h = c.fragment.get().match(g);
              if (h) {
                var i = {
                  params: {},
                  keys: d,
                  matches: h.slice(1)
                };
                b._forEach(i.matches, function(a, b) {
                  var c = d[b] && d[b].name ? d[b].name : b;
                  i.params[c] = a ? decodeURIComponent(a) : void 0;
                });
                var j = {
                  route: a,
                  value: c.fragment.get(),
                  params: i.params,
                  regex: h,
                  stack: [],
                  runCallback: !0,
                  callbackRan: !1,
                  propagateEvent: !0,
                  next: function() {
                    return this.stack.shift().call(c, i, j, function() {
                      j.next.call(j);
                    });
                  },
                  preventDefault: function() {
                    this.runCallback = !1;
                  },
                  stopPropagation: function() {
                    this.propagateEvent = !1;
                  },
                  parent: function() {
                    var a = !(!this.previousState || !this.previousState.value || this.previousState.value != this.value);
                    return a ? this.previousState : !1;
                  },
                  callback: function() {
                    j.callbackRan = !0, j.timeStamp = Date.now(), j.next();
                  }
                };
                if (j.stack = e.concat(f), c.trigger("match", j, i), !j.runCallback)
                  return c;
                if (j.previousState = c.state, c.state = j, j.parent() && j.parent().propagateEvent === !1)
                  return j.propagateEvent = !1, c;
                j.callback();
              }
              return c;
            },
            i = "pushState" !== c.options.mode && "server" !== c.options.env ? "hashchange" : "navigate";
        return h().on(i, h);
      }, b.prototype.trigger = function(a) {
        var c = this,
            d = Array.prototype.slice.call(arguments, 1);
        return this.events[a] && b._forEach(this.events[a], function(a) {
          a.apply(c, d);
        }), this;
      }, b.prototype.on = b.prototype.bind = function(a, c) {
        var d = this,
            e = a.split(" ");
        return b._forEach(e, function(a) {
          d.events[a] ? d.events[a].push(c) : d.events[a] = [c];
        }), this;
      }, b.prototype.context = function(a) {
        var b = this;
        return function(c, d) {
          var e = "/" !== a.slice(-1) ? a + "/" : a,
              f = e + c;
          return b.get.call(b, f, d);
        };
      }, b.prototype.navigate = function(a) {
        return this.fragment.set(a).trigger("navigate");
      }, b.listen = function() {
        var a,
            c;
        return arguments[0] && arguments[1] ? (a = arguments[0], c = arguments[1]) : c = arguments[0], function() {
          for (var a in c)
            this.get.call(this, a, c[a]);
          return this;
        }.call(new b(a || {}));
      }, "function" != typeof a.define || a.define.amd.grapnel ? "object" == typeof module && "object" == typeof module.exports ? module.exports = exports = b : a.Grapnel = b : a.define(function() {
        return a.define.amd.grapnel = !0, b;
      });
    }).call({}, "object" == typeof window ? window : this);
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/Configuration", ["npm:react@0.12.2/lib/warning", "npm:react@0.12.2/lib/invariant"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var warning = require("npm:react@0.12.2/lib/warning");
  var invariant = require("npm:react@0.12.2/lib/invariant");
  function checkPropTypes(componentName, propTypes, props) {
    for (var propName in propTypes) {
      if (propTypes.hasOwnProperty(propName)) {
        var error = propTypes[propName](props, propName, componentName);
        if (error instanceof Error)
          warning(false, error.message);
      }
    }
  }
  var Configuration = {
    statics: {validateProps: function validateProps(props) {
        checkPropTypes(this.displayName, this.propTypes, props);
      }},
    render: function render() {
      invariant(false, "%s elements are for router configuration only and should not be rendered", this.constructor.displayName);
    }
  };
  module.exports = Configuration;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/PropTypes", ["npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var ReactPropTypes = require("npm:react@0.12.2").PropTypes;
  var PropTypes = assign({falsy: function falsy(props, propName, componentName) {
      if (props[propName]) {
        return new Error("<" + componentName + "> may not have a \"" + propName + "\" prop");
      }
    }}, ReactPropTypes);
  module.exports = PropTypes;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/Navigation", ["npm:react-router@0.12.4/lib/PropTypes"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
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
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/State", ["npm:react-router@0.12.4/lib/PropTypes"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
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
  global.define = __define;
  return module.exports;
});

System.register("npm:qs@2.3.3/lib/utils", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var internals = {};
  exports.arrayToObject = function(source) {
    var obj = {};
    for (var i = 0,
        il = source.length; i < il; ++i) {
      if (typeof source[i] !== 'undefined') {
        obj[i] = source[i];
      }
    }
    return obj;
  };
  exports.merge = function(target, source) {
    if (!source) {
      return target;
    }
    if (typeof source !== 'object') {
      if (Array.isArray(target)) {
        target.push(source);
      } else {
        target[source] = true;
      }
      return target;
    }
    if (typeof target !== 'object') {
      target = [target].concat(source);
      return target;
    }
    if (Array.isArray(target) && !Array.isArray(source)) {
      target = exports.arrayToObject(target);
    }
    var keys = Object.keys(source);
    for (var k = 0,
        kl = keys.length; k < kl; ++k) {
      var key = keys[k];
      var value = source[key];
      if (!target[key]) {
        target[key] = value;
      } else {
        target[key] = exports.merge(target[key], value);
      }
    }
    return target;
  };
  exports.decode = function(str) {
    try {
      return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
      return str;
    }
  };
  exports.compact = function(obj, refs) {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    refs = refs || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
      return refs[lookup];
    }
    refs.push(obj);
    if (Array.isArray(obj)) {
      var compacted = [];
      for (var i = 0,
          il = obj.length; i < il; ++i) {
        if (typeof obj[i] !== 'undefined') {
          compacted.push(obj[i]);
        }
      }
      return compacted;
    }
    var keys = Object.keys(obj);
    for (i = 0, il = keys.length; i < il; ++i) {
      var key = keys[i];
      obj[key] = exports.compact(obj[key], refs);
    }
    return obj;
  };
  exports.isRegExp = function(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
  };
  exports.isBuffer = function(obj) {
    if (obj === null || typeof obj === 'undefined') {
      return false;
    }
    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:qs@2.3.3/lib/stringify", ["npm:qs@2.3.3/lib/utils"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var Utils = require("npm:qs@2.3.3/lib/utils");
  var internals = {
    delimiter: '&',
    indices: true
  };
  internals.stringify = function(obj, prefix, options) {
    if (Utils.isBuffer(obj)) {
      obj = obj.toString();
    } else if (obj instanceof Date) {
      obj = obj.toISOString();
    } else if (obj === null) {
      obj = '';
    }
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }
    var values = [];
    if (typeof obj === 'undefined') {
      return values;
    }
    var objKeys = Object.keys(obj);
    for (var i = 0,
        il = objKeys.length; i < il; ++i) {
      var key = objKeys[i];
      if (!options.indices && Array.isArray(obj)) {
        values = values.concat(internals.stringify(obj[key], prefix, options));
      } else {
        values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', options));
      }
    }
    return values;
  };
  module.exports = function(obj, options) {
    options = options || {};
    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
    options.indices = typeof options.indices === 'boolean' ? options.indices : internals.indices;
    var keys = [];
    if (typeof obj !== 'object' || obj === null) {
      return '';
    }
    var objKeys = Object.keys(obj);
    for (var i = 0,
        il = objKeys.length; i < il; ++i) {
      var key = objKeys[i];
      keys = keys.concat(internals.stringify(obj[key], key, options));
    }
    return keys.join(delimiter);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:qs@2.3.3/lib/parse", ["npm:qs@2.3.3/lib/utils"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var Utils = require("npm:qs@2.3.3/lib/utils");
  var internals = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parameterLimit: 1000
  };
  internals.parseValues = function(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
    for (var i = 0,
        il = parts.length; i < il; ++i) {
      var part = parts[i];
      var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
      if (pos === -1) {
        obj[Utils.decode(part)] = '';
      } else {
        var key = Utils.decode(part.slice(0, pos));
        var val = Utils.decode(part.slice(pos + 1));
        if (!obj.hasOwnProperty(key)) {
          obj[key] = val;
        } else {
          obj[key] = [].concat(obj[key]).concat(val);
        }
      }
    }
    return obj;
  };
  internals.parseObject = function(chain, val, options) {
    if (!chain.length) {
      return val;
    }
    var root = chain.shift();
    var obj = {};
    if (root === '[]') {
      obj = [];
      obj = obj.concat(internals.parseObject(chain, val, options));
    } else {
      var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
      var index = parseInt(cleanRoot, 10);
      var indexString = '' + index;
      if (!isNaN(index) && root !== cleanRoot && indexString === cleanRoot && index >= 0 && index <= options.arrayLimit) {
        obj = [];
        obj[index] = internals.parseObject(chain, val, options);
      } else {
        obj[cleanRoot] = internals.parseObject(chain, val, options);
      }
    }
    return obj;
  };
  internals.parseKeys = function(key, val, options) {
    if (!key) {
      return ;
    }
    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;
    var segment = parent.exec(key);
    if (Object.prototype.hasOwnProperty(segment[1])) {
      return ;
    }
    var keys = [];
    if (segment[1]) {
      keys.push(segment[1]);
    }
    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
      ++i;
      if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
        keys.push(segment[1]);
      }
    }
    if (segment) {
      keys.push('[' + key.slice(segment.index) + ']');
    }
    return internals.parseObject(keys, val, options);
  };
  module.exports = function(str, options) {
    if (str === '' || str === null || typeof str === 'undefined') {
      return {};
    }
    options = options || {};
    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
    var obj = {};
    var keys = Object.keys(tempObj);
    for (var i = 0,
        il = keys.length; i < il; ++i) {
      var key = keys[i];
      var newObj = internals.parseKeys(key, tempObj[key], options);
      obj = Utils.merge(obj, newObj);
    }
    return Utils.compact(obj);
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/components/NotFoundRoute", ["npm:react@0.12.2", "npm:react-router@0.12.4/lib/Configuration", "npm:react-router@0.12.4/lib/PropTypes"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  var Configuration = require("npm:react-router@0.12.4/lib/Configuration");
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
  var NotFoundRoute = React.createClass({
    displayName: "NotFoundRoute",
    mixins: [Configuration],
    propTypes: {
      name: PropTypes.string,
      path: PropTypes.falsy,
      children: PropTypes.falsy,
      handler: PropTypes.func.isRequired
    }
  });
  module.exports = NotFoundRoute;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/components/Redirect", ["npm:react@0.12.2", "npm:react-router@0.12.4/lib/Configuration", "npm:react-router@0.12.4/lib/PropTypes"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  var Configuration = require("npm:react-router@0.12.4/lib/Configuration");
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
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
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/RouteHandlerMixin", ["npm:react@0.12.2", "npm:react@0.12.2/lib/Object.assign", "npm:react-router@0.12.4/lib/PropTypes"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
  var REF_NAME = "__routeHandler__";
  var RouteHandlerMixin = {
    contextTypes: {
      getRouteAtDepth: PropTypes.func.isRequired,
      setRouteComponentAtDepth: PropTypes.func.isRequired,
      routeHandlers: PropTypes.array.isRequired
    },
    childContextTypes: {routeHandlers: PropTypes.array.isRequired},
    getChildContext: function getChildContext() {
      return {routeHandlers: this.context.routeHandlers.concat([this])};
    },
    componentDidMount: function componentDidMount() {
      this._updateRouteComponent(this.refs[REF_NAME]);
    },
    componentDidUpdate: function componentDidUpdate() {
      this._updateRouteComponent(this.refs[REF_NAME]);
    },
    componentWillUnmount: function componentWillUnmount() {
      this._updateRouteComponent(null);
    },
    _updateRouteComponent: function _updateRouteComponent(component) {
      this.context.setRouteComponentAtDepth(this.getRouteDepth(), component);
    },
    getRouteDepth: function getRouteDepth() {
      return this.context.routeHandlers.length;
    },
    createChildRouteHandler: function createChildRouteHandler(props) {
      var route = this.context.getRouteAtDepth(this.getRouteDepth());
      return route ? React.createElement(route.handler, assign({}, props || this.props, {ref: REF_NAME})) : null;
    }
  };
  module.exports = RouteHandlerMixin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/actions/LocationActions", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var LocationActions = {
    PUSH: "push",
    REPLACE: "replace",
    POP: "pop"
  };
  module.exports = LocationActions;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/History", ["npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var invariant = require("npm:react@0.12.2/lib/invariant");
  var canUseDOM = require("npm:react@0.12.2/lib/ExecutionEnvironment").canUseDOM;
  var History = {
    length: 1,
    back: function back() {
      invariant(canUseDOM, "Cannot use History.back without a DOM");
      History.length -= 1;
      window.history.back();
    }
  };
  module.exports = History;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/locations/HistoryLocation", ["npm:react-router@0.12.4/lib/actions/LocationActions", "npm:react-router@0.12.4/lib/History"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var LocationActions = require("npm:react-router@0.12.4/lib/actions/LocationActions");
  var History = require("npm:react-router@0.12.4/lib/History");
  function getWindowPath() {
    return decodeURI(window.location.pathname + window.location.search);
  }
  var _changeListeners = [];
  function notifyChange(type) {
    var change = {
      path: getWindowPath(),
      type: type
    };
    _changeListeners.forEach(function(listener) {
      listener(change);
    });
  }
  var _isListening = false;
  function onPopState(event) {
    if (event.state === undefined) {
      return ;
    }
    notifyChange(LocationActions.POP);
  }
  var HistoryLocation = {
    addChangeListener: function addChangeListener(listener) {
      _changeListeners.push(listener);
      if (!_isListening) {
        if (window.addEventListener) {
          window.addEventListener("popstate", onPopState, false);
        } else {
          window.attachEvent("onpopstate", onPopState);
        }
        _isListening = true;
      }
    },
    removeChangeListener: function removeChangeListener(listener) {
      _changeListeners = _changeListeners.filter(function(l) {
        return l !== listener;
      });
      if (_changeListeners.length === 0) {
        if (window.addEventListener) {
          window.removeEventListener("popstate", onPopState, false);
        } else {
          window.removeEvent("onpopstate", onPopState);
        }
        _isListening = false;
      }
    },
    push: function push(path) {
      window.history.pushState({path: path}, "", path);
      History.length += 1;
      notifyChange(LocationActions.PUSH);
    },
    replace: function replace(path) {
      window.history.replaceState({path: path}, "", path);
      notifyChange(LocationActions.REPLACE);
    },
    pop: History.back,
    getCurrentPath: getWindowPath,
    toString: function toString() {
      return "<HistoryLocation>";
    }
  };
  module.exports = HistoryLocation;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/locations/RefreshLocation", ["npm:react-router@0.12.4/lib/locations/HistoryLocation", "npm:react-router@0.12.4/lib/History"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var HistoryLocation = require("npm:react-router@0.12.4/lib/locations/HistoryLocation");
  var History = require("npm:react-router@0.12.4/lib/History");
  var RefreshLocation = {
    push: function push(path) {
      window.location = path;
    },
    replace: function replace(path) {
      window.location.replace(path);
    },
    pop: History.back,
    getCurrentPath: HistoryLocation.getCurrentPath,
    toString: function toString() {
      return "<RefreshLocation>";
    }
  };
  module.exports = RefreshLocation;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/locations/StaticLocation", ["npm:react@0.12.2/lib/invariant"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _prototypeProperties = function(child, staticProps, instanceProps) {
    if (staticProps)
      Object.defineProperties(child, staticProps);
    if (instanceProps)
      Object.defineProperties(child.prototype, instanceProps);
  };
  var _classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var invariant = require("npm:react@0.12.2/lib/invariant");
  function throwCannotModify() {
    invariant(false, "You cannot modify a static location");
  }
  var StaticLocation = (function() {
    function StaticLocation(path) {
      _classCallCheck(this, StaticLocation);
      this.path = path;
    }
    _prototypeProperties(StaticLocation, null, {
      getCurrentPath: {
        value: function getCurrentPath() {
          return this.path;
        },
        writable: true,
        configurable: true
      },
      toString: {
        value: function toString() {
          return "<StaticLocation path=\"" + this.path + "\">";
        },
        writable: true,
        configurable: true
      }
    });
    return StaticLocation;
  })();
  StaticLocation.prototype.push = throwCannotModify;
  StaticLocation.prototype.replace = throwCannotModify;
  StaticLocation.prototype.pop = throwCannotModify;
  module.exports = StaticLocation;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/behaviors/ImitateBrowserBehavior", ["npm:react-router@0.12.4/lib/actions/LocationActions"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var LocationActions = require("npm:react-router@0.12.4/lib/actions/LocationActions");
  var ImitateBrowserBehavior = {updateScrollPosition: function updateScrollPosition(position, actionType) {
      switch (actionType) {
        case LocationActions.PUSH:
        case LocationActions.REPLACE:
          window.scrollTo(0, 0);
          break;
        case LocationActions.POP:
          if (position) {
            window.scrollTo(position.x, position.y);
          } else {
            window.scrollTo(0, 0);
          }
          break;
      }
    }};
  module.exports = ImitateBrowserBehavior;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/behaviors/ScrollToTopBehavior", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ScrollToTopBehavior = {updateScrollPosition: function updateScrollPosition() {
      window.scrollTo(0, 0);
    }};
  module.exports = ScrollToTopBehavior;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/createRoutesFromReactChildren", ["npm:react@0.12.2", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/warning", "npm:react-router@0.12.4/lib/components/DefaultRoute", "npm:react-router@0.12.4/lib/components/NotFoundRoute", "npm:react-router@0.12.4/lib/components/Redirect", "npm:react-router@0.12.4/lib/Route"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var warning = require("npm:react@0.12.2/lib/warning");
  var DefaultRouteType = require("npm:react-router@0.12.4/lib/components/DefaultRoute").type;
  var NotFoundRouteType = require("npm:react-router@0.12.4/lib/components/NotFoundRoute").type;
  var RedirectType = require("npm:react-router@0.12.4/lib/components/Redirect").type;
  var Route = require("npm:react-router@0.12.4/lib/Route");
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
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/NavigationContext", ["npm:react-router@0.12.4/lib/PropTypes"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
  var NavigationContext = {
    childContextTypes: {
      makePath: PropTypes.func.isRequired,
      makeHref: PropTypes.func.isRequired,
      transitionTo: PropTypes.func.isRequired,
      replaceWith: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired
    },
    getChildContext: function getChildContext() {
      return {
        makePath: this.constructor.makePath.bind(this.constructor),
        makeHref: this.constructor.makeHref.bind(this.constructor),
        transitionTo: this.constructor.transitionTo.bind(this.constructor),
        replaceWith: this.constructor.replaceWith.bind(this.constructor),
        goBack: this.constructor.goBack.bind(this.constructor)
      };
    }
  };
  module.exports = NavigationContext;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/getWindowScrollPosition", ["npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var invariant = require("npm:react@0.12.2/lib/invariant");
  var canUseDOM = require("npm:react@0.12.2/lib/ExecutionEnvironment").canUseDOM;
  function getWindowScrollPosition() {
    invariant(canUseDOM, "Cannot get current scroll position without a DOM");
    return {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop
    };
  }
  module.exports = getWindowScrollPosition;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/StateContext", ["npm:react@0.12.2/lib/Object.assign", "npm:react-router@0.12.4/lib/PropTypes", "npm:react-router@0.12.4/lib/PathUtils"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
  var PathUtils = require("npm:react-router@0.12.4/lib/PathUtils");
  function routeIsActive(activeRoutes, routeName) {
    return activeRoutes.some(function(route) {
      return route.name === routeName;
    });
  }
  function paramsAreActive(activeParams, params) {
    for (var property in params)
      if (String(activeParams[property]) !== String(params[property])) {
        return false;
      }
    return true;
  }
  function queryIsActive(activeQuery, query) {
    for (var property in query)
      if (String(activeQuery[property]) !== String(query[property])) {
        return false;
      }
    return true;
  }
  var StateContext = {
    getCurrentPath: function getCurrentPath() {
      return this.state.path;
    },
    getCurrentRoutes: function getCurrentRoutes() {
      return this.state.routes.slice(0);
    },
    getCurrentPathname: function getCurrentPathname() {
      return this.state.pathname;
    },
    getCurrentParams: function getCurrentParams() {
      return assign({}, this.state.params);
    },
    getCurrentQuery: function getCurrentQuery() {
      return assign({}, this.state.query);
    },
    isActive: function isActive(to, params, query) {
      if (PathUtils.isAbsolute(to)) {
        return to === this.state.path;
      }
      return routeIsActive(this.state.routes, to) && paramsAreActive(this.state.params, params) && (query == null || queryIsActive(this.state.query, query));
    },
    childContextTypes: {
      getCurrentPath: PropTypes.func.isRequired,
      getCurrentRoutes: PropTypes.func.isRequired,
      getCurrentPathname: PropTypes.func.isRequired,
      getCurrentParams: PropTypes.func.isRequired,
      getCurrentQuery: PropTypes.func.isRequired,
      isActive: PropTypes.func.isRequired
    },
    getChildContext: function getChildContext() {
      return {
        getCurrentPath: this.getCurrentPath,
        getCurrentRoutes: this.getCurrentRoutes,
        getCurrentPathname: this.getCurrentPathname,
        getCurrentParams: this.getCurrentParams,
        getCurrentQuery: this.getCurrentQuery,
        isActive: this.isActive
      };
    }
  };
  module.exports = StateContext;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/isReactChildren", ["npm:react@0.12.2"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  function isValidChild(object) {
    return object == null || React.isValidElement(object);
  }
  function isReactChildren(object) {
    return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
  }
  module.exports = isReactChildren;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/Cancellation", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function Cancellation() {}
  module.exports = Cancellation;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/Redirect", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function Redirect(to, params, query) {
    this.to = to;
    this.params = params;
    this.query = query;
  }
  module.exports = Redirect;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/Match", ["npm:react-router@0.12.4/lib/PathUtils"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _prototypeProperties = function(child, staticProps, instanceProps) {
    if (staticProps)
      Object.defineProperties(child, staticProps);
    if (instanceProps)
      Object.defineProperties(child.prototype, instanceProps);
  };
  var _classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var PathUtils = require("npm:react-router@0.12.4/lib/PathUtils");
  function deepSearch(route, pathname, query) {
    var childRoutes = route.childRoutes;
    if (childRoutes) {
      var match,
          childRoute;
      for (var i = 0,
          len = childRoutes.length; i < len; ++i) {
        childRoute = childRoutes[i];
        if (childRoute.isDefault || childRoute.isNotFound)
          continue;
        if (match = deepSearch(childRoute, pathname, query)) {
          match.routes.unshift(route);
          return match;
        }
      }
    }
    var defaultRoute = route.defaultRoute;
    if (defaultRoute && (params = PathUtils.extractParams(defaultRoute.path, pathname))) {
      return new Match(pathname, params, query, [route, defaultRoute]);
    }
    var notFoundRoute = route.notFoundRoute;
    if (notFoundRoute && (params = PathUtils.extractParams(notFoundRoute.path, pathname))) {
      return new Match(pathname, params, query, [route, notFoundRoute]);
    }
    var params = PathUtils.extractParams(route.path, pathname);
    if (params) {
      return new Match(pathname, params, query, [route]);
    }
    return null;
  }
  var Match = (function() {
    function Match(pathname, params, query, routes) {
      _classCallCheck(this, Match);
      this.pathname = pathname;
      this.params = params;
      this.query = query;
      this.routes = routes;
    }
    _prototypeProperties(Match, {findMatch: {
        value: function findMatch(routes, path) {
          var pathname = PathUtils.withoutQuery(path);
          var query = PathUtils.extractQuery(path);
          var match = null;
          for (var i = 0,
              len = routes.length; match == null && i < len; ++i)
            match = deepSearch(routes[i], pathname, query);
          return match;
        },
        writable: true,
        configurable: true
      }});
    return Match;
  })();
  module.exports = Match;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/supportsHistory", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function supportsHistory() {
    var ua = navigator.userAgent;
    if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1) {
      return false;
    }
    return window.history && "pushState" in window.history;
  }
  module.exports = supportsHistory;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/runRouter", ["npm:react-router@0.12.4/lib/createRouter"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var createRouter = require("npm:react-router@0.12.4/lib/createRouter");
  function runRouter(routes, location, callback) {
    if (typeof location === "function") {
      callback = location;
      location = null;
    }
    var router = createRouter({
      routes: routes,
      location: location
    });
    router.run(callback);
    return router;
  }
  module.exports = runRouter;
  global.define = __define;
  return module.exports;
});

System.register("npm:process@0.10.1", ["npm:process@0.10.1/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.10.1/browser");
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/warning", ["npm:react@0.12.2/lib/emptyFunction", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
    var warning = emptyFunction;
    if ("production" !== process.env.NODE_ENV) {
      warning = function(condition, format) {
        for (var args = [],
            $__0 = 2,
            $__1 = arguments.length; $__0 < $__1; $__0++)
          args.push(arguments[$__0]);
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          var argIndex = 0;
          console.warn('Warning: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
        }
      };
    }
    module.exports = warning;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/EventConstants", ["npm:react@0.12.2/lib/keyMirror"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var keyMirror = require("npm:react@0.12.2/lib/keyMirror");
  var PropagationPhases = keyMirror({
    bubbled: null,
    captured: null
  });
  var topLevelTypes = keyMirror({
    topBlur: null,
    topChange: null,
    topClick: null,
    topCompositionEnd: null,
    topCompositionStart: null,
    topCompositionUpdate: null,
    topContextMenu: null,
    topCopy: null,
    topCut: null,
    topDoubleClick: null,
    topDrag: null,
    topDragEnd: null,
    topDragEnter: null,
    topDragExit: null,
    topDragLeave: null,
    topDragOver: null,
    topDragStart: null,
    topDrop: null,
    topError: null,
    topFocus: null,
    topInput: null,
    topKeyDown: null,
    topKeyPress: null,
    topKeyUp: null,
    topLoad: null,
    topMouseDown: null,
    topMouseMove: null,
    topMouseOut: null,
    topMouseOver: null,
    topMouseUp: null,
    topPaste: null,
    topReset: null,
    topScroll: null,
    topSelectionChange: null,
    topSubmit: null,
    topTextInput: null,
    topTouchCancel: null,
    topTouchEnd: null,
    topTouchMove: null,
    topTouchStart: null,
    topWheel: null
  });
  var EventConstants = {
    topLevelTypes: topLevelTypes,
    PropagationPhases: PropagationPhases
  };
  module.exports = EventConstants;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactContext", ["npm:react@0.12.2/lib/Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var ReactContext = {
    current: {},
    withContext: function(newContext, scopedCallback) {
      var result;
      var previousContext = ReactContext.current;
      ReactContext.current = assign({}, previousContext, newContext);
      try {
        result = scopedCallback();
      } finally {
        ReactContext.current = previousContext;
      }
      return result;
    }
  };
  module.exports = ReactContext;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactInstanceHandles", ["npm:react@0.12.2/lib/ReactRootIndex", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactRootIndex = require("npm:react@0.12.2/lib/ReactRootIndex");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var SEPARATOR = '.';
    var SEPARATOR_LENGTH = SEPARATOR.length;
    var MAX_TREE_DEPTH = 100;
    function getReactRootIDString(index) {
      return SEPARATOR + index.toString(36);
    }
    function isBoundary(id, index) {
      return id.charAt(index) === SEPARATOR || index === id.length;
    }
    function isValidID(id) {
      return id === '' || (id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR);
    }
    function isAncestorIDOf(ancestorID, descendantID) {
      return (descendantID.indexOf(ancestorID) === 0 && isBoundary(descendantID, ancestorID.length));
    }
    function getParentID(id) {
      return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
    }
    function getNextDescendantID(ancestorID, destinationID) {
      ("production" !== process.env.NODE_ENV ? invariant(isValidID(ancestorID) && isValidID(destinationID), 'getNextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID) : invariant(isValidID(ancestorID) && isValidID(destinationID)));
      ("production" !== process.env.NODE_ENV ? invariant(isAncestorIDOf(ancestorID, destinationID), 'getNextDescendantID(...): React has made an invalid assumption about ' + 'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID) : invariant(isAncestorIDOf(ancestorID, destinationID)));
      if (ancestorID === destinationID) {
        return ancestorID;
      }
      var start = ancestorID.length + SEPARATOR_LENGTH;
      for (var i = start; i < destinationID.length; i++) {
        if (isBoundary(destinationID, i)) {
          break;
        }
      }
      return destinationID.substr(0, i);
    }
    function getFirstCommonAncestorID(oneID, twoID) {
      var minLength = Math.min(oneID.length, twoID.length);
      if (minLength === 0) {
        return '';
      }
      var lastCommonMarkerIndex = 0;
      for (var i = 0; i <= minLength; i++) {
        if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
          lastCommonMarkerIndex = i;
        } else if (oneID.charAt(i) !== twoID.charAt(i)) {
          break;
        }
      }
      var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
      ("production" !== process.env.NODE_ENV ? invariant(isValidID(longestCommonID), 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID) : invariant(isValidID(longestCommonID)));
      return longestCommonID;
    }
    function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
      start = start || '';
      stop = stop || '';
      ("production" !== process.env.NODE_ENV ? invariant(start !== stop, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start) : invariant(start !== stop));
      var traverseUp = isAncestorIDOf(stop, start);
      ("production" !== process.env.NODE_ENV ? invariant(traverseUp || isAncestorIDOf(start, stop), 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' + 'not have a parent path.', start, stop) : invariant(traverseUp || isAncestorIDOf(start, stop)));
      var depth = 0;
      var traverse = traverseUp ? getParentID : getNextDescendantID;
      for (var id = start; ; id = traverse(id, stop)) {
        var ret;
        if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
          ret = cb(id, traverseUp, arg);
        }
        if (ret === false || id === stop) {
          break;
        }
        ("production" !== process.env.NODE_ENV ? invariant(depth++ < MAX_TREE_DEPTH, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' + 'traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop) : invariant(depth++ < MAX_TREE_DEPTH));
      }
    }
    var ReactInstanceHandles = {
      createReactRootID: function() {
        return getReactRootIDString(ReactRootIndex.createReactRootIndex());
      },
      createReactID: function(rootID, name) {
        return rootID + name;
      },
      getReactRootIDFromNodeID: function(id) {
        if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
          var index = id.indexOf(SEPARATOR, 1);
          return index > -1 ? id.substr(0, index) : id;
        }
        return null;
      },
      traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
        var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
        if (ancestorID !== leaveID) {
          traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
        }
        if (ancestorID !== enterID) {
          traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
        }
      },
      traverseTwoPhase: function(targetID, cb, arg) {
        if (targetID) {
          traverseParentPath('', targetID, cb, arg, true, false);
          traverseParentPath(targetID, '', cb, arg, false, true);
        }
      },
      traverseAncestors: function(targetID, cb, arg) {
        traverseParentPath('', targetID, cb, arg, true, false);
      },
      _getFirstCommonAncestorID: getFirstCommonAncestorID,
      _getNextDescendantID: getNextDescendantID,
      isAncestorIDOf: isAncestorIDOf,
      SEPARATOR: SEPARATOR
    };
    module.exports = ReactInstanceHandles;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactOwner", ["npm:react@0.12.2/lib/emptyObject", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var emptyObject = require("npm:react@0.12.2/lib/emptyObject");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var ReactOwner = {
      isValidOwner: function(object) {
        return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
      },
      addComponentAsRefTo: function(component, ref, owner) {
        ("production" !== process.env.NODE_ENV ? invariant(ReactOwner.isValidOwner(owner), 'addComponentAsRefTo(...): Only a ReactOwner can have refs. This ' + 'usually means that you\'re trying to add a ref to a component that ' + 'doesn\'t have an owner (that is, was not created inside of another ' + 'component\'s `render` method). Try rendering this component inside of ' + 'a new top-level component which will hold the ref.') : invariant(ReactOwner.isValidOwner(owner)));
        owner.attachRef(ref, component);
      },
      removeComponentAsRefFrom: function(component, ref, owner) {
        ("production" !== process.env.NODE_ENV ? invariant(ReactOwner.isValidOwner(owner), 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This ' + 'usually means that you\'re trying to remove a ref to a component that ' + 'doesn\'t have an owner (that is, was not created inside of another ' + 'component\'s `render` method). Try rendering this component inside of ' + 'a new top-level component which will hold the ref.') : invariant(ReactOwner.isValidOwner(owner)));
        if (owner.refs[ref] === component) {
          owner.detachRef(ref);
        }
      },
      Mixin: {
        construct: function() {
          this.refs = emptyObject;
        },
        attachRef: function(ref, component) {
          ("production" !== process.env.NODE_ENV ? invariant(component.isOwnedBy(this), 'attachRef(%s, ...): Only a component\'s owner can store a ref to it.', ref) : invariant(component.isOwnedBy(this)));
          var refs = this.refs === emptyObject ? (this.refs = {}) : this.refs;
          refs[ref] = component;
        },
        detachRef: function(ref) {
          delete this.refs[ref];
        }
      }
    };
    module.exports = ReactOwner;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactUpdates", ["npm:react@0.12.2/lib/CallbackQueue", "npm:react@0.12.2/lib/PooledClass", "npm:react@0.12.2/lib/ReactCurrentOwner", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/Transaction", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var CallbackQueue = require("npm:react@0.12.2/lib/CallbackQueue");
    var PooledClass = require("npm:react@0.12.2/lib/PooledClass");
    var ReactCurrentOwner = require("npm:react@0.12.2/lib/ReactCurrentOwner");
    var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
    var Transaction = require("npm:react@0.12.2/lib/Transaction");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var warning = require("npm:react@0.12.2/lib/warning");
    var dirtyComponents = [];
    var asapCallbackQueue = CallbackQueue.getPooled();
    var asapEnqueued = false;
    var batchingStrategy = null;
    function ensureInjected() {
      ("production" !== process.env.NODE_ENV ? invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy));
    }
    var NESTED_UPDATES = {
      initialize: function() {
        this.dirtyComponentsLength = dirtyComponents.length;
      },
      close: function() {
        if (this.dirtyComponentsLength !== dirtyComponents.length) {
          dirtyComponents.splice(0, this.dirtyComponentsLength);
          flushBatchedUpdates();
        } else {
          dirtyComponents.length = 0;
        }
      }
    };
    var UPDATE_QUEUEING = {
      initialize: function() {
        this.callbackQueue.reset();
      },
      close: function() {
        this.callbackQueue.notifyAll();
      }
    };
    var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
    function ReactUpdatesFlushTransaction() {
      this.reinitializeTransaction();
      this.dirtyComponentsLength = null;
      this.callbackQueue = CallbackQueue.getPooled();
      this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    }
    assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
      getTransactionWrappers: function() {
        return TRANSACTION_WRAPPERS;
      },
      destructor: function() {
        this.dirtyComponentsLength = null;
        CallbackQueue.release(this.callbackQueue);
        this.callbackQueue = null;
        ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
        this.reconcileTransaction = null;
      },
      perform: function(method, scope, a) {
        return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
      }
    });
    PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
    function batchedUpdates(callback, a, b) {
      ensureInjected();
      batchingStrategy.batchedUpdates(callback, a, b);
    }
    function mountDepthComparator(c1, c2) {
      return c1._mountDepth - c2._mountDepth;
    }
    function runBatchedUpdates(transaction) {
      var len = transaction.dirtyComponentsLength;
      ("production" !== process.env.NODE_ENV ? invariant(len === dirtyComponents.length, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, dirtyComponents.length) : invariant(len === dirtyComponents.length));
      dirtyComponents.sort(mountDepthComparator);
      for (var i = 0; i < len; i++) {
        var component = dirtyComponents[i];
        if (component.isMounted()) {
          var callbacks = component._pendingCallbacks;
          component._pendingCallbacks = null;
          component.performUpdateIfNecessary(transaction.reconcileTransaction);
          if (callbacks) {
            for (var j = 0; j < callbacks.length; j++) {
              transaction.callbackQueue.enqueue(callbacks[j], component);
            }
          }
        }
      }
    }
    var flushBatchedUpdates = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', function() {
      while (dirtyComponents.length || asapEnqueued) {
        if (dirtyComponents.length) {
          var transaction = ReactUpdatesFlushTransaction.getPooled();
          transaction.perform(runBatchedUpdates, null, transaction);
          ReactUpdatesFlushTransaction.release(transaction);
        }
        if (asapEnqueued) {
          asapEnqueued = false;
          var queue = asapCallbackQueue;
          asapCallbackQueue = CallbackQueue.getPooled();
          queue.notifyAll();
          CallbackQueue.release(queue);
        }
      }
    });
    function enqueueUpdate(component, callback) {
      ("production" !== process.env.NODE_ENV ? invariant(!callback || typeof callback === "function", 'enqueueUpdate(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(!callback || typeof callback === "function"));
      ensureInjected();
      ("production" !== process.env.NODE_ENV ? warning(ReactCurrentOwner.current == null, 'enqueueUpdate(): Render methods should be a pure function of props ' + 'and state; triggering nested component updates from render is not ' + 'allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate.') : null);
      if (!batchingStrategy.isBatchingUpdates) {
        batchingStrategy.batchedUpdates(enqueueUpdate, component, callback);
        return ;
      }
      dirtyComponents.push(component);
      if (callback) {
        if (component._pendingCallbacks) {
          component._pendingCallbacks.push(callback);
        } else {
          component._pendingCallbacks = [callback];
        }
      }
    }
    function asap(callback, context) {
      ("production" !== process.env.NODE_ENV ? invariant(batchingStrategy.isBatchingUpdates, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(batchingStrategy.isBatchingUpdates));
      asapCallbackQueue.enqueue(callback, context);
      asapEnqueued = true;
    }
    var ReactUpdatesInjection = {
      injectReconcileTransaction: function(ReconcileTransaction) {
        ("production" !== process.env.NODE_ENV ? invariant(ReconcileTransaction, 'ReactUpdates: must provide a reconcile transaction class') : invariant(ReconcileTransaction));
        ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
      },
      injectBatchingStrategy: function(_batchingStrategy) {
        ("production" !== process.env.NODE_ENV ? invariant(_batchingStrategy, 'ReactUpdates: must provide a batching strategy') : invariant(_batchingStrategy));
        ("production" !== process.env.NODE_ENV ? invariant(typeof _batchingStrategy.batchedUpdates === 'function', 'ReactUpdates: must provide a batchedUpdates() function') : invariant(typeof _batchingStrategy.batchedUpdates === 'function'));
        ("production" !== process.env.NODE_ENV ? invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean', 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean'));
        batchingStrategy = _batchingStrategy;
      }
    };
    var ReactUpdates = {
      ReactReconcileTransaction: null,
      batchedUpdates: batchedUpdates,
      enqueueUpdate: enqueueUpdate,
      flushBatchedUpdates: flushBatchedUpdates,
      injection: ReactUpdatesInjection,
      asap: asap
    };
    module.exports = ReactUpdates;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactElementValidator", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactPropTypeLocations", "npm:react@0.12.2/lib/ReactCurrentOwner", "npm:react@0.12.2/lib/monitorCodeUse", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactPropTypeLocations = require("npm:react@0.12.2/lib/ReactPropTypeLocations");
    var ReactCurrentOwner = require("npm:react@0.12.2/lib/ReactCurrentOwner");
    var monitorCodeUse = require("npm:react@0.12.2/lib/monitorCodeUse");
    var warning = require("npm:react@0.12.2/lib/warning");
    var ownerHasKeyUseWarning = {
      'react_key_warning': {},
      'react_numeric_key_warning': {}
    };
    var ownerHasMonitoredObjectMap = {};
    var loggedTypeFailures = {};
    var NUMERIC_PROPERTY_REGEX = /^\d+$/;
    function getCurrentOwnerDisplayName() {
      var current = ReactCurrentOwner.current;
      return current && current.constructor.displayName || undefined;
    }
    function validateExplicitKey(component, parentType) {
      if (component._store.validated || component.key != null) {
        return ;
      }
      component._store.validated = true;
      warnAndMonitorForKeyUse('react_key_warning', 'Each child in an array should have a unique "key" prop.', component, parentType);
    }
    function validatePropertyKey(name, component, parentType) {
      if (!NUMERIC_PROPERTY_REGEX.test(name)) {
        return ;
      }
      warnAndMonitorForKeyUse('react_numeric_key_warning', 'Child objects should have non-numeric keys so ordering is preserved.', component, parentType);
    }
    function warnAndMonitorForKeyUse(warningID, message, component, parentType) {
      var ownerName = getCurrentOwnerDisplayName();
      var parentName = parentType.displayName;
      var useName = ownerName || parentName;
      var memoizer = ownerHasKeyUseWarning[warningID];
      if (memoizer.hasOwnProperty(useName)) {
        return ;
      }
      memoizer[useName] = true;
      message += ownerName ? (" Check the render method of " + ownerName + ".") : (" Check the renderComponent call using <" + parentName + ">.");
      var childOwnerName = null;
      if (component._owner && component._owner !== ReactCurrentOwner.current) {
        childOwnerName = component._owner.constructor.displayName;
        message += (" It was passed a child from " + childOwnerName + ".");
      }
      message += ' See http://fb.me/react-warning-keys for more information.';
      monitorCodeUse(warningID, {
        component: useName,
        componentOwner: childOwnerName
      });
      console.warn(message);
    }
    function monitorUseOfObjectMap() {
      var currentName = getCurrentOwnerDisplayName() || '';
      if (ownerHasMonitoredObjectMap.hasOwnProperty(currentName)) {
        return ;
      }
      ownerHasMonitoredObjectMap[currentName] = true;
      monitorCodeUse('react_object_map_children');
    }
    function validateChildKeys(component, parentType) {
      if (Array.isArray(component)) {
        for (var i = 0; i < component.length; i++) {
          var child = component[i];
          if (ReactElement.isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (ReactElement.isValidElement(component)) {
        component._store.validated = true;
      } else if (component && typeof component === 'object') {
        monitorUseOfObjectMap();
        for (var name in component) {
          validatePropertyKey(name, component[name], parentType);
        }
      }
    }
    function checkPropTypes(componentName, propTypes, props, location) {
      for (var propName in propTypes) {
        if (propTypes.hasOwnProperty(propName)) {
          var error;
          try {
            error = propTypes[propName](props, propName, componentName, location);
          } catch (ex) {
            error = ex;
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            monitorCodeUse('react_failed_descriptor_type_check', {message: error.message});
          }
        }
      }
    }
    var ReactElementValidator = {
      createElement: function(type, props, children) {
        ("production" !== process.env.NODE_ENV ? warning(type != null, 'React.createElement: type should not be null or undefined. It should ' + 'be a string (for DOM elements) or a ReactClass (for composite ' + 'components).') : null);
        var element = ReactElement.createElement.apply(this, arguments);
        if (element == null) {
          return element;
        }
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
        if (type) {
          var name = type.displayName;
          if (type.propTypes) {
            checkPropTypes(name, type.propTypes, element.props, ReactPropTypeLocations.prop);
          }
          if (type.contextTypes) {
            checkPropTypes(name, type.contextTypes, element._context, ReactPropTypeLocations.context);
          }
        }
        return element;
      },
      createFactory: function(type) {
        var validatedFactory = ReactElementValidator.createElement.bind(null, type);
        validatedFactory.type = type;
        return validatedFactory;
      }
    };
    module.exports = ReactElementValidator;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactPropTransferer", ["npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/emptyFunction", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/joinClasses", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var joinClasses = require("npm:react@0.12.2/lib/joinClasses");
    var warning = require("npm:react@0.12.2/lib/warning");
    var didWarn = false;
    function createTransferStrategy(mergeStrategy) {
      return function(props, key, value) {
        if (!props.hasOwnProperty(key)) {
          props[key] = value;
        } else {
          props[key] = mergeStrategy(props[key], value);
        }
      };
    }
    var transferStrategyMerge = createTransferStrategy(function(a, b) {
      return assign({}, b, a);
    });
    var TransferStrategies = {
      children: emptyFunction,
      className: createTransferStrategy(joinClasses),
      style: transferStrategyMerge
    };
    function transferInto(props, newProps) {
      for (var thisKey in newProps) {
        if (!newProps.hasOwnProperty(thisKey)) {
          continue;
        }
        var transferStrategy = TransferStrategies[thisKey];
        if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
          transferStrategy(props, thisKey, newProps[thisKey]);
        } else if (!props.hasOwnProperty(thisKey)) {
          props[thisKey] = newProps[thisKey];
        }
      }
      return props;
    }
    var ReactPropTransferer = {
      TransferStrategies: TransferStrategies,
      mergeProps: function(oldProps, newProps) {
        return transferInto(assign({}, oldProps), newProps);
      },
      Mixin: {transferPropsTo: function(element) {
          ("production" !== process.env.NODE_ENV ? invariant(element._owner === this, '%s: You can\'t call transferPropsTo() on a component that you ' + 'don\'t own, %s. This usually means you are calling ' + 'transferPropsTo() on a component passed in as props or children.', this.constructor.displayName, typeof element.type === 'string' ? element.type : element.type.displayName) : invariant(element._owner === this));
          if ("production" !== process.env.NODE_ENV) {
            if (!didWarn) {
              didWarn = true;
              ("production" !== process.env.NODE_ENV ? warning(false, 'transferPropsTo is deprecated. ' + 'See http://fb.me/react-transferpropsto for more information.') : null);
            }
          }
          transferInto(element.props, this.props);
          return element;
        }}
    };
    module.exports = ReactPropTransferer;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/instantiateReactComponent", ["npm:react@0.12.2/lib/warning", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactLegacyElement", "npm:react@0.12.2/lib/ReactNativeComponent", "npm:react@0.12.2/lib/ReactEmptyComponent", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var warning = require("npm:react@0.12.2/lib/warning");
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactLegacyElement = require("npm:react@0.12.2/lib/ReactLegacyElement");
    var ReactNativeComponent = require("npm:react@0.12.2/lib/ReactNativeComponent");
    var ReactEmptyComponent = require("npm:react@0.12.2/lib/ReactEmptyComponent");
    function instantiateReactComponent(element, parentCompositeType) {
      var instance;
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(element && (typeof element.type === 'function' || typeof element.type === 'string'), 'Only functions or strings can be mounted as React components.') : null);
        if (element.type._mockedReactClassConstructor) {
          ReactLegacyElement._isLegacyCallWarningEnabled = false;
          try {
            instance = new element.type._mockedReactClassConstructor(element.props);
          } finally {
            ReactLegacyElement._isLegacyCallWarningEnabled = true;
          }
          if (ReactElement.isValidElement(instance)) {
            instance = new instance.type(instance.props);
          }
          var render = instance.render;
          if (!render) {
            element = ReactEmptyComponent.getEmptyComponent();
          } else {
            if (render._isMockFunction && !render._getMockImplementation()) {
              render.mockImplementation(ReactEmptyComponent.getEmptyComponent);
            }
            instance.construct(element);
            return instance;
          }
        }
      }
      if (typeof element.type === 'string') {
        instance = ReactNativeComponent.createInstanceForTag(element.type, element.props, parentCompositeType);
      } else {
        instance = new element.type(element.props);
      }
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(typeof instance.construct === 'function' && typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function', 'Only React Components can be mounted.') : null);
      }
      instance.construct(element);
      return instance;
    }
    module.exports = instantiateReactComponent;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/camelizeStyleName", ["npm:react@0.12.2/lib/camelize"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var camelize = require("npm:react@0.12.2/lib/camelize");
  var msPattern = /^-ms-/;
  function camelizeStyleName(string) {
    return camelize(string.replace(msPattern, 'ms-'));
  }
  module.exports = camelizeStyleName;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/hyphenateStyleName", ["npm:react@0.12.2/lib/hyphenate"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var hyphenate = require("npm:react@0.12.2/lib/hyphenate");
  var msPattern = /^ms-/;
  function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
  }
  module.exports = hyphenateStyleName;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/EventPluginHub", ["npm:react@0.12.2/lib/EventPluginRegistry", "npm:react@0.12.2/lib/EventPluginUtils", "npm:react@0.12.2/lib/accumulateInto", "npm:react@0.12.2/lib/forEachAccumulated", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var EventPluginRegistry = require("npm:react@0.12.2/lib/EventPluginRegistry");
    var EventPluginUtils = require("npm:react@0.12.2/lib/EventPluginUtils");
    var accumulateInto = require("npm:react@0.12.2/lib/accumulateInto");
    var forEachAccumulated = require("npm:react@0.12.2/lib/forEachAccumulated");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var listenerBank = {};
    var eventQueue = null;
    var executeDispatchesAndRelease = function(event) {
      if (event) {
        var executeDispatch = EventPluginUtils.executeDispatch;
        var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
        if (PluginModule && PluginModule.executeDispatch) {
          executeDispatch = PluginModule.executeDispatch;
        }
        EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);
        if (!event.isPersistent()) {
          event.constructor.release(event);
        }
      }
    };
    var InstanceHandle = null;
    function validateInstanceHandle() {
      var invalid = !InstanceHandle || !InstanceHandle.traverseTwoPhase || !InstanceHandle.traverseEnterLeave;
      if (invalid) {
        throw new Error('InstanceHandle not injected before use!');
      }
    }
    var EventPluginHub = {
      injection: {
        injectMount: EventPluginUtils.injection.injectMount,
        injectInstanceHandle: function(InjectedInstanceHandle) {
          InstanceHandle = InjectedInstanceHandle;
          if ("production" !== process.env.NODE_ENV) {
            validateInstanceHandle();
          }
        },
        getInstanceHandle: function() {
          if ("production" !== process.env.NODE_ENV) {
            validateInstanceHandle();
          }
          return InstanceHandle;
        },
        injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
        injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
      },
      eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,
      registrationNameModules: EventPluginRegistry.registrationNameModules,
      putListener: function(id, registrationName, listener) {
        ("production" !== process.env.NODE_ENV ? invariant(!listener || typeof listener === 'function', 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : invariant(!listener || typeof listener === 'function'));
        var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
        bankForRegistrationName[id] = listener;
      },
      getListener: function(id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        return bankForRegistrationName && bankForRegistrationName[id];
      },
      deleteListener: function(id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        if (bankForRegistrationName) {
          delete bankForRegistrationName[id];
        }
      },
      deleteAllListeners: function(id) {
        for (var registrationName in listenerBank) {
          delete listenerBank[registrationName][id];
        }
      },
      extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
        var events;
        var plugins = EventPluginRegistry.plugins;
        for (var i = 0,
            l = plugins.length; i < l; i++) {
          var possiblePlugin = plugins[i];
          if (possiblePlugin) {
            var extractedEvents = possiblePlugin.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent);
            if (extractedEvents) {
              events = accumulateInto(events, extractedEvents);
            }
          }
        }
        return events;
      },
      enqueueEvents: function(events) {
        if (events) {
          eventQueue = accumulateInto(eventQueue, events);
        }
      },
      processEventQueue: function() {
        var processingEventQueue = eventQueue;
        eventQueue = null;
        forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
        ("production" !== process.env.NODE_ENV ? invariant(!eventQueue, 'processEventQueue(): Additional events were enqueued while processing ' + 'an event queue. Support for this has not yet been implemented.') : invariant(!eventQueue));
      },
      __purge: function() {
        listenerBank = {};
      },
      __getListenerBank: function() {
        return listenerBank;
      }
    };
    module.exports = EventPluginHub;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ViewportMetrics", ["npm:react@0.12.2/lib/getUnboundedScrollPosition"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var getUnboundedScrollPosition = require("npm:react@0.12.2/lib/getUnboundedScrollPosition");
  var ViewportMetrics = {
    currentScrollLeft: 0,
    currentScrollTop: 0,
    refreshScrollValues: function() {
      var scrollPosition = getUnboundedScrollPosition(window);
      ViewportMetrics.currentScrollLeft = scrollPosition.x;
      ViewportMetrics.currentScrollTop = scrollPosition.y;
    }
  };
  module.exports = ViewportMetrics;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/isTextNode", ["npm:react@0.12.2/lib/isNode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isNode = require("npm:react@0.12.2/lib/isNode");
  function isTextNode(object) {
    return isNode(object) && object.nodeType == 3;
  }
  module.exports = isTextNode;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/flattenChildren", ["npm:react@0.12.2/lib/ReactTextComponent", "npm:react@0.12.2/lib/traverseAllChildren", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactTextComponent = require("npm:react@0.12.2/lib/ReactTextComponent");
    var traverseAllChildren = require("npm:react@0.12.2/lib/traverseAllChildren");
    var warning = require("npm:react@0.12.2/lib/warning");
    function flattenSingleChildIntoContext(traverseContext, child, name) {
      var result = traverseContext;
      var keyUnique = !result.hasOwnProperty(name);
      ("production" !== process.env.NODE_ENV ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : null);
      if (keyUnique && child != null) {
        var type = typeof child;
        var normalizedValue;
        if (type === 'string') {
          normalizedValue = ReactTextComponent(child);
        } else if (type === 'number') {
          normalizedValue = ReactTextComponent('' + child);
        } else {
          normalizedValue = child;
        }
        result[name] = normalizedValue;
      }
    }
    function flattenChildren(children) {
      if (children == null) {
        return children;
      }
      var result = {};
      traverseAllChildren(children, flattenSingleChildIntoContext, result);
      return result;
    }
    module.exports = flattenChildren;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticEvent", ["npm:react@0.12.2/lib/PooledClass", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/emptyFunction", "npm:react@0.12.2/lib/getEventTarget"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var PooledClass = require("npm:react@0.12.2/lib/PooledClass");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
  var getEventTarget = require("npm:react@0.12.2/lib/getEventTarget");
  var EventInterface = {
    type: null,
    target: getEventTarget,
    currentTarget: emptyFunction.thatReturnsNull,
    eventPhase: null,
    bubbles: null,
    cancelable: null,
    timeStamp: function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: null,
    isTrusted: null
  };
  function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    this.dispatchConfig = dispatchConfig;
    this.dispatchMarker = dispatchMarker;
    this.nativeEvent = nativeEvent;
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      if (!Interface.hasOwnProperty(propName)) {
        continue;
      }
      var normalize = Interface[propName];
      if (normalize) {
        this[propName] = normalize(nativeEvent);
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
    var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
    if (defaultPrevented) {
      this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    } else {
      this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
    }
    this.isPropagationStopped = emptyFunction.thatReturnsFalse;
  }
  assign(SyntheticEvent.prototype, {
    preventDefault: function() {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    },
    stopPropagation: function() {
      var event = this.nativeEvent;
      event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
      this.isPropagationStopped = emptyFunction.thatReturnsTrue;
    },
    persist: function() {
      this.isPersistent = emptyFunction.thatReturnsTrue;
    },
    isPersistent: emptyFunction.thatReturnsFalse,
    destructor: function() {
      var Interface = this.constructor.Interface;
      for (var propName in Interface) {
        this[propName] = null;
      }
      this.dispatchConfig = null;
      this.dispatchMarker = null;
      this.nativeEvent = null;
    }
  });
  SyntheticEvent.Interface = EventInterface;
  SyntheticEvent.augmentClass = function(Class, Interface) {
    var Super = this;
    var prototype = Object.create(Super.prototype);
    assign(prototype, Class.prototype);
    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.Interface = assign({}, Super.Interface, Interface);
    Class.augmentClass = Super.augmentClass;
    PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
  };
  PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);
  module.exports = SyntheticEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ChangeEventPlugin", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPluginHub", "npm:react@0.12.2/lib/EventPropagators", "npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/SyntheticEvent", "npm:react@0.12.2/lib/isEventSupported", "npm:react@0.12.2/lib/isTextInputElement", "npm:react@0.12.2/lib/keyOf", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
    var EventPluginHub = require("npm:react@0.12.2/lib/EventPluginHub");
    var EventPropagators = require("npm:react@0.12.2/lib/EventPropagators");
    var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
    var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
    var SyntheticEvent = require("npm:react@0.12.2/lib/SyntheticEvent");
    var isEventSupported = require("npm:react@0.12.2/lib/isEventSupported");
    var isTextInputElement = require("npm:react@0.12.2/lib/isTextInputElement");
    var keyOf = require("npm:react@0.12.2/lib/keyOf");
    var topLevelTypes = EventConstants.topLevelTypes;
    var eventTypes = {change: {
        phasedRegistrationNames: {
          bubbled: keyOf({onChange: null}),
          captured: keyOf({onChangeCapture: null})
        },
        dependencies: [topLevelTypes.topBlur, topLevelTypes.topChange, topLevelTypes.topClick, topLevelTypes.topFocus, topLevelTypes.topInput, topLevelTypes.topKeyDown, topLevelTypes.topKeyUp, topLevelTypes.topSelectionChange]
      }};
    var activeElement = null;
    var activeElementID = null;
    var activeElementValue = null;
    var activeElementValueProp = null;
    function shouldUseChangeEvent(elem) {
      return (elem.nodeName === 'SELECT' || (elem.nodeName === 'INPUT' && elem.type === 'file'));
    }
    var doesChangeEventBubble = false;
    if (ExecutionEnvironment.canUseDOM) {
      doesChangeEventBubble = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
    }
    function manualDispatchChangeEvent(nativeEvent) {
      var event = SyntheticEvent.getPooled(eventTypes.change, activeElementID, nativeEvent);
      EventPropagators.accumulateTwoPhaseDispatches(event);
      ReactUpdates.batchedUpdates(runEventInBatch, event);
    }
    function runEventInBatch(event) {
      EventPluginHub.enqueueEvents(event);
      EventPluginHub.processEventQueue();
    }
    function startWatchingForChangeEventIE8(target, targetID) {
      activeElement = target;
      activeElementID = targetID;
      activeElement.attachEvent('onchange', manualDispatchChangeEvent);
    }
    function stopWatchingForChangeEventIE8() {
      if (!activeElement) {
        return ;
      }
      activeElement.detachEvent('onchange', manualDispatchChangeEvent);
      activeElement = null;
      activeElementID = null;
    }
    function getTargetIDForChangeEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topChange) {
        return topLevelTargetID;
      }
    }
    function handleEventsForChangeEventIE8(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topFocus) {
        stopWatchingForChangeEventIE8();
        startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
      } else if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForChangeEventIE8();
      }
    }
    var isInputEventSupported = false;
    if (ExecutionEnvironment.canUseDOM) {
      isInputEventSupported = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 9);
    }
    var newValueProp = {
      get: function() {
        return activeElementValueProp.get.call(this);
      },
      set: function(val) {
        activeElementValue = '' + val;
        activeElementValueProp.set.call(this, val);
      }
    };
    function startWatchingForValueChange(target, targetID) {
      activeElement = target;
      activeElementID = targetID;
      activeElementValue = target.value;
      activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');
      Object.defineProperty(activeElement, 'value', newValueProp);
      activeElement.attachEvent('onpropertychange', handlePropertyChange);
    }
    function stopWatchingForValueChange() {
      if (!activeElement) {
        return ;
      }
      delete activeElement.value;
      activeElement.detachEvent('onpropertychange', handlePropertyChange);
      activeElement = null;
      activeElementID = null;
      activeElementValue = null;
      activeElementValueProp = null;
    }
    function handlePropertyChange(nativeEvent) {
      if (nativeEvent.propertyName !== 'value') {
        return ;
      }
      var value = nativeEvent.srcElement.value;
      if (value === activeElementValue) {
        return ;
      }
      activeElementValue = value;
      manualDispatchChangeEvent(nativeEvent);
    }
    function getTargetIDForInputEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topInput) {
        return topLevelTargetID;
      }
    }
    function handleEventsForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topFocus) {
        stopWatchingForValueChange();
        startWatchingForValueChange(topLevelTarget, topLevelTargetID);
      } else if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForValueChange();
      }
    }
    function getTargetIDForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topSelectionChange || topLevelType === topLevelTypes.topKeyUp || topLevelType === topLevelTypes.topKeyDown) {
        if (activeElement && activeElement.value !== activeElementValue) {
          activeElementValue = activeElement.value;
          return activeElementID;
        }
      }
    }
    function shouldUseClickEvent(elem) {
      return (elem.nodeName === 'INPUT' && (elem.type === 'checkbox' || elem.type === 'radio'));
    }
    function getTargetIDForClickEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topClick) {
        return topLevelTargetID;
      }
    }
    var ChangeEventPlugin = {
      eventTypes: eventTypes,
      extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
        var getTargetIDFunc,
            handleEventFunc;
        if (shouldUseChangeEvent(topLevelTarget)) {
          if (doesChangeEventBubble) {
            getTargetIDFunc = getTargetIDForChangeEvent;
          } else {
            handleEventFunc = handleEventsForChangeEventIE8;
          }
        } else if (isTextInputElement(topLevelTarget)) {
          if (isInputEventSupported) {
            getTargetIDFunc = getTargetIDForInputEvent;
          } else {
            getTargetIDFunc = getTargetIDForInputEventIE;
            handleEventFunc = handleEventsForInputEventIE;
          }
        } else if (shouldUseClickEvent(topLevelTarget)) {
          getTargetIDFunc = getTargetIDForClickEvent;
        }
        if (getTargetIDFunc) {
          var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
          if (targetID) {
            var event = SyntheticEvent.getPooled(eventTypes.change, targetID, nativeEvent);
            EventPropagators.accumulateTwoPhaseDispatches(event);
            return event;
          }
        }
        if (handleEventFunc) {
          handleEventFunc(topLevelType, topLevelTarget, topLevelTargetID);
        }
      }
    };
    module.exports = ChangeEventPlugin;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMSelection", ["npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/getNodeForCharacterOffset", "npm:react@0.12.2/lib/getTextContentAccessor"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
  var getNodeForCharacterOffset = require("npm:react@0.12.2/lib/getNodeForCharacterOffset");
  var getTextContentAccessor = require("npm:react@0.12.2/lib/getTextContentAccessor");
  function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
    return anchorNode === focusNode && anchorOffset === focusOffset;
  }
  function getIEOffsets(node) {
    var selection = document.selection;
    var selectedRange = selection.createRange();
    var selectedLength = selectedRange.text.length;
    var fromStart = selectedRange.duplicate();
    fromStart.moveToElementText(node);
    fromStart.setEndPoint('EndToStart', selectedRange);
    var startOffset = fromStart.text.length;
    var endOffset = startOffset + selectedLength;
    return {
      start: startOffset,
      end: endOffset
    };
  }
  function getModernOffsets(node) {
    var selection = window.getSelection && window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    var anchorNode = selection.anchorNode;
    var anchorOffset = selection.anchorOffset;
    var focusNode = selection.focusNode;
    var focusOffset = selection.focusOffset;
    var currentRange = selection.getRangeAt(0);
    var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
    var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
    var tempRange = currentRange.cloneRange();
    tempRange.selectNodeContents(node);
    tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
    var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);
    var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
    var end = start + rangeLength;
    var detectionRange = document.createRange();
    detectionRange.setStart(anchorNode, anchorOffset);
    detectionRange.setEnd(focusNode, focusOffset);
    var isBackward = detectionRange.collapsed;
    return {
      start: isBackward ? end : start,
      end: isBackward ? start : end
    };
  }
  function setIEOffsets(node, offsets) {
    var range = document.selection.createRange().duplicate();
    var start,
        end;
    if (typeof offsets.end === 'undefined') {
      start = offsets.start;
      end = start;
    } else if (offsets.start > offsets.end) {
      start = offsets.end;
      end = offsets.start;
    } else {
      start = offsets.start;
      end = offsets.end;
    }
    range.moveToElementText(node);
    range.moveStart('character', start);
    range.setEndPoint('EndToStart', range);
    range.moveEnd('character', end - start);
    range.select();
  }
  function setModernOffsets(node, offsets) {
    if (!window.getSelection) {
      return ;
    }
    var selection = window.getSelection();
    var length = node[getTextContentAccessor()].length;
    var start = Math.min(offsets.start, length);
    var end = typeof offsets.end === 'undefined' ? start : Math.min(offsets.end, length);
    if (!selection.extend && start > end) {
      var temp = end;
      end = start;
      start = temp;
    }
    var startMarker = getNodeForCharacterOffset(node, start);
    var endMarker = getNodeForCharacterOffset(node, end);
    if (startMarker && endMarker) {
      var range = document.createRange();
      range.setStart(startMarker.node, startMarker.offset);
      selection.removeAllRanges();
      if (start > end) {
        selection.addRange(range);
        selection.extend(endMarker.node, endMarker.offset);
      } else {
        range.setEnd(endMarker.node, endMarker.offset);
        selection.addRange(range);
      }
    }
  }
  var useIEOffsets = ExecutionEnvironment.canUseDOM && document.selection;
  var ReactDOMSelection = {
    getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,
    setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
  };
  module.exports = ReactDOMSelection;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticMouseEvent", ["npm:react@0.12.2/lib/SyntheticUIEvent", "npm:react@0.12.2/lib/ViewportMetrics", "npm:react@0.12.2/lib/getEventModifierState"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticUIEvent = require("npm:react@0.12.2/lib/SyntheticUIEvent");
  var ViewportMetrics = require("npm:react@0.12.2/lib/ViewportMetrics");
  var getEventModifierState = require("npm:react@0.12.2/lib/getEventModifierState");
  var MouseEventInterface = {
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: function(event) {
      var button = event.button;
      if ('which' in event) {
        return button;
      }
      return button === 2 ? 2 : button === 4 ? 1 : 0;
    },
    buttons: null,
    relatedTarget: function(event) {
      return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
    },
    pageX: function(event) {
      return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
    },
    pageY: function(event) {
      return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
    }
  };
  function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);
  module.exports = SyntheticMouseEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/createArrayFrom", ["npm:react@0.12.2/lib/toArray"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toArray = require("npm:react@0.12.2/lib/toArray");
  function hasArrayNature(obj) {
    return (!!obj && (typeof obj == 'object' || typeof obj == 'function') && ('length' in obj) && !('setInterval' in obj) && (typeof obj.nodeType != 'number') && (((Array.isArray(obj) || ('callee' in obj) || 'item' in obj))));
  }
  function createArrayFrom(obj) {
    if (!hasArrayNature(obj)) {
      return [obj];
    } else if (Array.isArray(obj)) {
      return obj.slice();
    } else {
      return toArray(obj);
    }
  }
  module.exports = createArrayFrom;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactMarkupChecksum", ["npm:react@0.12.2/lib/adler32"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var adler32 = require("npm:react@0.12.2/lib/adler32");
  var ReactMarkupChecksum = {
    CHECKSUM_ATTR_NAME: 'data-react-checksum',
    addChecksumToMarkup: function(markup) {
      var checksum = adler32(markup);
      return markup.replace('>', ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '">');
    },
    canReuseMarkup: function(markup, element) {
      var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
      existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
      var markupChecksum = adler32(markup);
      return markupChecksum === existingChecksum;
    }
  };
  module.exports = ReactMarkupChecksum;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactReconcileTransaction", ["npm:react@0.12.2/lib/CallbackQueue", "npm:react@0.12.2/lib/PooledClass", "npm:react@0.12.2/lib/ReactBrowserEventEmitter", "npm:react@0.12.2/lib/ReactInputSelection", "npm:react@0.12.2/lib/ReactPutListenerQueue", "npm:react@0.12.2/lib/Transaction", "npm:react@0.12.2/lib/Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var CallbackQueue = require("npm:react@0.12.2/lib/CallbackQueue");
  var PooledClass = require("npm:react@0.12.2/lib/PooledClass");
  var ReactBrowserEventEmitter = require("npm:react@0.12.2/lib/ReactBrowserEventEmitter");
  var ReactInputSelection = require("npm:react@0.12.2/lib/ReactInputSelection");
  var ReactPutListenerQueue = require("npm:react@0.12.2/lib/ReactPutListenerQueue");
  var Transaction = require("npm:react@0.12.2/lib/Transaction");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var SELECTION_RESTORATION = {
    initialize: ReactInputSelection.getSelectionInformation,
    close: ReactInputSelection.restoreSelection
  };
  var EVENT_SUPPRESSION = {
    initialize: function() {
      var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
      ReactBrowserEventEmitter.setEnabled(false);
      return currentlyEnabled;
    },
    close: function(previouslyEnabled) {
      ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
    }
  };
  var ON_DOM_READY_QUEUEING = {
    initialize: function() {
      this.reactMountReady.reset();
    },
    close: function() {
      this.reactMountReady.notifyAll();
    }
  };
  var PUT_LISTENER_QUEUEING = {
    initialize: function() {
      this.putListenerQueue.reset();
    },
    close: function() {
      this.putListenerQueue.putListeners();
    }
  };
  var TRANSACTION_WRAPPERS = [PUT_LISTENER_QUEUEING, SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];
  function ReactReconcileTransaction() {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = false;
    this.reactMountReady = CallbackQueue.getPooled(null);
    this.putListenerQueue = ReactPutListenerQueue.getPooled();
  }
  var Mixin = {
    getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    },
    getReactMountReady: function() {
      return this.reactMountReady;
    },
    getPutListenerQueue: function() {
      return this.putListenerQueue;
    },
    destructor: function() {
      CallbackQueue.release(this.reactMountReady);
      this.reactMountReady = null;
      ReactPutListenerQueue.release(this.putListenerQueue);
      this.putListenerQueue = null;
    }
  };
  assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);
  PooledClass.addPoolingTo(ReactReconcileTransaction);
  module.exports = ReactReconcileTransaction;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMButton", ["npm:react@0.12.2/lib/AutoFocusMixin", "npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactDOM", "npm:react@0.12.2/lib/keyMirror"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var AutoFocusMixin = require("npm:react@0.12.2/lib/AutoFocusMixin");
  var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
  var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
  var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
  var ReactDOM = require("npm:react@0.12.2/lib/ReactDOM");
  var keyMirror = require("npm:react@0.12.2/lib/keyMirror");
  var button = ReactElement.createFactory(ReactDOM.button.type);
  var mouseListenerNames = keyMirror({
    onClick: true,
    onDoubleClick: true,
    onMouseDown: true,
    onMouseMove: true,
    onMouseUp: true,
    onClickCapture: true,
    onDoubleClickCapture: true,
    onMouseDownCapture: true,
    onMouseMoveCapture: true,
    onMouseUpCapture: true
  });
  var ReactDOMButton = ReactCompositeComponent.createClass({
    displayName: 'ReactDOMButton',
    mixins: [AutoFocusMixin, ReactBrowserComponentMixin],
    render: function() {
      var props = {};
      for (var key in this.props) {
        if (this.props.hasOwnProperty(key) && (!this.props.disabled || !mouseListenerNames[key])) {
          props[key] = this.props[key];
        }
      }
      return button(props, this.props.children);
    }
  });
  module.exports = ReactDOMButton;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMForm", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/LocalEventTrapMixin", "npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactDOM"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
  var LocalEventTrapMixin = require("npm:react@0.12.2/lib/LocalEventTrapMixin");
  var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
  var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
  var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
  var ReactDOM = require("npm:react@0.12.2/lib/ReactDOM");
  var form = ReactElement.createFactory(ReactDOM.form.type);
  var ReactDOMForm = ReactCompositeComponent.createClass({
    displayName: 'ReactDOMForm',
    mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
    render: function() {
      return form(this.props);
    },
    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset');
      this.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit');
    }
  });
  module.exports = ReactDOMForm;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/LinkedValueUtils", ["npm:react@0.12.2/lib/ReactPropTypes", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactPropTypes = require("npm:react@0.12.2/lib/ReactPropTypes");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var hasReadOnlyValue = {
      'button': true,
      'checkbox': true,
      'image': true,
      'hidden': true,
      'radio': true,
      'reset': true,
      'submit': true
    };
    function _assertSingleLink(input) {
      ("production" !== process.env.NODE_ENV ? invariant(input.props.checkedLink == null || input.props.valueLink == null, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(input.props.checkedLink == null || input.props.valueLink == null));
    }
    function _assertValueLink(input) {
      _assertSingleLink(input);
      ("production" !== process.env.NODE_ENV ? invariant(input.props.value == null && input.props.onChange == null, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(input.props.value == null && input.props.onChange == null));
    }
    function _assertCheckedLink(input) {
      _assertSingleLink(input);
      ("production" !== process.env.NODE_ENV ? invariant(input.props.checked == null && input.props.onChange == null, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(input.props.checked == null && input.props.onChange == null));
    }
    function _handleLinkedValueChange(e) {
      this.props.valueLink.requestChange(e.target.value);
    }
    function _handleLinkedCheckChange(e) {
      this.props.checkedLink.requestChange(e.target.checked);
    }
    var LinkedValueUtils = {
      Mixin: {propTypes: {
          value: function(props, propName, componentName) {
            if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
              return ;
            }
            return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
          },
          checked: function(props, propName, componentName) {
            if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
              return ;
            }
            return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
          },
          onChange: ReactPropTypes.func
        }},
      getValue: function(input) {
        if (input.props.valueLink) {
          _assertValueLink(input);
          return input.props.valueLink.value;
        }
        return input.props.value;
      },
      getChecked: function(input) {
        if (input.props.checkedLink) {
          _assertCheckedLink(input);
          return input.props.checkedLink.value;
        }
        return input.props.checked;
      },
      getOnChange: function(input) {
        if (input.props.valueLink) {
          _assertValueLink(input);
          return _handleLinkedValueChange;
        } else if (input.props.checkedLink) {
          _assertCheckedLink(input);
          return _handleLinkedCheckChange;
        }
        return input.props.onChange;
      }
    };
    module.exports = LinkedValueUtils;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactEventListener", ["npm:react@0.12.2/lib/EventListener", "npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/PooledClass", "npm:react@0.12.2/lib/ReactInstanceHandles", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/getEventTarget", "npm:react@0.12.2/lib/getUnboundedScrollPosition", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var EventListener = require("npm:react@0.12.2/lib/EventListener");
    var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
    var PooledClass = require("npm:react@0.12.2/lib/PooledClass");
    var ReactInstanceHandles = require("npm:react@0.12.2/lib/ReactInstanceHandles");
    var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
    var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var getEventTarget = require("npm:react@0.12.2/lib/getEventTarget");
    var getUnboundedScrollPosition = require("npm:react@0.12.2/lib/getUnboundedScrollPosition");
    function findParent(node) {
      var nodeID = ReactMount.getID(node);
      var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
      var container = ReactMount.findReactContainerForID(rootID);
      var parent = ReactMount.getFirstReactDOM(container);
      return parent;
    }
    function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
      this.topLevelType = topLevelType;
      this.nativeEvent = nativeEvent;
      this.ancestors = [];
    }
    assign(TopLevelCallbackBookKeeping.prototype, {destructor: function() {
        this.topLevelType = null;
        this.nativeEvent = null;
        this.ancestors.length = 0;
      }});
    PooledClass.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass.twoArgumentPooler);
    function handleTopLevelImpl(bookKeeping) {
      var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;
      var ancestor = topLevelTarget;
      while (ancestor) {
        bookKeeping.ancestors.push(ancestor);
        ancestor = findParent(ancestor);
      }
      for (var i = 0,
          l = bookKeeping.ancestors.length; i < l; i++) {
        topLevelTarget = bookKeeping.ancestors[i];
        var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
        ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent);
      }
    }
    function scrollValueMonitor(cb) {
      var scrollPosition = getUnboundedScrollPosition(window);
      cb(scrollPosition);
    }
    var ReactEventListener = {
      _enabled: true,
      _handleTopLevel: null,
      WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,
      setHandleTopLevel: function(handleTopLevel) {
        ReactEventListener._handleTopLevel = handleTopLevel;
      },
      setEnabled: function(enabled) {
        ReactEventListener._enabled = !!enabled;
      },
      isEnabled: function() {
        return ReactEventListener._enabled;
      },
      trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
        var element = handle;
        if (!element) {
          return ;
        }
        return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
      },
      trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
        var element = handle;
        if (!element) {
          return ;
        }
        return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
      },
      monitorScrollValue: function(refresh) {
        var callback = scrollValueMonitor.bind(null, refresh);
        EventListener.listen(window, 'scroll', callback);
        EventListener.listen(window, 'resize', callback);
      },
      dispatchEvent: function(topLevelType, nativeEvent) {
        if (!ReactEventListener._enabled) {
          return ;
        }
        var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
        try {
          ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
        } finally {
          TopLevelCallbackBookKeeping.release(bookKeeping);
        }
      }
    };
    module.exports = ReactEventListener;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SelectEventPlugin", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPropagators", "npm:react@0.12.2/lib/ReactInputSelection", "npm:react@0.12.2/lib/SyntheticEvent", "npm:react@0.12.2/lib/getActiveElement", "npm:react@0.12.2/lib/isTextInputElement", "npm:react@0.12.2/lib/keyOf", "npm:react@0.12.2/lib/shallowEqual"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
  var EventPropagators = require("npm:react@0.12.2/lib/EventPropagators");
  var ReactInputSelection = require("npm:react@0.12.2/lib/ReactInputSelection");
  var SyntheticEvent = require("npm:react@0.12.2/lib/SyntheticEvent");
  var getActiveElement = require("npm:react@0.12.2/lib/getActiveElement");
  var isTextInputElement = require("npm:react@0.12.2/lib/isTextInputElement");
  var keyOf = require("npm:react@0.12.2/lib/keyOf");
  var shallowEqual = require("npm:react@0.12.2/lib/shallowEqual");
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {select: {
      phasedRegistrationNames: {
        bubbled: keyOf({onSelect: null}),
        captured: keyOf({onSelectCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topContextMenu, topLevelTypes.topFocus, topLevelTypes.topKeyDown, topLevelTypes.topMouseDown, topLevelTypes.topMouseUp, topLevelTypes.topSelectionChange]
    }};
  var activeElement = null;
  var activeElementID = null;
  var lastSelection = null;
  var mouseDown = false;
  function getSelection(node) {
    if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
      return {
        start: node.selectionStart,
        end: node.selectionEnd
      };
    } else if (window.getSelection) {
      var selection = window.getSelection();
      return {
        anchorNode: selection.anchorNode,
        anchorOffset: selection.anchorOffset,
        focusNode: selection.focusNode,
        focusOffset: selection.focusOffset
      };
    } else if (document.selection) {
      var range = document.selection.createRange();
      return {
        parentElement: range.parentElement(),
        text: range.text,
        top: range.boundingTop,
        left: range.boundingLeft
      };
    }
  }
  function constructSelectEvent(nativeEvent) {
    if (mouseDown || activeElement == null || activeElement != getActiveElement()) {
      return ;
    }
    var currentSelection = getSelection(activeElement);
    if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
      lastSelection = currentSelection;
      var syntheticEvent = SyntheticEvent.getPooled(eventTypes.select, activeElementID, nativeEvent);
      syntheticEvent.type = 'select';
      syntheticEvent.target = activeElement;
      EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);
      return syntheticEvent;
    }
  }
  var SelectEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      switch (topLevelType) {
        case topLevelTypes.topFocus:
          if (isTextInputElement(topLevelTarget) || topLevelTarget.contentEditable === 'true') {
            activeElement = topLevelTarget;
            activeElementID = topLevelTargetID;
            lastSelection = null;
          }
          break;
        case topLevelTypes.topBlur:
          activeElement = null;
          activeElementID = null;
          lastSelection = null;
          break;
        case topLevelTypes.topMouseDown:
          mouseDown = true;
          break;
        case topLevelTypes.topContextMenu:
        case topLevelTypes.topMouseUp:
          mouseDown = false;
          return constructSelectEvent(nativeEvent);
        case topLevelTypes.topSelectionChange:
        case topLevelTypes.topKeyDown:
        case topLevelTypes.topKeyUp:
          return constructSelectEvent(nativeEvent);
      }
    }
  };
  module.exports = SelectEventPlugin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticKeyboardEvent", ["npm:react@0.12.2/lib/SyntheticUIEvent", "npm:react@0.12.2/lib/getEventCharCode", "npm:react@0.12.2/lib/getEventKey", "npm:react@0.12.2/lib/getEventModifierState"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticUIEvent = require("npm:react@0.12.2/lib/SyntheticUIEvent");
  var getEventCharCode = require("npm:react@0.12.2/lib/getEventCharCode");
  var getEventKey = require("npm:react@0.12.2/lib/getEventKey");
  var getEventModifierState = require("npm:react@0.12.2/lib/getEventModifierState");
  var KeyboardEventInterface = {
    key: getEventKey,
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      return 0;
    },
    keyCode: function(event) {
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    },
    which: function(event) {
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    }
  };
  function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);
  module.exports = SyntheticKeyboardEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/performanceNow", ["npm:react@0.12.2/lib/performance"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var performance = require("npm:react@0.12.2/lib/performance");
  if (!performance || !performance.now) {
    performance = Date;
  }
  var performanceNow = performance.now.bind(performance);
  module.exports = performanceNow;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactServerRendering", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactInstanceHandles", "npm:react@0.12.2/lib/ReactMarkupChecksum", "npm:react@0.12.2/lib/ReactServerRenderingTransaction", "npm:react@0.12.2/lib/instantiateReactComponent", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactInstanceHandles = require("npm:react@0.12.2/lib/ReactInstanceHandles");
    var ReactMarkupChecksum = require("npm:react@0.12.2/lib/ReactMarkupChecksum");
    var ReactServerRenderingTransaction = require("npm:react@0.12.2/lib/ReactServerRenderingTransaction");
    var instantiateReactComponent = require("npm:react@0.12.2/lib/instantiateReactComponent");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function renderToString(element) {
      ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(element), 'renderToString(): You must pass a valid ReactElement.') : invariant(ReactElement.isValidElement(element)));
      var transaction;
      try {
        var id = ReactInstanceHandles.createReactRootID();
        transaction = ReactServerRenderingTransaction.getPooled(false);
        return transaction.perform(function() {
          var componentInstance = instantiateReactComponent(element, null);
          var markup = componentInstance.mountComponent(id, transaction, 0);
          return ReactMarkupChecksum.addChecksumToMarkup(markup);
        }, null);
      } finally {
        ReactServerRenderingTransaction.release(transaction);
      }
    }
    function renderToStaticMarkup(element) {
      ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(element), 'renderToStaticMarkup(): You must pass a valid ReactElement.') : invariant(ReactElement.isValidElement(element)));
      var transaction;
      try {
        var id = ReactInstanceHandles.createReactRootID();
        transaction = ReactServerRenderingTransaction.getPooled(true);
        return transaction.perform(function() {
          var componentInstance = instantiateReactComponent(element, null);
          return componentInstance.mountComponent(id, transaction, 0);
        }, null);
      } finally {
        ReactServerRenderingTransaction.release(transaction);
      }
    }
    module.exports = {
      renderToString: renderToString,
      renderToStaticMarkup: renderToStaticMarkup
    };
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:ramda@0.10.0", ["npm:ramda@0.10.0/dist/ramda"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:ramda@0.10.0/dist/ramda");
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/LinkedStateMixin", ["npm:react@0.12.2/lib/ReactLink", "npm:react@0.12.2/lib/ReactStateSetters"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactLink = require("npm:react@0.12.2/lib/ReactLink");
  var ReactStateSetters = require("npm:react@0.12.2/lib/ReactStateSetters");
  var LinkedStateMixin = {linkState: function(key) {
      return new ReactLink(this.state[key], ReactStateSetters.createStateKeySetter(this, key));
    }};
  module.exports = LinkedStateMixin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactTransitionGroup", ["npm:react@0.12.2/lib/React", "npm:react@0.12.2/lib/ReactTransitionChildMapping", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/cloneWithProps", "npm:react@0.12.2/lib/emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2/lib/React");
  var ReactTransitionChildMapping = require("npm:react@0.12.2/lib/ReactTransitionChildMapping");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var cloneWithProps = require("npm:react@0.12.2/lib/cloneWithProps");
  var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
  var ReactTransitionGroup = React.createClass({
    displayName: 'ReactTransitionGroup',
    propTypes: {
      component: React.PropTypes.any,
      childFactory: React.PropTypes.func
    },
    getDefaultProps: function() {
      return {
        component: 'span',
        childFactory: emptyFunction.thatReturnsArgument
      };
    },
    getInitialState: function() {
      return {children: ReactTransitionChildMapping.getChildMapping(this.props.children)};
    },
    componentWillReceiveProps: function(nextProps) {
      var nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children);
      var prevChildMapping = this.state.children;
      this.setState({children: ReactTransitionChildMapping.mergeChildMappings(prevChildMapping, nextChildMapping)});
      var key;
      for (key in nextChildMapping) {
        var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
        if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
          this.keysToEnter.push(key);
        }
      }
      for (key in prevChildMapping) {
        var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
        if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
          this.keysToLeave.push(key);
        }
      }
    },
    componentWillMount: function() {
      this.currentlyTransitioningKeys = {};
      this.keysToEnter = [];
      this.keysToLeave = [];
    },
    componentDidUpdate: function() {
      var keysToEnter = this.keysToEnter;
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);
      var keysToLeave = this.keysToLeave;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    },
    performEnter: function(key) {
      this.currentlyTransitioningKeys[key] = true;
      var component = this.refs[key];
      if (component.componentWillEnter) {
        component.componentWillEnter(this._handleDoneEntering.bind(this, key));
      } else {
        this._handleDoneEntering(key);
      }
    },
    _handleDoneEntering: function(key) {
      var component = this.refs[key];
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }
      delete this.currentlyTransitioningKeys[key];
      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        this.performLeave(key);
      }
    },
    performLeave: function(key) {
      this.currentlyTransitioningKeys[key] = true;
      var component = this.refs[key];
      if (component.componentWillLeave) {
        component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
      } else {
        this._handleDoneLeaving(key);
      }
    },
    _handleDoneLeaving: function(key) {
      var component = this.refs[key];
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }
      delete this.currentlyTransitioningKeys[key];
      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);
      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        this.performEnter(key);
      } else {
        var newChildren = assign({}, this.state.children);
        delete newChildren[key];
        this.setState({children: newChildren});
      }
    },
    render: function() {
      var childrenToRender = {};
      for (var key in this.state.children) {
        var child = this.state.children[key];
        if (child) {
          childrenToRender[key] = cloneWithProps(this.props.childFactory(child), {ref: key});
        }
      }
      return React.createElement(this.props.component, this.props, childrenToRender);
    }
  });
  module.exports = ReactTransitionGroup;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactCSSTransitionGroupChild", ["npm:react@0.12.2/lib/React", "npm:react@0.12.2/lib/CSSCore", "npm:react@0.12.2/lib/ReactTransitionEvents", "npm:react@0.12.2/lib/onlyChild", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var React = require("npm:react@0.12.2/lib/React");
    var CSSCore = require("npm:react@0.12.2/lib/CSSCore");
    var ReactTransitionEvents = require("npm:react@0.12.2/lib/ReactTransitionEvents");
    var onlyChild = require("npm:react@0.12.2/lib/onlyChild");
    var TICK = 17;
    var NO_EVENT_TIMEOUT = 5000;
    var noEventListener = null;
    if ("production" !== process.env.NODE_ENV) {
      noEventListener = function() {
        console.warn('transition(): tried to perform an animation without ' + 'an animationend or transitionend event after timeout (' + NO_EVENT_TIMEOUT + 'ms). You should either disable this ' + 'transition in JS or add a CSS animation/transition.');
      };
    }
    var ReactCSSTransitionGroupChild = React.createClass({
      displayName: 'ReactCSSTransitionGroupChild',
      transition: function(animationType, finishCallback) {
        var node = this.getDOMNode();
        var className = this.props.name + '-' + animationType;
        var activeClassName = className + '-active';
        var noEventTimeout = null;
        var endListener = function(e) {
          if (e && e.target !== node) {
            return ;
          }
          if ("production" !== process.env.NODE_ENV) {
            clearTimeout(noEventTimeout);
          }
          CSSCore.removeClass(node, className);
          CSSCore.removeClass(node, activeClassName);
          ReactTransitionEvents.removeEndEventListener(node, endListener);
          finishCallback && finishCallback();
        };
        ReactTransitionEvents.addEndEventListener(node, endListener);
        CSSCore.addClass(node, className);
        this.queueClass(activeClassName);
        if ("production" !== process.env.NODE_ENV) {
          noEventTimeout = setTimeout(noEventListener, NO_EVENT_TIMEOUT);
        }
      },
      queueClass: function(className) {
        this.classNameQueue.push(className);
        if (!this.timeout) {
          this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
      },
      flushClassNameQueue: function() {
        if (this.isMounted()) {
          this.classNameQueue.forEach(CSSCore.addClass.bind(CSSCore, this.getDOMNode()));
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
      },
      componentWillMount: function() {
        this.classNameQueue = [];
      },
      componentWillUnmount: function() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
      },
      componentWillEnter: function(done) {
        if (this.props.enter) {
          this.transition('enter', done);
        } else {
          done();
        }
      },
      componentWillLeave: function(done) {
        if (this.props.leave) {
          this.transition('leave', done);
        } else {
          done();
        }
      },
      render: function() {
        return onlyChild(this.props.children);
      }
    });
    module.exports = ReactCSSTransitionGroupChild;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:grapnel@0.5.8", ["npm:grapnel@0.5.8/dist/grapnel.min"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:grapnel@0.5.8/dist/grapnel.min");
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/components/DefaultRoute", ["npm:react@0.12.2", "npm:react-router@0.12.4/lib/Configuration", "npm:react-router@0.12.4/lib/PropTypes"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  var Configuration = require("npm:react-router@0.12.4/lib/Configuration");
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
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
  global.define = __define;
  return module.exports;
});

System.register("npm:qs@2.3.3/lib/index", ["npm:qs@2.3.3/lib/stringify", "npm:qs@2.3.3/lib/parse"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var Stringify = require("npm:qs@2.3.3/lib/stringify");
  var Parse = require("npm:qs@2.3.3/lib/parse");
  var internals = {};
  module.exports = {
    stringify: Stringify,
    parse: Parse
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/components/RouteHandler", ["npm:react@0.12.2", "npm:react-router@0.12.4/lib/RouteHandlerMixin"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  var RouteHandlerMixin = require("npm:react-router@0.12.4/lib/RouteHandlerMixin");
  var RouteHandler = React.createClass({
    displayName: "RouteHandler",
    mixins: [RouteHandlerMixin],
    render: function render() {
      return this.createChildRouteHandler();
    }
  });
  module.exports = RouteHandler;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/locations/HashLocation", ["npm:react-router@0.12.4/lib/actions/LocationActions", "npm:react-router@0.12.4/lib/History"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var LocationActions = require("npm:react-router@0.12.4/lib/actions/LocationActions");
  var History = require("npm:react-router@0.12.4/lib/History");
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
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/ScrollHistory", ["npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react-router@0.12.4/lib/getWindowScrollPosition"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var invariant = require("npm:react@0.12.2/lib/invariant");
  var canUseDOM = require("npm:react@0.12.2/lib/ExecutionEnvironment").canUseDOM;
  var getWindowScrollPosition = require("npm:react-router@0.12.4/lib/getWindowScrollPosition");
  function shouldUpdateScroll(state, prevState) {
    if (!prevState) {
      return true;
    }
    if (state.pathname === prevState.pathname) {
      return false;
    }
    var routes = state.routes;
    var prevRoutes = prevState.routes;
    var sharedAncestorRoutes = routes.filter(function(route) {
      return prevRoutes.indexOf(route) !== -1;
    });
    return !sharedAncestorRoutes.some(function(route) {
      return route.ignoreScrollBehavior;
    });
  }
  var ScrollHistory = {
    statics: {
      recordScrollPosition: function recordScrollPosition(path) {
        if (!this.scrollHistory)
          this.scrollHistory = {};
        this.scrollHistory[path] = getWindowScrollPosition();
      },
      getScrollPosition: function getScrollPosition(path) {
        if (!this.scrollHistory)
          this.scrollHistory = {};
        return this.scrollHistory[path] || null;
      }
    },
    componentWillMount: function componentWillMount() {
      invariant(this.constructor.getScrollBehavior() == null || canUseDOM, "Cannot use scroll behavior without a DOM");
    },
    componentDidMount: function componentDidMount() {
      this._updateScroll();
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
      this._updateScroll(prevState);
    },
    _updateScroll: function _updateScroll(prevState) {
      if (!shouldUpdateScroll(this.state, prevState)) {
        return ;
      }
      var scrollBehavior = this.constructor.getScrollBehavior();
      if (scrollBehavior)
        scrollBehavior.updateScrollPosition(this.constructor.getScrollPosition(this.state.path), this.state.action);
    }
  };
  module.exports = ScrollHistory;
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/Transition", ["npm:react-router@0.12.4/lib/Cancellation", "npm:react-router@0.12.4/lib/Redirect"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var Cancellation = require("npm:react-router@0.12.4/lib/Cancellation");
  var Redirect = require("npm:react-router@0.12.4/lib/Redirect");
  function Transition(path, retry) {
    this.path = path;
    this.abortReason = null;
    this.retry = retry.bind(this);
  }
  Transition.prototype.abort = function(reason) {
    if (this.abortReason == null)
      this.abortReason = reason || "ABORT";
  };
  Transition.prototype.redirect = function(to, params, query) {
    this.abort(new Redirect(to, params, query));
  };
  Transition.prototype.cancel = function() {
    this.abort(new Cancellation());
  };
  Transition.from = function(transition, routes, components, callback) {
    routes.reduce(function(callback, route, index) {
      return function(error) {
        if (error || transition.abortReason) {
          callback(error);
        } else if (route.onLeave) {
          try {
            route.onLeave(transition, components[index], callback);
            if (route.onLeave.length < 3)
              callback();
          } catch (e) {
            callback(e);
          }
        } else {
          callback();
        }
      };
    }, callback)();
  };
  Transition.to = function(transition, routes, params, query, callback) {
    routes.reduceRight(function(callback, route) {
      return function(error) {
        if (error || transition.abortReason) {
          callback(error);
        } else if (route.onEnter) {
          try {
            route.onEnter(transition, params, query, callback);
            if (route.onEnter.length < 4)
              callback();
          } catch (e) {
            callback(e);
          }
        } else {
          callback();
        }
      };
    }, callback)();
  };
  module.exports = Transition;
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1/index", ["npm:process@0.10.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require("npm:process@0.10.1");
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/EventPluginUtils", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var injection = {
      Mount: null,
      injectMount: function(InjectedMount) {
        injection.Mount = InjectedMount;
        if ("production" !== process.env.NODE_ENV) {
          ("production" !== process.env.NODE_ENV ? invariant(InjectedMount && InjectedMount.getNode, 'EventPluginUtils.injection.injectMount(...): Injected Mount module ' + 'is missing getNode.') : invariant(InjectedMount && InjectedMount.getNode));
        }
      }
    };
    var topLevelTypes = EventConstants.topLevelTypes;
    function isEndish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseUp || topLevelType === topLevelTypes.topTouchEnd || topLevelType === topLevelTypes.topTouchCancel;
    }
    function isMoveish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseMove || topLevelType === topLevelTypes.topTouchMove;
    }
    function isStartish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseDown || topLevelType === topLevelTypes.topTouchStart;
    }
    var validateEventDispatches;
    if ("production" !== process.env.NODE_ENV) {
      validateEventDispatches = function(event) {
        var dispatchListeners = event._dispatchListeners;
        var dispatchIDs = event._dispatchIDs;
        var listenersIsArr = Array.isArray(dispatchListeners);
        var idsIsArr = Array.isArray(dispatchIDs);
        var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
        ("production" !== process.env.NODE_ENV ? invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
      };
    }
    function forEachEventDispatch(event, cb) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchIDs = event._dispatchIDs;
      if ("production" !== process.env.NODE_ENV) {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          cb(event, dispatchListeners[i], dispatchIDs[i]);
        }
      } else if (dispatchListeners) {
        cb(event, dispatchListeners, dispatchIDs);
      }
    }
    function executeDispatch(event, listener, domID) {
      event.currentTarget = injection.Mount.getNode(domID);
      var returnValue = listener(event, domID);
      event.currentTarget = null;
      return returnValue;
    }
    function executeDispatchesInOrder(event, executeDispatch) {
      forEachEventDispatch(event, executeDispatch);
      event._dispatchListeners = null;
      event._dispatchIDs = null;
    }
    function executeDispatchesInOrderStopAtTrueImpl(event) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchIDs = event._dispatchIDs;
      if ("production" !== process.env.NODE_ENV) {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          if (dispatchListeners[i](event, dispatchIDs[i])) {
            return dispatchIDs[i];
          }
        }
      } else if (dispatchListeners) {
        if (dispatchListeners(event, dispatchIDs)) {
          return dispatchIDs;
        }
      }
      return null;
    }
    function executeDispatchesInOrderStopAtTrue(event) {
      var ret = executeDispatchesInOrderStopAtTrueImpl(event);
      event._dispatchIDs = null;
      event._dispatchListeners = null;
      return ret;
    }
    function executeDirectDispatch(event) {
      if ("production" !== process.env.NODE_ENV) {
        validateEventDispatches(event);
      }
      var dispatchListener = event._dispatchListeners;
      var dispatchID = event._dispatchIDs;
      ("production" !== process.env.NODE_ENV ? invariant(!Array.isArray(dispatchListener), 'executeDirectDispatch(...): Invalid `event`.') : invariant(!Array.isArray(dispatchListener)));
      var res = dispatchListener ? dispatchListener(event, dispatchID) : null;
      event._dispatchListeners = null;
      event._dispatchIDs = null;
      return res;
    }
    function hasDispatches(event) {
      return !!event._dispatchListeners;
    }
    var EventPluginUtils = {
      isEndish: isEndish,
      isMoveish: isMoveish,
      isStartish: isStartish,
      executeDirectDispatch: executeDirectDispatch,
      executeDispatch: executeDispatch,
      executeDispatchesInOrder: executeDispatchesInOrder,
      executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
      hasDispatches: hasDispatches,
      injection: injection,
      useTouchEvents: false
    };
    module.exports = EventPluginUtils;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactElement", ["npm:react@0.12.2/lib/ReactContext", "npm:react@0.12.2/lib/ReactCurrentOwner", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactContext = require("npm:react@0.12.2/lib/ReactContext");
    var ReactCurrentOwner = require("npm:react@0.12.2/lib/ReactCurrentOwner");
    var warning = require("npm:react@0.12.2/lib/warning");
    var RESERVED_PROPS = {
      key: true,
      ref: true
    };
    function defineWarningProperty(object, key) {
      Object.defineProperty(object, key, {
        configurable: false,
        enumerable: true,
        get: function() {
          if (!this._store) {
            return null;
          }
          return this._store[key];
        },
        set: function(value) {
          ("production" !== process.env.NODE_ENV ? warning(false, 'Don\'t set the ' + key + ' property of the component. ' + 'Mutate the existing props object instead.') : null);
          this._store[key] = value;
        }
      });
    }
    var useMutationMembrane = false;
    function defineMutationMembrane(prototype) {
      try {
        var pseudoFrozenProperties = {props: true};
        for (var key in pseudoFrozenProperties) {
          defineWarningProperty(prototype, key);
        }
        useMutationMembrane = true;
      } catch (x) {}
    }
    var ReactElement = function(type, key, ref, owner, context, props) {
      this.type = type;
      this.key = key;
      this.ref = ref;
      this._owner = owner;
      this._context = context;
      if ("production" !== process.env.NODE_ENV) {
        this._store = {
          validated: false,
          props: props
        };
        if (useMutationMembrane) {
          Object.freeze(this);
          return ;
        }
      }
      this.props = props;
    };
    ReactElement.prototype = {_isReactElement: true};
    if ("production" !== process.env.NODE_ENV) {
      defineMutationMembrane(ReactElement.prototype);
    }
    ReactElement.createElement = function(type, config, children) {
      var propName;
      var props = {};
      var key = null;
      var ref = null;
      if (config != null) {
        ref = config.ref === undefined ? null : config.ref;
        if ("production" !== process.env.NODE_ENV) {
          ("production" !== process.env.NODE_ENV ? warning(config.key !== null, 'createElement(...): Encountered component with a `key` of null. In ' + 'a future version, this will be treated as equivalent to the string ' + '\'null\'; instead, provide an explicit key or use undefined.') : null);
        }
        key = config.key == null ? null : '' + config.key;
        for (propName in config) {
          if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (typeof props[propName] === 'undefined') {
            props[propName] = defaultProps[propName];
          }
        }
      }
      return new ReactElement(type, key, ref, ReactCurrentOwner.current, ReactContext.current, props);
    };
    ReactElement.createFactory = function(type) {
      var factory = ReactElement.createElement.bind(null, type);
      factory.type = type;
      return factory;
    };
    ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
      var newElement = new ReactElement(oldElement.type, oldElement.key, oldElement.ref, oldElement._owner, oldElement._context, newProps);
      if ("production" !== process.env.NODE_ENV) {
        newElement._store.validated = oldElement._store.validated;
      }
      return newElement;
    };
    ReactElement.isValidElement = function(object) {
      var isElement = !!(object && object._isReactElement);
      return isElement;
    };
    module.exports = ReactElement;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactComponent", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactOwner", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/keyMirror", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactOwner = require("npm:react@0.12.2/lib/ReactOwner");
    var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var keyMirror = require("npm:react@0.12.2/lib/keyMirror");
    var ComponentLifeCycle = keyMirror({
      MOUNTED: null,
      UNMOUNTED: null
    });
    var injected = false;
    var unmountIDFromEnvironment = null;
    var mountImageIntoNode = null;
    var ReactComponent = {
      injection: {injectEnvironment: function(ReactComponentEnvironment) {
          ("production" !== process.env.NODE_ENV ? invariant(!injected, 'ReactComponent: injectEnvironment() can only be called once.') : invariant(!injected));
          mountImageIntoNode = ReactComponentEnvironment.mountImageIntoNode;
          unmountIDFromEnvironment = ReactComponentEnvironment.unmountIDFromEnvironment;
          ReactComponent.BackendIDOperations = ReactComponentEnvironment.BackendIDOperations;
          injected = true;
        }},
      LifeCycle: ComponentLifeCycle,
      BackendIDOperations: null,
      Mixin: {
        isMounted: function() {
          return this._lifeCycleState === ComponentLifeCycle.MOUNTED;
        },
        setProps: function(partialProps, callback) {
          var element = this._pendingElement || this._currentElement;
          this.replaceProps(assign({}, element.props, partialProps), callback);
        },
        replaceProps: function(props, callback) {
          ("production" !== process.env.NODE_ENV ? invariant(this.isMounted(), 'replaceProps(...): Can only update a mounted component.') : invariant(this.isMounted()));
          ("production" !== process.env.NODE_ENV ? invariant(this._mountDepth === 0, 'replaceProps(...): You called `setProps` or `replaceProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(this._mountDepth === 0));
          this._pendingElement = ReactElement.cloneAndReplaceProps(this._pendingElement || this._currentElement, props);
          ReactUpdates.enqueueUpdate(this, callback);
        },
        _setPropsInternal: function(partialProps, callback) {
          var element = this._pendingElement || this._currentElement;
          this._pendingElement = ReactElement.cloneAndReplaceProps(element, assign({}, element.props, partialProps));
          ReactUpdates.enqueueUpdate(this, callback);
        },
        construct: function(element) {
          this.props = element.props;
          this._owner = element._owner;
          this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;
          this._pendingCallbacks = null;
          this._currentElement = element;
          this._pendingElement = null;
        },
        mountComponent: function(rootID, transaction, mountDepth) {
          ("production" !== process.env.NODE_ENV ? invariant(!this.isMounted(), 'mountComponent(%s, ...): Can only mount an unmounted component. ' + 'Make sure to avoid storing components between renders or reusing a ' + 'single component instance in multiple places.', rootID) : invariant(!this.isMounted()));
          var ref = this._currentElement.ref;
          if (ref != null) {
            var owner = this._currentElement._owner;
            ReactOwner.addComponentAsRefTo(this, ref, owner);
          }
          this._rootNodeID = rootID;
          this._lifeCycleState = ComponentLifeCycle.MOUNTED;
          this._mountDepth = mountDepth;
        },
        unmountComponent: function() {
          ("production" !== process.env.NODE_ENV ? invariant(this.isMounted(), 'unmountComponent(): Can only unmount a mounted component.') : invariant(this.isMounted()));
          var ref = this._currentElement.ref;
          if (ref != null) {
            ReactOwner.removeComponentAsRefFrom(this, ref, this._owner);
          }
          unmountIDFromEnvironment(this._rootNodeID);
          this._rootNodeID = null;
          this._lifeCycleState = ComponentLifeCycle.UNMOUNTED;
        },
        receiveComponent: function(nextElement, transaction) {
          ("production" !== process.env.NODE_ENV ? invariant(this.isMounted(), 'receiveComponent(...): Can only update a mounted component.') : invariant(this.isMounted()));
          this._pendingElement = nextElement;
          this.performUpdateIfNecessary(transaction);
        },
        performUpdateIfNecessary: function(transaction) {
          if (this._pendingElement == null) {
            return ;
          }
          var prevElement = this._currentElement;
          var nextElement = this._pendingElement;
          this._currentElement = nextElement;
          this.props = nextElement.props;
          this._owner = nextElement._owner;
          this._pendingElement = null;
          this.updateComponent(transaction, prevElement);
        },
        updateComponent: function(transaction, prevElement) {
          var nextElement = this._currentElement;
          if (nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref) {
            if (prevElement.ref != null) {
              ReactOwner.removeComponentAsRefFrom(this, prevElement.ref, prevElement._owner);
            }
            if (nextElement.ref != null) {
              ReactOwner.addComponentAsRefTo(this, nextElement.ref, nextElement._owner);
            }
          }
        },
        mountComponentIntoNode: function(rootID, container, shouldReuseMarkup) {
          var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
          transaction.perform(this._mountComponentIntoNode, this, rootID, container, transaction, shouldReuseMarkup);
          ReactUpdates.ReactReconcileTransaction.release(transaction);
        },
        _mountComponentIntoNode: function(rootID, container, transaction, shouldReuseMarkup) {
          var markup = this.mountComponent(rootID, transaction, 0);
          mountImageIntoNode(markup, container, shouldReuseMarkup);
        },
        isOwnedBy: function(owner) {
          return this._owner === owner;
        },
        getSiblingByRef: function(ref) {
          var owner = this._owner;
          if (!owner || !owner.refs) {
            return null;
          }
          return owner.refs[ref];
        }
      }
    };
    module.exports = ReactComponent;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactCompositeComponent", ["npm:react@0.12.2/lib/ReactComponent", "npm:react@0.12.2/lib/ReactContext", "npm:react@0.12.2/lib/ReactCurrentOwner", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactElementValidator", "npm:react@0.12.2/lib/ReactEmptyComponent", "npm:react@0.12.2/lib/ReactErrorUtils", "npm:react@0.12.2/lib/ReactLegacyElement", "npm:react@0.12.2/lib/ReactOwner", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/ReactPropTransferer", "npm:react@0.12.2/lib/ReactPropTypeLocations", "npm:react@0.12.2/lib/ReactPropTypeLocationNames", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/instantiateReactComponent", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/keyMirror", "npm:react@0.12.2/lib/keyOf", "npm:react@0.12.2/lib/monitorCodeUse", "npm:react@0.12.2/lib/mapObject", "npm:react@0.12.2/lib/shouldUpdateReactComponent", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactComponent = require("npm:react@0.12.2/lib/ReactComponent");
    var ReactContext = require("npm:react@0.12.2/lib/ReactContext");
    var ReactCurrentOwner = require("npm:react@0.12.2/lib/ReactCurrentOwner");
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactElementValidator = require("npm:react@0.12.2/lib/ReactElementValidator");
    var ReactEmptyComponent = require("npm:react@0.12.2/lib/ReactEmptyComponent");
    var ReactErrorUtils = require("npm:react@0.12.2/lib/ReactErrorUtils");
    var ReactLegacyElement = require("npm:react@0.12.2/lib/ReactLegacyElement");
    var ReactOwner = require("npm:react@0.12.2/lib/ReactOwner");
    var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
    var ReactPropTransferer = require("npm:react@0.12.2/lib/ReactPropTransferer");
    var ReactPropTypeLocations = require("npm:react@0.12.2/lib/ReactPropTypeLocations");
    var ReactPropTypeLocationNames = require("npm:react@0.12.2/lib/ReactPropTypeLocationNames");
    var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var instantiateReactComponent = require("npm:react@0.12.2/lib/instantiateReactComponent");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var keyMirror = require("npm:react@0.12.2/lib/keyMirror");
    var keyOf = require("npm:react@0.12.2/lib/keyOf");
    var monitorCodeUse = require("npm:react@0.12.2/lib/monitorCodeUse");
    var mapObject = require("npm:react@0.12.2/lib/mapObject");
    var shouldUpdateReactComponent = require("npm:react@0.12.2/lib/shouldUpdateReactComponent");
    var warning = require("npm:react@0.12.2/lib/warning");
    var MIXINS_KEY = keyOf({mixins: null});
    var SpecPolicy = keyMirror({
      DEFINE_ONCE: null,
      DEFINE_MANY: null,
      OVERRIDE_BASE: null,
      DEFINE_MANY_MERGED: null
    });
    var injectedMixins = [];
    var ReactCompositeComponentInterface = {
      mixins: SpecPolicy.DEFINE_MANY,
      statics: SpecPolicy.DEFINE_MANY,
      propTypes: SpecPolicy.DEFINE_MANY,
      contextTypes: SpecPolicy.DEFINE_MANY,
      childContextTypes: SpecPolicy.DEFINE_MANY,
      getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
      getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
      getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
      render: SpecPolicy.DEFINE_ONCE,
      componentWillMount: SpecPolicy.DEFINE_MANY,
      componentDidMount: SpecPolicy.DEFINE_MANY,
      componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
      shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
      componentWillUpdate: SpecPolicy.DEFINE_MANY,
      componentDidUpdate: SpecPolicy.DEFINE_MANY,
      componentWillUnmount: SpecPolicy.DEFINE_MANY,
      updateComponent: SpecPolicy.OVERRIDE_BASE
    };
    var RESERVED_SPEC_KEYS = {
      displayName: function(Constructor, displayName) {
        Constructor.displayName = displayName;
      },
      mixins: function(Constructor, mixins) {
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            mixSpecIntoComponent(Constructor, mixins[i]);
          }
        }
      },
      childContextTypes: function(Constructor, childContextTypes) {
        validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
        Constructor.childContextTypes = assign({}, Constructor.childContextTypes, childContextTypes);
      },
      contextTypes: function(Constructor, contextTypes) {
        validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
        Constructor.contextTypes = assign({}, Constructor.contextTypes, contextTypes);
      },
      getDefaultProps: function(Constructor, getDefaultProps) {
        if (Constructor.getDefaultProps) {
          Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
        } else {
          Constructor.getDefaultProps = getDefaultProps;
        }
      },
      propTypes: function(Constructor, propTypes) {
        validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
        Constructor.propTypes = assign({}, Constructor.propTypes, propTypes);
      },
      statics: function(Constructor, statics) {
        mixStaticSpecIntoComponent(Constructor, statics);
      }
    };
    function getDeclarationErrorAddendum(component) {
      var owner = component._owner || null;
      if (owner && owner.constructor && owner.constructor.displayName) {
        return ' Check the render method of `' + owner.constructor.displayName + '`.';
      }
      return '';
    }
    function validateTypeDef(Constructor, typeDef, location) {
      for (var propName in typeDef) {
        if (typeDef.hasOwnProperty(propName)) {
          ("production" !== process.env.NODE_ENV ? invariant(typeof typeDef[propName] == 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactCompositeComponent', ReactPropTypeLocationNames[location], propName) : invariant(typeof typeDef[propName] == 'function'));
        }
      }
    }
    function validateMethodOverride(proto, name) {
      var specPolicy = ReactCompositeComponentInterface.hasOwnProperty(name) ? ReactCompositeComponentInterface[name] : null;
      if (ReactCompositeComponentMixin.hasOwnProperty(name)) {
        ("production" !== process.env.NODE_ENV ? invariant(specPolicy === SpecPolicy.OVERRIDE_BASE, 'ReactCompositeComponentInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(specPolicy === SpecPolicy.OVERRIDE_BASE));
      }
      if (proto.hasOwnProperty(name)) {
        ("production" !== process.env.NODE_ENV ? invariant(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED, 'ReactCompositeComponentInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED));
      }
    }
    function validateLifeCycleOnReplaceState(instance) {
      var compositeLifeCycleState = instance._compositeLifeCycleState;
      ("production" !== process.env.NODE_ENV ? invariant(instance.isMounted() || compositeLifeCycleState === CompositeLifeCycle.MOUNTING, 'replaceState(...): Can only update a mounted or mounting component.') : invariant(instance.isMounted() || compositeLifeCycleState === CompositeLifeCycle.MOUNTING));
      ("production" !== process.env.NODE_ENV ? invariant(ReactCurrentOwner.current == null, 'replaceState(...): Cannot update during an existing state transition ' + '(such as within `render`). Render methods should be a pure function ' + 'of props and state.') : invariant(ReactCurrentOwner.current == null));
      ("production" !== process.env.NODE_ENV ? invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING, 'replaceState(...): Cannot update while unmounting component. This ' + 'usually means you called setState() on an unmounted component.') : invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING));
    }
    function mixSpecIntoComponent(Constructor, spec) {
      if (!spec) {
        return ;
      }
      ("production" !== process.env.NODE_ENV ? invariant(!ReactLegacyElement.isValidFactory(spec), 'ReactCompositeComponent: You\'re attempting to ' + 'use a component class as a mixin. Instead, just use a regular object.') : invariant(!ReactLegacyElement.isValidFactory(spec)));
      ("production" !== process.env.NODE_ENV ? invariant(!ReactElement.isValidElement(spec), 'ReactCompositeComponent: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(!ReactElement.isValidElement(spec)));
      var proto = Constructor.prototype;
      if (spec.hasOwnProperty(MIXINS_KEY)) {
        RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
      }
      for (var name in spec) {
        if (!spec.hasOwnProperty(name)) {
          continue;
        }
        if (name === MIXINS_KEY) {
          continue;
        }
        var property = spec[name];
        validateMethodOverride(proto, name);
        if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
          RESERVED_SPEC_KEYS[name](Constructor, property);
        } else {
          var isCompositeComponentMethod = ReactCompositeComponentInterface.hasOwnProperty(name);
          var isAlreadyDefined = proto.hasOwnProperty(name);
          var markedDontBind = property && property.__reactDontBind;
          var isFunction = typeof property === 'function';
          var shouldAutoBind = isFunction && !isCompositeComponentMethod && !isAlreadyDefined && !markedDontBind;
          if (shouldAutoBind) {
            if (!proto.__reactAutoBindMap) {
              proto.__reactAutoBindMap = {};
            }
            proto.__reactAutoBindMap[name] = property;
            proto[name] = property;
          } else {
            if (isAlreadyDefined) {
              var specPolicy = ReactCompositeComponentInterface[name];
              ("production" !== process.env.NODE_ENV ? invariant(isCompositeComponentMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY), 'ReactCompositeComponent: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(isCompositeComponentMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)));
              if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
                proto[name] = createMergedResultFunction(proto[name], property);
              } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
                proto[name] = createChainedFunction(proto[name], property);
              }
            } else {
              proto[name] = property;
              if ("production" !== process.env.NODE_ENV) {
                if (typeof property === 'function' && spec.displayName) {
                  proto[name].displayName = spec.displayName + '_' + name;
                }
              }
            }
          }
        }
      }
    }
    function mixStaticSpecIntoComponent(Constructor, statics) {
      if (!statics) {
        return ;
      }
      for (var name in statics) {
        var property = statics[name];
        if (!statics.hasOwnProperty(name)) {
          continue;
        }
        var isReserved = name in RESERVED_SPEC_KEYS;
        ("production" !== process.env.NODE_ENV ? invariant(!isReserved, 'ReactCompositeComponent: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(!isReserved));
        var isInherited = name in Constructor;
        ("production" !== process.env.NODE_ENV ? invariant(!isInherited, 'ReactCompositeComponent: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(!isInherited));
        Constructor[name] = property;
      }
    }
    function mergeObjectsWithNoDuplicateKeys(one, two) {
      ("production" !== process.env.NODE_ENV ? invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeObjectsWithNoDuplicateKeys(): Cannot merge non-objects') : invariant(one && two && typeof one === 'object' && typeof two === 'object'));
      mapObject(two, function(value, key) {
        ("production" !== process.env.NODE_ENV ? invariant(one[key] === undefined, 'mergeObjectsWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(one[key] === undefined));
        one[key] = value;
      });
      return one;
    }
    function createMergedResultFunction(one, two) {
      return function mergedResult() {
        var a = one.apply(this, arguments);
        var b = two.apply(this, arguments);
        if (a == null) {
          return b;
        } else if (b == null) {
          return a;
        }
        return mergeObjectsWithNoDuplicateKeys(a, b);
      };
    }
    function createChainedFunction(one, two) {
      return function chainedFunction() {
        one.apply(this, arguments);
        two.apply(this, arguments);
      };
    }
    var CompositeLifeCycle = keyMirror({
      MOUNTING: null,
      UNMOUNTING: null,
      RECEIVING_PROPS: null
    });
    var ReactCompositeComponentMixin = {
      construct: function(element) {
        ReactComponent.Mixin.construct.apply(this, arguments);
        ReactOwner.Mixin.construct.apply(this, arguments);
        this.state = null;
        this._pendingState = null;
        this.context = null;
        this._compositeLifeCycleState = null;
      },
      isMounted: function() {
        return ReactComponent.Mixin.isMounted.call(this) && this._compositeLifeCycleState !== CompositeLifeCycle.MOUNTING;
      },
      mountComponent: ReactPerf.measure('ReactCompositeComponent', 'mountComponent', function(rootID, transaction, mountDepth) {
        ReactComponent.Mixin.mountComponent.call(this, rootID, transaction, mountDepth);
        this._compositeLifeCycleState = CompositeLifeCycle.MOUNTING;
        if (this.__reactAutoBindMap) {
          this._bindAutoBindMethods();
        }
        this.context = this._processContext(this._currentElement._context);
        this.props = this._processProps(this.props);
        this.state = this.getInitialState ? this.getInitialState() : null;
        ("production" !== process.env.NODE_ENV ? invariant(typeof this.state === 'object' && !Array.isArray(this.state), '%s.getInitialState(): must return an object or null', this.constructor.displayName || 'ReactCompositeComponent') : invariant(typeof this.state === 'object' && !Array.isArray(this.state)));
        this._pendingState = null;
        this._pendingForceUpdate = false;
        if (this.componentWillMount) {
          this.componentWillMount();
          if (this._pendingState) {
            this.state = this._pendingState;
            this._pendingState = null;
          }
        }
        this._renderedComponent = instantiateReactComponent(this._renderValidatedComponent(), this._currentElement.type);
        this._compositeLifeCycleState = null;
        var markup = this._renderedComponent.mountComponent(rootID, transaction, mountDepth + 1);
        if (this.componentDidMount) {
          transaction.getReactMountReady().enqueue(this.componentDidMount, this);
        }
        return markup;
      }),
      unmountComponent: function() {
        this._compositeLifeCycleState = CompositeLifeCycle.UNMOUNTING;
        if (this.componentWillUnmount) {
          this.componentWillUnmount();
        }
        this._compositeLifeCycleState = null;
        this._renderedComponent.unmountComponent();
        this._renderedComponent = null;
        ReactComponent.Mixin.unmountComponent.call(this);
      },
      setState: function(partialState, callback) {
        ("production" !== process.env.NODE_ENV ? invariant(typeof partialState === 'object' || partialState == null, 'setState(...): takes an object of state variables to update.') : invariant(typeof partialState === 'object' || partialState == null));
        if ("production" !== process.env.NODE_ENV) {
          ("production" !== process.env.NODE_ENV ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : null);
        }
        this.replaceState(assign({}, this._pendingState || this.state, partialState), callback);
      },
      replaceState: function(completeState, callback) {
        validateLifeCycleOnReplaceState(this);
        this._pendingState = completeState;
        if (this._compositeLifeCycleState !== CompositeLifeCycle.MOUNTING) {
          ReactUpdates.enqueueUpdate(this, callback);
        }
      },
      _processContext: function(context) {
        var maskedContext = null;
        var contextTypes = this.constructor.contextTypes;
        if (contextTypes) {
          maskedContext = {};
          for (var contextName in contextTypes) {
            maskedContext[contextName] = context[contextName];
          }
          if ("production" !== process.env.NODE_ENV) {
            this._checkPropTypes(contextTypes, maskedContext, ReactPropTypeLocations.context);
          }
        }
        return maskedContext;
      },
      _processChildContext: function(currentContext) {
        var childContext = this.getChildContext && this.getChildContext();
        var displayName = this.constructor.displayName || 'ReactCompositeComponent';
        if (childContext) {
          ("production" !== process.env.NODE_ENV ? invariant(typeof this.constructor.childContextTypes === 'object', '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', displayName) : invariant(typeof this.constructor.childContextTypes === 'object'));
          if ("production" !== process.env.NODE_ENV) {
            this._checkPropTypes(this.constructor.childContextTypes, childContext, ReactPropTypeLocations.childContext);
          }
          for (var name in childContext) {
            ("production" !== process.env.NODE_ENV ? invariant(name in this.constructor.childContextTypes, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', displayName, name) : invariant(name in this.constructor.childContextTypes));
          }
          return assign({}, currentContext, childContext);
        }
        return currentContext;
      },
      _processProps: function(newProps) {
        if ("production" !== process.env.NODE_ENV) {
          var propTypes = this.constructor.propTypes;
          if (propTypes) {
            this._checkPropTypes(propTypes, newProps, ReactPropTypeLocations.prop);
          }
        }
        return newProps;
      },
      _checkPropTypes: function(propTypes, props, location) {
        var componentName = this.constructor.displayName;
        for (var propName in propTypes) {
          if (propTypes.hasOwnProperty(propName)) {
            var error = propTypes[propName](props, propName, componentName, location);
            if (error instanceof Error) {
              var addendum = getDeclarationErrorAddendum(this);
              ("production" !== process.env.NODE_ENV ? warning(false, error.message + addendum) : null);
            }
          }
        }
      },
      performUpdateIfNecessary: function(transaction) {
        var compositeLifeCycleState = this._compositeLifeCycleState;
        if (compositeLifeCycleState === CompositeLifeCycle.MOUNTING || compositeLifeCycleState === CompositeLifeCycle.RECEIVING_PROPS) {
          return ;
        }
        if (this._pendingElement == null && this._pendingState == null && !this._pendingForceUpdate) {
          return ;
        }
        var nextContext = this.context;
        var nextProps = this.props;
        var nextElement = this._currentElement;
        if (this._pendingElement != null) {
          nextElement = this._pendingElement;
          nextContext = this._processContext(nextElement._context);
          nextProps = this._processProps(nextElement.props);
          this._pendingElement = null;
          this._compositeLifeCycleState = CompositeLifeCycle.RECEIVING_PROPS;
          if (this.componentWillReceiveProps) {
            this.componentWillReceiveProps(nextProps, nextContext);
          }
        }
        this._compositeLifeCycleState = null;
        var nextState = this._pendingState || this.state;
        this._pendingState = null;
        var shouldUpdate = this._pendingForceUpdate || !this.shouldComponentUpdate || this.shouldComponentUpdate(nextProps, nextState, nextContext);
        if ("production" !== process.env.NODE_ENV) {
          if (typeof shouldUpdate === "undefined") {
            console.warn((this.constructor.displayName || 'ReactCompositeComponent') + '.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.');
          }
        }
        if (shouldUpdate) {
          this._pendingForceUpdate = false;
          this._performComponentUpdate(nextElement, nextProps, nextState, nextContext, transaction);
        } else {
          this._currentElement = nextElement;
          this.props = nextProps;
          this.state = nextState;
          this.context = nextContext;
          this._owner = nextElement._owner;
        }
      },
      _performComponentUpdate: function(nextElement, nextProps, nextState, nextContext, transaction) {
        var prevElement = this._currentElement;
        var prevProps = this.props;
        var prevState = this.state;
        var prevContext = this.context;
        if (this.componentWillUpdate) {
          this.componentWillUpdate(nextProps, nextState, nextContext);
        }
        this._currentElement = nextElement;
        this.props = nextProps;
        this.state = nextState;
        this.context = nextContext;
        this._owner = nextElement._owner;
        this.updateComponent(transaction, prevElement);
        if (this.componentDidUpdate) {
          transaction.getReactMountReady().enqueue(this.componentDidUpdate.bind(this, prevProps, prevState, prevContext), this);
        }
      },
      receiveComponent: function(nextElement, transaction) {
        if (nextElement === this._currentElement && nextElement._owner != null) {
          return ;
        }
        ReactComponent.Mixin.receiveComponent.call(this, nextElement, transaction);
      },
      updateComponent: ReactPerf.measure('ReactCompositeComponent', 'updateComponent', function(transaction, prevParentElement) {
        ReactComponent.Mixin.updateComponent.call(this, transaction, prevParentElement);
        var prevComponentInstance = this._renderedComponent;
        var prevElement = prevComponentInstance._currentElement;
        var nextElement = this._renderValidatedComponent();
        if (shouldUpdateReactComponent(prevElement, nextElement)) {
          prevComponentInstance.receiveComponent(nextElement, transaction);
        } else {
          var thisID = this._rootNodeID;
          var prevComponentID = prevComponentInstance._rootNodeID;
          prevComponentInstance.unmountComponent();
          this._renderedComponent = instantiateReactComponent(nextElement, this._currentElement.type);
          var nextMarkup = this._renderedComponent.mountComponent(thisID, transaction, this._mountDepth + 1);
          ReactComponent.BackendIDOperations.dangerouslyReplaceNodeWithMarkupByID(prevComponentID, nextMarkup);
        }
      }),
      forceUpdate: function(callback) {
        var compositeLifeCycleState = this._compositeLifeCycleState;
        ("production" !== process.env.NODE_ENV ? invariant(this.isMounted() || compositeLifeCycleState === CompositeLifeCycle.MOUNTING, 'forceUpdate(...): Can only force an update on mounted or mounting ' + 'components.') : invariant(this.isMounted() || compositeLifeCycleState === CompositeLifeCycle.MOUNTING));
        ("production" !== process.env.NODE_ENV ? invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING && ReactCurrentOwner.current == null, 'forceUpdate(...): Cannot force an update while unmounting component ' + 'or within a `render` function.') : invariant(compositeLifeCycleState !== CompositeLifeCycle.UNMOUNTING && ReactCurrentOwner.current == null));
        this._pendingForceUpdate = true;
        ReactUpdates.enqueueUpdate(this, callback);
      },
      _renderValidatedComponent: ReactPerf.measure('ReactCompositeComponent', '_renderValidatedComponent', function() {
        var renderedComponent;
        var previousContext = ReactContext.current;
        ReactContext.current = this._processChildContext(this._currentElement._context);
        ReactCurrentOwner.current = this;
        try {
          renderedComponent = this.render();
          if (renderedComponent === null || renderedComponent === false) {
            renderedComponent = ReactEmptyComponent.getEmptyComponent();
            ReactEmptyComponent.registerNullComponentID(this._rootNodeID);
          } else {
            ReactEmptyComponent.deregisterNullComponentID(this._rootNodeID);
          }
        } finally {
          ReactContext.current = previousContext;
          ReactCurrentOwner.current = null;
        }
        ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(renderedComponent), '%s.render(): A valid ReactComponent must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', this.constructor.displayName || 'ReactCompositeComponent') : invariant(ReactElement.isValidElement(renderedComponent)));
        return renderedComponent;
      }),
      _bindAutoBindMethods: function() {
        for (var autoBindKey in this.__reactAutoBindMap) {
          if (!this.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
            continue;
          }
          var method = this.__reactAutoBindMap[autoBindKey];
          this[autoBindKey] = this._bindAutoBindMethod(ReactErrorUtils.guard(method, this.constructor.displayName + '.' + autoBindKey));
        }
      },
      _bindAutoBindMethod: function(method) {
        var component = this;
        var boundMethod = method.bind(component);
        if ("production" !== process.env.NODE_ENV) {
          boundMethod.__reactBoundContext = component;
          boundMethod.__reactBoundMethod = method;
          boundMethod.__reactBoundArguments = null;
          var componentName = component.constructor.displayName;
          var _bind = boundMethod.bind;
          boundMethod.bind = function(newThis) {
            for (var args = [],
                $__0 = 1,
                $__1 = arguments.length; $__0 < $__1; $__0++)
              args.push(arguments[$__0]);
            if (newThis !== component && newThis !== null) {
              monitorCodeUse('react_bind_warning', {component: componentName});
              console.warn('bind(): React component methods may only be bound to the ' + 'component instance. See ' + componentName);
            } else if (!args.length) {
              monitorCodeUse('react_bind_warning', {component: componentName});
              console.warn('bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See ' + componentName);
              return boundMethod;
            }
            var reboundMethod = _bind.apply(boundMethod, arguments);
            reboundMethod.__reactBoundContext = component;
            reboundMethod.__reactBoundMethod = method;
            reboundMethod.__reactBoundArguments = args;
            return reboundMethod;
          };
        }
        return boundMethod;
      }
    };
    var ReactCompositeComponentBase = function() {};
    assign(ReactCompositeComponentBase.prototype, ReactComponent.Mixin, ReactOwner.Mixin, ReactPropTransferer.Mixin, ReactCompositeComponentMixin);
    var ReactCompositeComponent = {
      LifeCycle: CompositeLifeCycle,
      Base: ReactCompositeComponentBase,
      createClass: function(spec) {
        var Constructor = function(props) {};
        Constructor.prototype = new ReactCompositeComponentBase();
        Constructor.prototype.constructor = Constructor;
        injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
        mixSpecIntoComponent(Constructor, spec);
        if (Constructor.getDefaultProps) {
          Constructor.defaultProps = Constructor.getDefaultProps();
        }
        ("production" !== process.env.NODE_ENV ? invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.') : invariant(Constructor.prototype.render));
        if ("production" !== process.env.NODE_ENV) {
          if (Constructor.prototype.componentShouldUpdate) {
            monitorCodeUse('react_component_should_update_warning', {component: spec.displayName});
            console.warn((spec.displayName || 'A component') + ' has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.');
          }
        }
        for (var methodName in ReactCompositeComponentInterface) {
          if (!Constructor.prototype[methodName]) {
            Constructor.prototype[methodName] = null;
          }
        }
        if ("production" !== process.env.NODE_ENV) {
          return ReactLegacyElement.wrapFactory(ReactElementValidator.createFactory(Constructor));
        }
        return ReactLegacyElement.wrapFactory(ReactElement.createFactory(Constructor));
      },
      injection: {injectMixin: function(mixin) {
          injectedMixins.push(mixin);
        }}
    };
    module.exports = ReactCompositeComponent;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/CSSPropertyOperations", ["npm:react@0.12.2/lib/CSSProperty", "npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/camelizeStyleName", "npm:react@0.12.2/lib/dangerousStyleValue", "npm:react@0.12.2/lib/hyphenateStyleName", "npm:react@0.12.2/lib/memoizeStringOnly", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var CSSProperty = require("npm:react@0.12.2/lib/CSSProperty");
    var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
    var camelizeStyleName = require("npm:react@0.12.2/lib/camelizeStyleName");
    var dangerousStyleValue = require("npm:react@0.12.2/lib/dangerousStyleValue");
    var hyphenateStyleName = require("npm:react@0.12.2/lib/hyphenateStyleName");
    var memoizeStringOnly = require("npm:react@0.12.2/lib/memoizeStringOnly");
    var warning = require("npm:react@0.12.2/lib/warning");
    var processStyleName = memoizeStringOnly(function(styleName) {
      return hyphenateStyleName(styleName);
    });
    var styleFloatAccessor = 'cssFloat';
    if (ExecutionEnvironment.canUseDOM) {
      if (document.documentElement.style.cssFloat === undefined) {
        styleFloatAccessor = 'styleFloat';
      }
    }
    if ("production" !== process.env.NODE_ENV) {
      var warnedStyleNames = {};
      var warnHyphenatedStyleName = function(name) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return ;
        }
        warnedStyleNames[name] = true;
        ("production" !== process.env.NODE_ENV ? warning(false, 'Unsupported style property ' + name + '. Did you mean ' + camelizeStyleName(name) + '?') : null);
      };
    }
    var CSSPropertyOperations = {
      createMarkupForStyles: function(styles) {
        var serialized = '';
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          if ("production" !== process.env.NODE_ENV) {
            if (styleName.indexOf('-') > -1) {
              warnHyphenatedStyleName(styleName);
            }
          }
          var styleValue = styles[styleName];
          if (styleValue != null) {
            serialized += processStyleName(styleName) + ':';
            serialized += dangerousStyleValue(styleName, styleValue) + ';';
          }
        }
        return serialized || null;
      },
      setValueForStyles: function(node, styles) {
        var style = node.style;
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          if ("production" !== process.env.NODE_ENV) {
            if (styleName.indexOf('-') > -1) {
              warnHyphenatedStyleName(styleName);
            }
          }
          var styleValue = dangerousStyleValue(styleName, styles[styleName]);
          if (styleName === 'float') {
            styleName = styleFloatAccessor;
          }
          if (styleValue) {
            style[styleName] = styleValue;
          } else {
            var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
            if (expansion) {
              for (var individualStyleName in expansion) {
                style[individualStyleName] = '';
              }
            } else {
              style[styleName] = '';
            }
          }
        }
      }
    };
    module.exports = CSSPropertyOperations;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactBrowserEventEmitter", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPluginHub", "npm:react@0.12.2/lib/EventPluginRegistry", "npm:react@0.12.2/lib/ReactEventEmitterMixin", "npm:react@0.12.2/lib/ViewportMetrics", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/isEventSupported", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
    var EventPluginHub = require("npm:react@0.12.2/lib/EventPluginHub");
    var EventPluginRegistry = require("npm:react@0.12.2/lib/EventPluginRegistry");
    var ReactEventEmitterMixin = require("npm:react@0.12.2/lib/ReactEventEmitterMixin");
    var ViewportMetrics = require("npm:react@0.12.2/lib/ViewportMetrics");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var isEventSupported = require("npm:react@0.12.2/lib/isEventSupported");
    var alreadyListeningTo = {};
    var isMonitoringScrollValue = false;
    var reactTopListenersCounter = 0;
    var topEventMapping = {
      topBlur: 'blur',
      topChange: 'change',
      topClick: 'click',
      topCompositionEnd: 'compositionend',
      topCompositionStart: 'compositionstart',
      topCompositionUpdate: 'compositionupdate',
      topContextMenu: 'contextmenu',
      topCopy: 'copy',
      topCut: 'cut',
      topDoubleClick: 'dblclick',
      topDrag: 'drag',
      topDragEnd: 'dragend',
      topDragEnter: 'dragenter',
      topDragExit: 'dragexit',
      topDragLeave: 'dragleave',
      topDragOver: 'dragover',
      topDragStart: 'dragstart',
      topDrop: 'drop',
      topFocus: 'focus',
      topInput: 'input',
      topKeyDown: 'keydown',
      topKeyPress: 'keypress',
      topKeyUp: 'keyup',
      topMouseDown: 'mousedown',
      topMouseMove: 'mousemove',
      topMouseOut: 'mouseout',
      topMouseOver: 'mouseover',
      topMouseUp: 'mouseup',
      topPaste: 'paste',
      topScroll: 'scroll',
      topSelectionChange: 'selectionchange',
      topTextInput: 'textInput',
      topTouchCancel: 'touchcancel',
      topTouchEnd: 'touchend',
      topTouchMove: 'touchmove',
      topTouchStart: 'touchstart',
      topWheel: 'wheel'
    };
    var topListenersIDKey = "_reactListenersID" + String(Math.random()).slice(2);
    function getListeningForDocument(mountAt) {
      if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
        mountAt[topListenersIDKey] = reactTopListenersCounter++;
        alreadyListeningTo[mountAt[topListenersIDKey]] = {};
      }
      return alreadyListeningTo[mountAt[topListenersIDKey]];
    }
    var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {
      ReactEventListener: null,
      injection: {injectReactEventListener: function(ReactEventListener) {
          ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
          ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
        }},
      setEnabled: function(enabled) {
        if (ReactBrowserEventEmitter.ReactEventListener) {
          ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
        }
      },
      isEnabled: function() {
        return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
      },
      listenTo: function(registrationName, contentDocumentHandle) {
        var mountAt = contentDocumentHandle;
        var isListening = getListeningForDocument(mountAt);
        var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
        var topLevelTypes = EventConstants.topLevelTypes;
        for (var i = 0,
            l = dependencies.length; i < l; i++) {
          var dependency = dependencies[i];
          if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
            if (dependency === topLevelTypes.topWheel) {
              if (isEventSupported('wheel')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
              } else if (isEventSupported('mousewheel')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
              }
            } else if (dependency === topLevelTypes.topScroll) {
              if (isEventSupported('scroll', true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
              }
            } else if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {
              if (isEventSupported('focus', true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
              } else if (isEventSupported('focusin')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
              }
              isListening[topLevelTypes.topBlur] = true;
              isListening[topLevelTypes.topFocus] = true;
            } else if (topEventMapping.hasOwnProperty(dependency)) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
            }
            isListening[dependency] = true;
          }
        }
      },
      trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
        return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
      },
      trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
        return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
      },
      ensureScrollValueMonitoring: function() {
        if (!isMonitoringScrollValue) {
          var refresh = ViewportMetrics.refreshScrollValues;
          ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
          isMonitoringScrollValue = true;
        }
      },
      eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,
      registrationNameModules: EventPluginHub.registrationNameModules,
      putListener: EventPluginHub.putListener,
      getListener: EventPluginHub.getListener,
      deleteListener: EventPluginHub.deleteListener,
      deleteAllListeners: EventPluginHub.deleteAllListeners
    });
    module.exports = ReactBrowserEventEmitter;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/containsNode", ["npm:react@0.12.2/lib/isTextNode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isTextNode = require("npm:react@0.12.2/lib/isTextNode");
  function containsNode(outerNode, innerNode) {
    if (!outerNode || !innerNode) {
      return false;
    } else if (outerNode === innerNode) {
      return true;
    } else if (isTextNode(outerNode)) {
      return false;
    } else if (isTextNode(innerNode)) {
      return containsNode(outerNode, innerNode.parentNode);
    } else if (outerNode.contains) {
      return outerNode.contains(innerNode);
    } else if (outerNode.compareDocumentPosition) {
      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
    } else {
      return false;
    }
  }
  module.exports = containsNode;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactMultiChild", ["npm:react@0.12.2/lib/ReactComponent", "npm:react@0.12.2/lib/ReactMultiChildUpdateTypes", "npm:react@0.12.2/lib/flattenChildren", "npm:react@0.12.2/lib/instantiateReactComponent", "npm:react@0.12.2/lib/shouldUpdateReactComponent", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactComponent = require("npm:react@0.12.2/lib/ReactComponent");
    var ReactMultiChildUpdateTypes = require("npm:react@0.12.2/lib/ReactMultiChildUpdateTypes");
    var flattenChildren = require("npm:react@0.12.2/lib/flattenChildren");
    var instantiateReactComponent = require("npm:react@0.12.2/lib/instantiateReactComponent");
    var shouldUpdateReactComponent = require("npm:react@0.12.2/lib/shouldUpdateReactComponent");
    var updateDepth = 0;
    var updateQueue = [];
    var markupQueue = [];
    function enqueueMarkup(parentID, markup, toIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
        markupIndex: markupQueue.push(markup) - 1,
        textContent: null,
        fromIndex: null,
        toIndex: toIndex
      });
    }
    function enqueueMove(parentID, fromIndex, toIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
        markupIndex: null,
        textContent: null,
        fromIndex: fromIndex,
        toIndex: toIndex
      });
    }
    function enqueueRemove(parentID, fromIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.REMOVE_NODE,
        markupIndex: null,
        textContent: null,
        fromIndex: fromIndex,
        toIndex: null
      });
    }
    function enqueueTextContent(parentID, textContent) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
        markupIndex: null,
        textContent: textContent,
        fromIndex: null,
        toIndex: null
      });
    }
    function processQueue() {
      if (updateQueue.length) {
        ReactComponent.BackendIDOperations.dangerouslyProcessChildrenUpdates(updateQueue, markupQueue);
        clearQueue();
      }
    }
    function clearQueue() {
      updateQueue.length = 0;
      markupQueue.length = 0;
    }
    var ReactMultiChild = {Mixin: {
        mountChildren: function(nestedChildren, transaction) {
          var children = flattenChildren(nestedChildren);
          var mountImages = [];
          var index = 0;
          this._renderedChildren = children;
          for (var name in children) {
            var child = children[name];
            if (children.hasOwnProperty(name)) {
              var childInstance = instantiateReactComponent(child, null);
              children[name] = childInstance;
              var rootID = this._rootNodeID + name;
              var mountImage = childInstance.mountComponent(rootID, transaction, this._mountDepth + 1);
              childInstance._mountIndex = index;
              mountImages.push(mountImage);
              index++;
            }
          }
          return mountImages;
        },
        updateTextContent: function(nextContent) {
          updateDepth++;
          var errorThrown = true;
          try {
            var prevChildren = this._renderedChildren;
            for (var name in prevChildren) {
              if (prevChildren.hasOwnProperty(name)) {
                this._unmountChildByName(prevChildren[name], name);
              }
            }
            this.setTextContent(nextContent);
            errorThrown = false;
          } finally {
            updateDepth--;
            if (!updateDepth) {
              errorThrown ? clearQueue() : processQueue();
            }
          }
        },
        updateChildren: function(nextNestedChildren, transaction) {
          updateDepth++;
          var errorThrown = true;
          try {
            this._updateChildren(nextNestedChildren, transaction);
            errorThrown = false;
          } finally {
            updateDepth--;
            if (!updateDepth) {
              errorThrown ? clearQueue() : processQueue();
            }
          }
        },
        _updateChildren: function(nextNestedChildren, transaction) {
          var nextChildren = flattenChildren(nextNestedChildren);
          var prevChildren = this._renderedChildren;
          if (!nextChildren && !prevChildren) {
            return ;
          }
          var name;
          var lastIndex = 0;
          var nextIndex = 0;
          for (name in nextChildren) {
            if (!nextChildren.hasOwnProperty(name)) {
              continue;
            }
            var prevChild = prevChildren && prevChildren[name];
            var prevElement = prevChild && prevChild._currentElement;
            var nextElement = nextChildren[name];
            if (shouldUpdateReactComponent(prevElement, nextElement)) {
              this.moveChild(prevChild, nextIndex, lastIndex);
              lastIndex = Math.max(prevChild._mountIndex, lastIndex);
              prevChild.receiveComponent(nextElement, transaction);
              prevChild._mountIndex = nextIndex;
            } else {
              if (prevChild) {
                lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                this._unmountChildByName(prevChild, name);
              }
              var nextChildInstance = instantiateReactComponent(nextElement, null);
              this._mountChildByNameAtIndex(nextChildInstance, name, nextIndex, transaction);
            }
            nextIndex++;
          }
          for (name in prevChildren) {
            if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren[name])) {
              this._unmountChildByName(prevChildren[name], name);
            }
          }
        },
        unmountChildren: function() {
          var renderedChildren = this._renderedChildren;
          for (var name in renderedChildren) {
            var renderedChild = renderedChildren[name];
            if (renderedChild.unmountComponent) {
              renderedChild.unmountComponent();
            }
          }
          this._renderedChildren = null;
        },
        moveChild: function(child, toIndex, lastIndex) {
          if (child._mountIndex < lastIndex) {
            enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
          }
        },
        createChild: function(child, mountImage) {
          enqueueMarkup(this._rootNodeID, mountImage, child._mountIndex);
        },
        removeChild: function(child) {
          enqueueRemove(this._rootNodeID, child._mountIndex);
        },
        setTextContent: function(textContent) {
          enqueueTextContent(this._rootNodeID, textContent);
        },
        _mountChildByNameAtIndex: function(child, name, index, transaction) {
          var rootID = this._rootNodeID + name;
          var mountImage = child.mountComponent(rootID, transaction, this._mountDepth + 1);
          child._mountIndex = index;
          this.createChild(child, mountImage);
          this._renderedChildren = this._renderedChildren || {};
          this._renderedChildren[name] = child;
        },
        _unmountChildByName: function(child, name) {
          this.removeChild(child);
          child._mountIndex = null;
          child.unmountComponent();
          delete this._renderedChildren[name];
        }
      }};
    module.exports = ReactMultiChild;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SyntheticInputEvent", ["npm:react@0.12.2/lib/SyntheticEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var SyntheticEvent = require("npm:react@0.12.2/lib/SyntheticEvent");
  var InputEventInterface = {data: null};
  function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticEvent.augmentClass(SyntheticInputEvent, InputEventInterface);
  module.exports = SyntheticInputEvent;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactInputSelection", ["npm:react@0.12.2/lib/ReactDOMSelection", "npm:react@0.12.2/lib/containsNode", "npm:react@0.12.2/lib/focusNode", "npm:react@0.12.2/lib/getActiveElement"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactDOMSelection = require("npm:react@0.12.2/lib/ReactDOMSelection");
  var containsNode = require("npm:react@0.12.2/lib/containsNode");
  var focusNode = require("npm:react@0.12.2/lib/focusNode");
  var getActiveElement = require("npm:react@0.12.2/lib/getActiveElement");
  function isInDocument(node) {
    return containsNode(document.documentElement, node);
  }
  var ReactInputSelection = {
    hasSelectionCapabilities: function(elem) {
      return elem && ((elem.nodeName === 'INPUT' && elem.type === 'text') || elem.nodeName === 'TEXTAREA' || elem.contentEditable === 'true');
    },
    getSelectionInformation: function() {
      var focusedElem = getActiveElement();
      return {
        focusedElem: focusedElem,
        selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
      };
    },
    restoreSelection: function(priorSelectionInformation) {
      var curFocusedElem = getActiveElement();
      var priorFocusedElem = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
        if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
          ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
        }
        focusNode(priorFocusedElem);
      }
    },
    getSelection: function(input) {
      var selection;
      if ('selectionStart' in input) {
        selection = {
          start: input.selectionStart,
          end: input.selectionEnd
        };
      } else if (document.selection && input.nodeName === 'INPUT') {
        var range = document.selection.createRange();
        if (range.parentElement() === input) {
          selection = {
            start: -range.moveStart('character', -input.value.length),
            end: -range.moveEnd('character', -input.value.length)
          };
        }
      } else {
        selection = ReactDOMSelection.getOffsets(input);
      }
      return selection || {
        start: 0,
        end: 0
      };
    },
    setSelection: function(input, offsets) {
      var start = offsets.start;
      var end = offsets.end;
      if (typeof end === 'undefined') {
        end = start;
      }
      if ('selectionStart' in input) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      } else if (document.selection && input.nodeName === 'INPUT') {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      } else {
        ReactDOMSelection.setOffsets(input, offsets);
      }
    }
  };
  module.exports = ReactInputSelection;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/EnterLeaveEventPlugin", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPropagators", "npm:react@0.12.2/lib/SyntheticMouseEvent", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/keyOf"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
  var EventPropagators = require("npm:react@0.12.2/lib/EventPropagators");
  var SyntheticMouseEvent = require("npm:react@0.12.2/lib/SyntheticMouseEvent");
  var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
  var keyOf = require("npm:react@0.12.2/lib/keyOf");
  var topLevelTypes = EventConstants.topLevelTypes;
  var getFirstReactDOM = ReactMount.getFirstReactDOM;
  var eventTypes = {
    mouseEnter: {
      registrationName: keyOf({onMouseEnter: null}),
      dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    },
    mouseLeave: {
      registrationName: keyOf({onMouseLeave: null}),
      dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    }
  };
  var extractedEvents = [null, null];
  var EnterLeaveEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      if (topLevelType === topLevelTypes.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
        return null;
      }
      if (topLevelType !== topLevelTypes.topMouseOut && topLevelType !== topLevelTypes.topMouseOver) {
        return null;
      }
      var win;
      if (topLevelTarget.window === topLevelTarget) {
        win = topLevelTarget;
      } else {
        var doc = topLevelTarget.ownerDocument;
        if (doc) {
          win = doc.defaultView || doc.parentWindow;
        } else {
          win = window;
        }
      }
      var from,
          to;
      if (topLevelType === topLevelTypes.topMouseOut) {
        from = topLevelTarget;
        to = getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) || win;
      } else {
        from = win;
        to = topLevelTarget;
      }
      if (from === to) {
        return null;
      }
      var fromID = from ? ReactMount.getID(from) : '';
      var toID = to ? ReactMount.getID(to) : '';
      var leave = SyntheticMouseEvent.getPooled(eventTypes.mouseLeave, fromID, nativeEvent);
      leave.type = 'mouseleave';
      leave.target = from;
      leave.relatedTarget = to;
      var enter = SyntheticMouseEvent.getPooled(eventTypes.mouseEnter, toID, nativeEvent);
      enter.type = 'mouseenter';
      enter.target = to;
      enter.relatedTarget = from;
      EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);
      extractedEvents[0] = leave;
      extractedEvents[1] = enter;
      return extractedEvents;
    }
  };
  module.exports = EnterLeaveEventPlugin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/createNodesFromMarkup", ["npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/createArrayFrom", "npm:react@0.12.2/lib/getMarkupWrap", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
    var createArrayFrom = require("npm:react@0.12.2/lib/createArrayFrom");
    var getMarkupWrap = require("npm:react@0.12.2/lib/getMarkupWrap");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
    var nodeNamePattern = /^\s*<(\w+)/;
    function getNodeName(markup) {
      var nodeNameMatch = markup.match(nodeNamePattern);
      return nodeNameMatch && nodeNameMatch[1].toLowerCase();
    }
    function createNodesFromMarkup(markup, handleScript) {
      var node = dummyNode;
      ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'createNodesFromMarkup dummy not initialized') : invariant(!!dummyNode));
      var nodeName = getNodeName(markup);
      var wrap = nodeName && getMarkupWrap(nodeName);
      if (wrap) {
        node.innerHTML = wrap[1] + markup + wrap[2];
        var wrapDepth = wrap[0];
        while (wrapDepth--) {
          node = node.lastChild;
        }
      } else {
        node.innerHTML = markup;
      }
      var scripts = node.getElementsByTagName('script');
      if (scripts.length) {
        ("production" !== process.env.NODE_ENV ? invariant(handleScript, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(handleScript));
        createArrayFrom(scripts).forEach(handleScript);
      }
      var nodes = createArrayFrom(node.childNodes);
      while (node.lastChild) {
        node.removeChild(node.lastChild);
      }
      return nodes;
    }
    module.exports = createNodesFromMarkup;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMInput", ["npm:react@0.12.2/lib/AutoFocusMixin", "npm:react@0.12.2/lib/DOMPropertyOperations", "npm:react@0.12.2/lib/LinkedValueUtils", "npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactDOM", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var AutoFocusMixin = require("npm:react@0.12.2/lib/AutoFocusMixin");
    var DOMPropertyOperations = require("npm:react@0.12.2/lib/DOMPropertyOperations");
    var LinkedValueUtils = require("npm:react@0.12.2/lib/LinkedValueUtils");
    var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
    var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactDOM = require("npm:react@0.12.2/lib/ReactDOM");
    var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
    var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var input = ReactElement.createFactory(ReactDOM.input.type);
    var instancesByReactID = {};
    function forceUpdateIfMounted() {
      if (this.isMounted()) {
        this.forceUpdate();
      }
    }
    var ReactDOMInput = ReactCompositeComponent.createClass({
      displayName: 'ReactDOMInput',
      mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
      getInitialState: function() {
        var defaultValue = this.props.defaultValue;
        return {
          initialChecked: this.props.defaultChecked || false,
          initialValue: defaultValue != null ? defaultValue : null
        };
      },
      render: function() {
        var props = assign({}, this.props);
        props.defaultChecked = null;
        props.defaultValue = null;
        var value = LinkedValueUtils.getValue(this);
        props.value = value != null ? value : this.state.initialValue;
        var checked = LinkedValueUtils.getChecked(this);
        props.checked = checked != null ? checked : this.state.initialChecked;
        props.onChange = this._handleChange;
        return input(props, this.props.children);
      },
      componentDidMount: function() {
        var id = ReactMount.getID(this.getDOMNode());
        instancesByReactID[id] = this;
      },
      componentWillUnmount: function() {
        var rootNode = this.getDOMNode();
        var id = ReactMount.getID(rootNode);
        delete instancesByReactID[id];
      },
      componentDidUpdate: function(prevProps, prevState, prevContext) {
        var rootNode = this.getDOMNode();
        if (this.props.checked != null) {
          DOMPropertyOperations.setValueForProperty(rootNode, 'checked', this.props.checked || false);
        }
        var value = LinkedValueUtils.getValue(this);
        if (value != null) {
          DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
        }
      },
      _handleChange: function(event) {
        var returnValue;
        var onChange = LinkedValueUtils.getOnChange(this);
        if (onChange) {
          returnValue = onChange.call(this, event);
        }
        ReactUpdates.asap(forceUpdateIfMounted, this);
        var name = this.props.name;
        if (this.props.type === 'radio' && name != null) {
          var rootNode = this.getDOMNode();
          var queryRoot = rootNode;
          while (queryRoot.parentNode) {
            queryRoot = queryRoot.parentNode;
          }
          var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');
          for (var i = 0,
              groupLen = group.length; i < groupLen; i++) {
            var otherNode = group[i];
            if (otherNode === rootNode || otherNode.form !== rootNode.form) {
              continue;
            }
            var otherID = ReactMount.getID(otherNode);
            ("production" !== process.env.NODE_ENV ? invariant(otherID, 'ReactDOMInput: Mixing React and non-React radio inputs with the ' + 'same `name` is not supported.') : invariant(otherID));
            var otherInstance = instancesByReactID[otherID];
            ("production" !== process.env.NODE_ENV ? invariant(otherInstance, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(otherInstance));
            ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
          }
        }
        return returnValue;
      }
    });
    module.exports = ReactDOMInput;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/SimpleEventPlugin", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPluginUtils", "npm:react@0.12.2/lib/EventPropagators", "npm:react@0.12.2/lib/SyntheticClipboardEvent", "npm:react@0.12.2/lib/SyntheticEvent", "npm:react@0.12.2/lib/SyntheticFocusEvent", "npm:react@0.12.2/lib/SyntheticKeyboardEvent", "npm:react@0.12.2/lib/SyntheticMouseEvent", "npm:react@0.12.2/lib/SyntheticDragEvent", "npm:react@0.12.2/lib/SyntheticTouchEvent", "npm:react@0.12.2/lib/SyntheticUIEvent", "npm:react@0.12.2/lib/SyntheticWheelEvent", "npm:react@0.12.2/lib/getEventCharCode", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/keyOf", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
    var EventPluginUtils = require("npm:react@0.12.2/lib/EventPluginUtils");
    var EventPropagators = require("npm:react@0.12.2/lib/EventPropagators");
    var SyntheticClipboardEvent = require("npm:react@0.12.2/lib/SyntheticClipboardEvent");
    var SyntheticEvent = require("npm:react@0.12.2/lib/SyntheticEvent");
    var SyntheticFocusEvent = require("npm:react@0.12.2/lib/SyntheticFocusEvent");
    var SyntheticKeyboardEvent = require("npm:react@0.12.2/lib/SyntheticKeyboardEvent");
    var SyntheticMouseEvent = require("npm:react@0.12.2/lib/SyntheticMouseEvent");
    var SyntheticDragEvent = require("npm:react@0.12.2/lib/SyntheticDragEvent");
    var SyntheticTouchEvent = require("npm:react@0.12.2/lib/SyntheticTouchEvent");
    var SyntheticUIEvent = require("npm:react@0.12.2/lib/SyntheticUIEvent");
    var SyntheticWheelEvent = require("npm:react@0.12.2/lib/SyntheticWheelEvent");
    var getEventCharCode = require("npm:react@0.12.2/lib/getEventCharCode");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var keyOf = require("npm:react@0.12.2/lib/keyOf");
    var warning = require("npm:react@0.12.2/lib/warning");
    var topLevelTypes = EventConstants.topLevelTypes;
    var eventTypes = {
      blur: {phasedRegistrationNames: {
          bubbled: keyOf({onBlur: true}),
          captured: keyOf({onBlurCapture: true})
        }},
      click: {phasedRegistrationNames: {
          bubbled: keyOf({onClick: true}),
          captured: keyOf({onClickCapture: true})
        }},
      contextMenu: {phasedRegistrationNames: {
          bubbled: keyOf({onContextMenu: true}),
          captured: keyOf({onContextMenuCapture: true})
        }},
      copy: {phasedRegistrationNames: {
          bubbled: keyOf({onCopy: true}),
          captured: keyOf({onCopyCapture: true})
        }},
      cut: {phasedRegistrationNames: {
          bubbled: keyOf({onCut: true}),
          captured: keyOf({onCutCapture: true})
        }},
      doubleClick: {phasedRegistrationNames: {
          bubbled: keyOf({onDoubleClick: true}),
          captured: keyOf({onDoubleClickCapture: true})
        }},
      drag: {phasedRegistrationNames: {
          bubbled: keyOf({onDrag: true}),
          captured: keyOf({onDragCapture: true})
        }},
      dragEnd: {phasedRegistrationNames: {
          bubbled: keyOf({onDragEnd: true}),
          captured: keyOf({onDragEndCapture: true})
        }},
      dragEnter: {phasedRegistrationNames: {
          bubbled: keyOf({onDragEnter: true}),
          captured: keyOf({onDragEnterCapture: true})
        }},
      dragExit: {phasedRegistrationNames: {
          bubbled: keyOf({onDragExit: true}),
          captured: keyOf({onDragExitCapture: true})
        }},
      dragLeave: {phasedRegistrationNames: {
          bubbled: keyOf({onDragLeave: true}),
          captured: keyOf({onDragLeaveCapture: true})
        }},
      dragOver: {phasedRegistrationNames: {
          bubbled: keyOf({onDragOver: true}),
          captured: keyOf({onDragOverCapture: true})
        }},
      dragStart: {phasedRegistrationNames: {
          bubbled: keyOf({onDragStart: true}),
          captured: keyOf({onDragStartCapture: true})
        }},
      drop: {phasedRegistrationNames: {
          bubbled: keyOf({onDrop: true}),
          captured: keyOf({onDropCapture: true})
        }},
      focus: {phasedRegistrationNames: {
          bubbled: keyOf({onFocus: true}),
          captured: keyOf({onFocusCapture: true})
        }},
      input: {phasedRegistrationNames: {
          bubbled: keyOf({onInput: true}),
          captured: keyOf({onInputCapture: true})
        }},
      keyDown: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyDown: true}),
          captured: keyOf({onKeyDownCapture: true})
        }},
      keyPress: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyPress: true}),
          captured: keyOf({onKeyPressCapture: true})
        }},
      keyUp: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyUp: true}),
          captured: keyOf({onKeyUpCapture: true})
        }},
      load: {phasedRegistrationNames: {
          bubbled: keyOf({onLoad: true}),
          captured: keyOf({onLoadCapture: true})
        }},
      error: {phasedRegistrationNames: {
          bubbled: keyOf({onError: true}),
          captured: keyOf({onErrorCapture: true})
        }},
      mouseDown: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseDown: true}),
          captured: keyOf({onMouseDownCapture: true})
        }},
      mouseMove: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseMove: true}),
          captured: keyOf({onMouseMoveCapture: true})
        }},
      mouseOut: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseOut: true}),
          captured: keyOf({onMouseOutCapture: true})
        }},
      mouseOver: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseOver: true}),
          captured: keyOf({onMouseOverCapture: true})
        }},
      mouseUp: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseUp: true}),
          captured: keyOf({onMouseUpCapture: true})
        }},
      paste: {phasedRegistrationNames: {
          bubbled: keyOf({onPaste: true}),
          captured: keyOf({onPasteCapture: true})
        }},
      reset: {phasedRegistrationNames: {
          bubbled: keyOf({onReset: true}),
          captured: keyOf({onResetCapture: true})
        }},
      scroll: {phasedRegistrationNames: {
          bubbled: keyOf({onScroll: true}),
          captured: keyOf({onScrollCapture: true})
        }},
      submit: {phasedRegistrationNames: {
          bubbled: keyOf({onSubmit: true}),
          captured: keyOf({onSubmitCapture: true})
        }},
      touchCancel: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchCancel: true}),
          captured: keyOf({onTouchCancelCapture: true})
        }},
      touchEnd: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchEnd: true}),
          captured: keyOf({onTouchEndCapture: true})
        }},
      touchMove: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchMove: true}),
          captured: keyOf({onTouchMoveCapture: true})
        }},
      touchStart: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchStart: true}),
          captured: keyOf({onTouchStartCapture: true})
        }},
      wheel: {phasedRegistrationNames: {
          bubbled: keyOf({onWheel: true}),
          captured: keyOf({onWheelCapture: true})
        }}
    };
    var topLevelEventsToDispatchConfig = {
      topBlur: eventTypes.blur,
      topClick: eventTypes.click,
      topContextMenu: eventTypes.contextMenu,
      topCopy: eventTypes.copy,
      topCut: eventTypes.cut,
      topDoubleClick: eventTypes.doubleClick,
      topDrag: eventTypes.drag,
      topDragEnd: eventTypes.dragEnd,
      topDragEnter: eventTypes.dragEnter,
      topDragExit: eventTypes.dragExit,
      topDragLeave: eventTypes.dragLeave,
      topDragOver: eventTypes.dragOver,
      topDragStart: eventTypes.dragStart,
      topDrop: eventTypes.drop,
      topError: eventTypes.error,
      topFocus: eventTypes.focus,
      topInput: eventTypes.input,
      topKeyDown: eventTypes.keyDown,
      topKeyPress: eventTypes.keyPress,
      topKeyUp: eventTypes.keyUp,
      topLoad: eventTypes.load,
      topMouseDown: eventTypes.mouseDown,
      topMouseMove: eventTypes.mouseMove,
      topMouseOut: eventTypes.mouseOut,
      topMouseOver: eventTypes.mouseOver,
      topMouseUp: eventTypes.mouseUp,
      topPaste: eventTypes.paste,
      topReset: eventTypes.reset,
      topScroll: eventTypes.scroll,
      topSubmit: eventTypes.submit,
      topTouchCancel: eventTypes.touchCancel,
      topTouchEnd: eventTypes.touchEnd,
      topTouchMove: eventTypes.touchMove,
      topTouchStart: eventTypes.touchStart,
      topWheel: eventTypes.wheel
    };
    for (var topLevelType in topLevelEventsToDispatchConfig) {
      topLevelEventsToDispatchConfig[topLevelType].dependencies = [topLevelType];
    }
    var SimpleEventPlugin = {
      eventTypes: eventTypes,
      executeDispatch: function(event, listener, domID) {
        var returnValue = EventPluginUtils.executeDispatch(event, listener, domID);
        ("production" !== process.env.NODE_ENV ? warning(typeof returnValue !== 'boolean', 'Returning `false` from an event handler is deprecated and will be ' + 'ignored in a future release. Instead, manually call ' + 'e.stopPropagation() or e.preventDefault(), as appropriate.') : null);
        if (returnValue === false) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
      extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
        var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
        if (!dispatchConfig) {
          return null;
        }
        var EventConstructor;
        switch (topLevelType) {
          case topLevelTypes.topInput:
          case topLevelTypes.topLoad:
          case topLevelTypes.topError:
          case topLevelTypes.topReset:
          case topLevelTypes.topSubmit:
            EventConstructor = SyntheticEvent;
            break;
          case topLevelTypes.topKeyPress:
            if (getEventCharCode(nativeEvent) === 0) {
              return null;
            }
          case topLevelTypes.topKeyDown:
          case topLevelTypes.topKeyUp:
            EventConstructor = SyntheticKeyboardEvent;
            break;
          case topLevelTypes.topBlur:
          case topLevelTypes.topFocus:
            EventConstructor = SyntheticFocusEvent;
            break;
          case topLevelTypes.topClick:
            if (nativeEvent.button === 2) {
              return null;
            }
          case topLevelTypes.topContextMenu:
          case topLevelTypes.topDoubleClick:
          case topLevelTypes.topMouseDown:
          case topLevelTypes.topMouseMove:
          case topLevelTypes.topMouseOut:
          case topLevelTypes.topMouseOver:
          case topLevelTypes.topMouseUp:
            EventConstructor = SyntheticMouseEvent;
            break;
          case topLevelTypes.topDrag:
          case topLevelTypes.topDragEnd:
          case topLevelTypes.topDragEnter:
          case topLevelTypes.topDragExit:
          case topLevelTypes.topDragLeave:
          case topLevelTypes.topDragOver:
          case topLevelTypes.topDragStart:
          case topLevelTypes.topDrop:
            EventConstructor = SyntheticDragEvent;
            break;
          case topLevelTypes.topTouchCancel:
          case topLevelTypes.topTouchEnd:
          case topLevelTypes.topTouchMove:
          case topLevelTypes.topTouchStart:
            EventConstructor = SyntheticTouchEvent;
            break;
          case topLevelTypes.topScroll:
            EventConstructor = SyntheticUIEvent;
            break;
          case topLevelTypes.topWheel:
            EventConstructor = SyntheticWheelEvent;
            break;
          case topLevelTypes.topCopy:
          case topLevelTypes.topCut:
          case topLevelTypes.topPaste:
            EventConstructor = SyntheticClipboardEvent;
            break;
        }
        ("production" !== process.env.NODE_ENV ? invariant(EventConstructor, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : invariant(EventConstructor));
        var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent);
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      }
    };
    module.exports = SimpleEventPlugin;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDefaultPerf", ["npm:react@0.12.2/lib/DOMProperty", "npm:react@0.12.2/lib/ReactDefaultPerfAnalysis", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/performanceNow"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var DOMProperty = require("npm:react@0.12.2/lib/DOMProperty");
  var ReactDefaultPerfAnalysis = require("npm:react@0.12.2/lib/ReactDefaultPerfAnalysis");
  var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
  var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
  var performanceNow = require("npm:react@0.12.2/lib/performanceNow");
  function roundFloat(val) {
    return Math.floor(val * 100) / 100;
  }
  function addValue(obj, key, val) {
    obj[key] = (obj[key] || 0) + val;
  }
  var ReactDefaultPerf = {
    _allMeasurements: [],
    _mountStack: [0],
    _injected: false,
    start: function() {
      if (!ReactDefaultPerf._injected) {
        ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
      }
      ReactDefaultPerf._allMeasurements.length = 0;
      ReactPerf.enableMeasure = true;
    },
    stop: function() {
      ReactPerf.enableMeasure = false;
    },
    getLastMeasurements: function() {
      return ReactDefaultPerf._allMeasurements;
    },
    printExclusive: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
      console.table(summary.map(function(item) {
        return {
          'Component class name': item.componentName,
          'Total inclusive time (ms)': roundFloat(item.inclusive),
          'Exclusive mount time (ms)': roundFloat(item.exclusive),
          'Exclusive render time (ms)': roundFloat(item.render),
          'Mount time per instance (ms)': roundFloat(item.exclusive / item.count),
          'Render time per instance (ms)': roundFloat(item.render / item.count),
          'Instances': item.count
        };
      }));
    },
    printInclusive: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
      console.table(summary.map(function(item) {
        return {
          'Owner > component': item.componentName,
          'Inclusive time (ms)': roundFloat(item.time),
          'Instances': item.count
        };
      }));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    getMeasurementsSummaryMap: function(measurements) {
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements, true);
      return summary.map(function(item) {
        return {
          'Owner > component': item.componentName,
          'Wasted time (ms)': item.time,
          'Instances': item.count
        };
      });
    },
    printWasted: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      console.table(ReactDefaultPerf.getMeasurementsSummaryMap(measurements));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    printDOM: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
      console.table(summary.map(function(item) {
        var result = {};
        result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
        result['type'] = item.type;
        result['args'] = JSON.stringify(item.args);
        return result;
      }));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    _recordWrite: function(id, fnName, totalTime, args) {
      var writes = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].writes;
      writes[id] = writes[id] || [];
      writes[id].push({
        type: fnName,
        time: totalTime,
        args: args
      });
    },
    measure: function(moduleName, fnName, func) {
      return function() {
        for (var args = [],
            $__0 = 0,
            $__1 = arguments.length; $__0 < $__1; $__0++)
          args.push(arguments[$__0]);
        var totalTime;
        var rv;
        var start;
        if (fnName === '_renderNewRootComponent' || fnName === 'flushBatchedUpdates') {
          ReactDefaultPerf._allMeasurements.push({
            exclusive: {},
            inclusive: {},
            render: {},
            counts: {},
            writes: {},
            displayNames: {},
            totalTime: 0
          });
          start = performanceNow();
          rv = func.apply(this, args);
          ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].totalTime = performanceNow() - start;
          return rv;
        } else if (moduleName === 'ReactDOMIDOperations' || moduleName === 'ReactComponentBrowserEnvironment') {
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
          if (fnName === 'mountImageIntoNode') {
            var mountID = ReactMount.getID(args[1]);
            ReactDefaultPerf._recordWrite(mountID, fnName, totalTime, args[0]);
          } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
            args[0].forEach(function(update) {
              var writeArgs = {};
              if (update.fromIndex !== null) {
                writeArgs.fromIndex = update.fromIndex;
              }
              if (update.toIndex !== null) {
                writeArgs.toIndex = update.toIndex;
              }
              if (update.textContent !== null) {
                writeArgs.textContent = update.textContent;
              }
              if (update.markupIndex !== null) {
                writeArgs.markup = args[1][update.markupIndex];
              }
              ReactDefaultPerf._recordWrite(update.parentID, update.type, totalTime, writeArgs);
            });
          } else {
            ReactDefaultPerf._recordWrite(args[0], fnName, totalTime, Array.prototype.slice.call(args, 1));
          }
          return rv;
        } else if (moduleName === 'ReactCompositeComponent' && (fnName === 'mountComponent' || fnName === 'updateComponent' || fnName === '_renderValidatedComponent')) {
          var rootNodeID = fnName === 'mountComponent' ? args[0] : this._rootNodeID;
          var isRender = fnName === '_renderValidatedComponent';
          var isMount = fnName === 'mountComponent';
          var mountStack = ReactDefaultPerf._mountStack;
          var entry = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1];
          if (isRender) {
            addValue(entry.counts, rootNodeID, 1);
          } else if (isMount) {
            mountStack.push(0);
          }
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
          if (isRender) {
            addValue(entry.render, rootNodeID, totalTime);
          } else if (isMount) {
            var subMountTime = mountStack.pop();
            mountStack[mountStack.length - 1] += totalTime;
            addValue(entry.exclusive, rootNodeID, totalTime - subMountTime);
            addValue(entry.inclusive, rootNodeID, totalTime);
          } else {
            addValue(entry.inclusive, rootNodeID, totalTime);
          }
          entry.displayNames[rootNodeID] = {
            current: this.constructor.displayName,
            owner: this._owner ? this._owner.constructor.displayName : '<root>'
          };
          return rv;
        } else {
          return func.apply(this, args);
        }
      };
    }
  };
  module.exports = ReactDefaultPerf;
  global.define = __define;
  return module.exports;
});

System.register("npm:governorjs@0.0.3/lib/hub", ["npm:ramda@0.10.0"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var R = require("npm:ramda@0.10.0");
  module.exports = function() {
    var hub = {
      _events: {},
      bind: function() {
        var args = [].slice.call(arguments);
        var _this = this;
        return function() {
          _this.emit.apply(_this, args.concat([].slice.call(arguments)));
        };
      },
      on: function(key, fn) {
        if (!fn)
          return R.toPairs(key).forEach(R.apply(this.on));
        (hub._events[key] || (hub._events[key] = [])).push(fn);
      },
      off: function(key, fn) {
        var q = hub._events[key];
        if (!q)
          return ;
        if (fn) {
          var index = q.indexOf(fn);
          if (index === -1)
            return ;
          q.splice(index, 1);
          if (!q[0])
            delete hub._events[key];
        } else {
          delete hub._events[key];
        }
      },
      emit: function() {
        var args = [].slice.call(arguments);
        var q = hub._events[args.shift()] || [];
        q.forEach(function(fn) {
          fn.apply(null, args);
        });
      }
    };
    return hub;
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactCSSTransitionGroup", ["npm:react@0.12.2/lib/React", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/ReactTransitionGroup", "npm:react@0.12.2/lib/ReactCSSTransitionGroupChild"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2/lib/React");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var ReactTransitionGroup = React.createFactory(require("npm:react@0.12.2/lib/ReactTransitionGroup"));
  var ReactCSSTransitionGroupChild = React.createFactory(require("npm:react@0.12.2/lib/ReactCSSTransitionGroupChild"));
  var ReactCSSTransitionGroup = React.createClass({
    displayName: 'ReactCSSTransitionGroup',
    propTypes: {
      transitionName: React.PropTypes.string.isRequired,
      transitionEnter: React.PropTypes.bool,
      transitionLeave: React.PropTypes.bool
    },
    getDefaultProps: function() {
      return {
        transitionEnter: true,
        transitionLeave: true
      };
    },
    _wrapChild: function(child) {
      return ReactCSSTransitionGroupChild({
        name: this.props.transitionName,
        enter: this.props.transitionEnter,
        leave: this.props.transitionLeave
      }, child);
    },
    render: function() {
      return (ReactTransitionGroup(assign({}, this.props, {childFactory: this._wrapChild})));
    }
  });
  module.exports = ReactCSSTransitionGroup;
  global.define = __define;
  return module.exports;
});

System.register("npm:qs@2.3.3/index", ["npm:qs@2.3.3/lib/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:qs@2.3.3/lib/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/components/Route", ["npm:react@0.12.2", "npm:react-router@0.12.4/lib/Configuration", "npm:react-router@0.12.4/lib/PropTypes", "npm:react-router@0.12.4/lib/components/RouteHandler"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  var Configuration = require("npm:react-router@0.12.4/lib/Configuration");
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
  var RouteHandler = require("npm:react-router@0.12.4/lib/components/RouteHandler");
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
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/createRouter", ["npm:react@0.12.2", "npm:react@0.12.2/lib/warning", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react-router@0.12.4/lib/actions/LocationActions", "npm:react-router@0.12.4/lib/behaviors/ImitateBrowserBehavior", "npm:react-router@0.12.4/lib/locations/HashLocation", "npm:react-router@0.12.4/lib/locations/HistoryLocation", "npm:react-router@0.12.4/lib/locations/RefreshLocation", "npm:react-router@0.12.4/lib/locations/StaticLocation", "npm:react-router@0.12.4/lib/NavigationContext", "npm:react-router@0.12.4/lib/ScrollHistory", "npm:react-router@0.12.4/lib/StateContext", "npm:react-router@0.12.4/lib/createRoutesFromReactChildren", "npm:react-router@0.12.4/lib/isReactChildren", "npm:react-router@0.12.4/lib/Transition", "npm:react-router@0.12.4/lib/PropTypes", "npm:react-router@0.12.4/lib/Redirect", "npm:react-router@0.12.4/lib/History", "npm:react-router@0.12.4/lib/Cancellation", "npm:react-router@0.12.4/lib/Match", "npm:react-router@0.12.4/lib/Route", "npm:react-router@0.12.4/lib/supportsHistory", "npm:react-router@0.12.4/lib/PathUtils", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var React = require("npm:react@0.12.2");
    var warning = require("npm:react@0.12.2/lib/warning");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var canUseDOM = require("npm:react@0.12.2/lib/ExecutionEnvironment").canUseDOM;
    var LocationActions = require("npm:react-router@0.12.4/lib/actions/LocationActions");
    var ImitateBrowserBehavior = require("npm:react-router@0.12.4/lib/behaviors/ImitateBrowserBehavior");
    var HashLocation = require("npm:react-router@0.12.4/lib/locations/HashLocation");
    var HistoryLocation = require("npm:react-router@0.12.4/lib/locations/HistoryLocation");
    var RefreshLocation = require("npm:react-router@0.12.4/lib/locations/RefreshLocation");
    var StaticLocation = require("npm:react-router@0.12.4/lib/locations/StaticLocation");
    var NavigationContext = require("npm:react-router@0.12.4/lib/NavigationContext");
    var ScrollHistory = require("npm:react-router@0.12.4/lib/ScrollHistory");
    var StateContext = require("npm:react-router@0.12.4/lib/StateContext");
    var createRoutesFromReactChildren = require("npm:react-router@0.12.4/lib/createRoutesFromReactChildren");
    var isReactChildren = require("npm:react-router@0.12.4/lib/isReactChildren");
    var Transition = require("npm:react-router@0.12.4/lib/Transition");
    var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
    var Redirect = require("npm:react-router@0.12.4/lib/Redirect");
    var History = require("npm:react-router@0.12.4/lib/History");
    var Cancellation = require("npm:react-router@0.12.4/lib/Cancellation");
    var Match = require("npm:react-router@0.12.4/lib/Match");
    var Route = require("npm:react-router@0.12.4/lib/Route");
    var supportsHistory = require("npm:react-router@0.12.4/lib/supportsHistory");
    var PathUtils = require("npm:react-router@0.12.4/lib/PathUtils");
    var DEFAULT_LOCATION = canUseDOM ? HashLocation : "/";
    var DEFAULT_SCROLL_BEHAVIOR = canUseDOM ? ImitateBrowserBehavior : null;
    function hasProperties(object, properties) {
      for (var propertyName in properties)
        if (properties.hasOwnProperty(propertyName) && object[propertyName] !== properties[propertyName]) {
          return false;
        }
      return true;
    }
    function hasMatch(routes, route, prevParams, nextParams, prevQuery, nextQuery) {
      return routes.some(function(r) {
        if (r !== route)
          return false;
        var paramNames = route.paramNames;
        var paramName;
        for (var i = 0,
            len = paramNames.length; i < len; ++i) {
          paramName = paramNames[i];
          if (nextParams[paramName] !== prevParams[paramName])
            return false;
        }
        return hasProperties(prevQuery, nextQuery) && hasProperties(nextQuery, prevQuery);
      });
    }
    function addRoutesToNamedRoutes(routes, namedRoutes) {
      var route;
      for (var i = 0,
          len = routes.length; i < len; ++i) {
        route = routes[i];
        if (route.name) {
          invariant(namedRoutes[route.name] == null, "You may not have more than one route named \"%s\"", route.name);
          namedRoutes[route.name] = route;
        }
        if (route.childRoutes)
          addRoutesToNamedRoutes(route.childRoutes, namedRoutes);
      }
    }
    function createRouter(options) {
      options = options || {};
      if (isReactChildren(options))
        options = {routes: options};
      var mountedComponents = [];
      var location = options.location || DEFAULT_LOCATION;
      var scrollBehavior = options.scrollBehavior || DEFAULT_SCROLL_BEHAVIOR;
      var state = {};
      var nextState = {};
      var pendingTransition = null;
      var dispatchHandler = null;
      if (typeof location === "string")
        location = new StaticLocation(location);
      if (location instanceof StaticLocation) {
        warning(!canUseDOM || process.env.NODE_ENV === "test", "You should not use a static location in a DOM environment because " + "the router will not be kept in sync with the current URL");
      } else {
        invariant(canUseDOM || location.needsDOM === false, "You cannot use %s without a DOM", location);
      }
      if (location === HistoryLocation && !supportsHistory())
        location = RefreshLocation;
      var Router = React.createClass({
        displayName: "Router",
        statics: {
          isRunning: false,
          cancelPendingTransition: function cancelPendingTransition() {
            if (pendingTransition) {
              pendingTransition.cancel();
              pendingTransition = null;
            }
          },
          clearAllRoutes: function clearAllRoutes() {
            this.cancelPendingTransition();
            this.namedRoutes = {};
            this.routes = [];
          },
          addRoutes: function addRoutes(routes) {
            if (isReactChildren(routes))
              routes = createRoutesFromReactChildren(routes);
            addRoutesToNamedRoutes(routes, this.namedRoutes);
            this.routes.push.apply(this.routes, routes);
          },
          replaceRoutes: function replaceRoutes(routes) {
            this.clearAllRoutes();
            this.addRoutes(routes);
            this.refresh();
          },
          match: function match(path) {
            return Match.findMatch(this.routes, path);
          },
          makePath: function makePath(to, params, query) {
            var path;
            if (PathUtils.isAbsolute(to)) {
              path = to;
            } else {
              var route = to instanceof Route ? to : this.namedRoutes[to];
              invariant(route instanceof Route, "Cannot find a route named \"%s\"", to);
              path = route.path;
            }
            return PathUtils.withQuery(PathUtils.injectParams(path, params), query);
          },
          makeHref: function makeHref(to, params, query) {
            var path = this.makePath(to, params, query);
            return location === HashLocation ? "#" + path : path;
          },
          transitionTo: function transitionTo(to, params, query) {
            var path = this.makePath(to, params, query);
            if (pendingTransition) {
              location.replace(path);
            } else {
              location.push(path);
            }
          },
          replaceWith: function replaceWith(to, params, query) {
            location.replace(this.makePath(to, params, query));
          },
          goBack: function goBack() {
            if (History.length > 1 || location === RefreshLocation) {
              location.pop();
              return true;
            }
            warning(false, "goBack() was ignored because there is no router history");
            return false;
          },
          handleAbort: options.onAbort || function(abortReason) {
            if (location instanceof StaticLocation)
              throw new Error("Unhandled aborted transition! Reason: " + abortReason);
            if (abortReason instanceof Cancellation) {
              return ;
            } else if (abortReason instanceof Redirect) {
              location.replace(this.makePath(abortReason.to, abortReason.params, abortReason.query));
            } else {
              location.pop();
            }
          },
          handleError: options.onError || function(error) {
            throw error;
          },
          handleLocationChange: function handleLocationChange(change) {
            this.dispatch(change.path, change.type);
          },
          dispatch: function dispatch(path, action) {
            this.cancelPendingTransition();
            var prevPath = state.path;
            var isRefreshing = action == null;
            if (prevPath === path && !isRefreshing) {
              return ;
            }
            if (prevPath && action === LocationActions.PUSH)
              this.recordScrollPosition(prevPath);
            var match = this.match(path);
            warning(match != null, "No route matches path \"%s\". Make sure you have <Route path=\"%s\"> somewhere in your routes", path, path);
            if (match == null)
              match = {};
            var prevRoutes = state.routes || [];
            var prevParams = state.params || {};
            var prevQuery = state.query || {};
            var nextRoutes = match.routes || [];
            var nextParams = match.params || {};
            var nextQuery = match.query || {};
            var fromRoutes,
                toRoutes;
            if (prevRoutes.length) {
              fromRoutes = prevRoutes.filter(function(route) {
                return !hasMatch(nextRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
              });
              toRoutes = nextRoutes.filter(function(route) {
                return !hasMatch(prevRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
              });
            } else {
              fromRoutes = [];
              toRoutes = nextRoutes;
            }
            var transition = new Transition(path, this.replaceWith.bind(this, path));
            pendingTransition = transition;
            var fromComponents = mountedComponents.slice(prevRoutes.length - fromRoutes.length);
            Transition.from(transition, fromRoutes, fromComponents, function(error) {
              if (error || transition.abortReason)
                return dispatchHandler.call(Router, error, transition);
              Transition.to(transition, toRoutes, nextParams, nextQuery, function(error) {
                dispatchHandler.call(Router, error, transition, {
                  path: path,
                  action: action,
                  pathname: match.pathname,
                  routes: nextRoutes,
                  params: nextParams,
                  query: nextQuery
                });
              });
            });
          },
          run: function run(callback) {
            invariant(!this.isRunning, "Router is already running");
            dispatchHandler = function(error, transition, newState) {
              if (error)
                Router.handleError(error);
              if (pendingTransition !== transition)
                return ;
              pendingTransition = null;
              if (transition.abortReason) {
                Router.handleAbort(transition.abortReason);
              } else {
                callback.call(this, this, nextState = newState);
              }
            };
            if (!(location instanceof StaticLocation)) {
              if (location.addChangeListener)
                location.addChangeListener(Router.handleLocationChange);
              this.isRunning = true;
            }
            this.refresh();
          },
          refresh: function refresh() {
            Router.dispatch(location.getCurrentPath(), null);
          },
          stop: function stop() {
            this.cancelPendingTransition();
            if (location.removeChangeListener)
              location.removeChangeListener(Router.handleLocationChange);
            this.isRunning = false;
          },
          getScrollBehavior: function getScrollBehavior() {
            return scrollBehavior;
          }
        },
        mixins: [NavigationContext, StateContext, ScrollHistory],
        propTypes: {children: PropTypes.falsy},
        childContextTypes: {
          getRouteAtDepth: React.PropTypes.func.isRequired,
          setRouteComponentAtDepth: React.PropTypes.func.isRequired,
          routeHandlers: React.PropTypes.array.isRequired
        },
        getChildContext: function getChildContext() {
          return {
            getRouteAtDepth: this.getRouteAtDepth,
            setRouteComponentAtDepth: this.setRouteComponentAtDepth,
            routeHandlers: [this]
          };
        },
        getInitialState: function getInitialState() {
          return state = nextState;
        },
        componentWillReceiveProps: function componentWillReceiveProps() {
          this.setState(state = nextState);
        },
        componentWillUnmount: function componentWillUnmount() {
          Router.stop();
        },
        getLocation: function getLocation() {
          return location;
        },
        getRouteAtDepth: function getRouteAtDepth(depth) {
          var routes = this.state.routes;
          return routes && routes[depth];
        },
        setRouteComponentAtDepth: function setRouteComponentAtDepth(depth, component) {
          mountedComponents[depth] = component;
        },
        render: function render() {
          var route = this.getRouteAtDepth(0);
          return route ? React.createElement(route.handler, this.props) : null;
        }
      });
      Router.clearAllRoutes();
      if (options.routes)
        Router.addRoutes(options.routes);
      return Router;
    }
    module.exports = createRouter;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.1/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/traverseAllChildren", ["npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactInstanceHandles", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactInstanceHandles = require("npm:react@0.12.2/lib/ReactInstanceHandles");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var SEPARATOR = ReactInstanceHandles.SEPARATOR;
    var SUBSEPARATOR = ':';
    var userProvidedKeyEscaperLookup = {
      '=': '=0',
      '.': '=1',
      ':': '=2'
    };
    var userProvidedKeyEscapeRegex = /[=.:]/g;
    function userProvidedKeyEscaper(match) {
      return userProvidedKeyEscaperLookup[match];
    }
    function getComponentKey(component, index) {
      if (component && component.key != null) {
        return wrapUserProvidedKey(component.key);
      }
      return index.toString(36);
    }
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, userProvidedKeyEscaper);
    }
    function wrapUserProvidedKey(key) {
      return '$' + escapeUserProvidedKey(key);
    }
    var traverseAllChildrenImpl = function(children, nameSoFar, indexSoFar, callback, traverseContext) {
      var nextName,
          nextIndex;
      var subtreeCount = 0;
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          nextName = (nameSoFar + (nameSoFar ? SUBSEPARATOR : SEPARATOR) + getComponentKey(child, i));
          nextIndex = indexSoFar + subtreeCount;
          subtreeCount += traverseAllChildrenImpl(child, nextName, nextIndex, callback, traverseContext);
        }
      } else {
        var type = typeof children;
        var isOnlyChild = nameSoFar === '';
        var storageName = isOnlyChild ? SEPARATOR + getComponentKey(children, 0) : nameSoFar;
        if (children == null || type === 'boolean') {
          callback(traverseContext, null, storageName, indexSoFar);
          subtreeCount = 1;
        } else if (type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
          callback(traverseContext, children, storageName, indexSoFar);
          subtreeCount = 1;
        } else if (type === 'object') {
          ("production" !== process.env.NODE_ENV ? invariant(!children || children.nodeType !== 1, 'traverseAllChildren(...): Encountered an invalid child; DOM ' + 'elements are not valid children of React components.') : invariant(!children || children.nodeType !== 1));
          for (var key in children) {
            if (children.hasOwnProperty(key)) {
              nextName = (nameSoFar + (nameSoFar ? SUBSEPARATOR : SEPARATOR) + wrapUserProvidedKey(key) + SUBSEPARATOR + getComponentKey(children[key], 0));
              nextIndex = indexSoFar + subtreeCount;
              subtreeCount += traverseAllChildrenImpl(children[key], nextName, nextIndex, callback, traverseContext);
            }
          }
        }
      }
      return subtreeCount;
    };
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }
      return traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
    }
    module.exports = traverseAllChildren;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactMount", ["npm:react@0.12.2/lib/DOMProperty", "npm:react@0.12.2/lib/ReactBrowserEventEmitter", "npm:react@0.12.2/lib/ReactCurrentOwner", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactLegacyElement", "npm:react@0.12.2/lib/ReactInstanceHandles", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/containsNode", "npm:react@0.12.2/lib/deprecated", "npm:react@0.12.2/lib/getReactRootElementInContainer", "npm:react@0.12.2/lib/instantiateReactComponent", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/shouldUpdateReactComponent", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var DOMProperty = require("npm:react@0.12.2/lib/DOMProperty");
    var ReactBrowserEventEmitter = require("npm:react@0.12.2/lib/ReactBrowserEventEmitter");
    var ReactCurrentOwner = require("npm:react@0.12.2/lib/ReactCurrentOwner");
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactLegacyElement = require("npm:react@0.12.2/lib/ReactLegacyElement");
    var ReactInstanceHandles = require("npm:react@0.12.2/lib/ReactInstanceHandles");
    var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
    var containsNode = require("npm:react@0.12.2/lib/containsNode");
    var deprecated = require("npm:react@0.12.2/lib/deprecated");
    var getReactRootElementInContainer = require("npm:react@0.12.2/lib/getReactRootElementInContainer");
    var instantiateReactComponent = require("npm:react@0.12.2/lib/instantiateReactComponent");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var shouldUpdateReactComponent = require("npm:react@0.12.2/lib/shouldUpdateReactComponent");
    var warning = require("npm:react@0.12.2/lib/warning");
    var createElement = ReactLegacyElement.wrapCreateElement(ReactElement.createElement);
    var SEPARATOR = ReactInstanceHandles.SEPARATOR;
    var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
    var nodeCache = {};
    var ELEMENT_NODE_TYPE = 1;
    var DOC_NODE_TYPE = 9;
    var instancesByReactRootID = {};
    var containersByReactRootID = {};
    if ("production" !== process.env.NODE_ENV) {
      var rootElementsByReactRootID = {};
    }
    var findComponentRootReusableArray = [];
    function getReactRootID(container) {
      var rootElement = getReactRootElementInContainer(container);
      return rootElement && ReactMount.getID(rootElement);
    }
    function getID(node) {
      var id = internalGetID(node);
      if (id) {
        if (nodeCache.hasOwnProperty(id)) {
          var cached = nodeCache[id];
          if (cached !== node) {
            ("production" !== process.env.NODE_ENV ? invariant(!isValid(cached, id), 'ReactMount: Two valid but unequal nodes with the same `%s`: %s', ATTR_NAME, id) : invariant(!isValid(cached, id)));
            nodeCache[id] = node;
          }
        } else {
          nodeCache[id] = node;
        }
      }
      return id;
    }
    function internalGetID(node) {
      return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
    }
    function setID(node, id) {
      var oldID = internalGetID(node);
      if (oldID !== id) {
        delete nodeCache[oldID];
      }
      node.setAttribute(ATTR_NAME, id);
      nodeCache[id] = node;
    }
    function getNode(id) {
      if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
        nodeCache[id] = ReactMount.findReactNodeByID(id);
      }
      return nodeCache[id];
    }
    function isValid(node, id) {
      if (node) {
        ("production" !== process.env.NODE_ENV ? invariant(internalGetID(node) === id, 'ReactMount: Unexpected modification of `%s`', ATTR_NAME) : invariant(internalGetID(node) === id));
        var container = ReactMount.findReactContainerForID(id);
        if (container && containsNode(container, node)) {
          return true;
        }
      }
      return false;
    }
    function purgeID(id) {
      delete nodeCache[id];
    }
    var deepestNodeSoFar = null;
    function findDeepestCachedAncestorImpl(ancestorID) {
      var ancestor = nodeCache[ancestorID];
      if (ancestor && isValid(ancestor, ancestorID)) {
        deepestNodeSoFar = ancestor;
      } else {
        return false;
      }
    }
    function findDeepestCachedAncestor(targetID) {
      deepestNodeSoFar = null;
      ReactInstanceHandles.traverseAncestors(targetID, findDeepestCachedAncestorImpl);
      var foundNode = deepestNodeSoFar;
      deepestNodeSoFar = null;
      return foundNode;
    }
    var ReactMount = {
      _instancesByReactRootID: instancesByReactRootID,
      scrollMonitor: function(container, renderCallback) {
        renderCallback();
      },
      _updateRootComponent: function(prevComponent, nextComponent, container, callback) {
        var nextProps = nextComponent.props;
        ReactMount.scrollMonitor(container, function() {
          prevComponent.replaceProps(nextProps, callback);
        });
        if ("production" !== process.env.NODE_ENV) {
          rootElementsByReactRootID[getReactRootID(container)] = getReactRootElementInContainer(container);
        }
        return prevComponent;
      },
      _registerComponent: function(nextComponent, container) {
        ("production" !== process.env.NODE_ENV ? invariant(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE), '_registerComponent(...): Target container is not a DOM element.') : invariant(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)));
        ReactBrowserEventEmitter.ensureScrollValueMonitoring();
        var reactRootID = ReactMount.registerContainer(container);
        instancesByReactRootID[reactRootID] = nextComponent;
        return reactRootID;
      },
      _renderNewRootComponent: ReactPerf.measure('ReactMount', '_renderNewRootComponent', function(nextComponent, container, shouldReuseMarkup) {
        ("production" !== process.env.NODE_ENV ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate.') : null);
        var componentInstance = instantiateReactComponent(nextComponent, null);
        var reactRootID = ReactMount._registerComponent(componentInstance, container);
        componentInstance.mountComponentIntoNode(reactRootID, container, shouldReuseMarkup);
        if ("production" !== process.env.NODE_ENV) {
          rootElementsByReactRootID[reactRootID] = getReactRootElementInContainer(container);
        }
        return componentInstance;
      }),
      render: function(nextElement, container, callback) {
        ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(nextElement), 'renderComponent(): Invalid component element.%s', (typeof nextElement === 'string' ? ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.' : ReactLegacyElement.isValidFactory(nextElement) ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : typeof nextElement.props !== "undefined" ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '')) : invariant(ReactElement.isValidElement(nextElement)));
        var prevComponent = instancesByReactRootID[getReactRootID(container)];
        if (prevComponent) {
          var prevElement = prevComponent._currentElement;
          if (shouldUpdateReactComponent(prevElement, nextElement)) {
            return ReactMount._updateRootComponent(prevComponent, nextElement, container, callback);
          } else {
            ReactMount.unmountComponentAtNode(container);
          }
        }
        var reactRootElement = getReactRootElementInContainer(container);
        var containerHasReactMarkup = reactRootElement && ReactMount.isRenderedByReact(reactRootElement);
        var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;
        var component = ReactMount._renderNewRootComponent(nextElement, container, shouldReuseMarkup);
        callback && callback.call(component);
        return component;
      },
      constructAndRenderComponent: function(constructor, props, container) {
        var element = createElement(constructor, props);
        return ReactMount.render(element, container);
      },
      constructAndRenderComponentByID: function(constructor, props, id) {
        var domNode = document.getElementById(id);
        ("production" !== process.env.NODE_ENV ? invariant(domNode, 'Tried to get element with id of "%s" but it is not present on the page.', id) : invariant(domNode));
        return ReactMount.constructAndRenderComponent(constructor, props, domNode);
      },
      registerContainer: function(container) {
        var reactRootID = getReactRootID(container);
        if (reactRootID) {
          reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
        }
        if (!reactRootID) {
          reactRootID = ReactInstanceHandles.createReactRootID();
        }
        containersByReactRootID[reactRootID] = container;
        return reactRootID;
      },
      unmountComponentAtNode: function(container) {
        ("production" !== process.env.NODE_ENV ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function of ' + 'props and state; triggering nested component updates from render is ' + 'not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate.') : null);
        var reactRootID = getReactRootID(container);
        var component = instancesByReactRootID[reactRootID];
        if (!component) {
          return false;
        }
        ReactMount.unmountComponentFromNode(component, container);
        delete instancesByReactRootID[reactRootID];
        delete containersByReactRootID[reactRootID];
        if ("production" !== process.env.NODE_ENV) {
          delete rootElementsByReactRootID[reactRootID];
        }
        return true;
      },
      unmountComponentFromNode: function(instance, container) {
        instance.unmountComponent();
        if (container.nodeType === DOC_NODE_TYPE) {
          container = container.documentElement;
        }
        while (container.lastChild) {
          container.removeChild(container.lastChild);
        }
      },
      findReactContainerForID: function(id) {
        var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
        var container = containersByReactRootID[reactRootID];
        if ("production" !== process.env.NODE_ENV) {
          var rootElement = rootElementsByReactRootID[reactRootID];
          if (rootElement && rootElement.parentNode !== container) {
            ("production" !== process.env.NODE_ENV ? invariant(internalGetID(rootElement) === reactRootID, 'ReactMount: Root element ID differed from reactRootID.') : invariant(internalGetID(rootElement) === reactRootID));
            var containerChild = container.firstChild;
            if (containerChild && reactRootID === internalGetID(containerChild)) {
              rootElementsByReactRootID[reactRootID] = containerChild;
            } else {
              console.warn('ReactMount: Root element has been removed from its original ' + 'container. New container:', rootElement.parentNode);
            }
          }
        }
        return container;
      },
      findReactNodeByID: function(id) {
        var reactRoot = ReactMount.findReactContainerForID(id);
        return ReactMount.findComponentRoot(reactRoot, id);
      },
      isRenderedByReact: function(node) {
        if (node.nodeType !== 1) {
          return false;
        }
        var id = ReactMount.getID(node);
        return id ? id.charAt(0) === SEPARATOR : false;
      },
      getFirstReactDOM: function(node) {
        var current = node;
        while (current && current.parentNode !== current) {
          if (ReactMount.isRenderedByReact(current)) {
            return current;
          }
          current = current.parentNode;
        }
        return null;
      },
      findComponentRoot: function(ancestorNode, targetID) {
        var firstChildren = findComponentRootReusableArray;
        var childIndex = 0;
        var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;
        firstChildren[0] = deepestAncestor.firstChild;
        firstChildren.length = 1;
        while (childIndex < firstChildren.length) {
          var child = firstChildren[childIndex++];
          var targetChild;
          while (child) {
            var childID = ReactMount.getID(child);
            if (childID) {
              if (targetID === childID) {
                targetChild = child;
              } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
                firstChildren.length = childIndex = 0;
                firstChildren.push(child.firstChild);
              }
            } else {
              firstChildren.push(child.firstChild);
            }
            child = child.nextSibling;
          }
          if (targetChild) {
            firstChildren.length = 0;
            return targetChild;
          }
        }
        firstChildren.length = 0;
        ("production" !== process.env.NODE_ENV ? invariant(false, 'findComponentRoot(..., %s): Unable to find element. This probably ' + 'means the DOM was unexpectedly mutated (e.g., by the browser), ' + 'usually due to forgetting a <tbody> when using tables, nesting tags ' + 'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' + 'parent. ' + 'Try inspecting the child nodes of the element with React ID `%s`.', targetID, ReactMount.getID(ancestorNode)) : invariant(false));
      },
      getReactRootID: getReactRootID,
      getID: getID,
      setID: setID,
      getNode: getNode,
      purgeID: purgeID
    };
    ReactMount.renderComponent = deprecated('ReactMount', 'renderComponent', 'render', this, ReactMount.render);
    module.exports = ReactMount;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/BeforeInputEventPlugin", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPropagators", "npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/SyntheticInputEvent", "npm:react@0.12.2/lib/keyOf"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
  var EventPropagators = require("npm:react@0.12.2/lib/EventPropagators");
  var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
  var SyntheticInputEvent = require("npm:react@0.12.2/lib/SyntheticInputEvent");
  var keyOf = require("npm:react@0.12.2/lib/keyOf");
  var canUseTextInputEvent = (ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !('documentMode' in document || isPresto()));
  function isPresto() {
    var opera = window.opera;
    return (typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12);
  }
  var SPACEBAR_CODE = 32;
  var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {beforeInput: {
      phasedRegistrationNames: {
        bubbled: keyOf({onBeforeInput: null}),
        captured: keyOf({onBeforeInputCapture: null})
      },
      dependencies: [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
    }};
  var fallbackChars = null;
  var hasSpaceKeypress = false;
  function isKeypressCommand(nativeEvent) {
    return ((nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey));
  }
  var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      var chars;
      if (canUseTextInputEvent) {
        switch (topLevelType) {
          case topLevelTypes.topKeyPress:
            var which = nativeEvent.which;
            if (which !== SPACEBAR_CODE) {
              return ;
            }
            hasSpaceKeypress = true;
            chars = SPACEBAR_CHAR;
            break;
          case topLevelTypes.topTextInput:
            chars = nativeEvent.data;
            if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
              return ;
            }
            break;
          default:
            return ;
        }
      } else {
        switch (topLevelType) {
          case topLevelTypes.topPaste:
            fallbackChars = null;
            break;
          case topLevelTypes.topKeyPress:
            if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
              fallbackChars = String.fromCharCode(nativeEvent.which);
            }
            break;
          case topLevelTypes.topCompositionEnd:
            fallbackChars = nativeEvent.data;
            break;
        }
        if (fallbackChars === null) {
          return ;
        }
        chars = fallbackChars;
      }
      if (!chars) {
        return ;
      }
      var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, topLevelTargetID, nativeEvent);
      event.data = chars;
      fallbackChars = null;
      EventPropagators.accumulateTwoPhaseDispatches(event);
      return event;
    }
  };
  module.exports = BeforeInputEventPlugin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/CompositionEventPlugin", ["npm:react@0.12.2/lib/EventConstants", "npm:react@0.12.2/lib/EventPropagators", "npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/ReactInputSelection", "npm:react@0.12.2/lib/SyntheticCompositionEvent", "npm:react@0.12.2/lib/getTextContentAccessor", "npm:react@0.12.2/lib/keyOf"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var EventConstants = require("npm:react@0.12.2/lib/EventConstants");
  var EventPropagators = require("npm:react@0.12.2/lib/EventPropagators");
  var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
  var ReactInputSelection = require("npm:react@0.12.2/lib/ReactInputSelection");
  var SyntheticCompositionEvent = require("npm:react@0.12.2/lib/SyntheticCompositionEvent");
  var getTextContentAccessor = require("npm:react@0.12.2/lib/getTextContentAccessor");
  var keyOf = require("npm:react@0.12.2/lib/keyOf");
  var END_KEYCODES = [9, 13, 27, 32];
  var START_KEYCODE = 229;
  var useCompositionEvent = (ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window);
  var useFallbackData = (!useCompositionEvent || ('documentMode' in document && document.documentMode > 8 && document.documentMode <= 11));
  var topLevelTypes = EventConstants.topLevelTypes;
  var currentComposition = null;
  var eventTypes = {
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionEnd: null}),
        captured: keyOf({onCompositionEndCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionStart: null}),
        captured: keyOf({onCompositionStartCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionUpdate: null}),
        captured: keyOf({onCompositionUpdateCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    }
  };
  function getCompositionEventType(topLevelType) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionStart:
        return eventTypes.compositionStart;
      case topLevelTypes.topCompositionEnd:
        return eventTypes.compositionEnd;
      case topLevelTypes.topCompositionUpdate:
        return eventTypes.compositionUpdate;
    }
  }
  function isFallbackStart(topLevelType, nativeEvent) {
    return (topLevelType === topLevelTypes.topKeyDown && nativeEvent.keyCode === START_KEYCODE);
  }
  function isFallbackEnd(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topKeyUp:
        return (END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1);
      case topLevelTypes.topKeyDown:
        return (nativeEvent.keyCode !== START_KEYCODE);
      case topLevelTypes.topKeyPress:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topBlur:
        return true;
      default:
        return false;
    }
  }
  function FallbackCompositionState(root) {
    this.root = root;
    this.startSelection = ReactInputSelection.getSelection(root);
    this.startValue = this.getText();
  }
  FallbackCompositionState.prototype.getText = function() {
    return this.root.value || this.root[getTextContentAccessor()];
  };
  FallbackCompositionState.prototype.getData = function() {
    var endValue = this.getText();
    var prefixLength = this.startSelection.start;
    var suffixLength = this.startValue.length - this.startSelection.end;
    return endValue.substr(prefixLength, endValue.length - suffixLength - prefixLength);
  };
  var CompositionEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      var eventType;
      var data;
      if (useCompositionEvent) {
        eventType = getCompositionEventType(topLevelType);
      } else if (!currentComposition) {
        if (isFallbackStart(topLevelType, nativeEvent)) {
          eventType = eventTypes.compositionStart;
        }
      } else if (isFallbackEnd(topLevelType, nativeEvent)) {
        eventType = eventTypes.compositionEnd;
      }
      if (useFallbackData) {
        if (!currentComposition && eventType === eventTypes.compositionStart) {
          currentComposition = new FallbackCompositionState(topLevelTarget);
        } else if (eventType === eventTypes.compositionEnd) {
          if (currentComposition) {
            data = currentComposition.getData();
            currentComposition = null;
          }
        }
      }
      if (eventType) {
        var event = SyntheticCompositionEvent.getPooled(eventType, topLevelTargetID, nativeEvent);
        if (data) {
          event.data = data;
        }
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      }
    }
  };
  module.exports = CompositionEventPlugin;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/Danger", ["npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/createNodesFromMarkup", "npm:react@0.12.2/lib/emptyFunction", "npm:react@0.12.2/lib/getMarkupWrap", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
    var createNodesFromMarkup = require("npm:react@0.12.2/lib/createNodesFromMarkup");
    var emptyFunction = require("npm:react@0.12.2/lib/emptyFunction");
    var getMarkupWrap = require("npm:react@0.12.2/lib/getMarkupWrap");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
    var RESULT_INDEX_ATTR = 'data-danger-index';
    function getNodeName(markup) {
      return markup.substring(1, markup.indexOf(' '));
    }
    var Danger = {
      dangerouslyRenderMarkup: function(markupList) {
        ("production" !== process.env.NODE_ENV ? invariant(ExecutionEnvironment.canUseDOM, 'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' + 'thread. Make sure `window` and `document` are available globally ' + 'before requiring React when unit testing or use ' + 'React.renderToString for server rendering.') : invariant(ExecutionEnvironment.canUseDOM));
        var nodeName;
        var markupByNodeName = {};
        for (var i = 0; i < markupList.length; i++) {
          ("production" !== process.env.NODE_ENV ? invariant(markupList[i], 'dangerouslyRenderMarkup(...): Missing markup.') : invariant(markupList[i]));
          nodeName = getNodeName(markupList[i]);
          nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
          markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
          markupByNodeName[nodeName][i] = markupList[i];
        }
        var resultList = [];
        var resultListAssignmentCount = 0;
        for (nodeName in markupByNodeName) {
          if (!markupByNodeName.hasOwnProperty(nodeName)) {
            continue;
          }
          var markupListByNodeName = markupByNodeName[nodeName];
          for (var resultIndex in markupListByNodeName) {
            if (markupListByNodeName.hasOwnProperty(resultIndex)) {
              var markup = markupListByNodeName[resultIndex];
              markupListByNodeName[resultIndex] = markup.replace(OPEN_TAG_NAME_EXP, '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" ');
            }
          }
          var renderNodes = createNodesFromMarkup(markupListByNodeName.join(''), emptyFunction);
          for (i = 0; i < renderNodes.length; ++i) {
            var renderNode = renderNodes[i];
            if (renderNode.hasAttribute && renderNode.hasAttribute(RESULT_INDEX_ATTR)) {
              resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
              renderNode.removeAttribute(RESULT_INDEX_ATTR);
              ("production" !== process.env.NODE_ENV ? invariant(!resultList.hasOwnProperty(resultIndex), 'Danger: Assigning to an already-occupied result index.') : invariant(!resultList.hasOwnProperty(resultIndex)));
              resultList[resultIndex] = renderNode;
              resultListAssignmentCount += 1;
            } else if ("production" !== process.env.NODE_ENV) {
              console.error("Danger: Discarding unexpected node:", renderNode);
            }
          }
        }
        ("production" !== process.env.NODE_ENV ? invariant(resultListAssignmentCount === resultList.length, 'Danger: Did not assign to every index of resultList.') : invariant(resultListAssignmentCount === resultList.length));
        ("production" !== process.env.NODE_ENV ? invariant(resultList.length === markupList.length, 'Danger: Expected markup to render %s nodes, but rendered %s.', markupList.length, resultList.length) : invariant(resultList.length === markupList.length));
        return resultList;
      },
      dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
        ("production" !== process.env.NODE_ENV ? invariant(ExecutionEnvironment.canUseDOM, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' + 'worker thread. Make sure `window` and `document` are available ' + 'globally before requiring React when unit testing or use ' + 'React.renderToString for server rendering.') : invariant(ExecutionEnvironment.canUseDOM));
        ("production" !== process.env.NODE_ENV ? invariant(markup, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(markup));
        ("production" !== process.env.NODE_ENV ? invariant(oldChild.tagName.toLowerCase() !== 'html', 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' + '<html> node. This is because browser quirks make this unreliable ' + 'and/or slow. If you want to render to the root you must use ' + 'server rendering. See renderComponentToString().') : invariant(oldChild.tagName.toLowerCase() !== 'html'));
        var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
        oldChild.parentNode.replaceChild(newChild, oldChild);
      }
    };
    module.exports = Danger;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactWithAddons", ["npm:react@0.12.2/lib/LinkedStateMixin", "npm:react@0.12.2/lib/React", "npm:react@0.12.2/lib/ReactComponentWithPureRenderMixin", "npm:react@0.12.2/lib/ReactCSSTransitionGroup", "npm:react@0.12.2/lib/ReactTransitionGroup", "npm:react@0.12.2/lib/ReactUpdates", "npm:react@0.12.2/lib/cx", "npm:react@0.12.2/lib/cloneWithProps", "npm:react@0.12.2/lib/update", "npm:react@0.12.2/lib/ReactDefaultPerf", "npm:react@0.12.2/lib/ReactTestUtils", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var LinkedStateMixin = require("npm:react@0.12.2/lib/LinkedStateMixin");
    var React = require("npm:react@0.12.2/lib/React");
    var ReactComponentWithPureRenderMixin = require("npm:react@0.12.2/lib/ReactComponentWithPureRenderMixin");
    var ReactCSSTransitionGroup = require("npm:react@0.12.2/lib/ReactCSSTransitionGroup");
    var ReactTransitionGroup = require("npm:react@0.12.2/lib/ReactTransitionGroup");
    var ReactUpdates = require("npm:react@0.12.2/lib/ReactUpdates");
    var cx = require("npm:react@0.12.2/lib/cx");
    var cloneWithProps = require("npm:react@0.12.2/lib/cloneWithProps");
    var update = require("npm:react@0.12.2/lib/update");
    React.addons = {
      CSSTransitionGroup: ReactCSSTransitionGroup,
      LinkedStateMixin: LinkedStateMixin,
      PureRenderMixin: ReactComponentWithPureRenderMixin,
      TransitionGroup: ReactTransitionGroup,
      batchedUpdates: ReactUpdates.batchedUpdates,
      classSet: cx,
      cloneWithProps: cloneWithProps,
      update: update
    };
    if ("production" !== process.env.NODE_ENV) {
      React.addons.Perf = require("npm:react@0.12.2/lib/ReactDefaultPerf");
      React.addons.TestUtils = require("npm:react@0.12.2/lib/ReactTestUtils");
    }
    module.exports = React;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:qs@2.3.3", ["npm:qs@2.3.3/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:qs@2.3.3/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/invariant", ["github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = function(condition, format, a, b, c, d, e, f) {
      if ("production" !== process.env.NODE_ENV) {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error('Invariant Violation: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactChildren", ["npm:react@0.12.2/lib/PooledClass", "npm:react@0.12.2/lib/traverseAllChildren", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var PooledClass = require("npm:react@0.12.2/lib/PooledClass");
    var traverseAllChildren = require("npm:react@0.12.2/lib/traverseAllChildren");
    var warning = require("npm:react@0.12.2/lib/warning");
    var twoArgumentPooler = PooledClass.twoArgumentPooler;
    var threeArgumentPooler = PooledClass.threeArgumentPooler;
    function ForEachBookKeeping(forEachFunction, forEachContext) {
      this.forEachFunction = forEachFunction;
      this.forEachContext = forEachContext;
    }
    PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
    function forEachSingleChild(traverseContext, child, name, i) {
      var forEachBookKeeping = traverseContext;
      forEachBookKeeping.forEachFunction.call(forEachBookKeeping.forEachContext, child, i);
    }
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      ForEachBookKeeping.release(traverseContext);
    }
    function MapBookKeeping(mapResult, mapFunction, mapContext) {
      this.mapResult = mapResult;
      this.mapFunction = mapFunction;
      this.mapContext = mapContext;
    }
    PooledClass.addPoolingTo(MapBookKeeping, threeArgumentPooler);
    function mapSingleChildIntoContext(traverseContext, child, name, i) {
      var mapBookKeeping = traverseContext;
      var mapResult = mapBookKeeping.mapResult;
      var keyUnique = !mapResult.hasOwnProperty(name);
      ("production" !== process.env.NODE_ENV ? warning(keyUnique, 'ReactChildren.map(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : null);
      if (keyUnique) {
        var mappedChild = mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext, child, i);
        mapResult[name] = mappedChild;
      }
    }
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var mapResult = {};
      var traverseContext = MapBookKeeping.getPooled(mapResult, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      MapBookKeeping.release(traverseContext);
      return mapResult;
    }
    function forEachSingleChildDummy(traverseContext, child, name, i) {
      return null;
    }
    function countChildren(children, context) {
      return traverseAllChildren(children, forEachSingleChildDummy, null);
    }
    var ReactChildren = {
      forEach: forEachChildren,
      map: mapChildren,
      count: countChildren
    };
    module.exports = ReactChildren;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactBrowserComponentMixin", ["npm:react@0.12.2/lib/ReactEmptyComponent", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactEmptyComponent = require("npm:react@0.12.2/lib/ReactEmptyComponent");
    var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var ReactBrowserComponentMixin = {getDOMNode: function() {
        ("production" !== process.env.NODE_ENV ? invariant(this.isMounted(), 'getDOMNode(): A component must be mounted to have a DOM node.') : invariant(this.isMounted()));
        if (ReactEmptyComponent.isNullComponentID(this._rootNodeID)) {
          return null;
        }
        return ReactMount.getNode(this._rootNodeID);
      }};
    module.exports = ReactBrowserComponentMixin;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/DOMChildrenOperations", ["npm:react@0.12.2/lib/Danger", "npm:react@0.12.2/lib/ReactMultiChildUpdateTypes", "npm:react@0.12.2/lib/getTextContentAccessor", "npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var Danger = require("npm:react@0.12.2/lib/Danger");
    var ReactMultiChildUpdateTypes = require("npm:react@0.12.2/lib/ReactMultiChildUpdateTypes");
    var getTextContentAccessor = require("npm:react@0.12.2/lib/getTextContentAccessor");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var textContentAccessor = getTextContentAccessor();
    function insertChildAt(parentNode, childNode, index) {
      parentNode.insertBefore(childNode, parentNode.childNodes[index] || null);
    }
    var updateTextContent;
    if (textContentAccessor === 'textContent') {
      updateTextContent = function(node, text) {
        node.textContent = text;
      };
    } else {
      updateTextContent = function(node, text) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        if (text) {
          var doc = node.ownerDocument || document;
          node.appendChild(doc.createTextNode(text));
        }
      };
    }
    var DOMChildrenOperations = {
      dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,
      updateTextContent: updateTextContent,
      processUpdates: function(updates, markupList) {
        var update;
        var initialChildren = null;
        var updatedChildren = null;
        for (var i = 0; update = updates[i]; i++) {
          if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING || update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
            var updatedIndex = update.fromIndex;
            var updatedChild = update.parentNode.childNodes[updatedIndex];
            var parentID = update.parentID;
            ("production" !== process.env.NODE_ENV ? invariant(updatedChild, 'processUpdates(): Unable to find child %s of element. This ' + 'probably means the DOM was unexpectedly mutated (e.g., by the ' + 'browser), usually due to forgetting a <tbody> when using tables, ' + 'nesting tags like <form>, <p>, or <a>, or using non-SVG elements ' + 'in an <svg> parent. Try inspecting the child nodes of the element ' + 'with React ID `%s`.', updatedIndex, parentID) : invariant(updatedChild));
            initialChildren = initialChildren || {};
            initialChildren[parentID] = initialChildren[parentID] || [];
            initialChildren[parentID][updatedIndex] = updatedChild;
            updatedChildren = updatedChildren || [];
            updatedChildren.push(updatedChild);
          }
        }
        var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
        if (updatedChildren) {
          for (var j = 0; j < updatedChildren.length; j++) {
            updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
          }
        }
        for (var k = 0; update = updates[k]; k++) {
          switch (update.type) {
            case ReactMultiChildUpdateTypes.INSERT_MARKUP:
              insertChildAt(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
              break;
            case ReactMultiChildUpdateTypes.MOVE_EXISTING:
              insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
              break;
            case ReactMultiChildUpdateTypes.TEXT_CONTENT:
              updateTextContent(update.parentNode, update.textContent);
              break;
            case ReactMultiChildUpdateTypes.REMOVE_NODE:
              break;
          }
        }
      }
    };
    module.exports = DOMChildrenOperations;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/addons", ["npm:react@0.12.2/lib/ReactWithAddons"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:react@0.12.2/lib/ReactWithAddons");
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/PathUtils", ["npm:react@0.12.2/lib/invariant", "npm:qs@2.3.3/lib/utils", "npm:qs@2.3.3"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var invariant = require("npm:react@0.12.2/lib/invariant");
  var merge = require("npm:qs@2.3.3/lib/utils").merge;
  var qs = require("npm:qs@2.3.3");
  var paramCompileMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|[*.()\[\]\\+|{}^$]/g;
  var paramInjectMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$?]*[?]?)|[*]/g;
  var paramInjectTrailingSlashMatcher = /\/\/\?|\/\?\/|\/\?/g;
  var queryMatcher = /\?(.+)/;
  var _compiledPatterns = {};
  function compilePattern(pattern) {
    if (!(pattern in _compiledPatterns)) {
      var paramNames = [];
      var source = pattern.replace(paramCompileMatcher, function(match, paramName) {
        if (paramName) {
          paramNames.push(paramName);
          return "([^/?#]+)";
        } else if (match === "*") {
          paramNames.push("splat");
          return "(.*?)";
        } else {
          return "\\" + match;
        }
      });
      _compiledPatterns[pattern] = {
        matcher: new RegExp("^" + source + "$", "i"),
        paramNames: paramNames
      };
    }
    return _compiledPatterns[pattern];
  }
  var PathUtils = {
    isAbsolute: function isAbsolute(path) {
      return path.charAt(0) === "/";
    },
    join: function join(a, b) {
      return a.replace(/\/*$/, "/") + b;
    },
    extractParamNames: function extractParamNames(pattern) {
      return compilePattern(pattern).paramNames;
    },
    extractParams: function extractParams(pattern, path) {
      var _compilePattern = compilePattern(pattern);
      var matcher = _compilePattern.matcher;
      var paramNames = _compilePattern.paramNames;
      var match = path.match(matcher);
      if (!match) {
        return null;
      }
      var params = {};
      paramNames.forEach(function(paramName, index) {
        params[paramName] = match[index + 1];
      });
      return params;
    },
    injectParams: function injectParams(pattern, params) {
      params = params || {};
      var splatIndex = 0;
      return pattern.replace(paramInjectMatcher, function(match, paramName) {
        paramName = paramName || "splat";
        if (paramName.slice(-1) === "?") {
          paramName = paramName.slice(0, -1);
          if (params[paramName] == null)
            return "";
        } else {
          invariant(params[paramName] != null, "Missing \"%s\" parameter for path \"%s\"", paramName, pattern);
        }
        var segment;
        if (paramName === "splat" && Array.isArray(params[paramName])) {
          segment = params[paramName][splatIndex++];
          invariant(segment != null, "Missing splat # %s for path \"%s\"", splatIndex, pattern);
        } else {
          segment = params[paramName];
        }
        return segment;
      }).replace(paramInjectTrailingSlashMatcher, "/");
    },
    extractQuery: function extractQuery(path) {
      var match = path.match(queryMatcher);
      return match && qs.parse(match[1]);
    },
    withoutQuery: function withoutQuery(path) {
      return path.replace(queryMatcher, "");
    },
    withQuery: function withQuery(path, query) {
      var existingQuery = PathUtils.extractQuery(path);
      if (existingQuery)
        query = query ? merge(existingQuery, query) : existingQuery;
      var queryString = qs.stringify(query, {indices: false});
      if (queryString) {
        return PathUtils.withoutQuery(path) + "?" + queryString;
      }
      return path;
    }
  };
  module.exports = PathUtils;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/DOMProperty", ["npm:react@0.12.2/lib/invariant", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = require("npm:react@0.12.2/lib/invariant");
    function checkMask(value, bitmask) {
      return (value & bitmask) === bitmask;
    }
    var DOMPropertyInjection = {
      MUST_USE_ATTRIBUTE: 0x1,
      MUST_USE_PROPERTY: 0x2,
      HAS_SIDE_EFFECTS: 0x4,
      HAS_BOOLEAN_VALUE: 0x8,
      HAS_NUMERIC_VALUE: 0x10,
      HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
      HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,
      injectDOMPropertyConfig: function(domPropertyConfig) {
        var Properties = domPropertyConfig.Properties || {};
        var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
        var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
        var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};
        if (domPropertyConfig.isCustomAttribute) {
          DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
        }
        for (var propName in Properties) {
          ("production" !== process.env.NODE_ENV ? invariant(!DOMProperty.isStandardName.hasOwnProperty(propName), 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' + '\'%s\' which has already been injected. You may be accidentally ' + 'injecting the same DOM property config twice, or you may be ' + 'injecting two configs that have conflicting property names.', propName) : invariant(!DOMProperty.isStandardName.hasOwnProperty(propName)));
          DOMProperty.isStandardName[propName] = true;
          var lowerCased = propName.toLowerCase();
          DOMProperty.getPossibleStandardName[lowerCased] = propName;
          if (DOMAttributeNames.hasOwnProperty(propName)) {
            var attributeName = DOMAttributeNames[propName];
            DOMProperty.getPossibleStandardName[attributeName] = propName;
            DOMProperty.getAttributeName[propName] = attributeName;
          } else {
            DOMProperty.getAttributeName[propName] = lowerCased;
          }
          DOMProperty.getPropertyName[propName] = DOMPropertyNames.hasOwnProperty(propName) ? DOMPropertyNames[propName] : propName;
          if (DOMMutationMethods.hasOwnProperty(propName)) {
            DOMProperty.getMutationMethod[propName] = DOMMutationMethods[propName];
          } else {
            DOMProperty.getMutationMethod[propName] = null;
          }
          var propConfig = Properties[propName];
          DOMProperty.mustUseAttribute[propName] = checkMask(propConfig, DOMPropertyInjection.MUST_USE_ATTRIBUTE);
          DOMProperty.mustUseProperty[propName] = checkMask(propConfig, DOMPropertyInjection.MUST_USE_PROPERTY);
          DOMProperty.hasSideEffects[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_SIDE_EFFECTS);
          DOMProperty.hasBooleanValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_BOOLEAN_VALUE);
          DOMProperty.hasNumericValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_NUMERIC_VALUE);
          DOMProperty.hasPositiveNumericValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE);
          DOMProperty.hasOverloadedBooleanValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE);
          ("production" !== process.env.NODE_ENV ? invariant(!DOMProperty.mustUseAttribute[propName] || !DOMProperty.mustUseProperty[propName], 'DOMProperty: Cannot require using both attribute and property: %s', propName) : invariant(!DOMProperty.mustUseAttribute[propName] || !DOMProperty.mustUseProperty[propName]));
          ("production" !== process.env.NODE_ENV ? invariant(DOMProperty.mustUseProperty[propName] || !DOMProperty.hasSideEffects[propName], 'DOMProperty: Properties that have side effects must use property: %s', propName) : invariant(DOMProperty.mustUseProperty[propName] || !DOMProperty.hasSideEffects[propName]));
          ("production" !== process.env.NODE_ENV ? invariant(!!DOMProperty.hasBooleanValue[propName] + !!DOMProperty.hasNumericValue[propName] + !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1, 'DOMProperty: Value can be one of boolean, overloaded boolean, or ' + 'numeric value, but not a combination: %s', propName) : invariant(!!DOMProperty.hasBooleanValue[propName] + !!DOMProperty.hasNumericValue[propName] + !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1));
        }
      }
    };
    var defaultValueCache = {};
    var DOMProperty = {
      ID_ATTRIBUTE_NAME: 'data-reactid',
      isStandardName: {},
      getPossibleStandardName: {},
      getAttributeName: {},
      getPropertyName: {},
      getMutationMethod: {},
      mustUseAttribute: {},
      mustUseProperty: {},
      hasSideEffects: {},
      hasBooleanValue: {},
      hasNumericValue: {},
      hasPositiveNumericValue: {},
      hasOverloadedBooleanValue: {},
      _isCustomAttributeFunctions: [],
      isCustomAttribute: function(attributeName) {
        for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
          var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
          if (isCustomAttributeFn(attributeName)) {
            return true;
          }
        }
        return false;
      },
      getDefaultValueForProperty: function(nodeName, prop) {
        var nodeDefaults = defaultValueCache[nodeName];
        var testElement;
        if (!nodeDefaults) {
          defaultValueCache[nodeName] = nodeDefaults = {};
        }
        if (!(prop in nodeDefaults)) {
          testElement = document.createElement(nodeName);
          nodeDefaults[prop] = testElement[prop];
        }
        return nodeDefaults[prop];
      },
      injection: DOMPropertyInjection
    };
    module.exports = DOMProperty;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMComponent", ["npm:react@0.12.2/lib/CSSPropertyOperations", "npm:react@0.12.2/lib/DOMProperty", "npm:react@0.12.2/lib/DOMPropertyOperations", "npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactComponent", "npm:react@0.12.2/lib/ReactBrowserEventEmitter", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/ReactMultiChild", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/escapeTextForBrowser", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/isEventSupported", "npm:react@0.12.2/lib/keyOf", "npm:react@0.12.2/lib/monitorCodeUse", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var CSSPropertyOperations = require("npm:react@0.12.2/lib/CSSPropertyOperations");
    var DOMProperty = require("npm:react@0.12.2/lib/DOMProperty");
    var DOMPropertyOperations = require("npm:react@0.12.2/lib/DOMPropertyOperations");
    var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
    var ReactComponent = require("npm:react@0.12.2/lib/ReactComponent");
    var ReactBrowserEventEmitter = require("npm:react@0.12.2/lib/ReactBrowserEventEmitter");
    var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
    var ReactMultiChild = require("npm:react@0.12.2/lib/ReactMultiChild");
    var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var escapeTextForBrowser = require("npm:react@0.12.2/lib/escapeTextForBrowser");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var isEventSupported = require("npm:react@0.12.2/lib/isEventSupported");
    var keyOf = require("npm:react@0.12.2/lib/keyOf");
    var monitorCodeUse = require("npm:react@0.12.2/lib/monitorCodeUse");
    var deleteListener = ReactBrowserEventEmitter.deleteListener;
    var listenTo = ReactBrowserEventEmitter.listenTo;
    var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;
    var CONTENT_TYPES = {
      'string': true,
      'number': true
    };
    var STYLE = keyOf({style: null});
    var ELEMENT_NODE_TYPE = 1;
    function assertValidProps(props) {
      if (!props) {
        return ;
      }
      ("production" !== process.env.NODE_ENV ? invariant(props.children == null || props.dangerouslySetInnerHTML == null, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : invariant(props.children == null || props.dangerouslySetInnerHTML == null));
      if ("production" !== process.env.NODE_ENV) {
        if (props.contentEditable && props.children != null) {
          console.warn('A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of those ' + 'nodes are unexpectedly modified or duplicated. This is probably not ' + 'intentional.');
        }
      }
      ("production" !== process.env.NODE_ENV ? invariant(props.style == null || typeof props.style === 'object', 'The `style` prop expects a mapping from style properties to values, ' + 'not a string.') : invariant(props.style == null || typeof props.style === 'object'));
    }
    function putListener(id, registrationName, listener, transaction) {
      if ("production" !== process.env.NODE_ENV) {
        if (registrationName === 'onScroll' && !isEventSupported('scroll', true)) {
          monitorCodeUse('react_no_scroll_event');
          console.warn('This browser doesn\'t support the `onScroll` event');
        }
      }
      var container = ReactMount.findReactContainerForID(id);
      if (container) {
        var doc = container.nodeType === ELEMENT_NODE_TYPE ? container.ownerDocument : container;
        listenTo(registrationName, doc);
      }
      transaction.getPutListenerQueue().enqueuePutListener(id, registrationName, listener);
    }
    var omittedCloseTags = {
      'area': true,
      'base': true,
      'br': true,
      'col': true,
      'embed': true,
      'hr': true,
      'img': true,
      'input': true,
      'keygen': true,
      'link': true,
      'meta': true,
      'param': true,
      'source': true,
      'track': true,
      'wbr': true
    };
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = {};
    var hasOwnProperty = {}.hasOwnProperty;
    function validateDangerousTag(tag) {
      if (!hasOwnProperty.call(validatedTagCache, tag)) {
        ("production" !== process.env.NODE_ENV ? invariant(VALID_TAG_REGEX.test(tag), 'Invalid tag: %s', tag) : invariant(VALID_TAG_REGEX.test(tag)));
        validatedTagCache[tag] = true;
      }
    }
    function ReactDOMComponent(tag) {
      validateDangerousTag(tag);
      this._tag = tag;
      this.tagName = tag.toUpperCase();
    }
    ReactDOMComponent.displayName = 'ReactDOMComponent';
    ReactDOMComponent.Mixin = {
      mountComponent: ReactPerf.measure('ReactDOMComponent', 'mountComponent', function(rootID, transaction, mountDepth) {
        ReactComponent.Mixin.mountComponent.call(this, rootID, transaction, mountDepth);
        assertValidProps(this.props);
        var closeTag = omittedCloseTags[this._tag] ? '' : '</' + this._tag + '>';
        return (this._createOpenTagMarkupAndPutListeners(transaction) + this._createContentMarkup(transaction) + closeTag);
      }),
      _createOpenTagMarkupAndPutListeners: function(transaction) {
        var props = this.props;
        var ret = '<' + this._tag;
        for (var propKey in props) {
          if (!props.hasOwnProperty(propKey)) {
            continue;
          }
          var propValue = props[propKey];
          if (propValue == null) {
            continue;
          }
          if (registrationNameModules.hasOwnProperty(propKey)) {
            putListener(this._rootNodeID, propKey, propValue, transaction);
          } else {
            if (propKey === STYLE) {
              if (propValue) {
                propValue = props.style = assign({}, props.style);
              }
              propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
            }
            var markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
            if (markup) {
              ret += ' ' + markup;
            }
          }
        }
        if (transaction.renderToStaticMarkup) {
          return ret + '>';
        }
        var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
        return ret + ' ' + markupForID + '>';
      },
      _createContentMarkup: function(transaction) {
        var innerHTML = this.props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
          if (innerHTML.__html != null) {
            return innerHTML.__html;
          }
        } else {
          var contentToUse = CONTENT_TYPES[typeof this.props.children] ? this.props.children : null;
          var childrenToUse = contentToUse != null ? null : this.props.children;
          if (contentToUse != null) {
            return escapeTextForBrowser(contentToUse);
          } else if (childrenToUse != null) {
            var mountImages = this.mountChildren(childrenToUse, transaction);
            return mountImages.join('');
          }
        }
        return '';
      },
      receiveComponent: function(nextElement, transaction) {
        if (nextElement === this._currentElement && nextElement._owner != null) {
          return ;
        }
        ReactComponent.Mixin.receiveComponent.call(this, nextElement, transaction);
      },
      updateComponent: ReactPerf.measure('ReactDOMComponent', 'updateComponent', function(transaction, prevElement) {
        assertValidProps(this._currentElement.props);
        ReactComponent.Mixin.updateComponent.call(this, transaction, prevElement);
        this._updateDOMProperties(prevElement.props, transaction);
        this._updateDOMChildren(prevElement.props, transaction);
      }),
      _updateDOMProperties: function(lastProps, transaction) {
        var nextProps = this.props;
        var propKey;
        var styleName;
        var styleUpdates;
        for (propKey in lastProps) {
          if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
            continue;
          }
          if (propKey === STYLE) {
            var lastStyle = lastProps[propKey];
            for (styleName in lastStyle) {
              if (lastStyle.hasOwnProperty(styleName)) {
                styleUpdates = styleUpdates || {};
                styleUpdates[styleName] = '';
              }
            }
          } else if (registrationNameModules.hasOwnProperty(propKey)) {
            deleteListener(this._rootNodeID, propKey);
          } else if (DOMProperty.isStandardName[propKey] || DOMProperty.isCustomAttribute(propKey)) {
            ReactComponent.BackendIDOperations.deletePropertyByID(this._rootNodeID, propKey);
          }
        }
        for (propKey in nextProps) {
          var nextProp = nextProps[propKey];
          var lastProp = lastProps[propKey];
          if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
            continue;
          }
          if (propKey === STYLE) {
            if (nextProp) {
              nextProp = nextProps.style = assign({}, nextProp);
            }
            if (lastProp) {
              for (styleName in lastProp) {
                if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = '';
                }
              }
              for (styleName in nextProp) {
                if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = nextProp[styleName];
                }
              }
            } else {
              styleUpdates = nextProp;
            }
          } else if (registrationNameModules.hasOwnProperty(propKey)) {
            putListener(this._rootNodeID, propKey, nextProp, transaction);
          } else if (DOMProperty.isStandardName[propKey] || DOMProperty.isCustomAttribute(propKey)) {
            ReactComponent.BackendIDOperations.updatePropertyByID(this._rootNodeID, propKey, nextProp);
          }
        }
        if (styleUpdates) {
          ReactComponent.BackendIDOperations.updateStylesByID(this._rootNodeID, styleUpdates);
        }
      },
      _updateDOMChildren: function(lastProps, transaction) {
        var nextProps = this.props;
        var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
        var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
        var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
        var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;
        var lastChildren = lastContent != null ? null : lastProps.children;
        var nextChildren = nextContent != null ? null : nextProps.children;
        var lastHasContentOrHtml = lastContent != null || lastHtml != null;
        var nextHasContentOrHtml = nextContent != null || nextHtml != null;
        if (lastChildren != null && nextChildren == null) {
          this.updateChildren(null, transaction);
        } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
          this.updateTextContent('');
        }
        if (nextContent != null) {
          if (lastContent !== nextContent) {
            this.updateTextContent('' + nextContent);
          }
        } else if (nextHtml != null) {
          if (lastHtml !== nextHtml) {
            ReactComponent.BackendIDOperations.updateInnerHTMLByID(this._rootNodeID, nextHtml);
          }
        } else if (nextChildren != null) {
          this.updateChildren(nextChildren, transaction);
        }
      },
      unmountComponent: function() {
        this.unmountChildren();
        ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
        ReactComponent.Mixin.unmountComponent.call(this);
      }
    };
    assign(ReactDOMComponent.prototype, ReactComponent.Mixin, ReactDOMComponent.Mixin, ReactMultiChild.Mixin, ReactBrowserComponentMixin);
    module.exports = ReactDOMComponent;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDOMIDOperations", ["npm:react@0.12.2/lib/CSSPropertyOperations", "npm:react@0.12.2/lib/DOMChildrenOperations", "npm:react@0.12.2/lib/DOMPropertyOperations", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/setInnerHTML", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var CSSPropertyOperations = require("npm:react@0.12.2/lib/CSSPropertyOperations");
    var DOMChildrenOperations = require("npm:react@0.12.2/lib/DOMChildrenOperations");
    var DOMPropertyOperations = require("npm:react@0.12.2/lib/DOMPropertyOperations");
    var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
    var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var setInnerHTML = require("npm:react@0.12.2/lib/setInnerHTML");
    var INVALID_PROPERTY_ERRORS = {
      dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
      style: '`style` must be set using `updateStylesByID()`.'
    };
    var ReactDOMIDOperations = {
      updatePropertyByID: ReactPerf.measure('ReactDOMIDOperations', 'updatePropertyByID', function(id, name, value) {
        var node = ReactMount.getNode(id);
        ("production" !== process.env.NODE_ENV ? invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name), 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
        if (value != null) {
          DOMPropertyOperations.setValueForProperty(node, name, value);
        } else {
          DOMPropertyOperations.deleteValueForProperty(node, name);
        }
      }),
      deletePropertyByID: ReactPerf.measure('ReactDOMIDOperations', 'deletePropertyByID', function(id, name, value) {
        var node = ReactMount.getNode(id);
        ("production" !== process.env.NODE_ENV ? invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name), 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
        DOMPropertyOperations.deleteValueForProperty(node, name, value);
      }),
      updateStylesByID: ReactPerf.measure('ReactDOMIDOperations', 'updateStylesByID', function(id, styles) {
        var node = ReactMount.getNode(id);
        CSSPropertyOperations.setValueForStyles(node, styles);
      }),
      updateInnerHTMLByID: ReactPerf.measure('ReactDOMIDOperations', 'updateInnerHTMLByID', function(id, html) {
        var node = ReactMount.getNode(id);
        setInnerHTML(node, html);
      }),
      updateTextContentByID: ReactPerf.measure('ReactDOMIDOperations', 'updateTextContentByID', function(id, content) {
        var node = ReactMount.getNode(id);
        DOMChildrenOperations.updateTextContent(node, content);
      }),
      dangerouslyReplaceNodeWithMarkupByID: ReactPerf.measure('ReactDOMIDOperations', 'dangerouslyReplaceNodeWithMarkupByID', function(id, markup) {
        var node = ReactMount.getNode(id);
        DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
      }),
      dangerouslyProcessChildrenUpdates: ReactPerf.measure('ReactDOMIDOperations', 'dangerouslyProcessChildrenUpdates', function(updates, markup) {
        for (var i = 0; i < updates.length; i++) {
          updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
        }
        DOMChildrenOperations.processUpdates(updates, markup);
      })
    };
    module.exports = ReactDOMIDOperations;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:governorjs@0.0.3/lib/create", ["npm:ramda@0.10.0", "npm:react@0.12.2/addons", "npm:governorjs@0.0.3/lib/hub"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var R = require("npm:ramda@0.10.0");
  var React = require("npm:react@0.12.2/addons");
  var createHub = require("npm:governorjs@0.0.3/lib/hub");
  module.exports = function(links, output) {
    var hub = createHub();
    var nestedPath = function(delta, path) {
      return path ? R.assocPath(path, delta, {}) : delta;
    };
    var swap = (function() {
      var state = {};
      return function(path, delta) {
        return delta ? (state = React.addons.update(state, nestedPath(delta, path))) : (path ? R.path(path, state) : state);
      };
    })();
    var render = R.ifElse(function() {
      return stores;
    }, R.compose(R.partialRight(output, hub), swap), swap);
    var stores = R.toPairs(links).map(function(link) {
      var path = link[0],
          Store = link[1];
      return Store({
        set: render.bind(null, path),
        get: swap.bind(null, path)
      }, hub);
    });
    hub.set = render.bind(null, 'view');
    hub.get = swap.bind(null, 'view');
    swap('view', {$set: {}});
    render();
    return {hub: hub};
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/Route", ["npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/warning", "npm:react-router@0.12.4/lib/PathUtils"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var _prototypeProperties = function(child, staticProps, instanceProps) {
    if (staticProps)
      Object.defineProperties(child, staticProps);
    if (instanceProps)
      Object.defineProperties(child.prototype, instanceProps);
  };
  var _classCallCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var invariant = require("npm:react@0.12.2/lib/invariant");
  var warning = require("npm:react@0.12.2/lib/warning");
  var PathUtils = require("npm:react-router@0.12.4/lib/PathUtils");
  var _currentRoute;
  var Route = (function() {
    function Route(name, path, ignoreScrollBehavior, isDefault, isNotFound, onEnter, onLeave, handler) {
      _classCallCheck(this, Route);
      this.name = name;
      this.path = path;
      this.paramNames = PathUtils.extractParamNames(this.path);
      this.ignoreScrollBehavior = !!ignoreScrollBehavior;
      this.isDefault = !!isDefault;
      this.isNotFound = !!isNotFound;
      this.onEnter = onEnter;
      this.onLeave = onLeave;
      this.handler = handler;
    }
    _prototypeProperties(Route, {
      createRoute: {
        value: function createRoute(options, callback) {
          options = options || {};
          if (typeof options === "string")
            options = {path: options};
          var parentRoute = _currentRoute;
          if (parentRoute) {
            warning(options.parentRoute == null || options.parentRoute === parentRoute, "You should not use parentRoute with createRoute inside another route's child callback; it is ignored");
          } else {
            parentRoute = options.parentRoute;
          }
          var name = options.name;
          var path = options.path || name;
          if (path && !(options.isDefault || options.isNotFound)) {
            if (PathUtils.isAbsolute(path)) {
              if (parentRoute) {
                invariant(parentRoute.paramNames.length === 0, "You cannot nest path \"%s\" inside \"%s\"; the parent requires URL parameters", path, parentRoute.path);
              }
            } else if (parentRoute) {
              path = PathUtils.join(parentRoute.path, path);
            } else {
              path = "/" + path;
            }
          } else {
            path = parentRoute ? parentRoute.path : "/";
          }
          if (options.isNotFound && !/\*$/.test(path))
            path += "*";
          var route = new Route(name, path, options.ignoreScrollBehavior, options.isDefault, options.isNotFound, options.onEnter, options.onLeave, options.handler);
          if (parentRoute) {
            if (route.isDefault) {
              invariant(parentRoute.defaultRoute == null, "%s may not have more than one default route", parentRoute);
              parentRoute.defaultRoute = route;
            } else if (route.isNotFound) {
              invariant(parentRoute.notFoundRoute == null, "%s may not have more than one not found route", parentRoute);
              parentRoute.notFoundRoute = route;
            }
            parentRoute.appendChild(route);
          }
          if (typeof callback === "function") {
            var currentRoute = _currentRoute;
            _currentRoute = route;
            callback.call(route, route);
            _currentRoute = currentRoute;
          }
          return route;
        },
        writable: true,
        configurable: true
      },
      createDefaultRoute: {
        value: function createDefaultRoute(options) {
          return Route.createRoute(assign({}, options, {isDefault: true}));
        },
        writable: true,
        configurable: true
      },
      createNotFoundRoute: {
        value: function createNotFoundRoute(options) {
          return Route.createRoute(assign({}, options, {isNotFound: true}));
        },
        writable: true,
        configurable: true
      },
      createRedirect: {
        value: function createRedirect(options) {
          return Route.createRoute(assign({}, options, {
            path: options.path || options.from || "*",
            onEnter: function onEnter(transition, params, query) {
              transition.redirect(options.to, options.params || params, options.query || query);
            }
          }));
        },
        writable: true,
        configurable: true
      }
    }, {
      appendChild: {
        value: function appendChild(route) {
          invariant(route instanceof Route, "route.appendChild must use a valid Route");
          if (!this.childRoutes)
            this.childRoutes = [];
          this.childRoutes.push(route);
        },
        writable: true,
        configurable: true
      },
      toString: {
        value: function toString() {
          var string = "<Route";
          if (this.name)
            string += " name=\"" + this.name + "\"";
          string += " path=\"" + this.path + "\">";
          return string;
        },
        writable: true,
        configurable: true
      }
    });
    return Route;
  })();
  module.exports = Route;
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/DOMPropertyOperations", ["npm:react@0.12.2/lib/DOMProperty", "npm:react@0.12.2/lib/escapeTextForBrowser", "npm:react@0.12.2/lib/memoizeStringOnly", "npm:react@0.12.2/lib/warning", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var DOMProperty = require("npm:react@0.12.2/lib/DOMProperty");
    var escapeTextForBrowser = require("npm:react@0.12.2/lib/escapeTextForBrowser");
    var memoizeStringOnly = require("npm:react@0.12.2/lib/memoizeStringOnly");
    var warning = require("npm:react@0.12.2/lib/warning");
    function shouldIgnoreValue(name, value) {
      return value == null || (DOMProperty.hasBooleanValue[name] && !value) || (DOMProperty.hasNumericValue[name] && isNaN(value)) || (DOMProperty.hasPositiveNumericValue[name] && (value < 1)) || (DOMProperty.hasOverloadedBooleanValue[name] && value === false);
    }
    var processAttributeNameAndPrefix = memoizeStringOnly(function(name) {
      return escapeTextForBrowser(name) + '="';
    });
    if ("production" !== process.env.NODE_ENV) {
      var reactProps = {
        children: true,
        dangerouslySetInnerHTML: true,
        key: true,
        ref: true
      };
      var warnedProperties = {};
      var warnUnknownProperty = function(name) {
        if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
          return ;
        }
        warnedProperties[name] = true;
        var lowerCasedName = name.toLowerCase();
        var standardName = (DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null);
        ("production" !== process.env.NODE_ENV ? warning(standardName == null, 'Unknown DOM property ' + name + '. Did you mean ' + standardName + '?') : null);
      };
    }
    var DOMPropertyOperations = {
      createMarkupForID: function(id) {
        return processAttributeNameAndPrefix(DOMProperty.ID_ATTRIBUTE_NAME) + escapeTextForBrowser(id) + '"';
      },
      createMarkupForProperty: function(name, value) {
        if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
          if (shouldIgnoreValue(name, value)) {
            return '';
          }
          var attributeName = DOMProperty.getAttributeName[name];
          if (DOMProperty.hasBooleanValue[name] || (DOMProperty.hasOverloadedBooleanValue[name] && value === true)) {
            return escapeTextForBrowser(attributeName);
          }
          return processAttributeNameAndPrefix(attributeName) + escapeTextForBrowser(value) + '"';
        } else if (DOMProperty.isCustomAttribute(name)) {
          if (value == null) {
            return '';
          }
          return processAttributeNameAndPrefix(name) + escapeTextForBrowser(value) + '"';
        } else if ("production" !== process.env.NODE_ENV) {
          warnUnknownProperty(name);
        }
        return null;
      },
      setValueForProperty: function(node, name, value) {
        if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
          var mutationMethod = DOMProperty.getMutationMethod[name];
          if (mutationMethod) {
            mutationMethod(node, value);
          } else if (shouldIgnoreValue(name, value)) {
            this.deleteValueForProperty(node, name);
          } else if (DOMProperty.mustUseAttribute[name]) {
            node.setAttribute(DOMProperty.getAttributeName[name], '' + value);
          } else {
            var propName = DOMProperty.getPropertyName[name];
            if (!DOMProperty.hasSideEffects[name] || ('' + node[propName]) !== ('' + value)) {
              node[propName] = value;
            }
          }
        } else if (DOMProperty.isCustomAttribute(name)) {
          if (value == null) {
            node.removeAttribute(name);
          } else {
            node.setAttribute(name, '' + value);
          }
        } else if ("production" !== process.env.NODE_ENV) {
          warnUnknownProperty(name);
        }
      },
      deleteValueForProperty: function(node, name) {
        if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
          var mutationMethod = DOMProperty.getMutationMethod[name];
          if (mutationMethod) {
            mutationMethod(node, undefined);
          } else if (DOMProperty.mustUseAttribute[name]) {
            node.removeAttribute(DOMProperty.getAttributeName[name]);
          } else {
            var propName = DOMProperty.getPropertyName[name];
            var defaultValue = DOMProperty.getDefaultValueForProperty(node.nodeName, propName);
            if (!DOMProperty.hasSideEffects[name] || ('' + node[propName]) !== defaultValue) {
              node[propName] = defaultValue;
            }
          }
        } else if (DOMProperty.isCustomAttribute(name)) {
          node.removeAttribute(name);
        } else if ("production" !== process.env.NODE_ENV) {
          warnUnknownProperty(name);
        }
      }
    };
    module.exports = DOMPropertyOperations;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactComponentBrowserEnvironment", ["npm:react@0.12.2/lib/ReactDOMIDOperations", "npm:react@0.12.2/lib/ReactMarkupChecksum", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/ReactReconcileTransaction", "npm:react@0.12.2/lib/getReactRootElementInContainer", "npm:react@0.12.2/lib/invariant", "npm:react@0.12.2/lib/setInnerHTML", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactDOMIDOperations = require("npm:react@0.12.2/lib/ReactDOMIDOperations");
    var ReactMarkupChecksum = require("npm:react@0.12.2/lib/ReactMarkupChecksum");
    var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
    var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
    var ReactReconcileTransaction = require("npm:react@0.12.2/lib/ReactReconcileTransaction");
    var getReactRootElementInContainer = require("npm:react@0.12.2/lib/getReactRootElementInContainer");
    var invariant = require("npm:react@0.12.2/lib/invariant");
    var setInnerHTML = require("npm:react@0.12.2/lib/setInnerHTML");
    var ELEMENT_NODE_TYPE = 1;
    var DOC_NODE_TYPE = 9;
    var ReactComponentBrowserEnvironment = {
      ReactReconcileTransaction: ReactReconcileTransaction,
      BackendIDOperations: ReactDOMIDOperations,
      unmountIDFromEnvironment: function(rootNodeID) {
        ReactMount.purgeID(rootNodeID);
      },
      mountImageIntoNode: ReactPerf.measure('ReactComponentBrowserEnvironment', 'mountImageIntoNode', function(markup, container, shouldReuseMarkup) {
        ("production" !== process.env.NODE_ENV ? invariant(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE), 'mountComponentIntoNode(...): Target container is not valid.') : invariant(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)));
        if (shouldReuseMarkup) {
          if (ReactMarkupChecksum.canReuseMarkup(markup, getReactRootElementInContainer(container))) {
            return ;
          } else {
            ("production" !== process.env.NODE_ENV ? invariant(container.nodeType !== DOC_NODE_TYPE, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side.') : invariant(container.nodeType !== DOC_NODE_TYPE));
            if ("production" !== process.env.NODE_ENV) {
              console.warn('React attempted to use reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server.');
            }
          }
        }
        ("production" !== process.env.NODE_ENV ? invariant(container.nodeType !== DOC_NODE_TYPE, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See renderComponentToString() for server rendering.') : invariant(container.nodeType !== DOC_NODE_TYPE));
        setInnerHTML(container, markup);
      })
    };
    module.exports = ReactComponentBrowserEnvironment;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:governorjs@0.0.3/lib/index", ["npm:governorjs@0.0.3/lib/hub", "npm:governorjs@0.0.3/lib/create", "npm:governorjs@0.0.3/lib/pure_render_mixin", "npm:governorjs@0.0.3/lib/highlight_mixin"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var hub = require("npm:governorjs@0.0.3/lib/hub");
  var create = require("npm:governorjs@0.0.3/lib/create");
  var pureRenderMixin = require("npm:governorjs@0.0.3/lib/pure_render_mixin");
  var highlightMixin = require("npm:governorjs@0.0.3/lib/highlight_mixin");
  module.exports = {
    hub: hub,
    create: create,
    pureRenderMixin: pureRenderMixin,
    highlightMixin: highlightMixin
  };
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/components/Link", ["npm:react@0.12.2", "npm:react@0.12.2/lib/cx", "npm:react@0.12.2/lib/Object.assign", "npm:react-router@0.12.4/lib/Navigation", "npm:react-router@0.12.4/lib/State", "npm:react-router@0.12.4/lib/PropTypes", "npm:react-router@0.12.4/lib/Route"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var React = require("npm:react@0.12.2");
  var classSet = require("npm:react@0.12.2/lib/cx");
  var assign = require("npm:react@0.12.2/lib/Object.assign");
  var Navigation = require("npm:react-router@0.12.4/lib/Navigation");
  var State = require("npm:react-router@0.12.4/lib/State");
  var PropTypes = require("npm:react-router@0.12.4/lib/PropTypes");
  var Route = require("npm:react-router@0.12.4/lib/Route");
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
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/ReactDefaultInjection", ["npm:react@0.12.2/lib/BeforeInputEventPlugin", "npm:react@0.12.2/lib/ChangeEventPlugin", "npm:react@0.12.2/lib/ClientReactRootIndex", "npm:react@0.12.2/lib/CompositionEventPlugin", "npm:react@0.12.2/lib/DefaultEventPluginOrder", "npm:react@0.12.2/lib/EnterLeaveEventPlugin", "npm:react@0.12.2/lib/ExecutionEnvironment", "npm:react@0.12.2/lib/HTMLDOMPropertyConfig", "npm:react@0.12.2/lib/MobileSafariClickEventPlugin", "npm:react@0.12.2/lib/ReactBrowserComponentMixin", "npm:react@0.12.2/lib/ReactComponentBrowserEnvironment", "npm:react@0.12.2/lib/ReactDefaultBatchingStrategy", "npm:react@0.12.2/lib/ReactDOMComponent", "npm:react@0.12.2/lib/ReactDOMButton", "npm:react@0.12.2/lib/ReactDOMForm", "npm:react@0.12.2/lib/ReactDOMImg", "npm:react@0.12.2/lib/ReactDOMInput", "npm:react@0.12.2/lib/ReactDOMOption", "npm:react@0.12.2/lib/ReactDOMSelect", "npm:react@0.12.2/lib/ReactDOMTextarea", "npm:react@0.12.2/lib/ReactEventListener", "npm:react@0.12.2/lib/ReactInjection", "npm:react@0.12.2/lib/ReactInstanceHandles", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/SelectEventPlugin", "npm:react@0.12.2/lib/ServerReactRootIndex", "npm:react@0.12.2/lib/SimpleEventPlugin", "npm:react@0.12.2/lib/SVGDOMPropertyConfig", "npm:react@0.12.2/lib/createFullPageComponent", "npm:react@0.12.2/lib/ReactDefaultPerf", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var BeforeInputEventPlugin = require("npm:react@0.12.2/lib/BeforeInputEventPlugin");
    var ChangeEventPlugin = require("npm:react@0.12.2/lib/ChangeEventPlugin");
    var ClientReactRootIndex = require("npm:react@0.12.2/lib/ClientReactRootIndex");
    var CompositionEventPlugin = require("npm:react@0.12.2/lib/CompositionEventPlugin");
    var DefaultEventPluginOrder = require("npm:react@0.12.2/lib/DefaultEventPluginOrder");
    var EnterLeaveEventPlugin = require("npm:react@0.12.2/lib/EnterLeaveEventPlugin");
    var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
    var HTMLDOMPropertyConfig = require("npm:react@0.12.2/lib/HTMLDOMPropertyConfig");
    var MobileSafariClickEventPlugin = require("npm:react@0.12.2/lib/MobileSafariClickEventPlugin");
    var ReactBrowserComponentMixin = require("npm:react@0.12.2/lib/ReactBrowserComponentMixin");
    var ReactComponentBrowserEnvironment = require("npm:react@0.12.2/lib/ReactComponentBrowserEnvironment");
    var ReactDefaultBatchingStrategy = require("npm:react@0.12.2/lib/ReactDefaultBatchingStrategy");
    var ReactDOMComponent = require("npm:react@0.12.2/lib/ReactDOMComponent");
    var ReactDOMButton = require("npm:react@0.12.2/lib/ReactDOMButton");
    var ReactDOMForm = require("npm:react@0.12.2/lib/ReactDOMForm");
    var ReactDOMImg = require("npm:react@0.12.2/lib/ReactDOMImg");
    var ReactDOMInput = require("npm:react@0.12.2/lib/ReactDOMInput");
    var ReactDOMOption = require("npm:react@0.12.2/lib/ReactDOMOption");
    var ReactDOMSelect = require("npm:react@0.12.2/lib/ReactDOMSelect");
    var ReactDOMTextarea = require("npm:react@0.12.2/lib/ReactDOMTextarea");
    var ReactEventListener = require("npm:react@0.12.2/lib/ReactEventListener");
    var ReactInjection = require("npm:react@0.12.2/lib/ReactInjection");
    var ReactInstanceHandles = require("npm:react@0.12.2/lib/ReactInstanceHandles");
    var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
    var SelectEventPlugin = require("npm:react@0.12.2/lib/SelectEventPlugin");
    var ServerReactRootIndex = require("npm:react@0.12.2/lib/ServerReactRootIndex");
    var SimpleEventPlugin = require("npm:react@0.12.2/lib/SimpleEventPlugin");
    var SVGDOMPropertyConfig = require("npm:react@0.12.2/lib/SVGDOMPropertyConfig");
    var createFullPageComponent = require("npm:react@0.12.2/lib/createFullPageComponent");
    function inject() {
      ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
      ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
      ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
      ReactInjection.EventPluginHub.injectMount(ReactMount);
      ReactInjection.EventPluginHub.injectEventPluginsByName({
        SimpleEventPlugin: SimpleEventPlugin,
        EnterLeaveEventPlugin: EnterLeaveEventPlugin,
        ChangeEventPlugin: ChangeEventPlugin,
        CompositionEventPlugin: CompositionEventPlugin,
        MobileSafariClickEventPlugin: MobileSafariClickEventPlugin,
        SelectEventPlugin: SelectEventPlugin,
        BeforeInputEventPlugin: BeforeInputEventPlugin
      });
      ReactInjection.NativeComponent.injectGenericComponentClass(ReactDOMComponent);
      ReactInjection.NativeComponent.injectComponentClasses({
        'button': ReactDOMButton,
        'form': ReactDOMForm,
        'img': ReactDOMImg,
        'input': ReactDOMInput,
        'option': ReactDOMOption,
        'select': ReactDOMSelect,
        'textarea': ReactDOMTextarea,
        'html': createFullPageComponent('html'),
        'head': createFullPageComponent('head'),
        'body': createFullPageComponent('body')
      });
      ReactInjection.CompositeComponent.injectMixin(ReactBrowserComponentMixin);
      ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
      ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
      ReactInjection.EmptyComponent.injectEmptyComponent('noscript');
      ReactInjection.Updates.injectReconcileTransaction(ReactComponentBrowserEnvironment.ReactReconcileTransaction);
      ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
      ReactInjection.RootIndex.injectCreateReactRootIndex(ExecutionEnvironment.canUseDOM ? ClientReactRootIndex.createReactRootIndex : ServerReactRootIndex.createReactRootIndex);
      ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
      if ("production" !== process.env.NODE_ENV) {
        var url = (ExecutionEnvironment.canUseDOM && window.location.href) || '';
        if ((/[?&]react_perf\b/).test(url)) {
          var ReactDefaultPerf = require("npm:react@0.12.2/lib/ReactDefaultPerf");
          ReactDefaultPerf.start();
        }
      }
    }
    module.exports = {inject: inject};
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:governorjs@0.0.3", ["npm:governorjs@0.0.3/lib/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:governorjs@0.0.3/lib/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib/index", ["npm:react-router@0.12.4/lib/components/DefaultRoute", "npm:react-router@0.12.4/lib/components/Link", "npm:react-router@0.12.4/lib/components/NotFoundRoute", "npm:react-router@0.12.4/lib/components/Redirect", "npm:react-router@0.12.4/lib/components/Route", "npm:react-router@0.12.4/lib/components/RouteHandler", "npm:react-router@0.12.4/lib/locations/HashLocation", "npm:react-router@0.12.4/lib/locations/HistoryLocation", "npm:react-router@0.12.4/lib/locations/RefreshLocation", "npm:react-router@0.12.4/lib/locations/StaticLocation", "npm:react-router@0.12.4/lib/behaviors/ImitateBrowserBehavior", "npm:react-router@0.12.4/lib/behaviors/ScrollToTopBehavior", "npm:react-router@0.12.4/lib/History", "npm:react-router@0.12.4/lib/Navigation", "npm:react-router@0.12.4/lib/RouteHandlerMixin", "npm:react-router@0.12.4/lib/State", "npm:react-router@0.12.4/lib/Route", "npm:react-router@0.12.4/lib/Route", "npm:react-router@0.12.4/lib/Route", "npm:react-router@0.12.4/lib/Route", "npm:react-router@0.12.4/lib/createRoutesFromReactChildren", "npm:react-router@0.12.4/lib/createRouter", "npm:react-router@0.12.4/lib/runRouter"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  exports.DefaultRoute = require("npm:react-router@0.12.4/lib/components/DefaultRoute");
  exports.Link = require("npm:react-router@0.12.4/lib/components/Link");
  exports.NotFoundRoute = require("npm:react-router@0.12.4/lib/components/NotFoundRoute");
  exports.Redirect = require("npm:react-router@0.12.4/lib/components/Redirect");
  exports.Route = require("npm:react-router@0.12.4/lib/components/Route");
  exports.RouteHandler = require("npm:react-router@0.12.4/lib/components/RouteHandler");
  exports.HashLocation = require("npm:react-router@0.12.4/lib/locations/HashLocation");
  exports.HistoryLocation = require("npm:react-router@0.12.4/lib/locations/HistoryLocation");
  exports.RefreshLocation = require("npm:react-router@0.12.4/lib/locations/RefreshLocation");
  exports.StaticLocation = require("npm:react-router@0.12.4/lib/locations/StaticLocation");
  exports.ImitateBrowserBehavior = require("npm:react-router@0.12.4/lib/behaviors/ImitateBrowserBehavior");
  exports.ScrollToTopBehavior = require("npm:react-router@0.12.4/lib/behaviors/ScrollToTopBehavior");
  exports.History = require("npm:react-router@0.12.4/lib/History");
  exports.Navigation = require("npm:react-router@0.12.4/lib/Navigation");
  exports.RouteHandlerMixin = require("npm:react-router@0.12.4/lib/RouteHandlerMixin");
  exports.State = require("npm:react-router@0.12.4/lib/State");
  exports.createRoute = require("npm:react-router@0.12.4/lib/Route").createRoute;
  exports.createDefaultRoute = require("npm:react-router@0.12.4/lib/Route").createDefaultRoute;
  exports.createNotFoundRoute = require("npm:react-router@0.12.4/lib/Route").createNotFoundRoute;
  exports.createRedirect = require("npm:react-router@0.12.4/lib/Route").createRedirect;
  exports.createRoutesFromReactChildren = require("npm:react-router@0.12.4/lib/createRoutesFromReactChildren");
  exports.create = require("npm:react-router@0.12.4/lib/createRouter");
  exports.run = require("npm:react-router@0.12.4/lib/runRouter");
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/lib/React", ["npm:react@0.12.2/lib/DOMPropertyOperations", "npm:react@0.12.2/lib/EventPluginUtils", "npm:react@0.12.2/lib/ReactChildren", "npm:react@0.12.2/lib/ReactComponent", "npm:react@0.12.2/lib/ReactCompositeComponent", "npm:react@0.12.2/lib/ReactContext", "npm:react@0.12.2/lib/ReactCurrentOwner", "npm:react@0.12.2/lib/ReactElement", "npm:react@0.12.2/lib/ReactElementValidator", "npm:react@0.12.2/lib/ReactDOM", "npm:react@0.12.2/lib/ReactDOMComponent", "npm:react@0.12.2/lib/ReactDefaultInjection", "npm:react@0.12.2/lib/ReactInstanceHandles", "npm:react@0.12.2/lib/ReactLegacyElement", "npm:react@0.12.2/lib/ReactMount", "npm:react@0.12.2/lib/ReactMultiChild", "npm:react@0.12.2/lib/ReactPerf", "npm:react@0.12.2/lib/ReactPropTypes", "npm:react@0.12.2/lib/ReactServerRendering", "npm:react@0.12.2/lib/ReactTextComponent", "npm:react@0.12.2/lib/Object.assign", "npm:react@0.12.2/lib/deprecated", "npm:react@0.12.2/lib/onlyChild", "npm:react@0.12.2/lib/ExecutionEnvironment", "github:jspm/nodelibs-process@0.1.1"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var DOMPropertyOperations = require("npm:react@0.12.2/lib/DOMPropertyOperations");
    var EventPluginUtils = require("npm:react@0.12.2/lib/EventPluginUtils");
    var ReactChildren = require("npm:react@0.12.2/lib/ReactChildren");
    var ReactComponent = require("npm:react@0.12.2/lib/ReactComponent");
    var ReactCompositeComponent = require("npm:react@0.12.2/lib/ReactCompositeComponent");
    var ReactContext = require("npm:react@0.12.2/lib/ReactContext");
    var ReactCurrentOwner = require("npm:react@0.12.2/lib/ReactCurrentOwner");
    var ReactElement = require("npm:react@0.12.2/lib/ReactElement");
    var ReactElementValidator = require("npm:react@0.12.2/lib/ReactElementValidator");
    var ReactDOM = require("npm:react@0.12.2/lib/ReactDOM");
    var ReactDOMComponent = require("npm:react@0.12.2/lib/ReactDOMComponent");
    var ReactDefaultInjection = require("npm:react@0.12.2/lib/ReactDefaultInjection");
    var ReactInstanceHandles = require("npm:react@0.12.2/lib/ReactInstanceHandles");
    var ReactLegacyElement = require("npm:react@0.12.2/lib/ReactLegacyElement");
    var ReactMount = require("npm:react@0.12.2/lib/ReactMount");
    var ReactMultiChild = require("npm:react@0.12.2/lib/ReactMultiChild");
    var ReactPerf = require("npm:react@0.12.2/lib/ReactPerf");
    var ReactPropTypes = require("npm:react@0.12.2/lib/ReactPropTypes");
    var ReactServerRendering = require("npm:react@0.12.2/lib/ReactServerRendering");
    var ReactTextComponent = require("npm:react@0.12.2/lib/ReactTextComponent");
    var assign = require("npm:react@0.12.2/lib/Object.assign");
    var deprecated = require("npm:react@0.12.2/lib/deprecated");
    var onlyChild = require("npm:react@0.12.2/lib/onlyChild");
    ReactDefaultInjection.inject();
    var createElement = ReactElement.createElement;
    var createFactory = ReactElement.createFactory;
    if ("production" !== process.env.NODE_ENV) {
      createElement = ReactElementValidator.createElement;
      createFactory = ReactElementValidator.createFactory;
    }
    createElement = ReactLegacyElement.wrapCreateElement(createElement);
    createFactory = ReactLegacyElement.wrapCreateFactory(createFactory);
    var render = ReactPerf.measure('React', 'render', ReactMount.render);
    var React = {
      Children: {
        map: ReactChildren.map,
        forEach: ReactChildren.forEach,
        count: ReactChildren.count,
        only: onlyChild
      },
      DOM: ReactDOM,
      PropTypes: ReactPropTypes,
      initializeTouchEvents: function(shouldUseTouch) {
        EventPluginUtils.useTouchEvents = shouldUseTouch;
      },
      createClass: ReactCompositeComponent.createClass,
      createElement: createElement,
      createFactory: createFactory,
      constructAndRenderComponent: ReactMount.constructAndRenderComponent,
      constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
      render: render,
      renderToString: ReactServerRendering.renderToString,
      renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
      unmountComponentAtNode: ReactMount.unmountComponentAtNode,
      isValidClass: ReactLegacyElement.isValidClass,
      isValidElement: ReactElement.isValidElement,
      withContext: ReactContext.withContext,
      __spread: assign,
      renderComponent: deprecated('React', 'renderComponent', 'render', this, render),
      renderComponentToString: deprecated('React', 'renderComponentToString', 'renderToString', this, ReactServerRendering.renderToString),
      renderComponentToStaticMarkup: deprecated('React', 'renderComponentToStaticMarkup', 'renderToStaticMarkup', this, ReactServerRendering.renderToStaticMarkup),
      isValidComponent: deprecated('React', 'isValidComponent', 'isValidElement', this, ReactElement.isValidElement)
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
        Component: ReactComponent,
        CurrentOwner: ReactCurrentOwner,
        DOMComponent: ReactDOMComponent,
        DOMPropertyOperations: DOMPropertyOperations,
        InstanceHandles: ReactInstanceHandles,
        Mount: ReactMount,
        MultiChild: ReactMultiChild,
        TextComponent: ReactTextComponent
      });
    }
    if ("production" !== process.env.NODE_ENV) {
      var ExecutionEnvironment = require("npm:react@0.12.2/lib/ExecutionEnvironment");
      if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
        if (navigator.userAgent.indexOf('Chrome') > -1) {
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
            console.debug('Download the React DevTools for a better development experience: ' + 'http://fb.me/react-devtools');
          }
        }
        var expectedFeatures = [Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim, Object.create, Object.freeze];
        for (var i = 0; i < expectedFeatures.length; i++) {
          if (!expectedFeatures[i]) {
            console.error('One or more ES5 shim/shams expected by React are not available: ' + 'http://fb.me/react-warning-polyfills');
            break;
          }
        }
      }
    }
    React.version = '0.12.2';
    module.exports = React;
  })(require("github:jspm/nodelibs-process@0.1.1"));
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4/lib", ["npm:react-router@0.12.4/lib/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:react-router@0.12.4/lib/index");
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2/react", ["npm:react@0.12.2/lib/React"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:react@0.12.2/lib/React");
  global.define = __define;
  return module.exports;
});

System.register("npm:react-router@0.12.4", ["npm:react-router@0.12.4/lib"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:react-router@0.12.4/lib");
  global.define = __define;
  return module.exports;
});

System.register("npm:react@0.12.2", ["npm:react@0.12.2/react"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:react@0.12.2/react");
  global.define = __define;
  return module.exports;
});

System.register("lib/image", [], function($__export) {
  "use strict";
  var __moduleName = "lib/image";
  return {
    setters: [],
    execute: function() {
      $__export('default', function(url, screen) {
        var parts = url.split('upload');
        var end = parts.pop();
        if (screen.height && screen.width) {
          return parts.concat(['upload', 'c_' + (screen.crop || 'fit') + ',w_' + screen.width + ',h_' + screen.height, end]).join('/');
        }
      });
    }
  };
});

System.register("components/about.jsx!github:floatdrop/plugin-jsx@1.0.1", ["npm:react@0.12.2", "npm:ramda@0.10.0", "components/header.jsx!github:floatdrop/plugin-jsx@1.0.1", "lib/image"], function($__export) {
  "use strict";
  var __moduleName = "components/about.jsx!github:floatdrop/plugin-jsx@1.0.1";
  var React,
      R,
      Header,
      image;
  return {
    setters: [function($__m) {
      React = $__m.default;
    }, function($__m) {
      R = $__m.default;
    }, function($__m) {
      Header = $__m.default;
    }, function($__m) {
      image = $__m.default;
    }],
    execute: function() {
      $__export('default', React.createClass({render: function() {
          var url = 'http://res.cloudinary.com/dv3yibyz2/image/upload/img001_vvca41.jpg';
          var opts = R.merge(this.props.hub.get().screen, {crop: 'fill'});
          return React.createElement("div", {
            style: {backgroundImage: 'url(' + image(url, opts) + ')'},
            className: "page",
            id: "about-component"
          }, React.createElement("div", {className: "content"}, React.createElement("h2", null, "About us"), React.createElement("p", null, "Our photographic services cover all aspects of the built environment; Specializing in the historic" + ' ' + "preservation projects, we document for national register nominations, historic structure reports and on-" + ' ' + "going building restoration documentation. Large format equipment and film is used to meet Historic" + ' ' + "American Building Survey (HABS) standards.")));
        }}));
    }
  };
});

System.register("components/project.jsx!github:floatdrop/plugin-jsx@1.0.1", ["npm:react@0.12.2", "lib/image"], function($__export) {
  "use strict";
  var __moduleName = "components/project.jsx!github:floatdrop/plugin-jsx@1.0.1";
  var React,
      image;
  function thumbURL(url) {
    var parts = url.split('/');
    var end = parts.pop();
    return parts.join('/') + 'c_fit,h_200,w_200' + '/' + end;
  }
  return {
    setters: [function($__m) {
      React = $__m.default;
    }, function($__m) {
      image = $__m.default;
    }],
    execute: function() {
      $__export('default', React.createClass({
        selectThumb: function(i, e) {
          e.preventDefault();
          this.props.hub.emit('selectThumbByIndex', i);
        },
        render: function() {
          var project = this.props.project;
          return React.createElement("div", {
            className: "page",
            id: "project-component"
          }, React.createElement("div", {className: "content"}, React.createElement("h2", null, project.name), project.description ? project.description.map(function(d) {
            return React.createElement("p", null, d);
          }) : null, React.createElement("div", {id: "thumbs"}, project.photos.map(function(photo, i) {
            return React.createElement("a", {
              href: project.name === 'gallery' ? '/#/gallery/' + i : '/#/projects/' + project.slug + '/gallery/' + i,
              style: {backgroundImage: 'url(' + image(photo.src, {
                  width: 200,
                  height: 200
                }) + ')'}
            });
          }, this))));
        }
      }));
    }
  };
});

System.register("components/gallery.jsx!github:floatdrop/plugin-jsx@1.0.1", ["npm:react@0.12.2", "lib/image"], function($__export) {
  "use strict";
  var __moduleName = "components/gallery.jsx!github:floatdrop/plugin-jsx@1.0.1";
  var React,
      image;
  return {
    setters: [function($__m) {
      React = $__m.default;
    }, function($__m) {
      image = $__m.default;
    }],
    execute: function() {
      $__export('default', React.createClass({render: function() {
          var photo = this.props.project.photos[this.props.index];
          return React.createElement("div", {id: "gallery"}, React.createElement("a", {
            href: this.props.project.name === 'gallery' ? '/#/gallery' : '/#/projects/' + this.props.project.slug,
            className: "close"
          }, React.createElement("i", {className: "fa fa-close"})), React.createElement("div", {
            className: "big",
            style: {backgroundImage: 'url(' + image(photo.src, this.props.hub.get().screen) + ')'}
          }));
        }}));
    }
  };
});

System.register("stores/project", ["npm:ramda@0.10.0"], function($__export) {
  "use strict";
  var __moduleName = "stores/project";
  var R,
      IMG_ROOT,
      projects,
      gallery;
  return {
    setters: [function($__m) {
      R = $__m.default;
    }],
    execute: function() {
      IMG_ROOT = 'http://res.cloudinary.com/dv3yibyz2/image/upload/';
      projects = [{
        slug: 'jfk-house',
        name: 'JFK House',
        description: ["This dwelling, which is the last vacation home used by JFK and his family in the summer of 1963, is on Squaw Island in Hyannisport, MA. It was photographed for a National Historic Register Nomination. The new owner, a Kennedy family member, declined to go forward with it."],
        photos: [{
          src: IMG_ROOT + 'jfk-house/img001_vvca41.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'jfk-house/img014_zmpab5.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'jfk-house/img015_afrece.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'jfk-house/img013_nvmbsq.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'jfk-house/img012_u3yxjs.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'jfk-house/img010_f7idxw.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'jfk-house/img006_h5qfgm.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'jfk-house/img009_gqsjy6.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'jfk-house/img007_tlqyxe.jpg',
          caption: ''
        }]
      }, {
        slug: 'duck-house',
        name: 'Duck House',
        description: ["From the Fenway Civic Association website: ", "\"On Agassiz Road, the parkway that links the East and West Fenway, sits a late 19th century building known as the Duck House.  This City-owned building, which has been boarded up and out of use since the 1980s, has the potential to serve as a community asset.\"", "This building was photo documented with large format photography to assist a documentation class of the BAC. "],
        photos: [{
          src: IMG_ROOT + 'HABS_horizontal-1_oajvgf.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_horizontal-3_cpliwe.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_horizontal-4_zohcsm.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_vertical-12_ntdm3h.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_vertical-8_dsm2aa.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_vertical-10_cq8ckw.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_vertical-9_cbvvhs.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_vertical-11_upsrtj.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_vertical-5_qayrcl.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_vertical-7_vsxpuk.jpg',
          caption: ''
        }, {
          src: IMG_ROOT + 'HABS_vertical-6_zynucp.jpg',
          caption: ''
        }]
      }];
      gallery = [{
        src: IMG_ROOT + '15-cornice_and_brackets_azpvau.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + '_IGP4889_v9ltv8.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + '_IGP4888_kcsjgw.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + '_IGP4899_jaiaya.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + '_IGP4896_i60lgd.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + '_IGP4893_thr1jf.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'door_trim_xd9gyn.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'crown_moulding_mo0yfr.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'ceiling_fixture_irvfhu.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'Ceiling_fixture-2_jacu7q.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'mirror_frame_detail_prbksv.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'mirror_frame_detail-3_zguffd.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'mirror_frame_detail-2_pcrq6f.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'trim_prp4ia.jpg',
        caption: ''
      }, {
        src: IMG_ROOT + 'Staircase_from_below-sm_c0pbsk.jpg',
        caption: ''
      }];
      $__export('default', function(state, hub) {
        state.set({$set: {
            showNav: false,
            list: projects,
            justGallery: gallery,
            selected: null,
            selectedThumbIndex: null
          }});
        hub.on({
          selectThumbByIndex: function(slug, i) {
            var project = R.find(R.propEq('slug', slug), projects);
            state.set({
              selected: {$set: project},
              selectedThumbIndex: {$set: i}
            });
          },
          toggleProjectNav: function() {
            state.set({showNav: {$set: !state.get().showNav}});
          },
          showProjectNav: function() {
            state.set({showNav: {$set: true}});
          },
          hideProjectNav: function() {
            state.set({showNav: {$set: false}});
          },
          selectProjectBySlug: function(slug) {
            var project = R.find(R.propEq('slug', slug), projects);
            state.set({
              selected: {$set: project},
              selectedThumbIndex: {$set: null}
            });
          }
        });
      });
    }
  };
});

System.register("stores/view", [], function($__export) {
  "use strict";
  var __moduleName = "stores/view";
  return {
    setters: [],
    execute: function() {
      $__export('default', function(state, hub) {
        state.set({$set: {}});
        hub.on({
          selectPane: function(pane) {
            state.set({pane: {$set: pane}});
          },
          selectProjectByName: function(name) {
            state.set({pane: {$set: 'project'}});
          }
        });
      });
    }
  };
});

System.register("components/home.jsx!github:floatdrop/plugin-jsx@1.0.1", ["npm:react@0.12.2", "npm:ramda@0.10.0", "lib/image"], function($__export) {
  "use strict";
  var __moduleName = "components/home.jsx!github:floatdrop/plugin-jsx@1.0.1";
  var React,
      R,
      image;
  return {
    setters: [function($__m) {
      React = $__m.default;
    }, function($__m) {
      R = $__m.default;
    }, function($__m) {
      image = $__m.default;
    }],
    execute: function() {
      $__export('default', React.createClass({render: function() {
          if (!this.props.hub.get().screen)
            return null;
          var url = 'http://res.cloudinary.com/dv3yibyz2/image/upload/FR_house-for_web-3_kta1ic.jpg';
          var opts = R.merge(this.props.hub.get().screen, {crop: 'fill'});
          return React.createElement("div", {
            style: {backgroundImage: 'url(' + image(url, opts) + ')'},
            className: "page",
            id: "home-component"
          });
        }}));
    }
  };
});

System.register("components/header.jsx!github:floatdrop/plugin-jsx@1.0.1", ["npm:react@0.12.2", "npm:react-router@0.12.4"], function($__export) {
  "use strict";
  var __moduleName = "components/header.jsx!github:floatdrop/plugin-jsx@1.0.1";
  var React,
      Router;
  function notDefault(fn) {
    return (function(e) {
      e.preventDefault();
      fn();
    });
  }
  return {
    setters: [function($__m) {
      React = $__m.default;
    }, function($__m) {
      Router = $__m.default;
    }],
    execute: function() {
      $__export('default', React.createClass({
        toggle: function() {
          this.props.hub.set({showHeader: {$set: !this.props.hub.get().showHeader}});
        },
        tempHide: function() {
          var style = this.refs.projects.getDOMNode().style;
          style.display = 'none';
          setTimeout(function() {
            style.display = '';
          }, 500);
        },
        isActive: function(pane, project) {
          if (project) {
            return pane === this.props.view.pane && this.props.projects.selected.slug === project ? 'active' : '';
          } else {
            return pane === this.props.view.pane ? 'active' : '';
          }
        },
        render: function() {
          var projects = this.props.projects.list;
          return React.createElement("div", {id: "header-component"}, React.createElement("h1", null, React.createElement("a", {
            onClick: this.toggle,
            href: "/#/"
          }, "Andrew Barr", React.createElement("br", null), "Photography")), React.createElement("a", {
            href: "#",
            onClick: notDefault(this.toggle),
            id: "header-toggle"
          }, React.createElement("i", {className: "fa fa-bars"})), React.createElement("nav", null, React.createElement("a", {
            className: this.isActive('about'),
            onClick: this.toggle,
            href: "/#/about"
          }, "About"), React.createElement("a", {
            className: this.isActive('gallery'),
            onClick: this.toggle,
            href: "/#/gallery"
          }, "Gallery"), React.createElement("span", {id: "project-link"}, "Projects", React.createElement("i", {className: "fa fa-angle-right"}), React.createElement("div", {
            id: "project-list",
            ref: "projects",
            onClick: this.tempHide
          }, projects.map(function(p) {
            return React.createElement("a", {
              className: this.isActive('project', p.slug),
              onClick: this.toggle,
              href: '/#/projects/' + p.slug
            }, p.name);
          }, this)))), React.createElement("div", {id: "contact"}, React.createElement("a", {href: "mailto:abarrphoto@gmail.com"}, "abarrphoto@gmail.com")));
        }
      }));
    }
  };
});

System.register("components/root.jsx!github:floatdrop/plugin-jsx@1.0.1", ["npm:react@0.12.2", "components/header.jsx!github:floatdrop/plugin-jsx@1.0.1", "components/home.jsx!github:floatdrop/plugin-jsx@1.0.1", "components/about.jsx!github:floatdrop/plugin-jsx@1.0.1", "components/project.jsx!github:floatdrop/plugin-jsx@1.0.1", "components/gallery.jsx!github:floatdrop/plugin-jsx@1.0.1"], function($__export) {
  "use strict";
  var __moduleName = "components/root.jsx!github:floatdrop/plugin-jsx@1.0.1";
  var React,
      Header,
      Home,
      About,
      Project,
      Gallery,
      allPhotos;
  return {
    setters: [function($__m) {
      React = $__m.default;
    }, function($__m) {
      Header = $__m.default;
    }, function($__m) {
      Home = $__m.default;
    }, function($__m) {
      About = $__m.default;
    }, function($__m) {
      Project = $__m.default;
    }, function($__m) {
      Gallery = $__m.default;
    }],
    execute: function() {
      allPhotos = function(projects) {
        var list = projects.list;
        var justGallery = projects.justGallery;
        return list.reduce(function(photos, project) {
          return photos.concat(project.photos);
        }, justGallery);
      };
      $__export('default', React.createClass({
        makeGalleryProject: function() {
          return {
            name: 'gallery',
            slug: 'gallery',
            photos: allPhotos(this.props.projects)
          };
        },
        renderPage: function() {
          switch (this.props._view.pane) {
            case 'about':
              return React.createElement(About, {hub: this.props.hub});
            case 'project':
              return React.createElement(Project, {
                hub: this.props.hub,
                project: this.props.projects.selected
              });
            case 'gallery':
              return React.createElement(Project, {
                hub: this.props.hub,
                project: this.makeGalleryProject()
              });
            default:
              return React.createElement(Home, {hub: this.props.hub});
          }
        },
        render: function() {
          var isGallery = this.props._view.pane === 'gallery';
          return React.createElement("div", {
            id: "root-component",
            className: this.props.hub.get().showHeader ? 'header-open' : ''
          }, React.createElement(Header, {
            view: this.props._view,
            projects: this.props.projects,
            hub: this.props.hub,
            showProjectNav: this.props.projects.showNav
          }), this.renderPage(), this.props.projects.selectedThumbIndex || this.props.hub.get().galleryThumbIndex ? React.createElement(Gallery, {
            hub: this.props.hub,
            project: isGallery ? this.makeGalleryProject() : this.props.projects.selected,
            index: isGallery ? this.props.hub.get().galleryThumbIndex : this.props.projects.selectedThumbIndex
          }) : null);
        }
      }));
    }
  };
});

System.register("boot.jsx!github:floatdrop/plugin-jsx@1.0.1", ["npm:react@0.12.2", "npm:governorjs@0.0.3", "npm:grapnel@0.5.8", "components/root.jsx!github:floatdrop/plugin-jsx@1.0.1", "stores/project", "stores/view"], function($__export) {
  "use strict";
  var __moduleName = "boot.jsx!github:floatdrop/plugin-jsx@1.0.1";
  var React,
      Governor,
      Router,
      Root,
      projectStore,
      viewStore,
      screen,
      rootEl,
      stateManager,
      router;
  return {
    setters: [function($__m) {
      React = $__m.default;
    }, function($__m) {
      Governor = $__m.default;
    }, function($__m) {
      Router = $__m.default;
    }, function($__m) {
      Root = $__m.default;
    }, function($__m) {
      projectStore = $__m.default;
    }, function($__m) {
      viewStore = $__m.default;
    }],
    execute: function() {
      screen = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
      rootEl = document.getElementById('root');
      stateManager = Governor.create({
        projects: projectStore,
        _view: viewStore
      }, function(state, hub) {
        React.render(React.createElement(Root, React.__spread({}, state, {hub: hub})), rootEl);
      });
      stateManager.hub.set({$set: {screen: screen}});
      router = new Router();
      router.get('/', function() {
        stateManager.hub.emit('selectPane', 'home');
      });
      router.get('/about', function() {
        stateManager.hub.emit('selectPane', 'about');
      });
      router.get('/gallery', function() {
        stateManager.hub.set({galleryThumbIndex: {$set: null}});
        stateManager.hub.emit('selectPane', 'gallery');
      });
      router.get('/gallery/:thumbIndex', function(ctx) {
        stateManager.hub.set({galleryThumbIndex: {$set: ctx.params.thumbIndex}});
        stateManager.hub.emit('selectPane', 'gallery');
      });
      router.get('/projects/:slug', function(ctx) {
        stateManager.hub.emit('selectProjectBySlug', ctx.params.slug);
        stateManager.hub.emit('selectPane', 'project');
      });
      router.get('/projects/:slug/gallery/:thumbIndex', function(ctx) {
        stateManager.hub.emit('selectThumbByIndex', ctx.params.slug, ctx.params.thumbIndex);
        stateManager.hub.emit('selectPane', 'project');
      });
    }
  };
});

//# sourceMappingURL=bundle.js.map