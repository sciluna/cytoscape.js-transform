export function transform(options) {

  // API to be returned
  let api = {};

  // flip the given nodes on the center of their bounding box vertically
  api.flipVertical = function(nodes){
    let bb = nodes.boundingBox({includeLabels: false});
    let centerY = bb.y1 + bb.h / 2;
    nodes.forEach(node => {
      let positionY = node.position('y');
      let newPositionY = 2 * centerY - positionY;
      if (options.animate) {
        node.animate({
        position: {x: node.position('x'), y: newPositionY}},
        {
          duration: options.animationDuration
        });
      } else {
        node.position({x: node.position('x'), y: newPositionY});
      }
    });
  };

  // flip the given nodes on the center of their bounding box horizontally
  api.flipHorizontal = function(nodes) {
    let bb = nodes.boundingBox({includeLabels: false});
    let centerX = bb.x1 + bb.w / 2;
    nodes.forEach(node => {
      let positionX = node.position('x');
      let newPositionX = 2 * centerX - positionX;
      if (options.animate) {
        node.animate({
          position: {x: newPositionX, y: node.position('y')}},
          {
            duration: options.animationDuration
        });
      } else {
        node.position({x: newPositionX, y: node.position('y')});
      }
    });
  };

  // rotate the given nodes on the center of their bounding box by given angle (positive angle rotates in clockwise direction)
  api.rotate = function(nodes, angle) {
    let bb = nodes.boundingBox({includeLabels: false});
    let centerX = bb.x1 + bb.w / 2;
    let centerY = bb.y1 + bb.h / 2;
    nodes.forEach(node => {
      // original positions
      let positionX = node.position('x');
      let positionY = node.position('y');
      // transfer positions to origin
      let positionXTemp = positionX - centerX;
      let positionYTemp = positionY - centerY;
      // apply rotation by multiplying rotation matrix
      let positionXTempNew = positionXTemp * Math.cos((Math.PI / 180) * angle) - positionYTemp * Math.sin((Math.PI / 180) * angle);
      let positionYTempNew = positionXTemp * Math.sin((Math.PI / 180) * angle) + positionYTemp * Math.cos((Math.PI / 180) * angle);
      // transfer positions to original place
      let positionXNew = positionXTempNew + centerX;
      let positionYNew = positionYTempNew + centerY;
      if (options.animate) {
        node.animate({
          position: {x: positionXNew, y: positionYNew}},
          {
            duration: options.animationDuration
        });
      } else {
        node.position({x: positionXNew, y: positionYNew});
      }
    });
  };

  // scale the given nodes on the center of their bounding box by given scaling factor
  api.scale = function(nodes, scalingFactor) {
    let bb = nodes.boundingBox({includeLabels: false});
    let centerX = bb.x1 + bb.w / 2;
    let centerY = bb.y1 + bb.h / 2;
    nodes.forEach(node => {
      // original positions
      let positionX = node.position('x');
      let positionY = node.position('y');
      // transfer positions to origin
      let positionXTemp = positionX - centerX;
      let positionYTemp = positionY - centerY;
      // apply rotation by multiplying rotation matrix
      let positionXTempNew = positionXTemp * scalingFactor;
      let positionYTempNew = positionYTemp * scalingFactor;
      // transfer positions to original place
      let positionXNew = positionXTempNew + centerX;
      let positionYNew = positionYTempNew + centerY;
      if (options.animate) {
        node.animate({
          position: {x: positionXNew, y: positionYNew}},
          {
            duration: options.animationDuration
        });
      } else {
        node.position({x: positionXNew, y: positionYNew});
      }
    });
  };

  return api;
}