var allData =[];

let model1;
let xs,ys;
let modeDraw = false;

var btnViewData;
var btnTrain;
let rSlider,bSlider,gSlider;
let labelP;
let labelE;
let labelEpoch;
let inptEpoch;
let epochCount=20;
let epCount=1;

let colorByLabel={
  'red': [],
  'green': [],
  'blue': [],
  'brown': [],
  'yellow': [],
  'orange': [],
  'pink': [],
  'gray': [],
  'purple': []
}

let labelList=['red','green','blue','brown','yellow','orange','pink','gray','purple']

let label = "green";

function setup(){
  createCanvas(400,400);
  background(0);

  getAllData()
  //console.log(allData);
  dataTranspose();
  //console.log(colorByLabel);

  btns();
  //train
  trainSetUp();
}

//const t_rgbs;

function trainSetUp(){
  model1=tf.sequential();
  let colors =[];
  let labels =[];
  /*for (let cName in colorByLabel){//et i=0;i<colorByLabel.length;i++){
    let cArr = colorByLabel[""+cName];

    //console.log(cArr);
    for (let i=0;i<cArr.length;i++){
      let rec = cArr[i];
      //console.log(rec+" "+red(rec)+" "+green(rec));
      let col = [red(rec)/255,green(rec)/255,blue(rec)/255];
      colors.push(col);
      labels.push(labelList.indexOf(cName));
    }
  }*/
  //maybe better:
  for (let i=0;i<allData.length;i++){
    let dataPoint=allData[i];
    let col = [red(dataPoint[0])/255,green(dataPoint[1])/255,blue(dataPoint[2])/255];
    colors.push(col);
    labels.push(labelList.indexOf(dataPoint[3]));
  }

  console.log(labels);

  let labelsTensor = tf.tensor1d(labels,'int32');
  ys = tf.oneHot(labelsTensor,9);
  labelsTensor.dispose();
  xs = tf.tensor2d(colors);

  let hidden =tf.layers.dense({units:20,activation:'sigmoid',inputShape:[3]});
  let output = tf.layers.dense({units:9,activation:'softmax'});
  model1.add(hidden);
  model1.add(output);

  const lr = 0.3;
  const optimizer = tf.train.sgd(lr);

  model1.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy'
  });

}

async function train(){
  const options = {
    epochs: epochCount,
    validationSplit:0.1,
    shuffle:true,
    callbacks:{
      onTrainBegin:()=>console.log('training start'),
      onTrainEnd:()=>console.log('training end'),
      onBatchEnd:tf.nextFrame,
      onEpochEnd:(num, logs)=> {
        labelE.html('Epoch-Count: '+(epCount++));
        console.log('Epoch: '+num);
        console.log('Loss:'+logs.loss);
        console.log('Val-Loss:'+logs.val_loss);
      }
    }
  };
  return await model1.fit(xs,ys,options);
}


function draw() {
  if (modeDraw){
    drawCols();
  }else{
    animateC();
  }
}

function animateC(){
  let r = rSlider.value();
  let g = gSlider.value();
  let b = bSlider.value();
  background(r,g,b);
  deside(r,g,b);
}

function deside(r,g,b){
  const xxs = tf.tensor2d([
    [r/255,g/255,b/255]
  ]);
  let results = model1.predict(xxs);
  let index = results.argMax(1).dataSync()[0];

  let labelc = labelList[index];
  labelP.html('Color-Prediction: '+labelc);

  results.dispose();
  xxs.dispose();
}

function btns(){
  let buttons=[];
  buttons.push(createButton('red'));
  buttons.push(createButton('green'));
  buttons.push(createButton('blue'));
  buttons.push(createButton('brown'));
  buttons.push(createButton('yellow'));
  buttons.push(createButton('orange'));
  buttons.push(createButton('pink'));
  buttons.push(createButton('gray'));
  buttons.push(createButton('purple'));
  for (let i = 0;i<buttons.length;i++){
    buttons[i].mousePressed(updSelCol);
    buttons[i].position((i%2==0)?520:420,(i%2==0)?(20+(i*20)):(20+((i-1)*20)));
    buttons[i].style('width', '60px');
  }

  labelEpoch = createP('Epochs:');
  labelEpoch.position(460,255);
  inptEpoch = createInput();
  inptEpoch.position(520,270);
  inptEpoch.value(epochCount);
  inptEpoch.style('width', '60px');

  btnViewData = createButton('View Data');
  btnViewData.mousePressed(updView);
  btnViewData.position(420,300);

  btnTrain = createButton('Train');
  btnTrain.mousePressed(bgnTrain);
  btnTrain.position(520,300);
  btnTrain.style('width', '60px');

  rSlider = createSlider(0,255,255);
  gSlider = createSlider(0,255,255);
  bSlider = createSlider(0,255,0);
  rSlider.position(420, 320);
  gSlider.position(420, 340);
  bSlider.position(420, 360);

  labelP = createP('Color-Prediction: ');
  labelP.position(420,380);

  labelE = createP('Epoch-Count: ');
  labelE.position(420,400);

}

function updView(){
  modeDraw = (modeDraw)?false:true;
}

function updSelCol(){
  label = this.html();
}

function bgnTrain(){
  epochCount=inptEpoch.value();

  train().then(results=>{
    console.log(results.history.loss);
  });
}

function drawCols(){
  noStroke();
  fill(0);
  rect(0,0,400,400);
  let currCols = colorByLabel[label];
  let x=0;
  let y=0;
  for (let i=0;i<currCols.length;i++){
    fill(currCols[i]);
    rect(x,y,10,10);
    x+=10;
    if(x>=width){
      x=0;
      y+=10;
    }
  }

}

function dataTranspose(){
  for (let i=0;i<allData.length;i++){
    let record = allData[i];
    let col = color(record[0],record[1],record[2]);
    colorByLabel[record[3]].push(col);
  }
}

function getAllData(){
  var div = document.getElementById("dom-target");
  var myData = div.textContent;
  var res = myData.split(",").map(function(item) {
    var pInt = parseInt(item, 10);
    if (isNaN(pInt)){return item;}
    return pInt;
  });
  for (let i=1;i<res.length-1;i+=4){
    allData.push([res[i],res[i+1],res[i+2],res[i+3]]);
  }
}
