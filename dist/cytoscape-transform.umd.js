(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["cytoscape-transform"] = factory());
})(this, (function () { 'use strict';

  function transform(cy) {
    // API to be returned
    var api = {};
    return api;
  }

  function register(cytoscape) {
    cytoscape("core", "transform", function (opts) {
      var cy = this;
      var options = {};

      // If opts is not 'get' that is it is a real options object then initilize the extension
      if (opts !== 'get') {
        options = extendOptions(options, opts);
        var api = transform();
        setScratch(cy, 'options', options);
        setScratch(cy, 'api', api);
      }
      // Expose the API to the users
      return getScratch(cy, 'api');
    });
    function extendOptions(options, extendBy) {
      var tempOpts = {};
      for (var key in options) tempOpts[key] = options[key];
      for (var key in extendBy) if (tempOpts.hasOwnProperty(key)) tempOpts[key] = extendBy[key];
      return tempOpts;
    }
  }

  return register;

}));
