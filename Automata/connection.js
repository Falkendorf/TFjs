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

  draw(xx,yy){
    let xDest = this.endState.getX();
    let yDest = this.endState.getY();
    let r = diameter/2;
    stroke(0);
    line(xx*diameter+r,yy*diameter+r,xDest*diameter+r,yDest*diameter+r);
    let xmid = ((xx*diameter+r)+(xDest*diameter+r))/2;
    let ymid = ((yy*diameter+r)+(yDest*diameter+r))/2;
    fill(0);
    textSize(15);
    text(this.conditions,xmid,ymid);
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
