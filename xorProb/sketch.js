let model1;

let resolution =20;
let cols;
let rows;
let b = true;

let xs;
const train_xs=tf.tensor2d([[0,0],[1,0],[0,1],[1,1]]);
const train_ys=tf.tensor2d([[0],[1],[1],[0]]);

function setup(){
  createCanvas(400,400);
  //nn=new NeuralNetwork(2,2,1);
  cols = width/resolution;
  rows = height/resolution;

  let inputs=[];
  for (let i=0;i<cols;i++){
    for (let j=0;j<rows;j++){
      let x1 = i/cols;
      let x2 = j/rows;
      inputs.push([x1,x2]);
    }
  }
  xs = tf.tensor2d(inputs);

  model1 = tf.sequential();
  let hidden = tf.layers.dense({
    inputShape:[2],
    units:4,
    activation:'sigmoid'
  });
  let output = tf.layers.dense({
    units:1,
    activation:'sigmoid'
  });
  model1.add(hidden);
  model1.add(output);
  const optimizer = tf.train.adam(0.1);
  model1.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError'
  });

  //setTimeout(train,100);
}

function train(){
  trainModel().then(result=>{
      console.log(result.history.loss[0]);
      //setTimeout(train,100);
      b=true;
  });
}

function trainModel(){
  return model1.fit(train_xs,train_ys,{
    shuffle:true,
    epochs:10
  });
}

function draw(){
  background(0);

  if (b){
    b=false;
    train();
  }

  tf.tidy(()=>{
    let ys = model1.predict(xs);
    let y_values = ys.dataSync();

    let index=0;
    for (let i=0;i<cols;i++){
      for (let j=0;j<rows;j++){
        let x1 = i/cols;
        let x2 = j/rows;
        fill(y_values[index]*255);
        rect (i*resolution,j*resolution,resolution,resolution);
        index++;
      }
    }
  });
}
