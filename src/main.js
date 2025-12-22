import { transform } from "./transform.js";

export default function register(cytoscape) {
  cytoscape("core", "transform", function(opts) {
    let cy = this;

    let options = {

    };
    
    // If opts is not 'get' that is it is a real options object then initilize the extension
    if (opts !== 'get') {
      options = extendOptions(options, opts);

      let api = transform(cy);

      setScratch(cy, 'options', options);
      setScratch(cy, 'api', api);
    }
    // Expose the API to the users
    return getScratch(cy, 'api');
  });

  function extendOptions(options, extendBy) {
    var tempOpts = {};
    for (var key in options)
      tempOpts[key] = options[key];

    for (var key in extendBy)
      if (tempOpts.hasOwnProperty(key))
        tempOpts[key] = extendBy[key];
    return tempOpts;
  }

}