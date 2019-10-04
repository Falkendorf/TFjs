function function1() {
  var ul = document.getElementById("smth");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode("Four"));
  li.setAttribute("id", "element4"); // added line
  ul.appendChild(li);
  alert(li.id);
}

function setup(){
  noCanvas();
  //function1();

  /*
  const t1 = tf.tensor1d([1,2,3,4]);
  const t2 = tf.ones([4,4]);
  const t3 = tf.range(0,4,1);//tf.tensor1d([0,1,2,3]);
  const t4 = t1.mul(t2);
  const t6 = t4.transpose();
  const t5 = tf.pow(t6,t3);
  const pol = tf.tensor1d([0,1,0,1]);
  const t7 = t5.matMul(tf.ones([4,1]));
  const t8 = t5.mul(pol).matMul(tf.ones([4,1]));
  t5.print();

  console.log(t1.print());
  console.log(t2.print());
  console.log(t3.print());
  console.log(t4.print());
  console.log(t5.print());
  console.log(t6.print());
  console.log(t7.print());
  console.log(t8.print());

  /*const values=[];
  for (let i=0;i<30;i++){
    values[i]=random(0,100);
  }
  const shape=[2,5,3];
  const tense = tf.tensor3d(values, shape,'int32'); //Shape 2x2

  const vtense = tf.variable(tense);
*/
/*const model1 =tf.sequential();

const hidden=tf.layers.dense({
  units:4,
  inputShape:[2],
  activation:'sigmoid'
});
const output=tf.layers.dense({
  units:3,
  activation:'sigmoid'
});

model1.add(hidden);
model1.add(output);

const sgdOpt = tf.train.sgd(0.1);
model1.compile({
  optimizer: sgdOpt,
  loss: 'meanSquaredError'
});*/

  //tense.print();
  //tense.data().then(function(stuff){
  //  console.log(stuff);
  //});

  //console.log(tense.print());
  //console.log(vtense.print());
  //tense.print();
  //vtense.print();
  //console.log(data);*/
}
