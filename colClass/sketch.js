let r,g,b;
var allData =[];



function setup(){
  createCanvas(100,100);
  getAllData()
  selCol();
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
    buttons[i].mousePressed(addData);
    buttons[i].position((i%2==0)?220:120,(i%2==0)?(27+(i*20)):(27+((i-1)*20)));
    buttons[i].style('width', '60px');
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
  while (exists()){
    r = floor(random(256));
    g = floor(random(256));
    b = floor(random(256));
    console.log('New Color:'+r+' '+g+' '+b);
  }
  background(r,g,b);
}

function exists(){
  for (let i=0;i<allData.length;i++){
    let dataPoint = allData[i];
    if (dataPoint[0]==r&&dataPoint[1]==g&&dataPoint[2]==b){
      return true;
    }
  }
  return false;
}

function submitAllData(){
  //Some Stuff
  console.log(allData);
  document.getElementById("dom-target").value = allData.toString();
  //console.log(allData);
  //document.getElementById("dom-target").textContent = allData.toString();
  //var div = document.getElementById("dom-target");
  //var myData = div.textContent;
}

function getAllData(){
  //Some Stuff
  //console.log(allData);
  //document.getElementById("dom-target").value = allData.toString();
  //console.log(allData);
  //document.getElementById("dom-target").textContent = allData.toString();
  var div = document.getElementById("dom-target1");
  var myData = div.textContent;
  //console.log(myData);
  var res = myData.split(",").map(function(item) {
    var pInt = parseInt(item, 10);
    if (isNaN(pInt)){return item;}
    return pInt;
  });
  for (let i=1;i<res.length-1;i+=4){
    allData.push([res[i],res[i+1],res[i+2],res[i+3]]);
  }
  console.log(allData);
}
