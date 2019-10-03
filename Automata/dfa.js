class DFA extends Automata{
  constructor(states,alphabet){
    super(states,alphabet);
  }

  log(){
    console.log("M = (\{"+this.qs.toString()+
      "\},\{"+this.alpha.toString()
      +"\},"+this.printConnections()
      +","+this.q0.toString()
      +",\{"+this.f.toString()
      +"\})");
  }

  draw(){
    //this.drawConnections();
    super.draw();
  }

  drawConnections(){
    let sameCons = [];
    let bow = [];
    for (let i in this.connections){
      let con = this.connections[i];
      let isNew = true;
      let needBow = false;
      for (let j in sameCons){
        if (sameCons[j].getStartState()==con.getStartState()&&sameCons[j].getEndState()==con.getEndState()){
          isNew = false;
        }
      }
      if (isNew){
        let conBehaviour = con.getChar();
        for (let j in this.connections){
          if (this.connections[j].getStartState()==con.getEndState()&&this.connections[j].getEndState()==con.getStartState()){
            needBow = true;
          }
          if (this.connections[j].getChar()!=conBehaviour&&this.connections[j].getStartState()==con.getStartState()&&this.connections[j].getEndState()==con.getEndState()){
            conBehaviour+=','+this.connections[j].getChar();
          }
        }
        sameCons.push(new Connection(con.getStartState(),con.getEndState(),conBehaviour));
        bow.push(needBow);
        needBow = false;
        isNew = true;
      }
    }


    for (let i in sameCons){
      sameCons[i].draw(this.qs,bow[i]);
    }
  }

  printConnections(){

  }

}
