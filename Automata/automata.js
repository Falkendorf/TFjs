class Automata {
  /*
    Creates a new automata with given states the corresponding alphatbeth and the state to start of and states to finish
  */
  constructor(states,alphabet){
    this.qs = states;
    this.alpha = alphabet;
    this.grid = [];
    this.initGrid();
    this.isGridSel = false;
  }

  initGrid(){
    for (let i = 0;i<x;i++){
        let column = [];
        for (let j =0;j<y;j++){
          column.push(null);
        }
        this.grid.push(column);
    }
  }

  unSelAll(){
    for (let i in this.qs){
      this.qs[i].unselect();
    }
    this.isGridSel = false;
  }

  setToFinit(){
    for (let i in this.qs){
      if (this.qs[i].isSelected()){
        this.qs[i].changeFinit();
      }
    }
  }

  updateStateOnGridPos(){
    let xx=floor(mouseX/diameter);
    let yy=floor(mouseY/diameter);
    if (this.grid[xx][yy]==null){
      for (let i in this.qs){
        if (this.qs[i].isSelected()){
          let oldX = this.qs[i].getX();
          let oldY = this.qs[i].getY();
          this.grid[xx][yy]=this.qs[i];
          this.qs[i].setX(xx);
          this.qs[i].setY(yy);
          this.grid[oldX][oldY]=null;
          return true;
        }
      }
    }
    return false;
  }

  interactGrid(){
    let xx=floor(mouseX/diameter);
    let yy=floor(mouseY/diameter);
    if(this.grid[xx][yy]!=null){
      this.grid[xx][yy].select(this.qs);
      this.isGridSel = true;
    }
  }

  isSomeSel(){
    return this.isGridSel;
  }

  draw(){
    this.drawConnections();
    this.drawQs();
  }

  drawConnections(){
    for (let i in this.qs){
      this.qs[i].drawConnections();
    }
  }

  addConnection(condition){
    if (condition==null)return;
    let dest = this.grid[floor(mouseX/diameter)][floor(mouseY/diameter)];
    let start;
    for (let i in this.qs){
        if (this.qs[i].isSelected()){
          start = this.qs[i];
          break;
        }
    }
    if (start==null)return;
    start.addConnection(condition,dest);
  }

  drawQs(){
    for (let i in this.qs){
      this.qs[i].draw();
    }
  }

  getqs(){
    return this.qs;
  }

  getalpha(){
    return this.alpha;
  }

  getq0(){
    if (this.qs.length>0){
      return this.qs[0];
    }
    return null;
  }

  getf(){

  }

  addQ(){
    let count = this.qs.length;
    if (count>=10)return false;
    this.qs.push(new State('q'+count,count*2,y/2));
    this.grid[count*2][y/2] = this.qs[count];//true;
    console.log("Added new state!");
    return true;
  }
}
