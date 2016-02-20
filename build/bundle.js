var app =
/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdateapp"];
/******/ 	this["webpackHotUpdateapp"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "3d0f212927bc3a43b6b0"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				fn[name] = __webpack_require__[name];
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(262);
	module.exports = __webpack_require__(115);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(20)
	  , hide      = __webpack_require__(17)
	  , redefine  = __webpack_require__(12)
	  , ctx       = __webpack_require__(15)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target && !own)redefine(target, key, out);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(78)('wks')
	  , uid    = __webpack_require__(25)
	  , Symbol = __webpack_require__(6).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(32)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(7)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(1)
	  , core    = __webpack_require__(20)
	  , fails   = __webpack_require__(7);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// add fake Function#toString
	// for correct work wrapped methods / constructors with methods like LoDash isNative
	var global    = __webpack_require__(6)
	  , hide      = __webpack_require__(17)
	  , SRC       = __webpack_require__(25)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(20).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  if(typeof val == 'function'){
	    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    val.hasOwnProperty('name') || hide(val, 'name', key);
	  }
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe)delete O[key];
	    hide(O, key, val);
	  }
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(16);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(23);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(2)
	  , createDesc = __webpack_require__(22);
	module.exports = __webpack_require__(10) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.h = exports.dom = exports.diff = exports.vnode = exports.string = exports.element = undefined;
	
	var _diff = __webpack_require__(55);
	
	var diff = _interopRequireWildcard(_diff);
	
	var _element = __webpack_require__(26);
	
	var vnode = _interopRequireWildcard(_element);
	
	var _string = __webpack_require__(241);
	
	var string = _interopRequireWildcard(_string);
	
	var _dom = __webpack_require__(239);
	
	var dom = _interopRequireWildcard(_dom);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var element = vnode.create;
	var h = vnode.create;
	
	exports.element = element;
	exports.string = string;
	exports.vnode = vnode;
	exports.diff = diff;
	exports.dom = dom;
	exports.h = h;

/***/ },
/* 19 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(16);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(5)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(17)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	exports.createTextElement = createTextElement;
	exports.createEmptyElement = createEmptyElement;
	exports.createThunkElement = createThunkElement;
	exports.isValidAttribute = isValidAttribute;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
	
	/**
	 * This function lets us create virtual nodes using a simple
	 * syntax. It is compatible with JSX transforms so you can use
	 * JSX to write nodes that will compile to this function.
	 *
	 * let node = element('div', { id: 'foo' }, [
	 *   element('a', { href: 'http://google.com' },
	 *     element('span', {}, 'Google'),
	 *     element('b', {}, 'Link')
	 *   )
	 * ])
	 */
	
	function create(type, attributes) {
	  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    children[_key - 2] = arguments[_key];
	  }
	
	  if (!type) throw new TypeError('element() needs a type.');
	
	  attributes = attributes || {};
	  children = (children || []).reduce(reduceChildren, []);
	
	  var key = typeof attributes.key === 'string' || typeof attributes.key === 'number' ? attributes.key : undefined;
	
	  delete attributes.key;
	
	  if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
	    return createThunkElement(type, key, attributes, children);
	  }
	
	  if (typeof type === 'function') {
	    return createThunkElement(_extends({ render: type }, type), key, attributes, children);
	  }
	
	  return {
	    attributes: attributes,
	    children: children,
	    type: type,
	    key: key
	  };
	}
	
	/**
	 * Cleans up the array of child elements.
	 * - Flattens nested arrays
	 * - Converts raw strings and numbers into vnodes
	 * - Filters out undefined elements
	 */
	
	function reduceChildren(children, vnode) {
	  if (typeof vnode === 'string' || typeof vnode === 'number') {
	    children.push(createTextElement(vnode));
	  } else if (vnode === null) {
	    children.push(createEmptyElement());
	  } else if (Array.isArray(vnode)) {
	    children = [].concat(_toConsumableArray(children), _toConsumableArray(vnode.reduce(reduceChildren, [])));
	  } else if (typeof vnode === 'undefined') {
	    throw new Error('vnode can\'t be undefined. Did you mean to use null?');
	  } else {
	    children.push(vnode);
	  }
	  return children;
	}
	
	/**
	 * Text nodes are stored as objects to keep things simple
	 */
	
	function createTextElement(text) {
	  return {
	    type: '#text',
	    nodeValue: text
	  };
	}
	
	/**
	 * Text nodes are stored as objects to keep things simple
	 */
	
	function createEmptyElement() {
	  return {
	    type: '#empty'
	  };
	}
	
	/**
	 * Lazily-rendered virtual nodes
	 */
	
	function createThunkElement(component, key, props, children) {
	  return {
	    type: '#thunk',
	    children: children,
	    props: props,
	    component: component,
	    key: key
	  };
	}
	
	/**
	 * Is a vnode a thunk?
	 */
	
	var isThunk = exports.isThunk = function isThunk(node) {
	  return node.type === '#thunk';
	};
	
	/**
	 * Is a vnode a text node?
	 */
	
	var isText = exports.isText = function isText(node) {
	  return node.type === '#text';
	};
	
	/**
	 * Is a vnode an empty placeholder?
	 */
	
	var isEmpty = exports.isEmpty = function isEmpty(node) {
	  return node.type === '#empty';
	};
	
	/**
	 * Determine if two virtual nodes are the same type
	 */
	
	var isSameThunk = exports.isSameThunk = function isSameThunk(left, right) {
	  return isThunk(left) && isThunk(right) && left.component === right.component;
	};
	
	/**
	 * Group an array of virtual elements by their key, using index as a fallback.
	 */
	
	var groupByKey = exports.groupByKey = function groupByKey(children) {
	  return children.reduce(function (acc, child, i) {
	    if (child != null && child !== false) {
	      acc.push({
	        key: String(child.key || i),
	        item: child,
	        index: i
	      });
	    }
	    return acc;
	  }, []);
	};
	
	/**
	 * Check if an attribute should be rendered into the DOM.
	 */
	
	function isValidAttribute(value) {
	  if (typeof value === 'boolean') return value;
	  if (typeof value === 'function') return false;
	  if (value === '') return true;
	  if (value === undefined) return false;
	  if (value === null) return false;
	  return true;
	}
	
	/**
	 * Create a node path, eg. (23,5,2,4) => '23.5.2.4'
	 */
	
	var createPath = exports.createPath = function createPath() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  return args.join('.');
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.overlayImgUrl = exports.thumbUrl = exports.imgUrl = exports.createPhotoA = exports.prevDef = undefined;
	
	var _deku = __webpack_require__(18);
	
	var _action_creators = __webpack_require__(43);
	
	var prevDef = function prevDef(fn) {
	  return function (e) {
	    e.preventDefault();
	    fn();
	  };
	};
	
	var createPhotoA = function createPhotoA(dispatch, url, i) {
	  return (0, _deku.element)('a', { href: '#', style: 'background-image: url(' + url + ')', onClick: prevDef(function () {
	      return dispatch((0, _action_creators.overlayOpen)(i));
	    }) });
	};
	
	var imgUrl = function imgUrl(originalSrc, width) {
	  var height = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  return height ? 'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',h_' + height + ',c_fill/' + originalSrc : 'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',c_fill/' + originalSrc;
	};
	
	var thumbUrl = function thumbUrl(dispatch, windowWidth, url, i) {
	  var threeAcrossWidth = windowWidth < 1024 ? parseInt(windowWidth * 0.31) : parseInt((windowWidth - 230) * 0.31);
	
	  var modifiedUrl = windowWidth < 568 ? imgUrl(url, parseInt(windowWidth), 200) : imgUrl(url, threeAcrossWidth, 250);
	
	  return createPhotoA(dispatch, modifiedUrl, i);
	};
	
	var overlayImgUrl = function overlayImgUrl(windowWidth, windowHeight, originalSrc) {
	  var width = parseInt(windowWidth * 0.9);
	  var height = parseInt(windowHeight);
	  return 'http://res.cloudinary.com/dv3yibyz2/image/fetch/w_' + width + ',h_' + height + ',c_fit/' + originalSrc;
	};
	
	exports.prevDef = prevDef;
	exports.createPhotoA = createPhotoA;
	exports.imgUrl = imgUrl;
	exports.thumbUrl = thumbUrl;
	exports.overlayImgUrl = overlayImgUrl;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(15)
	  , call        = __webpack_require__(71)
	  , isArrayIter = __webpack_require__(68)
	  , anObject    = __webpack_require__(4)
	  , toLength    = __webpack_require__(9)
	  , getIterFn   = __webpack_require__(82);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(2).setDesc
	  , has = __webpack_require__(8)
	  , TAG = __webpack_require__(5)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(15)
	  , IObject  = __webpack_require__(38)
	  , toObject = __webpack_require__(21)
	  , toLength = __webpack_require__(9)
	  , asc      = __webpack_require__(123);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(19)
	  , TAG = __webpack_require__(5)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(6)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(12)
	  , redefineAll    = __webpack_require__(39)
	  , forOf          = __webpack_require__(28)
	  , strictNew      = __webpack_require__(41)
	  , isObject       = __webpack_require__(3)
	  , fails          = __webpack_require__(7)
	  , $iterDetect    = __webpack_require__(47)
	  , setToStringTag = __webpack_require__(30);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO;
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        strictNew(target, C, NAME);
	        var that = new Base;
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    IS_WEAK || instance.forEach(function(val, key){
	      BUGGY_ZERO = 1 / key === -Infinity;
	    });
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(17)
	  , redefine = __webpack_require__(12)
	  , fails    = __webpack_require__(7)
	  , defined  = __webpack_require__(16)
	  , wks      = __webpack_require__(5);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , original = ''[KEY];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return original.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return original.call(string, this); }
	    );
	  }
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(19);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(12);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(6)
	  , $           = __webpack_require__(2)
	  , DESCRIPTORS = __webpack_require__(10)
	  , SPECIES     = __webpack_require__(5)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1)
	  , defined = __webpack_require__(16)
	  , fails   = __webpack_require__(7)
	  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec){
	  var exp  = {};
	  exp[KEY] = exec(trim);
	  $export($export.P + $export.F * fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  }), 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pageSelect = function pageSelect(page) {
	  return { type: 'SELECT_PAGE', page: page };
	};
	
	var sidebarToggle = function sidebarToggle() {
	  return { type: 'TOGGLE_SIDEBAR' };
	};
	
	var projectSelect = function projectSelect(project) {
	  return { type: 'SELECT_PROJECT', project: project };
	};
	
	var overlayClose = function overlayClose() {
	  return { type: 'CLOSE_OVERLAY' };
	};
	
	var overlayOpen = function overlayOpen(image) {
	  return { type: 'OPEN_OVERLAY', image: image };
	};
	
	exports.pageSelect = pageSelect;
	exports.sidebarToggle = sidebarToggle;
	exports.projectSelect = projectSelect;
	exports.overlayClose = overlayClose;
	exports.overlayOpen = overlayOpen;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(5)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(19);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(48)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(12)
	  , hide           = __webpack_require__(17)
	  , has            = __webpack_require__(8)
	  , Iterators      = __webpack_require__(29)
	  , $iterCreate    = __webpack_require__(72)
	  , setToStringTag = __webpack_require__(30)
	  , getProto       = __webpack_require__(2).getProto
	  , ITERATOR       = __webpack_require__(5)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(5)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 49 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	module.exports = Math.expm1 || function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(2).getDesc
	  , isObject = __webpack_require__(3)
	  , anObject = __webpack_require__(4);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(15)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(32)
	  , defined   = __webpack_require__(16);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(70)
	  , defined  = __webpack_require__(16);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(236)();
	// imports
	
	
	// module
	exports.push([module.id, "button, input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n  appearance: none;\n  background-color: #1565c0;\n  border: 0;\n  border-radius: 3px;\n  color: #fff;\n  cursor: pointer;\n  display: inline-block;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em;\n  -webkit-font-smoothing: antialiased;\n  font-weight: 600;\n  line-height: 1;\n  padding: 0.75em 1.5em;\n  text-decoration: none;\n  transition: background-color 150ms ease;\n  user-select: none;\n  vertical-align: middle;\n  white-space: nowrap; }\n  button:hover, button:focus, input[type=\"button\"]:hover, input[type=\"button\"]:focus, input[type=\"reset\"]:hover, input[type=\"reset\"]:focus, input[type=\"submit\"]:hover, input[type=\"submit\"]:focus {\n    background-color: #11519a;\n    color: #fff; }\n  button:disabled, input[type=\"button\"]:disabled, input[type=\"reset\"]:disabled, input[type=\"submit\"]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5; }\n    button:disabled:hover, input[type=\"button\"]:disabled:hover, input[type=\"reset\"]:disabled:hover, input[type=\"submit\"]:disabled:hover {\n      background-color: #1565c0; }\n\nfieldset {\n  background-color: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0; }\n\nlegend {\n  font-weight: 600;\n  margin-bottom: 0.375em;\n  padding: 0; }\n\nlabel {\n  display: block;\n  font-weight: 600;\n  margin-bottom: 0.375em; }\n\ninput,\nselect {\n  display: block;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em; }\n\ninput[type=\"color\"], input[type=\"date\"], input[type=\"datetime\"], input[type=\"datetime-local\"], input[type=\"email\"], input[type=\"month\"], input[type=\"number\"], input[type=\"password\"], input[type=\"search\"], input[type=\"tel\"], input[type=\"text\"], input[type=\"time\"], input[type=\"url\"], input[type=\"week\"], input:not([type]), textarea,\nselect[multiple] {\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);\n  box-sizing: border-box;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em;\n  margin-bottom: 0.75em;\n  padding: 0.5em;\n  transition: border-color 150ms ease;\n  width: 100%; }\n  input[type=\"color\"]:hover, input[type=\"date\"]:hover, input[type=\"datetime\"]:hover, input[type=\"datetime-local\"]:hover, input[type=\"email\"]:hover, input[type=\"month\"]:hover, input[type=\"number\"]:hover, input[type=\"password\"]:hover, input[type=\"search\"]:hover, input[type=\"tel\"]:hover, input[type=\"text\"]:hover, input[type=\"time\"]:hover, input[type=\"url\"]:hover, input[type=\"week\"]:hover, input:not([type]):hover, textarea:hover,\n  select[multiple]:hover {\n    border-color: #b1b1b1; }\n  input[type=\"color\"]:focus, input[type=\"date\"]:focus, input[type=\"datetime\"]:focus, input[type=\"datetime-local\"]:focus, input[type=\"email\"]:focus, input[type=\"month\"]:focus, input[type=\"number\"]:focus, input[type=\"password\"]:focus, input[type=\"search\"]:focus, input[type=\"tel\"]:focus, input[type=\"text\"]:focus, input[type=\"time\"]:focus, input[type=\"url\"]:focus, input[type=\"week\"]:focus, input:not([type]):focus, textarea:focus,\n  select[multiple]:focus {\n    border-color: #1565c0;\n    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06), 0 0 5px rgba(18, 89, 169, 0.7);\n    outline: none; }\n  input[type=\"color\"]:disabled, input[type=\"date\"]:disabled, input[type=\"datetime\"]:disabled, input[type=\"datetime-local\"]:disabled, input[type=\"email\"]:disabled, input[type=\"month\"]:disabled, input[type=\"number\"]:disabled, input[type=\"password\"]:disabled, input[type=\"search\"]:disabled, input[type=\"tel\"]:disabled, input[type=\"text\"]:disabled, input[type=\"time\"]:disabled, input[type=\"url\"]:disabled, input[type=\"week\"]:disabled, input:not([type]):disabled, textarea:disabled,\n  select[multiple]:disabled {\n    background-color: #f2f2f2;\n    cursor: not-allowed; }\n    input[type=\"color\"]:disabled:hover, input[type=\"date\"]:disabled:hover, input[type=\"datetime\"]:disabled:hover, input[type=\"datetime-local\"]:disabled:hover, input[type=\"email\"]:disabled:hover, input[type=\"month\"]:disabled:hover, input[type=\"number\"]:disabled:hover, input[type=\"password\"]:disabled:hover, input[type=\"search\"]:disabled:hover, input[type=\"tel\"]:disabled:hover, input[type=\"text\"]:disabled:hover, input[type=\"time\"]:disabled:hover, input[type=\"url\"]:disabled:hover, input[type=\"week\"]:disabled:hover, input:not([type]):disabled:hover, textarea:disabled:hover,\n    select[multiple]:disabled:hover {\n      border: 1px solid #ddd; }\n\ntextarea {\n  resize: vertical; }\n\n[type=\"search\"] {\n  appearance: none; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  display: inline;\n  margin-right: 0.375em; }\n\n[type=\"file\"] {\n  margin-bottom: 0.75em;\n  width: 100%; }\n\nselect {\n  margin-bottom: 1.5em;\n  max-width: 100%;\n  width: auto; }\n\nul,\nol {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n\ndl {\n  margin-bottom: 0.75em; }\n  dl dt {\n    font-weight: 600;\n    margin-top: 0.75em; }\n  dl dd {\n    margin: 0; }\n\ntable {\n  border-collapse: collapse;\n  margin: 0.75em 0;\n  table-layout: fixed;\n  width: 100%; }\n\nth {\n  border-bottom: 1px solid #a6a6a6;\n  font-weight: 600;\n  padding: 0.75em 0;\n  text-align: left; }\n\ntd {\n  border-bottom: 1px solid #ddd;\n  padding: 0.75em 0; }\n\ntr,\ntd,\nth {\n  vertical-align: middle; }\n\nbody {\n  color: #333;\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em;\n  line-height: 1.5; }\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-family: \"Helvetica Neue\", \"Helvetica\", \"Roboto\", \"Arial\", sans-serif;\n  font-size: 1em;\n  line-height: 1.2;\n  margin: 0 0 0.75em; }\n\np {\n  margin: 0 0 0.75em; }\n\na {\n  color: #1565c0;\n  text-decoration: none;\n  transition: color 150ms ease; }\n  a:active, a:focus, a:hover {\n    color: #104c90; }\n\nhr {\n  border-bottom: 1px solid #ddd;\n  border-left: 0;\n  border-right: 0;\n  border-top: 0;\n  margin: 1.5em 0; }\n\nimg,\npicture {\n  margin: 0;\n  max-width: 100%; }\n\nbody {\n  font-family: 'Open Sans', Arial, sans-serif;\n  box-sizing: border-box;\n  font-size: 14px; }\n\n#mount {\n  color: #000; }\n\na {\n  color: #949494;\n  text-decoration: none; }\n  a:visited {\n    color: #949494; }\n  a:hover {\n    color: #949494; }\n  a:active {\n    color: #949494; }\n\nh1 {\n  color: #fff;\n  font-size: 24px;\n  font-family: inherit;\n  font-weight: 400; }\n\n#sidebar-component {\n  color: #949494;\n  width: 215px;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  z-index: 1;\n  background-color: #000;\n  height: 100%;\n  -webkit-transition: left 0.5s ease;\n  -moz-transition: left 0.5s ease;\n  transition: left 0.5s ease; }\n  #sidebar-component.hidden {\n    left: -215px; }\n    #sidebar-component.hidden #projects-nav {\n      display: none !important; }\n\n#nav-title {\n  margin-top: 22px;\n  text-transform: uppercase;\n  line-height: 30px;\n  padding-left: 20px; }\n\n#nav-toggle {\n  color: #fff;\n  display: block;\n  background: #000;\n  padding: 8px 9px 7px;\n  text-align: center;\n  left: 215px;\n  top: 0;\n  position: absolute;\n  font-size: 20px;\n  line-height: 1; }\n\n#nav {\n  margin-top: 42px; }\n\n.nav-item {\n  text-transform: uppercase;\n  padding-bottom: 12px;\n  padding-top: 12px;\n  padding-left: 20px;\n  cursor: pointer; }\n  .nav-item i {\n    float: right;\n    padding-right: 10px; }\n\n.nav-item, #projects-nav li {\n  letter-spacing: 0.05em; }\n  .nav-item:hover, #projects-nav li:hover {\n    background-color: rgba(31, 89, 64, 0.8);\n    font-weight: 700;\n    color: #000; }\n\n#projects-link:hover #projects-nav {\n  display: block; }\n\n#projects-nav {\n  position: absolute;\n  display: block;\n  background: #000;\n  left: 215px;\n  right: 0;\n  top: 214px;\n  display: none;\n  width: -webkit-calc(100vw - 215px);\n  width: calc(100vw - 215px); }\n  #projects-nav li {\n    text-transform: uppercase;\n    padding: 12px 10px;\n    font-weight: 400;\n    color: #949494;\n    word-wrap: break-word; }\n\n#nav li.active {\n  background: #1F5940;\n  color: #000;\n  font-weight: 700; }\n\n#contact {\n  position: absolute;\n  bottom: 20px;\n  padding-left: 20px; }\n\n#title-container {\n  top: 0;\n  right: 0;\n  left: 47px;\n  position: fixed;\n  background-color: #fff; }\n\n#title {\n  color: #000;\n  margin: 0;\n  padding: 0;\n  font-size: 17px;\n  text-align: center;\n  text-transform: uppercase;\n  line-height: 42px; }\n\n#content-component {\n  box-sizing: border-box;\n  z-index: 0;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: #fff;\n  margin-top: 42px; }\n\n.page-title {\n  color: #000;\n  font-size: 30px;\n  font-weight: normal;\n  letter-spacing: 0.4em;\n  padding-top: 24px;\n  margin-bottom: 0;\n  text-transform: uppercase;\n  word-wrap: break-word; }\n\n.page-component {\n  padding: 0 5%;\n  box-sizing: border-box; }\n\n.thumbs {\n  margin-top: 5%; }\n  .thumbs a {\n    box-sizing: border-box;\n    display: block;\n    width: 100%;\n    height: 200px;\n    margin: 0 0 5%;\n    background-size: cover;\n    background-position: center center;\n    background-repeat: no-repeat; }\n\n#about-component {\n  height: 100%;\n  background-position: center -46px;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-color: #000; }\n\n#about-p {\n  position: absolute;\n  bottom: 2%;\n  right: 5%;\n  left: 5%;\n  color: #fff;\n  line-height: 28px;\n  font-weight: 300; }\n\n#project-blurb {\n  margin-top: 5%; }\n\n.overlay-open {\n  overflow: hidden; }\n\n#overlay-component {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  background-color: #000;\n  z-index: 2; }\n  #overlay-component i {\n    color: #fff;\n    z-index: 3;\n    cursor: pointer; }\n\n#overlay-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  padding: 0 2%;\n  box-sizing: border-box; }\n\n#left-arrow {\n  font-size: 38px; }\n\n#right-arrow {\n  font-size: 38px; }\n\n#overlay-image-div {\n  height: 96%;\n  width: 90%;\n  background-position: center center;\n  background-repeat: no-repeat;\n  background-size: contain; }\n\n#close-button {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  font-size: 30px; }\n\n.overlay-open {\n  overflow: hidden; }\n\n@media only screen and (min-width: 568px) {\n  #projects-nav {\n    width: 170px; }\n  .thumbs {\n    margin-top: 2.5%; }\n    .thumbs a {\n      display: inline-block;\n      width: 31%;\n      margin-bottom: 3%;\n      margin-right: 3.5%; }\n      .thumbs a:nth-child(3n+3) {\n        margin-right: 0; } }\n\n@media only screen and (min-width: 1024px) {\n  #nav-title, .nav-item, #contact {\n    padding-left: 25px; }\n  #nav-toggle {\n    display: none; }\n  #sidebar-component {\n    width: 230px; }\n    #sidebar-component.hidden {\n      left: 0; }\n  #projects-nav {\n    left: 230px;\n    cursor: pointer; }\n  #projects-link:hover #projects-nav {\n    display: block !important; }\n  #content-component {\n    left: 230px;\n    margin-top: 0; }\n  #title-container {\n    display: none; }\n  .page-title {\n    padding-top: 31px; }\n  #about-component {\n    background-position: center center; }\n  #about-p {\n    font-size: 16px;\n    line-height: 32px;\n    bottom: 10%;\n    right: 20%; }\n  .thumbs a {\n    height: 250px; }\n  #project-blurb {\n    margin-top: 2.5%;\n    font-size: 16px;\n    line-height: 26px; }\n  #close-button {\n    top: 30px;\n    right: 30px; } }\n", ""]);
	
	// exports


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Actions = undefined;
	exports.diffAttributes = diffAttributes;
	exports.diffChildren = diffChildren;
	exports.diffNode = diffNode;
	
	var _element = __webpack_require__(26);
	
	var _dift = __webpack_require__(243);
	
	var diffActions = _interopRequireWildcard(_dift);
	
	var _unionType = __webpack_require__(260);
	
	var _unionType2 = _interopRequireDefault(_unionType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var Any = function Any() {
	  return true;
	};
	var Path = function Path() {
	  return String;
	};
	
	/**
	 * Patch actions
	 */
	
	var Actions = exports.Actions = (0, _unionType2.default)({
	  setAttribute: [String, Any, Any],
	  removeAttribute: [String, Any],
	  insertChild: [Any, Number, Path],
	  removeChild: [Number],
	  updateChild: [Number, Array],
	  updateChildren: [Array],
	  insertBefore: [Number],
	  replaceNode: [Any, Any, Path],
	  removeNode: [Any],
	  sameNode: [],
	  updateThunk: [Any, Any, Path]
	});
	
	/**
	 * Diff two attribute objects and return an array of actions that represent
	 * changes to transform the old object into the new one.
	 */
	
	function diffAttributes(previous, next) {
	  var setAttribute = Actions.setAttribute;
	  var removeAttribute = Actions.removeAttribute;
	
	  var changes = [];
	  var pAttrs = previous.attributes;
	  var nAttrs = next.attributes;
	
	  for (var name in nAttrs) {
	    if (nAttrs[name] !== pAttrs[name]) {
	      changes.push(setAttribute(name, nAttrs[name], pAttrs[name]));
	    }
	  }
	
	  for (var name in pAttrs) {
	    if (!(name in nAttrs)) {
	      changes.push(removeAttribute(name, pAttrs[name]));
	    }
	  }
	
	  return changes;
	}
	
	/**
	 * Compare two arrays of virtual nodes and return an array of actions
	 * to transform the left into the right. A starting path is supplied that use
	 * recursively to build up unique paths for each node.
	 */
	
	function diffChildren(previous, next, parentPath) {
	  var insertChild = Actions.insertChild;
	  var updateChild = Actions.updateChild;
	  var removeChild = Actions.removeChild;
	  var insertBefore = Actions.insertBefore;
	  var updateChildren = Actions.updateChildren;
	  var CREATE = diffActions.CREATE;
	  var UPDATE = diffActions.UPDATE;
	  var MOVE = diffActions.MOVE;
	  var REMOVE = diffActions.REMOVE;
	
	  var previousChildren = (0, _element.groupByKey)(previous.children);
	  var nextChildren = (0, _element.groupByKey)(next.children);
	  var key = function key(a) {
	    return a.key;
	  };
	  var changes = [];
	
	  function effect(type, prev, next, pos) {
	    var nextPath = next ? (0, _element.createPath)(parentPath, next.key == null ? next.index : next.key) : null;
	    switch (type) {
	      case CREATE:
	        {
	          changes.push(insertChild(next.item, pos, nextPath));
	          break;
	        }
	      case UPDATE:
	        {
	          var actions = diffNode(prev.item, next.item, nextPath);
	          if (actions.length > 0) {
	            changes.push(updateChild(prev.index, actions));
	          }
	          break;
	        }
	      case MOVE:
	        {
	          var actions = diffNode(prev.item, next.item, nextPath);
	          actions.push(insertBefore(pos));
	          changes.push(updateChild(prev.index, actions));
	          break;
	        }
	      case REMOVE:
	        {
	          changes.push(removeChild(prev.index));
	          break;
	        }
	    }
	  }
	
	  (0, diffActions.default)(previousChildren, nextChildren, effect, key);
	
	  return updateChildren(changes);
	}
	
	/**
	 * Compare two virtual nodes and return an array of changes to turn the left
	 * into the right.
	 */
	
	function diffNode(prev, next, path) {
	  var changes = [];
	  var replaceNode = Actions.replaceNode;
	  var setAttribute = Actions.setAttribute;
	  var sameNode = Actions.sameNode;
	  var removeNode = Actions.removeNode;
	  var updateThunk = Actions.updateThunk;
	
	  // No left node to compare it to
	  // TODO: This should just return a createNode action
	
	  if (prev === null || prev === undefined) {
	    throw new Error('Left node must not be null or undefined');
	  }
	
	  // Bail out and skip updating this whole sub-tree
	  if (prev === next) {
	    changes.push(sameNode());
	    return changes;
	  }
	
	  // Remove
	  if (prev != null && next == null) {
	    changes.push(removeNode(prev));
	    return changes;
	  }
	
	  // Replace
	  if (prev.type !== next.type) {
	    changes.push(replaceNode(prev, next, path));
	    return changes;
	  }
	
	  // Text
	  if ((0, _element.isText)(next)) {
	    if (prev.nodeValue !== next.nodeValue) {
	      changes.push(setAttribute('nodeValue', next.nodeValue, prev.nodeValue));
	    }
	    return changes;
	  }
	
	  // Thunk
	  if ((0, _element.isThunk)(next)) {
	    if ((0, _element.isSameThunk)(prev, next)) {
	      changes.push(updateThunk(prev, next, path));
	    } else {
	      changes.push(replaceNode(prev, next, path));
	    }
	    return changes;
	  }
	
	  // Empty
	  if ((0, _element.isEmpty)(next)) {
	    return changes;
	  }
	
	  changes = diffAttributes(prev, next);
	  changes.push(diffChildren(prev, next, path));
	
	  return changes;
	}

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createElement;
	
	var _element = __webpack_require__(26);
	
	var _setAttribute = __webpack_require__(85);
	
	var _svg = __webpack_require__(240);
	
	var _svg2 = _interopRequireDefault(_svg);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var cache = {};
	
	/**
	 * Create a real DOM element from a virtual element, recursively looping down.
	 * When it finds custom elements it will render them, cache them, and keep going,
	 * so they are treated like any other native element.
	 */
	
	function createElement(vnode, path, dispatch, context) {
	  if ((0, _element.isText)(vnode)) {
	    var value = typeof vnode.nodeValue === 'string' || typeof vnode.nodeValue === 'number' ? vnode.nodeValue : '';
	    return document.createTextNode(value);
	  }
	
	  if ((0, _element.isEmpty)(vnode)) {
	    return document.createElement('noscript');
	  }
	
	  if ((0, _element.isThunk)(vnode)) {
	    var props = vnode.props;
	    var component = vnode.component;
	    var children = vnode.children;
	    var render = component.render;
	    var onCreate = component.onCreate;
	
	    var model = {
	      children: children,
	      props: props,
	      path: path,
	      dispatch: dispatch,
	      context: context
	    };
	    var output = render(model);
	    var _DOMElement = createElement(output, (0, _element.createPath)(path, output.key || '0'), dispatch, context);
	    if (onCreate) onCreate(model);
	    vnode.state = {
	      vnode: output,
	      model: model
	    };
	    return _DOMElement;
	  }
	
	  var cached = cache[vnode.type];
	
	  if (typeof cached === 'undefined') {
	    cached = cache[vnode.type] = _svg2.default.isElement(vnode.type) ? document.createElementNS(_svg2.default.namespace, vnode.type) : document.createElement(vnode.type);
	  }
	
	  var DOMElement = cached.cloneNode(false);
	
	  for (var name in vnode.attributes) {
	    (0, _setAttribute.setAttribute)(DOMElement, name, vnode.attributes[name]);
	  }
	
	  vnode.children.forEach(function (node, index) {
	    if (node === null || node === undefined) {
	      return;
	    }
	    var child = createElement(node, (0, _element.createPath)(path, node.key || index), dispatch, context);
	    DOMElement.appendChild(child);
	  });
	
	  return DOMElement;
	}

/***/ },
/* 57 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14);
	var buildURL = __webpack_require__(100);
	var parseHeaders = __webpack_require__(105);
	var transformData = __webpack_require__(59);
	var isURLSameOrigin = __webpack_require__(104);
	var btoa = window.btoa || __webpack_require__(99);
	
	module.exports = function xhrAdapter(resolve, reject, config) {
	  var requestData = config.data;
	  var requestHeaders = config.headers;
	
	  if (utils.isFormData(requestData)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }
	
	  var request = new XMLHttpRequest();
	
	  // For IE 8/9 CORS support
	  // Only supports POST and GET calls and doesn't returns the response headers.
	  if (window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	    request = new window.XDomainRequest();
	  }
	
	  // HTTP basic authentication
	  if (config.auth) {
	    var username = config.auth.username || '';
	    var password = config.auth.password || '';
	    requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	  }
	
	  request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	  // Set the request timeout in MS
	  request.timeout = config.timeout;
	
	  // Listen for ready state
	  request.onload = function handleLoad() {
	    if (!request) {
	      return;
	    }
	    // Prepare the response
	    var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	    var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	    var response = {
	      data: transformData(
	        responseData,
	        responseHeaders,
	        config.transformResponse
	      ),
	      // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	      status: request.status === 1223 ? 204 : request.status,
	      statusText: request.status === 1223 ? 'No Content' : request.statusText,
	      headers: responseHeaders,
	      config: config
	    };
	
	    // Resolve or reject the Promise based on the status
	    ((response.status >= 200 && response.status < 300) ||
	     (!('status' in request) && response.responseText) ?
	      resolve :
	      reject)(response);
	
	    // Clean up request
	    request = null;
	  };
	
	  // Handle low level network errors
	  request.onerror = function handleError() {
	    // Real errors are hidden from us by the browser
	    // onerror should only fire if it's a network error
	    reject(new Error('Network Error'));
	
	    // Clean up request
	    request = null;
	  };
	
	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(102);
	
	    // Add xsrf header
	    var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;
	
	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName] = xsrfValue;
	    }
	  }
	
	  // Add headers to the request
	  if ('setRequestHeader' in request) {
	    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	        // Remove Content-Type if data is undefined
	        delete requestHeaders[key];
	      } else {
	        // Otherwise add header to the request
	        request.setRequestHeader(key, val);
	      }
	    });
	  }
	
	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }
	
	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }
	
	  if (utils.isArrayBuffer(requestData)) {
	    requestData = new DataView(requestData);
	  }
	
	  // Send the request
	  request.send(requestData);
	};


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(13)
	  , toLength  = __webpack_require__(9)
	  , toIndex   = __webpack_require__(31);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(2)
	  , hide         = __webpack_require__(17)
	  , redefineAll  = __webpack_require__(39)
	  , ctx          = __webpack_require__(15)
	  , strictNew    = __webpack_require__(41)
	  , defined      = __webpack_require__(16)
	  , forOf        = __webpack_require__(28)
	  , $iterDefine  = __webpack_require__(46)
	  , step         = __webpack_require__(73)
	  , ID           = __webpack_require__(25)('id')
	  , $has         = __webpack_require__(8)
	  , isObject     = __webpack_require__(3)
	  , setSpecies   = __webpack_require__(40)
	  , DESCRIPTORS  = __webpack_require__(10)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;
	
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(28)
	  , classof = __webpack_require__(34);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide              = __webpack_require__(17)
	  , redefineAll       = __webpack_require__(39)
	  , anObject          = __webpack_require__(4)
	  , isObject          = __webpack_require__(3)
	  , strictNew         = __webpack_require__(41)
	  , forOf             = __webpack_require__(28)
	  , createArrayMethod = __webpack_require__(33)
	  , $has              = __webpack_require__(8)
	  , WEAK              = __webpack_require__(25)('weak')
	  , isExtensible      = Object.isExtensible || isObject
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for frozen keys
	var frozenStore = function(that){
	  return that._l || (that._l = new FrozenStore);
	};
	var FrozenStore = function(){
	  this.a = [];
	};
	var findFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function(key){
	    var entry = findFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(anObject(key))){
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    } return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(3)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(4);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(13)
	  , getNames  = __webpack_require__(2).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(29)
	  , ITERATOR   = __webpack_require__(5)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(3)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(3)
	  , cof      = __webpack_require__(19)
	  , MATCH    = __webpack_require__(5)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(4);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(2)
	  , descriptor     = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(30)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(2)
	  , toIObject = __webpack_require__(13)
	  , isEnum    = $.isEnum;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = $.getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var $        = __webpack_require__(2)
	  , anObject = __webpack_require__(4)
	  , Reflect  = __webpack_require__(6).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = $.getNames(anObject(it))
	    , getSymbols = $.getSymbols;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-string-pad-left-right
	var toLength = __webpack_require__(9)
	  , repeat   = __webpack_require__(80)
	  , defined  = __webpack_require__(16);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength)return S;
	  if(fillStr == '')fillStr = ' ';
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(32)
	  , defined   = __webpack_require__(16);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(15)
	  , invoke             = __webpack_require__(37)
	  , html               = __webpack_require__(67)
	  , cel                = __webpack_require__(64)
	  , global             = __webpack_require__(6)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(19)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(34)
	  , ITERATOR  = __webpack_require__(5)('iterator')
	  , Iterators = __webpack_require__(29);
	module.exports = __webpack_require__(20).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(24)
	  , step             = __webpack_require__(73)
	  , Iterators        = __webpack_require__(29)
	  , toIObject        = __webpack_require__(13);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(46)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.insertAtIndex = undefined;
	exports.default = patch;
	
	var _setAttribute2 = __webpack_require__(85);
	
	var _element = __webpack_require__(26);
	
	var _createElement = __webpack_require__(56);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	var _diff = __webpack_require__(55);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Modify a DOM element given an array of actions. A context can be set
	 * that will be used to render any custom elements.
	 */
	
	function patch(dispatch, context) {
	  return function (DOMElement, action) {
	    _diff.Actions.case({
	      setAttribute: function setAttribute(name, value, previousValue) {
	        (0, _setAttribute2.setAttribute)(DOMElement, name, value, previousValue);
	      },
	      removeAttribute: function removeAttribute(name, previousValue) {
	        (0, _setAttribute2.removeAttribute)(DOMElement, name, previousValue);
	      },
	      insertBefore: function insertBefore(index) {
	        insertAtIndex(DOMElement.parentNode, index, DOMElement);
	      },
	      sameNode: function sameNode() {},
	      updateChildren: function updateChildren(changes) {
	        // Create a clone of the children so we can reference them later
	        // using their original position even if they move around
	        var childNodes = Array.prototype.slice.apply(DOMElement.childNodes);
	
	        changes.forEach(function (change) {
	          _diff.Actions.case({
	            insertChild: function insertChild(vnode, index, path) {
	              insertAtIndex(DOMElement, index, (0, _createElement2.default)(vnode, path, dispatch, context));
	            },
	            removeChild: function removeChild(index) {
	              DOMElement.removeChild(childNodes[index]);
	            },
	            updateChild: function updateChild(index, actions) {
	              var update = patch(dispatch, context);
	              actions.forEach(function (action) {
	                return update(childNodes[index], action);
	              });
	            }
	          }, change);
	        });
	      },
	      updateThunk: function updateThunk(prev, next, path) {
	        var props = next.props;
	        var children = next.children;
	        var component = next.component;
	        var render = component.render;
	        var onUpdate = component.onUpdate;
	
	        var prevNode = prev.state.vnode;
	        var model = {
	          children: children,
	          props: props,
	          path: path,
	          dispatch: dispatch,
	          context: context
	        };
	        var nextNode = render(model);
	        var changes = (0, _diff.diffNode)(prevNode, nextNode, (0, _element.createPath)(path, '0'));
	        DOMElement = changes.reduce(patch(dispatch, context), DOMElement);
	        if (onUpdate) onUpdate(model);
	        next.state = {
	          vnode: nextNode,
	          model: model
	        };
	      },
	      replaceNode: function replaceNode(prev, next, path) {
	        var newEl = (0, _createElement2.default)(next, path, dispatch, context);
	        var parentEl = DOMElement.parentNode;
	        if (parentEl) parentEl.replaceChild(newEl, DOMElement);
	        DOMElement = newEl;
	        removeThunks(prev);
	      },
	      removeNode: function removeNode(prev) {
	        removeThunks(prev);
	        DOMElement.parentNode.removeChild(DOMElement);
	        DOMElement = null;
	      }
	    }, action);
	
	    return DOMElement;
	  };
	}
	
	/**
	 * Recursively remove all thunks
	 */
	
	function removeThunks(vnode) {
	  while ((0, _element.isThunk)(vnode)) {
	    var _vnode = vnode;
	    var component = _vnode.component;
	    var state = _vnode.state;
	    var onRemove = component.onRemove;
	    var model = state.model;
	
	    if (onRemove) onRemove(model);
	    vnode = state.vnode;
	  }
	
	  if (vnode.children) {
	    for (var i = 0; i < vnode.children.length; i++) {
	      removeThunks(vnode.children[i]);
	    }
	  }
	}
	
	/**
	 * Slightly nicer insertBefore
	 */
	
	var insertAtIndex = exports.insertAtIndex = function insertAtIndex(parent, index, el) {
	  var target = parent.childNodes[index];
	  if (target) {
	    parent.insertBefore(el, target);
	  } else {
	    parent.appendChild(el);
	  }
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeAttribute = removeAttribute;
	exports.setAttribute = setAttribute;
	
	var _svgAttributeNamespace = __webpack_require__(259);
	
	var _svgAttributeNamespace2 = _interopRequireDefault(_svgAttributeNamespace);
	
	var _element = __webpack_require__(26);
	
	var _indexOf = __webpack_require__(244);
	
	var _indexOf2 = _interopRequireDefault(_indexOf);
	
	var _setify = __webpack_require__(256);
	
	var _setify2 = _interopRequireDefault(_setify);
	
	var _events = __webpack_require__(238);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function removeAttribute(DOMElement, name, previousValue) {
	  var eventType = _events2.default[name];
	  if (eventType) {
	    if (typeof previousValue === 'function') {
	      DOMElement.removeEventListener(eventType, previousValue);
	    }
	    return;
	  }
	  switch (name) {
	    case 'checked':
	    case 'disabled':
	    case 'selected':
	      DOMElement[name] = false;
	      break;
	    case 'innerHTML':
	    case 'nodeValue':
	      DOMElement.innerHTML = '';
	      break;
	    case 'value':
	      DOMElement.value = '';
	      break;
	    default:
	      DOMElement.removeAttribute(name);
	      break;
	  }
	}
	
	function setAttribute(DOMElement, name, value, previousValue) {
	  var eventType = _events2.default[name];
	  if (value === previousValue) {
	    return;
	  }
	  if (eventType) {
	    if (typeof previousValue === 'function') {
	      DOMElement.removeEventListener(eventType, previousValue);
	    }
	    DOMElement.addEventListener(eventType, value);
	    return;
	  }
	  if (!(0, _element.isValidAttribute)(value)) {
	    removeAttribute(DOMElement, name, previousValue);
	    return;
	  }
	  switch (name) {
	    case 'checked':
	    case 'disabled':
	    case 'innerHTML':
	    case 'nodeValue':
	      DOMElement[name] = value;
	      break;
	    case 'selected':
	      DOMElement.selected = value;
	      // Fix for IE/Safari where select is not correctly selected on change
	      if (DOMElement.tagName === 'OPTION' && DOMElement.parentNode) {
	        var select = DOMElement.parentNode;
	        select.selectedIndex = (0, _indexOf2.default)(select.options, DOMElement);
	      }
	      break;
	    case 'value':
	      (0, _setify2.default)(DOMElement, value);
	      break;
	    default:
	      DOMElement.setAttributeNS((0, _svgAttributeNamespace2.default)(name), name, value);
	      break;
	  }
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */
	
	;(function() {
	
	/**
	 * Block-Level Grammar
	 */
	
	var block = {
	  newline: /^\n+/,
	  code: /^( {4}[^\n]+\n*)+/,
	  fences: noop,
	  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
	  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
	  nptable: noop,
	  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
	  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
	  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
	  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
	  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
	  table: noop,
	  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
	  text: /^[^\n]+/
	};
	
	block.bullet = /(?:[*+-]|\d+\.)/;
	block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
	block.item = replace(block.item, 'gm')
	  (/bull/g, block.bullet)
	  ();
	
	block.list = replace(block.list)
	  (/bull/g, block.bullet)
	  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
	  ('def', '\\n+(?=' + block.def.source + ')')
	  ();
	
	block.blockquote = replace(block.blockquote)
	  ('def', block.def)
	  ();
	
	block._tag = '(?!(?:'
	  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
	  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
	  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';
	
	block.html = replace(block.html)
	  ('comment', /<!--[\s\S]*?-->/)
	  ('closed', /<(tag)[\s\S]+?<\/\1>/)
	  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
	  (/tag/g, block._tag)
	  ();
	
	block.paragraph = replace(block.paragraph)
	  ('hr', block.hr)
	  ('heading', block.heading)
	  ('lheading', block.lheading)
	  ('blockquote', block.blockquote)
	  ('tag', '<' + block._tag)
	  ('def', block.def)
	  ();
	
	/**
	 * Normal Block Grammar
	 */
	
	block.normal = merge({}, block);
	
	/**
	 * GFM Block Grammar
	 */
	
	block.gfm = merge({}, block.normal, {
	  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
	  paragraph: /^/,
	  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
	});
	
	block.gfm.paragraph = replace(block.paragraph)
	  ('(?!', '(?!'
	    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
	    + block.list.source.replace('\\1', '\\3') + '|')
	  ();
	
	/**
	 * GFM + Tables Block Grammar
	 */
	
	block.tables = merge({}, block.gfm, {
	  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
	  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
	});
	
	/**
	 * Block Lexer
	 */
	
	function Lexer(options) {
	  this.tokens = [];
	  this.tokens.links = {};
	  this.options = options || marked.defaults;
	  this.rules = block.normal;
	
	  if (this.options.gfm) {
	    if (this.options.tables) {
	      this.rules = block.tables;
	    } else {
	      this.rules = block.gfm;
	    }
	  }
	}
	
	/**
	 * Expose Block Rules
	 */
	
	Lexer.rules = block;
	
	/**
	 * Static Lex Method
	 */
	
	Lexer.lex = function(src, options) {
	  var lexer = new Lexer(options);
	  return lexer.lex(src);
	};
	
	/**
	 * Preprocessing
	 */
	
	Lexer.prototype.lex = function(src) {
	  src = src
	    .replace(/\r\n|\r/g, '\n')
	    .replace(/\t/g, '    ')
	    .replace(/\u00a0/g, ' ')
	    .replace(/\u2424/g, '\n');
	
	  return this.token(src, true);
	};
	
	/**
	 * Lexing
	 */
	
	Lexer.prototype.token = function(src, top, bq) {
	  var src = src.replace(/^ +$/gm, '')
	    , next
	    , loose
	    , cap
	    , bull
	    , b
	    , item
	    , space
	    , i
	    , l;
	
	  while (src) {
	    // newline
	    if (cap = this.rules.newline.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[0].length > 1) {
	        this.tokens.push({
	          type: 'space'
	        });
	      }
	    }
	
	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      cap = cap[0].replace(/^ {4}/gm, '');
	      this.tokens.push({
	        type: 'code',
	        text: !this.options.pedantic
	          ? cap.replace(/\n+$/, '')
	          : cap
	      });
	      continue;
	    }
	
	    // fences (gfm)
	    if (cap = this.rules.fences.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'code',
	        lang: cap[2],
	        text: cap[3] || ''
	      });
	      continue;
	    }
	
	    // heading
	    if (cap = this.rules.heading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[1].length,
	        text: cap[2]
	      });
	      continue;
	    }
	
	    // table no leading pipe (gfm)
	    if (top && (cap = this.rules.nptable.exec(src))) {
	      src = src.substring(cap[0].length);
	
	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/\n$/, '').split('\n')
	      };
	
	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }
	
	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i].split(/ *\| */);
	      }
	
	      this.tokens.push(item);
	
	      continue;
	    }
	
	    // lheading
	    if (cap = this.rules.lheading.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'heading',
	        depth: cap[2] === '=' ? 1 : 2,
	        text: cap[1]
	      });
	      continue;
	    }
	
	    // hr
	    if (cap = this.rules.hr.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'hr'
	      });
	      continue;
	    }
	
	    // blockquote
	    if (cap = this.rules.blockquote.exec(src)) {
	      src = src.substring(cap[0].length);
	
	      this.tokens.push({
	        type: 'blockquote_start'
	      });
	
	      cap = cap[0].replace(/^ *> ?/gm, '');
	
	      // Pass `top` to keep the current
	      // "toplevel" state. This is exactly
	      // how markdown.pl works.
	      this.token(cap, top, true);
	
	      this.tokens.push({
	        type: 'blockquote_end'
	      });
	
	      continue;
	    }
	
	    // list
	    if (cap = this.rules.list.exec(src)) {
	      src = src.substring(cap[0].length);
	      bull = cap[2];
	
	      this.tokens.push({
	        type: 'list_start',
	        ordered: bull.length > 1
	      });
	
	      // Get each top-level item.
	      cap = cap[0].match(this.rules.item);
	
	      next = false;
	      l = cap.length;
	      i = 0;
	
	      for (; i < l; i++) {
	        item = cap[i];
	
	        // Remove the list item's bullet
	        // so it is seen as the next token.
	        space = item.length;
	        item = item.replace(/^ *([*+-]|\d+\.) +/, '');
	
	        // Outdent whatever the
	        // list item contains. Hacky.
	        if (~item.indexOf('\n ')) {
	          space -= item.length;
	          item = !this.options.pedantic
	            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
	            : item.replace(/^ {1,4}/gm, '');
	        }
	
	        // Determine whether the next list item belongs here.
	        // Backpedal if it does not belong in this list.
	        if (this.options.smartLists && i !== l - 1) {
	          b = block.bullet.exec(cap[i + 1])[0];
	          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
	            src = cap.slice(i + 1).join('\n') + src;
	            i = l - 1;
	          }
	        }
	
	        // Determine whether item is loose or not.
	        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
	        // for discount behavior.
	        loose = next || /\n\n(?!\s*$)/.test(item);
	        if (i !== l - 1) {
	          next = item.charAt(item.length - 1) === '\n';
	          if (!loose) loose = next;
	        }
	
	        this.tokens.push({
	          type: loose
	            ? 'loose_item_start'
	            : 'list_item_start'
	        });
	
	        // Recurse.
	        this.token(item, false, bq);
	
	        this.tokens.push({
	          type: 'list_item_end'
	        });
	      }
	
	      this.tokens.push({
	        type: 'list_end'
	      });
	
	      continue;
	    }
	
	    // html
	    if (cap = this.rules.html.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: this.options.sanitize
	          ? 'paragraph'
	          : 'html',
	        pre: !this.options.sanitizer
	          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
	        text: cap[0]
	      });
	      continue;
	    }
	
	    // def
	    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.links[cap[1].toLowerCase()] = {
	        href: cap[2],
	        title: cap[3]
	      };
	      continue;
	    }
	
	    // table (gfm)
	    if (top && (cap = this.rules.table.exec(src))) {
	      src = src.substring(cap[0].length);
	
	      item = {
	        type: 'table',
	        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
	        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
	        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
	      };
	
	      for (i = 0; i < item.align.length; i++) {
	        if (/^ *-+: *$/.test(item.align[i])) {
	          item.align[i] = 'right';
	        } else if (/^ *:-+: *$/.test(item.align[i])) {
	          item.align[i] = 'center';
	        } else if (/^ *:-+ *$/.test(item.align[i])) {
	          item.align[i] = 'left';
	        } else {
	          item.align[i] = null;
	        }
	      }
	
	      for (i = 0; i < item.cells.length; i++) {
	        item.cells[i] = item.cells[i]
	          .replace(/^ *\| *| *\| *$/g, '')
	          .split(/ *\| */);
	      }
	
	      this.tokens.push(item);
	
	      continue;
	    }
	
	    // top-level paragraph
	    if (top && (cap = this.rules.paragraph.exec(src))) {
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'paragraph',
	        text: cap[1].charAt(cap[1].length - 1) === '\n'
	          ? cap[1].slice(0, -1)
	          : cap[1]
	      });
	      continue;
	    }
	
	    // text
	    if (cap = this.rules.text.exec(src)) {
	      // Top-level should never reach here.
	      src = src.substring(cap[0].length);
	      this.tokens.push({
	        type: 'text',
	        text: cap[0]
	      });
	      continue;
	    }
	
	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }
	
	  return this.tokens;
	};
	
	/**
	 * Inline-Level Grammar
	 */
	
	var inline = {
	  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
	  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
	  url: noop,
	  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
	  link: /^!?\[(inside)\]\(href\)/,
	  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
	  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
	  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
	  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
	  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
	  br: /^ {2,}\n(?!\s*$)/,
	  del: noop,
	  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
	};
	
	inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
	inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
	
	inline.link = replace(inline.link)
	  ('inside', inline._inside)
	  ('href', inline._href)
	  ();
	
	inline.reflink = replace(inline.reflink)
	  ('inside', inline._inside)
	  ();
	
	/**
	 * Normal Inline Grammar
	 */
	
	inline.normal = merge({}, inline);
	
	/**
	 * Pedantic Inline Grammar
	 */
	
	inline.pedantic = merge({}, inline.normal, {
	  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
	  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
	});
	
	/**
	 * GFM Inline Grammar
	 */
	
	inline.gfm = merge({}, inline.normal, {
	  escape: replace(inline.escape)('])', '~|])')(),
	  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
	  del: /^~~(?=\S)([\s\S]*?\S)~~/,
	  text: replace(inline.text)
	    (']|', '~]|')
	    ('|', '|https?://|')
	    ()
	});
	
	/**
	 * GFM + Line Breaks Inline Grammar
	 */
	
	inline.breaks = merge({}, inline.gfm, {
	  br: replace(inline.br)('{2,}', '*')(),
	  text: replace(inline.gfm.text)('{2,}', '*')()
	});
	
	/**
	 * Inline Lexer & Compiler
	 */
	
	function InlineLexer(links, options) {
	  this.options = options || marked.defaults;
	  this.links = links;
	  this.rules = inline.normal;
	  this.renderer = this.options.renderer || new Renderer;
	  this.renderer.options = this.options;
	
	  if (!this.links) {
	    throw new
	      Error('Tokens array requires a `links` property.');
	  }
	
	  if (this.options.gfm) {
	    if (this.options.breaks) {
	      this.rules = inline.breaks;
	    } else {
	      this.rules = inline.gfm;
	    }
	  } else if (this.options.pedantic) {
	    this.rules = inline.pedantic;
	  }
	}
	
	/**
	 * Expose Inline Rules
	 */
	
	InlineLexer.rules = inline;
	
	/**
	 * Static Lexing/Compiling Method
	 */
	
	InlineLexer.output = function(src, links, options) {
	  var inline = new InlineLexer(links, options);
	  return inline.output(src);
	};
	
	/**
	 * Lexing/Compiling
	 */
	
	InlineLexer.prototype.output = function(src) {
	  var out = ''
	    , link
	    , text
	    , href
	    , cap;
	
	  while (src) {
	    // escape
	    if (cap = this.rules.escape.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += cap[1];
	      continue;
	    }
	
	    // autolink
	    if (cap = this.rules.autolink.exec(src)) {
	      src = src.substring(cap[0].length);
	      if (cap[2] === '@') {
	        text = cap[1].charAt(6) === ':'
	          ? this.mangle(cap[1].substring(7))
	          : this.mangle(cap[1]);
	        href = this.mangle('mailto:') + text;
	      } else {
	        text = escape(cap[1]);
	        href = text;
	      }
	      out += this.renderer.link(href, null, text);
	      continue;
	    }
	
	    // url (gfm)
	    if (!this.inLink && (cap = this.rules.url.exec(src))) {
	      src = src.substring(cap[0].length);
	      text = escape(cap[1]);
	      href = text;
	      out += this.renderer.link(href, null, text);
	      continue;
	    }
	
	    // tag
	    if (cap = this.rules.tag.exec(src)) {
	      if (!this.inLink && /^<a /i.test(cap[0])) {
	        this.inLink = true;
	      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
	        this.inLink = false;
	      }
	      src = src.substring(cap[0].length);
	      out += this.options.sanitize
	        ? this.options.sanitizer
	          ? this.options.sanitizer(cap[0])
	          : escape(cap[0])
	        : cap[0]
	      continue;
	    }
	
	    // link
	    if (cap = this.rules.link.exec(src)) {
	      src = src.substring(cap[0].length);
	      this.inLink = true;
	      out += this.outputLink(cap, {
	        href: cap[2],
	        title: cap[3]
	      });
	      this.inLink = false;
	      continue;
	    }
	
	    // reflink, nolink
	    if ((cap = this.rules.reflink.exec(src))
	        || (cap = this.rules.nolink.exec(src))) {
	      src = src.substring(cap[0].length);
	      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
	      link = this.links[link.toLowerCase()];
	      if (!link || !link.href) {
	        out += cap[0].charAt(0);
	        src = cap[0].substring(1) + src;
	        continue;
	      }
	      this.inLink = true;
	      out += this.outputLink(cap, link);
	      this.inLink = false;
	      continue;
	    }
	
	    // strong
	    if (cap = this.rules.strong.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.strong(this.output(cap[2] || cap[1]));
	      continue;
	    }
	
	    // em
	    if (cap = this.rules.em.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.em(this.output(cap[2] || cap[1]));
	      continue;
	    }
	
	    // code
	    if (cap = this.rules.code.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.codespan(escape(cap[2], true));
	      continue;
	    }
	
	    // br
	    if (cap = this.rules.br.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.br();
	      continue;
	    }
	
	    // del (gfm)
	    if (cap = this.rules.del.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.del(this.output(cap[1]));
	      continue;
	    }
	
	    // text
	    if (cap = this.rules.text.exec(src)) {
	      src = src.substring(cap[0].length);
	      out += this.renderer.text(escape(this.smartypants(cap[0])));
	      continue;
	    }
	
	    if (src) {
	      throw new
	        Error('Infinite loop on byte: ' + src.charCodeAt(0));
	    }
	  }
	
	  return out;
	};
	
	/**
	 * Compile Link
	 */
	
	InlineLexer.prototype.outputLink = function(cap, link) {
	  var href = escape(link.href)
	    , title = link.title ? escape(link.title) : null;
	
	  return cap[0].charAt(0) !== '!'
	    ? this.renderer.link(href, title, this.output(cap[1]))
	    : this.renderer.image(href, title, escape(cap[1]));
	};
	
	/**
	 * Smartypants Transformations
	 */
	
	InlineLexer.prototype.smartypants = function(text) {
	  if (!this.options.smartypants) return text;
	  return text
	    // em-dashes
	    .replace(/---/g, '\u2014')
	    // en-dashes
	    .replace(/--/g, '\u2013')
	    // opening singles
	    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
	    // closing singles & apostrophes
	    .replace(/'/g, '\u2019')
	    // opening doubles
	    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
	    // closing doubles
	    .replace(/"/g, '\u201d')
	    // ellipses
	    .replace(/\.{3}/g, '\u2026');
	};
	
	/**
	 * Mangle Links
	 */
	
	InlineLexer.prototype.mangle = function(text) {
	  if (!this.options.mangle) return text;
	  var out = ''
	    , l = text.length
	    , i = 0
	    , ch;
	
	  for (; i < l; i++) {
	    ch = text.charCodeAt(i);
	    if (Math.random() > 0.5) {
	      ch = 'x' + ch.toString(16);
	    }
	    out += '&#' + ch + ';';
	  }
	
	  return out;
	};
	
	/**
	 * Renderer
	 */
	
	function Renderer(options) {
	  this.options = options || {};
	}
	
	Renderer.prototype.code = function(code, lang, escaped) {
	  if (this.options.highlight) {
	    var out = this.options.highlight(code, lang);
	    if (out != null && out !== code) {
	      escaped = true;
	      code = out;
	    }
	  }
	
	  if (!lang) {
	    return '<pre><code>'
	      + (escaped ? code : escape(code, true))
	      + '\n</code></pre>';
	  }
	
	  return '<pre><code class="'
	    + this.options.langPrefix
	    + escape(lang, true)
	    + '">'
	    + (escaped ? code : escape(code, true))
	    + '\n</code></pre>\n';
	};
	
	Renderer.prototype.blockquote = function(quote) {
	  return '<blockquote>\n' + quote + '</blockquote>\n';
	};
	
	Renderer.prototype.html = function(html) {
	  return html;
	};
	
	Renderer.prototype.heading = function(text, level, raw) {
	  return '<h'
	    + level
	    + ' id="'
	    + this.options.headerPrefix
	    + raw.toLowerCase().replace(/[^\w]+/g, '-')
	    + '">'
	    + text
	    + '</h'
	    + level
	    + '>\n';
	};
	
	Renderer.prototype.hr = function() {
	  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
	};
	
	Renderer.prototype.list = function(body, ordered) {
	  var type = ordered ? 'ol' : 'ul';
	  return '<' + type + '>\n' + body + '</' + type + '>\n';
	};
	
	Renderer.prototype.listitem = function(text) {
	  return '<li>' + text + '</li>\n';
	};
	
	Renderer.prototype.paragraph = function(text) {
	  return '<p>' + text + '</p>\n';
	};
	
	Renderer.prototype.table = function(header, body) {
	  return '<table>\n'
	    + '<thead>\n'
	    + header
	    + '</thead>\n'
	    + '<tbody>\n'
	    + body
	    + '</tbody>\n'
	    + '</table>\n';
	};
	
	Renderer.prototype.tablerow = function(content) {
	  return '<tr>\n' + content + '</tr>\n';
	};
	
	Renderer.prototype.tablecell = function(content, flags) {
	  var type = flags.header ? 'th' : 'td';
	  var tag = flags.align
	    ? '<' + type + ' style="text-align:' + flags.align + '">'
	    : '<' + type + '>';
	  return tag + content + '</' + type + '>\n';
	};
	
	// span level renderer
	Renderer.prototype.strong = function(text) {
	  return '<strong>' + text + '</strong>';
	};
	
	Renderer.prototype.em = function(text) {
	  return '<em>' + text + '</em>';
	};
	
	Renderer.prototype.codespan = function(text) {
	  return '<code>' + text + '</code>';
	};
	
	Renderer.prototype.br = function() {
	  return this.options.xhtml ? '<br/>' : '<br>';
	};
	
	Renderer.prototype.del = function(text) {
	  return '<del>' + text + '</del>';
	};
	
	Renderer.prototype.link = function(href, title, text) {
	  if (this.options.sanitize) {
	    try {
	      var prot = decodeURIComponent(unescape(href))
	        .replace(/[^\w:]/g, '')
	        .toLowerCase();
	    } catch (e) {
	      return '';
	    }
	    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
	      return '';
	    }
	  }
	  var out = '<a href="' + href + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += '>' + text + '</a>';
	  return out;
	};
	
	Renderer.prototype.image = function(href, title, text) {
	  var out = '<img src="' + href + '" alt="' + text + '"';
	  if (title) {
	    out += ' title="' + title + '"';
	  }
	  out += this.options.xhtml ? '/>' : '>';
	  return out;
	};
	
	Renderer.prototype.text = function(text) {
	  return text;
	};
	
	/**
	 * Parsing & Compiling
	 */
	
	function Parser(options) {
	  this.tokens = [];
	  this.token = null;
	  this.options = options || marked.defaults;
	  this.options.renderer = this.options.renderer || new Renderer;
	  this.renderer = this.options.renderer;
	  this.renderer.options = this.options;
	}
	
	/**
	 * Static Parse Method
	 */
	
	Parser.parse = function(src, options, renderer) {
	  var parser = new Parser(options, renderer);
	  return parser.parse(src);
	};
	
	/**
	 * Parse Loop
	 */
	
	Parser.prototype.parse = function(src) {
	  this.inline = new InlineLexer(src.links, this.options, this.renderer);
	  this.tokens = src.reverse();
	
	  var out = '';
	  while (this.next()) {
	    out += this.tok();
	  }
	
	  return out;
	};
	
	/**
	 * Next Token
	 */
	
	Parser.prototype.next = function() {
	  return this.token = this.tokens.pop();
	};
	
	/**
	 * Preview Next Token
	 */
	
	Parser.prototype.peek = function() {
	  return this.tokens[this.tokens.length - 1] || 0;
	};
	
	/**
	 * Parse Text Tokens
	 */
	
	Parser.prototype.parseText = function() {
	  var body = this.token.text;
	
	  while (this.peek().type === 'text') {
	    body += '\n' + this.next().text;
	  }
	
	  return this.inline.output(body);
	};
	
	/**
	 * Parse Current Token
	 */
	
	Parser.prototype.tok = function() {
	  switch (this.token.type) {
	    case 'space': {
	      return '';
	    }
	    case 'hr': {
	      return this.renderer.hr();
	    }
	    case 'heading': {
	      return this.renderer.heading(
	        this.inline.output(this.token.text),
	        this.token.depth,
	        this.token.text);
	    }
	    case 'code': {
	      return this.renderer.code(this.token.text,
	        this.token.lang,
	        this.token.escaped);
	    }
	    case 'table': {
	      var header = ''
	        , body = ''
	        , i
	        , row
	        , cell
	        , flags
	        , j;
	
	      // header
	      cell = '';
	      for (i = 0; i < this.token.header.length; i++) {
	        flags = { header: true, align: this.token.align[i] };
	        cell += this.renderer.tablecell(
	          this.inline.output(this.token.header[i]),
	          { header: true, align: this.token.align[i] }
	        );
	      }
	      header += this.renderer.tablerow(cell);
	
	      for (i = 0; i < this.token.cells.length; i++) {
	        row = this.token.cells[i];
	
	        cell = '';
	        for (j = 0; j < row.length; j++) {
	          cell += this.renderer.tablecell(
	            this.inline.output(row[j]),
	            { header: false, align: this.token.align[j] }
	          );
	        }
	
	        body += this.renderer.tablerow(cell);
	      }
	      return this.renderer.table(header, body);
	    }
	    case 'blockquote_start': {
	      var body = '';
	
	      while (this.next().type !== 'blockquote_end') {
	        body += this.tok();
	      }
	
	      return this.renderer.blockquote(body);
	    }
	    case 'list_start': {
	      var body = ''
	        , ordered = this.token.ordered;
	
	      while (this.next().type !== 'list_end') {
	        body += this.tok();
	      }
	
	      return this.renderer.list(body, ordered);
	    }
	    case 'list_item_start': {
	      var body = '';
	
	      while (this.next().type !== 'list_item_end') {
	        body += this.token.type === 'text'
	          ? this.parseText()
	          : this.tok();
	      }
	
	      return this.renderer.listitem(body);
	    }
	    case 'loose_item_start': {
	      var body = '';
	
	      while (this.next().type !== 'list_item_end') {
	        body += this.tok();
	      }
	
	      return this.renderer.listitem(body);
	    }
	    case 'html': {
	      var html = !this.token.pre && !this.options.pedantic
	        ? this.inline.output(this.token.text)
	        : this.token.text;
	      return this.renderer.html(html);
	    }
	    case 'paragraph': {
	      return this.renderer.paragraph(this.inline.output(this.token.text));
	    }
	    case 'text': {
	      return this.renderer.paragraph(this.parseText());
	    }
	  }
	};
	
	/**
	 * Helpers
	 */
	
	function escape(html, encode) {
	  return html
	    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
	    .replace(/</g, '&lt;')
	    .replace(/>/g, '&gt;')
	    .replace(/"/g, '&quot;')
	    .replace(/'/g, '&#39;');
	}
	
	function unescape(html) {
	  return html.replace(/&([#\w]+);/g, function(_, n) {
	    n = n.toLowerCase();
	    if (n === 'colon') return ':';
	    if (n.charAt(0) === '#') {
	      return n.charAt(1) === 'x'
	        ? String.fromCharCode(parseInt(n.substring(2), 16))
	        : String.fromCharCode(+n.substring(1));
	    }
	    return '';
	  });
	}
	
	function replace(regex, opt) {
	  regex = regex.source;
	  opt = opt || '';
	  return function self(name, val) {
	    if (!name) return new RegExp(regex, opt);
	    val = val.source || val;
	    val = val.replace(/(^|[^\[])\^/g, '$1');
	    regex = regex.replace(name, val);
	    return self;
	  };
	}
	
	function noop() {}
	noop.exec = noop;
	
	function merge(obj) {
	  var i = 1
	    , target
	    , key;
	
	  for (; i < arguments.length; i++) {
	    target = arguments[i];
	    for (key in target) {
	      if (Object.prototype.hasOwnProperty.call(target, key)) {
	        obj[key] = target[key];
	      }
	    }
	  }
	
	  return obj;
	}
	
	
	/**
	 * Marked
	 */
	
	function marked(src, opt, callback) {
	  if (callback || typeof opt === 'function') {
	    if (!callback) {
	      callback = opt;
	      opt = null;
	    }
	
	    opt = merge({}, marked.defaults, opt || {});
	
	    var highlight = opt.highlight
	      , tokens
	      , pending
	      , i = 0;
	
	    try {
	      tokens = Lexer.lex(src, opt)
	    } catch (e) {
	      return callback(e);
	    }
	
	    pending = tokens.length;
	
	    var done = function(err) {
	      if (err) {
	        opt.highlight = highlight;
	        return callback(err);
	      }
	
	      var out;
	
	      try {
	        out = Parser.parse(tokens, opt);
	      } catch (e) {
	        err = e;
	      }
	
	      opt.highlight = highlight;
	
	      return err
	        ? callback(err)
	        : callback(null, out);
	    };
	
	    if (!highlight || highlight.length < 3) {
	      return done();
	    }
	
	    delete opt.highlight;
	
	    if (!pending) return done();
	
	    for (; i < tokens.length; i++) {
	      (function(token) {
	        if (token.type !== 'code') {
	          return --pending || done();
	        }
	        return highlight(token.text, token.lang, function(err, code) {
	          if (err) return done(err);
	          if (code == null || code === token.text) {
	            return --pending || done();
	          }
	          token.text = code;
	          token.escaped = true;
	          --pending || done();
	        });
	      })(tokens[i]);
	    }
	
	    return;
	  }
	  try {
	    if (opt) opt = merge({}, marked.defaults, opt);
	    return Parser.parse(Lexer.lex(src, opt), opt);
	  } catch (e) {
	    e.message += '\nPlease report this to https://github.com/chjj/marked.';
	    if ((opt || marked.defaults).silent) {
	      return '<p>An error occured:</p><pre>'
	        + escape(e.message + '', true)
	        + '</pre>';
	    }
	    throw e;
	  }
	}
	
	/**
	 * Options
	 */
	
	marked.options =
	marked.setOptions = function(opt) {
	  merge(marked.defaults, opt);
	  return marked;
	};
	
	marked.defaults = {
	  gfm: true,
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: false,
	  sanitizer: null,
	  mangle: true,
	  smartLists: false,
	  silent: false,
	  highlight: null,
	  langPrefix: 'lang-',
	  smartypants: false,
	  headerPrefix: '',
	  renderer: new Renderer,
	  xhtml: false
	};
	
	/**
	 * Expose
	 */
	
	marked.Parser = Parser;
	marked.parser = Parser.parse;
	
	marked.Renderer = Renderer;
	
	marked.Lexer = Lexer;
	marked.lexer = Lexer.lex;
	
	marked.InlineLexer = InlineLexer;
	marked.inlineLexer = InlineLexer.output;
	
	marked.parse = marked;
	
	if (true) {
	  module.exports = marked;
	} else if (typeof define === 'function' && define.amd) {
	  define(function() { return marked; });
	} else {
	  this.marked = marked;
	}
	
	}).call(function() {
	  return this || (typeof window !== 'undefined' ? window : global);
	}());
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(88);
	
	
	/**
	 * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
	 * parameters. Unlike `nAry`, which passes only `n` arguments to the wrapped function,
	 * functions produced by `arity` will pass all provided arguments to the wrapped function.
	 *
	 * @func
	 * @memberOf R
	 * @sig (Number, (* -> *)) -> (* -> *)
	 * @category Function
	 * @param {Number} n The desired arity of the returned function.
	 * @param {Function} fn The function to wrap.
	 * @return {Function} A new function wrapping `fn`. The new function is
	 *         guaranteed to be of arity `n`.
	 * @deprecated since v0.15.0
	 * @example
	 *
	 *      var takesTwoArgs = function(a, b) {
	 *        return [a, b];
	 *      };
	 *      takesTwoArgs.length; //=> 2
	 *      takesTwoArgs(1, 2); //=> [1, 2]
	 *
	 *      var takesOneArg = R.arity(1, takesTwoArgs);
	 *      takesOneArg.length; //=> 1
	 *      // All arguments are passed through to the wrapped function
	 *      takesOneArg(1, 2); //=> [1, 2]
	 */
	module.exports = _curry2(function(n, fn) {
	  // jshint unused:vars
	  switch (n) {
	    case 0: return function() {return fn.apply(this, arguments);};
	    case 1: return function(a0) {return fn.apply(this, arguments);};
	    case 2: return function(a0, a1) {return fn.apply(this, arguments);};
	    case 3: return function(a0, a1, a2) {return fn.apply(this, arguments);};
	    case 4: return function(a0, a1, a2, a3) {return fn.apply(this, arguments);};
	    case 5: return function(a0, a1, a2, a3, a4) {return fn.apply(this, arguments);};
	    case 6: return function(a0, a1, a2, a3, a4, a5) {return fn.apply(this, arguments);};
	    case 7: return function(a0, a1, a2, a3, a4, a5, a6) {return fn.apply(this, arguments);};
	    case 8: return function(a0, a1, a2, a3, a4, a5, a6, a7) {return fn.apply(this, arguments);};
	    case 9: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {return fn.apply(this, arguments);};
	    case 10: return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {return fn.apply(this, arguments);};
	    default: throw new Error('First argument to arity must be a non-negative integer no greater than ten');
	  }
	});


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var _curry1 = __webpack_require__(249);
	
	
	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry2(fn) {
	  return function f2(a, b) {
	    var n = arguments.length;
	    if (n === 0) {
	      return f2;
	    } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 1) {
	      return _curry1(function(b) { return fn(a, b); });
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true &&
	                          b != null && b['@@functional/placeholder'] === true) {
	      return f2;
	    } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	      return _curry1(function(a) { return fn(a, b); });
	    } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	      return _curry1(function(b) { return fn(a, b); });
	    } else {
	      return fn(a, b);
	    }
	  };
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = createStore;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _utilsIsPlainObject = __webpack_require__(91);
	
	var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);
	
	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT'
	};
	
	exports.ActionTypes = ActionTypes;
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	
	function createStore(reducer, initialState) {
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }
	
	  var currentReducer = reducer;
	  var currentState = initialState;
	  var listeners = [];
	  var isDispatching = false;
	
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }
	
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    listeners.push(listener);
	    var isSubscribed = true;
	
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }
	
	      isSubscribed = false;
	      var index = listeners.indexOf(listener);
	      listeners.splice(index, 1);
	    };
	  }
	
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!_utilsIsPlainObject2['default'](action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }
	
	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }
	
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }
	
	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }
	
	    listeners.slice().forEach(function (listener) {
	      return listener();
	    });
	    return action;
	  }
	
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }
	
	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });
	
	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 90 */
/***/ function(module, exports) {

	/**
	 * Composes single-argument functions from right to left.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing functions from right to
	 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = compose;
	
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  return function (arg) {
	    return funcs.reduceRight(function (composed, f) {
	      return f(composed);
	    }, arg);
	  };
	}
	
	module.exports = exports["default"];

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = isPlainObject;
	var fnToString = function fnToString(fn) {
	  return Function.prototype.toString.call(fn);
	};
	var objStringValue = fnToString(Object);
	
	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	
	function isPlainObject(obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }
	
	  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;
	
	  if (proto === null) {
	    return true;
	  }
	
	  var constructor = proto.constructor;
	
	  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === objStringValue;
	}
	
	module.exports = exports['default'];

/***/ },
/* 92 */
/***/ function(module, exports) {

	/**
	 * Applies a function to every key-value pair inside an object.
	 *
	 * @param {Object} obj The source object.
	 * @param {Function} fn The mapper function that receives the value and the key.
	 * @returns {Object} A new object that contains the mapped values for the keys.
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = mapValues;
	
	function mapValues(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    result[key] = fn(obj[key], key);
	    return result;
	  }, {});
	}
	
	module.exports = exports["default"];

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(94);

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(97);
	var utils = __webpack_require__(14);
	var dispatchRequest = __webpack_require__(96);
	var InterceptorManager = __webpack_require__(95);
	var isAbsoluteURL = __webpack_require__(103);
	var combineURLs = __webpack_require__(101);
	var bind = __webpack_require__(98);
	var transformData = __webpack_require__(59);
	
	function Axios(defaultConfig) {
	  this.defaults = utils.merge({}, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || this.defaults.withCredentials;
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	var defaultInstance = new Axios(defaults);
	var axios = module.exports = bind(Axios.prototype.request, defaultInstance);
	
	axios.create = function create(defaultConfig) {
	  return new Axios(defaultConfig);
	};
	
	// Expose defaults
	axios.defaults = defaultInstance.defaults;
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(106);
	
	// Expose interceptors
	axios.interceptors = defaultInstance.interceptors;
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function executor(resolve, reject) {
	    try {
	      var adapter;
	
	      if (typeof config.adapter === 'function') {
	        // For custom adapter support
	        adapter = config.adapter;
	      } else if (typeof XMLHttpRequest !== 'undefined') {
	        // For browsers use XHR adapter
	        adapter = __webpack_require__(58);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(58);
	      }
	
	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	module.exports = {
	  transformRequest: [function transformResponseJSON(data, headers) {
	    if (utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function processContentTypeHeader(val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });
	
	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponseJSON(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};


/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function InvalidCharacterError(message) {
	  this.message = message;
	}
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.code = 5;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};
	


/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(14);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadData = undefined;
	
	var _ramda = __webpack_require__(247);
	
	var _ramda2 = _interopRequireDefault(_ramda);
	
	var _axios = __webpack_require__(93);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }
	
	var justKeys = _ramda2.default.map(_ramda2.default.prop('Key'));
	var toObject = _ramda2.default.reduce(function (obj, key) {
	  return _ramda2.default.assocPath(key.split('/'), {}, obj);
	}, {});
	var parseObjects = _ramda2.default.pipe(justKeys, toObject);
	var keys = _ramda2.default.pipe(_ramda2.default.keys, _ramda2.default.filter(_ramda2.default.identity));
	
	AWS.config.update({
	  accessKeyId: 'AKIAJIXBME7POBLPG5NQ',
	  secretAccessKey: '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'
	});
	
	var aws = new AWS.S3();
	
	var dataPromise = new Promise(function (res, rej) {
	  aws.listObjects({ Bucket: 'www.abarrphoto.com', Prefix: 'photos' }, function (e, data) {
	    if (e) return rej(e);
	    var obj = parseObjects(data.Contents);
	    res(obj);
	  });
	});
	
	var fetch = function fetch(url) {
	  return _axios2.default.get(url).then(function (resp) {
	    return resp.data;
	  });
	};
	
	var parseProject = function () {
	  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(projects, name) {
	    var project, imageUrls, text, afterName, parts, _parts, title, blurb;
	
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            project = projects[name];
	            imageUrls = keys(project).filter(function (key) {
	              return key !== 'project.txt';
	            }).map(function (str) {
	              return 'https://www.abarrphoto.com/photos/projects/' + name + '/' + str;
	            });
	            _context.next = 4;
	            return fetch('https://s3.amazonaws.com/www.abarrphoto.com/photos/projects/' + name + '/project.txt');
	
	          case 4:
	            text = _context.sent;
	            afterName = text.split('[title]')[1];
	            parts = afterName.split('[description]');
	            _parts = _slicedToArray(parts, 2);
	            title = _parts[0];
	            blurb = _parts[1];
	            return _context.abrupt('return', {
	              photos: imageUrls,
	              title: title,
	              blurb: blurb
	            });
	
	          case 11:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  })),
	      _this = undefined;
	
	  return function parseProject(_x, _x2) {
	    return ref.apply(_this, arguments);
	  };
	}();
	
	var loadData = exports.loadData = function () {
	  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
	    var data, _data$photos, gallery, projects, galleryImages, projectDataPromises, projectData;
	
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return dataPromise;
	
	          case 2:
	            data = _context2.sent;
	            _data$photos = data.photos;
	            gallery = _data$photos.gallery;
	            projects = _data$photos.projects;
	            galleryImages = keys(gallery).map(function (x) {
	              return 'https://www.abarrphoto.com/photos/gallery/' + x;
	            });
	            projectDataPromises = keys(projects).map(parseProject.bind(null, projects));
	            _context2.next = 10;
	            return Promise.all(projectDataPromises);
	
	          case 10:
	            projectData = _context2.sent;
	            return _context2.abrupt('return', {
	              galleryImages: galleryImages,
	              projects: projectData.reduce(function (obj, p) {
	                return Object.assign(obj, _defineProperty({}, p.title, p));
	              }, {})
	            });
	
	          case 12:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, undefined);
	  })),
	      _this = undefined;
	
	  return function loadData() {
	    return ref.apply(_this, arguments);
	  };
	}();

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _deku = __webpack_require__(18);
	
	var _marked = __webpack_require__(86);
	
	var _marked2 = _interopRequireDefault(_marked);
	
	var _helpers = __webpack_require__(27);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  render: function render(_ref) {
	    var context = _ref.context;
	
	    var aboutUrl = 'https://s3.amazonaws.com/www.abarrphoto.com/photos/projects/jfk-house/img001.jpg';
	    return (0, _deku.element)(
	      'div',
	      { 'class': 'page-component', id: 'about-component', style: 'background-image: url(' + (0, _helpers.imgUrl)(aboutUrl, context.view.windowWidth, context.view.windowHeight) + ')' },
	      (0, _deku.element)(
	        'h2',
	        { 'class': 'page-title' },
	        'About'
	      ),
	      (0, _deku.element)('div', { id: 'about-p', innerHTML: (0, _marked2.default)(context.about) })
	    );
	  }
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _deku = __webpack_require__(18);
	
	var _Sidebar = __webpack_require__(114);
	
	var _Sidebar2 = _interopRequireDefault(_Sidebar);
	
	var _Content = __webpack_require__(110);
	
	var _Content2 = _interopRequireDefault(_Content);
	
	var _Overlay = __webpack_require__(112);
	
	var _Overlay2 = _interopRequireDefault(_Overlay);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  render: function render(_ref) {
	    var context = _ref.context;
	    var dispatch = _ref.dispatch;
	
	    return (0, _deku.element)(
	      'div',
	      null,
	      (0, _deku.element)(_Sidebar2.default, null),
	      (0, _deku.element)(_Content2.default, null),
	      context.view.overlayOpen ? (0, _deku.element)(_Overlay2.default, null) : null
	    );
	  }
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _deku = __webpack_require__(18);
	
	var _About = __webpack_require__(108);
	
	var _About2 = _interopRequireDefault(_About);
	
	var _Gallery = __webpack_require__(111);
	
	var _Gallery2 = _interopRequireDefault(_Gallery);
	
	var _Projects = __webpack_require__(113);
	
	var _Projects2 = _interopRequireDefault(_Projects);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  render: function render(_ref) {
	    var context = _ref.context;
	
	    return (0, _deku.element)(
	      'div',
	      { id: 'content-component' },
	      (0, _deku.element)(
	        'div',
	        { id: 'title-container' },
	        (0, _deku.element)(
	          'h1',
	          { id: 'title' },
	          'Andrew Barr Photography'
	        )
	      ),
	      context.view.page === 'about' ? (0, _deku.element)(_About2.default, null) : null,
	      context.view.page === 'gallery' ? (0, _deku.element)(_Gallery2.default, null) : null,
	      context.view.page === 'projects' ? (0, _deku.element)(_Projects2.default, null) : null
	    );
	  }
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _deku = __webpack_require__(18);
	
	var _helpers = __webpack_require__(27);
	
	exports.default = {
	  render: function render(_ref) {
	    var context = _ref.context;
	    var dispatch = _ref.dispatch;
	
	    return (0, _deku.element)(
	      'div',
	      { 'class': 'page-component', id: 'gallery-component' },
	      (0, _deku.element)(
	        'h2',
	        { 'class': 'page-title' },
	        'Gallery'
	      ),
	      (0, _deku.element)(
	        'div',
	        { 'class': 'thumbs' },
	        context.galleryImages.map(_helpers.thumbUrl.bind(null, dispatch, context.view.windowWidth))
	      )
	    );
	  }
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _deku = __webpack_require__(18);
	
	var _action_creators = __webpack_require__(43);
	
	var _helpers = __webpack_require__(27);
	
	exports.default = {
	  onCreate: function onCreate() {
	    return document.body.classList.add('overlay-open');
	  },
	  onRemove: function onRemove() {
	    return document.body.classList.remove('overlay-open');
	  },
	  render: function render(_ref) {
	    var context = _ref.context;
	    var dispatch = _ref.dispatch;
	
	    var i = context.view.currentImage;
	    var currentImages = context.view.page === 'gallery' ? context.galleryImages : context.projects[context.view.currentProject].photos;
	
	    var showNextImg = function showNextImg() {
	      return currentImages[i + 1] ? dispatch((0, _action_creators.overlayOpen)(i + 1)) : dispatch((0, _action_creators.overlayOpen)(0));
	    };
	
	    var showPrevImg = function showPrevImg() {
	      return currentImages[i - 1] ? dispatch((0, _action_creators.overlayOpen)(i - 1)) : dispatch((0, _action_creators.overlayOpen)(currentImages.length - 1));
	    };
	
	    return (0, _deku.element)(
	      'div',
	      { id: 'overlay-component' },
	      (0, _deku.element)(
	        'div',
	        { id: 'overlay-container' },
	        (0, _deku.element)(
	          'i',
	          { 'class': 'material-icons', id: 'left-arrow', onClick: showPrevImg },
	          'chevron_left'
	        ),
	        (0, _deku.element)('div', { id: 'overlay-image-div', style: 'background-image: url(' + (0, _helpers.overlayImgUrl)(context.view.windowWidth, context.view.windowHeight, currentImages[i]) + ')' }),
	        (0, _deku.element)(
	          'i',
	          { 'class': 'material-icons', id: 'right-arrow', onClick: showNextImg },
	          'chevron_right'
	        )
	      ),
	      (0, _deku.element)(
	        'i',
	        { 'class': 'material-icons', id: 'close-button', onClick: function onClick() {
	            return dispatch((0, _action_creators.overlayClose)());
	          } },
	        'close'
	      )
	    );
	  }
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _deku = __webpack_require__(18);
	
	var _marked = __webpack_require__(86);
	
	var _marked2 = _interopRequireDefault(_marked);
	
	var _helpers = __webpack_require__(27);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  render: function render(_ref) {
	    var context = _ref.context;
	    var dispatch = _ref.dispatch;
	
	    var current = context.projects[context.view.currentProject];
	
	    return (0, _deku.element)(
	      'div',
	      { 'class': 'page-component project-component', id: 'projects-component' },
	      (0, _deku.element)(
	        'h2',
	        { 'class': 'page-title' },
	        current.title
	      ),
	      (0, _deku.element)('div', { id: 'project-blurb', innerHTML: (0, _marked2.default)(current.blurb) }),
	      (0, _deku.element)(
	        'div',
	        { 'class': 'thumbs' },
	        current.photos.map(_helpers.thumbUrl.bind(null, dispatch, context.view.windowWidth))
	      )
	    );
	  }
	};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _deku = __webpack_require__(18);
	
	var _classnames = __webpack_require__(120);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _helpers = __webpack_require__(27);
	
	var _action_creators = __webpack_require__(43);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  render: function render(_ref) {
	    var context = _ref.context;
	    var dispatch = _ref.dispatch;
	
	    var getActiveClass = function getActiveClass(subject, type) {
	      return (0, _classnames2.default)({ active: context.view[type] === subject });
	    };
	    var createNavLi = function createNavLi(name) {
	      return (0, _deku.element)(
	        'li',
	        { 'class': getActiveClass(name, 'page') + ' nav-item', onClick: function onClick() {
	            return dispatch((0, _action_creators.pageSelect)(name));
	          } },
	        name
	      );
	    };
	    var createProjectLi = function createProjectLi(name) {
	      return (0, _deku.element)(
	        'li',
	        { 'class': getActiveClass(name, 'currentProject'), onClick: function onClick() {
	            return dispatch((0, _action_creators.projectSelect)(name));
	          } },
	        context.projects[name].title
	      );
	    };
	
	    return (0, _deku.element)(
	      'div',
	      { id: 'sidebar-component', 'class': context.view.sidebarHidden ? 'hidden' : '' },
	      (0, _deku.element)(
	        'h1',
	        { id: 'nav-title' },
	        'Andrew Barr Photography'
	      ),
	      (0, _deku.element)(
	        'a',
	        { id: 'nav-toggle', href: '#', onClick: function onClick() {
	            return dispatch((0, _action_creators.sidebarToggle)());
	          } },
	        (0, _deku.element)(
	          'i',
	          { 'class': 'material-icons' },
	          'menu'
	        )
	      ),
	      (0, _deku.element)(
	        'ul',
	        { id: 'nav' },
	        ['gallery', 'about'].map(createNavLi),
	        (0, _deku.element)(
	          'li',
	          { id: 'projects-link', 'class': getActiveClass('projects', 'page') + ' nav-item' },
	          'Projects',
	          (0, _deku.element)(
	            'i',
	            { 'class': 'material-icons' },
	            'chevron_right'
	          ),
	          (0, _deku.element)(
	            'ul',
	            { id: 'projects-nav', 'class': context.view.projectsNavHidden ? 'hidden' : '' },
	            Object.keys(context.projects).map(createProjectLi)
	          )
	        )
	      ),
	      (0, _deku.element)(
	        'a',
	        { id: 'contact', href: 'mailto:abarrphoto@gmail.com', onClick: (0, _helpers.prevDef)(context.actions.loadGallery) },
	        'abarrphoto@gmail.com'
	      )
	    );
	  }
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	__webpack_require__(117);
	
	var _deku = __webpack_require__(18);
	
	var _Application = __webpack_require__(109);
	
	var _Application2 = _interopRequireDefault(_Application);
	
	var _redux = __webpack_require__(251);
	
	var _reducers = __webpack_require__(116);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _actions = __webpack_require__(107);
	
	var actions = _interopRequireWildcard(_actions);
	
	__webpack_require__(258);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var reducer = (0, _redux.combineReducers)(_reducers2.default);
	
	var store = (0, _redux.createStore)(reducer);
	
	var render = _deku.dom.createRenderer(document.getElementById('mount'), store.dispatch);
	
	// Rendering function
	function update() {
	  render((0, _deku.element)(_Application2.default, null), _extends({}, store.getState(), { actions: actions }));
	}
	
	// First render
	update();
	
	store.subscribe(update);
	
	actions.loadData().then(function (_ref) {
	  var galleryImages = _ref.galleryImages;
	  var projects = _ref.projects;
	
	  store.dispatch({
	    type: 'SET_PROJECTS',
	    payload: projects
	  });
	  store.dispatch({
	    type: 'SET_GALLERY_IMAGES',
	    payload: galleryImages
	  });
	});

/***/ },
/* 116 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var view = function view(state, action) {
	  switch (action.type) {
	    case 'SELECT_PAGE':
	      return Object.assign(state, {
	        page: action.page,
	        sidebarHidden: true,
	        currentProject: action.page === 'projects' ? state.currentProject : null
	      });
	    case 'TOGGLE_SIDEBAR':
	      return Object.assign(state, { sidebarHidden: !state.sidebarHidden });
	    case 'SELECT_PROJECT':
	      return Object.assign(state, { page: 'projects', currentProject: action.project, sidebarHidden: true });
	    case 'OPEN_OVERLAY':
	      return Object.assign(state, { overlayOpen: true, currentImage: action.image });
	    case 'CLOSE_OVERLAY':
	      return Object.assign(state, { overlayOpen: false });
	    default:
	      return state || {
	        page: 'gallery',
	        sidebarHidden: true,
	        currentProject: null,
	        overlayOpen: false,
	        currentImage: null,
	        windowWidth: window.innerWidth,
	        windowHeight: window.innerHeight
	      };
	  }
	};
	
	var galleryImages = function galleryImages(state, action) {
	  switch (action.type) {
	    case 'SET_GALLERY_IMAGES':
	      return action.payload;
	    default:
	      return state || [];
	  }
	};
	
	var projects = function projects(state, action) {
	  switch (action.type) {
	    case 'SET_PROJECTS':
	      return action.payload;
	    default:
	      return state || {};
	  }
	};
	
	var about = function about() {
	  return "Our photographic services cover all aspects of the built environment. Specializing in historic preservation projects, we document for National Register nominations, historic structure reports, and on-going building restoration documentation. Large-format equipment and film is used to meet Historic American Building Survey (HABS) standards.";
	};
	
	var reducers = {
	  view: view,
	  galleryImages: galleryImages,
	  projects: projects,
	  about: about
	};
	
	exports.default = reducers;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(235);
	
	__webpack_require__(118);
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          context._sent = arg;
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(57)))

/***/ },
/* 119 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Use typed arrays if we can
	 */
	
	var FastArray = typeof Uint32Array === 'undefined' ? Array : Uint32Array;
	
	/**
	 * Bit vector
	 */
	
	function createBv(sizeInBits) {
	  return new FastArray(Math.ceil(sizeInBits / 32));
	}
	
	function setBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;
	
	  v[pos] |= 1 << r;
	}
	
	function clearBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;
	
	  v[pos] &= ~(1 << r);
	}
	
	function getBit(v, idx) {
	  var r = idx % 32;
	  var pos = (idx - r) / 32;
	
	  return !!(v[pos] & 1 << r);
	}
	
	/**
	 * Exports
	 */
	
	exports.createBv = createBv;
	exports.setBit = setBit;
	exports.clearBit = clearBit;
	exports.getBit = getBit;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(21)
	  , toIndex  = __webpack_require__(31)
	  , toLength = __webpack_require__(9);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , $$    = arguments
	    , end   = $$.length > 2 ? $$[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(21)
	  , toIndex  = __webpack_require__(31)
	  , toLength = __webpack_require__(9);
	module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , $$     = arguments
	    , $$len  = $$.length
	    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
	    , end    = $$len > 2 ? $$[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(3)
	  , isArray  = __webpack_require__(45)
	  , SPECIES  = __webpack_require__(5)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(2);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(2)
	  , toIObject = __webpack_require__(13);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , macrotask = __webpack_require__(81).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(19)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(2)
	  , toObject = __webpack_require__(21)
	  , IObject  = __webpack_require__(38);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(7)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(129)
	  , invoke    = __webpack_require__(37)
	  , aFunction = __webpack_require__(23);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that  = this
	      , $$    = arguments
	      , $$len = $$.length
	      , j = 0, k = 0, args;
	    if(!holder && !$$len)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
	    while($$len > k)args.push($$[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(4)
	  , aFunction = __webpack_require__(23)
	  , SPECIES   = __webpack_require__(5)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(3);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(2)
	  , $export           = __webpack_require__(1)
	  , DESCRIPTORS       = __webpack_require__(10)
	  , createDesc        = __webpack_require__(22)
	  , html              = __webpack_require__(67)
	  , cel               = __webpack_require__(64)
	  , has               = __webpack_require__(8)
	  , cof               = __webpack_require__(19)
	  , invoke            = __webpack_require__(37)
	  , fails             = __webpack_require__(7)
	  , anObject          = __webpack_require__(4)
	  , aFunction         = __webpack_require__(23)
	  , isObject          = __webpack_require__(3)
	  , toObject          = __webpack_require__(21)
	  , toIObject         = __webpack_require__(13)
	  , toInteger         = __webpack_require__(32)
	  , toIndex           = __webpack_require__(31)
	  , toLength          = __webpack_require__(9)
	  , IObject           = __webpack_require__(38)
	  , IE_PROTO          = __webpack_require__(25)('__proto__')
	  , createArrayMethod = __webpack_require__(33)
	  , arrayIndexOf      = __webpack_require__(60)(false)
	  , ObjectProto       = Object.prototype
	  , ArrayProto        = Array.prototype
	  , arraySlice        = ArrayProto.slice
	  , arrayJoin         = ArrayProto.join
	  , defineProperty    = $.setDesc
	  , getOwnDescriptor  = $.getDesc
	  , defineProperties  = $.setDescs
	  , factories         = {}
	  , IE8_DOM_DEFINE;
	
	if(!DESCRIPTORS){
	  IE8_DOM_DEFINE = !fails(function(){
	    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
	  });
	  $.setDesc = function(O, P, Attributes){
	    if(IE8_DOM_DEFINE)try {
	      return defineProperty(O, P, Attributes);
	    } catch(e){ /* empty */ }
	    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	    if('value' in Attributes)anObject(O)[P] = Attributes.value;
	    return O;
	  };
	  $.getDesc = function(O, P){
	    if(IE8_DOM_DEFINE)try {
	      return getOwnDescriptor(O, P);
	    } catch(e){ /* empty */ }
	    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
	  };
	  $.setDescs = defineProperties = function(O, Properties){
	    anObject(O);
	    var keys   = $.getKeys(Properties)
	      , length = keys.length
	      , i = 0
	      , P;
	    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
	    return O;
	  };
	}
	$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
	  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $.getDesc,
	  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	  defineProperty: $.setDesc,
	  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	  defineProperties: defineProperties
	});
	
	  // IE 8- don't enum bug keys
	var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
	            'toLocaleString,toString,valueOf').split(',')
	  // Additional keys for getOwnPropertyNames
	  , keys2 = keys1.concat('length', 'prototype')
	  , keysLen1 = keys1.length;
	
	// Create object with `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe')
	    , i      = keysLen1
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict.prototype[keys1[i]];
	  return createDict();
	};
	var createGetKeys = function(names, length){
	  return function(object){
	    var O      = toIObject(object)
	      , i      = 0
	      , result = []
	      , key;
	    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	    // Don't enum bug & hidden keys
	    while(length > i)if(has(O, key = names[i++])){
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	    return result;
	  };
	};
	var Empty = function(){};
	$export($export.S, 'Object', {
	  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	  getPrototypeOf: $.getProto = $.getProto || function(O){
	    O = toObject(O);
	    if(has(O, IE_PROTO))return O[IE_PROTO];
	    if(typeof O.constructor == 'function' && O instanceof O.constructor){
	      return O.constructor.prototype;
	    } return O instanceof Object ? ObjectProto : null;
	  },
	  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
	  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	  create: $.create = $.create || function(O, /*?*/Properties){
	    var result;
	    if(O !== null){
	      Empty.prototype = anObject(O);
	      result = new Empty();
	      Empty.prototype = null;
	      // add "__proto__" for Object.getPrototypeOf shim
	      result[IE_PROTO] = O;
	    } else result = createDict();
	    return Properties === undefined ? result : defineProperties(result, Properties);
	  },
	  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
	  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
	});
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  }
	  return factories[len](F, args);
	};
	
	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	$export($export.P, 'Function', {
	  bind: function bind(that /*, args... */){
	    var fn       = aFunction(this)
	      , partArgs = arraySlice.call(arguments, 1);
	    var bound = function(/* args... */){
	      var args = partArgs.concat(arraySlice.call(arguments));
	      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	    };
	    if(isObject(fn.prototype))bound.prototype = fn.prototype;
	    return bound;
	  }
	});
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * fails(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});
	$export($export.P + $export.F * (IObject != Object), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
	  }
	});
	
	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	$export($export.S, 'Array', {isArray: __webpack_require__(45)});
	
	var createArrayReduce = function(isRight){
	  return function(callbackfn, memo){
	    aFunction(callbackfn);
	    var O      = IObject(this)
	      , length = toLength(O.length)
	      , index  = isRight ? length - 1 : 0
	      , i      = isRight ? -1 : 1;
	    if(arguments.length < 2)for(;;){
	      if(index in O){
	        memo = O[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if(isRight ? index < 0 : length <= index){
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
	      memo = callbackfn(memo, O[index], index, this);
	    }
	    return memo;
	  };
	};
	
	var methodize = function($fn){
	  return function(arg1/*, arg2 = undefined */){
	    return $fn(this, arg1, arguments[1]);
	  };
	};
	
	$export($export.P, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: $.each = $.each || methodize(createArrayMethod(0)),
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: methodize(createArrayMethod(1)),
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: methodize(createArrayMethod(2)),
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: methodize(createArrayMethod(3)),
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: methodize(createArrayMethod(4)),
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: createArrayReduce(false),
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: createArrayReduce(true),
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: methodize(arrayIndexOf),
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
	    if(index < 0)index = toLength(length + index);
	    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
	    return -1;
	  }
	});
	
	// 20.3.3.1 / 15.9.4.4 Date.now()
	$export($export.S, 'Date', {now: function(){ return +new Date; }});
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(this))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(1);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(121)});
	
	__webpack_require__(24)('copyWithin');

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(1);
	
	$export($export.P, 'Array', {fill: __webpack_require__(122)});
	
	__webpack_require__(24)('fill');

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(1)
	  , $find   = __webpack_require__(33)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(24)(KEY);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(1)
	  , $find   = __webpack_require__(33)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(24)(KEY);

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__(15)
	  , $export     = __webpack_require__(1)
	  , toObject    = __webpack_require__(21)
	  , call        = __webpack_require__(71)
	  , isArrayIter = __webpack_require__(68)
	  , toLength    = __webpack_require__(9)
	  , getIterFn   = __webpack_require__(82);
	$export($export.S + $export.F * !__webpack_require__(47)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , $$     = arguments
	      , $$len  = $$.length
	      , result = new (typeof this == 'function' ? this : Array)($$len);
	    while($$len > index)result[index] = $$[index++];
	    result.length = $$len;
	    return result;
	  }
	});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40)('Array');

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $             = __webpack_require__(2)
	  , isObject      = __webpack_require__(3)
	  , HAS_INSTANCE  = __webpack_require__(5)('hasInstance')
	  , FunctionProto = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = $.getProto(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var setDesc    = __webpack_require__(2).setDesc
	  , createDesc = __webpack_require__(22)
	  , has        = __webpack_require__(8)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(10) && setDesc(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    var match = ('' + this).match(nameRE)
	      , name  = match ? match[1] : '';
	    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
	    return name;
	  }
	});

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(61);
	
	// 23.1 Map Objects
	__webpack_require__(35)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(1)
	  , log1p   = __webpack_require__(74)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
	$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(1);
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	$export($export.S, 'Math', {asinh: asinh});

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(1)
	  , sign    = __webpack_require__(50);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(1)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {expm1: __webpack_require__(49)});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(1)
	  , sign      = __webpack_require__(50)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(1)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum   = 0
	      , i     = 0
	      , $$    = arguments
	      , $$len = $$.length
	      , larg  = 0
	      , arg, div;
	    while(i < $$len){
	      arg = abs($$[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(1)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(74)});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {sign: __webpack_require__(50)});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(1)
	  , expm1   = __webpack_require__(49)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(1)
	  , expm1   = __webpack_require__(49)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $           = __webpack_require__(2)
	  , global      = __webpack_require__(6)
	  , has         = __webpack_require__(8)
	  , cof         = __webpack_require__(19)
	  , toPrimitive = __webpack_require__(132)
	  , fails       = __webpack_require__(7)
	  , $trim       = __webpack_require__(42).trim
	  , NUMBER      = 'Number'
	  , $Number     = global[NUMBER]
	  , Base        = $Number
	  , proto       = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF  = cof($.create(proto)) == NUMBER
	  , TRIM        = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? new Base(toNumber(it)) : toNumber(it);
	  };
	  $.each.call(__webpack_require__(10) ? $.getNames(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), function(key){
	    if(has(Base, key) && !has($Number, key)){
	      $.setDesc($Number, key, $.getDesc(Base, key));
	    }
	  });
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(12)(global, NUMBER, $Number);
	}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(1)
	  , _isFinite = __webpack_require__(6).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(69)});

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(1)
	  , isInteger = __webpack_require__(69)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.12 Number.parseFloat(string)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {parseFloat: parseFloat});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.13 Number.parseInt(string, radix)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Number', {parseInt: parseInt});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(1);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(127)});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(it) : it;
	  };
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject = __webpack_require__(13);
	
	__webpack_require__(11)('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(11)('getOwnPropertyNames', function(){
	  return __webpack_require__(66).get;
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(21);
	
	__webpack_require__(11)('getPrototypeOf', function($getPrototypeOf){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(1);
	$export($export.S, 'Object', {is: __webpack_require__(77)});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(21);
	
	__webpack_require__(11)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
	  };
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(3);
	
	__webpack_require__(11)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(it) : it;
	  };
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(1);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(51).set});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(34)
	  , test    = {};
	test[__webpack_require__(5)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(12)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(2)
	  , LIBRARY    = __webpack_require__(48)
	  , global     = __webpack_require__(6)
	  , ctx        = __webpack_require__(15)
	  , classof    = __webpack_require__(34)
	  , $export    = __webpack_require__(1)
	  , isObject   = __webpack_require__(3)
	  , anObject   = __webpack_require__(4)
	  , aFunction  = __webpack_require__(23)
	  , strictNew  = __webpack_require__(41)
	  , forOf      = __webpack_require__(28)
	  , setProto   = __webpack_require__(51).set
	  , same       = __webpack_require__(77)
	  , SPECIES    = __webpack_require__(5)('species')
	  , speciesConstructor = __webpack_require__(131)
	  , asap       = __webpack_require__(126)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(10)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(39)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(30)(P, PROMISE);
	__webpack_require__(40)(PROMISE);
	Wrapper = __webpack_require__(20)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(47)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export = __webpack_require__(1)
	  , _apply  = Function.apply;
	
	$export($export.S, 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    return _apply.call(target, thisArgument, argumentsList);
	  }
	});

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $         = __webpack_require__(2)
	  , $export   = __webpack_require__(1)
	  , aFunction = __webpack_require__(23)
	  , anObject  = __webpack_require__(4)
	  , isObject  = __webpack_require__(3)
	  , bind      = Function.bind || __webpack_require__(20).Function.prototype.bind;
	
	// MS Edge supports only 2 arguments
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  function F(){}
	  return !(Reflect.construct(function(){}, [], F) instanceof F);
	}), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      if(args != undefined)switch(anObject(args).length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = $.create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var $        = __webpack_require__(2)
	  , $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(7)(function(){
	  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    try {
	      $.setDesc(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(1)
	  , getDesc  = __webpack_require__(2).getDesc
	  , anObject = __webpack_require__(4);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = getDesc(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(72)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var $        = __webpack_require__(2)
	  , $export  = __webpack_require__(1)
	  , anObject = __webpack_require__(4);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return $.getDesc(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(1)
	  , getProto = __webpack_require__(2).getProto
	  , anObject = __webpack_require__(4);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var $        = __webpack_require__(2)
	  , has      = __webpack_require__(8)
	  , $export  = __webpack_require__(1)
	  , isObject = __webpack_require__(3)
	  , anObject = __webpack_require__(4);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(1)
	  , anObject      = __webpack_require__(4)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(1);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(76)});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(1)
	  , anObject           = __webpack_require__(4)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(1)
	  , setProto = __webpack_require__(51);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var $          = __webpack_require__(2)
	  , has        = __webpack_require__(8)
	  , $export    = __webpack_require__(1)
	  , createDesc = __webpack_require__(22)
	  , anObject   = __webpack_require__(4)
	  , isObject   = __webpack_require__(3);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = $.getDesc(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = $.getProto(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    $.setDesc(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(2)
	  , global   = __webpack_require__(6)
	  , isRegExp = __webpack_require__(70)
	  , $flags   = __webpack_require__(65)
	  , $RegExp  = global.RegExp
	  , Base     = $RegExp
	  , proto    = $RegExp.prototype
	  , re1      = /a/g
	  , re2      = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(10) && (!CORRECT_NEW || __webpack_require__(7)(function(){
	  re2[__webpack_require__(5)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
	      : CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
	  };
	  $.each.call($.getNames(Base), function(key){
	    key in $RegExp || $.setDesc($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  });
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(12)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(40)('RegExp');

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	var $ = __webpack_require__(2);
	if(__webpack_require__(10) && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(65)
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(36)('match', 1, function(defined, MATCH){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  };
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(36)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  };
	});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(36)('search', 1, function(defined, SEARCH){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  };
	});

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(36)('split', 2, function(defined, SPLIT, $split){
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return function split(separator, limit){
	    'use strict';
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined
	      ? fn.call(separator, O, limit)
	      : $split.call(String(O), separator, limit);
	  };
	});

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(61);
	
	// 23.2 Set Objects
	__webpack_require__(35)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $at     = __webpack_require__(52)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(1)
	  , toLength  = __webpack_require__(9)
	  , context   = __webpack_require__(53)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(44)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , $$   = arguments
	      , endPosition = $$.length > 1 ? $$[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(1)
	  , toIndex        = __webpack_require__(31)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res   = []
	      , $$    = arguments
	      , $$len = $$.length
	      , i     = 0
	      , code;
	    while($$len > i){
	      code = +$$[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(1)
	  , context  = __webpack_require__(53)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(44)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(52)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(46)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(1)
	  , toIObject = __webpack_require__(13)
	  , toLength  = __webpack_require__(9);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl   = toIObject(callSite.raw)
	      , len   = toLength(tpl.length)
	      , $$    = arguments
	      , $$len = $$.length
	      , res   = []
	      , i     = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < $$len)res.push(String($$[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(80)
	});

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(1)
	  , toLength    = __webpack_require__(9)
	  , context     = __webpack_require__(53)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(44)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , $$     = arguments
	      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(42)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(2)
	  , global         = __webpack_require__(6)
	  , has            = __webpack_require__(8)
	  , DESCRIPTORS    = __webpack_require__(10)
	  , $export        = __webpack_require__(1)
	  , redefine       = __webpack_require__(12)
	  , $fails         = __webpack_require__(7)
	  , shared         = __webpack_require__(78)
	  , setToStringTag = __webpack_require__(30)
	  , uid            = __webpack_require__(25)
	  , wks            = __webpack_require__(5)
	  , keyOf          = __webpack_require__(125)
	  , $names         = __webpack_require__(66)
	  , enumKeys       = __webpack_require__(124)
	  , isArray        = __webpack_require__(45)
	  , anObject       = __webpack_require__(4)
	  , toIObject      = __webpack_require__(13)
	  , createDesc     = __webpack_require__(22)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(48)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(2)
	  , redefine     = __webpack_require__(12)
	  , weak         = __webpack_require__(63)
	  , isObject     = __webpack_require__(3)
	  , has          = __webpack_require__(8)
	  , frozenStore  = weak.frozenStore
	  , WEAK         = weak.WEAK
	  , isExtensible = Object.isExtensible || isObject
	  , tmp          = {};
	
	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(35)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return frozenStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(63);
	
	// 23.4 WeakSet Objects
	__webpack_require__(35)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(1)
	  , $includes = __webpack_require__(60)(true);
	
	$export($export.P, 'Array', {
	  // https://github.com/domenic/Array.prototype.includes
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(24)('includes');

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(1);
	
	$export($export.P, 'Map', {toJSON: __webpack_require__(62)('Map')});

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export  = __webpack_require__(1)
	  , $entries = __webpack_require__(75)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/WebReflection/9353781
	var $          = __webpack_require__(2)
	  , $export    = __webpack_require__(1)
	  , ownKeys    = __webpack_require__(76)
	  , toIObject  = __webpack_require__(13)
	  , createDesc = __webpack_require__(22);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , setDesc = $.setDesc
	      , getDesc = $.getDesc
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key, D;
	    while(keys.length > i){
	      D = getDesc(O, key = keys[i++]);
	      if(key in result)setDesc(result, key, createDesc(0, D));
	      else result[key] = D;
	    } return result;
	  }
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	// http://goo.gl/XkBrjD
	var $export = __webpack_require__(1)
	  , $values = __webpack_require__(75)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(1)
	  , $re     = __webpack_require__(130)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(1);
	
	$export($export.P, 'Set', {toJSON: __webpack_require__(62)('Set')});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(1)
	  , $at     = __webpack_require__(52)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $pad    = __webpack_require__(79);
	
	$export($export.P, 'String', {
	  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(1)
	  , $pad    = __webpack_require__(79);
	
	$export($export.P, 'String', {
	  padRight: function padRight(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(42)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(42)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	// JavaScript 1.6 / Strawman array statics shim
	var $       = __webpack_require__(2)
	  , $export = __webpack_require__(1)
	  , $ctx    = __webpack_require__(15)
	  , $Array  = __webpack_require__(20).Array || Array
	  , statics = {};
	var setStatics = function(keys, length){
	  $.each.call(keys.split(','), function(key){
	    if(length == undefined && key in $Array)statics[key] = $Array[key];
	    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
	  });
	};
	setStatics('pop,reverse,shift,keys,values,entries', 1);
	setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
	setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
	           'reduce,reduceRight,copyWithin,fill');
	$export($export.S, 'Array', statics);

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(83);
	var global      = __webpack_require__(6)
	  , hide        = __webpack_require__(17)
	  , Iterators   = __webpack_require__(29)
	  , ITERATOR    = __webpack_require__(5)('iterator')
	  , NL          = global.NodeList
	  , HTC         = global.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype
	  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
	if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
	if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(1)
	  , $task   = __webpack_require__(81);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(6)
	  , $export    = __webpack_require__(1)
	  , invoke     = __webpack_require__(37)
	  , partial    = __webpack_require__(128)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(133);
	__webpack_require__(216);
	__webpack_require__(171);
	__webpack_require__(179);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(172);
	__webpack_require__(182);
	__webpack_require__(181);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(176);
	__webpack_require__(173);
	__webpack_require__(175);
	__webpack_require__(180);
	__webpack_require__(174);
	__webpack_require__(142);
	__webpack_require__(141);
	__webpack_require__(161);
	__webpack_require__(162);
	__webpack_require__(163);
	__webpack_require__(164);
	__webpack_require__(165);
	__webpack_require__(166);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(170);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	__webpack_require__(147);
	__webpack_require__(148);
	__webpack_require__(149);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(209);
	__webpack_require__(212);
	__webpack_require__(215);
	__webpack_require__(211);
	__webpack_require__(207);
	__webpack_require__(208);
	__webpack_require__(210);
	__webpack_require__(213);
	__webpack_require__(214);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(83);
	__webpack_require__(140);
	__webpack_require__(134);
	__webpack_require__(135);
	__webpack_require__(137);
	__webpack_require__(136);
	__webpack_require__(200);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	__webpack_require__(185);
	__webpack_require__(143);
	__webpack_require__(206);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(186);
	__webpack_require__(187);
	__webpack_require__(188);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(193);
	__webpack_require__(191);
	__webpack_require__(192);
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(199);
	__webpack_require__(198);
	__webpack_require__(219);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(230);
	__webpack_require__(224);
	__webpack_require__(222);
	__webpack_require__(223);
	__webpack_require__(221);
	__webpack_require__(220);
	__webpack_require__(225);
	__webpack_require__(231);
	__webpack_require__(234);
	__webpack_require__(233);
	__webpack_require__(232);
	module.exports = __webpack_require__(20);

/***/ },
/* 236 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createDOMRenderer;
	
	var _createElement = __webpack_require__(56);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	var _diff = __webpack_require__(55);
	
	var _patch = __webpack_require__(84);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Create a DOM renderer using a container element. Everything will be rendered
	 * inside of that container. Returns a function that accepts new state that can
	 * replace what is currently rendered.
	 */
	
	function createDOMRenderer(container, dispatch) {
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	  var oldVnode = null;
	  var node = null;
	  var rootId = options.id || '0';
	
	  if (container && container.childNodes.length > 0) {
	    container.innerHTML = '';
	  }
	
	  var update = function update(newVnode, context) {
	    var changes = (0, _diff.diffNode)(oldVnode, newVnode, rootId);
	    node = changes.reduce((0, _patch2.default)(dispatch, context), node);
	    oldVnode = newVnode;
	    return node;
	  };
	
	  var create = function create(vnode, context) {
	    node = (0, _createElement2.default)(vnode, rootId, dispatch, context);
	    if (container) container.appendChild(node);
	    oldVnode = vnode;
	    return node;
	  };
	
	  return function (vnode) {
	    var context = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    return node !== null ? update(vnode, context) : create(vnode, context);
	  };
	}

/***/ },
/* 238 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Special attributes that map to DOM events.
	 */
	
	exports.default = {
	  onAbort: 'abort',
	  onAnimationStart: 'animationstart',
	  onAnimationIteration: 'animationiteration',
	  onAnimationEnd: 'animationend',
	  onBlur: 'blur',
	  onCanPlay: 'canplay',
	  onCanPlayThrough: 'canplaythrough',
	  onChange: 'change',
	  onClick: 'click',
	  onContextMenu: 'contextmenu',
	  onCopy: 'copy',
	  onCut: 'cut',
	  onDoubleClick: 'dblclick',
	  onDrag: 'drag',
	  onDragEnd: 'dragend',
	  onDragEnter: 'dragenter',
	  onDragExit: 'dragexit',
	  onDragLeave: 'dragleave',
	  onDragOver: 'dragover',
	  onDragStart: 'dragstart',
	  onDrop: 'drop',
	  onDurationChange: 'durationchange',
	  onEmptied: 'emptied',
	  onEncrypted: 'encrypted',
	  onEnded: 'ended',
	  onError: 'error',
	  onFocus: 'focus',
	  onInput: 'input',
	  onInvalid: 'invalid',
	  onKeyDown: 'keydown',
	  onKeyPress: 'keypress',
	  onKeyUp: 'keyup',
	  onLoad: 'load',
	  onLoadedData: 'loadeddata',
	  onLoadedMetadata: 'loadedmetadata',
	  onLoadStart: 'loadstart',
	  onPause: 'pause',
	  onPlay: 'play',
	  onPlaying: 'playing',
	  onProgress: 'progress',
	  onMouseDown: 'mousedown',
	  onMouseEnter: 'mouseenter',
	  onMouseLeave: 'mouseleave',
	  onMouseMove: 'mousemove',
	  onMouseOut: 'mouseout',
	  onMouseOver: 'mouseover',
	  onMouseUp: 'mouseup',
	  onPaste: 'paste',
	  onRateChange: 'ratechange',
	  onReset: 'reset',
	  onScroll: 'scroll',
	  onSeeked: 'seeked',
	  onSeeking: 'seeking',
	  onSubmit: 'submit',
	  onStalled: 'stalled',
	  onSuspend: 'suspend',
	  onTimeUpdate: 'timeupdate',
	  onTransitionEnd: 'transitionend',
	  onTouchCancel: 'touchcancel',
	  onTouchEnd: 'touchend',
	  onTouchMove: 'touchmove',
	  onTouchStart: 'touchstart',
	  onVolumeChange: 'volumechange',
	  onWaiting: 'waiting',
	  onWheel: 'wheel'
	};

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.patch = exports.createElement = exports.createRenderer = undefined;
	
	var _createRenderer = __webpack_require__(237);
	
	var _createRenderer2 = _interopRequireDefault(_createRenderer);
	
	var _createElement = __webpack_require__(56);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	var _patch = __webpack_require__(84);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.createRenderer = _createRenderer2.default;
	exports.createElement = _createElement2.default;
	exports.patch = _patch2.default;

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _isSvgElement = __webpack_require__(245);
	
	var namespace = 'http://www.w3.org/2000/svg';
	
	exports.default = {
	  isElement: _isSvgElement.isElement,
	  namespace: namespace
	};

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.render = undefined;
	
	var _renderString = __webpack_require__(242);
	
	var render = _renderString.renderString;
	
	exports.render = render;

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderString = renderString;
	
	var _element = __webpack_require__(26);
	
	/**
	 * Turn an object of key/value pairs into a HTML attribute string. This
	 * function is responsible for what attributes are allowed to be rendered and
	 * should handle any other special cases specific to deku.
	 */
	
	function attributesToString(attributes) {
	  var str = '';
	  for (var name in attributes) {
	    var value = attributes[name];
	    if (name === 'innerHTML') continue;
	    if ((0, _element.isValidAttribute)(value)) str += ' ' + name + '="' + attributes[name] + '"';
	  }
	  return str;
	}
	
	/**
	 * Render a virtual element to a string. You can pass in an option state context
	 * object that will be given to all components.
	 */
	
	function renderString(element, context) {
	  var path = arguments.length <= 2 || arguments[2] === undefined ? '0' : arguments[2];
	
	  if ((0, _element.isText)(element)) {
	    return element.nodeValue;
	  }
	
	  if ((0, _element.isEmpty)(element)) {
	    return '<noscript></noscript>';
	  }
	
	  if ((0, _element.isThunk)(element)) {
	    var props = element.props;
	    var component = element.component;
	    var _children = element.children;
	    var render = component.render;
	
	    var output = render({
	      children: _children,
	      props: props,
	      path: path,
	      context: context
	    });
	    return renderString(output, context, path);
	  }
	
	  var attributes = element.attributes;
	  var type = element.type;
	  var children = element.children;
	
	  var innerHTML = attributes.innerHTML;
	  var str = '<' + type + attributesToString(attributes) + '>';
	
	  if (innerHTML) {
	    str += innerHTML;
	  } else {
	    str += children.map(function (child, i) {
	      return renderString(child, context, path + '.' + (child.key == null ? i : child.key));
	    }).join('');
	  }
	
	  str += '</' + type + '>';
	  return str;
	}

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.REMOVE = exports.MOVE = exports.UPDATE = exports.CREATE = undefined;
	
	var _bitVector = __webpack_require__(119);
	
	/**
	 * Actions
	 */
	
	var CREATE = 0; /**
	                 * Imports
	                 */
	
	var UPDATE = 1;
	var MOVE = 2;
	var REMOVE = 3;
	
	/**
	 * dift
	 */
	
	function dift(prev, next, effect, key) {
	  var pStartIdx = 0;
	  var nStartIdx = 0;
	  var pEndIdx = prev.length - 1;
	  var nEndIdx = next.length - 1;
	  var pStartItem = prev[pStartIdx];
	  var nStartItem = next[nStartIdx];
	
	  // List head is the same
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nStartItem)) {
	    effect(UPDATE, pStartItem, nStartItem, nStartIdx);
	    pStartItem = prev[++pStartIdx];
	    nStartItem = next[++nStartIdx];
	  }
	
	  // The above case is orders of magnitude more common than the others, so fast-path it
	  if (nStartIdx > nEndIdx && pStartIdx > pEndIdx) {
	    return;
	  }
	
	  var pEndItem = prev[pEndIdx];
	  var nEndItem = next[nEndIdx];
	  var movedFromFront = 0;
	
	  // Reversed
	  while (pStartIdx <= pEndIdx && nStartIdx <= nEndIdx && equal(pStartItem, nEndItem)) {
	    effect(MOVE, pStartItem, nEndItem, pEndIdx - movedFromFront + 1);
	    pStartItem = prev[++pStartIdx];
	    nEndItem = next[--nEndIdx];
	    ++movedFromFront;
	  }
	
	  // Reversed the other way (in case of e.g. reverse and append)
	  while (pEndIdx >= pStartIdx && nStartIdx <= nEndIdx && equal(nStartItem, pEndItem)) {
	    effect(MOVE, pEndItem, nStartItem, nStartIdx);
	    pEndItem = prev[--pEndIdx];
	    nStartItem = next[++nStartIdx];
	    --movedFromFront;
	  }
	
	  // List tail is the same
	  while (pEndIdx >= pStartIdx && nEndIdx >= nStartIdx && equal(pEndItem, nEndItem)) {
	    effect(UPDATE, pEndItem, nEndItem, nEndIdx);
	    pEndItem = prev[--pEndIdx];
	    nEndItem = next[--nEndIdx];
	  }
	
	  if (pStartIdx > pEndIdx) {
	    while (nStartIdx <= nEndIdx) {
	      effect(CREATE, null, nStartItem, nStartIdx);
	      nStartItem = next[++nStartIdx];
	    }
	
	    return;
	  }
	
	  if (nStartIdx > nEndIdx) {
	    while (pStartIdx <= pEndIdx) {
	      effect(REMOVE, pStartItem);
	      pStartItem = prev[++pStartIdx];
	    }
	
	    return;
	  }
	
	  var created = 0;
	  var pivotDest = null;
	  var pivotIdx = pStartIdx - movedFromFront;
	  var keepBase = pStartIdx;
	  var keep = (0, _bitVector.createBv)(pEndIdx - pStartIdx);
	
	  var prevMap = keyMap(prev, pStartIdx, pEndIdx + 1, key);
	
	  for (; nStartIdx <= nEndIdx; nStartItem = next[++nStartIdx]) {
	    var oldIdx = prevMap[key(nStartItem)];
	
	    if (isUndefined(oldIdx)) {
	      effect(CREATE, null, nStartItem, pivotIdx++);
	      ++created;
	    } else if (pStartIdx !== oldIdx) {
	      (0, _bitVector.setBit)(keep, oldIdx - keepBase);
	      effect(MOVE, prev[oldIdx], nStartItem, pivotIdx++);
	    } else {
	      pivotDest = nStartIdx;
	    }
	  }
	
	  if (pivotDest !== null) {
	    (0, _bitVector.setBit)(keep, 0);
	    effect(MOVE, prev[pStartIdx], next[pivotDest], pivotDest);
	  }
	
	  // If there are no creations, then you have to
	  // remove exactly max(prevLen - nextLen, 0) elements in this
	  // diff. You have to remove one more for each element
	  // that was created. This means once we have
	  // removed that many, we can stop.
	  var necessaryRemovals = prev.length - next.length + created;
	  for (var removals = 0; removals < necessaryRemovals; pStartItem = prev[++pStartIdx]) {
	    if (!(0, _bitVector.getBit)(keep, pStartIdx - keepBase)) {
	      effect(REMOVE, pStartItem);
	      ++removals;
	    }
	  }
	
	  function equal(a, b) {
	    return key(a) === key(b);
	  }
	}
	
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	function keyMap(items, start, end, key) {
	  var map = {};
	
	  for (var i = start; i < end; ++i) {
	    map[key(items[i])] = i;
	  }
	
	  return map;
	}
	
	/**
	 * Exports
	 */
	
	exports.default = dift;
	exports.CREATE = CREATE;
	exports.UPDATE = UPDATE;
	exports.MOVE = MOVE;
	exports.REMOVE = REMOVE;

/***/ },
/* 244 */
/***/ function(module, exports) {

	/*!
	 * index-of <https://github.com/jonschlinkert/index-of>
	 *
	 * Copyright (c) 2014-2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	module.exports = function indexOf(arr, ele, start) {
	  start = start || 0;
	  var idx = -1;
	
	  if (arr == null) return idx;
	  var len = arr.length;
	  var i = start < 0
	    ? (len + start)
	    : start;
	
	  if (i >= arr.length) {
	    return -1;
	  }
	
	  while (i < len) {
	    if (arr[i] === ele) {
	      return i;
	    }
	    i++;
	  }
	
	  return -1;
	};


/***/ },
/* 245 */
/***/ function(module, exports) {

	/**
	 * Supported SVG elements
	 *
	 * @type {Array}
	 */
	
	exports.elements = {
	  'animate': true,
	  'circle': true,
	  'defs': true,
	  'ellipse': true,
	  'g': true,
	  'line': true,
	  'linearGradient': true,
	  'mask': true,
	  'path': true,
	  'pattern': true,
	  'polygon': true,
	  'polyline': true,
	  'radialGradient': true,
	  'rect': true,
	  'stop': true,
	  'svg': true,
	  'text': true,
	  'tspan': true
	}
	
	/**
	 * Is element's namespace SVG?
	 *
	 * @param {String} name
	 */
	
	exports.isElement = function (name) {
	  return name in exports.elements
	}


/***/ },
/* 246 */
/***/ function(module, exports) {

	var supportedTypes = ['text', 'search', 'tel', 'url', 'password'];
	
	module.exports = function(element){
	    return !!(element.setSelectionRange && ~supportedTypes.indexOf(element.type));
	};


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	//  Ramda v0.15.1
	//  https://github.com/ramda/ramda
	//  (c) 2013-2015 Scott Sauyet, Michael Hurley, and David Chambers
	//  Ramda may be freely distributed under the MIT license.
	
	;(function() {
	
	  'use strict';
	
	  /**
	     * A special placeholder value used to specify "gaps" within curried functions,
	     * allowing partial application of any combination of arguments,
	     * regardless of their positions.
	     *
	     * If `g` is a curried ternary function and `_` is `R.__`, the following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2, _)(1, 3)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @constant
	     * @memberOf R
	     * @category Function
	     * @example
	     *
	     *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
	     *      greet('Alice'); //=> 'Hello, Alice!'
	     */
	    var __ = { '@@functional/placeholder': true };
	
	    var _add = function _add(a, b) {
	        return a + b;
	    };
	
	    var _all = function _all(fn, list) {
	        var idx = 0;
	        while (idx < list.length) {
	            if (!fn(list[idx])) {
	                return false;
	            }
	            idx += 1;
	        }
	        return true;
	    };
	
	    var _any = function _any(fn, list) {
	        var idx = 0;
	        while (idx < list.length) {
	            if (fn(list[idx])) {
	                return true;
	            }
	            idx += 1;
	        }
	        return false;
	    };
	
	    var _assoc = function _assoc(prop, val, obj) {
	        var result = {};
	        for (var p in obj) {
	            result[p] = obj[p];
	        }
	        result[prop] = val;
	        return result;
	    };
	
	    var _cloneRegExp = function _cloneRegExp(pattern) {
	        return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
	    };
	
	    var _complement = function _complement(f) {
	        return function () {
	            return !f.apply(this, arguments);
	        };
	    };
	
	    /**
	     * Basic, right-associative composition function. Accepts two functions and returns the
	     * composite function; this composite function represents the operation `var h = f(g(x))`,
	     * where `f` is the first argument, `g` is the second argument, and `x` is whatever
	     * argument(s) are passed to `h`.
	     *
	     * This function's main use is to build the more general `compose` function, which accepts
	     * any number of functions.
	     *
	     * @private
	     * @category Function
	     * @param {Function} f A function.
	     * @param {Function} g A function.
	     * @return {Function} A new function that is the equivalent of `f(g(x))`.
	     * @example
	     *
	     *      var double = function(x) { return x * 2; };
	     *      var square = function(x) { return x * x; };
	     *      var squareThenDouble = _compose(double, square);
	     *
	     *      squareThenDouble(5); //≅ double(square(5)) => 50
	     */
	    var _compose = function _compose(f, g) {
	        return function () {
	            return f.call(this, g.apply(this, arguments));
	        };
	    };
	
	    /**
	     * Private `concat` function to merge two array-like objects.
	     *
	     * @private
	     * @param {Array|Arguments} [set1=[]] An array-like object.
	     * @param {Array|Arguments} [set2=[]] An array-like object.
	     * @return {Array} A new, merged array.
	     * @example
	     *
	     *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	     */
	    var _concat = function _concat(set1, set2) {
	        set1 = set1 || [];
	        set2 = set2 || [];
	        var idx;
	        var len1 = set1.length;
	        var len2 = set2.length;
	        var result = [];
	        idx = 0;
	        while (idx < len1) {
	            result[result.length] = set1[idx];
	            idx += 1;
	        }
	        idx = 0;
	        while (idx < len2) {
	            result[result.length] = set2[idx];
	            idx += 1;
	        }
	        return result;
	    };
	
	    var _containsWith = function _containsWith(pred, x, list) {
	        var idx = 0, len = list.length;
	        while (idx < len) {
	            if (pred(x, list[idx])) {
	                return true;
	            }
	            idx += 1;
	        }
	        return false;
	    };
	
	    var _createMapEntry = function _createMapEntry(key, val) {
	        var obj = {};
	        obj[key] = val;
	        return obj;
	    };
	
	    /**
	     * Create a function which takes a comparator function and a list
	     * and determines the winning value by a compatator. Used internally
	     * by `R.maxBy` and `R.minBy`
	     *
	     * @private
	     * @param {Function} compatator a function to compare two items
	     * @category Math
	     * @return {Function}
	     */
	    var _createMaxMinBy = function _createMaxMinBy(comparator) {
	        return function (valueComputer, list) {
	            if (!(list && list.length > 0)) {
	                return;
	            }
	            var idx = 1;
	            var winner = list[idx];
	            var computedWinner = valueComputer(winner);
	            var computedCurrent;
	            while (idx < list.length) {
	                computedCurrent = valueComputer(list[idx]);
	                if (comparator(computedCurrent, computedWinner)) {
	                    computedWinner = computedCurrent;
	                    winner = list[idx];
	                }
	                idx += 1;
	            }
	            return winner;
	        };
	    };
	
	    /**
	     * Optimized internal two-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry1 = function _curry1(fn) {
	        return function f1(a) {
	            if (arguments.length === 0) {
	                return f1;
	            } else if (a != null && a['@@functional/placeholder'] === true) {
	                return f1;
	            } else {
	                return fn(a);
	            }
	        };
	    };
	
	    /**
	     * Optimized internal two-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry2 = function _curry2(fn) {
	        return function f2(a, b) {
	            var n = arguments.length;
	            if (n === 0) {
	                return f2;
	            } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	                return f2;
	            } else if (n === 1) {
	                return _curry1(function (b) {
	                    return fn(a, b);
	                });
	            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
	                return f2;
	            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	                return _curry1(function (a) {
	                    return fn(a, b);
	                });
	            } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	                return _curry1(function (b) {
	                    return fn(a, b);
	                });
	            } else {
	                return fn(a, b);
	            }
	        };
	    };
	
	    /**
	     * Optimized internal three-arity curry function.
	     *
	     * @private
	     * @category Function
	     * @param {Function} fn The function to curry.
	     * @return {Function} The curried function.
	     */
	    var _curry3 = function _curry3(fn) {
	        return function f3(a, b, c) {
	            var n = arguments.length;
	            if (n === 0) {
	                return f3;
	            } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
	                return f3;
	            } else if (n === 1) {
	                return _curry2(function (b, c) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
	                return f3;
	            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
	                return _curry2(function (a, c) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
	                return _curry2(function (b, c) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 2) {
	                return _curry1(function (c) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
	                return f3;
	            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
	                return _curry2(function (a, b) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
	                return _curry2(function (a, c) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 3 && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
	                return _curry2(function (b, c) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true) {
	                return _curry1(function (a) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 3 && b != null && b['@@functional/placeholder'] === true) {
	                return _curry1(function (b) {
	                    return fn(a, b, c);
	                });
	            } else if (n === 3 && c != null && c['@@functional/placeholder'] === true) {
	                return _curry1(function (c) {
	                    return fn(a, b, c);
	                });
	            } else {
	                return fn(a, b, c);
	            }
	        };
	    };
	
	    var _dissoc = function _dissoc(prop, obj) {
	        var result = {};
	        for (var p in obj) {
	            if (p !== prop) {
	                result[p] = obj[p];
	            }
	        }
	        return result;
	    };
	
	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Polyfill
	    // SameValue algorithm
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Step 6.a: NaN == NaN
	    var _eq = function _eq(x, y) {
	        // SameValue algorithm
	        if (x === y) {
	            // Steps 1-5, 7-10
	            // Steps 6.b-6.e: +0 != -0
	            return x !== 0 || 1 / x === 1 / y;
	        } else {
	            // Step 6.a: NaN == NaN
	            return x !== x && y !== y;
	        }
	    };
	
	    var _filter = function _filter(fn, list) {
	        var idx = 0, len = list.length, result = [];
	        while (idx < len) {
	            if (fn(list[idx])) {
	                result[result.length] = list[idx];
	            }
	            idx += 1;
	        }
	        return result;
	    };
	
	    var _filterIndexed = function _filterIndexed(fn, list) {
	        var idx = 0, len = list.length, result = [];
	        while (idx < len) {
	            if (fn(list[idx], idx, list)) {
	                result[result.length] = list[idx];
	            }
	            idx += 1;
	        }
	        return result;
	    };
	
	    // i can't bear not to return *something*
	    var _forEach = function _forEach(fn, list) {
	        var idx = 0, len = list.length;
	        while (idx < len) {
	            fn(list[idx]);
	            idx += 1;
	        }
	        // i can't bear not to return *something*
	        return list;
	    };
	
	    var _forceReduced = function _forceReduced(x) {
	        return {
	            '@@transducer/value': x,
	            '@@transducer/reduced': true
	        };
	    };
	
	    /**
	     * @private
	     * @param {Function} fn The strategy for extracting function names from an object
	     * @return {Function} A function that takes an object and returns an array of function names.
	     */
	    var _functionsWith = function _functionsWith(fn) {
	        return function (obj) {
	            return _filter(function (key) {
	                return typeof obj[key] === 'function';
	            }, fn(obj));
	        };
	    };
	
	    var _gt = function _gt(a, b) {
	        return a > b;
	    };
	
	    var _has = function _has(prop, obj) {
	        return Object.prototype.hasOwnProperty.call(obj, prop);
	    };
	
	    var _identity = function _identity(x) {
	        return x;
	    };
	
	    /**
	     * Tests whether or not an object is an array.
	     *
	     * @private
	     * @param {*} val The object to test.
	     * @return {Boolean} `true` if `val` is an array, `false` otherwise.
	     * @example
	     *
	     *      _isArray([]); //=> true
	     *      _isArray(null); //=> false
	     *      _isArray({}); //=> false
	     */
	    var _isArray = Array.isArray || function _isArray(val) {
	        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
	    };
	
	    /**
	     * Determine if the passed argument is an integer.
	     *
	     * @private
	     * @param {*} n
	     * @category Type
	     * @return {Boolean}
	     */
	    var _isInteger = Number.isInteger || function _isInteger(n) {
	        return n << 0 === n;
	    };
	
	    /**
	     * Tests if a value is a thenable (promise).
	     */
	    var _isThenable = function _isThenable(value) {
	        return value != null && value === Object(value) && typeof value.then === 'function';
	    };
	
	    var _isTransformer = function _isTransformer(obj) {
	        return typeof obj['@@transducer/step'] === 'function';
	    };
	
	    var _lt = function _lt(a, b) {
	        return a < b;
	    };
	
	    var _map = function _map(fn, list) {
	        var idx = 0, len = list.length, result = [];
	        while (idx < len) {
	            result[idx] = fn(list[idx]);
	            idx += 1;
	        }
	        return result;
	    };
	
	    var _multiply = function _multiply(a, b) {
	        return a * b;
	    };
	
	    var _nth = function _nth(n, list) {
	        return n < 0 ? list[list.length + n] : list[n];
	    };
	
	    /**
	     * internal path function
	     * Takes an array, paths, indicating the deep set of keys
	     * to find.
	     *
	     * @private
	     * @memberOf R
	     * @category Object
	     * @param {Array} paths An array of strings to map to object properties
	     * @param {Object} obj The object to find the path in
	     * @return {Array} The value at the end of the path or `undefined`.
	     * @example
	     *
	     *      _path(['a', 'b'], {a: {b: 2}}); //=> 2
	     */
	    var _path = function _path(paths, obj) {
	        if (obj == null) {
	            return;
	        } else {
	            var val = obj;
	            for (var idx = 0, len = paths.length; idx < len && val != null; idx += 1) {
	                val = val[paths[idx]];
	            }
	            return val;
	        }
	    };
	
	    var _prepend = function _prepend(el, list) {
	        return _concat([el], list);
	    };
	
	    var _quote = function _quote(s) {
	        return '"' + s.replace(/"/g, '\\"') + '"';
	    };
	
	    var _reduced = function _reduced(x) {
	        return x && x['@@transducer/reduced'] ? x : {
	            '@@transducer/value': x,
	            '@@transducer/reduced': true
	        };
	    };
	
	    /**
	     * An optimized, private array `slice` implementation.
	     *
	     * @private
	     * @param {Arguments|Array} args The array or arguments object to consider.
	     * @param {Number} [from=0] The array index to slice from, inclusive.
	     * @param {Number} [to=args.length] The array index to slice to, exclusive.
	     * @return {Array} A new, sliced array.
	     * @example
	     *
	     *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
	     *
	     *      var firstThreeArgs = function(a, b, c, d) {
	     *        return _slice(arguments, 0, 3);
	     *      };
	     *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
	     */
	    var _slice = function _slice(args, from, to) {
	        switch (arguments.length) {
	        case 1:
	            return _slice(args, 0, args.length);
	        case 2:
	            return _slice(args, from, args.length);
	        default:
	            var list = [];
	            var idx = 0;
	            var len = Math.max(0, Math.min(args.length, to) - from);
	            while (idx < len) {
	                list[idx] = args[from + idx];
	                idx += 1;
	            }
	            return list;
	        }
	    };
	
	    /**
	     * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
	     */
	    var _toISOString = function () {
	        var pad = function pad(n) {
	            return (n < 10 ? '0' : '') + n;
	        };
	        return typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
	            return d.toISOString();
	        } : function _toISOString(d) {
	            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
	        };
	    }();
	
	    var _xdropRepeatsWith = function () {
	        function XDropRepeatsWith(pred, xf) {
	            this.xf = xf;
	            this.pred = pred;
	            this.lastValue = undefined;
	            this.seenFirstValue = false;
	        }
	        XDropRepeatsWith.prototype['@@transducer/init'] = function () {
	            return this.xf['@@transducer/init']();
	        };
	        XDropRepeatsWith.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](result);
	        };
	        XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
	            var sameAsLast = false;
	            if (!this.seenFirstValue) {
	                this.seenFirstValue = true;
	            } else if (this.pred(this.lastValue, input)) {
	                sameAsLast = true;
	            }
	            this.lastValue = input;
	            return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdropRepeatsWith(pred, xf) {
	            return new XDropRepeatsWith(pred, xf);
	        });
	    }();
	
	    var _xfBase = {
	        init: function () {
	            return this.xf['@@transducer/init']();
	        },
	        result: function (result) {
	            return this.xf['@@transducer/result'](result);
	        }
	    };
	
	    var _xfilter = function () {
	        function XFilter(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XFilter.prototype['@@transducer/init'] = _xfBase.init;
	        XFilter.prototype['@@transducer/result'] = _xfBase.result;
	        XFilter.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
	        };
	        return _curry2(function _xfilter(f, xf) {
	            return new XFilter(f, xf);
	        });
	    }();
	
	    var _xfind = function () {
	        function XFind(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.found = false;
	        }
	        XFind.prototype['@@transducer/init'] = _xfBase.init;
	        XFind.prototype['@@transducer/result'] = function (result) {
	            if (!this.found) {
	                result = this.xf['@@transducer/step'](result, void 0);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XFind.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.found = true;
	                result = _reduced(this.xf['@@transducer/step'](result, input));
	            }
	            return result;
	        };
	        return _curry2(function _xfind(f, xf) {
	            return new XFind(f, xf);
	        });
	    }();
	
	    var _xfindIndex = function () {
	        function XFindIndex(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.idx = -1;
	            this.found = false;
	        }
	        XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
	        XFindIndex.prototype['@@transducer/result'] = function (result) {
	            if (!this.found) {
	                result = this.xf['@@transducer/step'](result, -1);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XFindIndex.prototype['@@transducer/step'] = function (result, input) {
	            this.idx += 1;
	            if (this.f(input)) {
	                this.found = true;
	                result = _reduced(this.xf['@@transducer/step'](result, this.idx));
	            }
	            return result;
	        };
	        return _curry2(function _xfindIndex(f, xf) {
	            return new XFindIndex(f, xf);
	        });
	    }();
	
	    var _xfindLast = function () {
	        function XFindLast(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XFindLast.prototype['@@transducer/init'] = _xfBase.init;
	        XFindLast.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
	        };
	        XFindLast.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.last = input;
	            }
	            return result;
	        };
	        return _curry2(function _xfindLast(f, xf) {
	            return new XFindLast(f, xf);
	        });
	    }();
	
	    var _xfindLastIndex = function () {
	        function XFindLastIndex(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.idx = -1;
	            this.lastIdx = -1;
	        }
	        XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
	        XFindLastIndex.prototype['@@transducer/result'] = function (result) {
	            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
	        };
	        XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
	            this.idx += 1;
	            if (this.f(input)) {
	                this.lastIdx = this.idx;
	            }
	            return result;
	        };
	        return _curry2(function _xfindLastIndex(f, xf) {
	            return new XFindLastIndex(f, xf);
	        });
	    }();
	
	    var _xmap = function () {
	        function XMap(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XMap.prototype['@@transducer/init'] = _xfBase.init;
	        XMap.prototype['@@transducer/result'] = _xfBase.result;
	        XMap.prototype['@@transducer/step'] = function (result, input) {
	            return this.xf['@@transducer/step'](result, this.f(input));
	        };
	        return _curry2(function _xmap(f, xf) {
	            return new XMap(f, xf);
	        });
	    }();
	
	    var _xtake = function () {
	        function XTake(n, xf) {
	            this.xf = xf;
	            this.n = n;
	        }
	        XTake.prototype['@@transducer/init'] = _xfBase.init;
	        XTake.prototype['@@transducer/result'] = _xfBase.result;
	        XTake.prototype['@@transducer/step'] = function (result, input) {
	            this.n -= 1;
	            return this.n === 0 ? _reduced(this.xf['@@transducer/step'](result, input)) : this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xtake(n, xf) {
	            return new XTake(n, xf);
	        });
	    }();
	
	    var _xtakeWhile = function () {
	        function XTakeWhile(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
	        XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
	            return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
	        };
	        return _curry2(function _xtakeWhile(f, xf) {
	            return new XTakeWhile(f, xf);
	        });
	    }();
	
	    var _xwrap = function () {
	        function XWrap(fn) {
	            this.f = fn;
	        }
	        XWrap.prototype['@@transducer/init'] = function () {
	            throw new Error('init not implemented on XWrap');
	        };
	        XWrap.prototype['@@transducer/result'] = function (acc) {
	            return acc;
	        };
	        XWrap.prototype['@@transducer/step'] = function (acc, x) {
	            return this.f(acc, x);
	        };
	        return function _xwrap(fn) {
	            return new XWrap(fn);
	        };
	    }();
	
	    /**
	     * Adds two numbers (or strings). Equivalent to `a + b` but curried.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @sig String -> String -> String
	     * @param {Number|String} a The first value.
	     * @param {Number|String} b The second value.
	     * @return {Number|String} The result of `a + b`.
	     * @example
	     *
	     *      R.add(2, 3);       //=>  5
	     *      R.add(7)(10);      //=> 17
	     */
	    var add = _curry2(_add);
	
	    /**
	     * Applies a function to the value at the given index of an array,
	     * returning a new copy of the array with the element at the given
	     * index replaced with the result of the function application.
	     * @see R.update
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> a) -> Number -> [a] -> [a]
	     * @param {Function} fn The function to apply.
	     * @param {Number} idx The index.
	     * @param {Array|Arguments} list An array-like object whose value
	     *        at the supplied index will be replaced.
	     * @return {Array} A copy of the supplied array-like object with
	     *         the element at index `idx` replaced with the value
	     *         returned by applying `fn` to the existing element.
	     * @example
	     *
	     *      R.adjust(R.add(10), 1, [0, 1, 2]);     //=> [0, 11, 2]
	     *      R.adjust(R.add(10))(1)([0, 1, 2]);     //=> [0, 11, 2]
	     */
	    var adjust = _curry3(function (fn, idx, list) {
	        if (idx >= list.length || idx < -list.length) {
	            return list;
	        }
	        var start = idx < 0 ? list.length : 0;
	        var _idx = start + idx;
	        var _list = _concat(list);
	        _list[_idx] = fn(list[_idx]);
	        return _list;
	    });
	
	    /**
	     * Returns a function that always returns the given value. Note that for non-primitives the value
	     * returned is a reference to the original value.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig a -> (* -> a)
	     * @param {*} val The value to wrap in a function
	     * @return {Function} A Function :: * -> val.
	     * @example
	     *
	     *      var t = R.always('Tee');
	     *      t(); //=> 'Tee'
	     */
	    var always = _curry1(function always(val) {
	        return function () {
	            return val;
	        };
	    });
	
	    /**
	     * Returns a new list, composed of n-tuples of consecutive elements
	     * If `n` is greater than the length of the list, an empty list is returned.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> [a] -> [[a]]
	     * @param {Number} n The size of the tuples to create
	     * @param {Array} list The list to split into `n`-tuples
	     * @return {Array} The new list.
	     * @example
	     *
	     *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
	     *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
	     *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
	     */
	    var aperture = _curry2(function aperture(n, list) {
	        var idx = 0;
	        var limit = list.length - (n - 1);
	        var acc = new Array(limit >= 0 ? limit : 0);
	        while (idx < limit) {
	            acc[idx] = _slice(list, idx, idx + n);
	            idx += 1;
	        }
	        return acc;
	    });
	
	    /**
	     * Applies function `fn` to the argument list `args`. This is useful for
	     * creating a fixed-arity function from a variadic function. `fn` should
	     * be a bound function if context is significant.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (*... -> a) -> [*] -> a
	     * @param {Function} fn
	     * @param {Array} args
	     * @return {*}
	     * @example
	     *
	     *      var nums = [1, 2, 3, -99, 42, 6, 7];
	     *      R.apply(Math.max, nums); //=> 42
	     */
	    var apply = _curry2(function apply(fn, args) {
	        return fn.apply(this, args);
	    });
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
	     * parameters. Unlike `nAry`, which passes only `n` arguments to the wrapped function,
	     * functions produced by `arity` will pass all provided arguments to the wrapped function.
	     *
	     * @func
	     * @memberOf R
	     * @sig (Number, (* -> *)) -> (* -> *)
	     * @category Function
	     * @param {Number} n The desired arity of the returned function.
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is
	     *         guaranteed to be of arity `n`.
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      var takesTwoArgs = function(a, b) {
	     *        return [a, b];
	     *      };
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.arity(1, takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // All arguments are passed through to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, 2]
	     */
	    // jshint unused:vars
	    var arity = _curry2(function (n, fn) {
	        // jshint unused:vars
	        switch (n) {
	        case 0:
	            return function () {
	                return fn.apply(this, arguments);
	            };
	        case 1:
	            return function (a0) {
	                return fn.apply(this, arguments);
	            };
	        case 2:
	            return function (a0, a1) {
	                return fn.apply(this, arguments);
	            };
	        case 3:
	            return function (a0, a1, a2) {
	                return fn.apply(this, arguments);
	            };
	        case 4:
	            return function (a0, a1, a2, a3) {
	                return fn.apply(this, arguments);
	            };
	        case 5:
	            return function (a0, a1, a2, a3, a4) {
	                return fn.apply(this, arguments);
	            };
	        case 6:
	            return function (a0, a1, a2, a3, a4, a5) {
	                return fn.apply(this, arguments);
	            };
	        case 7:
	            return function (a0, a1, a2, a3, a4, a5, a6) {
	                return fn.apply(this, arguments);
	            };
	        case 8:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	                return fn.apply(this, arguments);
	            };
	        case 9:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	                return fn.apply(this, arguments);
	            };
	        case 10:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	                return fn.apply(this, arguments);
	            };
	        default:
	            throw new Error('First argument to arity must be a non-negative integer no greater than ten');
	        }
	    });
	
	    /**
	     * Makes a shallow clone of an object, setting or overriding the specified
	     * property with the given value.  Note that this copies and flattens
	     * prototype properties onto the new object as well.  All non-primitive
	     * properties are copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig String -> a -> {k: v} -> {k: v}
	     * @param {String} prop the property name to set
	     * @param {*} val the new value
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original except for the specified property.
	     * @example
	     *
	     *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
	     */
	    var assoc = _curry3(_assoc);
	
	    /**
	     * Creates a function that is bound to a context.
	     * Note: `R.bind` does not provide the additional argument-binding capabilities of
	     * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @category Object
	     * @see R.partial
	     * @sig (* -> *) -> {*} -> (* -> *)
	     * @param {Function} fn The function to bind to context
	     * @param {Object} thisObj The context to bind `fn` to
	     * @return {Function} A function that will execute in the context of `thisObj`.
	     */
	    var bind = _curry2(function bind(fn, thisObj) {
	        return arity(fn.length, function () {
	            return fn.apply(thisObj, arguments);
	        });
	    });
	
	    /**
	     * A function wrapping calls to the two functions in an `&&` operation, returning the result of the first
	     * function if it is false-y and the result of the second function otherwise.  Note that this is
	     * short-circuited, meaning that the second function will not be invoked if the first returns a false-y
	     * value.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	     * @param {Function} f a predicate
	     * @param {Function} g another predicate
	     * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
	     * @example
	     *
	     *      var gt10 = function(x) { return x > 10; };
	     *      var even = function(x) { return x % 2 === 0 };
	     *      var f = R.both(gt10, even);
	     *      f(100); //=> true
	     *      f(101); //=> false
	     */
	    var both = _curry2(function both(f, g) {
	        return function _both() {
	            return f.apply(this, arguments) && g.apply(this, arguments);
	        };
	    });
	
	    /**
	     * Makes a comparator function out of a function that reports whether the first element is less than the second.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (a, b -> Boolean) -> (a, b -> Number)
	     * @param {Function} pred A predicate function of arity two.
	     * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`.
	     * @example
	     *
	     *      var cmp = R.comparator(function(a, b) {
	     *        return a.age < b.age;
	     *      });
	     *      var people = [
	     *        // ...
	     *      ];
	     *      R.sort(cmp, people);
	     */
	    var comparator = _curry1(function comparator(pred) {
	        return function (a, b) {
	            return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
	        };
	    });
	
	    /**
	     * Takes a function `f` and returns a function `g` such that:
	     *
	     *   - applying `g` to zero or more arguments will give __true__ if applying
	     *     the same arguments to `f` gives a logical __false__ value; and
	     *
	     *   - applying `g` to zero or more arguments will give __false__ if applying
	     *     the same arguments to `f` gives a logical __true__ value.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig (*... -> *) -> (*... -> Boolean)
	     * @param {Function} f
	     * @return {Function}
	     * @example
	     *
	     *      var isEven = function(n) { return n % 2 === 0; };
	     *      var isOdd = R.complement(isEven);
	     *      isOdd(21); //=> true
	     *      isOdd(42); //=> false
	     */
	    var complement = _curry1(_complement);
	
	    /**
	     * Returns a function, `fn`, which encapsulates if/else-if/else logic.
	     * Each argument to `R.cond` is a [predicate, transform] pair. All of
	     * the arguments to `fn` are applied to each of the predicates in turn
	     * until one returns a "truthy" value, at which point `fn` returns the
	     * result of applying its arguments to the corresponding transformer.
	     * If none of the predicates matches, `fn` returns undefined.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig [(*... -> Boolean),(*... -> *)]... -> (*... -> *)
	     * @param {...Function} functions
	     * @return {Function}
	     * @example
	     *
	     *      var fn = R.cond(
	     *        [R.equals(0),   R.always('water freezes at 0°C')],
	     *        [R.equals(100), R.always('water boils at 100°C')],
	     *        [R.T,           function(temp) { return 'nothing special happens at ' + temp + '°C'; }]
	     *      );
	     *      fn(0); //=> 'water freezes at 0°C'
	     *      fn(50); //=> 'nothing special happens at 50°C'
	     *      fn(100); //=> 'water boils at 100°C'
	     */
	    var cond = function cond() {
	        var pairs = arguments;
	        return function () {
	            var idx = 0;
	            while (idx < pairs.length) {
	                if (pairs[idx][0].apply(this, arguments)) {
	                    return pairs[idx][1].apply(this, arguments);
	                }
	                idx += 1;
	            }
	        };
	    };
	
	    /**
	     * Returns `true` if the `x` is found in the `list`, using `pred` as an
	     * equality predicate for `x`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a, a -> Boolean) -> a -> [a] -> Boolean
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {*} x The item to find
	     * @param {Array} list The list to iterate over
	     * @return {Boolean} `true` if `x` is in `list`, else `false`.
	     * @example
	     *
	     *      var xs = [{x: 12}, {x: 11}, {x: 10}];
	     *      R.containsWith(function(a, b) { return a.x === b.x; }, {x: 10}, xs); //=> true
	     *      R.containsWith(function(a, b) { return a.x === b.x; }, {x: 1}, xs); //=> false
	     */
	    var containsWith = _curry3(_containsWith);
	
	    /**
	     * Counts the elements of a list according to how many match each value
	     * of a key generated by the supplied function. Returns an object
	     * mapping the keys produced by `fn` to the number of occurrences in
	     * the list. Note that all keys are coerced to strings because of how
	     * JavaScript objects work.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig (a -> String) -> [a] -> {*}
	     * @param {Function} fn The function used to map values to keys.
	     * @param {Array} list The list to count elements from.
	     * @return {Object} An object mapping keys to number of occurrences in the list.
	     * @example
	     *
	     *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
	     *      var letters = R.split('', 'abcABCaaaBBc');
	     *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
	     *      R.countBy(R.toLower)(letters);   //=> {'a': 5, 'b': 4, 'c': 3}
	     */
	    var countBy = _curry2(function countBy(fn, list) {
	        var counts = {};
	        var len = list.length;
	        var idx = 0;
	        while (idx < len) {
	            var key = fn(list[idx]);
	            counts[key] = (_has(key, counts) ? counts[key] : 0) + 1;
	            idx += 1;
	        }
	        return counts;
	    });
	
	    /**
	     * Creates an object containing a single key:value pair.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig String -> a -> {String:a}
	     * @param {String} key
	     * @param {*} val
	     * @return {Object}
	     * @example
	     *
	     *      var matchPhrases = R.compose(
	     *        R.createMapEntry('must'),
	     *        R.map(R.createMapEntry('match_phrase'))
	     *      );
	     *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
	     */
	    var createMapEntry = _curry2(_createMapEntry);
	
	    /**
	     * Decrements its argument.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @example
	     *
	     *      R.dec(42); //=> 41
	     */
	    var dec = add(-1);
	
	    /**
	     * Returns the second argument if it is not null or undefined. If it is null
	     * or undefined, the first (default) argument is returned.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig a -> b -> a | b
	     * @param {a} val The default value.
	     * @param {b} val The value to return if it is not null or undefined
	     * @return {*} The the second value or the default value
	     * @example
	     *
	     *      var defaultTo42 = defaultTo(42);
	     *
	     *      defaultTo42(null);  //=> 42
	     *      defaultTo42(undefined);  //=> 42
	     *      defaultTo42('Ramda');  //=> 'Ramda'
	     */
	    var defaultTo = _curry2(function defaultTo(d, v) {
	        return v == null ? d : v;
	    });
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
	     * Duplication is determined according to the value returned by applying the supplied predicate to two list
	     * elements.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @see R.difference
	     * @return {Array} The elements in `list1` that are not in `list2`.
	     * @example
	     *
	     *      function cmp(x, y) { return x.a === y.a; }
	     *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
	     *      var l2 = [{a: 3}, {a: 4}];
	     *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
	     */
	    var differenceWith = _curry3(function differenceWith(pred, first, second) {
	        var out = [];
	        var idx = 0;
	        var firstLen = first.length;
	        var containsPred = containsWith(pred);
	        while (idx < firstLen) {
	            if (!containsPred(first[idx], second) && !containsPred(first[idx], out)) {
	                out[out.length] = first[idx];
	            }
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new object that does not contain a `prop` property.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig String -> {k: v} -> {k: v}
	     * @param {String} prop the name of the property to dissociate
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original but without the specified property
	     * @example
	     *
	     *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
	     */
	    var dissoc = _curry2(_dissoc);
	
	    /**
	     * Divides two numbers. Equivalent to `a / b`.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a / b`.
	     * @example
	     *
	     *      R.divide(71, 100); //=> 0.71
	     *
	     *      var half = R.divide(R.__, 2);
	     *      half(42); //=> 21
	     *
	     *      var reciprocal = R.divide(1);
	     *      reciprocal(4);   //=> 0.25
	     */
	    var divide = _curry2(function divide(a, b) {
	        return a / b;
	    });
	
	    /**
	     * A function wrapping calls to the two functions in an `||` operation, returning the result of the first
	     * function if it is truth-y and the result of the second function otherwise.  Note that this is
	     * short-circuited, meaning that the second function will not be invoked if the first returns a truth-y
	     * value.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
	     * @param {Function} f a predicate
	     * @param {Function} g another predicate
	     * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
	     * @example
	     *
	     *      var gt10 = function(x) { return x > 10; };
	     *      var even = function(x) { return x % 2 === 0 };
	     *      var f = R.either(gt10, even);
	     *      f(101); //=> true
	     *      f(8); //=> true
	     */
	    var either = _curry2(function either(f, g) {
	        return function _either() {
	            return f.apply(this, arguments) || g.apply(this, arguments);
	        };
	    });
	
	    /**
	     * Tests if two items are equal.  Equality is strict here, meaning reference equality for objects and
	     * non-coercing equality for primitives.
	     *
	     * Has `Object.is` semantics: `NaN` is considered equal to `NaN`; `0` and `-0`
	     * are not considered equal.
	     * @see R.identical
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      var o = {};
	     *      R.eq(o, o); //=> true
	     *      R.eq(o, {}); //=> false
	     *      R.eq(1, 1); //=> true
	     *      R.eq(1, '1'); //=> false
	     *      R.eq(0, -0); //=> false
	     *      R.eq(NaN, NaN); //=> true
	     */
	    var eq = _curry2(_eq);
	
	    /**
	     * Creates a new object by recursively evolving a shallow copy of `object`, according to the
	     * `transformation` functions. All non-primitive properties are copied by reference.
	     *
	     * A `tranformation` function will not be invoked if its corresponding key does not exist in
	     * the evolved object.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {k: (v -> v)} -> {k: v} -> {k: v}
	     * @param {Object} transformations The object specifying transformation functions to apply
	     *        to the object.
	     * @param {Object} object The object to be transformed.
	     * @return {Object} The transformed object.
	     * @example
	     *
	     *      var tomato  = {firstName: '  Tomato ', elapsed: 100, remaining: 1400};
	     *      var transformations = {
	     *        firstName: R.trim,
	     *        lastName: R.trim, // Will not get invoked.
	     *        data: {elapsed: R.add(1), remaining: R.add(-1)}
	     *      };
	     *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}}
	     */
	    var evolve = _curry2(function evolve(transformations, object) {
	        var transformation, key, type, result = {};
	        for (key in object) {
	            transformation = transformations[key];
	            type = typeof transformation;
	            result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
	        }
	        return result;
	    });
	
	    /**
	     * Like `filter`, but passes additional parameters to the predicate function. The predicate
	     * function is passed three arguments: *(value, index, list)*.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a, i, [a] -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} The new filtered array.
	     * @deprecated since v0.15.0
	     * @see R.addIndex
	     * @example
	     *
	     *      var lastTwo = function(val, idx, list) {
	     *        return list.length - idx <= 2;
	     *      };
	     *      R.filterIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [0, 9]
	     */
	    var filterIndexed = _curry2(_filterIndexed);
	
	    /**
	     * Like `forEach`, but but passes additional parameters to the predicate function.
	     *
	     * `fn` receives three arguments: *(value, index, list)*.
	     *
	     * Note: `R.forEachIndexed` does not skip deleted or unassigned indices (sparse arrays),
	     * unlike the native `Array.prototype.forEach` method. For more details on this behavior,
	     * see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
	     *
	     * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns the original
	     * array. In some libraries this function is named `each`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a, i, [a] -> ) -> [a] -> [a]
	     * @param {Function} fn The function to invoke. Receives three arguments:
	     *        (`value`, `index`, `list`).
	     * @param {Array} list The list to iterate over.
	     * @return {Array} The original list.
	     * @deprecated since v0.15.0
	     * @see R.addIndex
	     * @example
	     *
	     *      // Note that having access to the original `list` allows for
	     *      // mutation. While you *can* do this, it's very un-functional behavior:
	     *      var plusFive = function(num, idx, list) { list[idx] = num + 5 };
	     *      R.forEachIndexed(plusFive, [1, 2, 3]); //=> [6, 7, 8]
	     */
	    // i can't bear not to return *something*
	    var forEachIndexed = _curry2(function forEachIndexed(fn, list) {
	        var idx = 0, len = list.length;
	        while (idx < len) {
	            fn(list[idx], idx, list);
	            idx += 1;
	        }
	        // i can't bear not to return *something*
	        return list;
	    });
	
	    /**
	     * Creates a new object out of a list key-value pairs.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [[k,v]] -> {k: v}
	     * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
	     * @return {Object} The object made by pairing up `keys` and `values`.
	     * @example
	     *
	     *      R.fromPairs([['a', 1], ['b', 2],  ['c', 3]]); //=> {a: 1, b: 2, c: 3}
	     */
	    var fromPairs = _curry1(function fromPairs(pairs) {
	        var idx = 0, len = pairs.length, out = {};
	        while (idx < len) {
	            if (_isArray(pairs[idx]) && pairs[idx].length) {
	                out[pairs[idx][0]] = pairs[idx][1];
	            }
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns true if the first parameter is greater than the second.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean} a > b
	     * @example
	     *
	     *      R.gt(2, 6); //=> false
	     *      R.gt(2, 0); //=> true
	     *      R.gt(2, 2); //=> false
	     *      R.gt(R.__, 2)(10); //=> true
	     *      R.gt(2)(10); //=> false
	     */
	    var gt = _curry2(_gt);
	
	    /**
	     * Returns true if the first parameter is greater than or equal to the second.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean} a >= b
	     * @example
	     *
	     *      R.gte(2, 6); //=> false
	     *      R.gte(2, 0); //=> true
	     *      R.gte(2, 2); //=> true
	     *      R.gte(R.__, 6)(2); //=> false
	     *      R.gte(2)(0); //=> true
	     */
	    var gte = _curry2(function gte(a, b) {
	        return a >= b;
	    });
	
	    /**
	     * Returns whether or not an object has an own property with
	     * the specified name
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig s -> {s: x} -> Boolean
	     * @param {String} prop The name of the property to check for.
	     * @param {Object} obj The object to query.
	     * @return {Boolean} Whether the property exists.
	     * @example
	     *
	     *      var hasName = R.has('name');
	     *      hasName({name: 'alice'});   //=> true
	     *      hasName({name: 'bob'});     //=> true
	     *      hasName({});                //=> false
	     *
	     *      var point = {x: 0, y: 0};
	     *      var pointHas = R.has(R.__, point);
	     *      pointHas('x');  //=> true
	     *      pointHas('y');  //=> true
	     *      pointHas('z');  //=> false
	     */
	    var has = _curry2(_has);
	
	    /**
	     * Returns whether or not an object or its prototype chain has
	     * a property with the specified name
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig s -> {s: x} -> Boolean
	     * @param {String} prop The name of the property to check for.
	     * @param {Object} obj The object to query.
	     * @return {Boolean} Whether the property exists.
	     * @example
	     *
	     *      function Rectangle(width, height) {
	     *        this.width = width;
	     *        this.height = height;
	     *      }
	     *      Rectangle.prototype.area = function() {
	     *        return this.width * this.height;
	     *      };
	     *
	     *      var square = new Rectangle(2, 2);
	     *      R.hasIn('width', square);  //=> true
	     *      R.hasIn('area', square);  //=> true
	     */
	    var hasIn = _curry2(function (prop, obj) {
	        return prop in obj;
	    });
	
	    /**
	     * Returns true if its arguments are identical, false otherwise. Values are
	     * identical if they reference the same memory. `NaN` is identical to `NaN`;
	     * `0` and `-0` are not identical.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig a -> a -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @example
	     *
	     *      var o = {};
	     *      R.identical(o, o); //=> true
	     *      R.identical(1, 1); //=> true
	     *      R.identical(1, '1'); //=> false
	     *      R.identical([], []); //=> false
	     *      R.identical(0, -0); //=> false
	     *      R.identical(NaN, NaN); //=> true
	     */
	    // SameValue algorithm
	    // Steps 1-5, 7-10
	    // Steps 6.b-6.e: +0 != -0
	    // Step 6.a: NaN == NaN
	    var identical = _curry2(function identical(a, b) {
	        // SameValue algorithm
	        if (a === b) {
	            // Steps 1-5, 7-10
	            // Steps 6.b-6.e: +0 != -0
	            return a !== 0 || 1 / a === 1 / b;
	        } else {
	            // Step 6.a: NaN == NaN
	            return a !== a && b !== b;
	        }
	    });
	
	    /**
	     * A function that does nothing but return the parameter supplied to it. Good as a default
	     * or placeholder function.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig a -> a
	     * @param {*} x The value to return.
	     * @return {*} The input value, `x`.
	     * @example
	     *
	     *      R.identity(1); //=> 1
	     *
	     *      var obj = {};
	     *      R.identity(obj) === obj; //=> true
	     */
	    var identity = _curry1(_identity);
	
	    /**
	     * Increments its argument.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @example
	     *
	     *      R.inc(42); //=> 43
	     */
	    var inc = add(1);
	
	    /**
	     * Inserts the sub-list into the list, at index `index`.  _Note  that this
	     * is not destructive_: it returns a copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> [a] -> [a] -> [a]
	     * @param {Number} index The position to insert the sub-list
	     * @param {Array} elts The sub-list to insert into the Array
	     * @param {Array} list The list to insert the sub-list into
	     * @return {Array} A new Array with `elts` inserted starting at `index`.
	     * @example
	     *
	     *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
	     */
	    var insertAll = _curry3(function insertAll(idx, elts, list) {
	        idx = idx < list.length && idx >= 0 ? idx : list.length;
	        return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
	    });
	
	    /**
	     * See if an object (`val`) is an instance of the supplied constructor.
	     * This function will check up the inheritance chain, if any.
	     *
	     * @func
	     * @memberOf R
	     * @category Type
	     * @sig (* -> {*}) -> a -> Boolean
	     * @param {Object} ctor A constructor
	     * @param {*} val The value to test
	     * @return {Boolean}
	     * @example
	     *
	     *      R.is(Object, {}); //=> true
	     *      R.is(Number, 1); //=> true
	     *      R.is(Object, 1); //=> false
	     *      R.is(String, 's'); //=> true
	     *      R.is(String, new String('')); //=> true
	     *      R.is(Object, new String('')); //=> true
	     *      R.is(Object, 's'); //=> false
	     *      R.is(Number, {}); //=> false
	     */
	    var is = _curry2(function is(Ctor, val) {
	        return val != null && val.constructor === Ctor || val instanceof Ctor;
	    });
	
	    /**
	     * Tests whether or not an object is similar to an array.
	     *
	     * @func
	     * @memberOf R
	     * @category Type
	     * @category List
	     * @sig * -> Boolean
	     * @param {*} x The object to test.
	     * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
	     * @example
	     *
	     *      R.isArrayLike([]); //=> true
	     *      R.isArrayLike(true); //=> false
	     *      R.isArrayLike({}); //=> false
	     *      R.isArrayLike({length: 10}); //=> false
	     *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
	     */
	    var isArrayLike = _curry1(function isArrayLike(x) {
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
	    });
	
	    /**
	     * Reports whether the list has zero elements.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig [a] -> Boolean
	     * @param {Array} list
	     * @return {Boolean}
	     * @example
	     *
	     *      R.isEmpty([1, 2, 3]);   //=> false
	     *      R.isEmpty([]);          //=> true
	     *      R.isEmpty('');          //=> true
	     *      R.isEmpty(null);        //=> false
	     *      R.isEmpty(R.keys({}));  //=> true
	     *      R.isEmpty({});          //=> false ({} does not have a length property)
	     *      R.isEmpty({length: 0}); //=> true
	     */
	    var isEmpty = _curry1(function isEmpty(list) {
	        return Object(list).length === 0;
	    });
	
	    /**
	     * Checks if the input value is `null` or `undefined`.
	     *
	     * @func
	     * @memberOf R
	     * @category Type
	     * @sig * -> Boolean
	     * @param {*} x The value to test.
	     * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
	     * @example
	     *
	     *      R.isNil(null); //=> true
	     *      R.isNil(undefined); //=> true
	     *      R.isNil(0); //=> false
	     *      R.isNil([]); //=> false
	     */
	    var isNil = _curry1(function isNil(x) {
	        return x == null;
	    });
	
	    /**
	     * Returns a list containing the names of all the enumerable own
	     * properties of the supplied object.
	     * Note that the order of the output array is not guaranteed to be
	     * consistent across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {k: v} -> [k]
	     * @param {Object} obj The object to extract properties from
	     * @return {Array} An array of the object's own properties.
	     * @example
	     *
	     *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
	     */
	    // cover IE < 9 keys issues
	    var keys = function () {
	        // cover IE < 9 keys issues
	        var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	        var nonEnumerableProps = [
	            'constructor',
	            'valueOf',
	            'isPrototypeOf',
	            'toString',
	            'propertyIsEnumerable',
	            'hasOwnProperty',
	            'toLocaleString'
	        ];
	        var contains = function contains(list, item) {
	            var idx = 0;
	            while (idx < list.length) {
	                if (list[idx] === item) {
	                    return true;
	                }
	                idx += 1;
	            }
	            return false;
	        };
	        return typeof Object.keys === 'function' ? _curry1(function keys(obj) {
	            return Object(obj) !== obj ? [] : Object.keys(obj);
	        }) : _curry1(function keys(obj) {
	            if (Object(obj) !== obj) {
	                return [];
	            }
	            var prop, ks = [], nIdx;
	            for (prop in obj) {
	                if (_has(prop, obj)) {
	                    ks[ks.length] = prop;
	                }
	            }
	            if (hasEnumBug) {
	                nIdx = nonEnumerableProps.length - 1;
	                while (nIdx >= 0) {
	                    prop = nonEnumerableProps[nIdx];
	                    if (_has(prop, obj) && !contains(ks, prop)) {
	                        ks[ks.length] = prop;
	                    }
	                    nIdx -= 1;
	                }
	            }
	            return ks;
	        });
	    }();
	
	    /**
	     * Returns a list containing the names of all the
	     * properties of the supplied object, including prototype properties.
	     * Note that the order of the output array is not guaranteed to be
	     * consistent across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {k: v} -> [k]
	     * @param {Object} obj The object to extract properties from
	     * @return {Array} An array of the object's own and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.keysIn(f); //=> ['x', 'y']
	     */
	    var keysIn = _curry1(function keysIn(obj) {
	        var prop, ks = [];
	        for (prop in obj) {
	            ks[ks.length] = prop;
	        }
	        return ks;
	    });
	
	    /**
	     * Returns the number of elements in the array by returning `list.length`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> Number
	     * @param {Array} list The array to inspect.
	     * @return {Number} The length of the array.
	     * @example
	     *
	     *      R.length([]); //=> 0
	     *      R.length([1, 2, 3]); //=> 3
	     */
	    var length = _curry1(function length(list) {
	        return list != null && is(Number, list.length) ? list.length : NaN;
	    });
	
	    /**
	     * Creates a lens. Supply a function to `get` values from inside an object, and a `set`
	     * function to change values on an object. (n.b.: This can, and should, be done without
	     * mutating the original object!) The lens is a function wrapped around the input `get`
	     * function, with the `set` function attached as a property on the wrapper. A `map`
	     * function is also attached to the returned function that takes a function to operate
	     * on the specified (`get`) property, which is then `set` before returning. The attached
	     * `set` and `map` functions are curried.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig (k -> v) -> (v -> a -> *) -> (a -> b)
	     * @param {Function} get A function that gets a value by property name
	     * @param {Function} set A function that sets a value by property name
	     * @return {Function} the returned function has `set` and `map` properties that are
	     *         also curried functions.
	     * @example
	     *
	     *      var headLens = R.lens(
	     *        function get(arr) { return arr[0]; },
	     *        function set(val, arr) { return [val].concat(arr.slice(1)); }
	     *      );
	     *      headLens([10, 20, 30, 40]); //=> 10
	     *      headLens.set('mu', [10, 20, 30, 40]); //=> ['mu', 20, 30, 40]
	     *      headLens.map(function(x) { return x + 1; }, [10, 20, 30, 40]); //=> [11, 20, 30, 40]
	     *
	     *      var phraseLens = R.lens(
	     *        function get(obj) { return obj.phrase; },
	     *        function set(val, obj) {
	     *          var out = R.clone(obj);
	     *          out.phrase = val;
	     *          return out;
	     *        }
	     *      );
	     *      var obj1 = { phrase: 'Absolute filth . . . and I LOVED it!'};
	     *      var obj2 = { phrase: "What's all this, then?"};
	     *      phraseLens(obj1); // => 'Absolute filth . . . and I LOVED it!'
	     *      phraseLens(obj2); // => "What's all this, then?"
	     *      phraseLens.set('Ooh Betty', obj1); //=> { phrase: 'Ooh Betty'}
	     *      phraseLens.map(R.toUpper, obj2); //=> { phrase: "WHAT'S ALL THIS, THEN?"}
	     */
	    var lens = _curry2(function lens(get, set) {
	        var lns = function (a) {
	            return get(a);
	        };
	        lns.set = _curry2(set);
	        lns.map = _curry2(function (fn, a) {
	            return set(fn(get(a)), a);
	        });
	        return lns;
	    });
	
	    /**
	     * Returns a lens associated with the provided object.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig ({} -> v) -> (v -> a -> *) -> {} -> (a -> b)
	     * @see R.lens
	     * @param {Function} get A function that gets a value by property name
	     * @param {Function} set A function that sets a value by property name
	     * @param {Object} the actual object of interest
	     * @return {Function} the returned function has `set` and `map` properties that are
	     *         also curried functions.
	     * @example
	     *
	     *      var xo = {x: 1};
	     *      var xoLens = R.lensOn(function get(o) { return o.x; },
	     *                            function set(v) { return {x: v}; },
	     *                            xo);
	     *      xoLens(); //=> 1
	     *      xoLens.set(1000); //=> {x: 1000}
	     *      xoLens.map(R.add(1)); //=> {x: 2}
	     */
	    var lensOn = _curry3(function lensOn(get, set, obj) {
	        var lns = function () {
	            return get(obj);
	        };
	        lns.set = set;
	        lns.map = function (fn) {
	            return set(fn(get(obj)));
	        };
	        return lns;
	    });
	
	    /**
	     * Returns true if the first parameter is less than the second.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean} a < b
	     * @example
	     *
	     *      R.lt(2, 6); //=> true
	     *      R.lt(2, 0); //=> false
	     *      R.lt(2, 2); //=> false
	     *      R.lt(5)(10); //=> true
	     *      R.lt(R.__, 5)(10); //=> false // right-sectioned currying
	     */
	    var lt = _curry2(_lt);
	
	    /**
	     * Returns true if the first parameter is less than or equal to the second.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Boolean
	     * @param {Number} a
	     * @param {Number} b
	     * @return {Boolean} a <= b
	     * @example
	     *
	     *      R.lte(2, 6); //=> true
	     *      R.lte(2, 0); //=> false
	     *      R.lte(2, 2); //=> true
	     *      R.lte(R.__, 2)(1); //=> true
	     *      R.lte(2)(10); //=> true
	     */
	    var lte = _curry2(function lte(a, b) {
	        return a <= b;
	    });
	
	    /**
	     * The mapAccum function behaves like a combination of map and reduce; it applies a
	     * function to each element of a list, passing an accumulating parameter from left to
	     * right, and returning a final value of this accumulator together with the new list.
	     *
	     * The iterator function receives two arguments, *acc* and *value*, and should return
	     * a tuple *[acc, value]*.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var digits = ['1', '2', '3', '4'];
	     *      var append = function(a, b) {
	     *        return [a + b, a + b];
	     *      }
	     *
	     *      R.mapAccum(append, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
	     */
	    var mapAccum = _curry3(function mapAccum(fn, acc, list) {
	        var idx = 0, len = list.length, result = [], tuple = [acc];
	        while (idx < len) {
	            tuple = fn(tuple[0], list[idx]);
	            result[idx] = tuple[1];
	            idx += 1;
	        }
	        return [
	            tuple[0],
	            result
	        ];
	    });
	
	    /**
	     * The mapAccumRight function behaves like a combination of map and reduce; it applies a
	     * function to each element of a list, passing an accumulating parameter from right
	     * to left, and returning a final value of this accumulator together with the new list.
	     *
	     * Similar to `mapAccum`, except moves through the input list from the right to the
	     * left.
	     *
	     * The iterator function receives two arguments, *acc* and *value*, and should return
	     * a tuple *[acc, value]*.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var digits = ['1', '2', '3', '4'];
	     *      var append = function(a, b) {
	     *        return [a + b, a + b];
	     *      }
	     *
	     *      R.mapAccumRight(append, 0, digits); //=> ['04321', ['04321', '0432', '043', '04']]
	     */
	    var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
	        var idx = list.length - 1, result = [], tuple = [acc];
	        while (idx >= 0) {
	            tuple = fn(tuple[0], list[idx]);
	            result[idx] = tuple[1];
	            idx -= 1;
	        }
	        return [
	            tuple[0],
	            result
	        ];
	    });
	
	    /**
	     * Like `map`, but but passes additional parameters to the mapping function.
	     * `fn` receives three arguments: *(value, index, list)*.
	     *
	     * Note: `R.mapIndexed` does not skip deleted or unassigned indices (sparse arrays), unlike
	     * the native `Array.prototype.map` method. For more details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a,i,[b] -> b) -> [a] -> [b]
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {Array} list The list to be iterated over.
	     * @return {Array} The new list.
	     * @deprecated since v0.15.0
	     * @see R.addIndex
	     * @example
	     *
	     *      var squareEnds = function(elt, idx, list) {
	     *        if (idx === 0 || idx === list.length - 1) {
	     *          return elt * elt;
	     *        }
	     *        return elt;
	     *      };
	     *
	     *      R.mapIndexed(squareEnds, [8, 5, 3, 0, 9]); //=> [64, 5, 3, 0, 81]
	     */
	    var mapIndexed = _curry2(function mapIndexed(fn, list) {
	        var idx = 0, len = list.length, result = [];
	        while (idx < len) {
	            result[idx] = fn(list[idx], idx, list);
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * mathMod behaves like the modulo operator should mathematically, unlike the `%`
	     * operator (and by extension, R.modulo). So while "-17 % 5" is -2,
	     * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
	     * when the modulus is zero or negative.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} m The dividend.
	     * @param {Number} p the modulus.
	     * @return {Number} The result of `b mod a`.
	     * @see R.moduloBy
	     * @example
	     *
	     *      R.mathMod(-17, 5);  //=> 3
	     *      R.mathMod(17, 5);   //=> 2
	     *      R.mathMod(17, -5);  //=> NaN
	     *      R.mathMod(17, 0);   //=> NaN
	     *      R.mathMod(17.2, 5); //=> NaN
	     *      R.mathMod(17, 5.3); //=> NaN
	     *
	     *      var clock = R.mathMod(R.__, 12);
	     *      clock(15); //=> 3
	     *      clock(24); //=> 0
	     *
	     *      var seventeenMod = R.mathMod(17);
	     *      seventeenMod(3);  //=> 2
	     *      seventeenMod(4);  //=> 1
	     *      seventeenMod(10); //=> 7
	     */
	    var mathMod = _curry2(function mathMod(m, p) {
	        if (!_isInteger(m)) {
	            return NaN;
	        }
	        if (!_isInteger(p) || p < 1) {
	            return NaN;
	        }
	        return (m % p + p) % p;
	    });
	
	    /**
	     * Determines the largest of a list of items as determined by pairwise comparisons from the supplied comparator.
	     * Note that this will return undefined if supplied an empty list.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig (a -> Number) -> [a] -> a
	     * @param {Function} keyFn A comparator function for elements in the list
	     * @param {Array} list A list of comparable elements
	     * @return {*} The greatest element in the list. `undefined` if the list is empty.
	     * @see R.max
	     * @example
	     *
	     *      function cmp(obj) { return obj.x; }
	     *      var a = {x: 1}, b = {x: 2}, c = {x: 3};
	     *      R.maxBy(cmp, [a, b, c]); //=> {x: 3}
	     */
	    var maxBy = _curry2(_createMaxMinBy(_gt));
	
	    /**
	     * Determines the smallest of a list of items as determined by pairwise comparisons from the supplied comparator
	     * Note that this will return undefined if supplied an empty list.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig (a -> Number) -> [a] -> a
	     * @param {Function} keyFn A comparator function for elements in the list
	     * @param {Array} list A list of comparable elements
	     * @see R.min
	     * @return {*} The greatest element in the list. `undefined` if the list is empty.
	     * @example
	     *
	     *      function cmp(obj) { return obj.x; }
	     *      var a = {x: 1}, b = {x: 2}, c = {x: 3};
	     *      R.minBy(cmp, [a, b, c]); //=> {x: 1}
	     */
	    var minBy = _curry2(_createMaxMinBy(_lt));
	
	    /**
	     * Divides the second parameter by the first and returns the remainder.
	     * Note that this functions preserves the JavaScript-style behavior for
	     * modulo. For mathematical modulo see `mathMod`
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The value to the divide.
	     * @param {Number} b The pseudo-modulus
	     * @return {Number} The result of `b % a`.
	     * @see R.mathMod
	     * @example
	     *
	     *      R.modulo(17, 3); //=> 2
	     *      // JS behavior:
	     *      R.modulo(-17, 3); //=> -2
	     *      R.modulo(17, -3); //=> 2
	     *
	     *      var isOdd = R.modulo(R.__, 2);
	     *      isOdd(42); //=> 0
	     *      isOdd(21); //=> 1
	     */
	    var modulo = _curry2(function modulo(a, b) {
	        return a % b;
	    });
	
	    /**
	     * Multiplies two numbers. Equivalent to `a * b` but curried.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a * b`.
	     * @example
	     *
	     *      var double = R.multiply(2);
	     *      var triple = R.multiply(3);
	     *      double(3);       //=>  6
	     *      triple(4);       //=> 12
	     *      R.multiply(2, 5);  //=> 10
	     */
	    var multiply = _curry2(_multiply);
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
	     * parameters. Any extraneous parameters will not be passed to the supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig Number -> (* -> a) -> (* -> a)
	     * @param {Number} n The desired arity of the new function.
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity `n`.
	     * @example
	     *
	     *      var takesTwoArgs = function(a, b) {
	     *        return [a, b];
	     *      };
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.nAry(1, takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // Only `n` arguments are passed to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, undefined]
	     */
	    var nAry = _curry2(function (n, fn) {
	        switch (n) {
	        case 0:
	            return function () {
	                return fn.call(this);
	            };
	        case 1:
	            return function (a0) {
	                return fn.call(this, a0);
	            };
	        case 2:
	            return function (a0, a1) {
	                return fn.call(this, a0, a1);
	            };
	        case 3:
	            return function (a0, a1, a2) {
	                return fn.call(this, a0, a1, a2);
	            };
	        case 4:
	            return function (a0, a1, a2, a3) {
	                return fn.call(this, a0, a1, a2, a3);
	            };
	        case 5:
	            return function (a0, a1, a2, a3, a4) {
	                return fn.call(this, a0, a1, a2, a3, a4);
	            };
	        case 6:
	            return function (a0, a1, a2, a3, a4, a5) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5);
	            };
	        case 7:
	            return function (a0, a1, a2, a3, a4, a5, a6) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
	            };
	        case 8:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
	            };
	        case 9:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
	            };
	        case 10:
	            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
	                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
	            };
	        default:
	            throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
	        }
	    });
	
	    /**
	     * Negates its argument.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number
	     * @param {Number} n
	     * @return {Number}
	     * @example
	     *
	     *      R.negate(42); //=> -42
	     */
	    var negate = _curry1(function negate(n) {
	        return -n;
	    });
	
	    /**
	     * A function that returns the `!` of its argument. It will return `true` when
	     * passed false-y value, and `false` when passed a truth-y one.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig * -> Boolean
	     * @param {*} a any value
	     * @return {Boolean} the logical inverse of passed argument.
	     * @see R.complement
	     * @example
	     *
	     *      R.not(true); //=> false
	     *      R.not(false); //=> true
	     *      R.not(0); => true
	     *      R.not(1); => false
	     */
	    var not = _curry1(function not(a) {
	        return !a;
	    });
	
	    /**
	     * Returns the nth element in a list.
	     * If n is negative the element at index length + n is returned.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> [a] -> a
	     * @param {Number} idx
	     * @param {Array} list
	     * @return {*} The nth element of the list.
	     * @example
	     *
	     *      var list = ['foo', 'bar', 'baz', 'quux'];
	     *      R.nth(1, list); //=> 'bar'
	     *      R.nth(-1, list); //=> 'quux'
	     *      R.nth(-99, list); //=> undefined
	     */
	    var nth = _curry2(_nth);
	
	    /**
	     * Returns a function which returns its nth argument.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig Number -> *... -> *
	     * @param {Number} n
	     * @return {Function}
	     * @example
	     *
	     *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
	     *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
	     */
	    var nthArg = _curry1(function nthArg(n) {
	        return function () {
	            return _nth(n, arguments);
	        };
	    });
	
	    /**
	     * Returns the nth character of the given string.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig Number -> String -> String
	     * @param {Number} n
	     * @param {String} str
	     * @return {String}
	     * @example
	     *
	     *      R.nthChar(2, 'Ramda'); //=> 'm'
	     *      R.nthChar(-2, 'Ramda'); //=> 'd'
	     */
	    var nthChar = _curry2(function nthChar(n, str) {
	        return str.charAt(n < 0 ? str.length + n : n);
	    });
	
	    /**
	     * Returns the character code of the nth character of the given string.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig Number -> String -> Number
	     * @param {Number} n
	     * @param {String} str
	     * @return {Number}
	     * @example
	     *
	     *      R.nthCharCode(2, 'Ramda'); //=> 'm'.charCodeAt(0)
	     *      R.nthCharCode(-2, 'Ramda'); //=> 'd'.charCodeAt(0)
	     */
	    var nthCharCode = _curry2(function nthCharCode(n, str) {
	        return str.charCodeAt(n < 0 ? str.length + n : n);
	    });
	
	    /**
	     * Returns a singleton array containing the value provided.
	     *
	     * Note this `of` is different from the ES6 `of`; See
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig a -> [a]
	     * @param {*} x any value
	     * @return {Array} An array wrapping `x`.
	     * @example
	     *
	     *      R.of(null); //=> [null]
	     *      R.of([42]); //=> [[42]]
	     */
	    var of = _curry1(function of(x) {
	        return [x];
	    });
	
	    /**
	     * Accepts a function `fn` and returns a function that guards invocation of `fn` such that
	     * `fn` can only ever be called once, no matter how many times the returned function is
	     * invoked.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (a... -> b) -> (a... -> b)
	     * @param {Function} fn The function to wrap in a call-only-once wrapper.
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      var addOneOnce = R.once(function(x){ return x + 1; });
	     *      addOneOnce(10); //=> 11
	     *      addOneOnce(addOneOnce(50)); //=> 11
	     */
	    var once = _curry1(function once(fn) {
	        var called = false, result;
	        return function () {
	            if (called) {
	                return result;
	            }
	            called = true;
	            result = fn.apply(this, arguments);
	            return result;
	        };
	    });
	
	    /**
	     * Retrieve the value at a given path.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig [String] -> {*} -> *
	     * @param {Array} path The path to use.
	     * @return {*} The data at `path`.
	     * @example
	     *
	     *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
	     */
	    var path = _curry2(_path);
	
	    /**
	     * Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
	     * property is ignored.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig [k] -> {k: v} -> {k: v}
	     * @param {Array} names an array of String property names to copy onto a new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties from `names` on it.
	     * @example
	     *
	     *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	     *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
	     */
	    var pick = _curry2(function pick(names, obj) {
	        var result = {};
	        var idx = 0;
	        while (idx < names.length) {
	            if (names[idx] in obj) {
	                result[names[idx]] = obj[names[idx]];
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Similar to `pick` except that this one includes a `key: undefined` pair for properties that don't exist.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig [k] -> {k: v} -> {k: v}
	     * @param {Array} names an array of String property names to copy onto a new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties from `names` on it.
	     * @see R.pick
	     * @example
	     *
	     *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
	     *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
	     */
	    var pickAll = _curry2(function pickAll(names, obj) {
	        var result = {};
	        var idx = 0;
	        var len = names.length;
	        while (idx < len) {
	            var name = names[idx];
	            result[name] = obj[name];
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns a partial copy of an object containing only the keys that
	     * satisfy the supplied predicate.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
	     * @param {Function} pred A predicate to determine whether or not a key
	     *        should be included on the output object.
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with only properties that satisfy `pred`
	     *         on it.
	     * @see R.pick
	     * @example
	     *
	     *      var isUpperCase = function(val, key) { return key.toUpperCase() === key; }
	     *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
	     */
	    var pickBy = _curry2(function pickBy(test, obj) {
	        var result = {};
	        for (var prop in obj) {
	            if (test(obj[prop], prop, obj)) {
	                result[prop] = obj[prop];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Returns a new list with the given element at the front, followed by the contents of the
	     * list.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} el The item to add to the head of the output list.
	     * @param {Array} list The array to add to the tail of the output list.
	     * @return {Array} A new array.
	     * @example
	     *
	     *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
	     */
	    var prepend = _curry2(_prepend);
	
	    /**
	     * Returns a function that when supplied an object returns the indicated property of that object, if it exists.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig s -> {s: a} -> a
	     * @param {String} p The property name
	     * @param {Object} obj The object to query
	     * @return {*} The value at `obj.p`.
	     * @example
	     *
	     *      R.prop('x', {x: 100}); //=> 100
	     *      R.prop('x', {}); //=> undefined
	     */
	    var prop = _curry2(function prop(p, obj) {
	        return obj[p];
	    });
	
	    /**
	     * If the given, non-null object has an own property with the specified name,
	     * returns the value of that property.
	     * Otherwise returns the provided default value.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig a -> String -> Object -> a
	     * @param {*} val The default value.
	     * @param {String} p The name of the property to return.
	     * @param {Object} obj The object to query.
	     * @return {*} The value of given property of the supplied object or the default value.
	     * @example
	     *
	     *      var alice = {
	     *        name: 'ALICE',
	     *        age: 101
	     *      };
	     *      var favorite = R.prop('favoriteLibrary');
	     *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
	     *
	     *      favorite(alice);  //=> undefined
	     *      favoriteWithDefault(alice);  //=> 'Ramda'
	     */
	    var propOr = _curry3(function propOr(val, p, obj) {
	        return obj != null && _has(p, obj) ? obj[p] : val;
	    });
	
	    /**
	     * Acts as multiple `get`: array of keys in, array of values out. Preserves order.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig [k] -> {k: v} -> [v]
	     * @param {Array} ps The property names to fetch
	     * @param {Object} obj The object to query
	     * @return {Array} The corresponding values or partially applied function.
	     * @example
	     *
	     *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
	     *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
	     *
	     *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
	     *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
	     */
	    var props = _curry2(function props(ps, obj) {
	        var len = ps.length;
	        var out = [];
	        var idx = 0;
	        while (idx < len) {
	            out[idx] = obj[ps[idx]];
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a list of numbers from `from` (inclusive) to `to`
	     * (exclusive).
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> Number -> [Number]
	     * @param {Number} from The first number in the list.
	     * @param {Number} to One more than the last number in the list.
	     * @return {Array} The list of numbers in tthe set `[a, b)`.
	     * @example
	     *
	     *      R.range(1, 5);    //=> [1, 2, 3, 4]
	     *      R.range(50, 53);  //=> [50, 51, 52]
	     */
	    var range = _curry2(function range(from, to) {
	        var result = [];
	        var n = from;
	        while (n < to) {
	            result[result.length] = n;
	            n += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Like `reduce`, but passes additional parameters to the predicate function.
	     *
	     * The iterator function receives four values: *(acc, value, index, list)*
	     *
	     * Note: `R.reduceIndexed` does not skip deleted or unassigned indices (sparse arrays),
	     * unlike the native `Array.prototype.reduce` method. For more details on this behavior,
	     * see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a,b,i,[b] -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives four values: the accumulator, the
	     *        current element from `list`, that element's index, and the entire `list` itself.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @deprecated since v0.15.0
	     * @see R.addIndex
	     * @example
	     *
	     *      var letters = ['a', 'b', 'c'];
	     *      var objectify = function(accObject, elem, idx, list) {
	     *        accObject[elem] = idx;
	     *        return accObject;
	     *      };
	     *
	     *      R.reduceIndexed(objectify, {}, letters); //=> { 'a': 0, 'b': 1, 'c': 2 }
	     */
	    var reduceIndexed = _curry3(function reduceIndexed(fn, acc, list) {
	        var idx = 0, len = list.length;
	        while (idx < len) {
	            acc = fn(acc, list[idx], idx, list);
	            idx += 1;
	        }
	        return acc;
	    });
	
	    /**
	     * Returns a single item by iterating through the list, successively calling the iterator
	     * function and passing it an accumulator value and the current value from the array, and
	     * then passing the result to the next call.
	     *
	     * Similar to `reduce`, except moves through the input list from the right to the left.
	     *
	     * The iterator function receives two values: *(acc, value)*
	     *
	     * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse arrays), unlike
	     * the native `Array.prototype.reduce` method. For more details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
	     *      var flattenPairs = function(acc, pair) {
	     *        return acc.concat(pair);
	     *      };
	     *
	     *      R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
	     */
	    var reduceRight = _curry3(function reduceRight(fn, acc, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            acc = fn(acc, list[idx]);
	            idx -= 1;
	        }
	        return acc;
	    });
	
	    /**
	     * Like `reduceRight`, but passes additional parameters to the predicate function. Moves through
	     * the input list from the right to the left.
	     *
	     * The iterator function receives four values: *(acc, value, index, list)*.
	     *
	     * Note: `R.reduceRightIndexed` does not skip deleted or unassigned indices (sparse arrays),
	     * unlike the native `Array.prototype.reduce` method. For more details on this behavior,
	     * see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a,b,i,[b] -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives four values: the accumulator, the
	     *        current element from `list`, that element's index, and the entire `list` itself.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @deprecated since v0.15.0
	     * @see R.addIndex
	     * @example
	     *
	     *      var letters = ['a', 'b', 'c'];
	     *      var objectify = function(accObject, elem, idx, list) {
	     *        accObject[elem] = idx;
	     *        return accObject;
	     *      };
	     *
	     *      R.reduceRightIndexed(objectify, {}, letters); //=> { 'c': 2, 'b': 1, 'a': 0 }
	     */
	    var reduceRightIndexed = _curry3(function reduceRightIndexed(fn, acc, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            acc = fn(acc, list[idx], idx, list);
	            idx -= 1;
	        }
	        return acc;
	    });
	
	    /**
	     * Returns a value wrapped to indicate that it is the final value of the
	     * reduce and transduce functions.  The returned value
	     * should be considered a black box: the internal structure is not
	     * guaranteed to be stable.
	     *
	     * Note: this optimization is unavailable to functions not explicitly listed
	     * above.  For instance, it is not currently supported by reduceIndexed,
	     * reduceRight, or reduceRightIndexed.
	     * @see R.reduce
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> *
	     * @param {*} x The final value of the reduce.
	     * @return {*} The wrapped value.
	     * @example
	     *
	     *      R.reduce(
	     *        R.pipe(R.add, R.ifElse(R.lte(10), R.reduced, R.identity)),
	     *        0,
	     *        [1, 2, 3, 4, 5]) // 10
	     */
	    var reduced = _curry1(_reduced);
	
	    /**
	     * Like `reject`, but passes additional parameters to the predicate function. The predicate
	     * function is passed three arguments: *(value, index, list)*.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a, i, [a] -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} The new filtered array.
	     * @deprecated since v0.15.0
	     * @see R.addIndex
	     * @example
	     *
	     *      var lastTwo = function(val, idx, list) {
	     *        return list.length - idx <= 2;
	     *      };
	     *
	     *      R.rejectIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9]); //=> [8, 6, 7, 5, 3]
	     */
	    var rejectIndexed = _curry2(function rejectIndexed(fn, list) {
	        return _filterIndexed(_complement(fn), list);
	    });
	
	    /**
	     * Removes the sub-list of `list` starting at index `start` and containing
	     * `count` elements.  _Note that this is not destructive_: it returns a
	     * copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> Number -> [a] -> [a]
	     * @param {Number} start The position to start removing elements
	     * @param {Number} count The number of elements to remove
	     * @param {Array} list The list to remove from
	     * @return {Array} A new Array with `count` elements from `start` removed.
	     * @example
	     *
	     *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
	     */
	    var remove = _curry3(function remove(start, count, list) {
	        return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
	    });
	
	    /**
	     * Replace a substring or regex match in a string with a replacement.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig RegExp|String -> String -> String -> String
	     * @param {RegExp|String} pattern A regular expression or a substring to match.
	     * @param {String} replacement The string to replace the matches with.
	     * @param {String} str The String to do the search and replacement in.
	     * @return {String} The result.
	     * @example
	     *
	     *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
	     *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
	     *
	     *      // Use the "g" (global) flag to replace all occurrences:
	     *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
	     */
	    var replace = _curry3(function replace(regex, replacement, str) {
	        return str.replace(regex, replacement);
	    });
	
	    /**
	     * Returns a new list with the same elements as the original list, just
	     * in the reverse order.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The list to reverse.
	     * @return {Array} A copy of the list in reverse order.
	     * @example
	     *
	     *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
	     *      R.reverse([1, 2]);     //=> [2, 1]
	     *      R.reverse([1]);        //=> [1]
	     *      R.reverse([]);         //=> []
	     */
	    var reverse = _curry1(function reverse(list) {
	        return _slice(list).reverse();
	    });
	
	    /**
	     * Scan is similar to reduce, but returns a list of successively reduced values from the left
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> [a]
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {Array} A list of all intermediately reduced values.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
	     */
	    var scan = _curry3(function scan(fn, acc, list) {
	        var idx = 0, len = list.length, result = [acc];
	        while (idx < len) {
	            acc = fn(acc, list[idx]);
	            result[idx + 1] = acc;
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
	     * time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
	     * if they are equal.  Please note that this is a **copy** of the list.  It does not modify the original.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a,a -> Number) -> [a] -> [a]
	     * @param {Function} comparator A sorting function :: a -> b -> Int
	     * @param {Array} list The list to sort
	     * @return {Array} a new array with its elements sorted by the comparator function.
	     * @example
	     *
	     *      var diff = function(a, b) { return a - b; };
	     *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
	     */
	    var sort = _curry2(function sort(comparator, list) {
	        return _slice(list).sort(comparator);
	    });
	
	    /**
	     * Sorts the list according to the supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig Ord b => (a -> b) -> [a] -> [a]
	     * @param {Function} fn
	     * @param {Array} list The list to sort.
	     * @return {Array} A new list sorted by the keys generated by `fn`.
	     * @example
	     *
	     *      var sortByFirstItem = R.sortBy(prop(0));
	     *      var sortByNameCaseInsensitive = R.sortBy(compose(R.toLower, prop('name')));
	     *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
	     *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
	     *      var alice = {
	     *        name: 'ALICE',
	     *        age: 101
	     *      };
	     *      var bob = {
	     *        name: 'Bob',
	     *        age: -10
	     *      };
	     *      var clara = {
	     *        name: 'clara',
	     *        age: 314.159
	     *      };
	     *      var people = [clara, bob, alice];
	     *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
	     */
	    var sortBy = _curry2(function sortBy(fn, list) {
	        return _slice(list).sort(function (a, b) {
	            var aa = fn(a);
	            var bb = fn(b);
	            return aa < bb ? -1 : aa > bb ? 1 : 0;
	        });
	    });
	
	    /**
	     * Finds the first index of a substring in a string, returning -1 if it's not present
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig String -> String -> Number
	     * @param {String} c A string to find.
	     * @param {String} str The string to search in
	     * @return {Number} The first index of `c` or -1 if not found.
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      R.strIndexOf('c', 'abcdefg'); //=> 2
	     */
	    var strIndexOf = _curry2(function strIndexOf(c, str) {
	        return str.indexOf(c);
	    });
	
	    /**
	     *
	     * Finds the last index of a substring in a string, returning -1 if it's not present
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig String -> String -> Number
	     * @param {String} c A string to find.
	     * @param {String} str The string to search in
	     * @return {Number} The last index of `c` or -1 if not found.
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      R.strLastIndexOf('a', 'banana split'); //=> 5
	     */
	    var strLastIndexOf = _curry2(function (c, str) {
	        return str.lastIndexOf(c);
	    });
	
	    /**
	     * Subtracts two numbers. Equivalent to `a - b` but curried.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig Number -> Number -> Number
	     * @param {Number} a The first value.
	     * @param {Number} b The second value.
	     * @return {Number} The result of `a - b`.
	     * @example
	     *
	     *      R.subtract(10, 8); //=> 2
	     *
	     *      var minus5 = R.subtract(R.__, 5);
	     *      minus5(17); //=> 12
	     *
	     *      var complementaryAngle = R.subtract(90);
	     *      complementaryAngle(30); //=> 60
	     *      complementaryAngle(72); //=> 18
	     */
	    var subtract = _curry2(function subtract(a, b) {
	        return a - b;
	    });
	
	    /**
	     * Runs the given function with the supplied object, then returns the object.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (a -> *) -> a -> a
	     * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
	     * @param {*} x
	     * @return {*} `x`.
	     * @example
	     *
	     *      var sayX = function(x) { console.log('x is ' + x); };
	     *      R.tap(sayX, 100); //=> 100
	     *      //-> 'x is 100'
	     */
	    var tap = _curry2(function tap(fn, x) {
	        fn(x);
	        return x;
	    });
	
	    /**
	     * Determines whether a given string matches a given regular expression.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig RegExp -> String -> Boolean
	     * @param {RegExp} pattern
	     * @param {String} str
	     * @return {Boolean}
	     * @example
	     *
	     *      R.test(/^x/, 'xyz'); //=> true
	     *      R.test(/^y/, 'xyz'); //=> false
	     */
	    var test = _curry2(function test(pattern, str) {
	        return _cloneRegExp(pattern).test(str);
	    });
	
	    /**
	     * Calls an input function `n` times, returning an array containing the results of those
	     * function calls.
	     *
	     * `fn` is passed one argument: The current value of `n`, which begins at `0` and is
	     * gradually incremented to `n - 1`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (i -> a) -> i -> [a]
	     * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
	     * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
	     * @return {Array} An array containing the return values of all calls to `fn`.
	     * @example
	     *
	     *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
	     */
	    var times = _curry2(function times(fn, n) {
	        var len = Number(n);
	        var list = new Array(len);
	        var idx = 0;
	        while (idx < len) {
	            list[idx] = fn(idx);
	            idx += 1;
	        }
	        return list;
	    });
	
	    /**
	     * Converts an object into an array of key, value arrays.
	     * Only the object's own properties are used.
	     * Note that the order of the output array is not guaranteed to be
	     * consistent across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {String: *} -> [[String,*]]
	     * @param {Object} obj The object to extract from
	     * @return {Array} An array of key, value arrays from the object's own properties.
	     * @example
	     *
	     *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
	     */
	    var toPairs = _curry1(function toPairs(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            if (_has(prop, obj)) {
	                pairs[pairs.length] = [
	                    prop,
	                    obj[prop]
	                ];
	            }
	        }
	        return pairs;
	    });
	
	    /**
	     * Converts an object into an array of key, value arrays.
	     * The object's own properties and prototype properties are used.
	     * Note that the order of the output array is not guaranteed to be
	     * consistent across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {String: *} -> [[String,*]]
	     * @param {Object} obj The object to extract from
	     * @return {Array} An array of key, value arrays from the object's own
	     *         and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
	     */
	    var toPairsIn = _curry1(function toPairsIn(obj) {
	        var pairs = [];
	        for (var prop in obj) {
	            pairs[pairs.length] = [
	                prop,
	                obj[prop]
	            ];
	        }
	        return pairs;
	    });
	
	    /**
	     * Removes (strips) whitespace from both ends of the string.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to trim.
	     * @return {String} Trimmed version of `str`.
	     * @example
	     *
	     *      R.trim('   xyz  '); //=> 'xyz'
	     *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
	     */
	    var trim = function () {
	        var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
	        var zeroWidth = '\u200B';
	        var hasProtoTrim = typeof String.prototype.trim === 'function';
	        if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
	            return _curry1(function trim(str) {
	                var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
	                var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
	                return str.replace(beginRx, '').replace(endRx, '');
	            });
	        } else {
	            return _curry1(function trim(str) {
	                return str.trim();
	            });
	        }
	    }();
	
	    /**
	     * Gives a single-word string description of the (native) type of a value, returning such
	     * answers as 'Object', 'Number', 'Array', or 'Null'.  Does not attempt to distinguish user
	     * Object types any further, reporting them all as 'Object'.
	     *
	     * @func
	     * @memberOf R
	     * @category Type
	     * @sig (* -> {*}) -> String
	     * @param {*} val The value to test
	     * @return {String}
	     * @example
	     *
	     *      R.type({}); //=> "Object"
	     *      R.type(1); //=> "Number"
	     *      R.type(false); //=> "Boolean"
	     *      R.type('s'); //=> "String"
	     *      R.type(null); //=> "Null"
	     *      R.type([]); //=> "Array"
	     *      R.type(/[A-z]/); //=> "RegExp"
	     */
	    var type = _curry1(function type(val) {
	        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
	    });
	
	    /**
	     * Takes a function `fn`, which takes a single array argument, and returns
	     * a function which:
	     *
	     *   - takes any number of positional arguments;
	     *   - passes these arguments to `fn` as an array; and
	     *   - returns the result.
	     *
	     * In other words, R.unapply derives a variadic function from a function
	     * which takes an array. R.unapply is the inverse of R.apply.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig ([*...] -> a) -> (*... -> a)
	     * @param {Function} fn
	     * @return {Function}
	     * @see R.apply
	     * @example
	     *
	     *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
	     */
	    var unapply = _curry1(function unapply(fn) {
	        return function () {
	            return fn(_slice(arguments));
	        };
	    });
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts exactly 1
	     * parameter. Any extraneous parameters will not be passed to the supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (* -> b) -> (a -> b)
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity 1.
	     * @example
	     *
	     *      var takesTwoArgs = function(a, b) {
	     *        return [a, b];
	     *      };
	     *      takesTwoArgs.length; //=> 2
	     *      takesTwoArgs(1, 2); //=> [1, 2]
	     *
	     *      var takesOneArg = R.unary(takesTwoArgs);
	     *      takesOneArg.length; //=> 1
	     *      // Only 1 argument is passed to the wrapped function
	     *      takesOneArg(1, 2); //=> [1, undefined]
	     */
	    var unary = _curry1(function unary(fn) {
	        return nAry(1, fn);
	    });
	
	    /**
	     * Builds a list from a seed value. Accepts an iterator function, which returns either false
	     * to stop iteration or an array of length 2 containing the value to add to the resulting
	     * list and the seed to be used in the next call to the iterator function.
	     *
	     * The iterator function receives one argument: *(seed)*.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> [b]) -> * -> [b]
	     * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
	     *        either false to quit iteration or an array of length two to proceed. The element
	     *        at index 0 of this array will be added to the resulting array, and the element
	     *        at index 1 will be passed to the next call to `fn`.
	     * @param {*} seed The seed value.
	     * @return {Array} The final list.
	     * @example
	     *
	     *      var f = function(n) { return n > 50 ? false : [-n, n + 10] };
	     *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
	     */
	    var unfold = _curry2(function unfold(fn, seed) {
	        var pair = fn(seed);
	        var result = [];
	        while (pair && pair.length) {
	            result[result.length] = pair[0];
	            pair = fn(pair[1]);
	        }
	        return result;
	    });
	
	    /**
	     * Returns a new list containing only one copy of each element in the original list, based
	     * upon the value returned by applying the supplied predicate to two list elements. Prefers
	     * the first item if two items compare equal based on the predicate.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      var strEq = function(a, b) { return String(a) === String(b); };
	     *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
	     *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
	     *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
	     *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
	     */
	    var uniqWith = _curry2(function uniqWith(pred, list) {
	        var idx = 0, len = list.length;
	        var result = [], item;
	        while (idx < len) {
	            item = list[idx];
	            if (!_containsWith(pred, item, result)) {
	                result[result.length] = item;
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Returns a new copy of the array with the element at the
	     * provided index replaced with the given value.
	     * @see R.adjust
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> a -> [a] -> [a]
	     * @param {Number} idx The index to update.
	     * @param {*} x The value to exist at the given index of the returned array.
	     * @param {Array|Arguments} list The source array-like object to be updated.
	     * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
	     * @example
	     *
	     *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
	     *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
	     */
	    var update = _curry3(function (idx, x, list) {
	        return adjust(always(x), idx, list);
	    });
	
	    /**
	     * Returns a list of all the enumerable own properties of the supplied object.
	     * Note that the order of the output array is not guaranteed across
	     * different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {k: v} -> [v]
	     * @param {Object} obj The object to extract values from
	     * @return {Array} An array of the values of the object's own properties.
	     * @example
	     *
	     *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
	     */
	    var values = _curry1(function values(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var vals = [];
	        var idx = 0;
	        while (idx < len) {
	            vals[idx] = obj[props[idx]];
	            idx += 1;
	        }
	        return vals;
	    });
	
	    /**
	     * Returns a list of all the properties, including prototype properties,
	     * of the supplied object.
	     * Note that the order of the output array is not guaranteed to be
	     * consistent across different JS platforms.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {k: v} -> [v]
	     * @param {Object} obj The object to extract values from
	     * @return {Array} An array of the values of the object's own and prototype properties.
	     * @example
	     *
	     *      var F = function() { this.x = 'X'; };
	     *      F.prototype.y = 'Y';
	     *      var f = new F();
	     *      R.valuesIn(f); //=> ['X', 'Y']
	     */
	    var valuesIn = _curry1(function valuesIn(obj) {
	        var prop, vs = [];
	        for (prop in obj) {
	            vs[vs.length] = obj[prop];
	        }
	        return vs;
	    });
	
	    /**
	     * Takes a spec object and a test object; returns true if the test satisfies
	     * the spec. Each of the spec's own properties must be a predicate function.
	     * Each predicate is applied to the value of the corresponding property of
	     * the test object. `where` returns true if all the predicates return true,
	     * false otherwise.
	     *
	     * `where` is well suited to declaratively expressing constraints for other
	     * functions such as `filter` and `find`.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
	     * @param {Object} spec
	     * @param {Object} testObj
	     * @return {Boolean}
	     * @example
	     *
	     *      // pred :: Object -> Boolean
	     *      var pred = R.where({
	     *        a: R.equals('foo'),
	     *        b: R.complement(R.equals('bar')),
	     *        x: R.gt(_, 10),
	     *        y: R.lt(_, 20)
	     *      });
	     *
	     *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
	     *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
	     *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
	     */
	    var where = _curry2(function where(spec, testObj) {
	        for (var prop in spec) {
	            if (_has(prop, spec) && !spec[prop](testObj[prop])) {
	                return false;
	            }
	        }
	        return true;
	    });
	
	    /**
	     * Creates a new list out of the two supplied by creating each possible
	     * pair from the lists.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [b] -> [[a,b]]
	     * @param {Array} as The first list.
	     * @param {Array} bs The second list.
	     * @return {Array} The list made by combining each possible pair from
	     *         `as` and `bs` into pairs (`[a, b]`).
	     * @example
	     *
	     *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
	     */
	    // = xprodWith(prepend); (takes about 3 times as long...)
	    var xprod = _curry2(function xprod(a, b) {
	        // = xprodWith(prepend); (takes about 3 times as long...)
	        var idx = 0;
	        var ilen = a.length;
	        var j;
	        var jlen = b.length;
	        var result = [];
	        while (idx < ilen) {
	            j = 0;
	            while (j < jlen) {
	                result[result.length] = [
	                    a[idx],
	                    b[j]
	                ];
	                j += 1;
	            }
	            idx += 1;
	        }
	        return result;
	    });
	
	    /**
	     * Creates a new list out of the two supplied by pairing up
	     * equally-positioned items from both lists.  The returned list is
	     * truncated to the length of the shorter of the two input lists.
	     * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [b] -> [[a,b]]
	     * @param {Array} list1 The first array to consider.
	     * @param {Array} list2 The second array to consider.
	     * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
	     * @example
	     *
	     *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
	     */
	    var zip = _curry2(function zip(a, b) {
	        var rv = [];
	        var idx = 0;
	        var len = Math.min(a.length, b.length);
	        while (idx < len) {
	            rv[idx] = [
	                a[idx],
	                b[idx]
	            ];
	            idx += 1;
	        }
	        return rv;
	    });
	
	    /**
	     * Creates a new object out of a list of keys and a list of values.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [String] -> [*] -> {String: *}
	     * @param {Array} keys The array that will be properties on the output object.
	     * @param {Array} values The list of values on the output object.
	     * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
	     * @example
	     *
	     *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
	     */
	    var zipObj = _curry2(function zipObj(keys, values) {
	        var idx = 0, len = keys.length, out = {};
	        while (idx < len) {
	            out[keys[idx]] = values[idx];
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Creates a new list out of the two supplied by applying the function to
	     * each equally-positioned pair in the lists. The returned list is
	     * truncated to the length of the shorter of the two input lists.
	     *
	     * @function
	     * @memberOf R
	     * @category List
	     * @sig (a,b -> c) -> [a] -> [b] -> [c]
	     * @param {Function} fn The function used to combine the two elements into one value.
	     * @param {Array} list1 The first array to consider.
	     * @param {Array} list2 The second array to consider.
	     * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
	     *         using `fn`.
	     * @example
	     *
	     *      var f = function(x, y) {
	     *        // ...
	     *      };
	     *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
	     *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
	     */
	    var zipWith = _curry3(function zipWith(fn, a, b) {
	        var rv = [], idx = 0, len = Math.min(a.length, b.length);
	        while (idx < len) {
	            rv[idx] = fn(a[idx], b[idx]);
	            idx += 1;
	        }
	        return rv;
	    });
	
	    /**
	     * A function that always returns `false`. Any passed in parameters are ignored.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig * -> false
	     * @see R.always
	     * @return {Boolean} false
	     * @example
	     *
	     *      R.F(); //=> false
	     */
	    var F = always(false);
	
	    /**
	     * A function that always returns `true`. Any passed in parameters are ignored.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig * -> true
	     * @see R.always
	     * @return {Boolean} `true`.
	     * @example
	     *
	     *      R.T(); //=> true
	     */
	    var T = always(true);
	
	    var _append = function _append(el, list) {
	        return _concat(list, [el]);
	    };
	
	    var _assocPath = function _assocPath(path, val, obj) {
	        switch (path.length) {
	        case 0:
	            return obj;
	        case 1:
	            return _assoc(path[0], val, obj);
	        default:
	            return _assoc(path[0], _assocPath(_slice(path, 1), val, Object(obj[path[0]])), obj);
	        }
	    };
	
	    /**
	     * Copies an object.
	     *
	     * @private
	     * @param {*} value The value to be copied
	     * @param {Array} refFrom Array containing the source references
	     * @param {Array} refTo Array containing the copied source references
	     * @return {*} The copied value.
	     */
	    var _baseCopy = function _baseCopy(value, refFrom, refTo) {
	        var copy = function copy(copiedValue) {
	            var len = refFrom.length;
	            var idx = 0;
	            while (idx < len) {
	                if (value === refFrom[idx]) {
	                    return refTo[idx];
	                }
	                idx += 1;
	            }
	            refFrom[idx + 1] = value;
	            refTo[idx + 1] = copiedValue;
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
	        case 'RegExp':
	            return _cloneRegExp(value);
	        default:
	            return value;
	        }
	    };
	
	    /**
	     * Similar to hasMethod, this checks whether a function has a [methodname]
	     * function. If it isn't an array it will execute that function otherwise it will
	     * default to the ramda implementation.
	     *
	     * @private
	     * @param {Function} fn ramda implemtation
	     * @param {String} methodname property to check for a custom implementation
	     * @return {Object} Whatever the return value of the method is.
	     */
	    var _checkForMethod = function _checkForMethod(methodname, fn) {
	        return function () {
	            var length = arguments.length;
	            if (length === 0) {
	                return fn();
	            }
	            var obj = arguments[length - 1];
	            return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
	        };
	    };
	
	    var _composeL = function _composeL(innerLens, outerLens) {
	        return lens(_compose(innerLens, outerLens), function (x, source) {
	            var newInnerValue = innerLens.set(x, outerLens(source));
	            return outerLens.set(newInnerValue, source);
	        });
	    };
	
	    /**
	     * A right-associative two-argument composition function like `_compose`
	     * but with automatic handling of promises (or, more precisely,
	     * "thenables"). This function is used to construct a more general
	     * `composeP` function, which accepts any number of arguments.
	     *
	     * @private
	     * @category Function
	     * @param {Function} f A function.
	     * @param {Function} g A function.
	     * @return {Function} A new function that is the equivalent of `f(g(x))`.
	     * @example
	     *
	     *      var Q = require('q');
	     *      var double = function(x) { return x * 2; };
	     *      var squareAsync = function(x) { return Q.when(x * x); };
	     *      var squareAsyncThenDouble = _composeP(double, squareAsync);
	     *
	     *      squareAsyncThenDouble(5)
	     *        .then(function(result) {
	     *          // the result is now 50.
	     *        });
	     */
	    var _composeP = function _composeP(f, g) {
	        return function () {
	            var context = this;
	            var value = g.apply(this, arguments);
	            if (_isThenable(value)) {
	                return value.then(function (result) {
	                    return f.call(context, result);
	                });
	            } else {
	                return f.call(this, value);
	            }
	        };
	    };
	
	    /*
	     * Returns a function that makes a multi-argument version of compose from
	     * either _compose or _composeP.
	     */
	    var _createComposer = function _createComposer(composeFunction) {
	        return function () {
	            var fn = arguments[arguments.length - 1];
	            var length = fn.length;
	            var idx = arguments.length - 2;
	            while (idx >= 0) {
	                fn = composeFunction(arguments[idx], fn);
	                idx -= 1;
	            }
	            return arity(length, fn);
	        };
	    };
	
	    /**
	     * Create a function which takes a list
	     * and determines the winning value by a comparator. Used internally
	     * by `R.max` and `R.min`
	     *
	     * @private
	     * @param {Function} compatator a function to compare two items
	     * @param {*} intialVal, default value if nothing else wins
	     * @category Math
	     * @return {Function}
	     */
	    var _createMaxMin = function _createMaxMin(comparator, initialVal) {
	        return _curry1(function (list) {
	            var idx = 0, winner = initialVal, computed;
	            while (idx < list.length) {
	                computed = +list[idx];
	                if (comparator(computed, winner)) {
	                    winner = computed;
	                }
	                idx += 1;
	            }
	            return winner;
	        });
	    };
	
	    var _createPartialApplicator = function _createPartialApplicator(concat) {
	        return function (fn) {
	            var args = _slice(arguments, 1);
	            return arity(Math.max(0, fn.length - args.length), function () {
	                return fn.apply(this, concat(args, arguments));
	            });
	        };
	    };
	
	    /**
	     * Internal curryN function.
	     *
	     * @private
	     * @category Function
	     * @param {Number} length The arity of the curried function.
	     * @return {array} An array of arguments received thus far.
	     * @param {Function} fn The function to curry.
	     */
	    var _curryN = function _curryN(length, received, fn) {
	        return function () {
	            var combined = [];
	            var argsIdx = 0;
	            var left = length;
	            var combinedIdx = 0;
	            while (combinedIdx < received.length || argsIdx < arguments.length) {
	                var result;
	                if (combinedIdx < received.length && (received[combinedIdx] == null || received[combinedIdx]['@@functional/placeholder'] !== true || argsIdx >= arguments.length)) {
	                    result = received[combinedIdx];
	                } else {
	                    result = arguments[argsIdx];
	                    argsIdx += 1;
	                }
	                combined[combinedIdx] = result;
	                if (result == null || result['@@functional/placeholder'] !== true) {
	                    left -= 1;
	                }
	                combinedIdx += 1;
	            }
	            return left <= 0 ? fn.apply(this, combined) : arity(left, _curryN(length, combined, fn));
	        };
	    };
	
	    /**
	     * Returns a function that dispatches with different strategies based on the
	     * object in list position (last argument). If it is an array, executes [fn].
	     * Otherwise, if it has a  function with [methodname], it will execute that
	     * function (functor case). Otherwise, if it is a transformer, uses transducer
	     * [xf] to return a new transformer (transducer case). Otherwise, it will
	     * default to executing [fn].
	     *
	     * @private
	     * @param {String} methodname property to check for a custom implementation
	     * @param {Function} xf transducer to initialize if object is transformer
	     * @param {Function} fn default ramda implementation
	     * @return {Function} A function that dispatches on object in list position
	     */
	    var _dispatchable = function _dispatchable(methodname, xf, fn) {
	        return function () {
	            var length = arguments.length;
	            if (length === 0) {
	                return fn();
	            }
	            var obj = arguments[length - 1];
	            if (!_isArray(obj)) {
	                var args = _slice(arguments, 0, length - 1);
	                if (typeof obj[methodname] === 'function') {
	                    return obj[methodname].apply(obj, args);
	                }
	                if (_isTransformer(obj)) {
	                    var transducer = xf.apply(null, args);
	                    return transducer(obj);
	                }
	            }
	            return fn.apply(this, arguments);
	        };
	    };
	
	    var _dissocPath = function _dissocPath(path, obj) {
	        switch (path.length) {
	        case 0:
	            return obj;
	        case 1:
	            return _dissoc(path[0], obj);
	        default:
	            var head = path[0];
	            var tail = _slice(path, 1);
	            return obj[head] == null ? obj : _assoc(head, _dissocPath(tail, obj[head]), obj);
	        }
	    };
	
	    // The algorithm used to handle cyclic structures is
	    // inspired by underscore's isEqual
	    // RegExp equality algorithm: http://stackoverflow.com/a/10776635
	    var _equals = function _eqDeep(a, b, stackA, stackB) {
	        var typeA = type(a);
	        if (typeA !== type(b)) {
	            return false;
	        }
	        if (typeA === 'Boolean' || typeA === 'Number' || typeA === 'String') {
	            return typeof a === 'object' ? typeof b === 'object' && identical(a.valueOf(), b.valueOf()) : identical(a, b);
	        }
	        if (identical(a, b)) {
	            return true;
	        }
	        if (typeA === 'RegExp') {
	            // RegExp equality algorithm: http://stackoverflow.com/a/10776635
	            return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode;
	        }
	        if (Object(a) === a) {
	            if (typeA === 'Date' && a.getTime() !== b.getTime()) {
	                return false;
	            }
	            var keysA = keys(a);
	            if (keysA.length !== keys(b).length) {
	                return false;
	            }
	            var idx = stackA.length - 1;
	            while (idx >= 0) {
	                if (stackA[idx] === a) {
	                    return stackB[idx] === b;
	                }
	                idx -= 1;
	            }
	            stackA[stackA.length] = a;
	            stackB[stackB.length] = b;
	            idx = keysA.length - 1;
	            while (idx >= 0) {
	                var key = keysA[idx];
	                if (!_has(key, b) || !_eqDeep(b[key], a[key], stackA, stackB)) {
	                    return false;
	                }
	                idx -= 1;
	            }
	            stackA.pop();
	            stackB.pop();
	            return true;
	        }
	        return false;
	    };
	
	    /**
	     * Assigns own enumerable properties of the other object to the destination
	     * object preferring items in other.
	     *
	     * @private
	     * @memberOf R
	     * @category Object
	     * @param {Object} destination The destination object.
	     * @param {Object} other The other object to merge with destination.
	     * @return {Object} The destination object.
	     * @example
	     *
	     *      _extend({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
	     *      //=> { 'name': 'fred', 'age': 40 }
	     */
	    var _extend = function _extend(destination, other) {
	        var props = keys(other);
	        var idx = 0, length = props.length;
	        while (idx < length) {
	            destination[props[idx]] = other[props[idx]];
	            idx += 1;
	        }
	        return destination;
	    };
	
	    /**
	     * Private function that determines whether or not a provided object has a given method.
	     * Does not ignore methods stored on the object's prototype chain. Used for dynamically
	     * dispatching Ramda methods to non-Array objects.
	     *
	     * @private
	     * @param {String} methodName The name of the method to check for.
	     * @param {Object} obj The object to test.
	     * @return {Boolean} `true` has a given method, `false` otherwise.
	     * @example
	     *
	     *      var person = { name: 'John' };
	     *      person.shout = function() { alert(this.name); };
	     *
	     *      _hasMethod('shout', person); //=> true
	     *      _hasMethod('foo', person); //=> false
	     */
	    var _hasMethod = function _hasMethod(methodName, obj) {
	        return obj != null && !_isArray(obj) && typeof obj[methodName] === 'function';
	    };
	
	    /**
	     * `_makeFlat` is a helper function that returns a one-level or fully recursive function
	     * based on the flag passed in.
	     *
	     * @private
	     */
	    var _makeFlat = function _makeFlat(recursive) {
	        return function flatt(list) {
	            var value, result = [], idx = 0, j, ilen = list.length, jlen;
	            while (idx < ilen) {
	                if (isArrayLike(list[idx])) {
	                    value = recursive ? flatt(list[idx]) : list[idx];
	                    j = 0;
	                    jlen = value.length;
	                    while (j < jlen) {
	                        result[result.length] = value[j];
	                        j += 1;
	                    }
	                } else {
	                    result[result.length] = list[idx];
	                }
	                idx += 1;
	            }
	            return result;
	        };
	    };
	
	    var _reduce = function () {
	        function _arrayReduce(xf, acc, list) {
	            var idx = 0, len = list.length;
	            while (idx < len) {
	                acc = xf['@@transducer/step'](acc, list[idx]);
	                if (acc && acc['@@transducer/reduced']) {
	                    acc = acc['@@transducer/value'];
	                    break;
	                }
	                idx += 1;
	            }
	            return xf['@@transducer/result'](acc);
	        }
	        function _iterableReduce(xf, acc, iter) {
	            var step = iter.next();
	            while (!step.done) {
	                acc = xf['@@transducer/step'](acc, step.value);
	                if (acc && acc['@@transducer/reduced']) {
	                    acc = acc['@@transducer/value'];
	                    break;
	                }
	                step = iter.next();
	            }
	            return xf['@@transducer/result'](acc);
	        }
	        function _methodReduce(xf, acc, obj) {
	            return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
	        }
	        var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
	        return function _reduce(fn, acc, list) {
	            if (typeof fn === 'function') {
	                fn = _xwrap(fn);
	            }
	            if (isArrayLike(list)) {
	                return _arrayReduce(fn, acc, list);
	            }
	            if (typeof list.reduce === 'function') {
	                return _methodReduce(fn, acc, list);
	            }
	            if (list[symIterator] != null) {
	                return _iterableReduce(fn, acc, list[symIterator]());
	            }
	            if (typeof list.next === 'function') {
	                return _iterableReduce(fn, acc, list);
	            }
	            throw new TypeError('reduce: list must be array or iterable');
	        };
	    }();
	
	    var _xall = function () {
	        function XAll(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.all = true;
	        }
	        XAll.prototype['@@transducer/init'] = _xfBase.init;
	        XAll.prototype['@@transducer/result'] = function (result) {
	            if (this.all) {
	                result = this.xf['@@transducer/step'](result, true);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XAll.prototype['@@transducer/step'] = function (result, input) {
	            if (!this.f(input)) {
	                this.all = false;
	                result = _reduced(this.xf['@@transducer/step'](result, false));
	            }
	            return result;
	        };
	        return _curry2(function _xall(f, xf) {
	            return new XAll(f, xf);
	        });
	    }();
	
	    var _xany = function () {
	        function XAny(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.any = false;
	        }
	        XAny.prototype['@@transducer/init'] = _xfBase.init;
	        XAny.prototype['@@transducer/result'] = function (result) {
	            if (!this.any) {
	                result = this.xf['@@transducer/step'](result, false);
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XAny.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f(input)) {
	                this.any = true;
	                result = _reduced(this.xf['@@transducer/step'](result, true));
	            }
	            return result;
	        };
	        return _curry2(function _xany(f, xf) {
	            return new XAny(f, xf);
	        });
	    }();
	
	    var _xdrop = function () {
	        function XDrop(n, xf) {
	            this.xf = xf;
	            this.n = n;
	        }
	        XDrop.prototype['@@transducer/init'] = _xfBase.init;
	        XDrop.prototype['@@transducer/result'] = _xfBase.result;
	        XDrop.prototype.step = function (result, input) {
	            if (this.n > 0) {
	                this.n -= 1;
	                return result;
	            }
	            return this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdrop(n, xf) {
	            return new XDrop(n, xf);
	        });
	    }();
	
	    var _xdropWhile = function () {
	        function XDropWhile(f, xf) {
	            this.xf = xf;
	            this.f = f;
	        }
	        XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
	        XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
	        XDropWhile.prototype['@@transducer/step'] = function (result, input) {
	            if (this.f) {
	                if (this.f(input)) {
	                    return result;
	                }
	                this.f = null;
	            }
	            return this.xf['@@transducer/step'](result, input);
	        };
	        return _curry2(function _xdropWhile(f, xf) {
	            return new XDropWhile(f, xf);
	        });
	    }();
	
	    var _xgroupBy = function () {
	        function XGroupBy(f, xf) {
	            this.xf = xf;
	            this.f = f;
	            this.inputs = {};
	        }
	        XGroupBy.prototype['@@transducer/init'] = _xfBase.init;
	        XGroupBy.prototype['@@transducer/result'] = function (result) {
	            var key;
	            for (key in this.inputs) {
	                if (_has(key, this.inputs)) {
	                    result = this.xf['@@transducer/step'](result, this.inputs[key]);
	                    if (result['@@transducer/reduced']) {
	                        result = result['@@transducer/value'];
	                        break;
	                    }
	                }
	            }
	            return this.xf['@@transducer/result'](result);
	        };
	        XGroupBy.prototype['@@transducer/step'] = function (result, input) {
	            var key = this.f(input);
	            this.inputs[key] = this.inputs[key] || [
	                key,
	                []
	            ];
	            this.inputs[key][1] = _append(input, this.inputs[key][1]);
	            return result;
	        };
	        return _curry2(function _xgroupBy(f, xf) {
	            return new XGroupBy(f, xf);
	        });
	    }();
	
	    /**
	     * Returns `true` if all elements of the list match the predicate, `false` if there are any
	     * that don't.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
	     *         otherwise.
	     * @example
	     *
	     *      var lessThan2 = R.flip(R.lt)(2);
	     *      var lessThan3 = R.flip(R.lt)(3);
	     *      R.all(lessThan2)([1, 2]); //=> false
	     *      R.all(lessThan3)([1, 2]); //=> true
	     */
	    var all = _curry2(_dispatchable('all', _xall, _all));
	
	    /**
	     * A function that returns the first argument if it's falsy otherwise the second
	     * argument. Note that this is NOT short-circuited, meaning that if expressions
	     * are passed they are both evaluated.
	     *
	     * Dispatches to the `and` method of the first argument if applicable.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig * -> * -> *
	     * @param {*} a any value
	     * @param {*} b any other value
	     * @return {*} the first argument if falsy otherwise the second argument.
	     * @example
	     *
	     *      R.and(false, true); //=> false
	     *      R.and(0, []); //=> 0
	     *      R.and(null, ''); => null
	     */
	    var and = _curry2(function and(a, b) {
	        return _hasMethod('and', a) ? a.and(b) : a && b;
	    });
	
	    /**
	     * Returns `true` if at least one of elements of the list match the predicate, `false`
	     * otherwise.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
	     *         otherwise.
	     * @example
	     *
	     *      var lessThan0 = R.flip(R.lt)(0);
	     *      var lessThan2 = R.flip(R.lt)(2);
	     *      R.any(lessThan0)([1, 2]); //=> false
	     *      R.any(lessThan2)([1, 2]); //=> true
	     */
	    var any = _curry2(_dispatchable('any', _xany, _any));
	
	    /**
	     * Returns a new list containing the contents of the given list, followed by the given
	     * element.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} el The element to add to the end of the new list.
	     * @param {Array} list The list whose contents will be added to the beginning of the output
	     *        list.
	     * @return {Array} A new list containing the contents of the old list followed by `el`.
	     * @example
	     *
	     *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
	     *      R.append('tests', []); //=> ['tests']
	     *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
	     */
	    var append = _curry2(_append);
	
	    /**
	     * Makes a shallow clone of an object, setting or overriding the nodes
	     * required to create the given path, and placing the specific value at the
	     * tail end of that path.  Note that this copies and flattens prototype
	     * properties onto the new object as well.  All non-primitive properties
	     * are copied by reference.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig [String] -> a -> {k: v} -> {k: v}
	     * @param {Array} path the path to set
	     * @param {*} val the new value
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object similar to the original except along the specified path.
	     * @example
	     *
	     *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
	     */
	    var assocPath = _curry3(_assocPath);
	
	    /**
	     * Wraps a function of any arity (including nullary) in a function that accepts exactly 2
	     * parameters. Any extraneous parameters will not be passed to the supplied function.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (* -> c) -> (a, b -> c)
	     * @param {Function} fn The function to wrap.
	     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
	     *         arity 2.
	     * @example
	     *
	     *      var takesThreeArgs = function(a, b, c) {
	     *        return [a, b, c];
	     *      };
	     *      takesThreeArgs.length; //=> 3
	     *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
	     *
	     *      var takesTwoArgs = R.binary(takesThreeArgs);
	     *      takesTwoArgs.length; //=> 2
	     *      // Only 2 arguments are passed to the wrapped function
	     *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
	     */
	    var binary = _curry1(function binary(fn) {
	        return nAry(2, fn);
	    });
	
	    /**
	     * Creates a deep copy of the value which may contain (nested) `Array`s and
	     * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
	     * not copied, but assigned by their reference.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {*} -> {*}
	     * @param {*} value The object or array to clone
	     * @return {*} A new object or array.
	     * @example
	     *
	     *      var objects = [{}, {}, {}];
	     *      var objectsClone = R.clone(objects);
	     *      objects[0] === objectsClone[0]; //=> false
	     */
	    var clone = _curry1(function clone(value) {
	        return _baseCopy(value, [], []);
	    });
	
	    /**
	     * Creates a new function that runs each of the functions supplied as parameters in turn,
	     * passing the return value of each function invocation to the next function invocation,
	     * beginning with whatever arguments were passed to the initial invocation.
	     *
	     * Note that `compose` is a right-associative function, which means the functions provided
	     * will be invoked in order from right to left. In the example `var h = compose(f, g)`,
	     * the function `h` is equivalent to `f( g(x) )`, where `x` represents the arguments
	     * originally passed to `h`.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig ((y -> z), (x -> y), ..., (b -> c), (a... -> b)) -> (a... -> z)
	     * @param {...Function} functions A variable number of functions.
	     * @return {Function} A new function which represents the result of calling each of the
	     *         input `functions`, passing the result of each function call to the next, from
	     *         right to left.
	     * @example
	     *
	     *      var triple = function(x) { return x * 3; };
	     *      var double = function(x) { return x * 2; };
	     *      var square = function(x) { return x * x; };
	     *      var squareThenDoubleThenTriple = R.compose(triple, double, square);
	     *
	     *      //≅ triple(double(square(5)))
	     *      squareThenDoubleThenTriple(5); //=> 150
	     */
	    var compose = _createComposer(_compose);
	
	    /**
	     * Creates a new lens that allows getting and setting values of nested properties, by
	     * following each given lens in succession.
	     *
	     * Note that `composeL` is a right-associative function, which means the lenses provided
	     * will be invoked in order from right to left.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @see R.lens
	     * @sig ((y -> z), (x -> y), ..., (b -> c), (a -> b)) -> (a -> z)
	     * @param {...Function} lenses A variable number of lenses.
	     * @return {Function} A new lens which represents the result of calling each of the
	     *         input `lenses`, passing the result of each getter/setter as the source
	     *         to the next, from right to left.
	     * @example
	     *
	     *      var headLens = R.lensIndex(0);
	     *      var secondLens = R.lensIndex(1);
	     *      var xLens = R.lensProp('x');
	     *      var secondOfXOfHeadLens = R.composeL(secondLens, xLens, headLens);
	     *
	     *      var source = [{x: [0, 1], y: [2, 3]}, {x: [4, 5], y: [6, 7]}];
	     *      secondOfXOfHeadLens(source); //=> 1
	     *      secondOfXOfHeadLens.set(123, source); //=> [{x: [0, 123], y: [2, 3]}, {x: [4, 5], y: [6, 7]}]
	     */
	    var composeL = function () {
	        var fn = arguments[arguments.length - 1];
	        var idx = arguments.length - 2;
	        while (idx >= 0) {
	            fn = _composeL(arguments[idx], fn);
	            idx -= 1;
	        }
	        return fn;
	    };
	
	    /**
	     * Similar to `compose` but with automatic handling of promises (or, more
	     * precisely, "thenables"). The behavior is identical  to that of
	     * compose() if all composed functions return something other than
	     * promises (i.e., objects with a .then() method). If one of the function
	     * returns a promise, however, then the next function in the composition
	     * is called asynchronously, in the success callback of the promise, using
	     * the resolved value as an input. Note that `composeP` is a right-
	     * associative function, just like `compose`.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig ((y -> z), (x -> y), ..., (b -> c), (a... -> b)) -> (a... -> z)
	     * @param {...Function} functions A variable number of functions.
	     * @return {Function} A new function which represents the result of calling each of the
	     *         input `functions`, passing either the returned result or the asynchronously
	     *         resolved value) of each function call to the next, from right to left.
	     * @example
	     *
	     *      var Q = require('q');
	     *      var triple = function(x) { return x * 3; };
	     *      var double = function(x) { return x * 2; };
	     *      var squareAsync = function(x) { return Q.when(x * x); };
	     *      var squareAsyncThenDoubleThenTriple = R.composeP(triple, double, squareAsync);
	     *
	     *      //≅ squareAsync(5).then(function(x) { return triple(double(x)) };
	     *      squareAsyncThenDoubleThenTriple(5)
	     *        .then(function(result) {
	     *          // result is 150
	     *        });
	     */
	    var composeP = _createComposer(_composeP);
	
	    /**
	     * Returns a new list consisting of the elements of the first list followed by the elements
	     * of the second.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [a] -> [a]
	     * @param {Array} list1 The first list to merge.
	     * @param {Array} list2 The second set to merge.
	     * @return {Array} A new array consisting of the contents of `list1` followed by the
	     *         contents of `list2`. If, instead of an Array for `list1`, you pass an
	     *         object with a `concat` method on it, `concat` will call `list1.concat`
	     *         and pass it the value of `list2`.
	     *
	     * @example
	     *
	     *      R.concat([], []); //=> []
	     *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
	     *      R.concat('ABC', 'DEF'); // 'ABCDEF'
	     */
	    var concat = _curry2(function (set1, set2) {
	        if (_isArray(set2)) {
	            return _concat(set1, set2);
	        } else if (_hasMethod('concat', set1)) {
	            return set1.concat(set2);
	        } else {
	            throw new TypeError('can\'t concat ' + typeof set1);
	        }
	    });
	
	    /**
	     * Returns a curried equivalent of the provided function, with the
	     * specified arity. The curried function has two unusual capabilities.
	     * First, its arguments needn't be provided one at a time. If `g` is
	     * `R.curryN(3, f)`, the following are equivalent:
	     *
	     *   - `g(1)(2)(3)`
	     *   - `g(1)(2, 3)`
	     *   - `g(1, 2)(3)`
	     *   - `g(1, 2, 3)`
	     *
	     * Secondly, the special placeholder value `R.__` may be used to specify
	     * "gaps", allowing partial application of any combination of arguments,
	     * regardless of their positions. If `g` is as above and `_` is `R.__`,
	     * the following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig Number -> (* -> a) -> (* -> a)
	     * @param {Number} length The arity for the returned function.
	     * @param {Function} fn The function to curry.
	     * @return {Function} A new, curried function.
	     * @see R.curry
	     * @example
	     *
	     *      var addFourNumbers = function() {
	     *        return R.sum([].slice.call(arguments, 0, 4));
	     *      };
	     *
	     *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
	     *      var f = curriedAddFourNumbers(1, 2);
	     *      var g = f(3);
	     *      g(4); //=> 10
	     */
	    var curryN = _curry2(function curryN(length, fn) {
	        return arity(length, _curryN(length, [], fn));
	    });
	
	    /**
	     * Makes a shallow clone of an object, omitting the property at the
	     * given path. Note that this copies and flattens prototype properties
	     * onto the new object as well.  All non-primitive properties are copied
	     * by reference.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig [String] -> {k: v} -> {k: v}
	     * @param {Array} path the path to set
	     * @param {Object} obj the object to clone
	     * @return {Object} a new object without the property at path
	     * @example
	     *
	     *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
	     */
	    var dissocPath = _curry2(_dissocPath);
	
	    /**
	     * Returns a new list containing the last `n` elements of a given list, passing each value
	     * to the supplied predicate function, skipping elements while the predicate function returns
	     * `true`. The predicate function is passed one argument: *(value)*.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @example
	     *
	     *      var lteTwo = function(x) {
	     *        return x <= 2;
	     *      };
	     *
	     *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
	     */
	    var dropWhile = _curry2(_dispatchable('dropWhile', _xdropWhile, function dropWhile(pred, list) {
	        var idx = 0, len = list.length;
	        while (idx < len && pred(list[idx])) {
	            idx += 1;
	        }
	        return _slice(list, idx);
	    }));
	
	    /**
	     * `empty` returns an empty list for any argument, except when the argument satisfies the
	     * Fantasy-land Monoid spec. In that case, this function will return the result of invoking
	     * `empty` on that Monoid.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig * -> []
	     * @return {Array} An empty array.
	     * @example
	     *
	     *      R.empty([1,2,3,4,5]); //=> []
	     */
	    var empty = _curry1(function empty(x) {
	        return _hasMethod('empty', x) ? x.empty() : [];
	    });
	
	    /**
	     * Returns `true` if its arguments are equivalent, `false` otherwise.
	     * Dispatches to an `equals` method if present. Handles cyclical data
	     * structures.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig a -> b -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @example
	     *
	     *      R.equals(1, 1); //=> true
	     *      R.equals(1, '1'); //=> false
	     *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
	     *
	     *      var a = {}; a.v = a;
	     *      var b = {}; b.v = b;
	     *      R.equals(a, b); //=> true
	     */
	    var equals = _curry2(function equals(a, b) {
	        return _hasMethod('equals', a) ? a.equals(b) : _hasMethod('equals', b) ? b.equals(a) : _equals(a, b, [], []);
	    });
	
	    /**
	     * Returns a new list containing only those items that match a given predicate function.
	     * The predicate function is passed one argument: *(value)*.
	     *
	     * Note that `R.filter` does not skip deleted or unassigned indices, unlike the native
	     * `Array.prototype.filter` method. For more details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Description
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} The new filtered array.
	     * @example
	     *
	     *      var isEven = function(n) {
	     *        return n % 2 === 0;
	     *      };
	     *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
	     */
	    var filter = _curry2(_dispatchable('filter', _xfilter, _filter));
	
	    /**
	     * Returns the first element of the list which matches the predicate, or `undefined` if no
	     * element matches.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> a | undefined
	     * @param {Function} fn The predicate function used to determine if the element is the
	     *        desired one.
	     * @param {Array} list The array to consider.
	     * @return {Object} The element found, or `undefined`.
	     * @example
	     *
	     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	     *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
	     *      R.find(R.propEq('a', 4))(xs); //=> undefined
	     */
	    var find = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (fn(list[idx])) {
	                return list[idx];
	            }
	            idx += 1;
	        }
	    }));
	
	    /**
	     * Returns the index of the first element of the list which matches the predicate, or `-1`
	     * if no element matches.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Number
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Number} The index of the element found, or `-1`.
	     * @example
	     *
	     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
	     *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
	     *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
	     */
	    var findIndex = _curry2(_dispatchable('findIndex', _xfindIndex, function findIndex(fn, list) {
	        var idx = 0;
	        var len = list.length;
	        while (idx < len) {
	            if (fn(list[idx])) {
	                return idx;
	            }
	            idx += 1;
	        }
	        return -1;
	    }));
	
	    /**
	     * Returns the last element of the list which matches the predicate, or `undefined` if no
	     * element matches.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> a | undefined
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Object} The element found, or `undefined`.
	     * @example
	     *
	     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
	     *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
	     *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
	     */
	    var findLast = _curry2(_dispatchable('findLast', _xfindLast, function findLast(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            if (fn(list[idx])) {
	                return list[idx];
	            }
	            idx -= 1;
	        }
	    }));
	
	    /**
	     * Returns the index of the last element of the list which matches the predicate, or
	     * `-1` if no element matches.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Number
	     * @param {Function} fn The predicate function used to determine if the element is the
	     * desired one.
	     * @param {Array} list The array to consider.
	     * @return {Number} The index of the element found, or `-1`.
	     * @example
	     *
	     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
	     *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
	     *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
	     */
	    var findLastIndex = _curry2(_dispatchable('findLastIndex', _xfindLastIndex, function findLastIndex(fn, list) {
	        var idx = list.length - 1;
	        while (idx >= 0) {
	            if (fn(list[idx])) {
	                return idx;
	            }
	            idx -= 1;
	        }
	        return -1;
	    }));
	
	    /**
	     * Returns a new list by pulling every item out of it (and all its sub-arrays) and putting
	     * them in a new array, depth-first.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [b]
	     * @param {Array} list The array to consider.
	     * @return {Array} The flattened list.
	     * @example
	     *
	     *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
	     *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
	     */
	    var flatten = _curry1(_makeFlat(true));
	
	    /**
	     * Iterate over an input `list`, calling a provided function `fn` for each element in the
	     * list.
	     *
	     * `fn` receives one argument: *(value)*.
	     *
	     * Note: `R.forEach` does not skip deleted or unassigned indices (sparse arrays), unlike
	     * the native `Array.prototype.forEach` method. For more details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
	     *
	     * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns the original
	     * array. In some libraries this function is named `each`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> *) -> [a] -> [a]
	     * @param {Function} fn The function to invoke. Receives one argument, `value`.
	     * @param {Array} list The list to iterate over.
	     * @return {Array} The original list.
	     * @example
	     *
	     *      var printXPlusFive = function(x) { console.log(x + 5); };
	     *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
	     *      //-> 6
	     *      //-> 7
	     *      //-> 8
	     */
	    var forEach = _curry2(function forEach(fn, list) {
	        return _hasMethod('forEach', list) ? list.forEach(fn) : _forEach(fn, list);
	    });
	
	    /**
	     * Returns a list of function names of object's own functions
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {*} -> [String]
	     * @param {Object} obj The objects with functions in it
	     * @return {Array} A list of the object's own properties that map to functions.
	     * @example
	     *
	     *      R.functions(R); // returns list of ramda's own function names
	     *
	     *      var F = function() { this.x = function(){}; this.y = 1; }
	     *      F.prototype.z = function() {};
	     *      F.prototype.a = 100;
	     *      R.functions(new F()); //=> ["x"]
	     */
	    var functions = _curry1(_functionsWith(keys));
	
	    /**
	     * Returns a list of function names of object's own and prototype functions
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {*} -> [String]
	     * @param {Object} obj The objects with functions in it
	     * @return {Array} A list of the object's own properties and prototype
	     *         properties that map to functions.
	     * @example
	     *
	     *      R.functionsIn(R); // returns list of ramda's own and prototype function names
	     *
	     *      var F = function() { this.x = function(){}; this.y = 1; }
	     *      F.prototype.z = function() {};
	     *      F.prototype.a = 100;
	     *      R.functionsIn(new F()); //=> ["x", "z"]
	     */
	    var functionsIn = _curry1(_functionsWith(keysIn));
	
	    /**
	     * Splits a list into sub-lists stored in an object, based on the result of calling a String-returning function
	     * on each element, and grouping the results according to values returned.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> String) -> [a] -> {String: [a]}
	     * @param {Function} fn Function :: a -> String
	     * @param {Array} list The array to group
	     * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
	     *         that produced that key when passed to `fn`.
	     * @example
	     *
	     *      var byGrade = R.groupBy(function(student) {
	     *        var score = student.score;
	     *        return score < 65 ? 'F' :
	     *               score < 70 ? 'D' :
	     *               score < 80 ? 'C' :
	     *               score < 90 ? 'B' : 'A';
	     *      });
	     *      var students = [{name: 'Abby', score: 84},
	     *                      {name: 'Eddy', score: 58},
	     *                      // ...
	     *                      {name: 'Jack', score: 69}];
	     *      byGrade(students);
	     *      // {
	     *      //   'A': [{name: 'Dianne', score: 99}],
	     *      //   'B': [{name: 'Abby', score: 84}]
	     *      //   // ...,
	     *      //   'F': [{name: 'Eddy', score: 58}]
	     *      // }
	     */
	    var groupBy = _curry2(_dispatchable('groupBy', _xgroupBy, function groupBy(fn, list) {
	        return _reduce(function (acc, elt) {
	            var key = fn(elt);
	            acc[key] = _append(elt, acc[key] || (acc[key] = []));
	            return acc;
	        }, {}, list);
	    }));
	
	    /**
	     * Returns the first element in a list.
	     * In some libraries this function is named `first`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> a
	     * @param {Array} list The array to consider.
	     * @return {*} The first element of the list, or `undefined` if the list is empty.
	     * @example
	     *
	     *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
	     */
	    var head = nth(0);
	
	    /**
	     * Creates a function that will process either the `onTrue` or the `onFalse` function depending
	     * upon the result of the `condition` predicate.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
	     * @param {Function} condition A predicate function
	     * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
	     * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
	     * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
	     *                    function depending upon the result of the `condition` predicate.
	     * @example
	     *
	     *      // Flatten all arrays in the list but leave other values alone.
	     *      var flattenArrays = R.map(R.ifElse(Array.isArray, R.flatten, R.identity));
	     *
	     *      flattenArrays([[0], [[10], [8]], 1234, {}]); //=> [[0], [10, 8], 1234, {}]
	     *      flattenArrays([[[10], 123], [8, [10]], "hello"]); //=> [[10, 123], [8, 10], "hello"]
	     */
	    var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
	        return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
	            return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
	        });
	    });
	
	    /**
	     * Inserts the supplied element into the list, at index `index`.  _Note
	     * that this is not destructive_: it returns a copy of the list with the changes.
	     * <small>No lists have been harmed in the application of this function.</small>
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> a -> [a] -> [a]
	     * @param {Number} index The position to insert the element
	     * @param {*} elt The element to insert into the Array
	     * @param {Array} list The list to insert into
	     * @return {Array} A new Array with `elt` inserted at `index`.
	     * @example
	     *
	     *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
	     */
	    var insert = _curry3(function insert(idx, elt, list) {
	        idx = idx < list.length && idx >= 0 ? idx : list.length;
	        return _concat(_append(elt, _slice(list, 0, idx)), _slice(list, idx));
	    });
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of those
	     * elements common to both lists.  Duplication is determined according
	     * to the value returned by applying the supplied predicate to two list
	     * elements.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
	     * @param {Function} pred A predicate function that determines whether
	     *        the two supplied elements are equal.
	     * @param {Array} list1 One list of items to compare
	     * @param {Array} list2 A second list of items to compare
	     * @see R.intersection
	     * @return {Array} A new list containing those elements common to both lists.
	     * @example
	     *
	     *      var buffaloSpringfield = [
	     *        {id: 824, name: 'Richie Furay'},
	     *        {id: 956, name: 'Dewey Martin'},
	     *        {id: 313, name: 'Bruce Palmer'},
	     *        {id: 456, name: 'Stephen Stills'},
	     *        {id: 177, name: 'Neil Young'}
	     *      ];
	     *      var csny = [
	     *        {id: 204, name: 'David Crosby'},
	     *        {id: 456, name: 'Stephen Stills'},
	     *        {id: 539, name: 'Graham Nash'},
	     *        {id: 177, name: 'Neil Young'}
	     *      ];
	     *
	     *      var sameId = function(o1, o2) {return o1.id === o2.id;};
	     *
	     *      R.intersectionWith(sameId, buffaloSpringfield, csny);
	     *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
	     */
	    var intersectionWith = _curry3(function intersectionWith(pred, list1, list2) {
	        var results = [], idx = 0;
	        while (idx < list1.length) {
	            if (_containsWith(pred, list1[idx], list2)) {
	                results[results.length] = list1[idx];
	            }
	            idx += 1;
	        }
	        return uniqWith(pred, results);
	    });
	
	    /**
	     * Creates a new list with the separator interposed between elements.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> [a] -> [a]
	     * @param {*} separator The element to add to the list.
	     * @param {Array} list The list to be interposed.
	     * @return {Array} The new list.
	     * @example
	     *
	     *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
	     */
	    var intersperse = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
	        var out = [];
	        var idx = 0;
	        var length = list.length;
	        while (idx < length) {
	            if (idx === length - 1) {
	                out.push(list[idx]);
	            } else {
	                out.push(list[idx], separator);
	            }
	            idx += 1;
	        }
	        return out;
	    }));
	
	    /**
	     * Same as R.invertObj, however this accounts for objects
	     * with duplicate values by putting the values into an
	     * array.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {s: x} -> {x: [ s, ... ]}
	     * @param {Object} obj The object or array to invert
	     * @return {Object} out A new object with keys
	     * in an array.
	     * @example
	     *
	     *      var raceResultsByFirstName = {
	     *        first: 'alice',
	     *        second: 'jake',
	     *        third: 'alice',
	     *      };
	     *      R.invert(raceResultsByFirstName);
	     *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
	     */
	    var invert = _curry1(function invert(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var idx = 0;
	        var out = {};
	        while (idx < len) {
	            var key = props[idx];
	            var val = obj[key];
	            var list = _has(val, out) ? out[val] : out[val] = [];
	            list[list.length] = key;
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new object with the keys of the given object
	     * as values, and the values of the given object as keys.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {s: x} -> {x: s}
	     * @param {Object} obj The object or array to invert
	     * @return {Object} out A new object
	     * @example
	     *
	     *      var raceResults = {
	     *        first: 'alice',
	     *        second: 'jake'
	     *      };
	     *      R.invertObj(raceResults);
	     *      //=> { 'alice': 'first', 'jake':'second' }
	     *
	     *      // Alternatively:
	     *      var raceResults = ['alice', 'jake'];
	     *      R.invertObj(raceResults);
	     *      //=> { 'alice': '0', 'jake':'1' }
	     */
	    var invertObj = _curry1(function invertObj(obj) {
	        var props = keys(obj);
	        var len = props.length;
	        var idx = 0;
	        var out = {};
	        while (idx < len) {
	            var key = props[idx];
	            out[obj[key]] = key;
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Turns a named method with a specified arity into a function
	     * that can be called directly supplied with arguments and a target object.
	     *
	     * The returned function is curried and accepts `arity + 1` parameters where
	     * the final parameter is the target object.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
	     * @param {Number} arity Number of arguments the returned function should take
	     *        before the target object.
	     * @param {Function} method Name of the method to call.
	     * @return {Function} A new curried function.
	     * @example
	     *
	     *      var sliceFrom = R.invoker(1, 'slice');
	     *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
	     *      var sliceFrom6 = R.invoker(2, 'slice')(6);
	     *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
	     */
	    var invoker = _curry2(function invoker(arity, method) {
	        return curryN(arity + 1, function () {
	            var target = arguments[arity];
	            return target[method].apply(target, _slice(arguments, 0, arity));
	        });
	    });
	
	    /**
	     * Returns a string made by inserting the `separator` between each
	     * element and concatenating all the elements into a single string.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig String -> [a] -> String
	     * @param {Number|String} separator The string used to separate the elements.
	     * @param {Array} xs The elements to join into a string.
	     * @return {String} str The string made by concatenating `xs` with `separator`.
	     * @example
	     *
	     *      var spacer = R.join(' ');
	     *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
	     *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
	     */
	    var join = invoker(1, 'join');
	
	    /**
	     * Returns the last element from a list.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> a
	     * @param {Array} list The array to consider.
	     * @return {*} The last element of the list, or `undefined` if the list is empty.
	     * @example
	     *
	     *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
	     */
	    var last = nth(-1);
	
	    /**
	     * Creates a lens that will focus on index `n` of the source array.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @see R.lens
	     * @sig Number -> (a -> b)
	     * @param {Number} n The index of the array that the returned lens will focus on.
	     * @return {Function} the returned function has `set` and `map` properties that are
	     *         also curried functions.
	     * @example
	     *
	     *     var headLens = R.lensIndex(0);
	     *     headLens([10, 20, 30, 40]); //=> 10
	     *     headLens.set('mu', [10, 20, 30, 40]); //=> ['mu', 20, 30, 40]
	     *     headLens.map(function(x) { return x + 1; }, [10, 20, 30, 40]); //=> [11, 20, 30, 40]
	     */
	    var lensIndex = _curry1(function lensIndex(n) {
	        return lens(nth(n), update(n));
	    });
	
	    /**
	     * Creates a lens that will focus on property `k` of the source object.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @see R.lens
	     * @sig String -> (a -> b)
	     * @param {String} k A string that represents a property to focus on.
	     * @return {Function} the returned function has `set` and `map` properties that are
	     *         also curried functions.
	     * @example
	     *
	     *     var phraseLens = R.lensProp('phrase');
	     *     var obj1 = { phrase: 'Absolute filth . . . and I LOVED it!'};
	     *     var obj2 = { phrase: "What's all this, then?"};
	     *     phraseLens(obj1); // => 'Absolute filth . . . and I LOVED it!'
	     *     phraseLens(obj2); // => "What's all this, then?"
	     *     phraseLens.set('Ooh Betty', obj1); //=> { phrase: 'Ooh Betty'}
	     *     phraseLens.map(R.toUpper, obj2); //=> { phrase: "WHAT'S ALL THIS, THEN?"}
	     */
	    var lensProp = _curry1(function lensProp(k) {
	        return lens(prop(k), assoc(k));
	    });
	
	    /**
	     * Returns a new list, constructed by applying the supplied function to every element of the
	     * supplied list.
	     *
	     * Note: `R.map` does not skip deleted or unassigned indices (sparse arrays), unlike the
	     * native `Array.prototype.map` method. For more details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> b) -> [a] -> [b]
	     * @param {Function} fn The function to be called on every element of the input `list`.
	     * @param {Array} list The list to be iterated over.
	     * @return {Array} The new list.
	     * @example
	     *
	     *      var double = function(x) {
	     *        return x * 2;
	     *      };
	     *
	     *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
	     */
	    var map = _curry2(_dispatchable('map', _xmap, _map));
	
	    /**
	     * Map, but for objects. Creates an object with the same keys as `obj` and values
	     * generated by running each property of `obj` through `fn`. `fn` is passed one argument:
	     * *(value)*.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig (v -> v) -> {k: v} -> {k: v}
	     * @param {Function} fn A function called for each property in `obj`. Its return value will
	     * become a new property on the return object.
	     * @param {Object} obj The object to iterate over.
	     * @return {Object} A new object with the same keys as `obj` and values that are the result
	     *         of running each property through `fn`.
	     * @example
	     *
	     *      var values = { x: 1, y: 2, z: 3 };
	     *      var double = function(num) {
	     *        return num * 2;
	     *      };
	     *
	     *      R.mapObj(double, values); //=> { x: 2, y: 4, z: 6 }
	     */
	    var mapObj = _curry2(function mapObject(fn, obj) {
	        return _reduce(function (acc, key) {
	            acc[key] = fn(obj[key]);
	            return acc;
	        }, {}, keys(obj));
	    });
	
	    /**
	     * Like `mapObj`, but but passes additional arguments to the predicate function. The
	     * predicate function is passed three arguments: *(value, key, obj)*.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig (v, k, {k: v} -> v) -> {k: v} -> {k: v}
	     * @param {Function} fn A function called for each property in `obj`. Its return value will
	     *        become a new property on the return object.
	     * @param {Object} obj The object to iterate over.
	     * @return {Object} A new object with the same keys as `obj` and values that are the result
	     *         of running each property through `fn`.
	     * @example
	     *
	     *      var values = { x: 1, y: 2, z: 3 };
	     *      var prependKeyAndDouble = function(num, key, obj) {
	     *        return key + (num * 2);
	     *      };
	     *
	     *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
	     */
	    var mapObjIndexed = _curry2(function mapObjectIndexed(fn, obj) {
	        return _reduce(function (acc, key) {
	            acc[key] = fn(obj[key], key, obj);
	            return acc;
	        }, {}, keys(obj));
	    });
	
	    /**
	     * Tests a regular expression against a String
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig RegExp -> String -> [String] | null
	     * @param {RegExp} rx A regular expression.
	     * @param {String} str The string to match against
	     * @return {Array} The list of matches, or null if no matches found.
	     * @see R.invoker
	     * @example
	     *
	     *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
	     */
	    var match = invoker(1, 'match');
	
	    /**
	     * Determines the largest of a list of numbers (or elements that can be cast to numbers)
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig [Number] -> Number
	     * @see R.maxBy
	     * @param {Array} list A list of numbers
	     * @return {Number} The greatest number in the list.
	     * @example
	     *
	     *      R.max([7, 3, 9, 2, 4, 9, 3]); //=> 9
	     */
	    var max = _createMaxMin(_gt, -Infinity);
	
	    /**
	     * Create a new object with the own properties of `a`
	     * merged with the own properties of object `b`.
	     * This function will *not* mutate passed-in objects.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {k: v} -> {k: v} -> {k: v}
	     * @param {Object} a source object
	     * @param {Object} b object with higher precedence in output
	     * @return {Object} The destination object.
	     * @example
	     *
	     *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
	     *      //=> { 'name': 'fred', 'age': 40 }
	     *
	     *      var resetToDefault = R.merge(R.__, {x: 0});
	     *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
	     */
	    var merge = _curry2(function merge(a, b) {
	        return _extend(_extend({}, a), b);
	    });
	
	    /**
	     * Determines the smallest of a list of numbers (or elements that can be cast to numbers)
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list A list of numbers
	     * @return {Number} The greatest number in the list.
	     * @see R.minBy
	     * @example
	     *
	     *      R.min([7, 3, 9, 2, 4, 9, 3]); //=> 2
	     */
	    var min = _createMaxMin(_lt, Infinity);
	
	    /**
	     * Returns `true` if no elements of the list match the predicate,
	     * `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> Boolean
	     * @param {Function} fn The predicate function.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
	     * @example
	     *
	     *      R.none(R.isNaN, [1, 2, 3]); //=> true
	     *      R.none(R.isNaN, [1, 2, 3, NaN]); //=> false
	     */
	    var none = _curry2(_complement(_dispatchable('any', _xany, _any)));
	
	    /**
	     * A function that returns the first truthy of two arguments otherwise the
	     * last argument. Note that this is NOT short-circuited, meaning that if
	     * expressions are passed they are both evaluated.
	     *
	     * Dispatches to the `or` method of the first argument if applicable.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig * -> * -> *
	     * @param {*} a any value
	     * @param {*} b any other value
	     * @return {*} the first truthy argument, otherwise the last argument.
	     * @example
	     *
	     *      R.or(false, true); //=> true
	     *      R.or(0, []); //=> []
	     *      R.or(null, ''); => ''
	     */
	    var or = _curry2(function or(a, b) {
	        return _hasMethod('or', a) ? a.or(b) : a || b;
	    });
	
	    /**
	     * Takes a predicate and a list and returns the pair of lists of
	     * elements which do and do not satisfy the predicate, respectively.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [[a],[a]]
	     * @param {Function} pred A predicate to determine which array the element belongs to.
	     * @param {Array} list The array to partition.
	     * @return {Array} A nested array, containing first an array of elements that satisfied the predicate,
	     *         and second an array of elements that did not satisfy.
	     * @example
	     *
	     *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
	     *      //=> [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
	     */
	    var partition = _curry2(function partition(pred, list) {
	        return _reduce(function (acc, elt) {
	            var xs = acc[pred(elt) ? 0 : 1];
	            xs[xs.length] = elt;
	            return acc;
	        }, [
	            [],
	            []
	        ], list);
	    });
	
	    /**
	     * Determines whether a nested path on an object has a specific value,
	     * in `R.equals` terms. Most likely used to filter a list.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig [String] -> * -> {String: *} -> Boolean
	     * @param {Array} path The path of the nested property to use
	     * @param {*} val The value to compare the nested property with
	     * @param {Object} obj The object to check the nested property in
	     * @return {Boolean} `true` if the value equals the nested object property,
	     *         `false` otherwise.
	     * @example
	     *
	     *      var user1 = { address: { zipCode: 90210 } };
	     *      var user2 = { address: { zipCode: 55555 } };
	     *      var user3 = { name: 'Bob' };
	     *      var users = [ user1, user2, user3 ];
	     *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
	     *      R.filter(isFamous, users); //=> [ user1 ]
	     */
	    var pathEq = _curry3(function pathEq(path, val, obj) {
	        return equals(_path(path, obj), val);
	    });
	
	    /**
	     * Creates a new function that runs each of the functions supplied as parameters in turn,
	     * passing the return value of each function invocation to the next function invocation,
	     * beginning with whatever arguments were passed to the initial invocation.
	     *
	     * `pipe` is the mirror version of `compose`. `pipe` is left-associative, which means that
	     * each of the functions provided is executed in order from left to right.
	     *
	     * In some libraries this function is named `sequence`.
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig ((a... -> b), (b -> c), ..., (x -> y), (y -> z)) -> (a... -> z)
	     * @param {...Function} functions A variable number of functions.
	     * @return {Function} A new function which represents the result of calling each of the
	     *         input `functions`, passing the result of each function call to the next, from
	     *         left to right.
	     * @example
	     *
	     *      var triple = function(x) { return x * 3; };
	     *      var double = function(x) { return x * 2; };
	     *      var square = function(x) { return x * x; };
	     *      var squareThenDoubleThenTriple = R.pipe(square, double, triple);
	     *
	     *      //≅ triple(double(square(5)))
	     *      squareThenDoubleThenTriple(5); //=> 150
	     */
	    var pipe = function pipe() {
	        return compose.apply(this, reverse(arguments));
	    };
	
	    /**
	     * Creates a new lens that allows getting and setting values of nested properties, by
	     * following each given lens in succession.
	     *
	     * `pipeL` is the mirror version of `composeL`. `pipeL` is left-associative, which means that
	     * each of the functions provided is executed in order from left to right.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @see R.lens
	     * @sig ((a -> b), (b -> c), ..., (x -> y), (y -> z)) -> (a -> z)
	     * @param {...Function} lenses A variable number of lenses.
	     * @return {Function} A new lens which represents the result of calling each of the
	     *         input `lenses`, passing the result of each getter/setter as the source
	     *         to the next, from right to left.
	     * @example
	     *
	     *      var headLens = R.lensIndex(0);
	     *      var secondLens = R.lensIndex(1);
	     *      var xLens = R.lensProp('x');
	     *      var headThenXThenSecondLens = R.pipeL(headLens, xLens, secondLens);
	     *
	     *      var source = [{x: [0, 1], y: [2, 3]}, {x: [4, 5], y: [6, 7]}];
	     *      headThenXThenSecondLens(source); //=> 1
	     *      headThenXThenSecondLens.set(123, source); //=> [{x: [0, 123], y: [2, 3]}, {x: [4, 5], y: [6, 7]}]
	     */
	    var pipeL = compose(apply(composeL), unapply(reverse));
	
	    /**
	     * Creates a new function that runs each of the functions supplied as parameters in turn,
	     * passing to the next function invocation either the value returned by the previous
	     * function or the resolved value if the returned value is a promise. In other words,
	     * if some of the functions in the sequence return promises, `pipeP` pipes the values
	     * asynchronously. If none of the functions return promises, the behavior is the same as
	     * that of `pipe`.
	     *
	     * `pipeP` is the mirror version of `composeP`. `pipeP` is left-associative, which means that
	     * each of the functions provided is executed in order from left to right.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig ((a... -> b), (b -> c), ..., (x -> y), (y -> z)) -> (a... -> z)
	     * @param {...Function} functions A variable number of functions.
	     * @return {Function} A new function which represents the result of calling each of the
	     *         input `functions`, passing either the returned result or the asynchronously
	     *         resolved value) of each function call to the next, from left to right.
	     * @example
	     *
	     *      var Q = require('q');
	     *      var triple = function(x) { return x * 3; };
	     *      var double = function(x) { return x * 2; };
	     *      var squareAsync = function(x) { return Q.when(x * x); };
	     *      var squareAsyncThenDoubleThenTriple = R.pipeP(squareAsync, double, triple);
	     *
	     *      //≅ squareAsync(5).then(function(x) { return triple(double(x)) };
	     *      squareAsyncThenDoubleThenTriple(5)
	     *        .then(function(result) {
	     *          // result is 150
	     *        });
	     */
	    var pipeP = function pipeP() {
	        return composeP.apply(this, reverse(arguments));
	    };
	
	    /**
	     * Determines whether the given property of an object has a specific value,
	     * in `R.equals` terms. Most likely used to filter a list.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig k -> v -> {k: v} -> Boolean
	     * @param {Number|String} name The property name (or index) to use.
	     * @param {*} val The value to compare the property with.
	     * @return {Boolean} `true` if the properties are equal, `false` otherwise.
	     * @example
	     *
	     *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
	     *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
	     *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
	     *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
	     *      var kids = [abby, fred, rusty, alois];
	     *      var hasBrownHair = R.propEq('hair', 'brown');
	     *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
	     */
	    var propEq = _curry3(function propEq(name, val, obj) {
	        return equals(obj[name], val);
	    });
	
	    /**
	     * Returns a single item by iterating through the list, successively calling the iterator
	     * function and passing it an accumulator value and the current value from the array, and
	     * then passing the result to the next call.
	     *
	     * The iterator function receives two values: *(acc, value)*.  It may use `R.reduced` to
	     * shortcut the iteration.
	     *
	     * Note: `R.reduce` does not skip deleted or unassigned indices (sparse arrays), unlike
	     * the native `Array.prototype.reduce` method. For more details on this behavior, see:
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
	     * @see R.reduced
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a,b -> a) -> a -> [b] -> a
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array.
	     * @param {*} acc The accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var numbers = [1, 2, 3];
	     *      var add = function(a, b) {
	     *        return a + b;
	     *      };
	     *
	     *      R.reduce(add, 10, numbers); //=> 16
	     */
	    var reduce = _curry3(_reduce);
	
	    /**
	     * Similar to `filter`, except that it keeps only values for which the given predicate
	     * function returns falsy. The predicate function is passed one argument: *(value)*.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} The new filtered array.
	     * @example
	     *
	     *      var isOdd = function(n) {
	     *        return n % 2 === 1;
	     *      };
	     *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
	     */
	    var reject = _curry2(function reject(fn, list) {
	        return filter(_complement(fn), list);
	    });
	
	    /**
	     * Returns a fixed list of size `n` containing a specified identical value.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> n -> [a]
	     * @param {*} value The value to repeat.
	     * @param {Number} n The desired size of the output list.
	     * @return {Array} A new array containing `n` `value`s.
	     * @example
	     *
	     *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
	     *
	     *      var obj = {};
	     *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
	     *      repeatedObjs[0] === repeatedObjs[1]; //=> true
	     */
	    var repeat = _curry2(function repeat(value, n) {
	        return times(always(value), n);
	    });
	
	    /**
	     * Returns a list containing the elements of `xs` from `fromIndex` (inclusive)
	     * to `toIndex` (exclusive).
	     *
	     * Dispatches to its third argument's `slice` method if present. As a
	     * result, one may replace `[a]` with `String` in the type signature.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> Number -> [a] -> [a]
	     * @param {Number} fromIndex The start index (inclusive).
	     * @param {Number} toIndex The end index (exclusive).
	     * @param {Array} xs The list to take elements from.
	     * @return {Array} The slice of `xs` from `fromIndex` to `toIndex`.
	     * @example
	     *
	     *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
	     *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
	     *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
	     *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
	     *      R.slice(0, 3, 'ramda');                     //=> 'ram'
	     */
	    var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, xs) {
	        return Array.prototype.slice.call(xs, fromIndex, toIndex);
	    }));
	
	    /**
	     * Splits a string into an array of strings based on the given
	     * separator.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig String -> String -> [String]
	     * @param {String} sep The separator string.
	     * @param {String} str The string to separate into an array.
	     * @return {Array} The array of strings from `str` separated by `str`.
	     * @example
	     *
	     *      var pathComponents = R.split('/');
	     *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
	     *
	     *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
	     */
	    var split = invoker(1, 'split');
	
	    /**
	     * Returns a string containing the characters of `str` from `fromIndex`
	     * (inclusive) to `toIndex` (exclusive).
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig Number -> Number -> String -> String
	     * @param {Number} fromIndex The start index (inclusive).
	     * @param {Number} toIndex The end index (exclusive).
	     * @param {String} str The string to slice.
	     * @return {String}
	     * @see R.slice
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      R.substring(2, 5, 'abcdefghijklm'); //=> 'cde'
	     */
	    var substring = slice;
	
	    /**
	     * Returns a string containing the characters of `str` from `fromIndex`
	     * (inclusive) to the end of `str`.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig Number -> String -> String
	     * @param {Number} fromIndex
	     * @param {String} str
	     * @return {String}
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      R.substringFrom(3, 'Ramda'); //=> 'da'
	     *      R.substringFrom(-2, 'Ramda'); //=> 'da'
	     */
	    var substringFrom = substring(__, Infinity);
	
	    /**
	     * Returns a string containing the first `toIndex` characters of `str`.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig Number -> String -> String
	     * @param {Number} toIndex
	     * @param {String} str
	     * @return {String}
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      R.substringTo(3, 'Ramda'); //=> 'Ram'
	     *      R.substringTo(-2, 'Ramda'); //=> 'Ram'
	     */
	    var substringTo = substring(0);
	
	    /**
	     * Adds together all the elements of a list.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list An array of numbers
	     * @return {Number} The sum of all the numbers in the list.
	     * @see R.reduce
	     * @example
	     *
	     *      R.sum([2,4,6,8,100,1]); //=> 121
	     */
	    var sum = reduce(_add, 0);
	
	    /**
	     * Returns all but the first element of a list. If the list provided has the `tail` method,
	     * it will instead return `list.tail()`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} A new array containing all but the first element of the input list, or an
	     *         empty list if the input list is empty.
	     * @example
	     *
	     *      R.tail(['fi', 'fo', 'fum']); //=> ['fo', 'fum']
	     */
	    var tail = _checkForMethod('tail', function (list) {
	        return _slice(list, 1);
	    });
	
	    /**
	     * Returns a new list containing the first `n` elements of the given list.
	     * If `n > list.length`, returns a list of `list.length` elements.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * Dispatches to its second argument's `slice` method if present. As a
	     * result, one may replace `[a]` with `String` in the type signature.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @param {Number} n The number of elements to return.
	     * @param {Array} xs The collection to consider.
	     * @return {Array}
	     * @example
	     *
	     *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
	     *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
	     *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
	     *      R.take(3, 'ramda');               //=> 'ram'
	     *
	     *      var personnel = [
	     *        'Dave Brubeck',
	     *        'Paul Desmond',
	     *        'Eugene Wright',
	     *        'Joe Morello',
	     *        'Gerry Mulligan',
	     *        'Bob Bates',
	     *        'Joe Dodge',
	     *        'Ron Crotty'
	     *      ];
	     *
	     *      takeFive(personnel);
	     *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
	     */
	    var take = _curry2(_dispatchable('take', _xtake, function take(n, xs) {
	        return slice(0, n < 0 ? Infinity : n, xs);
	    }));
	
	    /**
	     * Returns a new list containing the first `n` elements of a given list, passing each value
	     * to the supplied predicate function, and terminating when the predicate function returns
	     * `false`. Excludes the element that caused the predicate function to fail. The predicate
	     * function is passed one argument: *(value)*.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> Boolean) -> [a] -> [a]
	     * @param {Function} fn The function called per iteration.
	     * @param {Array} list The collection to iterate over.
	     * @return {Array} A new array.
	     * @example
	     *
	     *      var isNotFour = function(x) {
	     *        return !(x === 4);
	     *      };
	     *
	     *      R.takeWhile(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
	     */
	    var takeWhile = _curry2(_dispatchable('takeWhile', _xtakeWhile, function takeWhile(fn, list) {
	        var idx = 0, len = list.length;
	        while (idx < len && fn(list[idx])) {
	            idx += 1;
	        }
	        return _slice(list, 0, idx);
	    }));
	
	    /**
	     * The lower case version of a string.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to lower case.
	     * @return {String} The lower case version of `str`.
	     * @example
	     *
	     *      R.toLower('XYZ'); //=> 'xyz'
	     */
	    var toLower = invoker(0, 'toLowerCase');
	
	    /**
	     * The upper case version of a string.
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig String -> String
	     * @param {String} str The string to upper case.
	     * @return {String} The upper case version of `str`.
	     * @example
	     *
	     *      R.toUpper('abc'); //=> 'ABC'
	     */
	    var toUpper = invoker(0, 'toUpperCase');
	
	    /**
	     * Initializes a transducer using supplied iterator function. Returns a single item by
	     * iterating through the list, successively calling the transformed iterator function and
	     * passing it an accumulator value and the current value from the array, and then passing
	     * the result to the next call.
	     *
	     * The iterator function receives two values: *(acc, value)*. It will be wrapped as a
	     * transformer to initialize the transducer. A transformer can be passed directly in place
	     * of an iterator function.  In both cases, iteration may be stopped early with the
	     * `R.reduced` function.
	     *
	     * A transducer is a function that accepts a transformer and returns a transformer and can
	     * be composed directly.
	     *
	     * A transformer is an an object that provides a 2-arity reducing iterator function, step,
	     * 0-arity initial value function, init, and 1-arity result extraction function, result.
	     * The step function is used as the iterator function in reduce. The result function is used
	     * to convert the final accumulator into the return type and in most cases is R.identity.
	     * The init function can be used to provide an initial accumulator, but is ignored by transduce.
	     *
	     * The iteration is performed with R.reduce after initializing the transducer.
	     * @see R.reduce
	     * @see R.reduced
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (c -> c) -> (a,b -> a) -> a -> [b] -> a
	     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
	     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
	     *        current element from the array. Wrapped as transformer, if necessary, and used to
	     *        initialize the transducer
	     * @param {*} acc The initial accumulator value.
	     * @param {Array} list The list to iterate over.
	     * @see R.into
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
	     *
	     *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
	     */
	    var transduce = curryN(4, function (xf, fn, acc, list) {
	        return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
	    });
	
	    /**
	     * Returns a function of arity `n` from a (manually) curried function.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig Number -> (a -> b) -> (a -> c)
	     * @param {Number} length The arity for the returned function.
	     * @param {Function} fn The function to uncurry.
	     * @return {Function} A new function.
	     * @see R.curry
	     * @example
	     *
	     *      var addFour = function(a) {
	     *        return function(b) {
	     *          return function(c) {
	     *            return function(d) {
	     *              return a + b + c + d;
	     *            };
	     *          };
	     *        };
	     *      };
	     *
	     *      var uncurriedAddFour = R.uncurryN(4, addFour);
	     *      curriedAddFour(1, 2, 3, 4); //=> 10
	     */
	    var uncurryN = _curry2(function uncurryN(depth, fn) {
	        return curryN(depth, function () {
	            var currentDepth = 1;
	            var value = fn;
	            var idx = 0;
	            var endIdx;
	            while (currentDepth <= depth && typeof value === 'function') {
	                endIdx = currentDepth === depth ? arguments.length : idx + value.length;
	                value = value.apply(this, _slice(arguments, idx, endIdx));
	                currentDepth += 1;
	                idx = endIdx;
	            }
	            return value;
	        });
	    });
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
	     * determined according to the value returned by applying the supplied predicate to two list elements.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The first and second lists concatenated, with
	     *         duplicates removed.
	     * @see R.union
	     * @example
	     *
	     *      function cmp(x, y) { return x.a === y.a; }
	     *      var l1 = [{a: 1}, {a: 2}];
	     *      var l2 = [{a: 1}, {a: 4}];
	     *      R.unionWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
	     */
	    var unionWith = _curry3(function unionWith(pred, list1, list2) {
	        return uniqWith(pred, _concat(list1, list2));
	    });
	
	    /**
	     * Returns a new list containing only one copy of each element in the original list.
	     * `R.equals` is used to determine equality.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of unique items.
	     * @example
	     *
	     *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
	     *      R.uniq([1, '1']);     //=> [1, '1']
	     *      R.uniq([[42], [42]]); //=> [[42]]
	     */
	    var uniq = uniqWith(equals);
	
	    /**
	     * Returns a new list by pulling every item at the first level of nesting out, and putting
	     * them in a new array.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [b]
	     * @param {Array} list The array to consider.
	     * @return {Array} The flattened list.
	     * @example
	     *
	     *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
	     *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
	     */
	    var unnest = _curry1(_makeFlat(false));
	
	    /**
	     * Takes a spec object and a test object; returns true if the test satisfies
	     * the spec, false otherwise. An object satisfies the spec if, for each of the
	     * spec's own properties, accessing that property of the object gives the same
	     * value (in `R.equals` terms) as accessing that property of the spec.
	     *
	     * `whereEq` is a specialization of [`where`](#where).
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig {String: *} -> {String: *} -> Boolean
	     * @param {Object} spec
	     * @param {Object} testObj
	     * @return {Boolean}
	     * @see R.where
	     * @example
	     *
	     *      // pred :: Object -> Boolean
	     *      var pred = R.whereEq({a: 1, b: 2});
	     *
	     *      pred({a: 1});              //=> false
	     *      pred({a: 1, b: 2});        //=> true
	     *      pred({a: 1, b: 2, c: 3});  //=> true
	     *      pred({a: 1, b: 1});        //=> false
	     */
	    var whereEq = _curry2(function whereEq(spec, testObj) {
	        return where(mapObj(equals, spec), testObj);
	    });
	
	    /**
	     * Wrap a function inside another to allow you to make adjustments to the parameters, or do
	     * other processing either before the internal function is called or with its results.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (a... -> b) -> ((a... -> b) -> a... -> c) -> (a... -> c)
	     * @param {Function} fn The function to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      var greet = function(name) {return 'Hello ' + name;};
	     *
	     *      var shoutedGreet = R.wrap(greet, function(gr, name) {
	     *        return gr(name).toUpperCase();
	     *      });
	     *      shoutedGreet("Kathy"); //=> "HELLO KATHY"
	     *
	     *      var shortenedGreet = R.wrap(greet, function(gr, name) {
	     *        return gr(name.substring(0, 3));
	     *      });
	     *      shortenedGreet("Robert"); //=> "Hello Rob"
	     */
	    var wrap = _curry2(function wrap(fn, wrapper) {
	        return curryN(fn.length, function () {
	            return wrapper.apply(this, _concat([fn], arguments));
	        });
	    });
	
	    var _chain = _curry2(function _chain(f, list) {
	        return unnest(map(f, list));
	    });
	
	    var _flatCat = function () {
	        var preservingReduced = function (xf) {
	            return {
	                '@@transducer/init': _xfBase.init,
	                '@@transducer/result': function (result) {
	                    return xf['@@transducer/result'](result);
	                },
	                '@@transducer/step': function (result, input) {
	                    var ret = xf['@@transducer/step'](result, input);
	                    return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
	                }
	            };
	        };
	        return function _xcat(xf) {
	            var rxf = preservingReduced(xf);
	            return {
	                '@@transducer/init': _xfBase.init,
	                '@@transducer/result': function (result) {
	                    return rxf['@@transducer/result'](result);
	                },
	                '@@transducer/step': function (result, input) {
	                    return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
	                }
	            };
	        };
	    }();
	
	    var _indexOf = function _indexOf(list, item, from) {
	        var idx = 0, len = list.length;
	        if (typeof from === 'number') {
	            idx = from < 0 ? Math.max(0, len + from) : from;
	        }
	        while (idx < len) {
	            if (equals(list[idx], item)) {
	                return idx;
	            }
	            idx += 1;
	        }
	        return -1;
	    };
	
	    var _lastIndexOf = function _lastIndexOf(list, item, from) {
	        var idx;
	        if (typeof from === 'number') {
	            idx = from < 0 ? list.length + from : Math.min(list.length - 1, from);
	        } else {
	            idx = list.length - 1;
	        }
	        while (idx >= 0) {
	            if (equals(list[idx], item)) {
	                return idx;
	            }
	            idx -= 1;
	        }
	        return -1;
	    };
	
	    var _pluck = function _pluck(p, list) {
	        return map(prop(p), list);
	    };
	
	    /**
	     * Create a predicate wrapper which will call a pick function (all/any) for each predicate
	     *
	     * @private
	     * @see R.all
	     * @see R.any
	     */
	    // Call function immediately if given arguments
	    // Return a function which will call the predicates with the provided arguments
	    var _predicateWrap = function _predicateWrap(predPicker) {
	        return function (preds) {
	            var predIterator = function () {
	                var args = arguments;
	                return predPicker(function (predicate) {
	                    return predicate.apply(null, args);
	                }, preds);
	            };
	            return arguments.length > 1 ? // Call function immediately if given arguments
	            predIterator.apply(null, _slice(arguments, 1)) : // Return a function which will call the predicates with the provided arguments
	            arity(max(_pluck('length', preds)), predIterator);
	        };
	    };
	
	    var _stepCat = function () {
	        var _stepCatArray = {
	            '@@transducer/init': Array,
	            '@@transducer/step': function (xs, x) {
	                return _concat(xs, [x]);
	            },
	            '@@transducer/result': _identity
	        };
	        var _stepCatString = {
	            '@@transducer/init': String,
	            '@@transducer/step': _add,
	            '@@transducer/result': _identity
	        };
	        var _stepCatObject = {
	            '@@transducer/init': Object,
	            '@@transducer/step': function (result, input) {
	                return merge(result, isArrayLike(input) ? _createMapEntry(input[0], input[1]) : input);
	            },
	            '@@transducer/result': _identity
	        };
	        return function _stepCat(obj) {
	            if (_isTransformer(obj)) {
	                return obj;
	            }
	            if (isArrayLike(obj)) {
	                return _stepCatArray;
	            }
	            if (typeof obj === 'string') {
	                return _stepCatString;
	            }
	            if (typeof obj === 'object') {
	                return _stepCatObject;
	            }
	            throw new Error('Cannot create transformer for ' + obj);
	        };
	    }();
	
	    // Function, RegExp, user-defined types
	    var _toString = function _toString(x, seen) {
	        var recur = function recur(y) {
	            var xs = seen.concat([x]);
	            return _indexOf(xs, y) >= 0 ? '<Circular>' : _toString(y, xs);
	        };
	        switch (Object.prototype.toString.call(x)) {
	        case '[object Arguments]':
	            return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
	        case '[object Array]':
	            return '[' + _map(recur, x).join(', ') + ']';
	        case '[object Boolean]':
	            return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
	        case '[object Date]':
	            return 'new Date(' + _quote(_toISOString(x)) + ')';
	        case '[object Null]':
	            return 'null';
	        case '[object Number]':
	            return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
	        case '[object String]':
	            return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
	        case '[object Undefined]':
	            return 'undefined';
	        default:
	            return typeof x.constructor === 'function' && x.constructor.name !== 'Object' && typeof x.toString === 'function' && x.toString() !== '[object Object]' ? x.toString() : // Function, RegExp, user-defined types
	            '{' + _map(function (k) {
	                return _quote(k) + ': ' + recur(x[k]);
	            }, keys(x).sort()).join(', ') + '}';
	        }
	    };
	
	    var _xchain = _curry2(function _xchain(f, xf) {
	        return map(f, _flatCat(xf));
	    });
	
	    /**
	     * Creates a new list iteration function from an existing one by adding two new parameters
	     * to its callback function: the current index, and the entire list.
	     *
	     * This would turn, for instance, Ramda's simple `map` function into one that more closely
	     * resembles `Array.prototype.map`.  Note that this will only work for functions in which
	     * the iteration callback function is the first parameter, and where the list is the last
	     * parameter.  (This latter might be unimportant if the list parameter is not used.)
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @category List
	     * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
	     * @param {Function} fn A list iteration function that does not pass index/list to its callback
	     * @return An altered list iteration function thats passes index/list to its callback
	     * @example
	     *
	     *      var mapIndexed = R.addIndex(R.map);
	     *      mapIndexed(function(val, idx) {return idx + '-' + val;}, ['f', 'o', 'o', 'b', 'a', 'r']);
	     *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
	     */
	    var addIndex = _curry1(function (fn) {
	        return curryN(fn.length, function () {
	            var idx = 0;
	            var origFn = arguments[0];
	            var list = arguments[arguments.length - 1];
	            var indexedFn = function () {
	                var result = origFn.apply(this, _concat(arguments, [
	                    idx,
	                    list
	                ]));
	                idx += 1;
	                return result;
	            };
	            return fn.apply(this, _prepend(indexedFn, _slice(arguments, 1)));
	        });
	    });
	
	    /**
	     * ap applies a list of functions to a list of values.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig [f] -> [a] -> [f a]
	     * @param {Array} fns An array of functions
	     * @param {Array} vs An array of values
	     * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
	     * @example
	     *
	     *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
	     */
	    var ap = _curry2(function ap(fns, vs) {
	        return _hasMethod('ap', fns) ? fns.ap(vs) : _reduce(function (acc, fn) {
	            return _concat(acc, map(fn, vs));
	        }, [], fns);
	    });
	
	    /**
	     * `chain` maps a function over a list and concatenates the results.
	     * This implementation is compatible with the
	     * Fantasy-land Chain spec, and will work with types that implement that spec.
	     * `chain` is also known as `flatMap` in some libraries
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a -> [b]) -> [a] -> [b]
	     * @param {Function} fn
	     * @param {Array} list
	     * @return {Array}
	     * @example
	     *
	     *      var duplicate = function(n) {
	     *        return [n, n];
	     *      };
	     *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
	     */
	    var chain = _curry2(_dispatchable('chain', _xchain, _chain));
	
	    /**
	     * Turns a list of Functors into a Functor of a list, applying
	     * a mapping function to the elements of the list along the way.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @see R.commute
	     * @sig Functor f => (f a -> f b) -> (x -> f x) -> [f a] -> f [b]
	     * @param {Function} fn The transformation function
	     * @param {Function} of A function that returns the data type to return
	     * @param {Array} list An array of functors of the same type
	     * @return {*}
	     * @example
	     *
	     *      R.commuteMap(R.map(R.add(10)), R.of, [[1], [2, 3]]);   //=> [[11, 12], [11, 13]]
	     *      R.commuteMap(R.map(R.add(10)), R.of, [[1, 2], [3]]);   //=> [[11, 13], [12, 13]]
	     *      R.commuteMap(R.map(R.add(10)), R.of, [[1], [2], [3]]); //=> [[11, 12, 13]]
	     *      R.commuteMap(R.map(R.add(10)), Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([11, 12, 13])
	     *      R.commuteMap(R.map(R.add(10)), Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
	     */
	    var commuteMap = _curry3(function commuteMap(fn, of, list) {
	        function consF(acc, ftor) {
	            return ap(map(append, fn(ftor)), acc);
	        }
	        return _reduce(consF, of([]), list);
	    });
	
	    /**
	     * Returns a curried equivalent of the provided function. The curried
	     * function has two unusual capabilities. First, its arguments needn't
	     * be provided one at a time. If `f` is a ternary function and `g` is
	     * `R.curry(f)`, the following are equivalent:
	     *
	     *   - `g(1)(2)(3)`
	     *   - `g(1)(2, 3)`
	     *   - `g(1, 2)(3)`
	     *   - `g(1, 2, 3)`
	     *
	     * Secondly, the special placeholder value `R.__` may be used to specify
	     * "gaps", allowing partial application of any combination of arguments,
	     * regardless of their positions. If `g` is as above and `_` is `R.__`,
	     * the following are equivalent:
	     *
	     *   - `g(1, 2, 3)`
	     *   - `g(_, 2, 3)(1)`
	     *   - `g(_, _, 3)(1)(2)`
	     *   - `g(_, _, 3)(1, 2)`
	     *   - `g(_, 2)(1)(3)`
	     *   - `g(_, 2)(1, 3)`
	     *   - `g(_, 2)(_, 3)(1)`
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (* -> a) -> (* -> a)
	     * @param {Function} fn The function to curry.
	     * @return {Function} A new, curried function.
	     * @see R.curryN
	     * @example
	     *
	     *      var addFourNumbers = function(a, b, c, d) {
	     *        return a + b + c + d;
	     *      };
	     *
	     *      var curriedAddFourNumbers = R.curry(addFourNumbers);
	     *      var f = curriedAddFourNumbers(1, 2);
	     *      var g = f(3);
	     *      g(4); //=> 10
	     */
	    var curry = _curry1(function curry(fn) {
	        return curryN(fn.length, fn);
	    });
	
	    /**
	     * Returns a list containing all but the first `n` elements of the given `list`.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * Dispatches to its second argument's `slice` method if present. As a
	     * result, one may replace `[a]` with `String` in the type signature.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig Number -> [a] -> [a]
	     * @param {Number} n The number of elements of `xs` to skip.
	     * @param {Array} xs The collection to consider.
	     * @return {Array}
	     * @example
	     *
	     *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
	     *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
	     *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
	     *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
	     *      R.drop(3, 'ramda');               //=> 'da'
	     */
	    var drop = _curry2(_dispatchable('drop', _xdrop, function drop(n, xs) {
	        return slice(Math.max(0, n), Infinity, xs);
	    }));
	
	    /**
	     * Returns a new list without any consecutively repeating elements. Equality is
	     * determined by applying the supplied predicate two consecutive elements.
	     * The first element in a series of equal element is the one being preserved.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig (a, a -> Boolean) -> [a] -> [a]
	     * @param {Function} pred A predicate used to test whether two items are equal.
	     * @param {Array} list The array to consider.
	     * @return {Array} `list` without repeating elements.
	     * @example
	     *
	     *      function lengthEq(x, y) { return Math.abs(x) === Math.abs(y); };
	     *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
	     *      R.dropRepeatsWith(lengthEq, l); //=> [1, 3, 4, -5, 3]
	     */
	    var dropRepeatsWith = _curry2(_dispatchable('dropRepeatsWith', _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
	        var result = [];
	        var idx = 1;
	        var len = list.length;
	        if (len !== 0) {
	            result[0] = list[0];
	            while (idx < len) {
	                if (!pred(last(result), list[idx])) {
	                    result[result.length] = list[idx];
	                }
	                idx += 1;
	            }
	        }
	        return result;
	    }));
	
	    /**
	     * Performs a deep test on whether two items are equal.
	     * Equality implies the two items are semmatically equivalent.
	     * Cyclic structures are handled as expected
	     * @see R.equals
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig a -> b -> Boolean
	     * @param {*} a
	     * @param {*} b
	     * @return {Boolean}
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      var o = {};
	     *      R.eqDeep(o, o); //=> true
	     *      R.eqDeep(o, {}); //=> true
	     *      R.eqDeep(1, 1); //=> true
	     *      R.eqDeep(1, '1'); //=> false
	     *
	     *      var a = {}; a.v = a;
	     *      var b = {}; b.v = b;
	     *      R.eqDeep(a, b); //=> true
	     */
	    var eqDeep = equals;
	
	    /**
	     * Reports whether two objects have the same value, in `R.equals` terms,
	     * for the specified property. Useful as a curried predicate.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig k -> {k: v} -> {k: v} -> Boolean
	     * @param {String} prop The name of the property to compare
	     * @param {Object} obj1
	     * @param {Object} obj2
	     * @return {Boolean}
	     *
	     * @example
	     *
	     *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
	     *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
	     *      R.eqProps('a', o1, o2); //=> false
	     *      R.eqProps('c', o1, o2); //=> true
	     */
	    var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
	        return equals(obj1[prop], obj2[prop]);
	    });
	
	    /**
	     * Returns a new function much like the supplied one, except that the first two arguments'
	     * order is reversed.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
	     * @param {Function} fn The function to invoke with its first two parameters reversed.
	     * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
	     * @example
	     *
	     *      var mergeThree = function(a, b, c) {
	     *        return ([]).concat(a, b, c);
	     *      };
	     *
	     *      mergeThree(1, 2, 3); //=> [1, 2, 3]
	     *
	     *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
	     */
	    var flip = _curry1(function flip(fn) {
	        return curry(function (a, b) {
	            var args = _slice(arguments);
	            args[0] = b;
	            args[1] = a;
	            return fn.apply(this, args);
	        });
	    });
	
	    /**
	     * Returns the position of the first occurrence of an item in an array,
	     * or -1 if the item is not included in the array. `R.equals` is used to
	     * determine equality.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> [a] -> Number
	     * @param {*} target The item to find.
	     * @param {Array} xs The array to search in.
	     * @return {Number} the index of the target, or -1 if the target is not found.
	     *
	     * @example
	     *
	     *      R.indexOf(3, [1,2,3,4]); //=> 2
	     *      R.indexOf(10, [1,2,3,4]); //=> -1
	     */
	    var indexOf = _curry2(function indexOf(target, xs) {
	        return _hasMethod('indexOf', xs) ? xs.indexOf(target) : _indexOf(xs, target);
	    });
	
	    /**
	     * Returns all but the last element of a list.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} A new array containing all but the last element of the input list, or an
	     *         empty list if the input list is empty.
	     * @example
	     *
	     *      R.init(['fi', 'fo', 'fum']); //=> ['fi', 'fo']
	     */
	    var init = slice(0, -1);
	
	    /**
	     * Transforms the items of the list with the transducer and appends the transformed items to
	     * the accumulator using an appropriate iterator function based on the accumulator type.
	     *
	     * The accumulator can be an array, string, object or a transformer. Iterated items will
	     * be appended to arrays and concatenated to strings. Objects will be merged directly or 2-item
	     * arrays will be merged as key, value pairs.
	     *
	     * The accumulator can also be a transformer object that provides a 2-arity reducing iterator
	     * function, step, 0-arity initial value function, init, and 1-arity result extraction function
	     * result. The step function is used as the iterator function in reduce. The result function is
	     * used to convert the final accumulator into the return type and in most cases is R.identity.
	     * The init function is used to provide the initial accumulator.
	     *
	     * The iteration is performed with R.reduce after initializing the transducer.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> (b -> b) -> [c] -> a
	     * @param {*} acc The initial accumulator value.
	     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
	     * @param {Array} list The list to iterate over.
	     * @return {*} The final, accumulated value.
	     * @example
	     *
	     *      var numbers = [1, 2, 3, 4];
	     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
	     *
	     *      R.into([], transducer, numbers); //=> [2, 3]
	     *
	     *      var intoArray = R.into([]);
	     *      intoArray(transducer, numbers); //=> [2, 3]
	     */
	    var into = _curry3(function into(acc, xf, list) {
	        return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), acc, list);
	    });
	
	    /**
	     * Returns the result of applying `obj[methodName]` to `args`.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig String -> [*] -> Object -> *
	     * @param {String} methodName
	     * @param {Array} args
	     * @param {Object} obj
	     * @return {*}
	     * @deprecated since v0.15.0
	     * @example
	     *
	     *      //  toBinary :: Number -> String
	     *      var toBinary = R.invoke('toString', [2])
	     *
	     *      toBinary(42); //=> '101010'
	     *      toBinary(63); //=> '111111'
	     */
	    var invoke = curry(function invoke(methodName, args, obj) {
	        return obj[methodName].apply(obj, args);
	    });
	
	    /**
	     * Returns `true` if all elements are unique, in `R.equals` terms,
	     * otherwise `false`.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> Boolean
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if all elements are unique, else `false`.
	     * @example
	     *
	     *      R.isSet(['1', 1]); //=> true
	     *      R.isSet([1, 1]);   //=> false
	     *      R.isSet([[42], [42]]); //=> false
	     */
	    var isSet = _curry1(function isSet(list) {
	        var len = list.length;
	        var idx = 0;
	        while (idx < len) {
	            if (_indexOf(list, list[idx], idx + 1) >= 0) {
	                return false;
	            }
	            idx += 1;
	        }
	        return true;
	    });
	
	    /**
	     * Returns the position of the last occurrence of an item in
	     * an array, or -1 if the item is not included in the array.
	     * `R.equals` is used to determine equality.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> [a] -> Number
	     * @param {*} target The item to find.
	     * @param {Array} xs The array to search in.
	     * @return {Number} the index of the target, or -1 if the target is not found.
	     *
	     * @example
	     *
	     *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
	     *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
	     */
	    var lastIndexOf = _curry2(function lastIndexOf(target, xs) {
	        return _hasMethod('lastIndexOf', xs) ? xs.lastIndexOf(target) : _lastIndexOf(xs, target);
	    });
	
	    /**
	     * "lifts" a function to be the specified arity, so that it may "map over" that many
	     * lists (or other Functors).
	     *
	     * @func
	     * @memberOf R
	     * @see R.lift
	     * @category Function
	     * @sig Number -> (*... -> *) -> ([*]... -> [*])
	     * @param {Function} fn The function to lift into higher context
	     * @return {Function} The function `fn` applicable to mappable objects.
	     * @example
	     *
	     *      var madd3 = R.liftN(3, R.curryN(3, function() {
	     *        return R.reduce(R.add, 0, arguments);
	     *      }));
	     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	     */
	    var liftN = _curry2(function liftN(arity, fn) {
	        var lifted = curryN(arity, fn);
	        return curryN(arity, function () {
	            return _reduce(ap, map(lifted, arguments[0]), _slice(arguments, 1));
	        });
	    });
	
	    /**
	     * Returns the mean of the given list of numbers.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list
	     * @return {Number}
	     * @example
	     *
	     *      R.mean([2, 7, 9]); //=> 6
	     *      R.mean([]); //=> NaN
	     */
	    var mean = _curry1(function mean(list) {
	        return sum(list) / list.length;
	    });
	
	    /**
	     * Returns the median of the given list of numbers.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list
	     * @return {Number}
	     * @example
	     *
	     *      R.median([2, 9, 7]); //=> 7
	     *      R.median([7, 2, 10, 9]); //=> 8
	     *      R.median([]); //=> NaN
	     */
	    var median = _curry1(function median(list) {
	        var len = list.length;
	        if (len === 0) {
	            return NaN;
	        }
	        var width = 2 - len % 2;
	        var idx = (len - width) / 2;
	        return mean(_slice(list).sort(function (a, b) {
	            return a < b ? -1 : a > b ? 1 : 0;
	        }).slice(idx, idx + width));
	    });
	
	    /**
	     * Merges a list of objects together into one object.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [{k: v}] -> {k: v}
	     * @param {Array} list An array of objects
	     * @return {Object} A merged object.
	     * @see R.reduce
	     * @example
	     *
	     *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
	     *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
	     */
	    var mergeAll = _curry1(function mergeAll(list) {
	        return reduce(merge, {}, list);
	    });
	
	    /**
	     * Returns a partial copy of an object omitting the keys specified.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @sig [String] -> {String: *} -> {String: *}
	     * @param {Array} names an array of String property names to omit from the new object
	     * @param {Object} obj The object to copy from
	     * @return {Object} A new object with properties from `names` not on it.
	     * @example
	     *
	     *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
	     */
	    var omit = _curry2(function omit(names, obj) {
	        var result = {};
	        for (var prop in obj) {
	            if (_indexOf(names, prop) < 0) {
	                result[prop] = obj[prop];
	            }
	        }
	        return result;
	    });
	
	    /**
	     * Accepts as its arguments a function and any number of values and returns a function that,
	     * when invoked, calls the original function with all of the values prepended to the
	     * original function's arguments list. In some libraries this function is named `applyLeft`.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (a -> b -> ... -> i -> j -> ... -> m -> n) -> a -> b-> ... -> i -> (j -> ... -> m -> n)
	     * @param {Function} fn The function to invoke.
	     * @param {...*} [args] Arguments to prepend to `fn` when the returned function is invoked.
	     * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn`
	     *         with `args` prepended to `fn`'s arguments list.
	     * @example
	     *
	     *      var multiply = function(a, b) { return a * b; };
	     *      var double = R.partial(multiply, 2);
	     *      double(2); //=> 4
	     *
	     *      var greet = function(salutation, title, firstName, lastName) {
	     *        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
	     *      };
	     *      var sayHello = R.partial(greet, 'Hello');
	     *      var sayHelloToMs = R.partial(sayHello, 'Ms.');
	     *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
	     */
	    var partial = curry(_createPartialApplicator(_concat));
	
	    /**
	     * Accepts as its arguments a function and any number of values and returns a function that,
	     * when invoked, calls the original function with all of the values appended to the original
	     * function's arguments list.
	     *
	     * Note that `partialRight` is the opposite of `partial`: `partialRight` fills `fn`'s arguments
	     * from the right to the left.  In some libraries this function is named `applyRight`.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (a -> b-> ... -> i -> j -> ... -> m -> n) -> j -> ... -> m -> n -> (a -> b-> ... -> i)
	     * @param {Function} fn The function to invoke.
	     * @param {...*} [args] Arguments to append to `fn` when the returned function is invoked.
	     * @return {Function} A new function wrapping `fn`. When invoked, it will call `fn` with
	     *         `args` appended to `fn`'s arguments list.
	     * @example
	     *
	     *      var greet = function(salutation, title, firstName, lastName) {
	     *        return salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
	     *      };
	     *      var greetMsJaneJones = R.partialRight(greet, 'Ms.', 'Jane', 'Jones');
	     *
	     *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
	     */
	    var partialRight = curry(_createPartialApplicator(flip(_concat)));
	
	    /**
	     * Returns a new list by plucking the same named property off all objects in the list supplied.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig k -> [{k: v}] -> [v]
	     * @param {Number|String} key The key name to pluck off of each object.
	     * @param {Array} list The array to consider.
	     * @return {Array} The list of values for the given key.
	     * @example
	     *
	     *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
	     *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
	     */
	    var pluck = _curry2(_pluck);
	
	    /**
	     * Multiplies together all the elements of a list.
	     *
	     * @func
	     * @memberOf R
	     * @category Math
	     * @sig [Number] -> Number
	     * @param {Array} list An array of numbers
	     * @return {Number} The product of all the numbers in the list.
	     * @see R.reduce
	     * @example
	     *
	     *      R.product([2,4,6,8,100,1]); //=> 38400
	     */
	    var product = reduce(_multiply, 1);
	
	    /**
	     * Returns the string representation of the given value. `eval`'ing the output
	     * should result in a value equivalent to the input value. Many of the built-in
	     * `toString` methods do not satisfy this requirement.
	     *
	     * If the given value is an `[object Object]` with a `toString` method other
	     * than `Object.prototype.toString`, this method is invoked with no arguments
	     * to produce the return value. This means user-defined constructor functions
	     * can provide a suitable `toString` method. For example:
	     *
	     *     function Point(x, y) {
	     *       this.x = x;
	     *       this.y = y;
	     *     }
	     *
	     *     Point.prototype.toString = function() {
	     *       return 'new Point(' + this.x + ', ' + this.y + ')';
	     *     };
	     *
	     *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
	     *
	     * @func
	     * @memberOf R
	     * @category String
	     * @sig * -> String
	     * @param {*} val
	     * @return {String}
	     * @example
	     *
	     *      R.toString(42); //=> '42'
	     *      R.toString('abc'); //=> '"abc"'
	     *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
	     *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
	     *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
	     */
	    var toString = _curry1(function toString(val) {
	        return _toString(val, []);
	    });
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of the
	     * elements of each list.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig [a] -> [a] -> [a]
	     * @param {Array} as The first list.
	     * @param {Array} bs The second list.
	     * @return {Array} The first and second lists concatenated, with
	     *         duplicates removed.
	     * @example
	     *
	     *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
	     */
	    var union = _curry2(compose(uniq, _concat));
	
	    /**
	     * Accepts a function `fn` and any number of transformer functions and returns a new
	     * function. When the new function is invoked, it calls the function `fn` with parameters
	     * consisting of the result of calling each supplied handler on successive arguments to the
	     * new function.
	     *
	     * If more arguments are passed to the returned function than transformer functions, those
	     * arguments are passed directly to `fn` as additional parameters. If you expect additional
	     * arguments that don't need to be transformed, although you can ignore them, it's best to
	     * pass an identity function so that the new function reports the correct arity.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (x1 -> x2 -> ... -> z) -> ((a -> x1), (b -> x2), ...) -> (a -> b -> ... -> z)
	     * @param {Function} fn The function to wrap.
	     * @param {...Function} transformers A variable number of transformer functions
	     * @return {Function} The wrapped function.
	     * @example
	     *
	     *      // Example 1:
	     *
	     *      // Number -> [Person] -> [Person]
	     *      var byAge = R.useWith(R.filter, R.propEq('age'), R.identity);
	     *
	     *      var kids = [
	     *        {name: 'Abbie', age: 6},
	     *        {name: 'Brian', age: 5},
	     *        {name: 'Chris', age: 6},
	     *        {name: 'David', age: 4},
	     *        {name: 'Ellie', age: 5}
	     *      ];
	     *
	     *      byAge(5, kids); //=> [{name: 'Brian', age: 5}, {name: 'Ellie', age: 5}]
	     *
	     *      // Example 2:
	     *
	     *      var double = function(y) { return y * 2; };
	     *      var square = function(x) { return x * x; };
	     *      var add = function(a, b) { return a + b; };
	     *      // Adds any number of arguments together
	     *      var addAll = function() {
	     *        return R.reduce(add, 0, arguments);
	     *      };
	     *
	     *      // Basic example
	     *      var addDoubleAndSquare = R.useWith(addAll, double, square);
	     *
	     *      //≅ addAll(double(10), square(5));
	     *      addDoubleAndSquare(10, 5); //=> 45
	     *
	     *      // Example of passing more arguments than transformers
	     *      //≅ addAll(double(10), square(5), 100);
	     *      addDoubleAndSquare(10, 5, 100); //=> 145
	     *
	     *      // If there are extra _expected_ arguments that don't need to be transformed, although
	     *      // you can ignore them, it might be best to pass in the identity function so that the new
	     *      // function correctly reports arity.
	     *      var addDoubleAndSquareWithExtraParams = R.useWith(addAll, double, square, R.identity);
	     *      // addDoubleAndSquareWithExtraParams.length //=> 3
	     *      //≅ addAll(double(10), square(5), R.identity(100));
	     *      addDoubleAndSquare(10, 5, 100); //=> 145
	     */
	    /*, transformers */
	    var useWith = curry(function useWith(fn) {
	        var transformers = _slice(arguments, 1);
	        var tlen = transformers.length;
	        return curry(arity(tlen, function () {
	            var args = [], idx = 0;
	            while (idx < tlen) {
	                args[idx] = transformers[idx](arguments[idx]);
	                idx += 1;
	            }
	            return fn.apply(this, args.concat(_slice(arguments, tlen)));
	        }));
	    });
	
	    var _contains = function _contains(a, list) {
	        return _indexOf(list, a) >= 0;
	    };
	
	    /**
	     * Given a list of predicates, returns a new predicate that will be true exactly when all of them are.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	     * @param {Array} list An array of predicate functions
	     * @param {*} optional Any arguments to pass into the predicates
	     * @return {Function} a function that applies its arguments to each of
	     *         the predicates, returning `true` if all are satisfied.
	     * @example
	     *
	     *      var gt10 = function(x) { return x > 10; };
	     *      var even = function(x) { return x % 2 === 0};
	     *      var f = R.allPass([gt10, even]);
	     *      f(11); //=> false
	     *      f(12); //=> true
	     */
	    var allPass = curry(_predicateWrap(_all));
	
	    /**
	     * Given a list of predicates returns a new predicate that will be true exactly when any one of them is.
	     *
	     * @func
	     * @memberOf R
	     * @category Logic
	     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
	     * @param {Array} list An array of predicate functions
	     * @param {*} optional Any arguments to pass into the predicates
	     * @return {Function} A function that applies its arguments to each of the predicates, returning
	     *         `true` if all are satisfied.
	     * @example
	     *
	     *      var gt10 = function(x) { return x > 10; };
	     *      var even = function(x) { return x % 2 === 0};
	     *      var f = R.anyPass([gt10, even]);
	     *      f(11); //=> true
	     *      f(8); //=> true
	     *      f(9); //=> false
	     */
	    var anyPass = curry(_predicateWrap(_any));
	
	    /**
	     * Returns the result of calling its first argument with the remaining
	     * arguments. This is occasionally useful as a converging function for
	     * `R.converge`: the left branch can produce a function while the right
	     * branch produces a value to be passed to that function as an argument.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (*... -> a),*... -> a
	     * @param {Function} fn The function to apply to the remaining arguments.
	     * @param {...*} args Any number of positional arguments.
	     * @return {*}
	     * @example
	     *
	     *      var indentN = R.pipe(R.times(R.always(' ')),
	     *                           R.join(''),
	     *                           R.replace(/^(?!$)/gm));
	     *
	     *      var format = R.converge(R.call,
	     *                              R.pipe(R.prop('indent'), indentN),
	     *                              R.prop('value'));
	     *
	     *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
	     */
	    var call = curry(function call(fn) {
	        return fn.apply(this, _slice(arguments, 1));
	    });
	
	    /**
	     * Turns a list of Functors into a Functor of a list.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @see R.commuteMap
	     * @sig Functor f => (x -> f x) -> [f a] -> f [a]
	     * @param {Function} of A function that returns the data type to return
	     * @param {Array} list An array of functors of the same type
	     * @return {*}
	     * @example
	     *
	     *      R.commute(R.of, [[1], [2, 3]]);   //=> [[1, 2], [1, 3]]
	     *      R.commute(R.of, [[1, 2], [3]]);   //=> [[1, 3], [2, 3]]
	     *      R.commute(R.of, [[1], [2], [3]]); //=> [[1, 2, 3]]
	     *      R.commute(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
	     *      R.commute(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
	     */
	    var commute = commuteMap(map(identity));
	
	    /**
	     * Wraps a constructor function inside a curried function that can be called with the same
	     * arguments and returns the same type. The arity of the function returned is specified
	     * to allow using variadic constructor functions.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig Number -> (* -> {*}) -> (* -> {*})
	     * @param {Number} n The arity of the constructor function.
	     * @param {Function} Fn The constructor function to wrap.
	     * @return {Function} A wrapped, curried constructor function.
	     * @example
	     *
	     *      // Variadic constructor function
	     *      var Widget = function() {
	     *        this.children = Array.prototype.slice.call(arguments);
	     *        // ...
	     *      };
	     *      Widget.prototype = {
	     *        // ...
	     *      };
	     *      var allConfigs = [
	     *        // ...
	     *      ];
	     *      R.map(R.constructN(1, Widget), allConfigs); // a list of Widgets
	     */
	    var constructN = _curry2(function constructN(n, Fn) {
	        if (n > 10) {
	            throw new Error('Constructor with greater than ten arguments');
	        }
	        if (n === 0) {
	            return function () {
	                return new Fn();
	            };
	        }
	        return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
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
	
	    /**
	     * Returns `true` if the specified value is equal, in `R.equals` terms,
	     * to at least one element of the given list; `false` otherwise.
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig a -> [a] -> Boolean
	     * @param {Object} a The item to compare against.
	     * @param {Array} list The array to consider.
	     * @return {Boolean} `true` if the item is in the list, `false` otherwise.
	     *
	     * @example
	     *
	     *      R.contains(3, [1, 2, 3]); //=> true
	     *      R.contains(4, [1, 2, 3]); //=> false
	     *      R.contains([42], [[42]]); //=> true
	     */
	    var contains = _curry2(_contains);
	
	    /**
	     * Accepts at least three functions and returns a new function. When invoked, this new
	     * function will invoke the first function, `after`, passing as its arguments the
	     * results of invoking the subsequent functions with whatever arguments are passed to
	     * the new function.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (x1 -> x2 -> ... -> z) -> ((a -> b -> ... -> x1), (a -> b -> ... -> x2), ...) -> (a -> b -> ... -> z)
	     * @param {Function} after A function. `after` will be invoked with the return values of
	     *        `fn1` and `fn2` as its arguments.
	     * @param {...Function} functions A variable number of functions.
	     * @return {Function} A new function.
	     * @example
	     *
	     *      var add = function(a, b) { return a + b; };
	     *      var multiply = function(a, b) { return a * b; };
	     *      var subtract = function(a, b) { return a - b; };
	     *
	     *      //≅ multiply( add(1, 2), subtract(1, 2) );
	     *      R.converge(multiply, add, subtract)(1, 2); //=> -3
	     *
	     *      var add3 = function(a, b, c) { return a + b + c; };
	     *      R.converge(add3, multiply, add, subtract)(1, 2); //=> 4
	     */
	    var converge = curryN(3, function (after) {
	        var fns = _slice(arguments, 1);
	        return curryN(max(pluck('length', fns)), function () {
	            var args = arguments;
	            var context = this;
	            return after.apply(context, _map(function (fn) {
	                return fn.apply(context, args);
	            }, fns));
	        });
	    });
	
	    /**
	     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig [a] -> [a] -> [a]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @return {Array} The elements in `list1` that are not in `list2`.
	     * @see R.differenceWith
	     * @example
	     *
	     *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
	     *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
	     */
	    var difference = _curry2(function difference(first, second) {
	        var out = [];
	        var idx = 0;
	        var firstLen = first.length;
	        while (idx < firstLen) {
	            if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
	                out[out.length] = first[idx];
	            }
	            idx += 1;
	        }
	        return out;
	    });
	
	    /**
	     * Returns a new list without any consecutively repeating elements.
	     * `R.equals` is used to determine equality.
	     *
	     * Acts as a transducer if a transformer is given in list position.
	     * @see R.transduce
	     *
	     * @func
	     * @memberOf R
	     * @category List
	     * @sig [a] -> [a]
	     * @param {Array} list The array to consider.
	     * @return {Array} `list` without repeating elements.
	     * @example
	     *
	     *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
	     */
	    var dropRepeats = _curry1(_dispatchable('dropRepeats', _xdropRepeatsWith(equals), dropRepeatsWith(equals)));
	
	    /**
	     * Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
	     *
	     * @func
	     * @memberOf R
	     * @category Relation
	     * @sig [a] -> [a] -> [a]
	     * @param {Array} list1 The first list.
	     * @param {Array} list2 The second list.
	     * @see R.intersectionWith
	     * @return {Array} The list of elements found in both `list1` and `list2`.
	     * @example
	     *
	     *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
	     */
	    var intersection = _curry2(function intersection(list1, list2) {
	        return uniq(_filter(flip(_contains)(list1), list2));
	    });
	
	    /**
	     * "lifts" a function of arity > 1 so that it may "map over" an Array or
	     * other Functor.
	     *
	     * @func
	     * @memberOf R
	     * @see R.liftN
	     * @category Function
	     * @sig (*... -> *) -> ([*]... -> [*])
	     * @param {Function} fn The function to lift into higher context
	     * @return {Function} The function `fn` applicable to mappable objects.
	     * @example
	     *
	     *      var madd3 = R.lift(R.curry(function(a, b, c) {
	     *        return a + b + c;
	     *      }));
	     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
	     *
	     *      var madd5 = R.lift(R.curry(function(a, b, c, d, e) {
	     *        return a + b + c + d + e;
	     *      }));
	     *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
	     */
	    var lift = _curry1(function lift(fn) {
	        return liftN(fn.length, fn);
	    });
	
	    /**
	     * Creates a new function that, when invoked, caches the result of calling `fn` for a given
	     * argument set and returns the result. Subsequent calls to the memoized `fn` with the same
	     * argument set will not result in an additional call to `fn`; instead, the cached result
	     * for that set of arguments will be returned.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (*... -> a) -> (*... -> a)
	     * @param {Function} fn The function to memoize.
	     * @return {Function} Memoized version of `fn`.
	     * @example
	     *
	     *      var count = 0;
	     *      var factorial = R.memoize(function(n) {
	     *        count += 1;
	     *        return R.product(R.range(1, n + 1));
	     *      });
	     *      factorial(5); //=> 120
	     *      factorial(5); //=> 120
	     *      factorial(5); //=> 120
	     *      count; //=> 1
	     */
	    var memoize = _curry1(function memoize(fn) {
	        var cache = {};
	        return function () {
	            var key = toString(arguments);
	            if (!_has(key, cache)) {
	                cache[key] = fn.apply(this, arguments);
	            }
	            return cache[key];
	        };
	    });
	
	    /**
	     * Reasonable analog to SQL `select` statement.
	     *
	     * @func
	     * @memberOf R
	     * @category Object
	     * @category Relation
	     * @sig [k] -> [{k: v}] -> [{k: v}]
	     * @param {Array} props The property names to project
	     * @param {Array} objs The objects to query
	     * @return {Array} An array of objects with just the `props` properties.
	     * @example
	     *
	     *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
	     *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
	     *      var kids = [abby, fred];
	     *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
	     */
	    // passing `identity` gives correct arity
	    var project = useWith(_map, pickAll, identity);
	
	    /**
	     * Wraps a constructor function inside a curried function that can be called with the same
	     * arguments and returns the same type.
	     *
	     * @func
	     * @memberOf R
	     * @category Function
	     * @sig (* -> {*}) -> (* -> {*})
	     * @param {Function} Fn The constructor function to wrap.
	     * @return {Function} A wrapped, curried constructor function.
	     * @example
	     *
	     *      // Constructor function
	     *      var Widget = function(config) {
	     *        // ...
	     *      };
	     *      Widget.prototype = {
	     *        // ...
	     *      };
	     *      var allConfigs = [
	     *        // ...
	     *      ];
	     *      R.map(R.construct(Widget), allConfigs); // a list of Widgets
	     */
	    var construct = _curry1(function construct(Fn) {
	        return constructN(Fn.length, Fn);
	    });
	
	    var R = {
	        F: F,
	        T: T,
	        __: __,
	        add: add,
	        addIndex: addIndex,
	        adjust: adjust,
	        all: all,
	        allPass: allPass,
	        always: always,
	        and: and,
	        any: any,
	        anyPass: anyPass,
	        ap: ap,
	        aperture: aperture,
	        append: append,
	        apply: apply,
	        arity: arity,
	        assoc: assoc,
	        assocPath: assocPath,
	        binary: binary,
	        bind: bind,
	        both: both,
	        call: call,
	        chain: chain,
	        clone: clone,
	        commute: commute,
	        commuteMap: commuteMap,
	        comparator: comparator,
	        complement: complement,
	        compose: compose,
	        composeL: composeL,
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
	        dissocPath: dissocPath,
	        divide: divide,
	        drop: drop,
	        dropRepeats: dropRepeats,
	        dropRepeatsWith: dropRepeatsWith,
	        dropWhile: dropWhile,
	        either: either,
	        empty: empty,
	        eq: eq,
	        eqDeep: eqDeep,
	        eqProps: eqProps,
	        equals: equals,
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
	        functions: functions,
	        functionsIn: functionsIn,
	        groupBy: groupBy,
	        gt: gt,
	        gte: gte,
	        has: has,
	        hasIn: hasIn,
	        head: head,
	        identical: identical,
	        identity: identity,
	        ifElse: ifElse,
	        inc: inc,
	        indexOf: indexOf,
	        init: init,
	        insert: insert,
	        insertAll: insertAll,
	        intersection: intersection,
	        intersectionWith: intersectionWith,
	        intersperse: intersperse,
	        into: into,
	        invert: invert,
	        invertObj: invertObj,
	        invoke: invoke,
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
	        lensIndex: lensIndex,
	        lensOn: lensOn,
	        lensProp: lensProp,
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
	        mean: mean,
	        median: median,
	        memoize: memoize,
	        merge: merge,
	        mergeAll: mergeAll,
	        min: min,
	        minBy: minBy,
	        modulo: modulo,
	        multiply: multiply,
	        nAry: nAry,
	        negate: negate,
	        none: none,
	        not: not,
	        nth: nth,
	        nthArg: nthArg,
	        nthChar: nthChar,
	        nthCharCode: nthCharCode,
	        of: of,
	        omit: omit,
	        once: once,
	        or: or,
	        partial: partial,
	        partialRight: partialRight,
	        partition: partition,
	        path: path,
	        pathEq: pathEq,
	        pick: pick,
	        pickAll: pickAll,
	        pickBy: pickBy,
	        pipe: pipe,
	        pipeL: pipeL,
	        pipeP: pipeP,
	        pluck: pluck,
	        prepend: prepend,
	        product: product,
	        project: project,
	        prop: prop,
	        propEq: propEq,
	        propOr: propOr,
	        props: props,
	        range: range,
	        reduce: reduce,
	        reduceIndexed: reduceIndexed,
	        reduceRight: reduceRight,
	        reduceRightIndexed: reduceRightIndexed,
	        reduced: reduced,
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
	        test: test,
	        times: times,
	        toLower: toLower,
	        toPairs: toPairs,
	        toPairsIn: toPairsIn,
	        toString: toString,
	        toUpper: toUpper,
	        transduce: transduce,
	        trim: trim,
	        type: type,
	        unapply: unapply,
	        unary: unary,
	        uncurryN: uncurryN,
	        unfold: unfold,
	        union: union,
	        unionWith: unionWith,
	        uniq: uniq,
	        uniqWith: uniqWith,
	        unnest: unnest,
	        update: update,
	        useWith: useWith,
	        values: values,
	        valuesIn: valuesIn,
	        where: where,
	        whereEq: whereEq,
	        wrap: wrap,
	        xprod: xprod,
	        zip: zip,
	        zipObj: zipObj,
	        zipWith: zipWith
	    };
	
	  /* TEST_ENTRY_POINT */
	
	  if (true) {
	    module.exports = R;
	  } else if (typeof define === 'function' && define.amd) {
	    define(function() { return R; });
	  } else {
	    this.R = R;
	  }
	
	}.call(this));


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var _curry2 = __webpack_require__(88);
	var _curryN = __webpack_require__(250);
	var arity = __webpack_require__(87);
	
	
	/**
	 * Returns a curried equivalent of the provided function, with the
	 * specified arity. The curried function has two unusual capabilities.
	 * First, its arguments needn't be provided one at a time. If `g` is
	 * `R.curryN(3, f)`, the following are equivalent:
	 *
	 *   - `g(1)(2)(3)`
	 *   - `g(1)(2, 3)`
	 *   - `g(1, 2)(3)`
	 *   - `g(1, 2, 3)`
	 *
	 * Secondly, the special placeholder value `R.__` may be used to specify
	 * "gaps", allowing partial application of any combination of arguments,
	 * regardless of their positions. If `g` is as above and `_` is `R.__`,
	 * the following are equivalent:
	 *
	 *   - `g(1, 2, 3)`
	 *   - `g(_, 2, 3)(1)`
	 *   - `g(_, _, 3)(1)(2)`
	 *   - `g(_, _, 3)(1, 2)`
	 *   - `g(_, 2)(1)(3)`
	 *   - `g(_, 2)(1, 3)`
	 *   - `g(_, 2)(_, 3)(1)`
	 *
	 * @func
	 * @memberOf R
	 * @category Function
	 * @sig Number -> (* -> a) -> (* -> a)
	 * @param {Number} length The arity for the returned function.
	 * @param {Function} fn The function to curry.
	 * @return {Function} A new, curried function.
	 * @see R.curry
	 * @example
	 *
	 *      var addFourNumbers = function() {
	 *        return R.sum([].slice.call(arguments, 0, 4));
	 *      };
	 *
	 *      var curriedAddFourNumbers = R.curryN(4, addFourNumbers);
	 *      var f = curriedAddFourNumbers(1, 2);
	 *      var g = f(3);
	 *      g(4); //=> 10
	 */
	module.exports = _curry2(function curryN(length, fn) {
	  return arity(length, _curryN(length, [], fn));
	});


/***/ },
/* 249 */
/***/ function(module, exports) {

	/**
	 * Optimized internal two-arity curry function.
	 *
	 * @private
	 * @category Function
	 * @param {Function} fn The function to curry.
	 * @return {Function} The curried function.
	 */
	module.exports = function _curry1(fn) {
	  return function f1(a) {
	    if (arguments.length === 0) {
	      return f1;
	    } else if (a != null && a['@@functional/placeholder'] === true) {
	      return f1;
	    } else {
	      return fn(a);
	    }
	  };
	};


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var arity = __webpack_require__(87);
	
	
	/**
	 * Internal curryN function.
	 *
	 * @private
	 * @category Function
	 * @param {Number} length The arity of the curried function.
	 * @return {array} An array of arguments received thus far.
	 * @param {Function} fn The function to curry.
	 */
	module.exports = function _curryN(length, received, fn) {
	  return function() {
	    var combined = [];
	    var argsIdx = 0;
	    var left = length;
	    var combinedIdx = 0;
	    while (combinedIdx < received.length || argsIdx < arguments.length) {
	      var result;
	      if (combinedIdx < received.length &&
	          (received[combinedIdx] == null ||
	           received[combinedIdx]['@@functional/placeholder'] !== true ||
	           argsIdx >= arguments.length)) {
	        result = received[combinedIdx];
	      } else {
	        result = arguments[argsIdx];
	        argsIdx += 1;
	      }
	      combined[combinedIdx] = result;
	      if (result == null || result['@@functional/placeholder'] !== true) {
	        left -= 1;
	      }
	      combinedIdx += 1;
	    }
	    return left <= 0 ? fn.apply(this, combined) : arity(left, _curryN(length, combined, fn));
	  };
	};


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _createStore = __webpack_require__(89);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _utilsCombineReducers = __webpack_require__(254);
	
	var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);
	
	var _utilsBindActionCreators = __webpack_require__(253);
	
	var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);
	
	var _utilsApplyMiddleware = __webpack_require__(252);
	
	var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);
	
	var _utilsCompose = __webpack_require__(90);
	
	var _utilsCompose2 = _interopRequireDefault(_utilsCompose);
	
	exports.createStore = _createStore2['default'];
	exports.combineReducers = _utilsCombineReducers2['default'];
	exports.bindActionCreators = _utilsBindActionCreators2['default'];
	exports.applyMiddleware = _utilsApplyMiddleware2['default'];
	exports.compose = _utilsCompose2['default'];

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = applyMiddleware;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _compose = __webpack_require__(90);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  return function (next) {
	    return function (reducer, initialState) {
	      var store = next(reducer, initialState);
	      var _dispatch = store.dispatch;
	      var chain = [];
	
	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);
	
	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _mapValues = __webpack_require__(92);
	
	var _mapValues2 = _interopRequireDefault(_mapValues);
	
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}
	
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }
	
	  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }
	
	  return _mapValues2['default'](actionCreators, function (actionCreator) {
	    return bindActionCreator(actionCreator, dispatch);
	  });
	}
	
	module.exports = exports['default'];

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports['default'] = combineReducers;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _createStore = __webpack_require__(89);
	
	var _isPlainObject = __webpack_require__(91);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _mapValues = __webpack_require__(92);
	
	var _mapValues2 = _interopRequireDefault(_mapValues);
	
	var _pick = __webpack_require__(255);
	
	var _pick2 = _interopRequireDefault(_pick);
	
	/* eslint-disable no-console */
	
	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
	  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
	}
	
	function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
	  var reducerKeys = Object.keys(outputState);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
	
	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }
	
	  if (!_isPlainObject2['default'](inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }
	
	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return reducerKeys.indexOf(key) < 0;
	  });
	
	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}
	
	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }
	
	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}
	
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	
	function combineReducers(reducers) {
	  var finalReducers = _pick2['default'](reducers, function (val) {
	    return typeof val === 'function';
	  });
	  var sanityError;
	
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }
	
	  var defaultState = _mapValues2['default'](finalReducers, function () {
	    return undefined;
	  });
	
	  return function combination(state, action) {
	    if (state === undefined) state = defaultState;
	
	    if (sanityError) {
	      throw sanityError;
	    }
	
	    var hasChanged = false;
	    var finalState = _mapValues2['default'](finalReducers, function (reducer, key) {
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	      return nextStateForKey;
	    });
	
	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
	      if (warningMessage) {
	        console.error(warningMessage);
	      }
	    }
	
	    return hasChanged ? finalState : state;
	  };
	}
	
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)))

/***/ },
/* 255 */
/***/ function(module, exports) {

	/**
	 * Picks key-value pairs from an object where values satisfy a predicate.
	 *
	 * @param {Object} obj The object to pick from.
	 * @param {Function} fn The predicate the values must satisfy to be copied.
	 * @returns {Object} The object with the values that satisfied the predicate.
	 */
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = pick;
	
	function pick(obj, fn) {
	  return Object.keys(obj).reduce(function (result, key) {
	    if (fn(obj[key])) {
	      result[key] = obj[key];
	    }
	    return result;
	  }, {});
	}
	
	module.exports = exports["default"];

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	var naturalSelection = __webpack_require__(246);
	
	module.exports = function(element, value){
	    var canSet = naturalSelection(element) && element === document.activeElement;
	
	    if (canSet) {
	        var start = element.selectionStart,
	            end = element.selectionEnd;
	
	        element.value = value;
	        element.setSelectionRange(start, end);
	    } else {
	        element.value = value;
	    }
	};


/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(54);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(257)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(54, function() {
				var newContent = __webpack_require__(54);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 259 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = module.exports['default'] = SvgAttributeNamespace
	
	/*
	 * Supported SVG attribute namespaces by prefix.
	 *
	 * References:
	 * - http://www.w3.org/TR/SVGTiny12/attributeTable.html
	 * - http://www.w3.org/TR/SVG/attindex.html
	 * - http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-ElSetAttrNS
	 */
	
	var namespaces = module.exports.namespaces = {
	  ev: 'http://www.w3.org/2001/xml-events',
	  xlink: 'http://www.w3.org/1999/xlink',
	  xml: 'http://www.w3.org/XML/1998/namespace',
	  xmlns: 'http://www.w3.org/2000/xmlns/'
	}
	
	/**
	 * Get namespace of svg attribute
	 *
	 * @param {String} attributeName
	 * @return {String} namespace
	 */
	
	function SvgAttributeNamespace (attributeName) {
	  // if no prefix separator in attributeName, then no namespace
	  if (attributeName.indexOf(':') === -1) return null
	
	  // get prefix from attributeName
	  var prefix = attributeName.split(':', 1)[0]
	
	  // if prefix in supported prefixes
	  if (namespaces.hasOwnProperty(prefix)) {
	    // then namespace of prefix
	    return namespaces[prefix]
	  } else {
	    // else unsupported prefix
	    throw new Error('svg-attribute-namespace: prefix "' + prefix + '" is not supported by SVG.')
	  }
	}


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var curryN = __webpack_require__(248);
	
	function isString(s) { return typeof s === 'string'; }
	function isNumber(n) { return typeof n === 'number'; }
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	function isFunction(f) { return typeof f === 'function'; }
	var isArray = Array.isArray || function(a) { return 'length' in a; };
	
	var mapConstrToFn = curryN(2, function(group, constr) {
	  return constr === String    ? isString
	       : constr === Number    ? isNumber
	       : constr === Object    ? isObject
	       : constr === Array     ? isArray
	       : constr === Function  ? isFunction
	       : constr === undefined ? group
	                              : constr;
	});
	
	function Constructor(group, name, validators) {
	  validators = validators.map(mapConstrToFn(group));
	  var constructor = curryN(validators.length, function() {
	    var val = [], v, validator;
	    for (var i = 0; i < arguments.length; ++i) {
	      v = arguments[i];
	      validator = validators[i];
	      if ((typeof validator === 'function' && validator(v)) ||
	          (v !== undefined && v !== null && v.of === validator)) {
	        val[i] = arguments[i];
	      } else {
	        throw new TypeError('wrong value ' + v + ' passed to location ' + i + ' in ' + name);
	      }
	    }
	    val.of = group;
	    val.name = name;
	    return val;
	  });
	  return constructor;
	}
	
	function rawCase(type, cases, action, arg) {
	  if (type !== action.of) throw new TypeError('wrong type passed to case');
	  var name = action.name in cases ? action.name
	           : '_' in cases         ? '_'
	                                  : undefined;
	  if (name === undefined) {
	    throw new Error('unhandled value passed to case');
	  } else {
	    return cases[name].apply(undefined, arg !== undefined ? action.concat([arg]) : action);
	  }
	}
	
	var typeCase = curryN(3, rawCase);
	var caseOn = curryN(4, rawCase);
	
	function Type(desc) {
	  var obj = {};
	  for (var key in desc) {
	    obj[key] = Constructor(obj, key, desc[key]);
	  }
	  obj.case = typeCase(obj);
	  obj.caseOn = caseOn(obj);
	  return obj;
	}
	
	module.exports = Type;


/***/ },
/* 261 */
/***/ function(module, exports) {

	/*eslint-env browser*/
	
	var clientOverlay = document.createElement('div');
	clientOverlay.style.display = 'none';
	clientOverlay.style.background = '#fdd';
	clientOverlay.style.color = '#000';
	clientOverlay.style.whiteSpace = 'pre';
	clientOverlay.style.fontFamily = 'monospace';
	clientOverlay.style.position = 'fixed';
	clientOverlay.style.zIndex = 9999;
	clientOverlay.style.padding = '10px';
	clientOverlay.style.left = 0;
	clientOverlay.style.right = 0;
	clientOverlay.style.top = 0;
	clientOverlay.style.bottom = 0;
	clientOverlay.style.overflow = 'auto';
	
	if (document.body) {
	  document.body.appendChild(clientOverlay);
	}
	
	exports.showProblems =
	function showProblems(lines) {
	  clientOverlay.innerHTML = '';
	  clientOverlay.style.display = 'block';
	  lines.forEach(function(msg) {
	    var div = document.createElement('div');
	    div.textContent = msg;
	    clientOverlay.appendChild(div);
	  });
	};
	
	exports.clear =
	function clear() {
	  clientOverlay.innerHTML = '';
	  clientOverlay.style.display = 'none';
	};
	


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*eslint-env browser*/
	/*global __resourceQuery*/
	
	var options = {
	  path: "/__webpack_hmr",
	  timeout: 20 * 1000,
	  overlay: true,
	  reload: false,
	  log: true,
	  warn: true
	};
	if (false) {
	  var querystring = require('querystring');
	  var overrides = querystring.parse(__resourceQuery.slice(1));
	  if (overrides.path) options.path = overrides.path;
	  if (overrides.timeout) options.timeout = overrides.timeout;
	  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';
	  if (overrides.reload) options.reload = overrides.reload !== 'false';
	  if (overrides.noInfo && overrides.noInfo !== 'false') {
	    options.log = false;
	  }
	  if (overrides.quiet && overrides.quiet !== 'false') {
	    options.log = false;
	    options.warn = false;
	  }
	}
	
	if (typeof window.EventSource === 'undefined') {
	  console.warn(
	    "webpack-hot-middleware's client requires EventSource to work. " +
	    "You should include a polyfill if you want to support this browser: " +
	    "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools"
	  );
	} else {
	  connect();
	}
	
	function connect() {
	  var source = new window.EventSource(options.path);
	  var lastActivity = new Date();
	
	  source.onopen = handleOnline;
	  source.onmessage = handleMessage;
	  source.onerror = handleDisconnect;
	
	  var timer = setInterval(function() {
	    if ((new Date() - lastActivity) > options.timeout) {
	      handleDisconnect();
	    }
	  }, options.timeout / 2);
	
	  function handleOnline() {
	    if (options.log) console.log("[HMR] connected");
	    lastActivity = new Date();
	  }
	
	  function handleMessage(event) {
	    lastActivity = new Date();
	    if (event.data == "\uD83D\uDC93") {
	      return;
	    }
	    try {
	      processMessage(JSON.parse(event.data));
	    } catch (ex) {
	      if (options.warn) {
	        console.warn("Invalid HMR message: " + event.data + "\n" + ex);
	      }
	    }
	  }
	
	  function handleDisconnect() {
	    clearInterval(timer);
	    source.close();
	    setTimeout(connect, options.timeout);
	  }
	
	}
	
	var strip = __webpack_require__(264);
	
	var overlay;
	if (options.overlay) {
	  overlay = __webpack_require__(261);
	}
	
	function problems(type, obj) {
	  if (options.warn) console.warn("[HMR] bundle has " + type + ":");
	  var list = [];
	  obj[type].forEach(function(msg) {
	    var clean = strip(msg);
	    if (options.warn) console.warn("[HMR] " + clean);
	    list.push(clean);
	  });
	  if (overlay && type !== 'warnings') overlay.showProblems(list);
	}
	
	function success() {
	  if (overlay) overlay.clear();
	}
	
	var processUpdate = __webpack_require__(265);
	
	var customHandler;
	function processMessage(obj) {
	  if (obj.action == "building") {
	    if (options.log) console.log("[HMR] bundle rebuilding");
	  } else if (obj.action == "built") {
	    if (options.log) console.log("[HMR] bundle rebuilt in " + obj.time + "ms");
	    if (obj.errors.length > 0) {
	      problems('errors', obj);
	    } else {
	      if (obj.warnings.length > 0) problems('warnings', obj);
	      success();
	
	      processUpdate(obj.hash, obj.modules, options);
	    }
	  } else if (customHandler) {
	    customHandler(obj);
	  }
	}
	
	if (module) {
	  module.exports = {
	    subscribe: function subscribe(handler) {
	      customHandler = handler;
	    }
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(266)(module)))

/***/ },
/* 263 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function () {
		return /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/g;
	};


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansiRegex = __webpack_require__(263)();
	
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
	};


/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based heavily on https://github.com/webpack/webpack/blob/
	 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
	 * Original copyright Tobias Koppers @sokra (MIT license)
	 */
	
	/* global window __webpack_hash__ */
	
	if (false) {
	  throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	var lastHash;
	var failureStatuses = { abort: 1, fail: 1 };
	var applyOptions = { ignoreUnaccepted: true };
	
	function upToDate(hash) {
	  if (hash) lastHash = hash;
	  return lastHash == __webpack_require__.h();
	}
	
	module.exports = function(hash, moduleMap, options) {
	  var reload = options.reload;
	  if (!upToDate(hash) && module.hot.status() == "idle") {
	    if (options.log) console.log("[HMR] Checking for updates on the server...");
	    check();
	  }
	
	  function check() {
	    module.hot.check(function(err, updatedModules) {
	      if (err) return handleError(err);
	
	      if(!updatedModules) {
	        if (options.warn) {
	          console.warn("[HMR] Cannot find update (Full reload needed)");
	          console.warn("[HMR] (Probably because of restarting the server)");
	        }
	        performReload();
	        return null;
	      }
	
	      module.hot.apply(applyOptions, function(applyErr, renewedModules) {
	        if (applyErr) return handleError(applyErr);
	
	        if (!upToDate()) check();
	
	        logUpdates(updatedModules, renewedModules);
	      });
	    });
	  }
	
	  function logUpdates(updatedModules, renewedModules) {
	    var unacceptedModules = updatedModules.filter(function(moduleId) {
	      return renewedModules && renewedModules.indexOf(moduleId) < 0;
	    });
	
	    if(unacceptedModules.length > 0) {
	      if (options.warn) {
	        console.warn(
	          "[HMR] The following modules couldn't be hot updated: " +
	          "(Full reload needed)"
	        );
	        unacceptedModules.forEach(function(moduleId) {
	          console.warn("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	      performReload();
	      return;
	    }
	
	    if (options.log) {
	      if(!renewedModules || renewedModules.length === 0) {
	        console.log("[HMR] Nothing hot updated.");
	      } else {
	        console.log("[HMR] Updated modules:");
	        renewedModules.forEach(function(moduleId) {
	          console.log("[HMR]  - " + moduleMap[moduleId]);
	        });
	      }
	
	      if (upToDate()) {
	        console.log("[HMR] App is up to date.");
	      }
	    }
	  }
	
	  function handleError(err) {
	    if (module.hot.status() in failureStatuses) {
	      if (options.warn) {
	        console.warn("[HMR] Cannot check for update (Full reload needed)");
	        console.warn("[HMR] " + err.stack || err.message);
	      }
	      performReload();
	      return;
	    }
	    if (options.warn) {
	      console.warn("[HMR] Update check failed: " + err.stack || err.message);
	    }
	  }
	
	  function performReload() {
	    if (reload) {
	      if (options.warn) console.warn("[HMR] Reloading page");
	      window.location.reload();
	    }
	  }
	};


/***/ },
/* 266 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map