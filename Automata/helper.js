
function translocate(x1,y1,x2,y2){
  let r = diameter/2;
  var deltaY = (y1*diameter+r) - (y2*diameter+r);
  var deltaX = (x1*diameter+r) - (x2*diameter+r);
  var angleInDegrees = atan2(deltaY, deltaX);
  translate((x1*diameter+r),(y1*diameter+r),0);
  rotate(angleInDegrees);
}

function relocate(x1,y1,x2,y2){
  let r = diameter/2;
  var deltaY = (y1*diameter+r) - (y2*diameter+r);
  var deltaX = (x1*diameter+r) - (x2*diameter+r);
  var angleInDegrees = atan2(deltaY, deltaX);
  rotate(-angleInDegrees);
  translate(-(x1*diameter+r),-(y1*diameter+r),0);
}

function getMid(x1,x2){
  let r = diameter/2;
  return ((x1*diameter+r)+(x2*diameter+r))/2;
}
function arrowHead(x1,y1){
  triangle(x1,y1,x1-diameter*0.25,y1+diameter*0.125,x1-diameter*0.25,y1-diameter*0.125);
}
