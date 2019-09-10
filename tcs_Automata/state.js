class State(){
  constructor(stateName){
    this.q = stateName;
    this.pos = 'dyn';
  }
  constructor(stateName,x,y){
    this.q = stateName;
    this.x = x;
    this.y = y;
    this.pos = 'static';
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

  isDyn(){
    if (this.pos == 'dyn'){
      return true;
    }
    return false;
  }

  resize(states){
    let count = states.length;
    for (let i in states){
      if (states[i].isDyn()){
        
      }
    }
  }


}
