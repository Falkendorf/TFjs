class Connection{
  constructor(endState,conditions){
    this.endState = endState;
    this.conditions = conditions;
  }

  getEndState(){
    return this.endState;
  }

  getConditions(){
    return this.conditions;
  }

  addCondition(condition){
    for (let con in this.conditions){
      if (this.conditions[con] == condition)return;
    }
    this.conditions.push(condition);
  }

  draw(xx,yy,followBack){
    let xDest = this.endState.getX();
    let yDest = this.endState.getY();
    if (xx==xDest&&yy==yDest){
      this.drawbow(xx,yy);
      return;
    }
    if (followBack){
      this.drawSpline(xx,yy,xDest,yDest);
      return;
    }
    let r = diameter/2;
    stroke(0);
    line(xx*diameter+r,yy*diameter+r,xDest*diameter+r,yDest*diameter+r);
    fill(0);
    textSize(diameter/4);
    textAlign(CENTER,BOTTOM);
    text(this.conditions,getMid(xx,xDest),getMid(yy,yDest));
    translocate(xDest,yDest,xx,yy);
    stroke(0);
    fill(0);
    arrowHead(-diameter/2,0);
    relocate(xDest,yDest,xx,yy);
  }

  drawbow(xx,yy){
    var r = diameter/2;
    xx=xx*diameter+r;
    yy=yy*diameter+r;
    stroke(0);
    noFill();
    let x1 = xx-(sin(22.5)*r);
    let y1 = yy+(cos(22.5)*r);
    let x2 = xx+(sin(22.5)*r);
    bezier(x1,y1,xx+diameter*0.8,yy-diameter*1.5,xx-diameter*0.8,yy-diameter*1.5,x2,y1);
    translate(xx,yy,0);
    var angle = atan2(yy-y1,xx-x1);
    rotate(angle);
    //translocate();
    stroke(0);
    fill(0);
    arrowHead(-diameter/2,0);
    rotate(-angle);
    translate(-xx,-yy,0);
    fill(0);
    textSize(diameter/4);
    textAlign(CENTER,BOTTOM);
    text(this.conditions,xx,yy-diameter*1.25);
  }

  drawSpline(x1,y1,x2,y2){
    let r = diameter/2;
    var deltaY = (y1*diameter+r) - (y2*diameter+r);
    var deltaX = (x1*diameter+r) - (x2*diameter+r);
    var len = sqrt(pow(deltaX,2)+pow(deltaY,2));
    translocate(x2,y2,x1,y1);
    stroke(0);
    noFill();
    var offy =sin(22.5)*r;
    var offx =cos(22.5)*r;
    curve(diameter,diameter,offx,offy,-len-offx,offy,-len-diameter,diameter);
    translate(offx,offy,0);
    var deltaX = (diameter) - (-len-offx);
    var deltaY = (diameter) - (offy);
    var angleInDegrees = atan2(deltaY, deltaX);
    rotate(angleInDegrees);
    stroke(0);
    fill(0);
    arrowHead(0,0);
    rotate(-angleInDegrees);
    translate(-offx,-offy,0);
    relocate(x2,y2,x1,y1);

    fill(0);
    textSize(diameter/4);
    textAlign(CENTER,CENTER);
    offx = (y1==y2)?0:(y1>y2)?-diameter/2:diameter/2;//(abs(x1-x2)>abs(y1-y2))?0:(x1-x2>0)?-diameter:diameter;
    offy = (x1==x2)?0:(x1>x2)?diameter/2:-diameter/2;
    //console.log("y1:"+y1+" y2:"+y2+" offy:"+offy);
    text(this.conditions,getMid(x1,x2)+offx,getMid(y1,y2)+offy);
  }

  /*draw(qs,bow){
    let x1=0,x2=0;
    let count = qs.length;
    for (let i in qs){
      if (qs[i]==this.startState){
        x1 = i;
      }
      if (qs[i]==this.endState){
        x2 = i;
      }
    }
    if (abs(x2-x1)>1){
      bow=true;
    }
    let offset = (x2-x1)*150;
    x1 = map(x1,-1,count,0,width);
    x2 = map(x2,-1,count,0,width);

    noFill();
    if (bow){
      //let offset = (x2-x1>0)?-1:1;
      //offset *= 200;
      curve(x1,height/2+offset,x1,height/2,x2,height/2,x2,height/2+offset);
      text(this.char,(x2+x1)/2,(height/2)+(-offset/8));
    }else{
      line(x1,height/2,x2,height/2);
      text(this.char,(x2+x1)/2,height/2);
    }
    console.log(this.toString()+' '+bow);
  }*/

  toString(){
    return this.char+":"+this.startState+"-->"+this.endState;
  }
}
