class Automata {
  constructor(states,alphabet,startState,ends){
    this.qs = states;
    this.alpha = alphabet;
    this.q0 = startState;
    this.f = ends;
    console.log();
  }

  draw(){
    this.drawQs();
  }

  drawQs(){
    let count = this.qs.length;
    for (let i in this.qs){
      let x = map(i,-1,count,0,width);
      stroke(0);
      fill(255);
      ellipse(x,height/2,40,40);
      fill(0);
      text(this.qs[i],x-8,height/2+4);
    }
  }

  getqs(){
    return this.qs;
  }

  getalpha(){
    return this.alpha;
  }

  getq0(){
    return this.q0;
  }

  getf(){
    return this.f;
  }

  addQ(value){
    if (value != null){
        for (var i in this.qs){
          if (value == this.qs[i]){
            return;
          }
        }
        this.qs.push(value);
    }
  }
}
