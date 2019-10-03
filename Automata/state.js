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
    if (this.isSel)fill(0,0,255);
    let r = diameter/2;
    ellipse(this.x*diameter+r,this.y*diameter+r,diameter,diameter);
    if (this.fin)
      ellipse(this.x*diameter+r,this.y*diameter+r,diameter-2,diameter-2);
    fill(0);
    text(this.q,(this.x*diameter+r)-8,(this.y*diameter+r)+4);
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
}
