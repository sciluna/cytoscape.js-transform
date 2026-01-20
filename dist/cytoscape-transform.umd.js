(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["cytoscape-transform"] = factory());
})(this, (function () { 'use strict';

  function transform(options) {
    // API to be returned
    var api = {};

    // flip the given nodes on the center of their bounding box vertically
    api.flipVertical = function (nodes) {
      var bb = nodes.boundingBox({
        includeLabels: false
      });
      var centerY = bb.y1 + bb.h / 2;
      nodes.forEach(function (node) {
        var positionY = node.position('y');
        var newPositionY = 2 * centerY - positionY;
        if (options.animate) {
          node.animate({
            position: {
              x: node.position('x'),
              y: newPositionY
            }
          }, {
            duration: options.animationDuration
          });
        } else {
          node.position({
            x: node.position('x'),
            y: newPositionY
          });
        }
      });
    };

    // flip the given nodes on the center of their bounding box horizontally
    api.flipHorizontal = function (nodes) {
      var bb = nodes.boundingBox({
        includeLabels: false
      });
      var centerX = bb.x1 + bb.w / 2;
      nodes.forEach(function (node) {
        var positionX = node.position('x');
        var newPositionX = 2 * centerX - positionX;
        if (options.animate) {
          node.animate({
            position: {
              x: newPositionX,
              y: node.position('y')
            }
          }, {
            duration: options.animationDuration
          });
        } else {
          node.position({
            x: newPositionX,
            y: node.position('y')
          });
        }
      });
    };

    // rotate the given nodes on the center of their bounding box by given angle (positive angle rotates in clockwise direction)
    api.rotate = function (nodes, angle) {
      var bb = nodes.boundingBox({
        includeLabels: false
      });
      var centerX = bb.x1 + bb.w / 2;
      var centerY = bb.y1 + bb.h / 2;
      nodes.forEach(function (node) {
        // original positions
        var positionX = node.position('x');
        var positionY = node.position('y');
        // transfer positions to origin
        var positionXTemp = positionX - centerX;
        var positionYTemp = positionY - centerY;
        // apply rotation by multiplying rotation matrix
        var positionXTempNew = positionXTemp * Math.cos(Math.PI / 180 * angle) - positionYTemp * Math.sin(Math.PI / 180 * angle);
        var positionYTempNew = positionXTemp * Math.sin(Math.PI / 180 * angle) + positionYTemp * Math.cos(Math.PI / 180 * angle);
        // transfer positions to original place
        var positionXNew = positionXTempNew + centerX;
        var positionYNew = positionYTempNew + centerY;
        if (options.animate) {
          node.animate({
            position: {
              x: positionXNew,
              y: positionYNew
            }
          }, {
            duration: options.animationDuration
          });
        } else {
          node.position({
            x: positionXNew,
            y: positionYNew
          });
        }
      });
    };

    // scale the given nodes on the center of their bounding box by given scaling factor
    api.scale = function (nodes, scalingFactor) {
      var bb = nodes.boundingBox({
        includeLabels: false
      });
      var centerX = bb.x1 + bb.w / 2;
      var centerY = bb.y1 + bb.h / 2;
      nodes.forEach(function (node) {
        // original positions
        var positionX = node.position('x');
        var positionY = node.position('y');
        // transfer positions to origin
        var positionXTemp = positionX - centerX;
        var positionYTemp = positionY - centerY;
        // apply rotation by multiplying rotation matrix
        var positionXTempNew = positionXTemp * scalingFactor;
        var positionYTempNew = positionYTemp * scalingFactor;
        // transfer positions to original place
        var positionXNew = positionXTempNew + centerX;
        var positionYNew = positionYTempNew + centerY;
        if (options.animate) {
          node.animate({
            position: {
              x: positionXNew,
              y: positionYNew
            }
          }, {
            duration: options.animationDuration
          });
        } else {
          node.position({
            x: positionXNew,
            y: positionYNew
          });
        }
      });
    };
    return api;
  }

  function register(cytoscape) {
    cytoscape("core", "transform", function (opts) {
      var cy = this;
      var options = {
        animate: true,
        animationDuration: 1000
      };

      // If opts is not 'get' that is it is a real options object then initilize the extension
      if (opts !== 'get') {
        options = extendOptions(options, opts);
        var api = transform(options);
        api.setOption = function (option, value) {
          var options = getScratch(cy, 'options');
          options[option] = value;
          setScratch(cy, 'options', options);
        };
        setScratch(cy, 'options', options);
        setScratch(cy, 'api', api);
      }
      // Expose the API to the users
      return getScratch(cy, 'api');
    });

    // Get the whole scratchpad reserved for this extension (on an element or core) or get a single property of it
    function getScratch(cyOrEle, name) {
      if (cyOrEle.scratch('cyComplexityManagement') === undefined) {
        cyOrEle.scratch('cyComplexityManagement', {});
      }
      var scratch = cyOrEle.scratch('cyComplexityManagement');
      var retVal = name === undefined ? scratch : scratch[name];
      return retVal;
    }

    // Set a single property on scratchpad of an element or the core
    function setScratch(cyOrEle, name, val) {
      getScratch(cyOrEle)[name] = val;
    }
    function extendOptions(options, extendBy) {
      var tempOpts = {};
      for (var key in options) tempOpts[key] = options[key];
      for (var key in extendBy) if (tempOpts.hasOwnProperty(key)) tempOpts[key] = extendBy[key];
      return tempOpts;
    }
  }
  if (typeof window.cytoscape !== 'undefined') {
    // expose to global cytoscape (i.e. window.cytoscape)
    register(window.cytoscape);
  }

  return register;

}));
