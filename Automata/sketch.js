var diameter=40,x=20,y=10,w,h;

var automata;
var btnAddQ,btnDFA,btnNFA,btnAddConnection;
var selChar,selCurQ,selnextQ;
var tBoxQ;

//interaction
var mouseOnHold=false;
var lastX,lastY;

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

  selChar = createSelect();
  selChar.position(w+50,120);
  selChar.option('a');
  selChar.option('b');
  selCurQ = createSelect();
  selCurQ.position(w+100,120);
  selnextQ = createSelect();
  selnextQ.position(w+150,120);

  btnAddConnection = createButton('Create connection');
  btnAddConnection.position(w+200,120);
  btnAddConnection.mousePressed(addConnection);
}

function createDFA(){
  automata = new DFA([],['a','b']);//sort of
  loop();
}

function createNFA(){

}

function addState(){
  if (!automata.addQ())return;
  updateSelect();
}

function addConnection(){

}

function draw() {
  background(200);
  drawGrid();
  if (automata!=null){
    automata.draw();
    interaction();

  }
}

function interaction(){
  if (automata.getqs().length>0){
    if (mouseIsPressed == true){
      if (mouseX>0&&mouseX<w&&mouseY>0&&mouseY<h){
        stroke(0);
        if (positionChanged()&&mouseOnHold){
            //moved state
            console.log("updated state pos!");
            automata.updateStateOnGridPos();
        }
        automata.interactGrid();
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

function updateSelect(){
  let arr = automata.getqs().length-1;
  selCurQ.option('q'+arr);
  selnextQ.option('q'+arr);
}
