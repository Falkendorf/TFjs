class State {

  constructor(stateName,xPos,yPos){
    this.q = stateName;
    this.x = xPos;
    this.y = yPos;
    this.fin = false;
    this.cons = [];
    this.isSel = false;
  }

  select(states){
    for (let i in states){
      if (states[i]!=this){
        states[i].unselect();
      }
    }
    this.isSel = true;
  }

  unselect(){
    this.isSel = false;
  }

  isSelected(){
    return this.isSel;
  }

  draw(){
    stroke(0);
    fill(255);
    if (this.isSel)fill(200);
    if (currentState!=null){
      if (this.q==currentState.getState()){
        fill(0,255,0);
        if (leftWord==null&&!this.fin){
          fill(255,0,0);
        }
      }
    }
    let r = diameter/2;
    ellipse(this.x*diameter+r,this.y*diameter+r,diameter,diameter);
    if (this.fin)
      ellipse(this.x*diameter+r,this.y*diameter+r,diameter/1.3,diameter/1.3);
    fill(0);
    textSize(diameter/4);
    textAlign(CENTER,CENTER);
    text(this.q,(this.x*diameter+r),(this.y*diameter+r));
  }

  drawConnections(){
    for (let j in this.cons){
      //check for backtroute
      var followBack = false;
      var back = this.cons[j].getEndState().getConnections();
      for (let k in back){
        if (back[k].getEndState().getState() == this.q){
          followBack = true;
          break;
        }
      }
      this.cons[j].draw(this.x,this.y,followBack);
    }
  }

  isFinit(){
    return this.fin;
  }

  changeFinit(){
    if (this.fin == false)this.fin = true;
    else this.fin = false;
  }

  setX(val){
    this.x = val;
  }

  setY(val){
    this.y = val;
  }

  getState(){
    return this.q;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  addConnection(condition, destination){
    for (let i in this.cons){
      if (this.cons[i].getEndState() == destination){
        this.cons[i].addCondition(condition);
        return;
      }
    }
    this.cons.push(new Connection(destination,[condition]));
  }

  getConnections(){
    return this.cons;
  }

  getNextState(chr){
    for (let i in this.cons){
      var conds = this.cons[i].getConditions();
      for (let j in conds){
        if (conds[j]==chr){
          //got it
          return this.cons[i].getEndState();
        }
      }
    }
    return null;
  }

}
