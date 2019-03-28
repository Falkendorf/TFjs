let r,g,b;
var allData =[];



function setup(){
  createCanvas(100,100);
  console.log("smth");
  selCol();
  let buttons=[];
  buttons.push(createButton('red'));
  buttons.push(createButton('green'));
  buttons.push(createButton('blue'));
  buttons.push(createButton('brown'));
  buttons.push(createButton('yellow'));
  buttons.push(createButton('orange'));
  buttons.push(createButton('violett'));
  buttons.push(createButton('gray'));
  buttons.push(createButton('weiht'));
  buttons.push(createButton('black'));
  for (let i = 0;i<buttons.length;i++){
    buttons[i].mousePressed(addData);
    buttons[i].position((i%2==0)?220:120,(i%2==0)?(20+(i*20)):(20+((i-1)*20)));
  }
}

function addData(){
  allData.push([r,g,b,this.html()]);
  selCol();
}

function selCol(){
  r = floor(random(256));
  g = floor(random(256));
  b = floor(random(256));
  background(r,g,b);
}

function submitAllData(){
  //Some Stuff
  console.log(allData);
  document.getElementById("dom-target").textContent = allData.toString();
  //var div = document.getElementById("dom-target");
  //var myData = div.textContent;
}
