cytoscape-transform
================================================================================
## Description
This extension adds support for applying basic geometric transformations (flipping, rotation and scaling) to graph elements.

Click [here](https://hasanbalci.github.io/cytoscape.js-transform/demo/index.html) for a demo.

## API

`cy.transform(options)`
To initialize the extension with given options.

`let api = cy.transform('get')`
To get the extension instance after initialization.

`api.flipVertical(nodes)`
Flip the given nodes vertically across the horizontal line passing through the center of their bounding box.

`api.flipHorizontal(nodes)`
Flip the given nodes horizontally across the vertical line passing through the center of their bounding box.

`api.rotate(nodes, angle)`
Rotate the given nodes around the center of their bounding box by the given angle (a positive angle rotates clockwise).

`api.scale(nodes, scalingFactor)`
Scale the given nodes about the center of their bounding box by the given scaling factor.

## Default Options
```javascript
    var options = {
      animate: true, // whether to animate during transformations
      animationDuration: 1000, // when animate is true, the duration in milliseconds of the animation
    };
```

## Dependencies
 * Cytoscape.js ^3.3.0

## Usage instructions

Download the library:
 * via npm: `npm install cytoscape-transform`,
 * via bower: `bower install cytoscape-transform`, or
 * via direct download in the repository (probably from a tag).

Import the library as appropriate for your project:

ES import:
```js
import cytoscape from 'cytoscape';
import transform from 'cytoscape-transform';

cytoscape.use( transform );
```

CommonJS require:

```js
let cytoscape = require('cytoscape');
let transform = require('cytoscape-transform');

cytoscape.use( transform ); // register extension
```

AMD:

```js
require(['cytoscape', 'cytoscape-fcose'], function( cytoscape, fcose ){
  fcose( cytoscape ); // register extension
});
```

Plain HTML/JS has the extension registered for you automatically, because no `require()` is needed.

## Publishing instructions

This project is set up to automatically be published to npm and bower.  To publish:

1. Build the extension : `npm run build`
1. Commit the build : `git commit -am "Build for release"`
1. Bump the version number and tag: `npm version major|minor|patch`
1. Push to origin: `git push && git push --tags`
1. Publish to npm: `npm publish .`
1. If publishing to bower for the first time, you'll need to run `bower register cytoscape-transform https://github.com/hasanbalci/cytoscape.js-transform.git`
1. [Make a new release](https://github.com/hasanbalci/cytoscape.js-transform/releases/new) for Zenodo.
