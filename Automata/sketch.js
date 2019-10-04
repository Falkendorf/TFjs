var diameter=80,x=20,y=10,w,h;

var automata;
var btnAddQ,btnDFA,btnNFA,btnConnection,btnSetToFinit,btnUnselectAll;
var tBoxQ;

//interaction
var mouseOnHold=false;
var lastX,lastY;
var mode=0;
var activChar;

function setup() {
  w=diameter*x;
  h=diameter*y;
  createCanvas(w, h);
  background(0);
  createInterface();
}

function drawGrid(){
  stroke(75);
  for (i=0;i<x;i++){
    line(i*diameter,0,i*diameter,height);
  }
  for (i=0;i<y;i++){
    line(0,i*diameter,width,i*diameter);
  }
}

function createInterface(){
  var l = createP('Create:');
  l.position(w+50,10);
  btnDFA = createButton('DFA');
  btnDFA.position(w+100,25);
  btnDFA.mousePressed(createDFA);

  btnNFA = createButton('NFA');
  btnNFA.position(w+150,25);
  btnNFA.mousePressed(createNFA);

  btnAddQ = createButton('Add state');
  btnAddQ.position(w+50,75);
  btnAddQ.mousePressed(addState);

  btnSetToFinit= createButton('Set selected state to finite');
  btnSetToFinit.position(w+50,100);
  btnSetToFinit.mousePressed(setFinit);

  btnUnselectAll= createButton('Unselect all');
  btnUnselectAll.position(w+50,125);
  btnUnselectAll.mousePressed(unSelAll);

  btnMode = createButton('Switch Mode');
  btnMode.position(w+25,h-15);
  btnMode.mousePressed(switchMode);
}

function createDFA(){
  automata = new DFA([],['a','b']);//sort of
  loop();
}

function createNFA(){

}

function addState(){
  if (!automata.addQ())return;
}

function switchMode(){
  if (mode == 0){
    mode = 1;
  }else{
    mode = 0;
  }
  automata.unSelAll();
}

function draw() {
  background(200);
  drawGrid();
  var str = (mode==0)?"Mode: Change state position.":"Mode: Create connections.";
  stroke(255,100,100);
  textSize(20);
  text(str,w-275,h-10);
  text("Active Condition: "+activChar,w-275,h-30);
  if (automata!=null){
    automata.draw();
    interaction();
  }
}

function keyPressed() {
  activChar = key;
}

function interaction(){
  if (automata.getqs().length>0){
    if (mouseIsPressed == true){
      if (mouseX>0&&mouseX<w&&mouseY>0&&mouseY<h){
        stroke(0);
        if (mode == 0){
          if (positionChanged()&&mouseOnHold){
              //moved state
              console.log("updated state pos!");
              automata.updateStateOnGridPos();
          }
          //simple click
          if (!mouseOnHold){
            automata.interactGrid();
          }
        }else if (mode == 1&&!mouseOnHold){
          if (automata.isSomeSel()){
            automata.addConnection(activChar);
            automata.unSelAll();
          }else{
            automata.interactGrid();
          }
        }
      }
      mouseOnHold=true;
    }else{
      mouseOnHold=false;
    }
  }
}

function positionChanged(){
  let xx=floor(mouseX/diameter);
  let yy=floor(mouseY/diameter);
  let retVal = false;
  if (lastX!=xx||lastY!=yy) retVal = true;
  lastX = xx;
  lastY = yy;
  return retVal;
}

function setFinit(){
  automata.setToFinit();
}

function unSelAll(){
  automata.unSelAll();
}
