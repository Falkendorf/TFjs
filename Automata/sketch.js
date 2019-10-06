var diameter=80,x=20,y=10,w,h;

var automata;
var btnAddQ,btnDFA,btnNFA,btnConnection,btnSetToFinit,btnUnselectAll,btnCheckWord;
var tBoxQ,inCheckWord;

//interaction
var mouseOnHold=false;
var lastX,lastY;
var mode=0;
var activChar;

function setup() {
  w=diameter*x;
  h=diameter*y;
  var can = createCanvas(w, h);
  can.parent("can");
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
  var sav = w;
  w=5;
  btnDFA = createButton('DFA');
  btnDFA.position(w+0,75);
  btnDFA.mousePressed(createDFA);
  btnDFA.parent("menu");
  btnDFA.addClass("btn");

  btnNFA = createButton('NFA');
  btnNFA.position(w+100,75);
  btnNFA.mousePressed(createNFA);
  btnNFA.parent("menu");
  btnNFA.addClass("btn");

  btnAddQ = createButton('Add state');
  btnAddQ.position(w+0,125);
  btnAddQ.mousePressed(addState);
  btnAddQ.parent("menu");
  btnAddQ.addClass("btn");

  btnSetToFinit= createButton('Set selected state\n to finite');
  btnSetToFinit.position(w+0,175);
  btnSetToFinit.mousePressed(setFinit);
  btnSetToFinit.parent("menu");
  btnSetToFinit.addClass("btn");

  btnUnselectAll= createButton('Unselect all');
  btnUnselectAll.position(w+0,225);
  btnUnselectAll.mousePressed(unSelAll);
  btnUnselectAll.parent("menu");
  btnUnselectAll.addClass("btn");

  btnMode = createButton('Switch Mode');
  btnMode.position(w+0,300);
  btnMode.mousePressed(switchMode);
  btnMode.parent("menu");
  btnMode.addClass("btn");

  btnCheckWord = createButton("Check Word");
  btnCheckWord.position(150,25);
  btnCheckWord.mousePressed(startAnimation);
  btnCheckWord.parent("animate");
  btnCheckWord.addClass("btn");

  inCheckWord = createInput();
  inCheckWord.position(300,25);
  inCheckWord.parent("animate");
  inCheckWord.addClass("in");

  w=sav;
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
  var str = (mode==0)?"Mode: Change state.":"Mode: Create connections.";
  stroke(255,100,100);
  textSize(20);
  textAlign(RIGHT,BOTTOM);
  text(str,w-5,h-5);
  text("Active Condition: "+activChar,w-5,h-30);
  if (automata!=null){
    automata.draw();
    interaction();
    animate();
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
