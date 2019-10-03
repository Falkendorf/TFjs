class Connection{
  constructor(startState,endState,char){
    this.startState = startState;
    this.endState = endState;
    this.char = char;
  }

  getStartState(){
    return this.startState;
  }

  getEndState(){
    return this.endState;
  }

  getChar(){
    return this.char;
  }

  draw(qs,bow){
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
  }

  toString(){
    return this.char+":"+this.startState+"-->"+this.endState;
  }
}
