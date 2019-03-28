let x_vals =[];
let y_vals=[];
var slider;
var button;
var inpLearR;
var inpSlid;

var polyNum=4;
var learningRate = 0.5; //
var optimizer = tf.train.adam(learningRate); //later may by select

function setup(){
  initialiseComps();
  initialiseNums();
}

function initialiseComps(){
  createP('This is a polynomiall regression with TensorFlow');
  createP('Use it by pressing right into the black box and see the aproximation of the line.');
  createCanvas(400,400);
  slider = createSlider(1, 15, 1);
  slider.position(410, 200);
  slider.style('width', '160px');
  //slider.changed(updSlid);
  button = createButton('reset');
  button.position(410, 240);
  button.mousePressed(reset);
  inpSlid = createInput('');
  inpSlid.position(500,160);
  inpSlid.style('width', '20px');
  inpLearR = createInput('0.5');
  inpLearR.position(410, 160);
  inpLearR.style('width', '40px');

}

/*function updSlid(){

  console.log('yeah');
}*/

function reset(){
  var pol = slider.value();
  polyNum = pol;
  learningRate = inpLearR.value();
  optimizer = tf.train.adam(learningRate);
  x_vals =[];
  y_vals=[];
  initialiseNums();
  //will reset all;
}

function initialiseNums(){


  var rands=[];
  for (let i=0;i<polyNum+1;i++){
    rands.push(1);
  }
  //m =tf.variable(tf.scalar(random(1)));
  //b =tf.variable(tf.scalar(random(1)));
  polFacts = tf.variable(tf.tensor1d(rands),true);
  //polFacts = tf.variable(tf.tensor1d([1,0,0]),true);
  //a = tf.variable(tf.scalar(random(-1,1)));
  //b = tf.variable(tf.scalar(random(-1,1)));
  //c = tf.variable(tf.scalar(random(-1,1)));

}




function loss(pred,labels){
  return pred.sub(labels).square().mean();
}

/*function predict(x){
  const xs = tf.tensor1d(x);
  //y=mx+b;
  const ys = xs.mul(m).add(b);
  return ys;
}*/

function predict(x){
  const xs = tf.tensor1d(x);
  //polFacts = tf.tensor1d(vars);

  //console.log(polFacts.print());
  const n = polyNum+1;
  const s1=tf.ones([x.length,n]).transpose();
  //console.log(s1.print());
  const s2=xs.mul(s1).transpose();
  //console.log(s2.print());
  const s3=tf.range(n-1,-1,-1);
  //console.log(s3.print());
  //test
  var mult10=[];
  for (let i=1;i<(n*x.length)+1;i++){
    mult10.push((i%n==0)?0:1);
  }
  var add01=[];
  for (let i=1;i<(n*x.length)+1;i++){
    add01.push((i%n==0)?1:0);
  }
  const s22 = tf.tensor2d(mult10,[x.length,n])
  const s23 = tf.tensor2d(add01,[x.length,n])
  const s24 = s2.mul(s22).add(s23);
  //console.log(s22.print());
  //console.log(s23.print());
  //test
  const s4=tf.pow(s24,s3);
  //console.log(s4.print());
  const s5 =s4.mul(polFacts);
  var s88= s5.toString();//.print(); WARUM??!?!!
  const s6 = tf.ones([n,1]);
  //console.log(s6.print());
  const ys=s5.matMul(s6);
  //console.log(ys.print());
  return ys.reshape([x.length]);
}

/*function recPred(xs,n){
  const tensorData = polFacts.dataSync();
  const nTens = tf.scalar(tensorData[n]);
  if (n==0){
    return nTens;
  }else if (n==1){
    return xs.mul(nTens).add(recPred(xs,(n-1)));
  }else{
    return xs.pow(tf.scalar(n)).mul(nTens).add(recPred(xs,(n-1)));
  }
}*/

function mousePressed(){
  if (mouseX>=0&&mouseX<=400&&mouseY>=0&&mouseY<=400){
    let x = map(mouseX,0,width,-1,1);
    let y = map(mouseY,0,height,1,-1);
    x_vals.push(x);
    y_vals.push(y);
  }
}

function draw(){
  inpSlid.value(''+slider.value());
  //predict([-1,0,1,2]).print();
  //console.log('Out');

  //noLoop();

  tf.tidy(()=>{
    if (x_vals.length>0){
      const ys = tf.tensor1d(y_vals);
      optimizer.minimize(()=>loss(predict(x_vals),ys));
      //console.log(predict(x_vals).print());
      //console.log(ys.print());
      //if (x_vals.length>1){noLoop();}
    }
  });


  background(0);
  stroke(255);
  strokeWeight(8);
  for (let i=0;i<x_vals.length;i++){
    let px = map(x_vals[i],-1,1,0,width);
    let py = map(y_vals[i],-1,1,height,0);
    point(px,py);
  }

  const curveX = [];
  for (let x=-1;x<1.01;x+=0.05){
    curveX.push(x);
  }

  const ys = tf.tidy(()=>predict(curveX));

  let curveY=ys.dataSync();
  ys.dispose();

  beginShape();
  noFill();
  stroke(255);
  strokeWeight(2);

  for (let i=0;i<curveX.length;i++){
    let x=map(curveX[i],-1,1,0,width);
    let y=map(curveY[i],-1,1,height,0);
    vertex(x,y);
  }
  endShape();
  //noLoop();
  if (x_vals.length>=3){
    //noLoop();
  }
}
