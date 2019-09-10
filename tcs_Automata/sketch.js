var automata;
var btnAddQ,btnDFA,btnNFA,btnAddConnection;
var selChar,selCurQ,selnextQ;
var tBoxQ;
let count = 1;

function setup() {
  createCanvas(640, 480);
  background(0);
  createInterface();
}

function createInterface(){
  var l = createP('Create:');
  l.position(650,10);
  btnDFA = createButton('DFA');
  btnDFA.position(700,25);
  btnDFA.mousePressed(createDFA);

  btnNFA = createButton('NFA');
  btnNFA.position(750,25);
  btnNFA.mousePressed(createNFA);

  btnAddQ = createButton('Add state');
  btnAddQ.position(700,75);
  btnAddQ.mousePressed(addQ);

  tBoxQ = createInput('q0');
  tBoxQ.position(650,75);
  tBoxQ.size(25,16);

  selChar = createSelect();
  selChar.position(650,120);
  selChar.option('a');
  selChar.option('b');
  selCurQ = createSelect();
  selCurQ.position(700,120);
  selnextQ = createSelect();
  selnextQ.position(750,120);

  btnAddConnection = createButton('Create connection');
  btnAddConnection.position(800,120);
  btnAddConnection.mousePressed(addConnection);
}

function createDFA(){
  //automata = new DFA(['q0','q1'],['a','b'],[new Connection('q0','q1','a')],'q0',['q0']);
  //automata = new DFA(['q0','q1'],['a','b'],[new Connection('q0','q1','a'),new Connection('q1','q0','a')],'q0',['q0']);
  automata = new DFA(['q0','q1','q2'],
    ['a','b'],
    [new Connection('q0','q1','a'),
      new Connection('q1','q0','a'),
      new Connection('q0','q2','b')],
    'q0',
    ['q0']);

  nextState();
  automata.log();
  loop();
}

function createNFA(){
  loop();
}

function addQ(){
  if (count<=10&&automata!=null){
    automata.addQ(tBoxQ.value());
    nextState();
    automata.log();
    console.log("Added new state!");
  }
  loop();
}

function addConnection(){
  if (automata!=null){
    automata.addConnection(new Connection(selCurQ.value(),selnextQ.value(),selChar.value()));
    automata.log();
  }
  loop();
}

function draw() {
  background(200);
  if (automata!=null)
    automata.draw();
  noLoop();
}

function updateSelect(){
  let arr = automata.getqs();
  selCurQ.option(arr[arr.length-1]);
  selnextQ.option(arr[arr.length-1]);
}

function nextState(){
    tBoxQ.value('q'+count);
    updateSelect();
    count++;
}
